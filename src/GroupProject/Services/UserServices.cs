using GroupProject.Data;
using GroupProject.Interfaces;
using GroupProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupProject.Services
{

    public class UserServices : IUserServices
    {
        public IGenericRepository _repo;

        public UserServices(IGenericRepository repo)
        {
            _repo = repo;
        }

        public List<ApplicationUser> GetUsers()
        {

            //var users = _repo.Query<ApplicationUser>().ToList();
            List<ApplicationUser> users = (from u in _repo.Query<ApplicationUser>()
                                           select new ApplicationUser
                                           {
                                               Id = u.Id,
                                               FirstName = u.FirstName,
                                               LastName = u.LastName,
                                               City = u.City,
                                               ZipCode = u.ZipCode,
                                               //Claims = u.Claims
                                           }).ToList();
            return users;
        }

        public ApplicationUser GetUser(string id)
        {
            ApplicationUser user = (from u in _repo.Query<ApplicationUser>()
                                    where u.Id == id
                                    select new ApplicationUser
                                    {
                                        Id = u.Id,
                                        FirstName = u.FirstName,
                                        LastName = u.LastName,
                                        City = u.City,
                                        ZipCode = u.ZipCode,
                                        //Claims = u.Claims,
                                        ConcurrencyStamp = u.ConcurrencyStamp
                                    }).FirstOrDefault();
            return user;
        } 


        public void DeleteUser(string id)
        {
            var userToDelete = GetUser(id);
            _repo.Delete(userToDelete);
        }
    }
}
