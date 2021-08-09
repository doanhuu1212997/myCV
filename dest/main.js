
$(document).ready(function () {

  Splitting();
  if (screen.width >= 992) {
    var tl = gsap.timeline();

    tl.to(".menu", 0.5, { y: 0 })
      .staggerFromTo(".menu ul li", 0.5, { opacity: 0 }, { opacity: 1 }, 0.2)
      .to(" .over-play-img", { opacity: 0, duration: .1 })
      .from(".nav_img .nav-img-wrap .img img", .5, {});
    tl.reverse()

  }
  else {
    var tl = gsap.timeline();

    tl.to(".menu", 0.5, { y: 0 })
      .staggerFromTo(".menu ul li", 0.5, { opacity: 0 }, { opacity: 1 }, 0.2)
    tl.reverse()
  }


  $('.btn').click(function (e) {
    e.preventDefault();

    if (!tl.isActive()) {
      // Only reverse the direction if the tween is not active
      tl.reversed() ? tl.restart() : tl.reverse();
      $(this).toggleClass('active');
    }
  });

//
let ItemMenu=$('.menu ul li a ');
$(ItemMenu).click(function (e) { 
  e.preventDefault();
  console.log('ơssss')
  
});
  /// LOADINGPAGE
  var tl1 = gsap.timeline();
  tl1.fromTo('.load__text', 1, { opacity: 1 }, { opacity: 0 }, 0.4)
    .to('.name', 1, { opacity: 1 })
    .to('.load', 0.6, { y: '-100%' })



  ///// HOVER INTRO TEXXT 
  var wordIntro = $('.hero__text .splitting .word');
  var tl2 = gsap.timeline();
  tl2.staggerFromTo(wordIntro, 0.8, { opacity: 0, rotationX: 90, transformOrigin: 'bottom', y: '60%' },
    { opacity: 1, rotationX: 0, y: '0%' }, 0.07, '-=0.6')

  tl2.reverse();
  setTimeout(function () {

    tl2.restart();
  }, 2600);

  let navMenu = $(".menu ul li");
  let navImg = $(".nav_img .nav-img-wrap .img")
  navImg.removeClass('active')
  $(navMenu).hover(function () {
    let i = $(this).index()
    $('.menu ul li').addClass('slim');
    $(this).removeClass('slim');
    var attrNav = $(this).attr('data-menu');
    $(navImg).removeClass('click')
    $('.' + attrNav).addClass('click')

  }, function () {
    $('.menu ul li').removeClass('slim');
    $(navImg).removeClass('click')
    $('.nav_img .nav-img-wrap .img.home').addClass('click')
    //  navImg[0].addClass('click')
  }
  );

  let cursorFl = $('.cursorFl')
  let link__bigger = $('.link__bigger')
  $(window).mousemove(function (e) {
    // values: e.clientX, e.clientY, e.pageX, e.pageY


    gsap.to(cursorFl, {
      x: e.clientX - (cursorFl.width() / 2),
      y: e.clientY - (cursorFl.height() / 2),
      duration: 0.2
    })
  });
  $('.link__bigger').mouseenter(function (e) {
    $('.cursorFl').addClass('link__bigger');

  });
  $('.link__bigger').mouseleave(function (e) {

    $('.cursorFl').removeClass('link__bigger');

  });
  $('.hero_fl').mousemove(function (e) {

    followParallaxMouse(e, $(this))

  });
  $('.hero_fl ').mouseleave(function (e) {

    TweenMax.to($(this), 0.3, { x: 0, y: 0 });

  });
  function followParallaxMouse(e, target) {
    parallaxMouse(e, target, 100);
  }

  function parallaxMouse(e, target, movement) {
    var $this = target;
    var relX = e.pageX - $this.offset().left;
    var relY = e.pageY - $this.offset().top;
    TweenMax.to(target, 0.3, {
      x: (relX - $this.width() / 2) / $this.width() * movement,
      y: (relY - $this.height() / 2) / $this.height() * movement
    });

  }



  particlesJS('particles-js',

    {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#fff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 5,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#db7373",
          "opacity": 1,
          "width": 2
        },
        "move": {
          "enable": true,
          "speed": 6,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 1,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true,
      "config_demo": {
        "hide_card": false,
        "background_color": "#b61924",
        "background_image": "",
        "background_position": "50% 50%",
        "background_repeat": "no-repeat",
        "background_size": "cover"
      }
    }

  );

});
// $(document).ready(function () {
//   var wordSpecial = $('.name');
//   function setDefaultTextHover() {
//     TweenMax.set(wordSpecial, { textShadow: +rYP / 20 + 'px ' + rXP / 10 + 'px rgba(238,29,82,.8), ' + rXP / 10 + 'px ' + rYP / 20 + 'px rgba(105,201,208,.8)' });
//   }
//   setDefaultTextHover();
//   $('.intro').mousemove(function (e) {
//     rXP = (e.pageX - this.offsetLeft - $(this).width() / 2);
//     rYP = (e.pageY - this.offsetTop - $(this).height() / 2);
//     TweenMax.set(wordSpecial, { textShadow: +rYP / 80 + 'px ' + rXP / 120 + 'px rgba(238,29,82,.8), ' + rXP / 120 + 'px ' + rYP / 70 + 'px rgba(105,201,208,.8)' });
//   });
//   $('.intro').mouseover(function (event) {
//     TweenMax.to(wordSpecial, 2, { autoAlpha: 1 });
//   });
// });

$(document).ready(function () {
  let introText = $('.intro .word');
  $('.word').each(function (index, el) {
    if (index === 3 || index === 7 || index === 10) {
      $(this).addClass('special_word');
    }
  });
  function isDeskop() {
    if (screen.width > 1199) {
      $('body').addClass('isDeskop');
    } else {
      $('body').removeClass('isDeskop');
    }

  }
  isDeskop()


 
  if (isDeskop() === true) {
    $('.title-hover').tilt({
      maxTilt: 20,
      perspective: 1200,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      scale: 1,
      speed: 2000,
      transition: true,
      reset: true,
    })
  }
  var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 30,
    mousewheel: true,
    speed: 600,
  spaceBetween: 100,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  $(window).resize(function () {
    isDeskop()
  });
});
