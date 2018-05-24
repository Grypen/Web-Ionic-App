angular.module('Hotelrooms', ['ionic'])

  // Lägg till denna metod för att visa flikarna längst ner på Android.
  .config(function ($ionicConfigProvider) {
    $ionicConfigProvider.platform.android.tabs.position("bottom");
  })

  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/tab/home");

    $stateProvider

      .state("tabs", {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
      })

      .state("tabs.home", {
        url: "/home",
        views: {
          "home-tab": {
            templateUrl: "templates/home.html"
          }
        }
      })

      .state("tabs.list", {
        url: "/list",
        views: {
          "list-tab": {
            controller: "ListController",
            templateUrl: "templates/list.html"
          }
        }
      })
      .state("tabs.detail", {
        url: "/list/:name",
        views: {
          "list-tab": {
            templateUrl: "templates/detail.html",
            controller: "ListController"
          }
        }
      })

  })

  /*.maxValue("max",function($scope){
    
  })*/
  .controller("MyFormCtrl", function ($scope, $http, $state, $ionicPopup, $filter, $timeout) {


    $scope.data = {};

    $scope.submit = function () {

      $http.get('../model/data.json')
        .success(function (data) {
          $scope.room = data;


          $scope.diffDate = function (indate, outdate) {

            var indate = new Date(indate);
            var outdate = new Date(outdate);

            var timeDiff = Math.abs(outdate.getTime() - indate.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            var diffD = parseInt(diffDays);
            if (diffD == 0) {
              diffD = 1;
            }
            $scope.diffD = diffD;
            return diffD;
          };

          $scope.getbookdate = function () {
            $scope.bookdate = $filter("date")($scope.data.indate, "yyyy-MM-dd");
            console.log($scope.bookdate);
          }
          $scope.today = $filter("date")(Date.now(), 'yyyy-MM-dd');


          //Calculating total price
          $scope.confirm = function () {
            $scope.totalPrice = ($scope.data.pris - 0) * $scope.diffD;
            $scope.data.days = $scope.diffD;
            $scope.data.totPrice = $scope.totalPrice;
            console.log($scope.diffD);
            console.log($scope.totalPrice);
          }


          console.log("Detta är MyFormCtrl");


        });



      $ionicPopup.alert({
        title: "Bokning skickad",
        template: "<h4> Full förnamn: " + $scope.data.namn + " " + $scope.data.Enamn + "</h4>" +
          "<h6>Epost: " + $scope.data.email + "</h6>" +
          "<h5>Telefon: " + $scope.data.telefon + "</h5>" +
          "<h4>Vuxna: " + $scope.data.vuxna + "</h4>" +
          "<h4>Barn: " + $scope.data.barn + "</h4>" +
          "<h4>Checkin: " + $scope.data.indate + "</h4>" +
          "<h4>Checkout: " + $scope.data.outdate + "</h4>" +
          "<h4>Totalpris: " + $scope.data.totalPrice + "</h4>" +
          "<h4>Hotelrum: " + $scope.whichroom + "</h4>"
      });
      console.log($scope.totalPrice);
    };

  })


  // My Controllers
  .controller("ListController", function ($scope, $http, $state, $stateParams, $timeout) {

    // Hämta JSON-listan via HTTP
    $http.get('../model/data.json')
      .success(function (data) {
        $scope.room = data;

        $scope.whichroom = $state.params.name;

        console.log($scope.whichroom);
        $scope.diffDate = function (indate, outdate) {

          var checkin = new Date(indate);
          var checkout = new Date(outdate);
          var timeDiff = Math.abs(checkout.getTime() - checkin.getTime());
          var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
          var diffD = parseInt(diffDays);

          if (diffD == 0) {
            diffD = 1;
          }
          $scope.diffD = diffD;

          return diffD;
        };
        console.log("$state : " + $state);
        console.log($scope.data);
      });
  })

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

// Metoden reorderItem som används i knappen reorder






