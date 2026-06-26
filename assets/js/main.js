/*
	Multiverse by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ]
		});

	// Hack: Enable IE workarounds.
		if (browser.name == 'ie')
			$body.addClass('ie');

	// Touch?
		if (browser.mobile)
			$body.addClass('touch');

	// Transitions supported?
		if (browser.canUse('transition')) {

			// Play initial animations on page load.
				$window.on('load', function() {
					window.setTimeout(function() {
						$body.removeClass('is-preload');
					}, 100);
				});

			// FALLBACK DE SEGURIDAD (Seguro anti-ruedita infinita)
			// Si el evento 'load' falla por una imagen no encontrada, 
			// forzamos la apertura de la página al pasar 2 segundos.
				window.setTimeout(function() {
					$body.removeClass('is-preload');
				}, 2000);

			// Prevent transitions/animations on resize.
				var resizeTimeout;

				$window.on('resize', function() {
					window.clearTimeout(resizeTimeout);
					$body.addClass('is-resizing');
					resizeTimeout = window.setTimeout(function() {
						$body.removeClass('is-resizing');
					}, 100);
				});
		}

	// Scroll back to top.
		$window.scrollTop(0);

	// Panels.
		var $panels = $('.panel');

		$panels.each(function() {
			var $this = $(this),
				$toggles = $('[href="#' + $this.attr('id') + '"]'),
				$closer = $('<div class="closer" />').appendTo($this);

			// Closer.
				$closer.on('click', function(event) {
					$this.trigger('---hide');
				});

			// Events.
				$this
					.on('click', function(event) {
						event.stopPropagation();
					})
					.on('---toggle', function() {
						if ($this.hasClass('active'))
							$this.triggerHandler('---hide');
						else
							$this.triggerHandler('---show');
					})
					.on('---show', function() {
						if ($body.hasClass('content-active'))
							$panels.trigger('---hide');
						$this.addClass('active');
						$toggles.addClass('active');
						$body.addClass('content-active');
					})
					.on('---hide', function() {
						$this.removeClass('active');
						$toggles.removeClass('active');
						$body.removeClass('content-active');
					});

			// Toggles.
				$toggles
					.removeAttr('href')
					.css('cursor', 'pointer')
					.on('click', function(event) {
						event.preventDefault();
						event.stopPropagation();
						$this.trigger('---toggle');
					});
		});

		// Global events.
			$body.on('click', function(event) {
				if ($body.hasClass('content-active')) {
					event.preventDefault();
					event.stopPropagation();
					$panels.trigger('---hide');
				}
			});

			$window.on('keyup', function(event) {
				if (event.keyCode == 27 && $body.hasClass('content-active')) {
					event.preventDefault();
					event.stopPropagation();
					$panels.trigger('---hide');
				}
			});

	// Header.
		var $header = $('#header');
		// Links.
			$header.find('a').each(function() {
				var $this = $(this),
					href = $this.attr('href');
				if (!href || href.charAt(0) == '#') return;
				$this
					.removeAttr('href')
					.css('cursor', 'pointer')
					.on('click', function(event) {
						event.preventDefault();
						event.stopPropagation();
						window.location.href = href;
					});
			});

	// Footer.
		var $footer = $('#footer');
		// Copyright.
			$footer.find('.copyright').each(function() {
				var $this = $(this),
					$parent = $this.parent(),
					$lastParent = $parent.parent().children().last();

				breakpoints.on('<=medium', function() { $this.appendTo($lastParent); });
				breakpoints.on('>medium', function() { $this.appendTo($parent); });
			});

	// Main.
		var $main = $('#main');

		// Thumbs.
			$main.children('.thumb').each(function() {
				var	$this = $(this),
					$image = $this.find('.image'), $image_img = $image.children('img'),
					x;

				// No image? Bail.
					if ($image.length == 0) return;

				// Image.
					$image.css('background-image', 'url(' + $image_img.attr('src') + ')');
					if (x = $image_img.data('position')) $image.css('background-position', x);
					$image_img.hide();
			});

		// Poptrox.
			$main.children('.thumb').each(function() {
				var $thisThumb = $(this);
				$thisThumb.poptrox({
					baseZIndex: 20000,
					caption: function($a) {
						var s = '';
						// Obtenemos los textos H2 y P del artículo padre
						var $h2 = $thisThumb.find('h2');
						var $p = $thisThumb.find('p');
						if ($h2.length) s += $h2[0].outerHTML;
						if ($p.length) s += $p[0].outerHTML;
						return s;
					},
					fadeSpeed: 300,
					onPopupClose: function() { $body.removeClass('modal-active'); },
					onPopupOpen: function() { $body.addClass('modal-active'); },
					overlayOpacity: 0,
					popupCloserText: '',
					popupHeight: 150,
					popupLoaderText: '',
					popupSpeed: 300,
					popupWidth: 150,
					selector: '.image, .hidden-gallery a', // Busca tanto la portada como las extra
					usePopupCaption: true,
					usePopupCloser: true,
					usePopupDefaultStyling: false,
					usePopupForceClose: true,
					usePopupLoader: true,
					usePopupNav: true,
					windowMargin: 50
				});
			});

			// Hack: Set margins to 0 when 'xsmall' activates.
				breakpoints.on('<=xsmall', function() {
					$main.children('.thumb').each(function() {
						if (this._poptrox) this._poptrox.windowMargin = 0;
					});
				});

				breakpoints.on('>xsmall', function() {
					$main.children('.thumb').each(function() {
						if (this._poptrox) this._poptrox.windowMargin = 50;
					});
				});

})(jQuery);