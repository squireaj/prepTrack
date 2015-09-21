'use strict';

angular.module('prepTrack')
  .controller('MainCtrl', function ($scope, $rootScope, $http) { 
  	//alert, authToken, API_URL, auth, UsersService
	$scope.showReg = function(){
	$scope.newReg = !$scope.newReg;
	}

	$scope.logout = function(){
		return UsersService.logout();
	}
//register

	$scope.submit = function() {
	UsersService.signup($scope.reg_email, $scope.reg_password)
		.then(function(res){
			console.log('success', 'Ok!', 'You are now registered');
			Materialize.toast("Account Created!", 2500, 'toast-success');
				$('#modal1').closeModal();
			 
			  $scope.reg_email = '';
			  $scope.reg_password = '';
			  $scope.password_confirm = '';
		})
		.catch(function(err){
			console.log(err);
			console.log('warning', 'Opps!', 'Could not register');
			$('#modal1').closeModal();
			Materialize.toast("Opps!, You were not registered", 2500, 'toast-warning');
		});

	};


	// Login

		$scope.submitLogIn = function() {
		UsersService.login($scope.email, $scope.password).then(function(new_user) {
			console.log('success', 'Ok!', 'You are now loged in');
			Materialize.toast("You are now loged in!", 2500, 'toast-success');
				$('#modal1').closeModal();
				$scope.email = '';
				$scope.password = '';
		}).catch(function(err) {
			$scope.error = err.message;
			console.log('warning', 'Opps!', 'Could not login');
			Materialize.toast("Incorrect Username/Password!", 2500, 'toast-warning');
			$scope.password = '';
			
		});
	};


  });
