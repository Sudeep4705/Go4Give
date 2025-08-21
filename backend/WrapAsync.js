function WrapAsync(fn){
return function(req,res,next){
    fn(req,res,next).cath((err)=>next(err))
}
}


module.exports = WrapAsync;