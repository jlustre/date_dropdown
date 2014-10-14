(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * Controller of the irasApp
	 */
	angular.module('irasApp')
	  .controller('RefDateCtrl', function ($scope, refDate) {
	  		$scope.ready = false;
		    $scope.selectedDate = refDate.getSelectedDate();
		    $scope.lastAvailableDate = refDate.getLastAvailDate();
		    $scope.derivedDate =  refDate.getSelectedDate();
		    $scope.NumMonthsBeforeDate = refDate.getNumMonthsBeforeDate();
		    
		    $scope.populate = function(date) {
		    	$scope.selectedDate = date;
		    	if(date.indexOf(' ') === -1) {
				  $scope.derivedDate = date;
				} else {
				  var datesub = date.split(' ');
				  $scope.derivedDate = $scope.processSelect(datesub[0], datesub[1]); 
				}					    	
		    };

		    //Determine the number of days in a specific month of a specific year
	     	//this is considering if a year is a leap year
			$scope.daysInMonth = function (month,year) {
			    return new Date(year, month, 0).getDate();
			};

			$scope.processSelect = function (monthName,year){
				var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				var month = mS.indexOf(monthName) + 1;
				var day = $scope.daysInMonth(month,year);

				if (month.length < 2) month = '0' + month;
			    if (day.length < 2) day = '0' + day;

				var ddate = month + '/' + day + '/' + year;
				$scope.ready = true;
				return ddate; 
			};
			
			$scope.isDerivedValid = function (ndex, year) {
				var cDate = new Date();
				var currentMonthIndex = cDate.getMonth();
				var currentYear = cDate.getFullYear();

				if ((parseInt(currentYear) == parseInt(year)) && (parseInt(currentMonthIndex) <= parseInt(ndex))) {
					return false;
				}
				var startBeforeDate = $scope.NumMonthsBeforeDate;
				var beforeMonthIndex = startBeforeDate.getMonth();
				var beforeYear = startBeforeDate.getFullYear();
				if ((parseInt(beforeYear) == parseInt(year)) && (parseInt(beforeMonthIndex) > parseInt(ndex))) {
					return false;
				}

				return true;
			};
	  })
       
      .controller('MainCtrl', function ($scope) {
      		$scope.message = 'Welcome to IRAS Mobile Application';
       })


	  .directive('referenceDate', [function () {
	  	return {
	  		restrict: 'E',
		    replace: true,
		    template:   '<ul class="dropdown-menu" id="yearslist">' +
		                   '<li><a class="trigger right-caret">Days List</a>' +
		    			        '<ul class="dropdown-menu sub-menu" id="dayslist">' +
						            '<li ng-repeat="day in daysList"><a ng-href="#" ng-click="populate(day)">{{day}}</a></li>' +
					            '</ul>' +
					        '</li>' +
                            '<li ng-repeat="year in yearsList"><a ng-href="#" class="trigger right-caret">{{year}}</a>' +
                            	'<ul class="dropdown-menu sub-menu" id="monthslist">' +
                            		'<li ng-if="isDerivedValid(11, year)"><a ng-href="#" ng-click="populate(\'Dec \' + year)">Dec</a></li>' +
				          			'<li ng-if="isDerivedValid(10, year)"><a ng-href="#" ng-click="populate(\'Nov \' + year)">Nov</a></li>' +
				          			'<li ng-if="isDerivedValid(9, year)"><a ng-href="#" ng-click="populate(\'Oct \' + year)">Oct</a></li>' +
				          			'<li ng-if="isDerivedValid(8, year)"><a ng-href="#" ng-click="populate(\'Sep \' + year)">Sep</a></li>' +
				          			'<li ng-if="isDerivedValid(7, year)"><a ng-href="#" ng-click="populate(\'Aug \' + year)">Aug</a></li>' +
				          			'<li ng-if="isDerivedValid(6, year)"><a ng-href="#" ng-click="populate(\'Jul \' + year)">Jul</a></li>' +
				          			'<li ng-if="isDerivedValid(5, year)"><a ng-href="#" ng-click="populate(\'Jun \' + year)">Jun</a></li>' +
				          			'<li ng-if="isDerivedValid(4, year)"><a ng-href="#" ng-click="populate(\'May \' + year)">May</a></li>' +
				          			'<li ng-if="isDerivedValid(3, year)"><a ng-href="#" ng-click="populate(\'Apr \' + year)">Apr</a></li>' +
				          			'<li ng-if="isDerivedValid(2, year)"><a ng-href="#" ng-click="populate(\'Mar \' + year)">Mar</a></li>' +
				          			'<li ng-if="isDerivedValid(1, year)"><a ng-href="#" ng-click="populate(\'Feb \' + year)">Feb</a></li>' +
				          			'<li ng-if="isDerivedValid(0, year)"><a ng-href="#" ng-click="populate(\'Jan \' + year)">Jan</a></li>' +
					            '</ul>' +
                            '</li>' +
					    '</ul>',
					            
	        controller: function($scope, refDate) {
	        	$scope.daysList = refDate.getDaysList();
	        	$scope.yearsList = refDate.getYearsList();
		    }
	  	};
	  }]);

})();
