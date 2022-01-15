var PLAY = 1;
var END = 0;
var VIC =2;
var gameState = PLAY;

var trex, trex_running;
var ground;
var score;
var obstacle, obstacleimg;
var gameOverImg, gameOver;
var victoryImg, victory;
var backgroundImg;

function preload() {
  gameOverImg = loadImage("Game over.png");
  victoryImg = loadImage("vic.png")
  backgroundImg = loadImage("background.png")

}

function setup() {
  createCanvas(500, 200);
 
  trex = createSprite(50, 180, 20, 20);
  trex.setCollider("rectangle", 0, 0, 10, trex.height);
  //trex.debug = true;

  ground = createSprite(0, 180, 1000, 20);
  ground.x = ground.width / 2;
  ground.velocityX = -6;



  gameOver = createSprite(300, 100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.4

  victory=createSprite(300, 100);
  victory.addImage(victoryImg);
  victory.scale=0.4;



  score = 0;

  blockGroup = new Group()

}

function draw() {
  background(backgroundImg);
  score = score + Math.round(getFrameRate() / 60);
  

  if (gameState === PLAY) {
    ground.velocityX = -4;
    text("Score: " + score, 300, 50);

    gameOver.visible = false;
    victory.visible = false;

    if (ground.x < 0) {

      ground.x = 100
    }

    if (keyDown("space") && (trex.y >= 150)) {
      trex.velocityY = -12;
    }
    trex.velocityY = trex.velocityY + 0.9;
    trex.collide(ground);

    if (blockGroup.isTouching(trex)) {
      gameState = END;
    }

    if (score===200) {
      gameState = VIC;
    }

    Spawnobstacle();
  } else if (gameState === END) {
    text("space to restart", 200,100)
    
    ground.velocityX = 0;
    blockGroup.setVelocityXEach(0);
    score=score;
    blockGroup.setLifetimeEach(-1);
     ground.velocityX = 0;
      trex.velocityY = 0
    trex.velocityX = 0;
    gameOver.visible = true;

  
     if(keyDown("space")){
    Reset();
    }
    
  } else if (gameState === VIC) {
    text("Space to play again", 200, 100)
    ground.velocityX = 0;
    blockGroup.setVelocityXEach(0);
    score=score;
    blockGroup.setLifetimeEach(-1);
     ground.velocityX = 0;
      trex.velocityY = 0
    trex.velocityX = 0;
    victory.visible=true;

    if(keyDown("space")){
      Reset();
    }

  }


    
  drawSprites();
}

function Spawnobstacle() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -4;

    blockGroup.add(obstacle);

  }
}
function Reset(){
gameState=PLAY;
 blockGroup.destroyEach();
 
  gameOver.visible=false;
 
  score=0;
 ground.velocityX=-4;







}







