using System.Collections.Generic;
using GroupProject.Models;

namespace GroupProject.Interfaces
{
    public interface IEventMeetUpServices
    {
        void AddEvent(EventMeetUp evnt);
        void DeleteEvent(int id);
        EventMeetUp EventWithOutAtt(int id);
        EventMeetUp GetEvent(int id);
        List<EventMeetUp> GetEvents();
        void UpdateEvent(EventMeetUp evntUp);
    }
}