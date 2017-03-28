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
        private getUserById(id) {
            this.userHomeService.getUserById(this.$stateParams[`id`]).then((results) => {
                this.user = results;
            }).catch(() => {
                console.log("error in Profile getUserById");
            });
        }

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

    export class UserProfileController {
        public user;

        constructor(private $stateParams: ng.ui.IStateParamsService, private $http: ng.IHttpService) {
            this.$http.get(`/api/users/` + this.$stateParams["id"]).then((response) => {
                this.user = response.data;
            });
            //console.log(response.data);
        }
    }
    angular.module(`GroupProject`).controller(`UserProfileController`, UserProfileController);


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
    export class PostController {

        public posts;
        private postId;

        constructor(private PostService: GroupProject.Services.PostService,
            private $uibModal: angular.ui.bootstrap.IModalService,
            private accountService: GroupProject.Services.AccountService,
            private $stateParams: angular.ui.IStateParamsService) {
            this.getPosts();
        }

        public isLoggedIn() {
            return this.accountService.isLoggedIn();
        }

        public getPosts() {
            this.PostService.getPosts().then((data) => {
                this.posts = data;
            });
        }

        public getPostById() {
            this.posts = this.PostService.getPostById(this.postId);
        }

        public getUserName() {
            return this.accountService.getUserName();
        }

        //controller for delete posts modal
        showModalDelPost(postId) {
            this.$uibModal.open({

                templateUrl: '/ngapp/views/postDelete.html',
                controller: 'DialogController',
                controllerAs: 'controller',
                resolve: {
                    postId: () => postId,
                },
                size: 'lg'
            }).closed.then(() => {
                this.getPosts();
            });
        }

        //controller for edit
        showModalEditPost(postId) {
            this.$uibModal.open({
                templateUrl: '/ngapp/views/postEdit.html',
                controller: 'EditDialogController',
                controllerAs: 'controller',
                resolve: {
                    postId: () => postId,
                },
                size: 'lg'
            }).closed.then(() => {
                this.getPosts();
            });
        }
    }

    class DialogController {
        public posts;
        public postToSave = {};
        public errorMessages;
        public postToDelete;

        constructor(private PostService: GroupProject.Services.PostService,
            private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
            private $state: angular.ui.IStateService,
            private $stateParams: angular.ui.IStateParamsService,
            private $location: ng.ILocationService, private postId,
            private accountService: GroupProject.Services.AccountService) {

        }

        public isLoggedIn() {
            return this.accountService.isLoggedIn();
        }

        //delete 
        private getPostById() {
            this.postToDelete = this.PostService.getPostById(this.postId);
        }

        public deletePost() {
            this.PostService.deletePost(this.postId)
                .then(() => {
                    this.$state.reload();
                    this.$uibModalInstance.close();


                })


        }

        //cancel delete - exit modal<html>
        public cancel() {
            this.$uibModalInstance.close();
        }
    }

    //edit dialog
    class EditDialogController {
        public postToEdit;

        constructor(private $stateParams: angular.ui.IStateParamsService,
            private PostService: GroupProject.Services.PostService,
            private $state: angular.ui.IStateService,
            private $uibModal: angular.ui.bootstrap.IModalService,
            private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance,
            private postId,
            private accountService: GroupProject.Services.AccountService) {
            this.getPostById();
        }

        public isLoggedIn() {
            return this.accountService.isLoggedIn();
        }

        //cancel - exit modal<html>
        public cancel() {
            this.$uibModalInstance.close();
        }

        private getPostById() {
            console.log("test");
            this.postToEdit = this.PostService.getPostById(this.postId);

        }

        public savePost() {
            this.PostService.savePost(this.postToEdit)
                .then(() => {
                    this.$state.reload();
                    this.$uibModalInstance.close();
                })
                .catch(() => {
                    console.log('Oops! Post Editor not working right now....');
                });
        }
    }

    angular.module('GroupProject').controller('PostController', PostController);
    angular.module('GroupProject').controller('DialogController', DialogController);
    angular.module('GroupProject').controller('EditDialogController', EditDialogController);

    export class PostCreateController {
        public postToSave = {};
        public errorMessages;
        public file;
        public logged;

        constructor(
            private PostService: GroupProject.Services.PostService,
            private $state: angular.ui.IStateService,
            private filepickerService,
            private $scope: ng.IScope,
            private accountService: GroupProject.Services.AccountService) {

            this.logged = this.isLoggedIn();
        }

        public isLoggedIn() {
            return this.accountService.isLoggedIn();
        }

        public savePost() {
            this.PostService.savePost(this.postToSave).then(() => {
                this.$state.go('updates');
            });
            if (!this.logged) {

            }
        }

        public pickFile() {
            this.filepickerService.pick(
                {
                    mimetype: 'image/*',
                    imageQuality: 60
                },
                this.fileUploaded.bind(this)
            );
        }

        public goBack() {
            window.history.back();
            console.log("back one page?");
        }

        public fileUploaded(file) {
            // save file url to database
            this.file = file;
            console.log(this.file);
            console.log(this);
            this.postToSave["item"] = this.file.url;
            console.log(this.postToSave);
            this.$scope.$apply(); // force page to update
        }
    }

    angular.module("GroupProject").controller('postCreateController', PostCreateController);
}
