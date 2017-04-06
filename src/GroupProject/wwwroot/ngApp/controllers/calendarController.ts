namespace GroupProject.Controllers {
    export class EventsController {
        public events;
        constructor(private $uibModal: angular.ui.bootstrap.IModalService, private $state: ng.ui.IStateService, private $http: ng.IHttpService, private $scope) {
            this.$http.get("/api/eventmeetups/").then((res) => {
                this.events = res.data;
            })
        }
            
        //    //make an http  GET request for events and populate this.eventSources.events
        //    this.eventSources = [
        //        {
        //            //events: [
        //            //    {
        //            //        title: 'Event1',
        //            //        start: '2017-03-04'
        //            //    },
        //            //    {
        //            //        title: 'Event2',
        //            //        start: '2017-03-05'
        //            //    }
        //            //] ,

        //            color: 'black',     // an option!
        //            textColor: 'white', // an option!
        //            backgroundColor: 'red',
        //            borderColor: 'light blue',
        //            startEditable:true,
        //        }
                
        //    ];

        //    this.uiConfig = {
        //        calendar: {
        //            height: 450,
        //            editable: true,
        //            selectable: true,
        //            header: {
        //                left: 'month basicWeek basicDay agendaWeek agendaDay',
        //                center: 'title',
        //                right: 'today prev,next'
        //            },
        //            //eventClick: this.uiConfig.alertEventOnClick,
        //            //eventDrop: this.uiConfig.alertOnDrop,
        //            //eventResize: this.uiConfig.alertOnResize,

                    


        //        }
        //    };
        //    this.getEvents();
        //}



        //public getEvents() {
        //    this.$http.get("/api/eventMeetUps/").then((res) => {
        //        this.eventSources[0].events = [{ title: "Test", start: new Date(2017, 3, 17) }];
        //        //(<Array<any>>res.data).forEach((e) => {
        //        //    this.eventSources[0].events.push({
        //        //        title: e.title,
        //        //        start: e.start ? e.start.slice(0, e.start.indexOf('T')) : ""
        //        //    });
        //        //});
        //        console.log(this.eventSources[0].events);
        //    })
        //}

         EventModal() {
            this.$uibModal.open({

                templateUrl: '/ngApp/views/modals/createEvent.html',
                controller: EventModalController,
                controllerAs: 'controller',
                resolve: {},
                size: 'md'
            }).closed.then(() => {
                this.$state.reload();
            });
        }

        public message = 'Hello New CalendarController';
        public eventSources; 
        public uiConfig; 
    }

    export class EventModalController {
        public event;
        constructor(
            private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
            private $state: angular.ui.IStateService,
            private $stateParams: angular.ui.IStateParamsService,
            private $location: ng.ILocationService,
            private $http: ng.IHttpService
        ) { }
        //goe for modal and create 

        public createEvent() {
            console.log(this.event);
            this.$http.post("/api/eventMeetUps/", this.event).then((res) => {
                console.log(this.event);
                this.closeModal();
            })
        }

        public closeModal() {
            this.$uibModalInstance.close();
        }

    }
    angular.module("GroupProject").controller("EventModalController", EventModalController);
}