namespace GroupProject.Services {

    export class RatingService {

        public getAverageRating(user) {
            return this.$http.get(`/api/ratings/average/` + user);
        }

        constructor(private accountService: GroupProject.Services.AccountService, private $http: ng.IHttpService, private $state: ng.ui.IStateService, private $stateParams: ng.ui.IStateParamsService) {
        }
    }
    angular.module(`GroupProject`).service(`RatingService`, RatingService);

    export class UserHomeService {
        private usersResource;

        public getUserById(id) {
            var user = this.usersResource.get({ id: id }).$promise;
            return user;
        }
        //public getUserById(id) {
        //    return this.usersResource.get({ id: id }).$promise;
        //}
        public getUserInfo() {
            return this.usersResource.getUserInfo();
        }
        public saveProfile(profileToSave) {
            return this.usersResource.save(profileToSave).$promise;
        }
        constructor(private $resource: angular.resource.IResourceService) {
            this.usersResource = this.$resource(`/api/users/:id`);
        }
    }
    angular.module(`GroupProject`).service(`userHomeService`, UserHomeService);

    export class StatusService {
        private statusResource;

        public saveStatus(status) {

            return this.statusResource.save(status).$promise;
        }
        constructor(private $resource: angular.resource.IResourceService) {
            this.statusResource = $resource("/api/status/:id");
        }
    }

    angular.module('GroupProject').service('statusService', StatusService);
    }
