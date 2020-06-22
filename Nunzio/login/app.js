// var //

let utenti = [];

// fuction //

//input email, password
//output bool
function matchPass(email, pwd) {
    let match = false;
    let datiStorage = JSON.parse(window.localStorage.getItem('utenti'));
    for (i = 0; i < datiStorage.length; i++){
        if (datiStorage[i].email == email && datiStorage[i].password == pwd) {
            match = true;
        }
    }
    return match;
}

function saveDB(n, c, email, pwd) {
    //controlla se esiste l'email
    if (isEmptyDB()) {
        data = {
            nome: n,
            cognome: c,
            email: email,
            password: pwd
        }
        utenti.push(data);
        localStorage.setItem('utenti', JSON.stringify(utenti));

        return {
            val: true,
            message: 'Utente registrato'
        };
    }
    else {
        if (existsEmail(email)) {
            return {
                val: false,
                message: 'Email gia presente nel database'
            };
        }
        else {
            data = {
                nome: n,
                cognome: c,
                email: email,
                password: pwd
            }
            utenti.push(data);
            localStorage.setItem('utenti', JSON.stringify(utenti));

            return {
                val: true,
                message: 'Utente registrato'
            };
        }
    }
 
}


function existsEmail(email) {
    let trovato = false;
    let datiStorage = JSON.parse(window.localStorage.getItem('utenti'));
    for (i = 0; i < datiStorage.length; i++) {
        if (datiStorage[i].email == email) {
            trovato = true;
        }
    }
    return trovato;   
}

function isEmptyDB() {
    return ( (window.localStorage.getItem('utenti') != null) ) ? false : true;
}

//i use this function for register an user into local storage
function regUser() {
    let nome = document.getElementById('nome').value;
    let cognome = document.getElementById('cognome').value;
    let email = document.getElementById('formGroupExampleInput').value;
    let pass = document.getElementById('formGroupExampleInput2').value;
    let passHashed = sha256(pass);

    let res = saveDB(nome, cognome, email, passHashed);

    if (res.val) {
        alert(res.message)
        document.getElementById("formRegistrazione").reset();
    }
    else {
        alert(res.message);
    }

}

//i use this function for get user data from local storage and login user into my app
function loginUser() {
    let email = document.getElementById('exampleInputEmail1').value;
    let password = document.getElementById('exampleInputPassword1').value;
    let passHashed = sha256(password);
    
    if (!isEmptyDB()) {
        if (existsEmail(email)) {
            let res = matchPass(email, passHashed);

            if (res) {
                //fai qualcosa
                console.log('Login ok');
            }
            else {
                document.getElementById('errore-login').innerText = 'Errore login: password sbagliata';

                setTimeout(function () {
                    document.getElementById('errore-login').innerText = '';
                    }, 2000);     
            }
        }
        else {
            document.getElementById('errore-login').innerText = 'Errore: email non presente nel database';
            setTimeout(function () {
                document.getElementById('errore-login').innerText = '';
                }, 2000);       
        }
    }
    else {
        document.getElementById('errore-login').innerText = 'Errore: il database è vuoto';  
        setTimeout(function () {
            document.getElementById('errore-login').innerText = '';  
        }, 2000); 
    }

}


//main
window.onload = function () {
    if (window.localStorage.getItem('utenti') != null) { //verifico che ci siano persone nello storage
        let datiStorage = JSON.parse(window.localStorage.getItem('utenti'));
        utenti = datiStorage; //ho inizializzato l'anagrafica con i dati presenti nello storage
    }

}