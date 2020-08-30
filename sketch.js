  
/* 
Social Share Links:
WhatsApp:
https://wa.me/?text=[post-title] [post-url]
Facebook:
https://www.facebook.com/sharer.php?u=[post-url]
Twitter:
https://twitter.com/share?url=[post-url]&text=[post-title]
Pinterest:
https://pinterest.com/pin/create/bookmarklet/?media=[post-img]&url=[post-url]&is_video=[is_video]&description=[post-title]
LinkedIn:
https://www.linkedin.com/shareArticle?url=[post-url]&title=[post-title]
*/

const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine,world;
var canvas;

const facebookBtn = document.querySelector(".facebook-btn");
const twitterBtn = document.querySelector(".twitter-btn");
const pinterestBtn = document.querySelector(".pinterest-btn");
const linkedinBtn = document.querySelector(".linkedin-btn");
const whatsappBtn = document.querySelector(".whatsapp-btn");

//gameState
var home_scr = 0;
var player_scr = 1;
var computer_scr = 2;
var play_scr = 2.1;
var settings_src = 3;
var gameState = home_scr;

//btns at home screen
var settings_btn,player_btn,computer_btn,back_btn;

//btns at computer screen
var comp_play_btn;

//for settings screen
var settings_sprite,bgcolor_picker;

//images
var cancel_img;

//game variables
var compScore = 0;
var playerScore = 0;
var ball,compPaddle,playerPaddle;
var playState = 0;

function preload(){
    //load Images here

   // cancel_img = loadImage("Images/cancelimage.png")
}

function setup(){
    canvas = createCanvas(800,500);
    engine = Engine.create();
    world = engine.world;

    settings_btn = createButton('Setting');
    settings_btn.position(1020,20);

    player_btn = createButton('online');
    player_btn.position(520,350);

    computer_btn = createButton('Vs. Computer');
    computer_btn.position(500,300);

    back_btn = createButton('Back');
    back_btn.position(330,20);

    comp_play_btn = createButton('Play');
    comp_play_btn.position(300,300);

    settings_sprite = createSprite(1000,10000,width,height);

    ball = createSprite(400,25000,20,20);  
    compPaddle = createSprite(2000,250,15,120);
    playerPaddle = createSprite(7800,250,15,120);

    bgcolor_picker = createColorPicker("white");
    bgcolor_picker.position(350,200);
    bgcolor_picker.size(100,20);
}

function draw(){
    background("white");
    Engine.update(engine);

    //rectMode(CENTER);
    //imageMode(CENTER);
    //ellipseMode(CENTER);

    if(gameState===home_scr){
        background(bgcolor_picker.color());
        text("Game State is home screen",20,200);
      
        //hide buttons
        back_btn.hide();
        comp_play_btn.hide();
        bgcolor_picker.hide();

        //show buttons
        settings_btn.show();
        player_btn.show();
        computer_btn.show();

        player_btn.mousePressed(function(){
             gameState = player_scr;
        });

        computer_btn.mousePressed(function(){
            gameState = computer_scr;
       });

        settings_btn.mousePressed(function(){
        gameState = settings_src;
    });

    }//home gamestate end

   if(gameState===player_scr){
        //background("yellow");
        text("Game State is player online",200,200);

        //show buttons
        back_btn.show();

        //hide buttons
        player_btn.hide();
        computer_btn.hide();
        comp_play_btn.hide();
        settings_btn.hide();

        back_btn.mousePressed(function(){
            gameState=home_scr;
        });

    }//player gameState end

    if(gameState===computer_scr){
        //background("yellow");
        text("Game State is on computer",20,200);
        text("##Instructions here",20,230);

        //show buttons
        back_btn.show();
        comp_play_btn.show();

        //hide buttons
        player_btn.hide();
        computer_btn.hide();
        settings_btn.hide();

        comp_play_btn.mousePressed(function(){
           gameState = play_scr;
        });

        back_btn.mousePressed(function(){
            gameState=home_scr;
        });

    }//computer gameState ends

    if(gameState===play_scr){
        background("white");
        
        ball.y = 250;
        ball.x = 400;

        textSize(20);
        text(compScore,width/2-30,20);
        text(playerScore,width/2+20,20);

         for (var i = 2; i < height; i=i+20) {
            line(width/2,i,width/2,i+10);
          }

          compPaddle.x  = 20;
          compPaddle.y = height/2;
          playerPaddle.x = 780;
          playerPaddle.y  = mouseY;
          //playerPaddle.addImage(cancel_img);
         
          if(keyDown("space")){
              ball.velocityY  = -2;
          }

         //hide buttons
         comp_play_btn.hide();
        
        //show buttons
         back_btn.show();

        //console.log(playState);
        //console.log(gameState);

         back_btn.mousePressed(function(){
             gameState = computer_scr;
             playState=null;
             compPaddle.y = height+1111100;
             playerPaddle.x = 78000;
             ball.x  = 1000000;
         });
    }//play with computer screen ends
  
      if(gameState===settings_src){
        background("grey");
        fill("black");
        textSize(20);
        text("Set background color here, as per your choice");

        //show buttons
        bgcolor_picker.show();
        back_btn.show();

        //hide buttons
        settings_btn.hide();
        player_btn.hide();
        computer_btn.hide();

        back_btn.mousePressed(function(){
             gameState = home_scr;
        });
      }

    //shareable social link
   init();
    
   drawSprites();
}   

function init() {
    const pinterestImg = document.querySelector(".pinterest-img");
  
    let postUrl = encodeURI(document.location.href);
    let postTitle = encodeURI("Hi everyone, this is my link ");
  
    facebookBtn.setAttribute(
      "href",
      `https://www.facebook.com/sharer.php?u=${postUrl}`
    );
  
    twitterBtn.setAttribute(
      "href",
      `https://twitter.com/share?url=${postUrl}&text=${postTitle}`
    );
  
    pinterestBtn.setAttribute(
      "href",
      `https://pinterest.com/pin/create/bookmarklet/?&url=${postUrl}&description=${postTitle}`
    );
  
    linkedinBtn.setAttribute(
      "href",
      `https://www.linkedin.com/shareArticle?url=${postUrl}&title=${postTitle}`
    );
  
    whatsappBtn.setAttribute(
      "href",
      `https://wa.me/?text=${postTitle} ${postUrl}`
    );
  }
  

