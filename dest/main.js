
$(document).ready(function () {
  //Animation in 
  function intiSection() {
    //// Loading Page
    var tl1 = gsap.timeline();
    tl1.fromTo('.load__text', 1, { opacity: 1 }, { opacity: 0 }, 0.4)
      .to('.name', 1, { opacity: 1 })
      .to('.load', 0.6, { y: '-100%' })
    Splitting();

    // custom  cursor 
    let cursorFl = $('.cursorFl')
    cursor_top_default = $(window).height() / 2,
      cursor_left_default = $(window).width() / 2,
      pos = { x: cursor_left_default, y: cursor_top_default },
      mouse = { x: cursor_left_default, y: cursor_top_default },
      page = { x: cursor_left_default, y: cursor_top_default };
     
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
    $('.link__project').mouseenter(function (e) {
      $('.cursorFl').addClass('link__project');

    });
    $('.link__project').mouseleave(function (e) {

      $('.cursorFl').removeClass('link__project');

    });
    $('.drag').mouseenter(function (e) {
      $('.cursorFl').addClass('drag');

    });
    $('.drag').mouseleave(function (e) {

      $('.cursorFl').removeClass('drag');

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
    /// xử lí thiết bị 
    function isDeskop() {
      if (screen.width > 1199) {
        $('body').addClass('isDeskop');
      } else {
        $('body').removeClass('isDeskop');
      }

    }
    isDeskop()

    /// AL Project
    $carousel = $('.all__project');
    titleAllProject=$('.all__project-title')
    let skewMove = 15;
    $carousel.flickity({
      freeScroll: true,
      contain: true,
      prevNextButtons: false,
      pageDots: false
    });
    $carousel.on('scroll.flickity', function(event, progress) {
      progress = Math.max( 0, Math.min( 1, progress));
      valueTranslateTitle = -progress * 100 + '%';
      valueProgressBarActive = progress * 100 + '%';
      TweenMax.to(titleAllProject, 0.1, {left: valueTranslateTitle, ease: Power1.easeInOut});
      // TweenMax.to(progressBarActive, 0.1, {width: valueProgressBarActive});

      // if(valueProgressBarActive !== '0%'){
      //    TweenMax.to(progressBarAction, 0.1, {autoAlpha:0}); 
      // }else{
      //     TweenMax.to(progressBarAction, 0.1, {autoAlpha:1}); 
      // }
  });
    $carousel.on('dragMove.flickity', function (e, pointer, moveVector) {
      // mouse.x = pointer.clientX;
      // mouse.y = pointer.clientY;
      // page.x = pointer.pageX;
      // page.y = pointer.pageY;
      if (moveVector.x > 0) {
        console.log(moveVector.x)
        TweenMax.to($carousel, 1, { skewX: skewMove });
        TweenMax.to(titleAllProject, 1, { skewX: skewMove });
      } else {
        TweenMax.to($carousel, 1, { skewX: -skewMove });
        TweenMax.to(titleAllProject, 1, { skewX: -skewMove });
      }
    });
    $carousel.on('dragEnd.flickity', function (event, pointer) {
      TweenMax.to($carousel, 1, { skewX: 0 });
      TweenMax.to(titleAllProject, 1, { skewX: 0 });
    });

    ///Click Menu
    $('.btn').click(function (e) {
      e.preventDefault();

      if (!tl.isActive()) {
        // Only reverse the direction if the tween is not active
        tl.reversed() ? tl.restart() : tl.reverse();
        $(this).toggleClass('active');
      }
    });
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

    /// Click Nav li Menu 
    let ItemMenu = $('.menu ul li a ');
    $(ItemMenu).click(function (e) {
      e.preventDefault();
      console.log('ơssss')
    });
    // hover Menu 
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


    /// Xử lí intro Hero 
    var wordIntro = $('.hero__text .splitting .word');
    var tl2 = gsap.timeline();
    tl2.staggerFromTo(wordIntro, 0.8, { opacity: 0, rotationX: 90, transformOrigin: 'bottom', y: '60%' },
      { opacity: 1, rotationX: 0, y: '0%' }, 0.07, '-=0.6')

    tl2.reverse();
    setTimeout(function () {

      tl2.restart();
    }, 2600);



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

    $(window).resize(function () {
      // let heightW = $(window).height();
      // let slide =$(".swiper-slide ");
      // $(slide).css({
      //   "height": heightW 
      // });
      isDeskop()
    });
    /// backgroud intro hero
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
    //MouseScroll
    function WheelScroll() {
      $(window).on('mousewheel DOMMouseScroll', function (e) {
        var direction2;
        var isAnimating = false
        if (isAnimating === false) direction2 = (function () {

          var delta = Math.max(-1, Math.min(1, (e.originalEvent.wheelDelta || -e.originalEvent.detail)));
          return delta;
        }());
        console.log(direction2);


      });
    };
    WheelScroll();

    ///
    let isDown = false;
    let startX;
    let scrollLeft;
    const slider = document.querySelector('.box');
    const start = (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    }
  }
  intiSection()


});






