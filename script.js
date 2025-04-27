const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
  // alternar a visibilidade do menu móvel
  document.body.classList.toggle("show-mobile-menu");
});

// fecha o menu quando o botão fechar 'x' for clicado
menuCloseButton.addEventListener("click", () => menuOpenButton.click());

// Initialize Swiper
const swiper = new Swiper('.slider-container', {
  loop: true,

  // Paginação
  pagination: {
    el: '.swiper-pagination',
    clickable: true, // opcional: torna os bullets clicáveis
  },


  // Setas de navegação
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  //Responsive breakpoints
  breakpoints: {
    0:{
        slidesPerView: 1
    },

    768:{
        slidesPerView: 2
    },

    1024:{
        slidesPerView: 3
    }
    
    
  }
});