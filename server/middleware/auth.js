import jwt from "jsonwebtoken";


const auth = async (req, res, next) => {
  try {
    req.userId = req.headers.authorization;
    const isCustomAuth = token.length < 500;
    console.log( token);

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decodedData._id;
      console.log( req.userId);
    } else {
      decodedData = jwt.decode(token,process.env.JWT_SECRET);
      req.userId = decodedData._id;
      console.log( req.userId);
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;