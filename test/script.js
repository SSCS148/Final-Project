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

document.getElementById('toggleLoginPassword').addEventListener('click', () => {
    const passwordField = document.getElementById('loginPassword');
    const togglePasswordButton = document.getElementById('toggleLoginPassword');
    const icon = togglePasswordButton.querySelector('i');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
});