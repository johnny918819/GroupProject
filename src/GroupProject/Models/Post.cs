using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupProject.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string comment { get; set; }
        public string item { get; set; }
        public string UserId { get; set; }
        public string User { get; set; }

    }
}
