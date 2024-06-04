document.getElementById('email').addEventListener('blur', async (e) => {
    const email = e.target.value;
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = '';  // Clear previous messages

    try {
        const response = await fetch(`http://localhost:5001/api/user/check-email?email=${email}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.exists) {
            messageDiv.textContent = 'Email already exists';
            messageDiv.style.color = 'red';
        } else {
            messageDiv.textContent = `${email} introuvable`;
            messageDiv.style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.textContent = 'An error occurred while checking the email';
        messageDiv.style.color = 'red';
    }
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5001/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const messageDiv = document.getElementById('message');
        const data = await response.json();
        if (response.ok) {
            messageDiv.textContent = data.message;
            messageDiv.style.color = 'green';
        } else {
            messageDiv.textContent = data.error;
            messageDiv.style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:5001/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const messageDiv = document.getElementById('message');
        const data = await response.json();
        if (response.ok) {
            messageDiv.textContent = 'Login successful';
            messageDiv.style.color = 'green';
        } else {
            messageDiv.textContent = data.error;
            messageDiv.style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        messageDiv.textContent = 'An error occurred while logging in';
        messageDiv.style.color = 'red';
    }
});

document.getElementById('togglePassword').addEventListener('click', () => {
    const passwordField = document.getElementById('password');
    const togglePasswordButton = document.getElementById('togglePassword');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        togglePasswordButton.textContent = 'Hide';
    } else {
        passwordField.type = 'password';
        togglePasswordButton.textContent = 'Show';
    }
});

document.getElementById('toggleLoginPassword').addEventListener('click', () => {
    const passwordField = document.getElementById('loginPassword');
    const togglePasswordButton = document.getElementById('toggleLoginPassword');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        togglePasswordButton.textContent = 'Hide';
    } else {
        passwordField.type = 'password';
        togglePasswordButton.textContent = 'Show';
    }
});