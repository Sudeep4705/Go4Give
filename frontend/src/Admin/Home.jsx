import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function Home() {
const [report, setReport] = useState({
    totalDonors: 0,
    totalFundraisers: 0,
    totalDonationAmount: 0,
    totalFundraiserAmount: 0,
});



const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/report/all')
      .then(res => {
        setReport(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch report:", err);
        setLoading(false);
      });
  }, []);

  const chartData = [
    { name: "Donors", value: report.totalDonors },
    { name: "Fundraisers", value: report.totalFundraisers },
    { name: "Donations", value: report.totalDonationAmount },
    { name: "Fundraiser Amount", value: report.totalFundraiserAmount },
  ];

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading report...</p>;

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Admin Report Overview</h2>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={cardStyle}>
          <p style={labelStyle}>Total Donors</p>
          <h3 style={valueStyle}>{report.totalDonors}</h3>
        </div>
        <div style={cardStyle}>
          <p style={labelStyle}>Total Fundraisers</p>
          <h3 style={valueStyle}>{report.totalFundraisers}</h3>
        </div>
        <div style={cardStyle}>
          <p style={labelStyle}>Total Donations</p>
          <h3 style={valueStyle}>₹{report.totalDonationAmount.toLocaleString()}</h3>
        </div>
        <div style={cardStyle}>
          <p style={labelStyle}>Fundraiser Amount</p>
          <h3 style={valueStyle}>₹{report.totalFundraiserAmount.toLocaleString()}</h3>
        </div>
      </div>

      {/* Chart Section */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        padding: '20px'
      }}>
        <h3 style={{ marginBottom: '20px', textAlign: 'center' }}> Data Chart</h3>
        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// Reusable styles
const cardStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '20px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  textAlign: 'center'
};

const labelStyle = {
  fontSize: '14px',
  color: '#666',
  marginBottom: '8px'
};

const valueStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#333'
};

export default Home;
