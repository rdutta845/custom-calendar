var app = angular.module("calendarDemoApp", []);
		app.controller("calCntrl", ['$scope',function($scope){
			var count = 0;
			var curDate = new Date();
			var curDay = curDate.getDate();
			var curMonth = curDate.getMonth();
			var curYear = curDate.getFullYear();
			console.log("date->",curDate, curDay, curMonth, curYear);
			$scope.days = ['Su','Mo','Tu','We','Th','Fr','Sa'];
			$scope.months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
			$scope.years=[curYear, curYear+1];
			$scope.dtpick=curDay+" "+$scope.months[curMonth]+" "+curYear;
			$scope.main = false;
			$scope.selectedMonth = curMonth;
			$scope.selectedDay = curDay;
			$scope.selectedYear = $scope.years.indexOf(curYear);
			$scope.firstDay = new Date(curYear, $scope.selectedMonth, 1, 0, 0, 0).getDay();
			$scope.selectedDate = new Date(curYear, $scope.selectedMonth, 1, 0, 0, 0).getDate();
			$scope.setDayCal = [];
			$scope.btnClk = 'double click to view the calender';

			$scope.showDate = function(){
				// console.log("yup");
				// console.log(new Date(curYear, curMonth, 0).getDate());
				$scope.btnClk='one more click';
				if(count>0){
					$scope.main = true;
					$scope.btnClk='click to view the calender';
				}
				
				$scope.setDayCal=[];
				$scope.totDays = $scope.totalDays($scope.selectedMonth, $scope.selectedYear);
				// console.log("curMonth", curMonth);
				for(var i=1; i<=$scope.totDays+$scope.firstDay; i++){
					if(i-$scope.firstDay<=0){
						$scope.setDayCal.push("NA");
					}else{
						$scope.setDayCal.push(i-$scope.firstDay);
					}
				}
				// console.log("$scope.setDayCal", $scope.setDayCal);

				for(var i=0; i<curMonth; i++){
					$("#"+i).addClass('inactive');
				}
				
				count=count+1;
				$scope.chkMnt($scope.selectedMonth);
				$scope.chkYr($scope.selectedYear);
				$scope.chkDay($scope.selectedDay);
				
			}
			$scope.totalDays = function(mnth, year){
				return new Date(year, mnth+1, 0).getDate()
			}

			$scope.monthsIni = function(val){
				var arr = [];
				for(var i=val; i<val+4;i++){
					arr.push($scope.months[i]);
				}
				// console.log("hello");
				// console.log(arr);
				return arr;
			}
			$scope.chkMnt = function(index){
				// console.log("index", index);
				$scope.setDayCal=[];
				$('#'+index).addClass('active');
				$scope.selectedMonth = index;
				for(var i=0;i<12;i++){
					if(i!=index){
						$('#'+i).removeClass('active');
					}
				}
				for(var i=0;i<$scope.totDays+$scope.firstDay;i++){
						$('.day'+i).removeClass('active');
					
				}
				// $scope.firstDay = new Date(curYear, $scope.selectedMonth, 1, 0, 0, 0).getDay();
				// $scope.selectedDate = new Date(curYear, $scope.selectedMonth, 1, 0, 0, 0).getDate();
				$scope.selectedMonth=index;
				
				$scope.firstDay = new Date($scope.years[$scope.selectedYear], $scope.selectedMonth, 1, 0, 0, 0).getDay();
				$scope.totDays = $scope.totalDays($scope.selectedMonth, $scope.selectedYear);
				// console.log("totalDays", $scope.totDays, " ", $scope.firstDay);
				// console.log($scope.totDays+$scope.firstDay);
				for(var i=1; i<=$scope.totDays+$scope.firstDay; i++){
					if(i-$scope.firstDay<=0){
						$scope.setDayCal.push("NA");
					}else{
						$scope.setDayCal.push(i-$scope.firstDay);
					}
				}
				// console.log("$scope.setDayCal", $scope.setDayCal);

				$scope.dtpick=$scope.selectedDay+" "+$scope.months[$scope.selectedMonth]+" "+$scope.years[$scope.selectedYear];
				
				//////////for inactive past days///////
				for(var i=1;i<35;i++){
					$(".day"+i).removeClass('inactive');
				}
				if($scope.selectedMonth<=curMonth){
					console.log("inactive", $scope.selectedMonth, curMonth, curDay);
					for(var i=1; i<curDay; i++){
						$(".day"+i).addClass('inactive');
					}
				}
					
				
				
			}

			$scope.chkYr = function(index){
				// console.log("yr", index);
				$scope.setDayCal=[];
				$scope.selectedYear = index;
				if(index==1){
					$("#yr1").addClass('active');
					$("#yr0").removeClass('active');
				}else{
					$("#yr0").addClass('active');
					$("#yr1").removeClass('active');
				}
				$scope.selectedYear=index;
				$scope.firstDay = new Date($scope.years[$scope.selectedYear], $scope.selectedMonth, 1, 0, 0, 0).getDay();
				$scope.totDays = $scope.totalDays($scope.selectedMonth, $scope.selectedYear);
				// console.log("totalDays", $scope.totDays, " ", $scope.firstDay);
				// console.log($scope.totDays+$scope.firstDay);
				for(var i=1; i<=$scope.totDays+$scope.firstDay; i++){
					if(i-$scope.firstDay<=0){
						$scope.setDayCal.push("NA");
					}else{
						$scope.setDayCal.push(i-$scope.firstDay);
					}
				}
				// console.log($scope.setDayCal);
				$scope.dtpick=$scope.selectedDay+" "+$scope.months[$scope.selectedMonth]+" "+$scope.years[$scope.selectedYear];
				if(curYear==$scope.years[$scope.selectedYear]){
					for(var i=0; i<curMonth; i++){
						$("#"+i).addClass('inactive');
					}
				}else{
					for(var i=0; i<12; i++){
						$("#"+i).removeClass('inactive');
					}
				}

			}

			$scope.chkDay = function(index){
				$('.day'+index).addClass('active');
				// console.log(index);
				for(var i=0;i<$scope.totDays+$scope.firstDay;i++){
					if(i!=index){
						$('.day'+i).removeClass('active');
					}
				}
				$scope.selectedDay = index;
				$scope.dtpick=$scope.selectedDay+" "+$scope.months[$scope.selectedMonth]+" "+$scope.years[$scope.selectedYear];
			}

			$scope.getDayCal = function(val){
				var arr = [];
				if($scope.setDayCal.length>0){
					for(var i=7*val;i<7*(val+1);i++){
						if(i>=$scope.totDays+$scope.firstDay){
							arr.push("NA");
						}else{
							arr.push($scope.setDayCal[i]);
						}
						
					}
				}
				return arr;
			}
			// $scope.setDayCal = function(){
			// 	var arr=[];
			// 	for(var i=1; i<=$scope.totDays+$scope.firstDate; i++){
			// 		arr.push(i);
			// 	}
			// 	console.log("array", arr, totDays);
			// 	return arr;
			// }

			$scope.close = function(){
				$scope.main = false;
			}

		}]);