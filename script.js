document.addEventListener('DOMContentLoaded', () => {
    var navLinks = document.getElementById("navLinks");

    function showMenu() {
        navLinks.style.right = "0";
    }

    function hideMenu() {
        navLinks.style.right = "-300px";
    }

    // Set initial state of the menu
    if (navLinks) {
        navLinks.style.right = "-300px";
    }

    function expandCard(cardElement) {
        // Close any previously expanded card
        const expandedCard = document.querySelector('.card.expand');
        if (expandedCard) {
            expandedCard.classList.remove('expand');
            const infoContainer = expandedCard.querySelector('.info-container');
            if (infoContainer) {
                expandedCard.removeChild(infoContainer);
            }
        }

        // Expand the clicked card
        cardElement.classList.add('expand');

        // Add content dynamically if needed
        const title = cardElement.querySelector('.layer h3').textContent;
        const description = "This is a detailed description of " + title;
        const infoContainer = document.createElement('div');
        infoContainer.className = 'info-container';
        infoContainer.innerHTML = `<h2>${title}</h2><p>${description}</p>`;
        
        const closeButton = document.createElement('i');
        closeButton.className = 'fa fa-times close-btn';
        closeButton.onclick = () => {
            cardElement.classList.remove('expand');
            cardElement.removeChild(infoContainer);
        };

        infoContainer.appendChild(closeButton);
        cardElement.appendChild(infoContainer);
    }

    const cardContainer = document.getElementById('card-container');
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    function handleDrag(event) {
        if (!isDragging) return;
        event.preventDefault();

        const currentX = event.pageX || event.touches[0].pageX;
        const walk = (currentX - startX) * 2; // Adjust scroll speed
        cardContainer.scrollLeft = scrollLeft - walk;
    }

    cardContainer.addEventListener('mousedown', (event) => {
        isDragging = true;
        startX = event.pageX - cardContainer.offsetLeft;
        scrollLeft = cardContainer.scrollLeft;
        cardContainer.addEventListener('mousemove', handleDrag);
    });

    cardContainer.addEventListener('mouseup', () => {
        isDragging = false;
        cardContainer.removeEventListener('mousemove', handleDrag);
    });

    cardContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        cardContainer.removeEventListener('mousemove', handleDrag);
    });

    cardContainer.addEventListener('touchstart', (event) => {
        isDragging = true;
        startX = event.touches[0].pageX - cardContainer.offsetLeft;
        scrollLeft = cardContainer.scrollLeft;
        cardContainer.addEventListener('touchmove', handleDrag);
    });

    cardContainer.addEventListener('touchend', () => {
        isDragging = false;
        cardContainer.removeEventListener('touchmove', handleDrag);
    });

    cardContainer.scrollLeft = cardContainer.offsetWidth / 2;
});
