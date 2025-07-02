
//  Accordion section
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    item.classList.toggle('active');
  });
});
// swipper------------------------------------

const swiper = new Swiper('.partners-swiper', {
  loop: true,
  slidesPerView: 3,


  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 0
    },
    920: {
      slidesPerView: 2,
      spaceBetween: 40
    },
    1440: {
      slidesPerView: 3,
      spaceBetween: 40
    },
    1870: {
      slidesPerView: 4,
      spaceBetween: 60
    }
  }

});



const swiper2 = new Swiper('.posts-slider', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  centeredSlides: true,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});



// Burger --------------------------------------------
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const menuOverlay = document.getElementById('menuOverlay');

burger.addEventListener('click', function () {
  mobileMenu.classList.add('active');
});

closeMenu.addEventListener('click', function () {
  mobileMenu.classList.remove('active');
});

menuOverlay.addEventListener('click', function () {
  mobileMenu.classList.remove('active');
});






