/// <reference path="jquery.d.ts" />
var LazyImage;
(function (LazyImage_1) {
    var LazyImage = (function () {
        function LazyImage(selector, tresshold) {
            var _this = this;
            if (tresshold === void 0) { tresshold = 200; }
            this.tresshold = tresshold;
            this.elements = [];
            this.attributesMap = {
                'data-srcset': 'srcset',
                'data-src': 'src'
            };
            this.attachListeners = function () {
                var callback = new Throttle(_this.tryCreateImages);
                window.addEventListener('resize', callback.invoke);
                window.addEventListener('scroll', callback.invoke);
                callback.invoke();
            };
            this.tryCreateImages = function () {
                _this.elements.forEach(function (element, key) {
                    if (_this.canBeCreated(element)) {
                        _this.createImage(element);
                        delete _this.elements[key];
                    }
                });
            };
            this.canBeCreated = function (element) {
                var viewport = {};
                viewport.top = _this.window.scrollTop();
                viewport.bottom = viewport.top + _this.window.height() + _this.tresshold;
                var image = {};
                image.top = element.offset().top;
                image.bottom = image.top + element.outerHeight();
                var topMatches = ((image.top >= viewport.top) && (image.top <= viewport.bottom));
                var bottomMatches = ((image.bottom >= viewport.top) && (image.bottom <= viewport.bottom));
                return topMatches || bottomMatches;
            };
            this.createImage = function (element) {
                $.each(_this.attributesMap, function (from, to) {
                    var attr = element[0].attributes[from];
                    if (attr) {
                        element.attr(to, attr.value);
                    }
                });
                element.css('visibility', 'visible').hide().fadeIn(200);
            };
            this.window = $(window);
            $.each(document.querySelectorAll(selector), function (key, node) {
                var element = $(node);
                if (!element.data('lazy-image')) {
                    element.data('lazy-image', true);
                    element.css('visibility', 'hidden');
                    _this.elements.push(element);
                }
            });
            this.attachListeners();
        }
        return LazyImage;
    })();
    LazyImage_1.LazyImage = LazyImage;
    var Throttle = (function () {
        function Throttle(callback) {
            var _this = this;
            this.callback = callback;
            this.inProgress = false;
            this.setThrottle = function (seconds) {
                _this.throttle = seconds;
            };
            this.invoke = function () {
                if (_this.inProgress) {
                    return;
                }
                _this.inProgress = true;
                _this.timer = setTimeout(function () {
                    _this.callback();
                    _this.inProgress = false;
                }, _this.throttle);
            };
            this.setThrottle(1000 / 15); // 15fps
        }
        return Throttle;
    })();
})(LazyImage || (LazyImage = {}));
//# sourceMappingURL=lazyImage.js.map