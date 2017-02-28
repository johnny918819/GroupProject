using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupProject.Models
{
    public class Contributor
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Handle { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        
    }
}
