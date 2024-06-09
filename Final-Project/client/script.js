// Gérer les soumissions du formulaire d'enregistrement
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const age = document.getElementById('age').value;

    try {
        const response = await fetch('http://localhost:5002/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, age })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('User registered:', data);
            document.getElementById('message').textContent = 'Registration successful!';
            document.getElementById('message').style.color = 'green';
            // Redirection vers main.html après l'enregistrement
            window.location.href = 'main.html';
        } else {
            const errorData = await response.json();
            console.error('Error registering user:', errorData);
            document.getElementById('message').textContent = 'Error: ' + errorData.error;
            document.getElementById('message').style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Error: ' + error.message;
        document.getElementById('message').style.color = 'red';
    }
});

// Gérer les soumissions du formulaire de connexion
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:5002/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('User logged in:', data);
            document.getElementById('message').textContent = 'Login successful!';
            document.getElementById('message').style.color = 'green';
            // Stockage du token JWT et redirection vers main.html après la connexion
            localStorage.setItem('token', data.token);
            window.location.href = 'main.html';
        } else {
            const errorData = await response.json();
            console.error('Error logging in user:', errorData);
            document.getElementById('message').textContent = 'Error: ' + errorData.error;
            document.getElementById('message').style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Error: ' + error.message;
        document.getElementById('message').style.color = 'red';
    }
});

// Gérer les soumissions des messages
document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = document.getElementById('message').value;
    const photo = document.getElementById('photo').files[0];
    const formData = new FormData();
    formData.append('message', message);
    formData.append('photo', photo);

    try {
        const response = await fetch('http://localhost:5002/api/posts', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            displayPost(data);
        } else {
            console.error('Error posting message:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Gérer les soumissions des commentaires
document.getElementById('commentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const comment = document.getElementById('comment').value;

    try {
        const response = await fetch('http://localhost:5002/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment })
        });

        if (response.ok) {
            const data = await response.json();
            displayComment(data);
        } else {
            console.error('Error posting comment:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Gérer les likes
document.getElementById('likeButton').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:5002/api/like', {
            method: 'POST'
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('likeButton').textContent = `Like (${data.likes})`;
        } else {
            console.error('Error liking:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

function displayPost(post) {
    const postsDiv = document.getElementById('posts');
    const postDiv = document.createElement('div');
    postDiv.innerHTML = `
        <p>${post.message}</p>
        ${post.photo ? `<img src="${post.photo}" alt="Post photo">` : ''}
    `;
    postsDiv.appendChild(postDiv);
}

function displayComment(comment) {
    const commentsSection = document.getElementById('commentsSection');
    const commentDiv = document.createElement('div');
    commentDiv.textContent = comment.comment;
    commentsSection.appendChild(commentDiv);
}

// Fonction pour afficher les messages d'erreur ou de succès
function displayMessage(message, isError = false) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.color = isError ? 'red' : 'green';
}

// Affichage/Masquage du mot de passe
document.getElementById('togglePassword').addEventListener('click', () => {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    const toggleButtonText = type === 'password' ? 'Show' : 'Hide';
    document.getElementById('togglePassword').textContent = toggleButtonText;
});

document.getElementById('toggleLoginPassword').addEventListener('click', () => {
    const passwordInput = document.getElementById('loginPassword');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    const toggleButtonText = type === 'password' ? 'Show' : 'Hide';
    document.getElementById('toggleLoginPassword').textContent = toggleButtonText;
});