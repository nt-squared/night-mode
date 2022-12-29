// get menu button
const menuButton = document.querySelector('[data-menu-button]')
// get navbar
const navBar = document.querySelector('.nav-bar')
// toggle navigation bar
menuButton.addEventListener("click", () => {
    const currentState = menuButton.getAttribute("data-state");

    if (!currentState || currentState === "closed") {
        menuButton.setAttribute("data-state", "opened")
        menuButton.setAttribute("aria-expanded", "true")
        navBar.classList.add("show-nav-bar");
    } else {
        menuButton.setAttribute("data-state", "closed")
        menuButton.setAttribute("aria-expanded", "false")
        navBar.classList.remove("show-nav-bar");
    }
})


// get header
const header = document.querySelector('header');
let previousScrollPosition = window.scrollY;
// toggle header on scroll
window.onscroll = function () {
    let currentScrollPosition = window.scrollY;
    if (window.innerWidth >= 600) {
        if (previousScrollPosition < currentScrollPosition) {
            header.style.top = `-${header.clientHeight}px`
            header.style.transition = 'top 0.2s ease-out';
        } else {
            header.style.top = `0px`;
            header.style.transition = 'top 0.25s ease-in';
        }
        previousScrollPosition = currentScrollPosition;
    }
}
// get hero section
const heroSection = document.querySelector('[data-hero-section]');

// heroSection.style.backgroundImage = "url(./images/home/hero-bg.png)"

// set observer options
const navBarScrollOptions = {
    threshold: 0.7,
    edge: "start",
}
// build observer function
const navBarObserver = new IntersectionObserver((entries, navBarObserver) => {
    entries.forEach(entry => {

        if (!entry.isIntersecting) {
            header.classList.add('nav-bar-scrolled');
        } else {
            header.classList.remove('nav-bar-scrolled');
        }

    })
}, navBarScrollOptions)
// observe hero section
navBarObserver.observe(heroSection);

// get all events
const sliders = document.querySelectorAll('.slide-in');
// set observer options
const slideInOptions = {
    rootMargin: "0px 0px -250px 0px",
}
// build observer function
const slideInObserver = new IntersectionObserver((entries, slideInObserver) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            slideInObserver.unobserve(entry.target);
        } else { return }
    })
}, slideInOptions)
// observe events
sliders.forEach(slider => {
    slideInObserver.observe(slider);
})


// Modal
const buttonOpens = document.querySelectorAll('[data-button-open]');
const buttonCloses = document.querySelectorAll('[data-button-close]');
const modals = document.querySelectorAll('dialog');

modals.forEach(modal => {
    modal.addEventListener("click", (e) => {
        if (e.target.nodeName === 'DIALOG') {
            modal.close();
        }
    })
})


buttonOpens.forEach(buttonOpen => {
    buttonOpen.addEventListener("click", () => {
        const memberModal = document.querySelector(buttonOpen.dataset.targetModal)
        memberModal.showModal();

        buttonCloses.forEach(buttonClose => {
            buttonClose.addEventListener("click", () => {
                memberModal.close();
            })
        })
    })

})



