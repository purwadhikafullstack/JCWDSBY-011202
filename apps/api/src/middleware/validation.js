import jwt from 'jsonwebtoken';

module.exports = {
  validateToken: (req, res, next) => {
    try {
      const token = req.token;

      if (!token) {
        return res.status(400).send({
          success: false,
          message: "You don't have account",
        });
      } else {
        const verifyData = jwt.verify(token, process.env.SCRT_TKN);
        if (!verifyData) {
          return res.status(401).send({
            success: false,
            message: 'Unauthorized Request',
          });
        }
        req.userData = verifyData;
        next();
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send('Invalid Token');
    }
  },
  ValidateUser: (req, res, next) => {
    console.log(req.userData);
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
  ValidateSuperAdmin: (req, res, next) => {
    console.log(req.userData);
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
  ValidatePassword: (req, res, next) => {
    try {
      const { password, confirmpassword } = req.body;

      if (
        !password ||
        !confirmpassword ||
        password.length < 8 ||
        password !== confirmpassword
      ) {
        return res.status(422).send({
          success: false,
          message:
            'Password must be at least 8 characters long and must match the confirm password.',
        });
      }

      next();
    } catch (error) {
      return res.status(422).send({
        success: false,
        message: 'Password and Confirm Password are required.',
      });
    }
  },
  ValidateEmail: (req, res, next) => {
    try {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!req.body.email || !emailPattern.test(req.body.email)) {
        return res.status(400).send({
          success: false,
          message: 'Invalid email format',
        });
      }

      next();
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: 'Email is required',
      });
    }
  },
};
