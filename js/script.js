const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
var speed = 11;
var score = 0;
var tileCount = 20;
//Taille d'un carré (18)
var tileSize = canvas.width / tileCount -2;
//Emplacement de la tête du snake au départ
var headX = 10;
var headY = 10;
const snakeParts = [];
let tailLength = 0;
var appleX = 3;
var appleY= 3;
var xVelocite = 0;
var yVelocite = 0;
let bk = new Image();
let malvine = new Image();
let huitsix = new Image();
let cul = new Image();
let ph = new Image();
let macdo = new Image();
macdo.src = 'img/macdo.png';
bk.src = 'img/bk.jpg'
cul.src = 'img/cul.jpg'
huitsix.src = 'img/86.png';
malvine.src = 'img/headSnake.png';
ph.src = 'img/ph.jpg';
var pommes = [huitsix,cul,macdo,bk,ph];
var img = selectRandomImage();

function draw(){
    changeSnakePostion();
    
    let fin = isGameOver();

    if(fin){
        return;
    }
    ecranVierge();
    checkAppleCollision();
    dessinePomme();
    dessineSnake();
    dessineScore();
    
    setTimeout(draw, 1000/speed);
}
function dessineScore(){
    ctx.fillStyle = 'white';
    ctx.font = '10px Verdana';
    ctx.fillText("Score : " + score, 340,15);
}

function selectRandomImage(){
    var random = Math.floor(Math.random() * pommes.length);
    return pommes[random];
}
//Fonction qui met le derrière de l'écran en noir
function ecranVierge(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.clientWidth,canvas.height);
}

function isGameOver(){
    let gameOver = false;
    //Si la tête touche le mur
    if(headX == tileCount || headY == tileCount || headX == -1 || headY == -1){
        gameOver = true;

    }else{
        for(let i = 0; i < snakeParts.length; i++){
            if(headX == snakeParts[i].x && headY == snakeParts[i].y){
                gameOver = true;
            }
        }
    }
    if(gameOver){
        ctx.fillStyle='white';
        ctx.font = '50px Verdana';
        ctx.fillText("Fin du jeu !",canvas.width / 6.5, canvas.height /2);
    }
    return gameOver;
}
function dessineSnake(){
    ctx.fillStyle = 'orange';
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    snakeParts.push(new SnakePart(headX, headY));
    if(snakeParts.length > tailLength){
        snakeParts.shift();
    }
    ctx.fillStyle = 'green'
    ctx.drawImage(malvine,headX*tileCount,headY*tileCount,tileSize,tileSize);

    // 10 * 20, 10 * 20, 18, 1 
}
function checkAppleCollision(){
        if(appleX == headX && appleY == headY){
            score++;
            appleX = Math.floor(Math.random() * tileCount);
            appleY = Math.floor(Math.random() * tileCount);
            console.log(speed);
            tailLength++;
            img = selectRandomImage();
        }
}
function changeSnakePostion(){
    headX = headX + xVelocite;
    headY = headY + yVelocite;
}
function dessinePomme(){
    ctx.drawImage(img, appleX*tileCount, appleY * tileCount, tileSize,tileSize);
}
document.body.addEventListener('keydown', keyDown);
function keyDown(event){
    //Up
    if(event.keyCode == 38){
        if(yVelocite == 1)
            return;           
        yVelocite = -1;
        xVelocite =0;
    }
    //Down
    if(event.keyCode == 40){
        if(yVelocite == -1)
            return;      
            yVelocite = 1;
            xVelocite =0;
    }
    //Gauche
    if(event.keyCode == 37){
        if(xVelocite == 1)
        return;
        yVelocite = 0;
        xVelocite =-1;
    }
    //Droite
    if(event.keyCode == 39){
        if(xVelocite == -1)
        return;
        yVelocite = 0;
        xVelocite =1;
    }
}
draw();

