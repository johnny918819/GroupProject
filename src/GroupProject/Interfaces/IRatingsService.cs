using System.Collections.Generic;
using GroupProject.Models;

namespace GroupProject.Interfaces
{
    public interface IRatingsService
    {
        void DeleteRating(string id);
        List<Rating> GetRatingByUser(string id);
        void AddRating(Rating rating);
        void UpdateRating(Rating rating);
        float GetMyAverageRating(string id);
    }
}