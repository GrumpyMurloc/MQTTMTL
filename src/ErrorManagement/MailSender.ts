import { ParsedData } from "../DataSource/DataSource"
import nodeMailer from "nodeMailer"

class MailSender {
  
  public static async sendMail(recipients: string[], cause: string, message: string){
    // see https://nodemailer.com/about/ for information
    var transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'log430equipe5@gmail.com',
        pass: '1@2b3c4d'
      }
    });
    
    var mailOptions = {
      from: 'log430equipe5@gmail.com',
      to: recipients,
      subject: 'Investigation required for : '+cause,
      text: message
    };

    transporter.sendMail(mailOptions, function(error:any, info:any){
      if (error) { console.log(error) }
      else { console.log('Email sent: ' + info.response) }
    });
    console.log("finished notification")
  }
}

export default MailSender