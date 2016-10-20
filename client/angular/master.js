var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
// Routes to load your new and edit pages with new and edit controllers attached to them!
	$routeProvider

	.when('/',{
		templateUrl: 'partials/main.html',
		controller: 'newController'
	})

	.when('/new',{
		templateUrl: 'partials/new.html',
		controller: 'newController'
	})

	.when('/show/:friend_id',{
		templateUrl: 'partials/show.html',
		controller: 'editController'
	})

	.when('/edit/:friend_id',{
		templateUrl: 'partials/edit.html',
		controller: 'editController'
	})

	.when('/delete/:friend_id',{
		templateUrl: 'partials/main.html',
		controller: 'editController'
	})

	.otherwise({
		redirectTo: '/'
	});
});

app.factory('friendsFactory', ['$http', function($http) {
	var factory = {};

	factory.index = function(callback){
		$http.get('/friends').then(function(response){
			callback(response.data);
		});
	};

	factory.create = function(newfriend,callback){
		$http.post('/friends', newfriend).then(function(response){
			callback(response.data);
		});
	};

	factory.update = function(friend, callback){ 
		console.log(friend);
		console.log('/friends/'+friend._id);
		$http.put('/friends/'+friend._id, friend).then(function(response){
			callback();
		})
	};

	factory.delete = function(friend, callback){
		$http.delete('/friends/'+friend._id).then(function(response){
			callback();
		})
	};

	factory.show = function(friend_id, callback){
		$http.get('/friends/'+friend_id).then(function(response){
			callback(response.data);
		})
	};

	return factory;
}]);


app.controller('newController', function($scope, friendsFactory, $routeParams, $location) {
/*
	THIS INDEX METHOD ACCESSES THE FRIENDS FACTORY AND RUNS THE FRIENDS INDEX.
	WE MIGHT RE USE INDEX A FEW TIMES, SO TO MINIMIZE REPETITION WE SET IT AS A VARIABLE.
*/
	var index = function(){
		friendsFactory.index(function(data){
			$scope.friends = data;
			console.log($scope.friends);
		});
	};
	index();

	$scope.create = function(){
		$scope.errors={};
		friendsFactory.create($scope.newfriend, function(data){
			if(data.errors){
				console.log(data.errors);
				$scope.errors = data.errors;
			} else {
				friendsFactory.index(function(data){
					$scope.friends = data;
					$scope.newfriend = {};
					$location.url('/');
				});
			}
		})
		
	}

	$scope.delete = function(data){
		friendsFactory.delete(data, function(){
			friendsFactory.index(function(data){
				$scope.friends = data;
			})
		})
	}

}); 

app.controller('editController', function($scope, friendsFactory, $routeParams, $location) {

	console.log($routeParams);
	friendsFactory.show($routeParams.friend_id, function(data){
		$scope.friend = data;
		console.log($scope.friend);
	});
	
	
	$scope.update = function(data){
		console.log($scope.updateFriend);
		if (!$scope.updateFriend.friend_id){
			$scope.updateFriend._id = $routeParams.friend_id;
		}
		friendsFactory.update($scope.updateFriend, function(){
			friendsFactory.index(function(data){
				$scope.friends = data;
				$scope.updateFriend = {};
				$location.url('/');
			})
		})
	}

});
