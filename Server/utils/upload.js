import multer from 'multer';
import multerGridFsStorage from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

let GridFsStorage;

if (multerGridFsStorage.default) {
  GridFsStorage = multerGridFsStorage();
} else {
  GridFsStorage = new multerGridFsStorage.GridFsStorage({
    url: `mongodb://${username}:${password}@cluster2.vwiv9hd.mongodb.net/?retryWrites=true&w=majority`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
      const match = ["image/png", "image/jpg"];

      if (match.indexOf(file.mimetype) === -1) {
        return `${Date.now()}-blog-${file.originalname}`;
      }

      return {
        bucketName: "photos",
        filename: `${Date.now()}-blog-${file.originalname}`
      };
    }
  });
}

const storage = multer({ storage: GridFsStorage });

export default storage;
