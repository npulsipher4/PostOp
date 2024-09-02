document.addEventListener('DOMContentLoaded', () => {
    const pageContent = document.getElementById('page-content');
    const loadingIndicator = document.getElementById('loading-indicator');

    function showLoading() {
        loadingIndicator.style.display = 'block';
        pageContent.style.opacity = '0.5';
    }

    function hideLoading() {
        loadingIndicator.style.display = 'none';
        pageContent.style.opacity = '1';
    }

    function loadPage(url) {
        showLoading();
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newContent = doc.getElementById('page-content').innerHTML;
                pageContent.innerHTML = newContent;
                document.title = doc.title;
                history.pushState(null, '', url);
                hideLoading();
                updateActiveNavLink();
                // Re-initialize any scripts that need to run on the new page
                if (url.includes('/sign-up') && typeof initializeFormHandlers === 'function') {
                    initializeFormHandlers();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                hideLoading();
            });
    }

    function updateActiveNavLink() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === window.location.pathname) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.classList.contains('nav-link')) {
            e.preventDefault();
            const url = link.getAttribute('href');
            loadPage(url);
        }
    });

    window.addEventListener('popstate', () => {
        loadPage(window.location.pathname);
    });

    // Initial active link update
    updateActiveNavLink();
});