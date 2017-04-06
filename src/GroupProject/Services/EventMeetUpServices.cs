using GroupProject.Interfaces;
using GroupProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupProject.Services
{
    public class EventMeetUpServices : IEventMeetUpServices
    {
        //this my ref to my repository
        public IGenericRepository _repo;
        public EventMeetUpServices(IGenericRepository repo)
        {
            _repo = repo;
        }
        public List<EventMeetUp> GetEvents()
        {
            List<EventMeetUp> eventMeetUps = (from e in _repo.Query<EventMeetUp>()
                                              select new EventMeetUp
                                              {
                                                  Id = e.Id,
                                                  Title = e.Title,
                                                  Attendees = e.Attendees,
                                                  Description = e.Description,
                                                  MaxCapacity = e.MaxCapacity,
                                                  Location = e.Location,
                                                  Start = e.Start,
                                                  End = e.End,


                                              }).ToList();
            return eventMeetUps;

        }

        public EventMeetUp GetEvent(int id) //
        {
            EventMeetUp gEvent = (from e in _repo.Query<EventMeetUp>()
                                  where e.Id == id
                                  select new EventMeetUp
                                  {
                                      Id = e.Id,
                                      Title = e.Title,
                                      Attendees = e.Attendees,
                                      Description = e.Description,
                                      MaxCapacity = e.MaxCapacity,
                                      Location = e.Location,
                                      Start = e.Start,
                                      End = e.End,

                                  }).FirstOrDefault();
            return gEvent;
        }

        public void DeleteEvent(int id)
        {
            EventMeetUp delEvent = GetEvent(id);

            _repo.Delete(delEvent); //---------the "GetEvent is a method wich gets a single event stored is inside the var "gEvent"."

        }

        public void AddEvent(EventMeetUp evnt)
        {
            _repo.Add(evnt);
        }

        public void UpdateEvent(EventMeetUp evntUp)
        {
            _repo.Update(evntUp);
        }
        public EventMeetUp EventWithOutAtt(int id)
        {
            EventMeetUp evnt = (from e in _repo.Query<EventMeetUp>()
                                where e.Id == id
                                select e).FirstOrDefault();
            return evnt;
        }
    }
}
