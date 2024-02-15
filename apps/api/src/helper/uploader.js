const multer = require('multer');
const fs = require('fs');
const path = require('path');

module.exports = {
  uploader: (directory) => {
    const defaultDir = './src/public'; // Adjust the default public directory path

    const storageUploader = multer.diskStorage({
      destination: (req, file, cb) => {
        const pathDir = directory
          ? path.join(defaultDir, directory)
          : defaultDir;

        if (fs.existsSync(pathDir)) {
          cb(null, pathDir);
        } else {
          fs.mkdir(pathDir, { recursive: true }, (err) => {
            if (err) {
              cb(err, pathDir);
            } else {
              cb(null, pathDir);
            }
          });
        }
      },
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    });

    const fileFilter = (req, file, cb) => {
      const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'];
      const isAllowed = allowedExtensions.some((ext) =>
        file.originalname.toLowerCase().includes(ext),
      );

      if (isAllowed) {
        cb(null, true);
      } else {
        cb(
          new Error(
            'Your file extension is denied. Only JPG, PNG, JPEG, or GIF files are allowed.',
            false,
          ),
        );
      }
    };

    return multer({ storage: storageUploader, fileFilter: fileFilter });
  },
};
