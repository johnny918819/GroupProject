using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupProject.Services
{
    // This class is used by the application to send Email and SMS
    // when you turn on two-factor authentication in ASP.NET Identity.
    // For more details see this link http://go.microsoft.com/fwlink/?LinkID=532713
    public class AuthMessageSender : IEmailSender, ISmsSender
    {
        //public AuthMessageSender(IOptions<AuthMessageSenderOptions> optionsAccessor)
        //{
        //    Options = optionsAccessor.Value;
        //}

        //public AuthMessageSenderOptions Options { get; }

        public Task SendEmailAsync(string email, string subject, string message)
        {
            //var myMessage = new SendGrid.SendGridMessage();
            //var myMessage = new SendGridMessage();
            //myMessage.AddTo(email);
            //myMessage.From = new System.Net.Mail.MailAddress("letthatbang@gmail.com", "LTB Admin"); - LEAVE COMMENTED OUT! Stops new user from logging in until email verified
            //myMessage.From = new SendGridMessage.From("letthatbang@gmail.com", "LTB Admin");
            //myMessage.Subject = subject;
            //myMessage.Text = message;
            //myMessage.Html = message;
            var credentials = new System.Net.NetworkCredential(
                "GJCCC",
                "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");

            return Task.FromResult(0);

            // Create a Web transport for sending email.
            //var transportWeb = new SendGrid.Web(credentials);
            //return transportWeb.DeliverAsync(myMessage);

        }

        public Task SendSmsAsync(string number, string message)
        {
            // Plug in your SMS service here to send a text message.
            return Task.FromResult(0);
        }
    }
}
