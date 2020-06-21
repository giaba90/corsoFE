// var //

let cards = [
    {
        val: 1,
        img: 'assets/img/asso.jpg'
    },
    {
        val: 2,
        img: 'assets/img/due.jpg'
    },
    {
        val: 3,
        img: 'assets/img/tre.jpg'
    },
    {
        val: 4,
        img: 'assets/img/quattro.jpg'
    },
    { 
        val: 5,
        img: 'assets/img/cinque.jpg'
    },
    {
        val: 6,
        img: 'assets/img/sei.jpg'
    },
    {
        val: 1,
        img: 'assets/img/asso.jpg'
    },
    {
        val: 2,
        img: 'assets/img/due.jpg'
    },
    {
        val: 3,
        img: 'assets/img/tre.jpg'
    },
    {
        val: 4,
        img: 'assets/img/quattro.jpg'
    },
    {
        val: 5,
        img: 'assets/img/cinque.jpg'
    },
    {
        val: 6,
        img: 'assets/img/sei.jpg'
    }
]
let click = 0;
let firstCard = undefined;
let secondCard = undefined;
let punteggi = [];
let timing;

// function //

//shuffle cards
function shuffle() {
    cards.sort(() => Math.random() - 0.5);
}

//print html of cards
//output html markup of cards
function printCard() {
    let markup = '';
    for (i = 0; i < cards.length; i++) {
        markup += ' <div class="flip-card" onclick="check(this,'+cards[i].val +')"> <div class ="flip-card-inner" ><div class = "flip-card-front" ><img src ="assets/img/retro.jpg" class="card" ></div> <div class="flip-card-back" ><img src="'+ cards[i].img+'" class="card"></div></div></div>';
    }
    return markup;
}


function startTime() {
    let clock = parseFloat(0);
    let sec = 0.01;
    let min = 1.00;
    let tmp;
    let time = document.getElementById('time');
    let name = document.getElementById('player').value;
    if (name == "") {
        alert('Devi mettere il tuo nome');
        return false;
    }
    document.getElementById('name-player').innerText = name;

    shuffle();
    let node = printCard();
    document.getElementById('cards').innerHTML = node;
    
   timing =  setInterval(function () {
       clock += sec;

        tmp = clock[clock.length - 2];
        tmp += clock[clock.length - 1];
       console.log(tmp);
        if (tmp == '60') {
            clock += min;
        }

        console.log(clock.toFixed(2).toString());
        time.value = clock.toFixed(2).toString();
    }, 1000);
}

function stopTime() {
    //get game play time
    //get the name of the player
    //save both on local storage
    let obj = {};

    clearInterval(timing);
    let confirmation = window.confirm('Vuoi salvare il tuo risultato?');
    if (confirmation == true) { 
        obj = {
            nome: document.getElementById('name-player').innerText,
            tempo: document.getElementById('time').value
        }
        punteggi.push(obj);
        //scrittura nello storage
        window.localStorage.setItem('punteggi', JSON.stringify(punteggi));
    }
}

//match if two elements are equal
//input element html and value of card
function check(el, id) {
    click += 1;
 
    if (click == 1) {
        firstCard = {
            val: id,
            obj: el
        };
        el.classList.add('flipped');
    }
    else if (click == 2) {
        secondCard = {
            val: id,
            obj: el
        };
        el.classList.add('flipped');
        
        setTimeout(function () {
            if (firstCard.val === secondCard.val) {
                firstCard.obj.classList += ' hide';
                secondCard.obj.classList += ' hide';

            } else {
                firstCard.obj.classList.remove("flipped");
                secondCard.obj.classList.remove("flipped");

            }
        },2000);
        
        click = 0; //reset
    }
    
    
}

//main
window.onload = function () {
      if (window.localStorage.getItem('punteggi') != null) { //verifico che ci siano persone nello storage
          let datiStorage = JSON.parse(window.localStorage.getItem('punteggi'));
          punteggi = datiStorage; //ho inizializzato l'anagrafica con i dati presenti nello storage

      }

}

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timing);//stop time
    document.getElementById('cards').innerHTML = ''; //reset game field
    document.getElementById('player').value = '';//reset name field
    document.getElementById('name-player').innerText = '';//reset name
    document.getElementById('time').value = 0.00; //reset time;


    shuffle();
    let node = printCard();
    document.getElementById('cards').innerHTML = node;
});
