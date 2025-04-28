// Når siden loader: start med at vise velkomstsiden
document.addEventListener('DOMContentLoaded', () => {
    loadPage('welcome.html');
});

// Funktion til at hente en hel HTML-side ind i #content
function loadPage(page) {
    fetch(page)
    .then(response => {
        if (!response.ok) {
            throw new Error('Page not found');
        }
        return response.text();
    })
    .then(html => {
        document.getElementById('content').innerHTML = html;

        // Ekstra funktioner baseret på siden
        if (page === 'newuser.html') {
            loadAvatars();
        }
        if (page === 'existinguser.html') {
            loadUserList();
        }
        if (page === 'profile.html') {
            loadProfile(); // <- Tilføj denne linje!
        }
    })
    .catch(error => {
        document.getElementById('content').innerHTML = '<h2>Page not found :(</h2>';
    });
}

// Disse funktioner sørger for at knapperne virker i welcome.html
function showExistingUser() {
    loadPage('existinguser.html');
}

function showNewUserForm() {
    loadPage('newuser.html');
}

// Avatar håndtering
function loadAvatars() {
    const avatarSelection = document.getElementById('avatarSelection');
    avatarSelection.innerHTML = '';

    const avatars = ["avatar1.png", "avatar2.png", "avatar3.png", "avatar4.png"];

    avatars.forEach(filename => {
        const img = document.createElement('img');
        img.src = `avatars/${filename}`;
        img.className = 'avatar';
        img.onclick = () => selectAvatar(filename);
        avatarSelection.appendChild(img);
    });
}

let selectedAvatar = null;

function selectAvatar(filename) {
    selectedAvatar = filename;

    document.querySelectorAll('.avatar').forEach(img => {
        img.classList.remove('selected');
        if (img.src.includes(filename)) {
            img.classList.add('selected');
        }
    });
}

// Registrering af ny bruger
function registerNewUser() {
    const nameInput = document.getElementById('newUserName');
    const dietSelect = document.getElementById('dietSelect');
    const otherDietInput = document.getElementById('otherDiet');

    const name = nameInput ? nameInput.value.trim() : '';
    const otherDiet = otherDietInput ? otherDietInput.value.trim() : '';

    if (name === '') {
        alert('Please enter your name!');
        return;
    }

    if (!selectedAvatar) {
        alert('Please select an avatar!');
        return;
    }

    let selectedDiets = [];
    if (dietSelect) {
        selectedDiets = Array.from(dietSelect.selectedOptions).map(option => option.value);

        if (selectedDiets.includes('Other') && otherDiet !== '') {
            selectedDiets = selectedDiets.filter(d => d !== 'Other');
            selectedDiets.push(otherDiet);
        }
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name: name, dietary: selectedDiets, avatar: selectedAvatar, points: 0 });
    localStorage.setItem('users', JSON.stringify(users));

    alert('User registered! Now select your name.');
    loadPage('existinguser.html');
}

// Fyld brugerlisten ved existinguser
function loadUserList() {
    const userList = document.getElementById('userList');
    if (!userList) return;

    userList.innerHTML = '';

    const users = JSON.parse(localStorage.getItem('users')) || [];

    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.name;
        option.textContent = user.name;
        userList.appendChild(option);
    });
}

// Login funktion
function loginUser() {
    const userList = document.getElementById('userList');
    const selectedName = userList ? userList.value : null;

    if (!selectedName) {
        alert('Please select a user!');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const activeUser = users.find(user => user.name === selectedName);

    if (activeUser) {
        localStorage.setItem('activeUser', JSON.stringify(activeUser));
        loadPage('profile.html');  // <-- Vigtigt: vi sender brugeren til den nye profilside!
    } else {
        alert('Selected user not found!');
    }
}

// Slet bruger funktion
function deleteUser() {
    const userList = document.getElementById('userList');
    const selectedName = userList ? userList.value : null;

    if (!selectedName) {
        alert('Please select a user to delete!');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users = users.filter(user => user.name !== selectedName);
    localStorage.setItem('users', JSON.stringify(users));

    alert(`Deleted ${selectedName}!`);
    loadUserList(); // Opdatér listen bagefter
}

// Vis/hide Other inputfeltet
function checkOtherOption() {
    const dietSelect = document.getElementById('dietSelect');
    const otherDietDiv = document.getElementById('otherDietDiv');

    if (!dietSelect || !otherDietDiv) return;

    const selectedOptions = Array.from(dietSelect.selectedOptions).map(option => option.value);

    if (selectedOptions.includes('Other')) {
        otherDietDiv.classList.remove('hidden');
    } else {
        otherDietDiv.classList.add('hidden');
    }
}

function loadProfile() {
    const profileContent = document.getElementById('profileContent');
    if (!profileContent) return;

    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    if (!activeUser) {
        profileContent.innerHTML = '<p>No active user found!</p>';
        return;
    }

    profileContent.innerHTML = `
        <img src="avatars/${activeUser.avatar}" alt="Avatar" style="width: 120px; height: 120px; border-radius: 50%; margin-bottom: 20px;"><br>
        <h2>${activeUser.name}</h2>
        <p>Points: ${activeUser.points}</p>
    `;
}
