namespace GroupProject.Controllers {
    export class EventsController {
        constructor() {
            //make an http  GET request for events and populate this.eventSources.events
            this.eventSources = [
                {
                    events: [
                        {
                            title: 'Event1',
                            start: '2017-03-04'
                        },
                        {
                            title: 'Event2',
                            start: '2017-03-05'
                        }
                    ],
                    color: 'black',     // an option!
                    textColor: 'white', // an option!
                    backgroundColor: 'red',
                    borderColor: 'light blue',
                    startEditable:true,
                }
                
            ];

            this.uiConfig = {
                calendar: {
                    height: 450,
                    editable: true,
                    selectable: true,
                    header: {
                        left: 'month basicWeek basicDay agendaWeek agendaDay',
                        center: 'title',
                        right: 'today prev,next'
                    },
                    //eventClick: this.uiConfig.alertEventOnClick,
                    //eventDrop: this.uiConfig.alertOnDrop,
                    //eventResize: this.uiConfig.alertOnResize,

                    


                }
            };
        }
        public message = 'Hello New CalendarController';
        public eventSources; 
        public uiConfig; 
    }
}