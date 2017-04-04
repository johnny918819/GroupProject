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
                                               ProfileImage = u.ProfileImage,
                                               UserName = u.UserName,
                                               FirstName = u.FirstName,
                                               LastName = u.LastName,
                                               City = u.City,
                                               State = u.State,
                                               ZipCode = u.ZipCode,
                                               Talent = u.Talent,
                                               Email = u.Email,
                                               BirthDay = u.BirthDay,
                                               BirthMonth = u.BirthMonth,
                                               Bio = u.Bio,
                                               Sell = u.Sell,
                                               StatusMessage = u.StatusMessage,
                                               AverageRating = u.AverageRating,
                                               //Claims = u.Claims
                                           }).ToList();
            return users;
        }

        public ApplicationUser GetActiveUser(string id)
        {
            ApplicationUser user = (from u in _repo.Query<ApplicationUser>()
                                    where u.UserName == id
                                    select new ApplicationUser
                                    {
                                        Id = u.Id,
                                        UserName = u.UserName,
                                        ProfileImage = u.ProfileImage,
                                        FirstName = u.FirstName,
                                        LastName = u.LastName,
                                        City = u.City,
                                        State = u.State,
                                        ZipCode = u.ZipCode,
                                        Country = u.Country,
                                        Talent = u.Talent,
                                        Email = u.Email,
                                        BirthDay = u.BirthDay,
                                        BirthMonth = u.BirthMonth,
                                        Bio = u.Bio,
                                        Sell = u.Sell,
                                        StatusMessage = u.StatusMessage,
                                        LookingFor = u.LookingFor,
                                        AverageRating = u.AverageRating,
                                        //Claims = u.Claims,
                                        ConcurrencyStamp = u.ConcurrencyStamp
                                    }).FirstOrDefault();
            return user;
        }
        public ApplicationUser GetUserId(string id)
        {
            ApplicationUser user = (from u in _repo.Query<ApplicationUser>()
                                    where u.Id == id
                                    select new ApplicationUser
                                    {
                                        Id = u.Id,
                                        UserName = u.UserName,
                                        ProfileImage = u.ProfileImage,
                                        FirstName = u.FirstName,
                                        LastName = u.LastName,
                                        City = u.City,
                                        State = u.State,
                                        ZipCode = u.ZipCode,
                                        Country = u.Country,
                                        Talent = u.Talent,
                                        Email = u.Email,
                                        BirthDay = u.BirthDay,
                                        BirthMonth = u.BirthMonth,
                                        Bio = u.Bio,
                                        Sell = u.Sell,
                                        StatusMessage = u.StatusMessage,
                                        LookingFor = u.LookingFor,
                                        AverageRating = u.AverageRating,
                                        //Claims = u.Claims,
                                        ConcurrencyStamp = u.ConcurrencyStamp
                                    }).FirstOrDefault();
            return user;
        }

        public void DeleteUser(string id)
        {
            var userToDelete = GetUserId(id);
            _repo.Delete(userToDelete);
        }

        public void SaveProfile(ApplicationUser user, string id)
        {
            var data = _repo.Query<ApplicationUser>().Where(u => u.Id == id).FirstOrDefault();
            data.Id = user.Id;
            data.UserName = user.UserName;
            data.ProfileImage = user.ProfileImage;
            data.FirstName = user.FirstName;
            data.LastName = user.LastName;
            data.City = user.City;
            data.State = user.State;
            data.ZipCode = user.ZipCode;
            data.Country = user.Country;
            data.Talent = user.Talent;
            data.BirthDay = user.BirthDay;
            data.BirthMonth = user.BirthMonth;
            data.Bio = user.Bio;
            data.Sell = user.Sell;
            data.Email = user.Email;

            _repo.SaveChanges();
        }

    }

}
