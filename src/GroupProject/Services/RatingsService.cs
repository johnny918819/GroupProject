using GroupProject.Data;
using GroupProject.Interfaces;
using GroupProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupProject.Services
{

    public class RatingsService : IRatingsService
    {
        public float average;

        public IGenericRepository _repo;

        public RatingsService(IGenericRepository repo)
        {
            _repo = repo;
        }

        public List<Rating> GetRatingByUser(string id)
        {
            var rating = _repo.Query<Rating>().Where(r => r.UserBeingRated == id).ToList();
            return rating;
        }

        public List<float> GetRatingForAvg(string id)
        {
            var list = _repo.Query<Rating>().Where(r => r.UserBeingRated == id).Select(r => r.RatingActual).ToList();
            return list;
        }

        public float GetMyAverageRating(string id)
        {
            float sumOfRatings = 0;
            var listOfRatings = GetRatingForAvg(id);
            var totalNumberOfRatings = listOfRatings.Count;
            for (int i = 0; i < totalNumberOfRatings; i++)
            {
                sumOfRatings += listOfRatings[i];
            }
            this.average = sumOfRatings / totalNumberOfRatings;
            return this.average;
        }

        public void UpdateAverageRating(string userId, float average)
        {
            var user = _repo.Query<ApplicationUser>().Where(u => u.Id == userId).FirstOrDefault();
            user.AverageRating = average;
            _repo.SaveChanges();
        }

        public ApplicationUser GetMyRatings(string id)
        {
            var rating = (from u in _repo.Query<ApplicationUser>()
                          where u.Id == id
                          select new ApplicationUser
                          {
                              Id = u.Id,
                          }).FirstOrDefault();
            return rating;
        }

        public void AddRating(Rating rating)
        {
            var user = _repo.Query<ApplicationUser>().Where(u => u.Id == rating.UserBeingRated).FirstOrDefault();
            rating.TimeStamp = DateTime.Now;
            rating.User = user;
            _repo.Add(rating);
        }

        public void UpdateRating(Rating rating)
        {
            _repo.Update(rating);
        }

        public void DeleteRating(string id)
        {
            var ratingToDelete = GetMyRatings(id);
            _repo.Delete(ratingToDelete);
        }

    }

}
