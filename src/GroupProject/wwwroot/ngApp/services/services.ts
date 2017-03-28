namespace GroupProject.Services {

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

    export class PostService {
        private postResource;

        constructor(private $resource: angular.resource.IResourceService) {
            this.postResource = this.$resource('/api/post/:id');
        }

        //create
        public savePost(postToSave) {
            return this.postResource.save(postToSave).$promise;
        }

        //read
        public getPosts() {
            return this.postResource.query().$promise;
        }

        public getPostById(id) {
            return this.postResource.get({ id: id });
        }

        //delete
        public deletePost(id) {
            return this.postResource.delete({ id: id }).$promise;
        }
    }
    angular.module('GroupProject').service('PostService', PostService);
    }
