
// 創造 img HTML 元素，並放入變數中
var bgImg = document.createElement("img");
var SlimeImg = document.createElement("img");
var slime ={
  x : 128;
  y : 480;
};
// 設定這個元素的要顯示的圖片
bgImg.src = "images/map.png";
SlimeImg.src = "images/slime.gif";
// 找出網頁中的 canvas 元素
var canvas = document.getElementById("game-canvas");

// 取得 2D繪圖用的物件
var ctx = canvas.getContext("2d");
function draw(){
// 將背景圖片畫在 canvas 上的 (0,0) 位置
ctx.drawImage(bgImg,0,0);
ctx.drawImage(SlimeImg,slime.x,slime.y);
}
// 執行 draw 函式
// draw();
setInterval(draw,16);
