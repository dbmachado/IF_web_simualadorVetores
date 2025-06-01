// ==================================================================
// webgl-mobile-input.js
// ==================================================================

var unityCanvas = document.getElementById("unity-canvas");
var mobileInput = null;

function createMobileInput() {
  if (mobileInput) return;
  mobileInput = document.createElement("input");
  mobileInput.id = "webgl-mobile-input";
  mobileInput.type = "text";
  mobileInput.style.position = "absolute";
  mobileInput.style.display = "none";
  mobileInput.style.zIndex = "9999";
  mobileInput.style.border = "1px solid #ccc";
  mobileInput.style.background = "white";
  mobileInput.style.fontSize = "16px"; // evita zoom no iOS
  document.body.appendChild(mobileInput);

  mobileInput.addEventListener("blur", function() {
    var finalText = mobileInput.value;
    mobileInput.style.display = "none";
    if (typeof gameInstance !== "undefined" && gameInstance.SendMessage) {
      // "NomeDoObjetoUnidade" deve coincidir com o nome do GameObject em C#
      gameInstance.SendMessage("NomeDoObjetoUnidade", "OnMobileInputComplete", finalText);
    }
  });
}

function ShowMobileInput(x, y, width, height, initialText) {
  createMobileInput();
  mobileInput.style.left = x + "px";
  mobileInput.style.top = y + "px";
  mobileInput.style.width = width + "px";
  mobileInput.style.height = height + "px";
  mobileInput.value = initialText || "";
  mobileInput.style.display = "block";
  mobileInput.focus();
}

window.ShowMobileInput = ShowMobileInput;