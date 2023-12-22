import Sample from '../models/sample.model';

export const getSampleData = async () => {
  return await Sample.findAll();
};

export const getSampleDataById = async () => {
  return { name: 'Sample data' };
};

export const createSampleData = async () => {
  console.log('Successfully create new sample data');
};

// export const register = async (req, res, next) => {
//   try {
//     console.log("Check data from client", req.body);
//     const isExist = await accounts.findOne({
//       where: {
//         email: req.body.email,
//       },
//     });
//     if (isExist) {
//       return res.status(400).send({
//         success: false,
//         message: "Account is exist",
//       });
//     }
//     delete req.body.confirmPassword;

//     const salt = await bcrypt.genSalt(10);
//     console.log("ini salt", salt);
//     const hashPassword = await bcrypt.hash(req.body.password, salt);
//     console.log("ini hash", hashPassword);
//     req.body.password = hashPassword;

//     const result = await accounts.create(req.body);
//     console.log(result);

//     const token = jwt.sign(
//       {
//         id: result.id,
//         email: result.email,
//       },
//       process.env.secretToken,
//       { expiresIn: "1h" }
//     );
//     await transporter.sendMail({
//       from: "SOCIO ADMIN",
//       to: req.body.email,
//       subject: "Registration Info",
//       html: `<h1>Hello ${req.body.username}, salken</h1>
//       <a href="http://localhost:5713/verification/${token}">click link</a>`
//     })
//     return res.status(201).send({
//       success: true,
//       message: "Register success",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send(error);
//   }
// }
// export const login = async (req, res, next) => {
//   try {
//     const result = await accounts.findOne({
//       where: {
//         email: req.body.email,
//       },
//       raw: true,
//     });
//     const token = jwt.sign(
//       { id: result.id, email: result.email, }, process.env.secretToken, { expiresIn: "1h", });
//     return res.status(200).send({
//       success: true,
//       result: {
//         username: result.username,
//         email: result.email,
//         isVerified: result.isVerified,
//         role: result.role,
//         token,
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send(error);
//   }
//}