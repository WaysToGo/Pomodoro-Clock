angular.module('clock', []).controller('clockController', function ($scope, $interval) {

    $scope.sessionTime = 25;
    $scope.breakTime = 5;
    $scope.sessionType = "Session";
    $scope.time = 0;
    var timerStatus = false;

    var sec = 0;



    $scope.addSessionTime = () => {
        $scope.sessionTime += 1;


    }
    $scope.removeSessionTime = () => {
        if ($scope.sessionTime <= 1) {
            $scope.sessionTime = 1;
        } else {
            $scope.sessionTime -= 1;
        }

    }
    $scope.addBreakTime = () => {
        $scope.breakTime += 1;

    }
    $scope.removeBreakTime = () => {
        if ($scope.breakTime <= 1) {
            $scope.breakTime = 1;
        } else {
            $scope.breakTime -= 1;
        }

    }



    function secondsToHms(number) {
        number = Number(number);
        var h = Math.floor(number / 3600);
        var m = Math.floor(number % 3600 / 60);
        var s = Math.floor(number % 3600 % 60);
        return (
            (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
        );
    }
    $scope.startSession = function () {
        sec = $scope.sessionTime * 60;

        if (!$scope.timerStatus) {
            $scope.timerStatus = true;
            runTimer();
            $scope.intervalRun = $interval(runTimer, 1000);
        }

    }
    $scope.stop = function () {
        $scope.sessionTime = 25;
        $scope.breakTime = 5;
        if ($scope.timerStatus) {
            $interval.cancel($scope.intervalRun)

        }

        $scope.timerStatus = false;

    }

    var runTimer = function () {
        sec -= 1;
        if (sec < 0) {
            if ($scope.sessionType === "Session") {
                $scope.sessionType = "Break";
                sec = $scope.breakTime * 60;

            } else {
                $scope.sessionType = "Session";
                sec = $scope.sessionTime * 60;

            }


        }
        $scope.time = secondsToHms(sec);
        
    }


})