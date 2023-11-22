document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substr(1); 
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth' 
            });
        }
    });
});

function initCarousel() {
    const items = document.querySelectorAll('.carousel-item');
    let currentItem = 0;

    function showItem(index) {
        items.forEach((item, i) => {
            item.style.opacity = i === index ? 1 : 0;
        });
    }

    showItem(currentItem);

    const prevButton = document.querySelector('.arrow-prev');
    const nextButton = document.querySelector('.arrow-next');

    prevButton.addEventListener('click', () => {
        currentItem = (currentItem - 1 + items.length) % items.length;
        showItem(currentItem);
    });

    nextButton.addEventListener('click', () => {
        currentItem = (currentItem + 1) % items.length;
        showItem(currentItem);
    });
}

initCarousel();
