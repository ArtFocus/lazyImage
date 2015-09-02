/// <reference path="jquery.d.ts" />

module LazyImage {
	export class LazyImage {
		private window:JQuery;
		private elements:JQuery[] = [];
		private attributesMap = {
			'data-srcset': 'srcset',
			'data-src': 'src'
		};

		public constructor(selector:string, public tresshold:number = 200) {
			this.window = $(window);

			$.each(document.querySelectorAll(selector), (key, node) => {
				var element = $(node);

				if (!element.data('lazy-image')) {
					element.data('lazy-image', true);
					element.css('visibility', 'hidden');
					this.elements.push(element);
				}
			});

			this.attachListeners();
		}

		private attachListeners = () => {
			var callback = new Throttle(this.tryCreateImages);
			window.addEventListener('resize', callback.invoke);
			window.addEventListener('scroll', callback.invoke);
			callback.invoke();
		};

		private tryCreateImages = () => {
			this.elements.forEach((element, key) => {
				if (this.canBeCreated(element)) {
					this.createImage(element);
					delete this.elements[key];
				}
			});
		};

		private canBeCreated = (element:JQuery):boolean => {
			var viewport:Bounds = {};
			viewport.top = this.window.scrollTop();
			viewport.bottom = viewport.top + this.window.height() + this.tresshold;

			var image:Bounds = {};
			image.top = element.offset().top;
			image.bottom = image.top + element.outerHeight();

			var topMatches = ((image.top >= viewport.top) && (image.top <= viewport.bottom));
			var bottomMatches = ((image.bottom >= viewport.top) && (image.bottom <= viewport.bottom));

			return topMatches || bottomMatches;
		};

		private createImage = (element:JQuery) => {
			$.each(this.attributesMap, (from, to) => {
				var attr = element[0].attributes[from];
				if (attr) {
					element.attr(to, attr.value);
				}
			});

			element.css('visibility', 'visible').hide().fadeIn(200);
		};
	}

	interface Bounds {
		top?:number;
		bottom?:number;
	}

	class Throttle {
		private inProgress:boolean = false;
		private throttle:number;
		private timer;

		constructor(public callback:() => void) {
			this.setThrottle(1000 / 15); // 15fps
		}

		public setThrottle = (seconds:number) => {
			this.throttle = seconds;
		};

		public invoke = () => {
			if (this.inProgress) {
				return;
			}

			this.inProgress = true;

			this.timer = setTimeout(() => {
				this.callback();
				this.inProgress = false;
			}, this.throttle);
		};
	}
}
