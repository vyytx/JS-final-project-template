function create_Enemy() {
    this.x = 96; 
    this.y = 480-32;
    this.direction = {x:0,y:-1};
    this.speed = 64;
    this.pathDes = 0;
    this.hp = 10;
    this.move = function(){
        if( isCollided(enemyPath[this.pathDes].x, enemyPath[this.pathDes].y, this.x, this.y, this.speed/FPS, this.speed/FPS) ){
            // 首先，移動到下一個路徑點
            this.x = enemyPath[this.pathDes].x;
            this.y = enemyPath[this.pathDes].y;
    
            // 指定下一個路徑點
            this.pathDes++;
    
            // 取得前往下一個路徑點的單位向量
            var unitVector = getUnitVector( this.x, this.y, enemyPath[this.pathDes].x, enemyPath[this.pathDes].y );
            this.direction.x = unitVector.x;
            this.direction.y = unitVector.y;
    
        } else {
            // this.x += this.direction.x * this.speed/FPS;
            this.x = this.x + this.direction.x * this.speed/FPS;
            // this.y += this.direction.y * this.speed/FPS;
            this.y = this.y + this.direction.y * this.speed/FPS;
        }
    }
}


var FPS = 60
var IsBuilding = false;
var cursor = {x:0, y:0};
var clock = 0;
var enemies =[];
var enemy = new create_Enemy();
var hp = 100;

var enemyPath = [
    {x:96, y:64},
    {x:384, y:64},
    {x:384, y:192},
    {x:224, y:192},
    {x:224, y:320},
    {x:544, y:320},
    {x:544, y:96}
];


var Slime = {
  x : 128-32,
  y : 0
};



$("#game-canvas").mousemove( function(event) {
  // console.log("x:"+event.pageX+",y:"+event.pageY);
  cursor.x=event.pageX;
  cursor.y=event.pageY;
});
$("#game-canvas").click( function(){
  if(cursor.x<=640&&cursor.x>=576&&cursor.y<=480&&cursor.y>=416){
    IsBuilding = !IsBuilding;
  }else{
    if(IsBuilding===true){
      Slime.x = cursor.x;
      Slime.y = cursor.y;
    }
  }
});


// 創造 img HTML 元素，並放入變數中
var bgImg = document.createElement("img");
var SlimeImg = document.createElement("img");
var SlimeTowerImg = document.createElement("img");
var BadTowerImg = document.createElement("img");
// 設定這個元素的要顯示的圖片
bgImg.src = "images/map.png";
SlimeImg.src = "images/slime.gif";
SlimeTowerImg.src = "images/tower-btn.png";
BadTowerImg.src = "images/tower.png";
// 找出網頁中的 canvas 元素
var canvas = document.getElementById('game-canvas');

// 取得 2D繪圖用的物件
var ctx = canvas.getContext("2d");

function draw(){
    
    if ( clock % 80 == 0 ) {
        var newEnemy = new create_Enemy();
        enemies.push(newEnemy);
    };
    
    for(var i=0; i<enemies.length; i++){
        if (enemies[i].hp<=0) {
            enemies.splice(i,1);
        } else {
            enemies[i].move();
            ctx.drawImage( SlimeImg, enemies[i].x, enemies[i].y);
        }
    }

    // 將背景圖片畫在 canvas 上的 (0,0) 位置
    ctx.drawImage(bgImg,0,0);
    // ctx.drawImage(BadTowerImg,128-32,480-32);
    ctx.drawImage(SlimeTowerImg,640-64,480-64);
    if (IsBuilding === true){
        ctx.drawImage(SlimeImg,cursor.x,cursor.y, 32, 32);
    }
    //ctx.drawImage(BadTowerImg, enemy.x, enemy.y);
    ctx.drawImage(SlimeImg, Slime.x, Slime.y, 32, 32);
    for ( var i=0; i<enemies.length; i++ ) {
        // enemies[i] 是目前正在操作的敵人
        enemies[i].move();
        ctx.drawImage(BadTowerImg, enemies[i].x, enemies[i].y);
        //寫出樹的血量
        ctx.font = "24px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("hp : " + hp,1,32);
    }

 clock++;

}
// 執行 draw 函式
// draw();
setInterval(interval,1000/FPS);

// ---- \\

function interval (){
    draw();
}


function isCollided(pointX, pointY, targetX, targetY, targetWidth, targetHeight) {
    if(     pointX >= targetX
        &&  pointX <= targetX + targetWidth
        &&  pointY >= targetY
        &&  pointY <= targetY + targetHeight
    ){
        return true;
    } else {
        return false;
    }
}

function getUnitVector(srcX, srcY, targetX, targetY) {
    var offsetX = targetX - srcX;
    var offsetY = targetY - srcY;
    var distance = Math.sqrt( Math.pow(offsetX,2) + Math.pow(offsetY,2) );

    var unitVector = {
        x: offsetX/distance,
        y: offsetY/distance
    };
    return unitVector;
}


    
//function IsEnemyAlive(){
    //if(enemy.x = 544 || enemy.y = 96){
        //enemy.hp = 0
    //}
//}
