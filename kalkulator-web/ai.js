const rumus = document.getElementById("rumusEl");
let text, prompt;


function ganti(str, obj) {
  for (const x in obj) {
    str = str.replace(new RegExp(x, 'g'), obj[x]);
  }
  return str;
};

 

 function interval(fn, t) {
    fn();
    return(setInterval(fn, t));
}

var i = 0
function timer() {
  i++;
  var time = parseFloat(i/10);
  $("#timer").html(time + "s");
}
setInterval(timer, 100);

function hitung() {
fetch('https://chat.ai.cneko.org/?t=' + text + '&p=' + prompt).then(res => {return res.json()})
.then(data => {
  //console.log(data);
 const result = ganti( data.response, {
   '"' : "", '\n': ' <br> ', 'add':'+'
 });

 $('.loaderWrapper').css("display","none");
 $('#donate').css("display","flex");
  $('#resultEl').html('<md-block>' + result + '</md-block>');
}).catch(e => {
  //console.log(e);
  $('.loaderWrapper').css("display","none");
  $('#resultEl').html('<h2>Failed to Fetch</h2><ul>  <li>Cek kembali jaringan kamu</li> <li>koneksi ke AI gagal</li> <li>coba refresh halaman</li> </ul>');
});
}


$('.modalClose').on('click', function() {
   $('.loaderWrapper').css("display","block");
  $('#resultEl').html('');
  $('#donate').css("display","none");
  $('.modal').css('display', 'none');
});


$('.openModal').on('click', function() {
  if(rumus.textContent.length == 0) {
    alert("Isi rumus terlebih dahulu");
  } else {
  i = 0;
//fix pertambahan
const rumusFix = rumus.textContent.replace("+"," add ");
   
  $('.modal').css('display', 'block');
  text = "kerjakan soal matematika saya, ini rumusnya " + rumusFix + ", dan jelaskan penyelesaian rumus tersebut";
  prompt = text;
  hitung();
  }
});

