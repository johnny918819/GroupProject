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

        public Task SendEmailAsync(string email, string subject, string message)
        {
            var SendGridKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            Execute(SendGridKey, subject, message, email).Wait();
            return Task.FromResult(0);
        }
        public async Task Execute(string apiKey, string subject, string message, string email)
        {
            var client = new SendGridClient(apiKey);
            var myMessage = new SendGridMessage()
            {
                From = new EmailAddress("letthatbang@gmail.com", "LTB Admin"),
                Subject = subject,
                PlainTextContent = message,
                HtmlContent = message
            };
            myMessage.AddTo(new EmailAddress(email));
            var response = await client.SendEmailAsync(myMessage);
        }

        public Task SendSmsAsync(string number, string message)
        {
            // Plug in your SMS service here to send a text message.
            return Task.FromResult(0);
        }
    }
}
