import "./ai.js";
var rumus = document.getElementById("rumusEl");
var hasil = document.getElementById("hasilEl");

$('#satuEl').on("click", function() {
  $('#rumusEl').append("1");
})
$('#duaEl').on("click", function() {
  $('#rumusEl').append("2");
})
$('#tigaEl').on("click", function() {
  $('#rumusEl').append("3");
})
$('#empatEl').on("click", function() {
  $('#rumusEl').append("4");
})
$('#limaEl').on("click", function() {
  $('#rumusEl').append("5");
})
$('#enamEl').on("click", function() {
  $('#rumusEl').append("6");
})
$('#tujuhEl').on("click", function() {
  $('#rumusEl').append("7");
})
$('#delapanEl').on("click", function() {
  $('#rumusEl').append("8");
})
$('#sembilanEl').on("click", function() {
  $('#rumusEl').append("9");
})
$('#nolEl').on("click", function() {
  $('#rumusEl').append("0");
})
$('#titikEl').on("click", function() {
  $('#rumusEl').append(".");
})
$('#percentEl').on("click", function() {
  $('#rumusEl').append("%");
})

$('#multiEl').on("click", function() {
  $('#rumusEl').append("^");
})
$('#piEl').on("click", function() {
  $('#rumusEl').append("π");
})
$('#sqrtEl').on("click", function() {
  $('#rumusEl').append("√(");
})
$('#bukaEl').on("click", function() {
   $('#rumusEl').append("(");
})
$('#tutupEl').on("click", function() {
  $('#rumusEl').append(")");
 })
$('#sinEl').on("click", function() {
  $('#rumusEl').append("sin(");
 })
$('#cosEl').on("click", function() {
  $('#rumusEl').append("cos(");
 })
$('#tanEl').on("click", function() {
  $('#rumusEl').append("tan(");
 })



$('#tambahEl').on("click", function() {
  $('#rumusEl').append("+")
})
$('#kurangEl').on("click", function() {
  $('#rumusEl').append("-")
})
$('#kaliEl').on("click", function() {
  $('#rumusEl').append("×")
})
$('#bagiEl').on("click", function() {
  $('#rumusEl').append("÷")
})
$('#deleteEl').on("click", function() {
 var del = document.createTextNode(rumus.textContent.slice(0,-1));
 rumus.innerHTML = "";
 rumus.appendChild(del);

})
//animasi fade out ketika dihapus AC
$('#clearEl').on("click", function() {
  $('#rumusEl').css("opacity","0");
  $('#hasilEl').css("opacity","0");
    setTimeout( function() {
        $('#rumusEl').css("opacity","1");
        $('#hasilEl').css("opacity","1");
        $('#rumusEl').html("");
        $('#hasilEl').html("");
    }, 60)
})
//


//hitung rumusnya

function hitungRumus() {
var pi = rumus.textContent.replace(/π/g, "Math.PI");

// Fix perkalian ()
var fixSin = pi.replace(/\)s/g, ")*s");
var fixCos = fixSin.replace(/\)c/g, ")*c");
var fixTan = fixCos.replace(/\)t/g, ")*t");

var fix = fixTan.replace(/\)\(/g, ")*(");
var fix1 = fix.replace(/1\(/g, "1*(");
var fix2 = fix1.replace(/2\(/g, "2*(");
var fix3 = fix2.replace(/3\(/g, "3*(");
var fix4 = fix3.replace(/4\(/g, "4*(");
var fix5 = fix4.replace(/5\(/g, "5*(");
var fix6 = fix5.replace(/6\(/g, "6*(");
var fix7 = fix6.replace(/7\(/g, "7*(");
var fix8 = fix7.replace(/8\(/g, "8*(");
var fix9 = fix8.replace(/9\(/g, "9*(");
var fix0 = fix9.replace(/0\(/g, "0*(");
var fixPi = fix0.replace(/π\(/g, "π*(");

var fix01 = fixPi.replace(/\)1/g, ")*1");
var fix02 = fix01.replace(/\)2/g, ")*2");
var fix03 = fix02.replace(/\)3/g, ")*3");
var fix04 = fix03.replace(/\)4/g, ")*4");
var fix05 = fix04.replace(/\)5/g, ")*5");
var fix06 = fix05.replace(/\)6/g, ")*6");
var fix07 = fix06.replace(/\)7/g, ")*7");
var fix08 = fix07.replace(/\)8/g, ")*8");
var fix09 = fix08.replace(/\)9/g, ")*9");
var fix00 = fix09.replace(/\)0/g, ")*0");
var fix0Pi = fix00.replace(/\)π/g, ")*π");

// console.log(numbers);

  var operator = {
    '÷' : '/',
    '×' : '*',
    '^' : '**',
  //  '√' : 'Math.sqrt', 
    'sin' : 'Math.sin',
    'cos' : 'Math.cos',
    'tan' : 'Math.tan'
  }
var defineSqrt = fix0Pi.replace(/√/g, "Math.sqrt");
 
var convertOperator =  defineSqrt.replace(/\b(?:÷|×|\^|sin|cos|tan)\b/gi, function(convert){
  return operator[convert];
});


// console.log(convertOperator + "=" + eval(convertOperator));
  try {
  $('#hasilEl').html(eval(convertOperator));
  $('#hasilEl').css("color", "black");
  } catch (error) {
  $('#hasilEl').html("Format Error");
  $('#hasilEl').css("color", "red");
  }
}


$('.btnNum').on("click", function() {
  hitungRumus();
})
$('.btnTop').on("click", function() {
  hitungRumus();
})
$('#jumlahEl').on("click", function() {
  hitungRumus();
  rumus.innerHTML = hasil.textContent;
  hasil.innerHTML ="";
})