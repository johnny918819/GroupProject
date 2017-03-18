namespace GroupProject.Controllers {

    export class HomeController {

    }

    export class RatingController {
        public input;
        public rating;

        public getIntRating() {
            this.rating = parseFloat(this.input);
            return this.rating;
        }

        public addRating() {
            this.getIntRating();
            this.$http.post(`/api/ratings`, this.rating).then((response) => {
                this.$state.go(`about`);
            });
        }

        constructor(private $http: ng.IHttpService, private $state: ng.ui.IStateService) {

        }
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
        public message = 'This is Live from the Map View';
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
   
    export class UserHomeController {
        public users;
        public search;

        fetch() {
            if (this.search) {
                console.log(`searching ...`);
                this.$http.get(`/api/users/`).then((results) => {
                    this.users = results.data;
                })
                    .catch((results) => {
                        console.error('Could not retrieve data!');
                    });
            }
        }
        constructor(private $http: ng.IHttpService) { };

    }

    export class OrgHomeController {
        public users;
        public search;

        fetch() {
            if (this.search) {
                console.log(`searching ...`);
                this.$http.get(`/api/users/`).then((results) => {
                    this.users = results.data;
                })
                    .catch((results) => {
                        console.error('Could not retrieve data!');
                    });
            }
        }
        constructor(private $http: ng.IHttpService) { };
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
