using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupProject.Models
{
    public class EventMeetUp
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        ////User relationship one to many//
        public ICollection<ApplicationUser> Attendees { get; set; }
        public string Location { get; set; }
        public int MaxCapacity { get; set; }
        public string Description { get; set; }

    }
}
