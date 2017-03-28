namespace GroupProject.Controllers {

    export class HomeController {

    }

    export class RatingController {
        public rating;
        public avgRating;
        public userName = this.accountService.getUserName();
        public UserBeingRated;
        
        public addRating() {
            this.rating.RatedBy = this.userName;
            this.rating.UserBeingRated = this.UserBeingRated;
            this.$http.post(`/api/ratings/`, this.rating).then((response) => {
                this.$state.reload();// replace this with go(`userHome`) later;
            });
        }

        constructor(private accountService: GroupProject.Services.AccountService, private $http: ng.IHttpService, private $state: ng.ui.IStateService, private $stateParams: ng.ui.IStateParamsService) {
            this.UserBeingRated = this.$stateParams[`id`];
            this.$http.get(`/api/ratings/average/` + this.UserBeingRated).then((response) => {
                this.avgRating = response.data;
            });
            }
        }

    export class AllUsersController {
        public users;
        public user;
        public averageRating;

        public getAverageForUserList(user) {
            this.user = this.$stateParams[`id`];
            this.RatingService.getAverageRating(user).then((response) => {
                this.averageRating = response.data
            });
        }


        public deleteUser(id: string) {
            this.$http.delete(`/api/users/` + id).then((response) => {
                this.$state.reload();
            });
        }
        constructor(private RatingService: GroupProject.Services.RatingService, private $http: ng.IHttpService, private $state: ng.ui.IStateService, private $stateParams: ng.ui.IStateParamsService) {
            this.getAverageForUserList(this.user);
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
        public user;
        public search;
        public file;
        public userId;

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

        // get single user by id
        //private getUserById(id) {
        //    this.userHomeService.getUserById(this.$stateParams[`id`]).then((results) => {
        //        this.user = results;
        //    }).catch(() => {
        //        console.log("error in Profile getUserById");
        //    });
        //}

        // get logged in user
        //private getUserById() {
        //    this.userHomeService.getUserById(this.isLoggedIn()).then((data) => {
        //        console.log(this.user);
        //        this.user = data;
        //        console.log(data);
        //    });
        //}
        public saveProfile() {
            if (this.user.profileImage == null) {
                this.user.profileImage = `/images/defaultUser.png`;
            }
            this.userHomeService.saveProfile(this.user).then((data) => {
                    this.$state.go(`userHome`);
                }).catch(() => {
                    console.log(`error in saveProfile`);
                })
            
        }


        public pickFile() {
            this.filepickerService.pick(
                {
                    mimetype: `image/*`,
                    imageQuality: 60
                },
                this.fileUploaded.bind(this)
            );
        }
        public fileUploaded(file) {
            this.file = file;
            this.user.profileImage = this.file.url;
            this.$scope.$apply(); // immediate add
        }
        public cancel() {
            this.$state.go(`home`);
        }
        public getUserName() {
            return this.accountService.getUserName();
        }
        public getClaim(type) {
            return this.accountService.getClaim(type);
        }
        public isLoggedIn() {
            return this.accountService.isLoggedIn();
        }
        public logout() {
            this.accountService.logout();
        }

        constructor(private $http: ng.IHttpService, private filepickerService, private userHomeService: GroupProject.Services.UserHomeService, private accountService: GroupProject.Services.AccountService, private $stateParams: ng.ui.IStateParamsService, private $state: angular.ui.IStateService, private $scope: ng.IScope) {
            this.$http.get(`/api/users/` + this.$stateParams["id"]).then((results) => {
                this.user = results.data;
            })
            return this.user;
            //this.getUserById();
        };
    }
    angular.module(`GroupProject`).controller(`UserHomeController`, UserHomeController);

    export class OrgHomeController {
        public ratings;
        public users;
        public search;

        public userId = this.accountService.getUserName();
        //gets all ratings associated with a specific username
        public getRatings() {
            this.$http.get(`/api/ratings/` + this.userId).then((response) => {
                this.ratings = response.data;
            });
        }

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
        constructor(private accountService: GroupProject.Services.AccountService, private $http: ng.IHttpService) {
            this.getRatings();
        };
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
