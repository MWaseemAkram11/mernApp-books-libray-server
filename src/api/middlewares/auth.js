var byPassedRoutes = ['login','register'];

exports.tokenVerification = async (req, res, next) => {
    if (req.originalUrl.indexOf("/") > -1) {
      if (byPassedRoutes.indexOf(req.originalUrl) > -1 || req.originalUrl.indexOf("/xyz") > -1) {
        next();
      } else {
        const token = req.header("auth-token");
        if(!token)
          return res.status(401).send("Access is denied")
        try{
          const verified = await jwt.verify(token, pwEncruptionKey)
          req.user = verified;
          next();
        } catch(error){
          return res.status(403).send("unauthorized Access")
        }
      }
    }
  }