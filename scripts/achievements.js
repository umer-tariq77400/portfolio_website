// Initialize Swiper sliders for achievements page
window.addEventListener('DOMContentLoaded', () => {
  // Web Certificates Swiper
  const webSwiper = new Swiper('#webCertsSwiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    centeredSlides: false,
    loop: true,
    grabCursor: true,
    pagination: {
      el: '#webCertsSwiper .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '#webCertsSwiper .swiper-button-next',
      prevEl: '#webCertsSwiper .swiper-button-prev',
    },
    breakpoints: {
      320: { 
        slidesPerView: 1,
        spaceBetween: 16,
        centeredSlides: true 
      },
      576: { 
        slidesPerView: 1.2,
        spaceBetween: 16,
        centeredSlides: false 
      },
      768: { 
        slidesPerView: 2,
        spaceBetween: 20 
      },
      992: { 
        slidesPerView: 2.5,
        spaceBetween: 24 
      },
      1200: { 
        slidesPerView: 3,
        spaceBetween: 24 
      },
    },
  });

  // IT Certificates Swiper
  const itSwiper = new Swiper('#itCertsSwiper', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    centeredSlides: false,
    loop: true,
    grabCursor: true,
    pagination: {
      el: '#itCertsSwiper .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '#itCertsSwiper .swiper-button-next',
      prevEl: '#itCertsSwiper .swiper-button-prev',
    },
    breakpoints: {
      320: { 
        slidesPerView: 1,
        spaceBetween: 16,
        centeredSlides: true 
      },
      576: { 
        slidesPerView: 1.2,
        spaceBetween: 16,
        centeredSlides: false 
      },
      768: { 
        slidesPerView: 2,
        spaceBetween: 20 
      },
      992: { 
        slidesPerView: 2.5,
        spaceBetween: 24 
      },
      1200: { 
        slidesPerView: 3,
        spaceBetween: 24 
      },
    },
  });
});
