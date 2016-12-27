'use strict';

var app = angular.module('app', []);

app.directive('testSkyWell', ['mainFactory', function (mainFactory) {
	return {
		scope: {},
		templateUrl: 'mainTpl.html',
		restrict: 'E',
		controllerAs: "main",
 		bindToController: true,
		controller: function () {
			var self = this;			
			var get = mainFactory.getJson();
			get.then(function (val) {
				self.arr = val.skywell;
				self.concat = val.concat;
			});
			this.size = 3
			this.del = function (index) {
				this.arr.splice(index, 1);
			}
			this.start = function () {
				var a = [];
				for (var i = 0; i < this.size; i++) {
					if((i % 2) == 0) {
						a.push(self.concat[0]);
					}else {
						a.push(self.concat[1]);
					}					
				}
				self.arr = self.arr.concat(a);
			}
		},
		link: function(scope, elm, attrs) {			
		    var bod = angular.element(document.body);
		    var win = angular.element(window);
		    win.bind("scroll", function() {
		       	if (scope.main.check && (win[0].pageYOffset + win[0].innerHeight >= bod[0].scrollHeight)) {
		            scope.$apply(scope.main.start());
		            }
		        });
            }
	};
}]);
app.factory('mainFactory', ['$http', '$q', function ($http, $q) {
	return {
		getJson: function(){
			var defr = $q.defer();
			$http.post('sky_well.json').
			success(function(data, status, headers, config) {
				defr.resolve(data);
			});
			return defr.promise;
		}
	};
}]);