using System.Collections.Generic;
using GroupProject.Models;

namespace GroupProject.Interfaces
{
    public interface IRatingsService
    {
        void AddRating(Rating rating);
        void DeleteRating(string id);
        float GetMyAverageRating(string id);
        ApplicationUser GetMyRatings(string id);
        List<Rating> GetRatingByUser(string id);
        List<float> GetRatingForAvg(string id);
        void UpdateAverageRating(string userId, float average);
        void UpdateRating(Rating rating);
    }
}