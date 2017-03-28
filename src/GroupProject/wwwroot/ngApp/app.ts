namespace GroupProject {

    angular.module('GroupProject', ['ui.router', 'ngResource', 'ui.bootstrap','uiGmapgoogle-maps', `angular-filepicker`]).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider,
        filepickerProvider: any,
        uiGmapGoogleMapApiProvider: any
    ) => {
        filepickerProvider.setKey("ARWSnpkvLRVOx4AjmhXK3z");
        uiGmapGoogleMapApiProvider.configure({
                key: 'AIzaSyBAAwosl9zhJtogtN2BcfcYtgFNZwxeMEA'
        });
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: GroupProject.Controllers.HomeController,
                controllerAs: 'controller'
            })
            .state(`allusers`, {
                url: `/allusers`,
                templateUrl: `/ngApp/views/allusers.html`,
                controller: GroupProject.Controllers.AllUsersController,
                controllerAs: `controller`
            })
            .state('mapview', {
                url: '/mapview',
                templateUrl: '/ngApp/views/mapview.html',
                controller: GroupProject.Controllers.MapController,
                controllerAs: 'controller'
            })
            .state(`userHome`, {
                url: `/userHome/:id`,
                templateUrl: `/ngApp/views/userHome.html`,
                controller: GroupProject.Controllers.UserHomeController,
                controllerAs: `controller`
            })
            .state(`orgHome`, {
                url: `/orgHome`,
                templateUrl: `/ngApp/views/orgHome.html`,
                controller: GroupProject.Controllers.OrgHomeController,
                controllerAs: `controller`
            })
            .state(`editProfile`, {
                url: `/editProfile`,
                templateUrl: `/ngApp/views/editProfile.html`,
                controller: GroupProject.Controllers.UserHomeController,
                controllerAs: `controller`
            })
            .state('secret', {
                url: '/secret',
                templateUrl: '/ngApp/views/secret.html',
                controller: GroupProject.Controllers.SecretController,
                controllerAs: 'controller'

            })
            .state('calendar', {
                url: '/calendar',
                templateUrl: '/ngApp/views/calendar.html',
                controller: GroupProject.Controllers.CalendarController,
                controllerAs: 'controller'

            })
            .state('rating', {
                url: '/rating/:id',
                templateUrl: '/ngApp/views/rating.html',
                controller: GroupProject.Controllers.RatingController,
                controllerAs: 'controller'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/ngApp/views/login.html',
                controller: GroupProject.Controllers.LoginController,
                controllerAs: 'controller'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/ngApp/views/register.html',
                controller: GroupProject.Controllers.RegisterController,
                controllerAs: 'controller'
            })
            .state('externalRegister', {
                url: '/externalRegister',
                templateUrl: '/ngApp/views/externalRegister.html',
                controller: GroupProject.Controllers.ExternalRegisterController,
                controllerAs: 'controller'
            }) 
            .state('about', {
                url: '/about',
                templateUrl: '/ngApp/views/about.html',
                controller: GroupProject.Controllers.AboutController,
                controllerAs: 'controller'
            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });

    
    angular.module('GroupProject').factory('authInterceptor', (
        $q: ng.IQService,
        $window: ng.IWindowService,
        $location: ng.ILocationService
    ) =>
        ({
            request: function (config) {
                config.headers = config.headers || {};
                config.headers['X-Requested-With'] = 'XMLHttpRequest';
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401 || rejection.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(rejection);
            }
        })
    );

    angular.module('GroupProject').config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });

    

}
