using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GroupProject.Interfaces;
using GroupProject.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GroupProject.API
{
    [Route("api/[controller]")]
    public class EventMeetUpsController : Controller
    {
        private IEventMeetUpServices _evntService;
        public EventMeetUpsController(IEventMeetUpServices evntService)
        {
            _evntService = evntService;
        }

        [HttpGet]
        public List<EventMeetUp> GetEvents()
        {
            return _evntService.GetEvents();
        }
        [HttpGet("{id}")]
        public EventMeetUp GetEvent(int id)
        {
            return _evntService.GetEvent(id);
        }
        [HttpPost]
        public IActionResult Post([FromBody]EventMeetUp evnt)
        {
            if (evnt == null)
            {
                return BadRequest();
            }
            else if (evnt.Id == 0)
            {
                _evntService.AddEvent(evnt);
                return Ok();
            }
            else
            {
                _evntService.UpdateEvent(evnt);
                return Ok();
            }
        }
    }
}
