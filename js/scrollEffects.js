var images = [];
var frontImage, backImage;
var picCount = 21;
	
function preload() {
	for (var i=0; i < picCount; i++) {
		images[i] = new Image();
		images[i].src = 'images/rotation/'+ i + '.png';
	}
	frontImage = new Image();
	frontImage.src = "images/front.png";
	backImage = new Image();
	backImage.src = "images/parts/case.png";
}



$(function () { // wait for document ready

	preload();

	var controller = new ScrollMagic.Controller({
		globalSceneOptions: {
			triggerHook: 'onLeave'
		}
	});

	// Animacije
	var floatTween = TweenMax.fromTo("#phone", 2, {y:-50},{y:-60, repeat:-1, yoyo:true, ease: Sine.easeInOut});
	TweenMax.to("#scroll-arrow", 0.5, {scaleX:1.2, scaleY:1.2, repeat:-1, yoyo:true, ease: Sine.easeInOut});
	TweenMax.to("#scroll-up", 0.5, {scaleX:1.2, scaleY:1.2, repeat:-1, yoyo:true, ease: Sine.easeInOut});

	// Prehodi na slide 2
	var arrowSlide = new TimelineMax()
		.fromTo("#scroll-arrow",  1, {y:  "0px", autoAlpha: 1}, {y: "80px", autoAlpha: 0.5, ease: Linear.easeNone})
		.fromTo("#scroll-guide",  1, {autoAlpha: 1}, {autoAlpha: 0, ease: Linear.easeNone}, '-=1')
		.fromTo("#scroll-info p",  1, {autoAlpha: 1}, {autoAlpha: 0, ease: Linear.easeNone}, '-=1')

	var arrowSlideScene = new ScrollMagic.Scene({triggerElement: "#slide1", duration: 100})
					.setTween(arrowSlide)
					//.addIndicators() // add indicators (requires plugin)
					.addTo(controller)

	var phoneSlide = new TimelineMax()
		.to("#phone",  1, {y: "0px", ease: Linear.easeNone})

	
	var phoneSlideScene = new ScrollMagic.Scene({triggerElement: "#slide1", duration: 200})
					.setTween(phoneSlide)
					.offset(50)
					.on("start", function(e){
						if(e.scrollDirection == 'REVERSE'){
							floatTween.play();
						} else {
							floatTween.pause();
						}
					})
					.addTo(controller)

	var rotatePhone = new ScrollMagic.Scene({triggerElement: "#slide2", duration:400})
					.offset(-600)
					.addTo(controller)
					.on("end", function (e) {
						if(e.scrollDirection == 'REVERSE'){
							$("#phone-image").attr("src", frontImage.src);
							$("#phone-parts").removeClass('visible');
						} else {
							$("#phone-image").attr("src", backImage.src);
							$("#phone-parts").addClass('visible');
						}
						
					})
					.on("progress", function(e){
				      	$('#phone-image').attr("src", images[Math.round(e.progress*(picCount-1))].src);
					});

	var slide2 = new ScrollMagic.Scene({triggerElement: "#slide2"})
					.setPin("#slide2")
					.addTo(controller)

	var slide2paneEnter = new TimelineMax()
		.to("#phone-r1", 0.5, {x:150, ease: Linear.easeNone}, '-=0.5')
		.to("#phone-r2", 0.5, {x:150, ease: Linear.easeNone}, '-=0.5')
		.to("#phone-r1", 0.5, {x:300, y:50, ease: Linear.easeNone}, '-=0')
		.to("#phone-r2", 0.5, {x:460, y:-83, ease: Linear.easeNone}, '-=0.5')
		.fromTo("#slide2 .pane-content",  0.5, {x:  "15%", autoAlpha:0}, {x: "0%", autoAlpha:1, ease: Linear.easeNone}, '-=0.5')
		.set("#slide3 .pane-content",  {y:  "30%", autoAlpha: 0});

	var slide2pane = new ScrollMagic.Scene({triggerElement: "#slide2", duration: 500})
					.setTween(slide2paneEnter)
					.offset(-100)
					.addTo(controller);

	var parts2Exit = new TimelineMax()
					.to("#phone-r1", 1, {y:'-=600', ease: Linear.easeNone})
					.to("#phone-r2", 1, {y:'-=600', ease: Linear.easeNone}, '-=1')
					.to("#slide2 .pane-content",  1, {y: -600, ease: Linear.easeNone}, '-=1')

	var slide2exit = new ScrollMagic.Scene({triggerElement: "#slide3", duration:600})
					.setTween(parts2Exit)
					.addTo(controller)
					.triggerHook("onEnter")



	// Prehodi na slide 3
	var slide3 = new ScrollMagic.Scene({triggerElement: "#slide3"})
					.setPin("#slide3")
					.addTo(controller)

	var slide3paneEnter = new TimelineMax()
		.to("#phone-r3", 0.5, {x:150, ease: Linear.easeNone})
		.to("#phone-r4", 0.5, {x:150, ease: Linear.easeNone}, '-=0.5')
		.to("#phone-r3", 0.6, {x:300, y:-210, ease: Linear.easeNone}, '-=0')
		.to("#phone-r4", 0.6, {x:460, y:-278, ease: Linear.easeNone}, '-=0.6')
		.fromTo("#slide3 .pane-content",  0.5, {y:  "30%", autoAlpha:0}, {y: "0%",autoAlpha:1, ease: Linear.easeNone}, '-=0.4');

	var slide3pane = new ScrollMagic.Scene({triggerElement: "#slide3", duration: 500})
					.setTween(slide3paneEnter)
					.offset(-300)
					.addTo(controller);

	// Prehodi na slide 4 (menjava strani)
	var changeSide = new TimelineMax()
		.to("#phone",  1.2, {x: "200px", ease: Sine.easeInOut})
		.fromTo("#slide3 .right-pane",  1, {x:  "0%"}, {x: "100%", ease: Linear.easeNone}, '-=1')
		.fromTo("#slide3 .pane-content",  1, {x:  "0%"}, {x: "100%", ease: Linear.easeNone}, '-=1')
		.to("#phone-r3", 0.5, {x:'+=200', autoAlpha:0, ease: Linear.easeNone}, '-=1')
		.to("#phone-r4", 0.5, {x:'+=200', autoAlpha:0, ease: Linear.easeNone}, '-=1')
		.fromTo("#slide4 .left-pane",  1, {x:  "-75%"}, {x: "0%", ease: Linear.easeNone}, '-=1')
		.to("#phone-l1", 0.3, {x:-80, ease: Linear.easeNone}, '-=0.5')
		.to("#phone-l3", 0.3, {x:-80, ease: Linear.easeNone}, '-=0.5')
		.to("#phone-l1", 0.6, {x:-270, rotation:90, ease: Linear.easeNone}, '-=0.2')
		.to("#phone-l3", 0.6, {x:-410, y:-240, ease: Linear.easeNone}, '-=0.6')
		.fromTo("#slide4 .pane-content",  0.4, {x:  "-30%", autoAlpha:0}, {x: "0%", autoAlpha:1, ease: Linear.easeNone}, '-=0.4');

	var changeSideScene = new ScrollMagic.Scene({triggerElement: "#slide3", duration: 1000})
					.setTween(changeSide)
					.offset(500)
					.addTo(controller);

	var changeSideScene = new ScrollMagic.Scene({triggerElement: "#slide4"})
					.setPin("#slide4")
					.addTo(controller);

	var parts4Exit = new TimelineMax()
					.to("#phone-l1", 1, {y:'-=600', ease: Linear.easeNone})
					.to("#phone-l3", 1, {y:'-=600', ease: Linear.easeNone}, '-=1')
					.to("#slide4 .pane-content",  1, {y: -600, ease: Linear.easeNone}, '-=1')

	var slide4exit = new ScrollMagic.Scene({triggerElement: "#slide5", duration:600})
					.setTween(parts4Exit)
					.addTo(controller)
					.triggerHook("onEnter")


	// Prehodi na slide 5
	var slide5paneEnter = new TimelineMax()
		.to("#phone-l2", 0.3, {x:-80, ease: Linear.easeNone})
		.to("#phone-l4", 0.3, {x:-80, ease: Linear.easeNone}, '-=0.3')
		.to("#phone-l2", 0.5, {x:-270, rotation:90, y:-120, ease: Linear.easeNone})
		.to("#phone-l4", 0.5, {x:-410, y:-294, ease: Linear.easeNone}, '-=0.5')
		.fromTo("#slide5 .pane-content",  0.3, {y:300, autoAlpha:0}, {y:0, autoAlpha:1, ease: Linear.easeNone}, '-=0.3')

	var slide5pane = new ScrollMagic.Scene({triggerElement: "#slide5", duration: 600})
					.setTween(slide5paneEnter)
					.offset(-500)
					.addTo(controller);

	var slide5pane = new ScrollMagic.Scene({triggerElement: "#slide5"})
					.setPin("#slide5")
					.addTo(controller);

	var parts5Exit = new TimelineMax()
					.to("#phone-l2", 1, {y:'-=600', ease: Linear.easeNone})
					.to("#phone-l4", 1, {y:'-=600', ease: Linear.easeNone}, '-=1')
					.to("#slide5 .pane-content",  1, {y: -600, ease: Linear.easeNone}, '-=1')

	var slide5exit = new ScrollMagic.Scene({triggerElement: "#slide6", duration:600})
					.setTween(parts5Exit)
					.addTo(controller)
					.triggerHook("onEnter")


	// Prehodi na zadnji slide
	var arrowUpSlide = new TimelineMax()
		.fromTo("#scroll-up",  1, {autoAlpha: 0}, {y: "0px", autoAlpha: 1, ease: Linear.easeNone})
		.fromTo("#footer p",  1, {autoAlpha: 0}, {autoAlpha: 1, ease: Linear.easeNone}, '-=1')

	var arrowUpSlideScene = new ScrollMagic.Scene({triggerElement: "#slide6", duration: 100})
					.setTween(arrowUpSlide)
					.offset(-100)
					.addTo(controller)

	var slide6pane = new ScrollMagic.Scene({triggerElement: "#slide6"})
					.setPin("#slide6")
					.addTo(controller);


});