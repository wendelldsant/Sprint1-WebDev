const listaUser = JSON.parse(localStorage.getItem('users'));
const loginCheck = JSON.parse(localStorage.getItem('login_check'));
const userOnline = loginCheck ? loginCheck.username : null;
const btnCriaPost = document.getElementById('btnPost');
const feed = document.querySelector('#posts');
let listaPost = JSON.parse(localStorage.getItem('posts')) || [];

window.onload = function() {
    verifyUser();
    readPost();
};

function verifyUser() {
    if (!userOnline) {
        let redeSocial = document.getElementById('container');
        redeSocial.innerHTML = ''
        redeSocial.innerHTML = `
        <h3>Faça login ou cadastre-se para acessar a rede social!</h3>
        `
    }
}

function criaPost(dados) {
    const newPost = {
        message: dados.message,
        foto: dados.foto,
        username: dados.username,
        idPost: listaPost.length + 1
    };
    listaPost.push(newPost);
    savePosts(); 
    readPost();
}

function readPost() {
    feed.innerHTML = '<h3>Publicações</h3>';
    if (listaPost.length !== 0) {
        listaPost.forEach(element => {
            const post = document.createElement('div');
            post.className = 'post';
            post.id = `post${element.idPost}`;
            post.innerHTML = `
                <div class="post-content">
                    <p>${element.username}: ${element.message}</p>
                    <img src="${element.foto}" alt="Foto do Post">
                    ${element.username === userOnline ? `<button class="delete-button" id="delete${element.idPost}" onclick = "deleteMessage(${element.idPost})">Delete Post <i class="fas fa-trash"></i></button>` : ''}
                </div>
            `;
            feed.append(post);
        });
    } else {
        feed.innerHTML += '<p style="color:gray">Seja o primeiro a comentar!</p>';
    }
}

function savePosts() {
    localStorage.setItem('posts', JSON.stringify(listaPost));
}

function deleteMessage(id){
    listaPost = listaPost.filter(post => post.idPost !== id);
    savePosts();
    readPost();
}

btnCriaPost.addEventListener('click', function(event) {
    event.preventDefault();
    criaPost({
        message: document.querySelector('#message').value,
        foto: document.querySelector('#photo').value,
        username: userOnline
    });
    document.querySelector("#new-post-form").reset();
    document.querySelector("#new-post-form").innerHTML = `
        <div class="form-group">
            <label for="message">Mensagem:</label>
            <textarea id="message" name="message" rows="6" required></textarea>
        </div>
        <div class="form-group">
            <label for="photo">Foto:</label>
            <input type="url" id="photo" name="profile-pic">
        </div>
        <div class="button-container">
            <button id="btnPost" type="submit">Postar</button>
        </div>
    `;
});
