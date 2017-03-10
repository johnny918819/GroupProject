using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupProject.Services
{
    public interface IEmailSender
    {
        //Task Execute();
        Task SendEmailAsync(string email, string subject, string message);
    }
}
