/**
 * @see https://qiita.com/hrdaya/items/6488d8dd3962cf35c0a0
 * @see https://hondou.homedns.org/pukiwiki/pukiwiki.php?Javascript%2520IME%25C6%25FE%25CE%25CF%25C3%25E6%25A4%25CE%25C8%25BD%25C4%25EA
 */
(function($) {
	$.fn.ime = function(passedOptions) {

		var options = $.extend({}, passedOptions);
		var keypressCount = 0;
		var chromeTimer = null;

		$(this).on('keypress keydown keyup', function(event) {
			var $element = $(this);
			var type = event.type;
			var keyCode = event.keyCode;
			var imeMode = getImeMode(event);

			if (chromeTimer) {
				// chrome用タイマーリセット
				clearTimeout(chromeTimer);
				chromeTimer = null;
			}

			if (imeMode == 3) {
				// IME確定
				$element.triggerHandler('ime.finish');
			} else if (imeMode == 2) {
				// IME入力中
				$element.triggerHandler('ime.typing');

				if (type == 'keydown') {
					chromeTimer = setTimeout(function(){
						// IME確定（chromeの場合、IME確定時のkeyupイベントがない）
						$element.triggerHandler('ime.finish');
					}, 500);
				}
			} else if (imeMode == 1) {
				// 直接入力中
				$element.triggerHandler('ime.direct');
			}
		});

		function getImeMode(event) {
			var status = 0;
			if (event.type == 'keypress' && (event.keyCode != 241)
					&& (event.keyCode != 242)) {
				keypressCount++;
			} else if (event.type == 'keyup') {
				keypressCount--;

				if (keypressCount < 0) {
					if (event.keyCode == 13) {
						// IME確定
						status = 3;
					} else {
						// IME入力中
						status = 2;
					}
					keypressCount = 0;
				} else {
					// 直接入力中
					status = 1;
				}
			} else if (event.type == 'keydown' && event.keyCode == 229) {
				// IME入力中
				status = 2;
			}

			return status;
		}

		return this;
	}
})(jQuery);
