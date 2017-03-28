using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GroupProject.Services;
using GroupProject.Models;
using GroupProject.Interfaces;
using Microsoft.AspNetCore.Identity;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GroupProject.API
{
    [Route("api/[controller]")]
    public class RatingsController : Controller
    {
        private IRatingsService _ratingService;

        public RatingsController(IRatingsService ratingService)
        {
            _ratingService = ratingService;
        }

        // GET without id
        //[HttpGet]
        //public List<Rating> Get()
        //{
        //    return _ratingService.GetRatings();
        //}

        // GET by id
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var ratings = _ratingService.GetRatingByUser(id);
            return Ok(ratings);
        }

        // GET by id
        [HttpGet("average/{id}")]
        public IActionResult GetAverage(string id)
        {
            double averageRating = _ratingService.GetMyAverageRating(id);
            averageRating = Math.Round(averageRating, 2, MidpointRounding.AwayFromZero);
            return Ok(averageRating);
        }

        // POST 
        [HttpPost]
        public IActionResult Post([FromBody]Rating rating)
        {
            //This is the beginning of the conditional logic block
            if (rating == null)
            {
                return BadRequest();
            }
            else if (rating.Id == 0)
            {
                _ratingService.AddRating(rating);
                return Ok();
            }
            else
            {
                _ratingService.UpdateRating(rating);
                return Ok();
            }
            //This is the end of the conditional logic block
        }

        // PUT
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            _ratingService.DeleteRating(id);
            return Ok();
        }
    }
}
