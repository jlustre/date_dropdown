(function () {
	'use strict';

	/**
	 * @ngdoc service
	 * @name irasApp.refDate
	 * @description
	 * # refDate
	 * Factory in the irasApp.
	 */
	angular.module('irasApp')
	  .factory('refDate', function (moment) {
	    var currentDate = moment().format('L');
	    var selectedDate = currentDate;
	    var lastAvailableDate = moment().subtract(10, 'days').calendar();			
		var currentDate = new Date();
		var currentMonthIndex = currentDate.getMonth();
		var numMonthsBefore = 270;
		var numDaysBefore = 90;
		var startDate = moment().subtract(numDaysBefore, 'days');
		var numMonthsBeforeDate = moment().subtract(numMonthsBefore, 'months').toDate();
		var startYear = numMonthsBeforeDate.getFullYear();

		var endDate = moment().subtract(1, 'days');

		lastAvailableDate = moment(endDate).format('L');

		var dayslist = new Array();
		var yearslist = new Array();

		dayslist = generateDates(startDate, endDate);
		yearslist = generateYears(startDate, endDate);

		//check if a date is a weekend (Saturday or Sunday)
		function isWeekend(date) {
			var daynum = moment(date).weekday();
			return (daynum == 6) || (daynum == 0); // 6 = Saturday, 0 = Sunday 					
		}

		//get an array of dates based on a range excluding weekends
		function generateDates(startDate, endDate) {
		  var dateArray = new Array();
		  var tempDate = startDate;

		  while (tempDate <= endDate) {
		    if(!isWeekend(tempDate)) {
		    	dateArray.push(moment(tempDate).format('L'));
		    }	        
		    tempDate = moment(tempDate).add(1, 'days');
		  }
		  return dateArray.reverse();
		}

		//get an array of years based on a number of months before
		function generateYears() {
		  var yearsArray = new Array();		    
		  var endYear = currentDate.getFullYear();
		  var tempYear = startYear;

		  while (tempYear <= endYear) {
	    	yearsArray.push(tempYear);        
		    tempYear++;
		  }
		  return yearsArray.reverse();
		}

		var refDateData = {};

		refDateData.getSelectedDate = function () {
	        return selectedDate;
	    };

	    refDateData.getLastAvailDate = function () {
	        return lastAvailableDate;
	    }; 

	    refDateData.getDaysList = function () {
	        return dayslist;
	    }; 

	    refDateData.getYearsList = function () {
	        return yearslist;
	    };

	    refDateData.getNumMonthsBeforeDate = function () {
	        return numMonthsBeforeDate;
	    }; 

	    return refDateData;

	  });

 })();
