// var //

let utenti = [];

// main fuction //

/*
input => email, password
output => bool
*/
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

/*
input => nome, cognome , email , password hashed
output => bool and message
*/
function saveDB(n, c, email, pwd) {
   //check if database is empty
    //if is true , save immediately
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
    else {//check if email exist
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



/*
i use this function for register an user into local storage
output => string message
*/
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

/*
i use this function for get user data from local storage and login user into my app
output => set a cookie and redirect user
*/
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
                docCookies.setItem("app_isLogged", "true");
                docCookies.setItem("app_email", email);
                window.location.replace("http://localhost/corso/Nunzio/login/benvenuto.html");
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

// utility function //

/*
check if an email exist
input => email
output => boot
*/
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

/*
check if database is empty
output => bool
*/
function isEmptyDB() {
    return ( (window.localStorage.getItem('utenti') != null) ) ? false : true;
}

/*
get user name and surname
input => email
output => obj
*/
function getUserInfo(email) {
    let user = undefined;
    let datiStorage = JSON.parse(window.localStorage.getItem('utenti'));
    for (i = 0; i < datiStorage.length; i++) {
        if (datiStorage[i].email == email) {
            user = {
                nome: datiStorage[i].nome,
                cognome: datiStorage[i].cognome
            }
        }
    }
    return user;   
}


//main
window.onload = function () {
    if (window.localStorage.getItem('utenti') != null) { //verifico che ci siano persone nello storage
        let datiStorage = JSON.parse(window.localStorage.getItem('utenti'));
        utenti = datiStorage; //ho inizializzato l'anagrafica con i dati presenti nello storage
    }
   let isLogged =  docCookies.getItem('app_isLogged');
    if (isLogged == 'true') {
        window.location.replace("http://localhost/corso/Nunzio/login/benvenuto.html");
    }
}