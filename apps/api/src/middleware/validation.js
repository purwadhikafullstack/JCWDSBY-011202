import jwt from "jsonwebtoken"

module.exports = {
  validateToken: (req, res, next) => {
    try {
        console.log("masuk validate 2", req.headers["authorization"].split(" ")[1]);
        const token = req.headers["authorization"].split(" ")[1]
      if (!token) {
        return res.status(400).send({
          success: false,
          message: "You don't have account",
        });
      } else {
        const verifyData = jwt.verify(token, "abcd");
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
      return res.status(400).send('Invalid Token');
    }
  },
  ValidateUser: (req, res, next) => {
    try {
      if (!req.userData) {
        return res.status(400).send({
          success: false,
          message: 'You are unauthorized',
        });
      } else if (req.userData.role !== 'user') {
        return res.status(403).send({
          success: false,
          message: 'You are not a user',
        });
      }
      next();
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: 'Invalid Data',
      });
    }
  },
  ValidateAdmin: (req, res, next) => {
    try {
      if (!req.userData) {
        return res.status(400).send({
          success: false,
          message: 'You are unauthorized',
        });
      } else if (req.userData.role !== 'admin') {
        return res.status(403).send({
          success: false,
          message: 'You are not an admin',
        });
      }
      next();
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: 'Invalid Data',
      });
    }
  },
  ValidateWarehouseAdmin: (req, res, next) => {
    try {
      if (!req.userData) {
        return res.status(400).send({
          success: false,
          message: 'You are unauthorized',
        });
      } else if (req.userData.role !== 'superadmin') {
        return res.status(403).send({
          success: false,
          message: 'You are not a superadmin',
        });
      }
      next();
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: 'Invalid Data',
      });
    }
  },
};
      return res.status(400).send("Invalid Token");
    }
  },
};

