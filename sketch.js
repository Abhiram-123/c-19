var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group(); 

  climbersGroup =  new Group();

  ghost= createSprite(200,200);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  
  invisibleBlockGroup = new Group();
  
}

function draw() {
  background(200);
  
  if(tower.y > 400){
      tower.y = 300
    }
  spawn_doors();
  if(keyDown("space")){
  ghost.velocityY = -5; 
  }
  ghost.velocityY = ghost.velocityY + 0.8;
  if(keyDown("right_arrow")){
  ghost.x = ghost.x + 5;

 }

 if(keyDown("left_arrow")){
 ghost.x = ghost.x - 5;
 
}
if(climbersGroup.isTouching(ghost)){
ghost.velocityY = 0;

}
    
 if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
  ghost.destroy();
 
   }
  drawSprites() 
  
}

function spawn_doors(){
 if (frameCount % 240 === 0){

  door= createSprite(200,-50);
  door.addImage(doorImg);

  climber = createSprite(200,10)
  climber.addImage(climberImg);

  door.x = Math.round(random(120,400));
  door.velocityY = 1;

  climber.x= door.x;
  climber.lifetime = 800;
  door.lifetime = 800;
  ghost.depth = door.depth;
  ghost.depth = ghost.depth + 1;
  climber.velocityY = 1
  doorsGroup.add(door);
  climbersGroup.add (climber);

  invisibleBlock =  createSprite(200,15,climber.width,2);
  //invisibleBlock.width = climber.width;
  //invisibleBlock.height= 2;
  invisibleBlock.x = door.x;
  invisibleBlock.velocityY = 1;
 invisibleBlockGroup.add(invisibleBlock);
  invisibleBlock.visble=false;
  
}



}