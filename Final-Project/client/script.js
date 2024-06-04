document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const messageDiv = document.getElementById('message');
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