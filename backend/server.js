const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
// const session = require('express-session')

const aboutus = require("./routes/aboutus");
const assignment = require("./routes/assignment");
const assignmentStudent = require("./routes/assignmentStudent");
const auth = require('./routes/auth');
const blog = require("./routes/blog");
const campus = require("./routes/campus");
const comment = require("./routes/comment");
const commonSetting = require("./routes/commonSetting");
const coupon = require("./routes/coupon");
const event = require("./routes/event");
const exam = require("./routes/exam");
const examPool = require("./routes/examPool");
const helper = require("./routes/helper");
const iconBox = require("./routes/iconBox");
const level = require("./routes/level");
const newComment = require("./routes/newComment");
const newsLetter = require("./routes/newsLetter");
const notification = require("./routes/notification");
const part = require("./routes/part");
const partGroup = require("./routes/partGroup");
const price = require("./routes/price");
const program = require("./routes/program");
const programSetting = require("./routes/programSetting");
const question = require("./routes/question");
const replit = require("./routes/replit");
const slider = require("./routes/slider");
const studentBlock = require("./routes/studentBlock");
const studentPayment = require("./routes/studentPayment");
const subject = require("./routes/subject");
const testimonial = require("./routes/testimonial");
const user = require('./routes/user');
const payment = require('./routes/payment');
const company = require("./routes/company");
const file = require("./routes/file");
const feature = require("./routes/feature");
const mongoose = require('./config/database'); //database configuration
const { authenticate, authError } = require('./app/middleware');
const Config= require('./config/config');

const { port, secretKey } = Config;
const app = express();
// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.set('secretKey', secretKey); // jwt secret token
app.use(logger('dev'));
// Set body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({ origin: '*' }));
app.use(fileUpload());

app.get('/api', function(req, res){
  res.json({"status" : "Server Running ...."});
});
// public route
app.use("/api/aboutus", aboutus);
app.use("/api/assignment", assignment);
app.use("/api/assignmentStudent", assignmentStudent);
app.use('/api/auth', auth);
app.use("/api/blog", blog);
app.use("/api/campus", campus);
app.use("/api/comment", comment);
app.use("/api/commonSetting", commonSetting);
app.use("/api/coupon", coupon);
app.use("/api/event", event);
app.use("/api/exam", exam);
app.use("/api/examPool", examPool);
app.use("/api/helper", helper);
app.use("/api/iconBox", iconBox);
app.use("/api/level", level);
app.use("/api/newComment", newComment);
app.use("/api/newsLetter", newsLetter);
app.use("/api/notification", notification);
app.use("/api/part", part);
app.use("/api/partGroup", partGroup);
app.use("/api/price", price);
app.use("/api/program", program);
app.use("/api/programSetting", programSetting);
app.use("/api/question", question);
app.use("/api/replit", replit);
app.use("/api/slider", slider);
app.use("/api/studentBlock", studentBlock);
app.use("/api/studentPayment", studentPayment);
app.use("/api/subject", subject);
app.use("/api/testimonial", testimonial);
app.use("/api/company", company);
app.use("/api/file", file);
app.use("/api/feature", feature);
// private route
app.use('/api/user', [authenticate, authError], user);
app.use("/api/payment", [authenticate, authError], payment);
// handle errors
app.use(function(err, req, res, next) {
	console.log(err);
  if(err.status === 404)
  	res.status(404).json({message: "Not found"});
  else
    res.status(500).json({message: "Something looks wrong :( !!!"});
});

app.listen(port, function(){
	console.log('server listening on port ',port);
});
