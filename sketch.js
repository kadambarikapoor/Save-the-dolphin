var gameState = 1;
var dolphin, dolphinImage;
var sea, seaImage;
var net1, netsGroup;
var trash1, trash2, trash3, trashGroup;
var score = 0;
var oops, oopsImage;
var ouch, ouchImage;
function preload(){
    seaImage = loadImage("background.jpg");
    dolphinImage = loadImage("dolphin.png");
    net1 = loadImage("net1.png");
    trash1 = loadImage("plasticbag1.png");
    trash2 = loadImage("plasticbag2.png");
    trash3 = loadImage("plasticbag3.png");
    oopsImage = loadImage("oops.png");
    ouchImage = loadImage("ouch.png")
}
function setup() {
    createCanvas(800, 650);
    
    sea = createSprite(500,200,1280,720);
    sea.addImage("sea",seaImage);
    sea.scale = 1.25;
    //sea.scale = 
    //sea.x = sea.width /2;

    dolphin = createSprite(50,180,20,50);
    dolphin.addImage("dolphin", dolphinImage);
    dolphin.scale = 2;
    dolphin.setCollider("rectangle", 20, 10, 100, 20);
    //dolphin.shapeColor = "blue";
    //dolphin.addAnimation("running", dolphin_running);
    //dolphin.scale = 0.5;
     oops = createSprite(dolphin.x+100, dolphin.y-40);
     oops.addImage("oops", oopsImage);  
     oops.scale = 0.1;
     oops.visible = false;
     ouch = createSprite(dolphin.x+100, dolphin.y-40);
     ouch.addImage("ouch", ouchImage);  
     ouch.scale = 0.1;
     ouch.visible = false;
    trashGroup = new Group();
    netsGroup = new Group();
    
    score = 0;
  }

  function draw() {
    background("white");
    
    if (gameState === 1) {
      score = score + Math.round(getFrameRate()/60);
      sea.velocityX = -4;
      if(keyDown("UP_ARROW")) {
        dolphin.y = dolphin.y-5;
      }
      if(keyDown("DOWN_ARROW")) {
        dolphin.y = dolphin.y+5;
      }
    
      if (sea.x < 0){
        sea.x = 500;
      }
      oops.y = dolphin.y-40
      ouch.y = dolphin.y-40
      spawnNets();
      spawnTrash();
      if (netsGroup.isTouching(dolphin)) {
        ouch.visible = true;
        setTimeout(function(){ouch.visible = false}, 1000)
        gameState = 0;
      }
      if (trashGroup.collide(dolphin)) {
        score = score-100;
        oops.visible = true;
        setTimeout(function(){oops.visible = false}, 1000)
      }
      if (score<0) {
        gameState = 0;
      }
    }
    drawSprites();

    if (gameState === 0) {
      sea.velocityX = 0;
      netsGroup.setVelocityXEach(0);
      trashGroup.setVelocityXEach(0);
      netsGroup.setLifetimeEach(-1);
      trashGroup.setLifetimeEach(-1);

      
      strokeWeight(10)
      stroke("black")
      fill("white")
      textSize(30);
      text("Game Over!", 350, 250);

      if (keyDown("space")) {
        gameState = 1;
        score = 0;
        netsGroup.destroyEach();
        trashGroup.destroyEach();
      }
    }
    
    strokeWeight(10)
      stroke("black")
      fill("white")
      textSize(30);text("Score: "+ score, 600,50);
  }
  function spawnNets() {
    //write code here to spawn the nets
    if (frameCount % 500 === 0) {
      var net = createSprite(800,120,40,10);
      net.y = Math.round(random(200,400));
      net.addImage(net1);
      net.scale = 0.8;
      net.velocityX = -3;
      net.setCollider("circle", 20, 0, 60)
       //assign lifetime to the variable
      net.lifetime = 200;
      
      //add each net to the group
      netsGroup.add(net);
    }
    
  }
  function spawnTrash() {
    //write code here to spawn the trash
    if (frameCount % 150 === 0) {
      var trash = createSprite(800,165,10,40);
      trash.velocityX = -4;
      trash.y = random(200, 500);
      trash.setCollider("rectangle", 0, 0, 300, 300)
      //generate random trashs
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: trash.addImage(trash1);
                break;
        case 2: trash.addImage(trash2);
                break;
        case 3: trash.addImage(trash3);
                break;
        default: break;
      }
      
      //assign scale and lifetime to the trash           
      trash.scale = 0.2;
      trash.lifetime = 200;
      //add each trash to the group
      trashGroup.add(trash);
    }
  }
  