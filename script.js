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

