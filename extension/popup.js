document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('.login-form');
  const signupForm = document.querySelector('.signup-form');
  const passwordList = document.getElementById('passwords');
  const logoutBtn = document.getElementById('logout-btn');

  // Show login form by default
  loginForm.style.display = 'block';
  signupForm.style.display = 'none';
  passwordList.style.display = 'none';
  logoutBtn.style.display = 'none';

  const loginBtn = document.getElementById('login-btn');
  loginBtn.addEventListener('click', () => {
      // Implement login logic
      // Show password list after successful login
      loginForm.style.display = 'none';
      passwordList.style.display = 'block';
      logoutBtn.style.display = 'block';
  });

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
});
