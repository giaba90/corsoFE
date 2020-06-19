//variabili
let anagrafia = [];
let nome;
let cognome;
let codiceFiscale;
let countUser = 0;
let table = document.getElementById('table');
//funzione prototipo
function Persona(n, c, cf) {
    this.nome = n;
    this.cognome = c;
    this.codiceFiscale = cf;
}
//init dell'applicazione
window.onload = () => {
    if (window.localStorage.getItem('utenti') != null) { //verifico che ci siano persone nello storage
        let datiStorage = JSON.parse(window.localStorage.getItem('utenti'));
        anagrafia = datiStorage; //ho inizializzato l'anagrafica con i dati presenti nello storage
        countUser = anagrafia.length;
        document.getElementById('count').innerHTML = countUser.toString();
    }

}

//input array di persone
//output un markup html
function displayTable(persone) {
    table.innerHTML = '';
    for (i = 0; i < persone.length; i++){
        let node = document.createElement('div');
        node.classList.add('list-group-item');
        node.id = persone[i].codiceFiscale;
        node.innerHTML = persone[i].nome + ' '+ persone[i].cognome +' '+ persone[i].codiceFiscale + '<i class="fa fa-trash" aria-hidden="true" onclick=elimina("'+persone[i].codiceFiscale+'")></i>';
        table.appendChild(node);    
    }

}

//input id della row
function displayRow(id) {
   
    table.innerHTML= '';
     let node = document.createElement('div');
    node.classList.add('list-group-item');
    node.id = anagrafia[id].codiceFiscale;
    node.innerHTML = anagrafia[id].nome + ' ' + anagrafia[id].cognome + ' ' + anagrafia[id].codiceFiscale + '<i class="fa fa-trash" aria-hidden="true" onclick=elimina("' + anagrafia[id].codiceFiscale + '")></i>';
    table.appendChild(node);
    
 //   return makeRow(anagrafia[id]);
}

//elimina elemento dalla anagrafia
//input codice fiscale
//testo dell'esito della procedura
function elimina(cf) {
    let confirmation = window.confirm('Sei sicuro di voler eliminare l\'utente con CF: '+ cf);
    if (confirmation == true) {
        let esito = false;
        let sliced = [];
        for (i = 0; i < anagrafia.length; i++) {
            if (anagrafia[i].codiceFiscale == cf) {
                anagrafia.splice(i, 1);
                esito = true;
            }
        }
        if (esito) {
            //scrittura nello storage
            window.localStorage.setItem('utenti', JSON.stringify(anagrafia));
            //rimuovo l'elemento grafico dalla tabella
            document.getElementById(cf).remove();
            countUser -= 1;
            document.getElementById('count').innerHTML = countUser.toString();
            alert('Elemento cancellato')
        }
        else {
            alert('Errore: non sono riuscito ad eliminare l\'elemento!');
        }
    
    }
}

//salva
//input object persona
//output none
function salvaDB(persona) {
    //push into array anagrafia
    anagrafia.push(persona);
    //scrittura nello storage
    window.localStorage.setItem('utenti', JSON.stringify(anagrafia));
    alert('caricamento utente riuscito!')
    countUser += 1;
    document.getElementById('count').innerHTML = countUser.toString();
    displayTable(anagrafia);
};

//cerca
//input codice fiscale
//output str
function searchDB(cf) {
    let datoLetto = JSON.parse(window.localStorage.getItem('utenti'));
    let trovato = false;
    let p;

    for (i = 0; i < datoLetto.length; i++){
        if (datoLetto[i].codiceFiscale == cf) {
            p = i;
            trovato = true;
        }  
    }

    if (trovato) {
        displayRow(p);
    } else {
        table.innerHTML = '<div class="p-3 mb-2 bg-danger text-white"><p>Utente non trovato !</p></div>';

    }
}

//check cf - return false if cf exits
//input codice fiscale
//output bool value
function check(cf) {
    let trovato = false;
    //check cf only if anagrafia have an element
    if (anagrafia.length > 0) {
        anagrafia.forEach(function (el) {
            if (el.codiceFiscale == cf) {    
                trovato = true; //return false if cf exits
            }
        });
    }
   return (trovato) ? trovato : false;
};



document.getElementById('salvaContatto').addEventListener('submit',
    () => {
        //get value
        nome = document.getElementById('nome').value;
        cognome = document.getElementById('cognome').value;
        codiceFiscale = document.getElementById('cf').value;
        //create a object
        let p = new Persona(nome, cognome, codiceFiscale);
        //salvo i valori
        (check(p.codiceFiscale)) ? alert('Attenzione: codice fiscale esistente !') : salvaDB(p) ;
 
        //pulisco i campi
        document.getElementById('nome').value = '';
        document.getElementById('cognome').value = '';
        document.getElementById('cf').value = '';

    }
);
/* 
document.getElementById('button-addon2').addEventListener('click',
    () => {
        //prendo il valore
        let cf = document.getElementById('search-cf').value;
        
        searchDB(cf);
    }
)*/

//update progetto secondo direttiva di Nunzio
function searchPeople() {
     //prendo il valore
     let cf = document.getElementById('search-cf').value;
  
     searchDB(cf);
}