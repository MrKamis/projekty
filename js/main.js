let app = angular.module('my-projects', [])
    .controller('list-of-projects', ['$scope', '$http', '$window', ($scope, $http, $window) => {
        $scope.allProjects = [
            {
                title: 'PhotoBlog',
                version: '1.0',
                author: 'mrkamis',
                last_modify: '10.05.2018',
                describe: 'Portal, gdzie można dodawać zdjęcia, usuwać i oceniać!',
                href: 'http://www.mrkamis.cba.pl/',
                git: 'https://www.github.com/mrkamis/photoblogv2.git',
                tags: ['photoblog', 'photo', 'blog', 'zdjecia', 'opinion', 'review']
            }
        ];
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
                method: 'POST',
                url: 'php/getAll.php',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(response => {
                    console.log(response.data);
                });
            $scope.projects = $scope.allProjects;
            return true;
        }

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
    })