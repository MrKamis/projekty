let app = angular.module('my-projects', [])
    .controller('list-of-projects', ['$scope', '$http', '$window', ($scope, $http, $window) => {
        $scope.allProjects = [];
        $scope.projects = [];
        $scope.goProject = git => {
            $window.open(git, '_blank');
        };
        $scope.search = {
            lookingForValue: '',
            findedTags: [],
            showFinded: () => {
                $scope.projects = [];
                $scope.projects = $scope.search.findedTags;
            }
        };
        $scope.$watch('search.lookingForValue', (newVal, oldVal) => {
            if(newVal == ''){
                return false;
            }
            $scope.search.findedTags = [];
            angular.forEach($scope.allProjects, (value, key) => {
                let isFinded = false;
                angular.forEach(value.tags, (value, key) => {
                    let tmp = new RegExp($scope.search.lookingForValue, 'i');
                    if(tmp.exec(value)){
                        isFinded = true;
                    }
                });
                if(isFinded){
                    $scope.search.findedTags.push(value);
                }
            });
            return($scope.search.showFinded());
        });
        $scope.start = () => {
            $http({
                method: 'GET',
                url: 'php/getAll.php',
            })
                .then(response => {
                    switch(response.data){
                        case '1':

                            //error to do
                            break;
                        default:
                            if(angular.isArray(response.data)){
                                angular.forEach(response.data, (value, key) => {
                                    let project = value;
                                    tags = angular.fromJson(project.tags);
                                    project.tags = tags;
                                    $scope.allProjects.push(project);
                                });
                                $scope.projects = $scope.allProjects;
                            }
                            break;
                    }
                });
        };

        $scope.start(); 

        $scope.loginScreen = () => {
            $window.open('loginScreen.htm', '_self');
        }
    }])
    .directive('oneproject', () => {
        return{
            restrict: 'E',
            template: '<h3 ng-bind="project.title" class="w3-center"></h3>' +
            '<span class="w3-bar"> <span class="w3-left">Autor: <span ng-bind="project.author"></span></span> <span class="w3-right">Data ostatniej modyfikacji: <span ng-bind="project.last_modify"></span></span></span>' +
            '<hr>' +
            '<div class="w3-center">Krótki opis: <i ng-bind="project.describe"></i></div>' +
            '<hr>' +
            '<sub> <div class="w3-center" ng-bind="project.href"></div></sub><br>'
        }
    });

let appLogowanie = angular.module('my-projects-login', [])
    .controller('main', ['$scope', '$http', '$window', ($scope, $http, $window) => {
        $scope.user = {
            login: '',
            password: '',
            logged: false
        };
        $scope.site = {
            new: false,
            edit: false,
            delete: false
        };
        $scope.loginForm = {
            loginStyle: '',
            passwordStyle: '',
            active: element => {
                switch(element){
                    case 'login':
                        $scope.loginForm.loginStyle = 'w3-bottombar w3-border-red';
                        break;
                    case 'password':
                        $scope.loginForm.passwordStyle = 'w3-bottombar w3-border-red';
                        break;
                }
            },
            deactive: () => {
                $scope.loginForm.loginStyle = '';
                $scope.loginForm.passwordStyle = '';
            }

        };
        $scope.notification = {
            turn: false,
            title: '',
            color: 'w3-green',
            open: (title, color = 'green') => {
                $scope.notification.close();
                $scope.notification.title = title;
                $scope.notification.color = 'w3-' + color;
                $scope.notification.turn = true;
            },
            close: () => {
                $scope.notification.turn = false;
            }
        };
        $scope.newProject = {
            send: () => {
                $http({
                    method: 'POST',
                    url: 'php/newProject.php',
                    data: $.param({
                        project: angular.toJson($scope.newProject)
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then(response => {
                        switch(response.data){
                            case '0':
                                $scope.site.new = false;
                                $scope.notification.open('Dodano projekt');
                                break;
                            case '1':
                                
                                //permissions
                                break;
                            case '2':

                                //some error
                                break;
                        }
                    });
                }
        };
        $scope.start = () => {
            $http({
                method: 'GET',
                url: 'php/getAll.php'
            })
                .then(response => {
                    $scope.allProjects = response.data;
                });
        };
        $scope.start();
        $scope.login = (login, password) => {
            $scope.loginForm.deactive();
            if(login == ''){
                $scope.loginForm.active('login');
                return false;
            }else if(/[<>]/.exec(login)){
                $scope.loginForm.active('login');
                return false;
            }else if(password == ''){
                $scope.loginForm.active('password');
                return false;
            }else{
                $http({
                    method: 'POST',
                    url: 'php/login.php',
                    data: $.param({
                        login: login,
                        password: password
                    }),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                    .then(response => {
                        switch(response.data){
                            case '0':
                                $scope.user.logged = true;
                                return true;
                                break;
                            case '1':
                                $scope.loginForm.active('password');
                                break;
                        }
                    });
                return false;
            }
        };
        $scope.back = () => {
            $window.open('index.htm', '_self');
            return true;
        };
        $scope.delete = element => {
            $http({
                method: 'POST',
                url: 'php/deleteProject.php',
                data: $.param({
                    project: element.git,
                    login: $scope.user.login
                }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(response => {
                    switch(response.data){
                        case '0':
                            $scope.notification.open('Usunięto projekt!');
                            return true;
                            break;
                        case '1':
                            $scope.notification.open('Brak uprawnien', 'red');
                            break;
                    }
                    return false;
                });
        };
        $scope.showMore = element => {
            switch(element){
                case 'new':
                   $scope.site.new = true;
                   return true; 
                    break;
                case 'edit':
                    $scope.site.edit = true;
                    return true;
                    break;
                case 'delete':
                    $scope.site.delete = true;
                    return true;
                    break;

            }
        };
    }])    
