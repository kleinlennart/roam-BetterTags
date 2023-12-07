// Helper Functions

function getCaretPosition(ctrl) {
	var CaretPos = 0;

	if (ctrl.selectionStart || ctrl.selectionStart == 0) {
		CaretPos = ctrl.selectionStart;
	}
	return CaretPos;
}

function setCaretPosition(ctrl, pos) {
	if (ctrl.setSelectionRange) {
		ctrl.focus();
		ctrl.setSelectionRange(pos, pos);
	}
	else if (ctrl.createTextRange) {
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}

// Event Listener Function
function setKeyListener() {

	// document.onkeyup = function (event) {

		// if (document.querySelector("textarea")) {

			// onkeydown
			document.querySelector("textarea").onkeydown = function (event) {
				// console.log("e.which:", e.which) // deprecated
				// console.log("e.keyCode:", e.keyCode) // deprecated

				// console.log("e.code:", e.code)
				// console.log("e.key:", e.key) 
				// console.log(e);

				if (event.key == "#") {
					selectedText = window.getSelection().toString()
				}

			}

			// keyup
			document.querySelector("textarea").onkeyup = function (event) {

				// this replaces # with #[[]]
				if (event.key == "#") { // FIXED
					var positionBeforeHashtag = getCaretPosition(document.querySelector("textarea")) - 1

					var text = document.querySelector("textarea").value;

					var firstSection = text.substring(0, positionBeforeHashtag)
					// console.log("first section = " + firstSection)

					var textWithHashtag = text.substring(positionBeforeHashtag, positionBeforeHashtag + 1)

					var lastSection = text.substring(positionBeforeHashtag + 1)
					// alert("last section = " + lastSection)

					var newText = textWithHashtag.replace("#", "#[[" + selectedText + "]]");
					newText = firstSection + newText + lastSection;

					document.querySelector("textarea").value = newText;

					if (!selectedText) {
						setCaretPosition(document.querySelector("textarea"), positionBeforeHashtag + 3)
					}
					else {
						setCaretPosition(document.querySelector("textarea"), positionBeforeHashtag + 3 + selectedText.length)
					}
				}
			}
		}
	// }
// }


var newText;
var selectedText;
setKeyListener();
alert("Running the Dev Version of BetterTags!")