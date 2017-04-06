using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupProject.Models
{
    public class EventMeetUp
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        ////User relationship one to many//\
       
        public ICollection<ApplicationUser> Attendees { get; set; }
        public string Location { get; set; }
        public int MaxCapacity { get; set; }
        public string Description { get; set; }

    }
}
