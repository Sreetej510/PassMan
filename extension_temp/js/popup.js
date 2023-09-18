import { post, get } from './call.js';
import { setCookie, deleteCookies } from './cookies.js';
import { checkLogin } from './login.js';
const loginForm = document.querySelector('.login-form');
const signupForm = document.querySelector('.signup-form');
const passwordList = document.getElementById('passwords');
const logoutBtn = document.getElementById('logout-btn');

// Show login form by default
loginForm.style.display = 'block';
signupForm.style.display = 'none';
passwordList.style.display = 'none';
logoutBtn.style.display = 'none';
//login User
loginForm.addEventListener("submit", e => {
    e.preventDefault();
    post('/user/login', { 
        username: e.target.querySelector('#username').value,
        masterPassword: e.target.querySelector('#password').value
    }).then(data => {
        if(data){
            var accessToken = data.accessToken
            var refreshToken = data.refreshToken
            setCookie('accessToken', accessToken, 15);
            setCookie('refreshToken', refreshToken, 14400);
            setCookie('username', e.target.querySelector('#username').value, 14400);
            loginForm.style.display = 'none';
            signupForm.style.display = 'none';
            passwordList.style.display = 'block';
            logoutBtn.style.display = 'block';
        }
    })
})

const signupBtn = document.getElementById('signup-btn');
signupBtn.addEventListener('click', () => {
    // Implement sign-up logic
    // Show password list after successful sign-up
    signupForm.style.display = 'none';
    passwordList.style.display = 'block';
    logoutBtn.style.display = 'block';
});

// Logout button
logoutBtn.addEventListener('click', () => {
    // Implement logout logic
    // Show login form after successful logout
    deleteCookies(['accessToken','refreshToken','username'])
    passwordList.style.display = 'none';
    logoutBtn.style.display = 'none';
    loginForm.style.display = 'block';
});

// Simulate password list display
const savedPasswords = ['example.com', 'another-site.com'];
savedPasswords.forEach((url) => {
    const li = document.createElement('li');
    li.textContent = url;
    passwordList.appendChild(li);
});


if(checkLogin()){
    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
    passwordList.style.display = 'block';
    logoutBtn.style.display = 'block';
}

