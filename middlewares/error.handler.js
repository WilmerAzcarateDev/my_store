function logErrors(error,req,res,next){
  next(error);
}

function boomErrorHandler(error,req,res,next){
  if(error.isBoom){
    const {output} = error;
    res.status(output.statusCode).json(output.payload);
  }
  next(error);
}

module.exports = {logErrors,boomErrorHandler}