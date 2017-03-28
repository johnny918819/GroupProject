using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupProject.Models
{
    public class Rating
    {
        public int Id { get; set; }
        public float RatingActual { get; set; }
        public DateTime TimeStamp { get; set; }
        public string RatedBy { get; set; }
        public ApplicationUser User { get; set; }
        public string UserBeingRated { get; set; }
    }
}
