document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            const headerOffset = 100;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Highlight current section in navigation
    const sections = document.querySelectorAll('.instruction-section');
    const navLinks = document.querySelectorAll('.section-nav a');

    function highlightNavigation() {
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.style.backgroundColor = 'transparent';
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.style.backgroundColor = 'rgba(255,255,255,0.1)';
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);
});
