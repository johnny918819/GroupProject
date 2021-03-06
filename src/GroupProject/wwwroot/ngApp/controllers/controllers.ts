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
                this.$http.put(`/api/ratings/` + this.UserBeingRated, this.avgRating).then((response) => {
                    this.$state.go(`userHome`);
                });
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
        //public formattedAverageRating;

        public deleteUser(id: string) {
            this.$http.delete(`/api/users/` + id).then((response) => {
                this.$state.reload();
            });
        }
        constructor(private RatingService: GroupProject.Services.RatingService, private $http: ng.IHttpService, private $state: ng.ui.IStateService, private $stateParams: ng.ui.IStateParamsService) {
            this.$http.get("/api/users").then((response) => {
                this.users = response.data;
            });
            //Fix this to display the rating in a #.## format
            //this.formattedAverageRating = (Math.round(100 * this.users.averageRating) / 100).toFixed(2);
        }
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
        public posts;
        public id;

        constructor(private $http: ng.IHttpService, private filepickerService, private PostService: GroupProject.Services.PostService, private userHomeService: GroupProject.Services.UserHomeService, private accountService: GroupProject.Services.AccountService, private $stateParams: ng.ui.IStateParamsService, private $state: angular.ui.IStateService, private $scope: ng.IScope)
        {
            this.$http.get(`/api/users/` + this.id).then((results) => {
                this.user = results.data;
                this.id = this.user.id;
                this.getUserPosts();

                console.log(this.posts);
            });
            
            //return this.user;
            
            
        }

        public getUserPosts()
        {
            this.PostService.getPosts().then((data) => {
                this.posts = data;
            //this.PostService.getUserPosts(this.id)
        
        //    this.$http.get(`/api/post/userposts/` + id).then((response) => {
        //this.posts = response.data;
            });
            console.log(this.posts);
        }
    } 

    angular.module(`GroupProject`).controller(`UserHomeController`, UserHomeController);

    export class UserProfileController {
        public user;
        public userProfileId;

        public goBack() {
            window.history.back();
            console.log("back one page?");
        }

        constructor(private $stateParams: ng.ui.IStateParamsService, private $http: ng.IHttpService) {
            this.userProfileId = this.$stateParams[`id`];
            this.$http.get(`/api/users/profile/` + this.userProfileId).then((response) => {
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

        ////controller for edit
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
                    console.log('Oops! Post Editor err buddy ....');
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
                this.$state.go('userHome');
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
