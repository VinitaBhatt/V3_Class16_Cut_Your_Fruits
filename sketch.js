var knife, knifeImage;
var PLAY=1;
var END =0;
var gameState = PLAY;
var fruit, fruitGroup, fruitImage1, fruitImage2, fruitImage3, fruitImage4;
var enemy, enemyGroup, enemyImage;
var gameOverImage;
var score;
var cuttingSound, gameOverSound;

function preload(){
  knifeImage = loadImage("knife.png");
  fruitImage1 = loadImage("fruit1.png");
  fruitImage2 = loadImage("fruit2.png");
  fruitImage3 = loadImage("fruit3.png");
  fruitImage4 = loadImage("fruit4.png");
  enemyImage = loadAnimation("alien1.png","alien2.png");
  gameOverImage = loadImage("gameover.png");
  cuttingSound = loadSound("knifeSwoosh.mp3");
  gameOverSound = loadSound("gameover.mp3");
}

function setup(){
  
  createCanvas(400,400);
  knife =createSprite(200,200,10,40);
  knife.addImage(knifeImage);
  knife.scale = 0.5;
  
  fruitGroup = new Group();
  enemyGroup = new Group();
 
  score=0;
}


function draw(){
  background("pink");
  textSize(15);
  fill("black");
  text("Score : " + score, 180,20);
  if(gameState === PLAY){
    knife.x = mouseX;
    knife.y = mouseY;
  
    createFruit();
    createEnemy();
  
    if(knife.isTouching(fruitGroup)){
        cuttingSound.play();
        fruitGroup.destroyEach();
        score=score+1;
    }
    if(knife.isTouching(enemyGroup)){
        gameOverSound.play();
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        gameState = END;
    }
  }
  
  if(gameState === END){
    knife.addImage(gameOverImage);
    knife.scale = 1.2;
    knife.x=200;
    knife.y=200;
  }
  
  drawSprites();
}

function createFruit(){
  if(frameCount % 60 ===0){
    var randomNum = Math.round(random(1,4));
    fruit = createSprite(400,200,20,20);
    if(randomNum === 1){
      fruit.addImage(fruitImage1);
    }else if(randomNum === 2){
      fruit.addImage(fruitImage2);
    }else if(randomNum === 3){
      fruit.addImage(fruitImage3);
    }else if(randomNum === 4){
      fruit.addImage(fruitImage4);
    }
    
    fruit.y = Math.round(random(50,350));
    fruit.scale=0.2;
    var position = Math.round(random(1,2));
    if(position ===1){
      fruit.x = 400;
      fruit.velocityX = -(6 + score/4) ;
    }else if(position == 2){
      fruit.x = 0;
      fruit.velocityX = (6 + score/4) ;
    }
    
    console.log(fruit.velocityX);
    fruitGroup.add(fruit);
  }
}

function createEnemy(){
  if(frameCount % 150 ===0){
    
    enemy = createSprite(400,200,20,20);
    enemy.addAnimation("enemy", enemyImage);
    enemy.y = Math.round(random(50,350));
    enemy.velocityX=-(6 + score/10);
    enemy.scale=0.9;
    enemyGroup.add(enemy);
  }
}