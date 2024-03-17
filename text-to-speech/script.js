// JavaScript Document

let textArea = document.getElementById("textArea");
let btn = document.getElementsByTagName("button")[0];

btn.addEventListener("click", function () {
  if (textArea.value == "") {
    alert("Gak boleh kosong!");
  } else {
    responsiveVoice.speak(
      textArea.value,

      "Indonesian Female",
      {
        pitch: 1,
        rate: 1,
        volume: 1,
      }
    );
  }
});
