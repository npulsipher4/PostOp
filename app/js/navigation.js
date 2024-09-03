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
                document.getElementById('page-content').innerHTML = newContent;
                document.title = doc.title;
                history.pushState(null, '', url);
                hideLoading();
                updateActiveNavLink();
                initializeNavigation(); // Reinitialize navigation after loading new content
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

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
});

function initializeNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    function setInitialState() {
        if (navList && menuToggle) {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            console.log('Initial state set: menu closed');
        }
    }

    function toggleMenu(event) {
        event.preventDefault();
        const isActive = navList.classList.toggle('active');
        menuToggle.classList.toggle('active', isActive);
        menuToggle.setAttribute('aria-expanded', isActive);
        console.log('Menu toggled, active:', isActive);
    }

    if (menuToggle && navList) {
        setInitialState();

        menuToggle.addEventListener('click', toggleMenu);

        navList.addEventListener('click', function(event) {
            if (event.target.classList.contains('nav-link')) {
                toggleMenu(event);
            }
        });

        document.addEventListener('click', function(event) {
            if (!event.target.closest('.main-nav') && navList.classList.contains('active')) {
                setInitialState();
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navList.classList.contains('active')) {
                setInitialState();
            }
        });
    } else {
        console.error('Menu toggle or nav list not found');
    }
}
