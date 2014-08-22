dungeonButlerModule.directive('jqButton', function ($parse) {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        compile: function (element, attrs) {
            var action = $parse(attrs.ngClick);
            var html = "<button id='" + attrs.id + "'>" + attrs.value + "</button>";
            var newElement = $(html);
            element.replaceWith(newElement);

            return function (scope, element, attrs, controller) {
                element.button();
            };
        }
    };
});