const preloadImages = () => {
    return new Promise((resolve, reject) => {
        imagesLoaded(document.querySelectorAll('img'),{background: true}, resolve);
    });
};

var cursor = $(".cursor"),
    cursor_top_default = $(window).height()/2,
    cursor_left_default = $(window).width()/2,
    pos = {x:cursor_left_default, y:cursor_top_default},
    mouse = { x: cursor_left_default, y: cursor_top_default },
    page = { x: cursor_left_default, y: cursor_top_default };

var flagScroll = false;
$('body').addClass('fullHeight');

function main(){
    var sizeScreenTablet = 975,
        sizeScreenMobile = 755,
        w_window = $(window).width(),
        h_height = $(window).height(),
        header = $('header'),
        main = $('main'),
        btn_contact = $('.btn_contact'),
        loading = $('.loading');

    const calcWinsize = () => winsize = { width: $(window).width(), height: $(window).height() };
    calcWinsize();

    // detect 
    function isMobile() {
        var mdDetect = new MobileDetect(window.navigator.userAgent);
        if (mdDetect.phone() !== null) {
            $('body').addClass('isMobile');
            return true;
        } else {
            $('body').removeClass('isMobile');
            return false;
        }
    }
    isMobile();

    function isTablet() {
        var mdDetect = new MobileDetect(window.navigator.userAgent);
        if (mdDetect.tablet() !== null) {
            $('body').addClass('isTablet');
            return true;
        } else {
            $('body').removeClass('isTablet');
            return false;
        }
    }
    isTablet();

    function isDesktop() {
        var mdDetect = new MobileDetect(window.navigator.userAgent);
        if (mdDetect.mobile() == null && mdDetect.phone() == null && mdDetect.tablet() == null) {
            return true;
        }
    }
    isDesktop();

    function splitText(element) {
        if(element.hasClass('split-text')){
            var type = element.attr('data-split');
            var mySplitText = new SplitText(element, {
                    type: (type == null) ? "lines,words,chars" : type,
                    charsClass: "char",
                    wordsClass: "word",
                }),
                myCharsSplitText = mySplitText.chars;
            splittext = true;
        }
    }

    var splitTextElement = $('.split-text');
    splitText(splitTextElement);


    // CONTACT OVERLAY CLICKED
    var tlContact = new TimelineMax(),
        contact = $('.contact'),
        overlayImageContact = $('.contact__avatar .contact__avatar-overlay'),
        imageContact = $('.contact__avatar .contact__avatar-wrap'),
        titleContact = $('.contact__content-title p .word'),
        textContact = $('.contact__content-text p'),
        emailContact = $('.contact__content-email a'),
        iconEmailContact = $('.contact__content-email i'),
        durContact = 0.7;
    function animationContact() {
        tlContact.fromTo(contact, 1.4, {y:'100%', ease: Power4.easeInOut},{y:'0%', ease: Power4.easeInOut})
                .to(overlayImageContact, 1.4, {height:'0%', ease: Circ.easeInOut},'-=1')
                .fromTo(imageContact, 1.4, {autoAlpha:0, scale:1.7},{autoAlpha:1, scale:1},'-=1')
                .staggerFromTo(titleContact, durContact, {autoAlpha:0,rotationX:90,transformOrigin:'bottom', y:'60%'},
                                            {autoAlpha:1,rotationX:0, y:'0%'}, 0.08, '-=0.6')
                .staggerFromTo(textContact, durContact, {y: 25, autoAlpha: 0},{y: 0, autoAlpha: 1},0.1,'-=0.5')
                .fromTo(iconEmailContact, durContact, {x: -25, autoAlpha:0}, {x: 0, autoAlpha:1},'-=0.6')
                .staggerFromTo(emailContact, durContact, {y: 25, autoAlpha: 0},{y: 0, autoAlpha: 1},0.1,'-=0.8')
        tlContact.reverse();
    }
    animationContact();
    
    function hideInfoContact(){
        TweenMax.to(contact, 0.4, {autoAlpha: 0});
        btn_contact.removeClass('active');
        setTimeout(function(){
            tlContact.timeScale(5).reverse();
        },300);
    }
    btn_contact.click(function(e) {
        e.stopPropagation();
        if(!tlContact.isActive()){
            if(tlContact.reversed()){
                TweenMax.set(contact, {autoAlpha: 1});
                tlContact.reversed() ? tlContact.restart().timeScale(1.2) : tlContact.reverse().timeScale(5);
                setTimeout(function(){
                    btn_contact.addClass('active');
                    console.log('111');
                    if($('.detailpage').length){
                        header.removeClass('has-back');
                    }
                },600);
            }else{
                hideInfoContact();
                if($('.detailpage').length){
                    header.addClass('has-back');
                }
            }
        }
    });

    $('.logo').on('click', function(event) {
        if($('.homepage').length){
            event.preventDefault();
        }
        hideInfoContact();
    });

    ////////////CUSTOM CUSOR POINTER MOUSE////////////////////////////////////
    var cursor = $(".cursor"),
        ease_cursor = 0.22,

        cursorX = parseInt(cursor.attr('data-mouse-x')), 
        cursorY = parseInt(cursor.attr('data-mouse-y')), 
        pos = {x:cursorX, y:cursorY},
        mouse = { x: cursorX, y: cursorY },
        page = { x: cursorX, y: cursorY };

    function updateCursor(){
        pos.x += (mouse.x - pos.x) * ease_cursor;
        pos.y += (mouse.y - pos.y) * ease_cursor;
        TweenMax.set(cursor, {
            left: pos.x  - cursor.width() / 2,
            top: pos.y - cursor.height() / 2
        });
    }

    $(document).on("mousemove", function(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        
        page.x = e.pageX;
        page.y = e.pageY;
    });


    cursor.removeClass('link-super-large link-large link-more link-drag');

  
    $('.link-large').hover(function() {
        cursor.addClass("link-large");
    }, function() {
        cursor.removeClass("link-large");
    });
    $('.link-large').on("mousemove", function() {
        if(!cursor.hasClass('link-large')){
            cursor.addClass("link-large");
        }
    });

    $('.intro__text').hover(function() {
        cursor.addClass("link-super-large");
    }, function() {
        cursor.removeClass("link-super-large");
    });


    $('.link-more').on("mousemove", function() {
        if(!cursor.hasClass('link-more')){
            cursor.addClass("link-more");
        }
    });
    $('.link-more').on("mouseover", function() {
        cursor.addClass("link-more");
    });
    $(".link-more").on("mouseleave", function() {
        cursor.removeClass("link-more");
    });
    
    $('.link-drag').hover(function() {
        cursor.addClass("link-drag");
    }, function() {
        cursor.removeClass("link-drag");
    });
    $('.link-drag').on("mousemove", function() {
        if(!cursor.hasClass('link-drag')){
            cursor.addClass("link-drag");
        }
    });
    

    function setStatusCursor(){
        if(isDesktop()){
            cursor.removeClass('hide');
            TweenMax.ticker.addEventListener('tick', updateCursor);
            TweenMax.ticker.fps(100);
        }else{
            cursor.addClass('hide');
        }
    }
    setStatusCursor();

    // CURSOR HOVER FOLLOW MOUSE
    if(isDesktop() == true){
        var hoverFollow = $('.hv-follow');
        hoverFollow.mouseleave(function(e) {
            TweenMax.to($(this), 0.3,{x: 0, y: 0});
        });
        hoverFollow.mousemove(function(e) {
            followParallaxMouse(e, $(this));
        });

        function followParallaxMouse(e, target){
            parallaxMouse(e, target, 80);
        }

        function parallaxMouse(e, target, movement){
            var $this = target;
            var relX = e.pageX - $this.offset().left;
            var relY = e.pageY - $this.offset().top;
            TweenMax.to(target, 0.3, {
                x: (relX - $this.width()/2) / $this.width() * movement,
                y: (relY - $this.height()/2) / $this.height() * movement
            });
        }
    }

    preloadImages().then(() => {
        $('.svg').svgToInline();
        if(isDesktop() == true){
            if($('.tilt-hover').length){
                $('.tilt-hover').tilt({
                    maxTilt:        20,
                    perspective:    1200,
                    easing:         "cubic-bezier(.03,.98,.52,.99)",
                    scale:          1, 
                    speed:          2000,
                    transition:     true,
                    reset:          true,
                });
            }
        }
    });


    // INTRO
    var tlLoadIntro = new TimelineMax({delay:0.3, onComplete:function(){
        $('body').removeClass('fullHeight');
        flagScroll = true;
    }});
    function loadIntro(){
        var loadIntro = $('.load'),
            text1LoadIntro = $('.load .load__text1'),
            text2LoadIntro = $('.load .load__text2');
        tlLoadIntro.to(text1LoadIntro, 0.4,{autoAlpha: 1})
                    .to(text1LoadIntro, 0.4,{autoAlpha: 0, delay: 0.5})
                    .to(text2LoadIntro, 0.4, {autoAlpha: 1})
                    .to(text2LoadIntro, 0.4, {autoAlpha: 0, delay: 0.5})
                    .to(loadIntro, 1.2, {y:"-105%", ease: Power4.easeInOut},'-=0.4');
    }

    // JS DETAIL PAGE
    if($('.detailpage').length){
        let titleSmall = $('.caption__text'),
            titleMain = $('.caption__main'),
            charsTitleMain = $('.caption__main .char'),
            videoDetail = $('.content__video'),
            duration = 0.7;
            easing = Power2.easeInOut,
            delay = 0;
        if($('.load').hasClass('is-hide')){
            delay = 3.2;
            $('.load').removeClass('is-hide');
        }else{
            delay = 0;
        }
        let tlDetail = new TimelineMax({delay: delay});
        tlDetail.fromTo(titleSmall, duration, {autoAlpha: 0, y: 20}, {autoAlpha: 1, y: 0})
                .to(titleMain,0.2, {autoAlpha:1}, '-=0.4')
                .staggerFromTo(charsTitleMain, duration, {autoAlpha:0,scaleY:0,transformOrigin:'top', y:'60%'},
                                                {autoAlpha:1,scaleY:1, y:'0%', ease: easing}, 0.07, '-=0.8')
                .fromTo(videoDetail, duration, {y:'40%',autoAlpha:0}, {y:'0%',autoAlpha:1, ease: easing}, '-=0.6');

        tlDetail.play();
    }

    // ALL PROJECT SLIDER
    if($('.allproject__list').length){
        $carousel = $('.allproject__list');
        titleAllProject = $('.allproject__title');
        titleItem = $('.tilt-hover',$carousel);
        skewMove = 15;
        progressBarActive = $('.allproject__progress .allproject__progress-bar .s1');
        progressBarAction = $('.allproject__progress .allproject__progress-bar .s2');

        $carousel.flickity({
            freeScroll:true,
            contain: true,
            prevNextButtons: false,
            pageDots: false
        });
        $carousel.on('scroll.flickity', function(event, progress) {
            progress = Math.max( 0, Math.min( 1, progress));
            valueTranslateTitle = -progress * 100 + '%';
            valueProgressBarActive = progress * 100 + '%';
            TweenMax.to(titleAllProject, 0.1, {left: valueTranslateTitle, ease: Power1.easeInOut});
            TweenMax.to(progressBarActive, 0.1, {width: valueProgressBarActive});

            if(valueProgressBarActive !== '0%'){
               TweenMax.to(progressBarAction, 0.1, {autoAlpha:0}); 
            }else{
                TweenMax.to(progressBarAction, 0.1, {autoAlpha:1}); 
            }
        });
        
        $carousel.on('dragMove.flickity', function( e, pointer, moveVector ) {
            if(isDesktop() == true){
                mouse.x = pointer.clientX;
                mouse.y = pointer.clientY;
                page.x = pointer.pageX;
                page.y = pointer.pageY;
                if (moveVector.x > 0) {
                    TweenMax.to($carousel, 1, {skewX:skewMove});
                    TweenMax.to(titleAllProject, 1, {skewX:skewMove});
                }else{
                    TweenMax.to($carousel, 1, {skewX:-skewMove});
                    TweenMax.to(titleAllProject, 1, {skewX:-skewMove});
                }
            }
        });

        $carousel.on('dragEnd.flickity', function( event, pointer ) {
            if(isDesktop() == true){
                TweenMax.to($carousel, 1, {skewX:0});
                TweenMax.to(titleAllProject, 1, {skewX:0});
            }
        });

        // const tlTextDrag = new TimelineMax({repeat: -1, repeatDelay: 0.3, yoyo: true}),
        //     textDrag = $('.allproject__progress .allproject__progress-text');
        //     textDragChar = $('.char',textDrag);
        //     tlTextDrag.staggerFromTo(textDragChar, 0.6, {autoAlpha: 0}, {autoAlpha: 1}, 0.1)

    }
    function init() {
        loadIntro();
    }
    init();

    $(window).resize(function() {
        calcWinsize();
        isMobile();
        isTablet();
        isDesktop();
    });


}

function resetCursor(){
    const cursor = $(".cursor");
    cursor.removeClass('link-large link-more link-drag');
}

function jsHome(){
    function splitText(element, type = null) {
        var mySplitText = new SplitText(element, {
                type: (type == null) ? "lines,words,chars" : type,
                charsClass: "char",
                wordsClass: "word",
            }),
            myCharsSplitText = mySplitText.chars;
        splittext = true;
    }
    function intro(){
        var intro = $('.intro'),
            intro_text = $('.intro__text p'),
            logo = $('.logo'),
            menuInfo = $('.btn_contact');
        
        splitText(intro_text, 'words');
        $('div',intro_text).each(function(index, el) {
            if(index == 2 || index == 8 || index == 10){
                $(this).addClass('special_word');
            }
        });
        // HOVER INTRO TEXT
        var rXP = 5;
        var rYP = 10;
        var textIntro = $('.intro__text');
        var wordIntro = $('.intro__text .word');
        var wordSpecial = $('.intro__text .special_word');
        var scrollIntro = $('.intro__scroll');
        
        function setDefaultTextHover(){
            TweenMax.set(wordSpecial, {textShadow: +rYP/20+'px '+rXP/10+'px rgba(238,29,82,.8), '+rXP/10+'px '+rYP/20+'px rgba(105,201,208,.8)' });
        }
        setDefaultTextHover();
        textIntro.mousemove(function(e){
            rXP = (e.pageX - this.offsetLeft-$(this).width()/2);
            rYP = (e.pageY - this.offsetTop-$(this).height()/2);
            TweenMax.set(wordSpecial, {textShadow: +rYP/80+'px '+rXP/120+'px rgba(238,29,82,.8), '+rXP/120+'px '+rYP/70+'px rgba(105,201,208,.8)' });
        });
        textIntro.mouseover(function(event) {
            TweenMax.to(wordSpecial, 2, {autoAlpha: 1});
        });
        
        var tlIntro = new TimelineMax({delay:1});
        tlIntro.staggerFromTo(wordIntro, 0.8, {autoAlpha:0,rotationX:90,transformOrigin:'bottom', y:'60%'},
                                            {autoAlpha:1,rotationX:0, y:'0%'}, 0.05, '-=0.6')
                .from(scrollIntro, 0.8, {y:-100, height:0, autoAlpha:0}, '-=0.3');
        tlIntro.reverse();

        var timeout;
        if($('.load').hasClass('is-hide')){
            timeout = 4000;
            $('.load').removeClass('is-hide');
        }else{
            timeout = 1000;
        }
        setTimeout(function(){
            tlIntro.restart();
        },timeout);
    }
    intro();

    $('#particles-js').css({
        'background' : '#000'
    })
}
function hoverImage(){
    // PROJECT HOVER IMAGE
    const projectImgWrap = $('.projects__list .project .project__img');
    function initHoverEffect(el,imgs){
        new hoverEffect({
            parent: el,
            intensity: imgs.context.dataset.intensity || undefined,
            speedIn: imgs.context.dataset.speedin || undefined,
            speedOut: imgs.context.dataset.speedout || undefined,
            easing: imgs.context.dataset.easing || undefined,
            hover: imgs.context.dataset.hover || undefined,
            image1: imgs[0].src,
            image2: imgs[1].src,
            displacementImage: imgs.context.dataset.displacement
        });
    }
    function setHoverImageProject(){
        if($('.projects__list').length){
            projectImgWrap.each(function(index, el){
                const imgs = $('img',el);
                initHoverEffect(el,imgs);
            });
        }
    } 
    function setHoverImageDistort(){
        if($('.distort-hover canvas').length == 0){
            $('.distort-hover').each(function(index, el){
                const imgs = $('img',el);
                initHoverEffect(el,imgs);
            });
        }
    }
    preloadImages().then(() => {
        setHoverImageProject();
        setHoverImageDistort();
    });
}
