var todo = angular.module('todo', []);

var list = [{
    'name': 'grocery shopping',
    'done': true
  },
  {
    'name': 'work'
  }];

todo.controller('list', function ($scope) {
  $scope.list = list;
  $scope.text = undefined;
  $scope.add = function() {
    if ($scope.text) {
      $scope.list.push({name: this.text});
      $scope.text = '';
    }
  }
  $scope.new = function() {
    $scope.list = [];
    $scope.text=undefined;
  }
  $scope.checkToggle = function(item) {
    item.done = !item.done;
  }
});
