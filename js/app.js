$(document).ready(function() {
    let $slick = $('.list-carousel');
    let $slicknav = $('.list-carousel-links');
    let $slicksec = $('section');

    $slick.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        fade: true,
        cssEase: 'linear',
        lazyLoad: 'ondemand',
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
        autoplay: false,
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
            let $carousel = $(this);
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

    let time = 5;
    let $bar, isPause, tick, percentTime;
    $bar = $('.slider-progress .progress');

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


    $(document).ready(function() {
        $('img[src$=".svg"]').each(function() {
            let $img = $(this);
            let imgURL = $img.attr('src');
            let attributes = $img.prop("attributes");
    
            $.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                let $svg = $(data).find('svg');
    
                // Remove any invalid XML tags
                $svg = $svg.removeAttr('xmlns:a');
    
                // Loop through IMG attributes and apply on SVG
                $.each(attributes, function() {
                    $svg.attr(this.name, this.value);
                });
    
                // Replace IMG with SVG
                $img.replaceWith($svg);
            }, 'xml');
        });
    });
});

$(window).on('load', function() {
    $('.slider-progress').width(107);
});

$(window).on('resize', function() {
    $('.slider-progress').width(107);
});

