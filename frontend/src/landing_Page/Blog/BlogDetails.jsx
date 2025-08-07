import { useParams } from "react-router-dom";
import Blog1 from "./Blog1";
import Blog2 from "./Blog2";
import Blog3 from "./Blog3";

function BlogDetail() {
  const { id } = useParams();

  if (id === "1") return <Blog1 />;
  if (id === "2") return <Blog2 />;
  if (id === "3") return <Blog3 />;

  return <h2 className="text-center py-5">Blog not found</h2>;
}

export default BlogDetail;
