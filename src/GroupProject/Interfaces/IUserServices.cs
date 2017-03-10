using System.Collections.Generic;
using GroupProject.Models;

namespace GroupProject.Interfaces
{
    public interface IUserServices
    {
        List<ApplicationUser> GetUsers();
        ApplicationUser GetUser(string id);
        void DeleteUser(string id);
    }
}