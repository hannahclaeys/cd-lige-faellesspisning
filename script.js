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

        // Hvis det er newuser siden, skal avatarer loades
        if (page === 'newuser.html') {
            loadAvatars();
        }
    })
    .catch(error => {
        document.getElementById('content').innerHTML = '<h2>Page not found :(</h2>';
    });
}

// Funktion til at loade avatars på ny bruger siden
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

// Funktion til at vælge avatar
function selectAvatar(filename) {
    selectedAvatar = filename;

    // Highlight valgt avatar
    document.querySelectorAll('.avatar').forEach(img => {
        img.classList.remove('selected');
        if (img.src.includes(filename)) {
            img.classList.add('selected');
        }
    });
}

// Funktion til at vise eksisterende bruger-side
function showExistingUser() {
    loadPage('existinguser.html');
}

// Funktion til at vise ny bruger-side
function showNewUserForm() {
    loadPage('newuser.html');
}

// Funktion til at registrere en ny bruger
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
    showExistingUser();
}

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

