const subjectModel = require("../models/subject");
const ipfsAPI = require("ipfs-api");

const ipfs = ipfsAPI("ipfs.infura.io", "5001", { protocol: "https" });
module.exports = {
  create: async function (req, res, next) {
    const { file } = req.body;
    try {
      const result = await ipfs.files.add(file);
      res.status(200).json({
        message: "File uploaded successfully!!!",
        data: result,
      });
    }
    catch (error) {
      res.status(400).json({ message: "error", errors: error });
    }
  },
};
