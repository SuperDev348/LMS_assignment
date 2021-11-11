const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const { expiredAfter, secretKey } = require("../../../config/config");
module.exports = {
  create: async function (req, res, next) {
    const user = req.body;
    userModel.findOne({ email: user.email, companyID: user.companyID }, function (err, userInfo) {
      if (err || !userInfo) {
        userModel.create(user, function (err, result) {
          if (err) {
            if (err.errors) {
              res.status(400).json({ message: 'Require data', errors: err.errors });
            } else {
              res.status(500).json({ message: "Internal server error", data: null });
            }
          } else {
            const mailCode = jwt.sign({
              id: result._id,
              expiredAt: new Date().getTime() + expiredAfter,
              email: result.email,
              name: result.name,
            }, secretKey);
            // send the mail here
            console.log(mailCode)
            let returnValue = {}
            returnValue.id = result._id
            if (user.isInvite)
              returnValue.mailCode = mailCode
            res.status(200).json({
              message: "User added successfully!!!",
              data: returnValue,
            });
          }
        });
      }
      else {
        if (user.isInvite) {
          const mailCode = jwt.sign({
            id: userInfo._id,
            expiredAt: new Date().getTime() + expiredAfter,
            email: userInfo.email,
            name: userInfo.name,
          }, secretKey);
          // send the mail here
          console.log(mailCode)
          let returnValue = {}
          returnValue.id = userInfo._id
          returnValue.mailCode = mailCode
          res.status(200).json({
            message: "User added successfully!!!",
            data: returnValue,
          });
          return
        }
        res.status(400).json({ message: "This email already is there." });
      }
    })
  },
  login: function (req, res, next) {
    const { email, password, companyId } = req.body;
    if (password == null || email == null) {
      res.status(400).json({ message: "Bad Request!", data: null });
      return;
    }

    userModel.findOne({ email: email, companyID: companyId }, function (
      err,
      userInfo
    ) {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
      }
      else {
        if (
          userInfo != null &&
          bcrypt.compareSync(password, userInfo.password)
        ) {
          if (!userInfo.activate) {
            res.status(400).json({ message: "You are blocked by admin.", data: null });
            return
          }
          if (userInfo.role !== 'admin' && !userInfo.confirm) {
            res.status(400).json({ message: "Please verify email", data: null });
            return
          }
          const token = jwt.sign(
            {
              id: userInfo._id,
              expiredAt: new Date().getTime() + expiredAfter,
              email: userInfo.email,
            },
            secretKey
          );
          res.status(200).json({
            message: "User found!",
            data: {
              user: userInfo,
              token: token,
            },
          });
          return next();
        } else {
          res.status(400).json({ message: "Invalid email/password!", data: null });
        }
      }
    });
  },
  changePassword: async function (req, res, next) {
    const user = req.body
    userModel.findOne({ _id: user._id }, function (err, userInfo) {
      if (err) {
        res.status(500).json({ message: "Internal server error" });
      }
      else {
        if (
          userInfo != null &&
          bcrypt.compareSync(user.password, userInfo.password)
        ) {
          let newPassword = bcrypt.hashSync(user.newPassword, saltRounds);
          userModel.findByIdAndUpdate(userInfo._id, { password: newPassword }, function (err, result) {
            if (err) res.status(400).json({ message: "Update password failed", data: null });
            else {
              res
                .status(200)
                .json({ message: "Password is updated successfully!", data: { id: result._id } });
            }
          })
        }
        else {
          res.status(400).json({ message: "Invalid email/password!", data: null });
        }
      }
    })
  },
  confirmInvite: async function (req, res, next) {
    const { token, password } = req.body
    jwt.verify(token, secretKey, async (error, decoded) => {
      if (!error) {
        const { id, expiredAt } = decoded;
        if (expiredAt > new Date().getTime()) {
          let newPassword = bcrypt.hashSync(password, saltRounds);
          await userModel.findByIdAndUpdate(id, { confirm: true, password: newPassword });
          res.status(200).json({ message: null, data: { id: id } });
          return;
        } else {
          res.status(400).json({ message: "token expired", data: null });
        }
      }
      res.status(400).json({ message: "incorrect token", data: null });
    });
  },
  checkToken: async function (req, res, next) {
    const { token } = req.body
    jwt.verify(token, secretKey, async (error, decoded) => {
      if (!error) {
        const { id, expiredAt } = decoded;
        if (expiredAt > new Date().getTime()) {
          const user = await userModel.findOne({ _id: id });
          res.status(200).json({ message: null, data: user });
          return
        } 
      }
      res.status(400).json({ message: "incorrect token", data: null });
    });
  },
  verifyEmail: async function (req, res, next) {
    const { token } = req.body
    jwt.verify(token, secretKey, async (error, decoded) => {
      if (!error) {
        const { id, expiredAt, email } = decoded;
        if (expiredAt > new Date().getTime()) {
          const user = await userModel.findOne({ _id: id });
          if (user.email = email) {
            await userModel.findByIdAndUpdate(id, {confirm: true})
            res.status(200).json({ message: null, data: user });
            return
          }
          res.status(400).json({ message: "incorrect token", data: null });
        }
        else {
          res.status(400).json({ message: "token expired", data: null });
        }
      }
      res.status(400).json({ message: "incorrect token", data: null });
    });
  },
  getAll: async function (req, res, next) {
    let users = await userModel.find().select("_id name email avatar role helpline activate");
    res.status(200).json({ message: null, data: users });
  },
  getFilter: async function (req, res, next) {
    const filter = req.body;
    let users = await userModel.find(filter).select("_id name email avatar role helpline activate");
    res.status(200).json({ message: null, data: users });
  },
  getById: function (req, res, next) {
    userModel.findById(req.params.userId, function (err, userInfo) {
      if (err) {
        res.status(404).json({ message: "User not found", data: null });
      } else {
        res.status(200).json({ message: null, data: userInfo });
      }
    });
  },
  updateById: function (req, res, next) {
    const user = req.body;
    userModel.findByIdAndUpdate(req.params.userId, user, function (
      err,
      userInfo
    ) {
      if (err) res.status(400).json({ message: "Update failed", data: null });
      else {
        res
          .status(200)
          .json({ message: "User updated successfully!", data: userInfo });
      }
    });
  },
  deleteById: function (req, res, next) {
    userModel.findByIdAndRemove(req.params.userId, function (err, userInfo) {
      if (err) res.status(400).json({ message: "Delete failed", data: null });
      else {
        res.status(200).json({ message: "User deleted successfully!", data: null });
      }
    });
  },
};
