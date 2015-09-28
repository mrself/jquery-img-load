function l(x) {
	console.log(x);
}
function makeFixture(options) {
	options = $.extend({count: 10, imgClass: ''}, options);
	var $el = $('<div />');
	for (var i = 0; i < options.count; i++) {
		$el.append($('<img />', {
			class: options.imgClass,
			src: 'http://lorempixel.com/900/1900/'
		}));
	}
	return $el;
}
it('jquery img el pass to callback', function() {
	var $el = makeFixture({count: 10});
	$el.imgLoad({
		callback: function($img) {
			assert($img instanceof $);
			assert($img.length == 10);
		}
	});
});
it('loaded img should have height', function() {
	var $el = makeFixture();
	$el.imgLoad({
		callback: function($img) {
			var valid = true;
			$img.each(function(index, el) {
				if (el.height === 0) valid = false;
			});
			assert(valid);
		}
	});
});
it('custom img selector', function() {
	var $el = makeFixture({
		imgClass: 'img'
	});
	$el.imgLoad({
		callback: function($img) {
			assert($el.find('.img')[0] === $img[0]);
		},
		imgSelector: '.img'
	});
});