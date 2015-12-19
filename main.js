// 創造 img HTML 元素，並放入變數中
var bgImg = document.createElement("img");
var SlimeImg = document.createElement("img");
var SlimeTowerImg = document.createElement("img");
// var slime ={
//   x : 128;
//   y : 480;
// };
// 設定這個元素的要顯示的圖片
bgImg.src = "images/map.png";
SlimeImg.src = "images/slime.gif";
SlimeTowerImg.src = "images/tower-btn.png";
// 找出網頁中的 canvas 元素
var canvas = document.getElementById("game-canvas");

// 取得 2D繪圖用的物件
var ctx = canvas.getContext("2d");
function draw(){
// 將背景圖片畫在 canvas 上的 (0,0) 位置
ctx.drawImage(bgImg,0,0);
ctx.drawImage(SlimeImg,128-32,480-32);
ctx.drawImage(SlimeTowerImg,640-64,480-64);
}
// 執行 draw 函式
// draw();
setInterval(draw,16);
$("#game-canvas").mousemove( function(event) {
console.log("x:"+event.pageX+",y:"+event.pageY);
});
