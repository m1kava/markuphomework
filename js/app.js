$(document).ready(function() {
    var $slick = $('.list-carousel');
    var $slicknav = $('.list-carousel-links');
    var $slicksec = $('section');

    $slick.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        fade: true,
        asNavFor: '.list-carousel-links',
        variableWith: true,
        responsive: [
            {
            breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrow: false,
                    vertical: false,
                    dots: true,
            }
            }
          ]
    });

    $slicknav.slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        vertical: true,
        asNavFor: '.list-carousel',
        focusOnSelect: true,
        responsive: [
            {
            breakpoint: 1280,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrow: false,
                    vertical: false,
              }
            },
            {
            breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrow: false,
                    vertical: false,
                    dots: false,
            }
            }
          ]
    });

    $(window).on('load resize orientationchange', function() {
        $slicksec.each(function(){
            var $carousel = $(this);
            /* Initializes a slick carousel only on mobile screens */
            // slick on mobile
            if ($(window).width() > 768) {
                if ($carousel.hasClass('slick-initialized')) {
                    $carousel.slick('unslick');
                }
            }
            else{
                if (!$carousel.hasClass('slick-initialized')) {
                    $carousel.slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        mobileFirst: true,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        dots: true,
                        arrow: false
                    });
                }
            }
        });
    });


    //Progress bar

    var time = 2;
    var $bar, isPause, tick, percentTime;
    $bar = $('.slider-progress .progress');
    $('.slider-wrapper').on({
        mouseenter: function() {
            isPause = true;
        },
        mouseleave: function() {
            isPause = false;
        }
    });

    function startProgressbar() {
        resetProgressbar();
        percentTime = 0;
        isPause = false;
        tick = setInterval(interval, 10);
    }

    function interval() {
        if (isPause === false) {
            percentTime += 1 / (time + 0.1);
            $bar.css({
                width: percentTime + "%"
            });
            if (percentTime >= 100) {
                $slick.slick('slickNext');
                $slicknav.slick('slickNext');
                startProgressbar();
            }
        }
    }

    function resetProgressbar() {
        $bar.css({
            width: 0 + '%'
        });
        clearTimeout(tick);
    }
    startProgressbar();

    $('.list-links').on('click', function() {
        $(this).addClass('slick-current');
        startProgressbar();
    });
});

$(window).on('load', function() {
    $('.slider-progress').width(107);
});

$(window).on('resize', function() {
    $('.slider-progress').width(107);
});

$('.list-carousel').on('afterChange', function(event, slick, currentSlide) {
    $('.list-links').removeClass('slick-current');
    $('.list-links[data-slick-index="' + currentSlide + '"]').addClass('slick-current');
});
