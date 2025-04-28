// Når siden loader: start med at vise velkomstsiden
document.addEventListener('DOMContentLoaded', () => {
    loadTemplate('welcome');
});

// Funktion til at loade et template ind i #content
function loadTemplate(name) {
    const main = document.getElementById('content');
    main.innerHTML = templates[name];
}

// Funktioner til navigation mellem sider
function showExistingUser() {
    loadTemplate('existingUser');
    populateUserList();
}

function showNewUserForm() {
    loadTemplate('newUser');
}

// Funktion til at fylde brugerlisten (til existing users)
function populateUserList() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    const users = JSON.parse(localStorage.getItem('users')) || [];

    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.name;
        option.textContent = user.name;
        userList.appendChild(option);
    });
}

// Funktion til at registrere en ny bruger
function registerNewUser() {
    const name = document.getElementById('newUserName').value.trim();
    const dietSelect = document.getElementById('dietSelect');
    const otherDietInput = document.getElementById('otherDiet').value.trim();

    if (name === '') {
        alert('Please enter your name!');
        return;
    }

    let selectedDiets = Array.from(dietSelect.selectedOptions).map(option => option.value);

    if (selectedDiets.includes('Other') && otherDietInput !== '') {
        selectedDiets = selectedDiets.filter(d => d !== 'Other');
        selectedDiets.push(otherDietInput);
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name: name, dietary: selectedDiets, points: 0 });
    localStorage.setItem('users', JSON.stringify(users));

    alert('User registered! Now select your name.');
    showExistingUser();
}

// Funktion til at tjekke om "Other" er valgt og vise inputfelt
function checkOtherOption() {
    const dietSelect = document.getElementById('dietSelect');
    const otherDietDiv = document.getElementById('otherDietDiv');
    let selectedOptions = Array.from(dietSelect.selectedOptions).map(option => option.value);

    if (selectedOptions.includes('Other')) {
        otherDietDiv.classList.remove('hidden');
    } else {
        otherDietDiv.classList.add('hidden');
    }
}

// Funktion til at logge bruger ind
function loginUser() {
    const userList = document.getElementById('userList');
    const selectedUser = userList.value;

    if (!selectedUser) {
        alert('Please select a user!');
        return;
    }

    alert(`Welcome back, ${selectedUser}!`);
    // Her kan vi senere lave at man kommer videre til pointsystemet
}
