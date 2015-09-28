module.exports = function() {
	(function($) {
		var defaults = {
			callback: function(){},
			imgSelector: 'img'
		};

		$.fn.imgLoad = function(options) {
			options = $.extend({}, defaults, options);
			
			return this.each(function(index, el) {
				var $el = $(this),
					countLoadedImgs = 0,
					$img = $el.find(options.imgSelector),
					countImg = $img.length;

				$img.each(function(index, el) {
					if (this.complete) checkLoaded();
					else this.onload = checkLoaded;
				});
				function checkLoaded() {
					if (countImg == ++countLoadedImgs) options.callback($img);
				}
			});
		};
	})(jQuery);
};