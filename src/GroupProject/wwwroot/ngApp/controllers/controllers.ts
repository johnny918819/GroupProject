namespace GroupProject.Controllers {

    export class HomeController {
        public message = 'Hello from the home page!';
    }

    export class AllUsersController {
        public users;


        public deleteUser(id: string) {
            this.$http.delete(`/api/users/` + id).then((response) => {
                this.$state.reload();
            });
        }
        constructor(private $http: ng.IHttpService, private $state: ng.ui.IStateService) {
            this.$http.get("/api/users").then((response) => {
                    this.users = response.data;
               
            });
        }
    }

    //------------------------------------------------Gino:This the calendar controller
    export class CalendarController {
        public message = 'We Are Live From The Calendar Controller Where You Can Schedule all Your Recording And Production!';
    }
    //-----------------------------------------------Gino: This is the map controller

    export class MapController {
        public message = 'This is Live form the Map View';
        public center = { latitude: 47.671853, longitude: -122.121328 };
        public zoom = 4;
        public markers = [
            {
                id: 0,
                options: {
                    title: 'Seattle Coder Camps',
                },
                icon: '/coder-camps-logo.png',
                latitude: 47.671853,
                longitude: -122.121328
            },
            {
                id: 1,
                options: {
                    title: 'Houston Coder Camps',
                },
                latitude: 29.552561,
                longitude: -95.395219
            },
            {
                id: 3,
                options: {
                    title: 'San Francisco Coder Camps',
                },
                latitude: 37.809499,
                longitude: -122.253665
            }
        ];
       
    }
    export class SecretController {
        public secrets;

        constructor($http: ng.IHttpService) {
            $http.get('/api/secrets').then((results) => {
                this.secrets = results.data;
            });
        }
    }


    export class AboutController {
        public message = 'Hello from the about page!';
    }

   
}
