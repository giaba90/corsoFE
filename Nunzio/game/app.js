//var

let cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
let click = 0;
let firstCard = undefined;
let secondCard = undefined;
let time;

//function

//shuffle cards
//input array of cards
//output none
function shuffle(arrayCard) {
    //do something
}

//print html of cards
//input array of cards
//output html markup of cards
function printCard(arrayCard) {
    let markup = '';
    //do something
}


function startTime() {
    //do something
}

function stopTime() {
    //get game play time
    //get the name of the player
    //save both on local storage

}

function check(el, id) {
    console.log(el);
    el.classList.add('flipped');
    console.log(id);
}

//main
window.onload = function () {
    shuffle();
    printCard();
}