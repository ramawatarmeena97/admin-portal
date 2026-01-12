// ---------------- Section Show/Hide ----------------
function showSection(id) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// ---------------- Login/Logout ----------------
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const modal = document.getElementById('login-modal');
const closeBtn = document.querySelector('.close');
const loginSubmit = document.getElementById('login-submit');
const userNameDisplay = document.getElementById('user-name');

// Open modal
loginBtn.addEventListener('click', () => modal.style.display = 'block');

// Close modal
closeBtn.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => { if(e.target == modal) modal.style.display = 'none'; });

// Login function (Frontend JSON simulation)
loginSubmit.addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('Please enter username and password');
        return;
    }

    fetch('users.json')
        .then(res => res.json())
        .then(users => {
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                userNameDisplay.textContent = username;
                loginBtn.style.display = 'none';
                logoutBtn.style.display = 'inline-block';
                modal.style.display = 'none';
                alert(`Welcome, ${username}!`);
            } else {
                alert('Invalid username or password');
            }
        })
        .catch(err => alert('Error loading user database'));
});

// Logout
logoutBtn.addEventListener('click', () => {
    userNameDisplay.textContent = 'Guest';
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
    alert('Logged out successfully!');
});
