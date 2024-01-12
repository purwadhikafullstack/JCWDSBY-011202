const jwt = require("jsonwebtoken");

module.exports = {
  validateToken: (req, res, next) => {
    try {
        console.log("masuk validate", req.token);
      if (!req.token) {
        return res.status(400).send({
          success: false,
          message: "You don't have account",
        });
      } else {
        const verifyData = jwt.verify(req.token, "abcd");
        if (!verifyData) {
          return res.status(401).send({
            success: false,
            message: "Unauthorized Request",
          });
        }
        console.log(verifyData);
        req.userData = verifyData;
        next();
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send("Invalid Token");
    }
  },
};

