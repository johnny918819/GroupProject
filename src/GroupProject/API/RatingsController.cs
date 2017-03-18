using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GroupProject.Models;
using GroupProject.Data;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GroupProject.API
{
    [Route("api/[controller]")]
    public class RatingsController : Controller
    {
        private ApplicationDbContext _db;
        //note: CS controller should now be sending the floating integer rating here in a post, pick up here.

        //[Get] the total number of ratings for the user being rated

        //[Perform logic] add 1 to the total number of ratings for the user being rated 
        //[Update] the new total number of ratings for the user being rated
        //[Get] new total number of ratings
        //[Get] the current average rating of the user being rated
        //[Perform logic] add the newly submitted rating to the current rating of the user being rated
        //[Perform logic] divide this new sum by the new total number of ratings for the user being rated
        //[Update] the average rating for the user being rated
        //[Get] the new average rating for the user being rated (for testing only).

        //[HttpPost("{id}")]
        //public IActionResult Post(ApplicationUser appUser)
        //{
        //    _db.Add(float, appUser.rating);
        //    _db.SaveChanges();
        //    return Ok();
        //}
        public RatingsController(ApplicationDbContext db)
        {
            _db = db;
        }
    }
}

