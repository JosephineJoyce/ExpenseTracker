angular.module('starter.controllers', ['chart.js'])

.controller('ExpenseController', [ '$scope','$rootScope', 'Expense', function($scope, $rootScope, Expense) {
		$scope.newExpense = {};
		$scope.newExpense.category = 'Food';
		$scope.newExpense.expensedate = new Date();
		//Method call to create the expense record
		$scope.addExpense = function()
		{
			Expense.create($scope.newExpense).$promise.then(function(expense)
			{
				$scope.newExpense = {};
				$scope.newExpense.category = 'Food';
    		$scope.newExpense.expensedate = new Date();
			});
		};


	//Method call to draw the chart.  Calls the REST API & forms the angular chart based variables.
  $scope.drawCategoryMonthlyChart = function()
	{
		Expense.getMonthlyCategoryBasedAnalysis().$promise.then(function(results)
		{
      expenseData = results.data;
			var foodPrice = 0, travelPrice = 0, eduPrice = 0, miscPrice = 0;
			for(i=0;i<4;i++)
			{
				 if(expenseData[i].category == "Food")
					 foodPrice = expenseData[i].price;
			                 if(expenseData[i].category == "Travel")
					travelPrice = expenseData[i].price;
			                 if(expenseData[i].category == "Education")
					eduPrice = expenseData[i].price;
			                if(expenseData[i].category == "Miscellaneous")
					miscPrice = expenseData[i].price;
			}

		$rootScope.labels = ['Food','Travel','Education','Miscellaneous'];
		$rootScope.series = ['ThisMonth'];
	       $rootScope.data = [
	          [foodPrice, travelPrice, eduPrice, miscPrice]
               ];
		  })
	};
	}])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
