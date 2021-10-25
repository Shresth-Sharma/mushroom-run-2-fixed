var back,back1,back2,back3,back4;
var mar,mar1,mar2;
var inv;
var backGround;
var score=0;
var kidda,kidda1,kiddaG;
var mob,mob1,mob2;
var END=0;
var PLAY=1;
var START=2;
var gamestate=START;
var GameOver,GameOverImage;
var win,win1;
var key1,key2;
var r=0;
var database;
var plays = 0;
var Plays1 = 0;
function preload(){
back1=loadImage("background.jfif")
  //mar2=loadAnimation("Untitled-2.png","Untitled - Copy.png")
  mar2=loadAnimation("ash2.png","ash3.png")
  mar1=loadImage("ash2.png")
  mob1=loadImage("ball2.png")
  GameOverImage=loadImage("GAMEOVER.png")
  kidda1=loadImage("ball1.png")
  win1=loadImage("WIN.png")
  key2=loadImage("mario game.png")
  
}


function setup() {
 createCanvas(600,300);
 database = firebase.database();
 getState();
  Plays1 = plays
  plays = plays+1
  getState();
  update(plays);
  back2=createSprite(1050,150,600,300);
  back2.addImage("back",back1)
  back2.scale=2
  
  back3=createSprite(750,150,600,300);
  back3.addImage("back",back1)
  back3.scale=2
  
  back4=createSprite(450,150,600,300);
  back4.addImage("back",back1)
  back4.scale=2
  
  back=createSprite(150,150,600,300);
  back.addImage("back",back1)
  back.scale=2
  
  
  mar=createSprite(90,150,10,10)
  mar.addAnimation("mar",mar2);
  mar.scale=0.3
  
  inv=createSprite(300,300,600,5)
  inv.visible=false;
  
  GameOver=createSprite(300,150,10,10);
  GameOver.addImage("k",GameOverImage)
  GameOver.visible=false;
  
  win=createSprite(300,150,10,10);
  win.addImage("kf",win1)
  win.visible=false;
  
  key1=createSprite(300,150,10,10);
  key1.addImage("key2",key2)
  key1.scale=1
  key1.visible=true;
  
  backGround=createGroup();
  backGround.add(back);
  backGround.add(back2);
  backGround.add(back3);
  backGround.add(back4);
  kiddaG=createGroup();
  mob2=createGroup();
  
}

function draw() {
  
  
 
  backGround.setVelocityEach(0,0);
   mar.velocityY=mar.velocityY+1.5
  
  mar.collide(inv);
  if(gamestate===START){
    if (keyWentDown("enter")){
      gamestate=PLAY;
      
  
    }
   
  }
  if (gamestate===PLAY){
     key1.visible=false;
     
     background("red")
        if (mar.y-kiddaG.y<kiddaG.height/2+mar.height/2){
        score=score+1
        }
        backGround.setVelocityEach(-5,0);
    if(score===10){
      win.visible=true;
      kiddaG.destroyEach();
      kiddaG.setVelocityEach(0,0);
      mob2.destroyEach();
      mob2.setVelocityEach(0,0);
    }
  }
      if(gamestate===END){
          mar.addImage("mar",mar1);
        GameOver.visible=true;
      }
  console.log(score)
  if(back.x<-150){
    back.x=750
  }
   if (back2.x<-150){
     back2.x=750
   }
  if(back3.x<-150){
    back3.x=750
  }
  if(back4.x<-150){
    back4.x=750
  }
  
  if(keyDown("space")&&mar.y>210){
      mar.velocityY=-15
       }
  kiddda()
  
  if (gamestate===PLAY&&frameCount%30===0){
     r =Math.round(random(1,3))
    
    if(r===1){
      mob=createSprite(750,220,10,10);
      mob.addImage("kh",mob1)
      mob.velocityX=-25 ;
      
      mob.scale=0.15
      mob.collide(inv);
      mob2.add(mob);
      mob.lifetime = 100
     }
     if(r===2){
      kidda=createSprite(750,220,10,10);
      kidda.addImage("kh",kidda1)
      kidda.velocityX=-25 ;
      kidda.scale=0.15
      kidda.collide(inv);
      kiddaG.add(kidda);
      kidda.lifetime = 100;
     }
     if(r===3){
      kidda=createSprite(750,220,10,10);
      kidda.addImage("kh",kidda1)
      kidda.velocityX=-25 ;
      kidda.scale=0.15
      kidda.collide(inv);
      kiddaG.add(kidda);
      kidda.lifetime = 100
     }
     
     
  }
  console.log(r);
  mobb()
  //kidda.velocityY=kidda.velocityY+1
  kiddaG.setVelocityYEach(5)
  kiddaG.collide(inv);
  mob2.collide(inv);
  mob2.setVelocityYEach(5)
  if(mar.isTouching(kiddaG)){
    gamestate=END
  }
  if(mar.isTouching(mob2)){
    score=score+1
    mob2.destroyEach();
  }
 drawSprites();
  textSize(30)
  fill("red")
  stroke("green")
  strokeWeight(20);
   text("Score="+score,200,25)
 
}

 
 
function kiddda(){
  
}
function mobb(){
  
}
function update(plays){
  database.ref('/').update({
    Plays: plays
  });
}
function getState(){
  var gameStateRef  = database.ref('Plays');
  gameStateRef.on("value",function(data){
     Plays1 = data.val();
  })

}













