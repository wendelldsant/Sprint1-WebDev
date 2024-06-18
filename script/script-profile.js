// ################################## EVENT PAGE #######################################
//pegar informações do localStorage
const lista_users = JSON.parse(localStorage.getItem('lista_users'));
var login_check = JSON.parse(localStorage.getItem('login_check'));
let userType = '';

//função para verificar se o Login foi feito
function verifyUser(){
    let user_dados = ''
    if (lista_users) {
        lista_users.forEach(user => {
            if (login_check.username === user.username) {
                user_dados = user;
            }
        });
    }
    if(login_check===false || login_check===null || login_check === ''){
        document.getElementById('container').innerHTML = ''
        document.getElementById('container').innerHTML = `
        <h3>Faça seu login ou cadastre-se!</h3>
        <div id="buttons">
        <div class="button-container">
            <button type="submit" id="btn-login">Login</button>
        </div>
        `
        document.getElementById('btn-login').addEventListener('click', function(event){ //solicitação de login
            event.preventDefault
            window.location.href = "register-page.html";
            user_dados = false;
        })
    }
    return user_dados
}


//ao carregar a pagina carrega informações do usuario logado
window.onload = function(event) {
    event.preventDefault();
    const user_dados = verifyUser()
    if(user_dados!=false){
        const profileData = document.querySelector('.container')
        container.innerHTML = `
        <h3>Meu Perfil</h3>
        <div class="profile-info">
            <img src="${user_dados.foto}" alt="Foto de Perfil">
            <div>
                <h2>${user_dados.name}</h2>
            </div>
        </div>
        <div class="profile-data">
            <label>Email:</label>
            <p>${user_dados.email}</p>
        </div>
        <div class="profile-data">
            <label>Celular:</label>
            <p>${user_dados.celular}</p>
        </div>
        <div class="profile-data">
            <label>Cidade:</label>
            <p>${user_dados.regiao}</p>
        </div>
        <div class="button-container">
            <button id = "btnSair" type="button">Sair</button>
        </div>
        </div>
        `
        const btnSair = document.querySelector("#btnSair");
        btnSair.addEventListener('click', function(event){
            event.preventDefault();
            var login_check = false
            localStorage.setItem('login_check', JSON.stringify(login_check));
            window.location.href = "register-page.html";
    })
    }

}


