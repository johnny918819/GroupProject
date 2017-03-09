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

    export class MapController {
        public message = 'This is Live form the Map View';
        public center = { latitude: 47.671853, longitude: -122.121328 };
        public zoom = 15;
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
