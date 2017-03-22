using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using GroupProject.Data;

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

        //profile image prop    
        public string ProfileImage { get; set; }
        public string LookingFor { get; set; }
        public string StatusMessage { get; set; }

    }
    
    
}
