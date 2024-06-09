// ########################## CONST'S ##########################
const btn_cadastrar = document.getElementById('btn-cadastrar');
const char_number_id = 5;
const special_caracteres = ['*', '&', '%', '$', '#', '@', '!'];
const phone_lenght = 11;
// ########################## ERROR MESSAGES ##########################
const error_msg_username = document.getElementById('error-message-username');
const error_msg_name = document.getElementById('error-message-name');
const error_msg_password = document.getElementById('error-message-password');
const error_msg_password_confirm = document.getElementById('error-message-password-confirm');
const error_msg_regiao = document.getElementById('error-message-regiao');
const error_msg_email = document.getElementById('error-message-email');
const error_msg_celular = document.getElementById('error-message-phone');
const error_msg_gender = document.getElementById('error-message-gender');
const error_msg_birthday = document.getElementById('error-message-birthday');
const error_msg_foto = document.getElementById('error-message-foto');
// ############################# ID'S ##############################
const name_id = document.getElementById('name');
const username_id = document.getElementById('username');
const senha_id = document.getElementById('password');
const senha_confirm_id = document.getElementById('password-confirm');
const email_id = document.getElementById('email');
const celular_id = document.getElementById('phone');
const regiao_id = document.getElementById('regiao');
const gender_id = document.getElementById('gender');
const birthday_id = document.getElementById('birthday');
const foto_id = document.getElementById('profile-pic');
// ############################ DECLARAÇÃO FUNÇÕES ############################

//função utilizada quando os dados inseridos passam por uma validação, altera cor do campo e apaga mensagem de erro
function confirmDados(error_msg_id, InputId){
    error_msg_id.innerHTML = '';
    error_msg_id.setAttribute('style', 'color: green; font-size: 12px');
    InputId.setAttribute('style', 'border-color: green; border-width: 2px')
}

//principal função de verificao. Input de uma validação a ser feita, e os ids do elemento que vai ser verificado (InputID)
//e dos elementos que vão ser alterados (mensagem de erro)
function verificaElementos(function_contem_or_not, InputId, error_msg_id, error_msg_text){
    if(function_contem_or_not){
        error_msg_id.innerHTML = '';
        error_msg_id.innerHTML = error_msg_text;
        error_msg_id.setAttribute('style', 'color: red; font-size: 12px');
        InputId.setAttribute('style', 'border-color: red; border-width: 2px');
        return true;
    }
    return false;
}

//função para verificar se o valor inserido contém numeros
function containsNumber(inputValue) {
    let has_Number = false;
    inputValue.split('').forEach(char => {
        if (!isNaN(char) && char !== ' ') {
            has_Number = true;
        }
    });
    return has_Number;
}

//funcao usada para verificar TODOS os requisitos da senha do usuário
function passwordRequirements(inputValue){
    let has_Number = false;
    let has_Maiuscula = false;
    let has_SpecialChar = false;
    senha = inputValue.value;
    senha.split('').forEach(char => { // usado para transformar em lista a senha inseridade
        if (!isNaN(char)) { //se o caracter for number primeira verificação OK
            has_Number = true;
        }
        if (isNaN(char)){ //validação se há caracteres maiusculos
            let char_maiusc = char.toUpperCase();
            if (char_maiusc === char && char.toLowerCase() !== char) { 
                has_Maiuscula = true;
            }
        }
        if(caracteresEspeciais(senha_id)){ //verificao de caracteres especiais
            has_SpecialChar = true;
        }
    });
    if(has_Number && has_Maiuscula && has_SpecialChar){
        confirmDados(error_msg_password, senha_id);
        return true;
    }
    else{
        verificaElementos(true, senha_id, error_msg_password, 'Sua senha deve ter: letra maiúscula, caracteres especiais e números');
        return false;           
    }
}
//função para verificar a existencia de caracteres especiais
function caracteresEspeciais(inputValue) {
    let has_SpecialChar = false;
    senha = inputValue.value;
    senha.split('').forEach(function(char) {
        if (special_caracteres.includes(char)) {
            has_SpecialChar = true;
        }
    });
    return has_SpecialChar;
}

//função para verificar username
function verificaUsername(){
    let username = username_id.value;
    if(verificaElementos(username === '', username_id, error_msg_username, 'Preencha esse campo.')){
        return false;
    }
    else if(verificaElementos(username.includes(' '), username_id, error_msg_username, 'O ID de usuário não pode conter espaços')){
        return false;
    }
    else if(verificaElementos(username.length < char_number_id, username_id, error_msg_username, `O ID de usuário deve ter no mínimo ${char_number_id} caracteres`)){
        return false;
    }
    else if(verificaUsernameExistente(username)){
        return false;
    }
    else{
        confirmDados(error_msg_username, username_id);
        return true;
    }
}

//função para verificar se username ja existe no localStorage
function verificaUsernameExistente(username){
    if(lista_users.some(user => user.username === username)){
        verificaElementos(true, username_id, error_msg_username, 'Este ID de usuário já está em uso');
        return true;
    }
    else {
        return false;
    }
}


function verificaName(){
    let name = name_id.value;
    if(verificaElementos(name ==='', name_id, error_msg_name, 'Preencha esse campo.')){
        return false;
    }
    else if(containsNumber(name)){
        verificaElementos(true, name_id, error_msg_name, 'Não pode conter números.')
        return false;
    }
    else{
        confirmDados(error_msg_name, name_id);
        return true;
    }
    
}

function verificaSenha(){
    let senha_check = passwordRequirements(senha_id);
    let senha = senha_id.value;
    let confirm_senha = senha_confirm_id.value;
    if (senha_check){
       if(verificaElementos(senha != confirm_senha, senha_confirm_id, error_msg_password_confirm, 'As senhas não coincidem')){
            return false;
       } 
       else{
            confirmDados(error_msg_password_confirm, senha_confirm_id)        
            return true;
       }
    }

}

//funcao para verificar se foi escolhida uma opcao dentro de uma lista, como regiao e genero
function verificaOpcoes(InputId, error_msg_id){
    let value = InputId.value;
    if(verificaElementos(value ==='', InputId, error_msg_id ,'Escolha uma das opções acima.')){
        return false;
    }
    else{
        confirmDados(error_msg_id, InputId);
        return true;       
    }
}

function verificaEmail(){
    let email = email_id.value;
    if(verificaElementos(email === '', email_id, error_msg_email, 'Preencha esse campo.')){
        return false;
    }
    else if(
        (verificaElementos(email.includes(' '), email_id, error_msg_email, 'O email não é válido')) || 
        (verificaElementos(!email.includes('@'), email_id, error_msg_email, 'O email não é válido')) || 
        (verificaElementos(!email.includes('.com'), email_id, error_msg_email, 'O email não é válido'))
    ){
        return false;
    }
    else{
        confirmDados(error_msg_email, email_id);
        return true;
    }

}

function verificaCelular(){
    let celular = celular_id.value;
    if(verificaElementos(celular === '', celular_id, error_msg_celular, 'Preencha esse campo.')){
        return false;
    }
    else if(verificaElementos(celular.length!=phone_lenght, celular_id, error_msg_celular, 'Número inválido')){
        return false;
    }
    else{
        confirmDados(error_msg_celular, celular_id);
        return true;
    }
}

function verificaBirthday(){
    let birthday = birthday_id.value;
    if(verificaElementos(birthday === '', birthday_id, error_msg_birthday, 'Preencha esse campo.')){
        return false;
    }
    else{
        confirmDados(error_msg_birthday, birthday_id);
        return true;
    }
}
function verificaFoto(){
    let foto = foto_id.value;
    if(verificaElementos(foto === '', foto_id, error_msg_foto, 'Preencha esse campo.')){
        return false;
    }
    else{
        confirmDados(error_msg_foto, foto_id);
        return true;
    }
}

//funcao para verificar se o login é de voluntario. pega informações do user e vefica na lista voluntarios
function verificaLoginExistente(){
    return lista_users.some(user => user.username === username_id.value);
}

//validacao se a senha bate com o username
function verificarSenhaxLogin(){
    for (let user of lista_users) {
        if (user.username === username_id.value) {
            return user.senha;
        }
    }
    return ''; 
}
// ############################ VALIDAÇÃO ############################
var login_check = JSON.parse(localStorage.getItem('login_check'));
localStorage.setItem('login_check', JSON.stringify(login_check));
let lista_users = [];

// Carregar dados do localStorage
if (localStorage.getItem('lista_users')) {
    lista_users = JSON.parse(localStorage.getItem('lista_users'));
}

const register_form = document.getElementById('registration-form');
const btnlogin_in = document.getElementById('btn-login');
const btncadastrar_se = document.getElementById('btnCadastreSe');

//ao clicar botao de login (fzr login)
btnlogin_in.addEventListener('click', function(event){
    event.preventDefault();
    register_form.style.display = 'block';
    let lista_block = [campo2,campo3,campo4,campo5,campo6,campo8,campo9,campo10];
    lista_block.forEach(campo =>{
        campo.style.display = 'none';
    })
    btncadastrar_se.style.display = 'none'
    document.getElementById("buttons").innerHTML = ''
    document.getElementById("buttons").innerHTML = `
    <div class="button-container">
        <button type="submit" id="btn-entrar">Entrar</button>
    </div>
    `
    document.getElementById("btn-entrar").addEventListener('click', function(event){
    error_msg_password.innerHTML = ''
    error_msg_username.innerHTML = ''
    event.preventDefault(); 
    let verificarCadastro_User = verificaLoginExistente();
    if(verificarCadastro_User!=''){
        confirmDados(error_msg_username, username_id);
        let senhaXuser = verificarSenhaxLogin()
        if(senhaXuser!=''){
            if(senhaXuser===senha_id.value){
                let container = document.querySelector('.container')
                container.innerHTML = ''
                container.innerHTML = `
                <div class="container">
                <h3>Login realizado!</h3>
                    <div class="button-container">
                        <button type="submit"><a href="index.html" style = "text-decoration: none; color: #ffffff">Página Inicial - Sobre nós</button>
                    </div>
                `
                let user_online = {
                    username: username_id.value,
                    senha: senha_id.value,
                }
                login_check = user_online;
                localStorage.setItem('login_check', JSON.stringify(login_check));
            }
            else{
                verificaElementos(true,senha_id, error_msg_password, 'Senha inválida.')
            }
        }
    }
    else{
        verificaElementos(true, username_id, error_msg_username, 'Usuário inexistente')
    }
})   

})


//ao clicar o botao de cadastre-se. definição do que vai ser mostrado na tela
btncadastrar_se.addEventListener('click', function(event){
    event.preventDefault();
    register_form.style.display = 'none';
    let btnSubmitCadastro = document.getElementById("btn-cadastrar");
    event.preventDefault();
    register_form.style.display = 'block';
    btnSubmitCadastro.style.display = 'block';
    let title = document.querySelector('h3');
    title.innerHTML = 'Cadastro de Usuário'; 
})

///verificação dos campos de informações
btn_cadastrar.addEventListener('click', function(event){
    event.preventDefault();
    profile_username = verificaUsername();
    profile_name = verificaName();
    profile_senha = verificaSenha();
    profile_regiao = verificaOpcoes(regiao_id, error_msg_regiao);
    profile_gender = verificaOpcoes(gender_id, error_msg_gender);    
    profile_email = verificaEmail();
    profile_celular = verificaCelular();
    profile_birthday = verificaBirthday();
    profile_foto = verificaFoto();
    if(profile_username && profile_name && profile_senha &&
        profile_regiao && profile_gender && profile_email &&
        profile_celular && profile_foto
    ){
        const new_user = {
            username: username_id.value,
            name: name_id.value,
            senha: senha_id.value,
            regiao: regiao_id.value,
            gender: gender_id.value,
            email: email_id.value,
            celular: celular_id.value,
            birthday: birthday_id.value,
            foto: foto_id.value,
            profileType: 'voluntario'
        }
        lista_users.push(new_user);  //guardou na lista de usuarios
        let container = document.querySelector('.container')
        container.innerHTML = ''
        container.innerHTML = `
        <div class="container">
        <h3>Cadastro realizado!</h3>
            <div class="button-container">
                <button type="submit"><a href="index.html" style = "text-decoration: none; color: #ffffff">Página Inicial - Sobre nós</button>
            </div>
            <div class="button-container">
                <button type="submit"><a href="events.html" style = "text-decoration: none; color: #ffffff">Eventos Disponíveis!</a></button>
            </div>
        </div>
        `
        let user_online = {
            username: username_id.value,
            senha: senha_id.value
        }
        login_check = user_online; //login_check usado para saber se um usuario esta logado
        localStorage.setItem('login_check', JSON.stringify(login_check)); //guardando informaçoes do login check
        localStorage.setItem('lista_users', JSON.stringify(lista_users)); //guardando informaçoes dos voluntarios
        };

    }
 )


