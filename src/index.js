/*!
 * https://CoCreateJS.com
 * https://github.com/CoCreateJS/Fullscreen_Toggle
 * Released under the MIT license
 * https://github.com/CoCreateJS/Fullscreen_Toggle/blob/master/LICENSE
 */
import observer from "@cocreate/observer";
import { queryElements } from "@cocreate/utils";
import "./index.css";

function init() {
	let elements = document.querySelectorAll("[fullscreen]");
	initElements(elements);
}

function initElements(elements) {
	for (let element of elements) {
		element.addEventListener("click", function (event) {
			let isFullscreen = element.getAttribute("fullscreen");
			if (!isFullscreen || isFullscreen === "false") {
				let target = document.documentElement;

				// TODO: support array?
				if (element.hasAttribute("fullscreen-query")) {
					target = queryElements({
						element,
						prefix: "fullscreen"
					})[0];
				}

				if (target) {
					element.setAttribute("fullscreen", true);
					requestFullscreen(target);
				}
			} else {
				element.setAttribute("fullscreen", false);
				exitFullscreen();
			}
		});
	}
}

document.addEventListener("fullscreenchange", (event) => {
	if (document.fullscreenElement == null) {
		let elements = document.querySelectorAll('[fullscreen="true"]');
		elements.forEach((elem) => {
			elem.setAttribute("fullscreen", false);
		});
	}
});

/**
 *
 * @public
 * @environment client
 */
function requestFullscreen(element) {
	if (!document.fullscreenElement) {
		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen();
		} else {
			console.log("Fullscreen API is not supported.");
		}
	}
}

/**
 *
 * @public
 * @environment client
 */
function exitFullscreen() {
	if (document.fullscreenElement) {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		} else {
			console.log("Fullscreen API is not supported.");
		}
	}
}

observer.init({
	name: "CoCreateFullscreen",
	types: ["addedNodes"],
	selector: "[fullscreen]",
	callback: (mutation) => initElements([mutation.target])
});

observer.init({
	name: "CoCreateFullscreen",
	types: ["attributes"],
	attributeFilter: ["fullscreen"],
	selector: "[fullscreen]",
	callback: (mutation) => {
		if (mutation.oldValue === null) initElements([mutation.target]);
	}
});

init();

export default { requestFullscreen, exitFullscreen };

/**
 *
 * @name fullscreen
 * @kind attribute
 * @environment client
 */

/**
 *
 * @name fullscreen-query
 * @kind attribute
 * @environment client
 */

/**
 * Toggle any html element to view in fullscreen mode. Easy configuration and targeting using the fullscreen and target attribute.
 *
 * @module fullscreen
 * @environment client
 */

/**
 * Declarative selectors recognized by this module.
 *
 * @name declarative-selectors
 * @kind member
 * @selectors
 * @environment client
 * @example
 * ```json
 * [
 *   "[fullscreen]"
 * ]
 * ```
 */
