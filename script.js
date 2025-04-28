// Når siden loader, vis velkomsten
window.onload = function() {
    loadPage('welcome.html');
};

// Funktion til at loade en fil ind i <main id="content">
function loadPage(page) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content').innerHTML = data;
        })
        .catch(error => {
            document.getElementById('content').innerHTML = "<p>Sorry, something went wrong.</p>";
            console.error('Error loading page:', error);
        });
}
