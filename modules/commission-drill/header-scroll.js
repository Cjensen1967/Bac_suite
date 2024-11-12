let lastScrollTop = 0;
const header = document.querySelector('header');
const scrollThreshold = 50;
let ticking = false;

function handleScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
                // Scrolling down & past threshold
                header.classList.add('hide');
            } else {
                // Scrolling up or at top
                header.classList.remove('hide');
            }
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
            ticking = false;
        });
        ticking = true;
    }
}

// Add scroll event listener with passive option for better performance
window.addEventListener('scroll', handleScroll, { passive: true });
