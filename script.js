var boy = document.getElementById('boy');
idlImageNumber = 0;
runImageNumber = 0;
jumpImageNumber = 0;
scoreBoard = 0;
deadImageNUmber = 0;

// Breathing part
function idleAnimation() {
    idlImageNumber = idlImageNumber + 1;
    if (idlImageNumber == 11) {
        idlImageNumber = 1;
    }
    boy.src = "res/Idle (" + idlImageNumber + ").png";
}

idleAnimationCounter = 0;

function boyBreathing() {
    idleAnimationCounter = setInterval(idleAnimation, 200);
}

function runBoyImage() {
    runImageNumber = runImageNumber + 1;
    if (runImageNumber == 11) {
        runImageNumber = 1;
    }
    boy.src = "res/Run ("+runImageNumber+").png";
}

runAnimationCounter = 0;

function doRun() {
    runAnimationCounter = setInterval(runBoyImage, 100);
    clearInterval(idleAnimationCounter);
}

function stop() {
    clearInterval(runAnimationCounter);
    clearInterval(backgroundMovingAnimation);
    clearInterval(boxAnimationCounter);
    clearInterval(scoreCounter);
    clearInterval(boxAnimationCounterMobile);
    boxAnimationCounterMobile = 0;
    scoreCounter = 0;
    boxAnimationCounter = 0;
    backgroundMovingAnimation = 0;
    runAnimationCounter = 0;
    boyBreathing();
}

// Moving Background
var backgroundimagePosition = 0;
backgroundMovingAnimation = 0;

function moveBackground() {
    backgroundimagePosition = backgroundimagePosition - 20;
    document.getElementById("bg").style.backgroundPositionX = backgroundimagePosition + "px";
}

// Jump Animation
marginBoy = 620;

function jumpPictures() {
    jumpImageNumber = jumpImageNumber + 1;
    if (jumpImageNumber == 11) {
        jumpImageNumber = 1;
        clearInterval(jumpAnimationCounter);
        jumpAnimationCounter = 0;
        runAnimationCounter = 0;
        doRun();
    }

    if (jumpImageNumber <= 5 && jumpImageNumber != 1) {
        marginBoy = marginBoy - 80;
        boy.style.marginTop = marginBoy + "px";
    }

    if (jumpImageNumber > 6) {
        marginBoy = marginBoy + 80;
        boy.style.marginTop = marginBoy + "px";
    }

    boy.src = "res/Jump ("+jumpImageNumber+").png";
}

jumpAnimationCounter = 0;

function jumpAnimation() {
    jumpAnimationCounter = setInterval(jumpPictures, 100);
    clearInterval(runAnimationCounter);
    runAnimationCounter = 0;
    clearInterval(idleAnimationCounter);
}

function movements(event) {
    var key = event.which;


    if(!failed) {

        if (key == 100) {
            if (runAnimationCounter == 0) {
                doRun();
                scoreCounter = setInterval(DisplayScore, 100);
            }
    
            if (backgroundMovingAnimation == 0) {
                backgroundMovingAnimation = setInterval(moveBackground, 100);
            }
    
            if (boxAnimationCounter == 0) {
                boxAnimationCounter = setInterval(boxAnimation, 100);
            }
        }
    
        if (key == 113) {
            if (runAnimationCounter != 0) {
                stop();
            }
        }
    
        if (key == 119) {
            if (jumpAnimationCounter == 0 && runAnimationCounter != 0) {
                jumpAnimation();
            }
        }

    }

}

marginLeft = 2000;

function createBox() {
    for (let i = 0; i < 150; i++) {
        var box = document.createElement("div");
        box.className = "box";
        box.id = "box" + i;
        document.getElementById("bg").appendChild(box);
        box.style.marginLeft = marginLeft + "px";

        if (i < 5) {
            marginLeft = marginLeft + 1000;
        } else {
            marginLeft = marginLeft + 500;
        }
    }
}

var boxAnimationCounter = 0;

function boxAnimation() {
    for (let i = 0; i < 150; i++) {
        var box = document.getElementById("box" + i);
        var currentMargin = getComputedStyle(box).marginLeft;
        var marginLefto = parseInt(currentMargin) - 25;

        box.style.marginLeft = marginLefto + "px";

        // Collision detection
        if (marginLefto >= 180 && marginLefto <= 290) { // horizontal check
            if (marginBoy >= 600) { // vertical check (boy on the ground)
                gameOver();
                break;
            }
        }
    }
}
// Dead scene
function deadAnimation() {
    deadImageNUmber = deadImageNUmber + 1;

    if (deadImageNUmber == 11) {

        clearInterval(deadAnimationCounter);
        deadImageNUmber = 10;
        displayEnd();
    }
    
    boy.src = "res/Dead ("+deadImageNUmber+").png"
}

deadAnimationCounter = 0;
function dead() {

    deadAnimationCounter = setInterval(deadAnimation, 100);
    
    
}

failed = false; // To know if game faield
function gameOver() {
    clearInterval(runAnimationCounter);
    clearInterval(backgroundMovingAnimation);
    clearInterval(boxAnimationCounter);
    clearInterval(scoreCounter);
    clearInterval(jumpAnimationCounter);
    jumpAnimationCounter = 0;
    scoreCounter = 0;
    boxAnimationCounter = 0;
    backgroundMovingAnimation = 0;
    runAnimationCounter = 0;
    dead();
    failed = true;
}

scoreCounter = 0;

function DisplayScore() {
    ++scoreBoard;
    document.getElementById('scre').innerHTML = scoreBoard;
}
// Mobile Version ...................................................................................

// run mobile
function runMobile() {

    if (!failed) {

        if (runAnimationCounter == 0) {
            doRun();
            scoreCounter = setInterval(DisplayScore, 100);
        }
    
        if (backgroundMovingAnimation == 0) {
            backgroundMovingAnimation = setInterval(moveBackground, 100);
        }
    
        if (boxAnimationCounterMobile == 0) {
            boxAnimationCounterMobile = setInterval(boxAnimationMobile, 100);
        }
    }



}

marginLeftMobile = 500;

function createBoxMobile() {
    for (let i = 0; i < 150; i++) {
        var box = document.createElement("div");
        box.className = "box";
        box.id = "box" + i;
        document.getElementById("bg").appendChild(box);
        box.style.marginLeft = marginLeft + "px";

        if (i < 5) {
            marginLeft = marginLeft + 500;
        } else {
            marginLeft = marginLeft + 250;
        }
    }
}

var boxAnimationCounterMobile = 0;

function boxAnimationMobile() {
    for (let i = 0; i < 150; i++) {
        var box = document.getElementById("box" + i);
        var currentMargin = getComputedStyle(box).marginLeft;
        var marginLefto = parseInt(currentMargin) - 25;

        box.style.marginLeft = marginLefto + "px";

        // Collision detection
        if (marginLefto >= 88 && marginLefto <= 148) { // horizontal check
            if (marginBoymobile >= 630) { // vertical check (boy on the ground)
                gameOverMobile();
                break;
                
            }
        }
    }
}

// Jump Mobile

marginBoymobile = 640;

function jumpPicturesMobile() {
    jumpImageNumber = jumpImageNumber + 1;
    if (jumpImageNumber == 11) {
        jumpImageNumber = 1;
        clearInterval(jumpAnimationCounterMobile);
        jumpAnimationCounterMobile = 0;
        runAnimationCounter = 0;
        doRun();
    }

    if (jumpImageNumber <= 5 && jumpImageNumber != 1) {
        marginBoymobile = marginBoymobile - 60;
        boy.style.marginTop = marginBoymobile + "px";
    }

    if (jumpImageNumber > 6) {
        marginBoymobile = marginBoymobile + 60;
        boy.style.marginTop = marginBoymobile + "px";
    }

    boy.src = "res/Jump ("+jumpImageNumber+").png";
}

jumpAnimationCounterMobile= 0;

function jumpAnimationMobile() {

    if (!failed && runAnimationCounter != 0) {

        jumpAnimationCounterMobile = setInterval(jumpPicturesMobile, 100);
        clearInterval(runAnimationCounter);
        runAnimationCounter = 0;
        clearInterval(idleAnimationCounter);
    }

}

// Game Over Mobile
function gameOverMobile() {
    clearInterval(runAnimationCounter);
    clearInterval(backgroundMovingAnimation);
    clearInterval(boxAnimationCounterMobile);
    clearInterval(scoreCounter);
    clearInterval(jumpAnimationCounterMobile);
    jumpAnimationCounterMobile = 0;
    scoreCounter = 0;
    boxAnimationCounter = 0;
    backgroundMovingAnimation = 0;
    runAnimationCounter = 0;
    dead();
    failed = true;
}

function displayEnd() {

    if (failed) {

        document.getElementById('bg').style.visibility = "hidden";
        document.getElementById('end').style.visibility = "visible";
        document.getElementById('endscre').innerHTML = scoreBoard;
        document.getElementById('start').style.visibility = "hidden";
        document.getElementById('jump').style.visibility = "hidden";
    }
}

function restart() {

    location.reload();
}