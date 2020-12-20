var monkey , monkey_running, ground;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var time;

function preload(){

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  createCanvas(400, 400);
  
  ground = createSprite(400, 390, 800, 20);
  //ground.debug = true;
  
  monkey = createSprite(75, 325, 10, 10);
  monkey.addAnimation("monkey_running", monkey_running);
  monkey.scale = 0.2;
  monkey.y = 325;
  //monkey.debug = true;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
}

function draw() {
  
  background("lightblue");
  
  //calculates and displays survival time
  fill("black");
  textSize(20);
  time = Math.ceil(frameCount/getFrameRate());
  //console.log(getFrameRate());
  text("Survival time: " + time, 130, 50);
  
  //monkey jumps when space is pressed
  if(keyWentDown("SPACE") && monkey.y > 250){
    monkey.velocityY= -5;
  }
  
  //gravity for monkey
  monkey.velocityY = monkey.velocityY + 0.2;
  monkey.collide(ground);
  
  /*if(monkey.y <= 120){
    monkey.velocityY = 5;
  }*/
  
  //gives ground infinite scrolling effect
  ground.velocityX = -5;
  if (ground.x === 0){
    ground.x = 400;
  }
  
  //draws bananas and rocks
  drawBanana();
  drawObstacle();
  
  drawSprites();

}

function drawBanana(){
  if(frameCount % 80 === 0){
    banana = createSprite(400, 200, 10, 10);
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.15;
    banana.y = random(120, 200);
    banana.velocityX = -3;
    banana.lifetime = 130;
    
    bananaGroup.add(banana);
  }
}

function drawObstacle(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(400, 360, 10, 10);
    obstacle.addAnimation("obstacle", obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -3;
    obstacle.lifetime = 130;
    
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    obstacleGroup.add(obstacle);
  }
}