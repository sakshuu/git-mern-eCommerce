const nodemailer = require("nodemailer")

exports.sendEmail = ({sendTo, sub, subtext, htmlMsg}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:"sakshij300071@gmail.com",
        pass: "ermrqqpjbwcnjoax"
    }
  }) //end
  transporter.sendMail({
    // to: "sakshisjadhav.120@gmail.com",
    to: sendTo,
    from:"sakshisjadhav.120@gmail.com",
    subject:sub,
    html:htmlMsg,
    text: subtext
  },(error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Email Send Successfully");
    }
   })
}