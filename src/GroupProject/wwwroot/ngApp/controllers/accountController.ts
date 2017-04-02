namespace GroupProject.Controllers {

    export class AccountController {
        public externalLogins;

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
            this.$location.path('/');
        }

        public getExternalLogins() {
            return this.accountService.getExternalLogins();
        }
        //Launch Login Modal
        public loginModal() {
            this.$uibModal.open({
                templateUrl: 'ngApp/views/modals/modalLogin.html',
                controller: LoginController,
                controllerAs: 'modal',
            });
        }

        //Launch Status Modal
        public statusModal() {
            this.$uibModal.open({
                templateUrl: 'ngApp/views/modals/modalStatus.html',
                controller: StatusController,
                controllerAs: 'modal',
                size: "sm"
            });
        }

        constructor(private accountService: GroupProject.Services.AccountService, private $location: ng.ILocationService, private $uibModal: ng.ui.bootstrap.IModalService, private $scope: ng.IScope, private $state: ng.ui.IStateService) {
            this.getExternalLogins().then((results) => {
                this.externalLogins = results;
            });
        }
    }

    angular.module('GroupProject').controller('AccountController', AccountController);


    export class LoginController {
        public loginUser;
        public validationMessages;

        public login() {
            this.accountService.login(this.loginUser).then(() => {
                if (sessionStorage.getItem('claims') == `Org1`) {
                    this.$location.path(`/userHome`)
                }else
                    this.$location.path('/userHome');
                this.$uibModalInstance.close();
            }).catch((results) => {
                this.validationMessages = results;
            });
        }

        constructor(private accountService: GroupProject.Services.AccountService, private $location: ng.ILocationService, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, private $state: ng.ui.IStateService, private $scope: angular.IScope) { }
    }
    export class StatusController {
        public statusMessage;
        public lookingFor;
        public info;
        public ok() {

            this.statusService.saveStatus({ lookingFor: this.lookingFor, statusMessage: this.statusMessage }).then(() => {
                this.$uibModalInstance.close();
            }).catch((results) => {
                console.log("Save status Failed");
            });
        }

        constructor(private accountService: GroupProject.Services.AccountService, private userHomeService: GroupProject.Services.UserHomeService, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance, private $scope: ng.IScope, private statusService: GroupProject.Services.StatusService) {
            userHomeService.getUserById(accountService.getUserName()).then((data) => {
                this.info = data;
                this.statusMessage = this.info.statusMessage;
                this.lookingFor = this.info.lookingFor;
            });

        }
    }


    export class RegisterController {
        public registerUser;
        public validationMessages;

        public register() {
            this.accountService.register(this.registerUser).then(() => {
                this.$location.path('/home');
            }).catch((results) => {
                this.validationMessages = results;
            });
        }

        constructor(private accountService: GroupProject.Services.AccountService, private $location: ng.ILocationService) { }
    }





    export class ExternalRegisterController {
        public registerUser;
        public validationMessages;

        public register() {
            this.accountService.registerExternal(this.registerUser.email)
                .then((result) => {
                    this.$location.path('/');
                }).catch((result) => {
                    this.validationMessages = result;
                });
        }

        constructor(private accountService: GroupProject.Services.AccountService, private $location: ng.ILocationService) {}

    }

    export class ConfirmEmailController {
        public validationMessages;

        constructor(
            private accountService: GroupProject.Services.AccountService,
            private $http: ng.IHttpService,
            private $stateParams: ng.ui.IStateParamsService,
            private $location: ng.ILocationService
        ) {
            let userId = $stateParams['userId'];
            let code = $stateParams['code'];
            accountService.confirmEmail(userId, code)
                .then((result) => {
                    this.$location.path('/');
                }).catch((result) => {
                    this.validationMessages = result;
                });
        }
    }

}
