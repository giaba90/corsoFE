//variabili
let anagrafia = [];
let nome;
let cognome;
let codiceFiscale;

//funzione prototipo
function Persona(n, c, cf) {
    this.nome = n;
    this.cognome = c;
    this.codiceFiscale = cf;

    //controlla cf
    //return false if cf exits
    //input codice fiscale
    //output bool value
    this.check = function(cf) {
        //check cf only if anagrafia have an element
        if (anagrafia.length > 0)
        {
            anagrafia.forEach(function (el) {
                if (el.codiceFiscale == cf) {
                    return false; //return false if cf exits
                }
                else {
                    return true;
                }
            });
        }//return true if anagrafia is void
        else {
            return true;
        }
        
      
    };

    //salva
    //input object persona
    //output none
    this.salva = function (persona) {
        //push into array anagrafia
        anagrafia.push(persona);
        //scrittura nello storage
        window.localStorage.setItem('utenti', JSON.stringify(anagrafia));
        console.log('caricamento utente riuscito!')
    }
}


document.getElementById('salva').addEventListener('click',
    () => {
        //get value
        nome = document.getElementById('nome').value;
        cognome = document.getElementById('cognome').value;
        codiceFiscale = document.getElementById('cf').value;
       //create a object
        let p = new Persona(nome, cognome, codiceFiscale);

       ( p.check(p.codiceFiscale) ) ? p.salva(p) : console.log('ERRORE: caricamento non riuscito!');

     
    }
);