// login.js



document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // Hardcoded credentials for simplicity
    const adminUsername = 'admin';
    const adminPassword = 'password';

    if (username === adminUsername && password === adminPassword) {
        alert('Login successful!');
        localStorage.setItem('isLoggedIn', 'true'); // Store login status
        window.location.href = 'dashboard.html';   // Redirect to dashboard
    } else {
        alert('Invalid username or password');
    }
});
