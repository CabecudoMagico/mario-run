var mario;
var marioanima;
var mario_collided
var mariojump

var chao_confia;
var chao_confiaimagem;

var nuvemsprite;
var nuvemimagem;

var obspr

var ob1

var ob2

var ob3

var JOGAR = 1;
var MORREU = 0;
var estado_de_jooj = JOGAR;
var ponto = 0
 
var gruponuvem
var grupoobs

function preload(){
  //loadanimation carrega animacoes 
  //loadimage carrega imagens
  marioanima = loadAnimation("trex1.png","trex3.png","trex4.png")
  mario_collided = loadAnimation("trex_collided.png")
  mariojump = loadAnimation("jump.png")

  chao_confiaimagem = loadImage("chao.png");

  nuvemimagem = loadImage("cloud.png");
  
  

  ob1 = loadAnimation("ob1.png","ob1p.png","ob1up.png");

  ob2 = loadAnimation("ob2.png","ob2p.png","ob2up.png");

  ob3 = loadAnimation("ob3.png","ob3p.png","ob3up.png");
}

function setup(){
  createCanvas(600,200);
 
  mario = createSprite(50,150,20,50);
  mario.addAnimation("correberg",marioanima)
  mario.scale = 2;
  
  chao_confia = createSprite(200,180,400,20);
  chao_confia.addImage(chao_confiaimagem);
   
  gruponuvem = createGroup();
  grupoobs = createGroup();

}

function draw(){
  background("lightblue");
text("pontos: "+ ponto,500,50);
 if (estado_de_jooj == JOGAR){ 
  chao_confia.velocityX = -5;
  //loop chao
  if (chao_confia.x < 0){
    chao_confia.x = chao_confia.width / 2;
  }
 //pontuacao
ponto = ponto + Math.round(frameCount / 10);

// pula fresco
if (keyDown("space")&&mario.y > 120){
  mario.velocityY = -10;
  mario.changeAnimation("jumping",mariojump)
}
//gravidade digraca
mario.velocityY = mario.velocityY + 0.5;
nuvems();
obs();
if (grupoobs.isTouching(mario)){
  estado_de_jooj = MORREU
}
 }
 else if(estado_de_jooj == MORREU){
  mario.changeAnimation("collided",mario_collided);
  chao_confia.velocityX = 0;
  grupoobs.setVelocityXEach(0);
  gruponuvem.setVelocityXEach(0);
  mario.velocityY = 0;
  grupoobs.setLifetimeEach(-1)
  gruponuvem.setLifetimeEach(-1)
  
 }
 mario.setCollider("circle",0,0,15)
 mario.debug = true;
 

  
  
  //colidir
  mario.collide(chao_confia);
  
  drawSprites();
  

}
 function nuvems(){
  if(frameCount%60==0){
  nuvemsprite = createSprite(600,50,40,10);
  nuvemsprite.velocityX = -5;
  //random e numero aleatorio
  //math.round transforma numeros decimais em numeros inteiros
  nuvemsprite.y = Math.round(random(40,70));
  nuvemsprite.addImage(nuvemimagem);
 //depth e profundidade
  nuvemsprite.depth = mario.depth;
  mario.depth = mario.depth + 1;
  console.log(mario.depth);
  console.log(nuvemsprite.depth);
  nuvems.lifetime = 100;
  gruponuvem.add(nuvemsprite);
}
  
 }
 function obs(){
   if (frameCount%60==0){
    obspr = createSprite(400,135,10,40);
obspr.velocityX = -5;
obspr.scale = 2;
grupoobs.add(obspr);
obspr.lifetime = 100
var valor = Math.round(random(1,3))
switch(valor){
  case 1:
    obspr.addAnimation("ob1",ob1);
    break;
    case 2:
      obspr.addAnimation("ob2",ob2);
      break;
      case 3:
        obspr.addAnimation("ob3",ob3);
        obspr.y = 140;
        break;
        default: break;
}

}
   
 }