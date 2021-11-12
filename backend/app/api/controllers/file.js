const subjectModel = require("../models/subject");
const ipfsAPI = require("ipfs-api");

const ipfs = ipfsAPI("ipfs.infura.io", "5001", { protocol: "https" });
module.exports = {
  create: async function (req, res, next) {
    const file = req.body;
    ipfs.files.add(file, function (err, result) {
      if (err) {
        res.status(400).json({ message: "error", errors: err });
        return
      }
      res.status(200).json({
        message: "File uploaded successfully!!!",
        data: result,
      });
    });
  },
};
