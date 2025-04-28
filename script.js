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

        // Tilføj denne kontrol:
        if (page === 'newuser.html') {
            loadAvatars();
        }
    })
    .catch(error => {
        document.getElementById('content').innerHTML = '<h2>Page not found :(</h2>';
    });
}

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

    // Vis hvilken avatar der er valgt
    document.querySelectorAll('.avatar').forEach(img => {
        img.classList.remove('selected');
        if (img.src.includes(filename)) {
            img.classList.add('selected');
        }
    });
}


