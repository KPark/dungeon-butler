dungeonButlerModule.directive('jqButton', function ($parse) {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        compile: function (element, attrs) {
            var action = $parse(attrs.ngClick);
            var value = attrs.value;
            if (attrs.ngBind) {
                var value = $parse(attrs.ngBind);
            }
            var html = "<button id='" + attrs.id + "' style='" + attrs.style + "'>" + value + "</button>";
            var newElement = $(html);
            element.replaceWith(newElement);

            return function (scope, element, attrs, controller) {
                element.button();
            };
        }
    };
});