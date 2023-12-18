const multer = require('multer');
const fs = require('fs');

module.exports = {
  uploader: (directory) => {
    const defaultDir = './public';
    const storageUploader = multer.diskStorage({
      destination: (req, file, cb) => {
        const pathDir = directory ? defaultDir + directory : defaultDir;
        if (fs.existsSync(pathDir)) {
          console.log(`Directory ${pathDir} already exists`);
          cb(null, pathDir);
        } else {
          fs.mkdir(pathDir, (err) => {
            if (err) {
              console.log('ERROR CREATE DIRECTORY', err);
            }
            return cb(err, pathDir);
          });
        }
      },
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    });
    const fileFilter = (req, file, cb) => {
      console.log('CHECK FILE FROM REQUEST CLIENT', file);
      if (
        file.originalname.toLowerCase().includes('png') ||
        file.originalname.toLowerCase().includes('jpg') ||
        file.originalname.toLowerCase().includes('jpeg') ||
        file.originalname.toLowerCase().includes('gif')
      ) {
        cb(null, true);
      } else {
        cb(
          new Error(
            'Your file extension are denied, ONLY JPG or PNG files are allowed',
            false,
          ),
        );
      }
    };
    return multer({ storage: storageUploader, fileFilter: fileFilter });
  },
};
