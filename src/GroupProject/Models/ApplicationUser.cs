using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using GroupProject.Data;
using GroupProject.Services;

namespace GroupProject.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int ZipCode { get; set; }
        public string Country { get; set; }
        public string Talent { get; set; }
        public string ProfileImage { get; set; }
        public string BirthMonth { get; set; }
        public int BirthDay { get; set; }
        public bool IsOnline { get; set; }
        public string Bio { get; set; }
        public string Sell { get; set; }
        public string LookingFor { get; set; }
        public string StatusMessage { get; set; }

        //rating prop
        public ICollection<Rating> Rating { get; set; }
        public float AverageRating { get; set; }

        //Gino add------one to many for User attendees//
        public List<EventMeetUp> Events { get; set; }
    }    
}
