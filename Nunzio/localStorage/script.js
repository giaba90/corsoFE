//variabili
let anagrafia = [];
let nome;
let cognome;
let codiceFiscale;
let cf_exist = false;
let countUser = 0;

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

function displayTable(persona) {
    const markup = ` <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Cognome</th>
                            <th scope="col">Codice fiscale</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id="name-table">${persona.nome}</td>
                            <td id="surname-table">${persona.cognome}</td>
                            <td id="cf-table">${persona.codiceFiscale}</td>
                        </tr>
                       
                    </tbody>
                </table> `;
    return markup;
}

//salva
//input object persona
//output none
function salvaDB(persona) {
    //push into array anagrafia
    anagrafia.push(persona);
    //scrittura nello storage
    window.localStorage.setItem('utenti', JSON.stringify(anagrafia));
/*
    document.getElementById('name-table').innerText = persona.nome;
    document.getElementById('surname-table').innerText = persona.cognome;
    document.getElementById('cf-table').innerText = persona.codiceFiscale;
*/
    console.log('caricamento utente riuscito!')
    countUser += 1;
    document.getElementById('count').innerHTML = countUser.toString();
};

//cerca
//input codice fiscale
//output str
function searchDB(cf) {
    let datoLetto = JSON.parse(window.localStorage.getItem('utenti'));
    let trovato = false;
    let p;
    //check cf only if anagrafia have an element
    datoLetto.forEach((el) => {
        if (el.codiceFiscale == cf) {
            trovato = true;
            p = el;
        }
    });
   return (trovato) ? displayTable(p) : '<div class="p-3 mb-2 bg-danger text-white"><p>Utente non trovato !</p></div>';
}

//controlla cf
//return false if cf exits
//input codice fiscale
//output bool value
function check(cf) {
    //check cf only if anagrafia have an element
    if (anagrafia.length > 0) {
        anagrafia.forEach(function (el) {
            if (el.codiceFiscale == cf) {
                return cf_exist = true; //return false if cf exits
            }

        });
    }
};



document.getElementById('salva').addEventListener('click',
    () => {
        //get value
        nome = document.getElementById('nome').value;
        cognome = document.getElementById('cognome').value;
        codiceFiscale = document.getElementById('cf').value;
        //create a object
        let p = new Persona(nome, cognome, codiceFiscale);

        (!check(p.codiceFiscale)) ? salvaDB(p): console.log('ERRORE: caricamento non riuscito!');
        //stampo
       document.getElementById('table').innerHTML = displayTable(p);

        //pulisco i campi
        document.getElementById('nome').value = '';
        document.getElementById('cognome').value = '';
        document.getElementById('cf').value = '';

    }
);

document.getElementById('button-addon2').addEventListener('click',
    () => {
    
        let res = searchDB(document.getElementById('search-cf').value);
        document.getElementById('message').innerHTML = res;
    
    }
)