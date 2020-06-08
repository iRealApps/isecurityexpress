using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Net.Mail;
using System.Net.Mime;
using System.IO;


/// <summary>
/// Summary description for common
/// </summary>
public class commonCarrier
{

    //public common()
    //{
    //    //
    //    // TODO: Add constructor logic here
    //    //
    //}

  

    public static void commonMail(string name, string email, string sourcePage, string userId, string subject, string to, string  uploadResume)
    {

        try
        {
           
            string htmlTemplate = @"<html><head> <meta charset='utf-8'> <title>iRealities</title></head><body> <div style='width:770px; height:auto; margin:0 auto; float:left;'> <img src='cid:logo'> <p style='background:#d1d2d4;'>&nbsp; </p><p style='font-family:Arial; padding-top:15px; font-weight:bold;'>$Title$</p>Name : " + name + "<p> Email :" + email + "</p><p> Message : $message$ </p><div style='background:#d1d2d4; padding-bottom:0; margin-bottom:0; float:left; width:770px;'> <div style='font-family:Arial; float:left; line-height:45px;'> <a style='color:#536675; text-decoration:none; font-size:12px; font-weight:bold; margin-left:20px;' href='http://www.irealities.com' target='_blank'>www.irealities.com</a> <br>To Unsubscribe from the mailing list please click <a href='http://pdc:92/Unsubscribe.aspx?id=$userId$'> Unsubscribe</a> Here </div></div></div></body></html>";
            string file = HttpContext.Current.Server.MapPath(@"~/images/" + "emailLogo/logo.jpg");
         
            string Body = htmlTemplate.Replace("$Title$", subject).Replace("$message$", HttpUtility.HtmlDecode("")).Replace("$userId$", userId);
            AlternateView avHtml = AlternateView.CreateAlternateViewFromString(Body, null, MediaTypeNames.Text.Html);
            LinkedResource inline = new LinkedResource(file, MediaTypeNames.Image.Jpeg);
     
        
            inline.ContentId = "logo";
            avHtml.LinkedResources.Add(inline);

            MailMessage mail = new MailMessage();

            System.IO.MemoryStream ms = new System.IO.MemoryStream();
            System.Net.Mime.ContentType ct = new System.Net.Mime.ContentType(System.Net.Mime.MediaTypeNames.Application.Octet);
            System.Net.Mail.Attachment attach = new System.Net.Mail.Attachment(ms, ct);
            attach.ContentDisposition.FileName = uploadResume;
           

            
            mail.To.Add(to);
            //Attachment at = new Attachment(uploadResume);
            mail.Attachments.Add(attach);

            //System.Net.Mail.Attachment attachment = new System.Net.Mail.Attachment(uploadResume);
            ////attachment.Name = "file.txt";  // set name here
            //mail.Attachments.Add(attachment);
          

            //mail.To.Add("noreply@irealities.com");
            mail.To.Add("dev.irealities@gmail.com");

            //mail.CC.Add("html@iriplco.com");			
            mail.From = new MailAddress("noreply@irealities.com");
            mail.Subject = subject;
            mail.IsBodyHtml = true;

            //string Body = @"<html><head> <meta charset='utf-8'> <title>Future Generali</title></head><body>Name : " + name 
            //    + "<br>Email : " + email + "<br>Message : " + HttpUtility.HtmlDecode(message) + "<br>Source Page : "
            //    + sourcePage + "<br><br>" + " To Unsubscribe from the mailing list please click <a href=http://localhost:49891/Unsubscribe.aspx?id="
            //    + userId + "> + Unsubscribe</a> Here</body></html>";
            mail.Body = Body;
            mail.AlternateViews.Add(avHtml);

            //SmtpClient smtp = new SmtpClient();
            //smtp.Host = "smtp.gmail.com"; //Or Your SMTP Server Address
            //smtp.Credentials = new System.Net.NetworkCredential
            //     ("hardwell1241@gmail.com", "yrealplayer");
            ////Or your Smtp Email ID and Password
            //smtp.EnableSsl = true;
            //smtp.Send(mail);



            SmtpClient smtp = new SmtpClient();
            
            smtp.Host = "relay-hosting.secureserver.net"; //Or Your SMTP Server Address

            smtp.Port = 25;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new System.Net.NetworkCredential
             ("irealities.qa@gmail.com", "Qatest2707@");
          //("noreply@irealities.com", "iripl@123");


            //Or your Smtp Email ID and Password
            smtp.EnableSsl = false;
            smtp.Send(mail);

        }
        catch (Exception ex)
        {

        }
    }
}