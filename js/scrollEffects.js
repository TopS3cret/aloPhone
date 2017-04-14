
$(function () { // wait for document ready
	var controller = new ScrollMagic.Controller({
			globalSceneOptions: {
				triggerHook: 'onLeave'
			}
		});

	// Animacije
	var floatTween = TweenMax.fromTo("#phone-image", 2, {y:-50},{y:-60, repeat:-1, yoyo:true, ease: Sine.easeInOut});
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
		.to("#phone-image",  1, {y: "0px", ease: Linear.easeNone})

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

	var slide2 = new ScrollMagic.Scene({triggerElement: "#slide2"})
					.setPin("#slide2")
					.addTo(controller)
					.on("start", function (e) {
						if(e.scrollDirection == 'REVERSE'){
							$("#phone-image").attr("src", "images/front.png");
						} else {
							$("#phone-image").attr("src", "images/back.png");
						}
						
					})

	var slide2paneEnter = new TimelineMax()
		.fromTo("#slide2 .right-pane",  1, {x:  "100%"}, {x: "0%", ease: Linear.easeNone})
		.fromTo("#slide2 .pane-content",  1, {x:  "100%"}, {x: "0%", ease: Linear.easeNone}, '-=1');

	var slide2pane = new ScrollMagic.Scene({triggerElement: "#slide2", duration: 400})
					.setTween(slide2paneEnter)
					.offset(-200)
					.addTo(controller);


	// Prehodi na slide 3
	var slide3 = new ScrollMagic.Scene({triggerElement: "#slide3"})
					.setPin("#slide3")
					.addTo(controller)

	var slide3paneEnter = new TimelineMax()
		.fromTo("#slide3 .right-pane",  1, {x:  "100%"}, {x: "0%", ease: Linear.easeNone})
		.fromTo("#slide3 .pane-content",  1, {x:  "100%"}, {x: "0%", ease: Linear.easeNone}, '-=1');

	var slide3pane = new ScrollMagic.Scene({triggerElement: "#slide3", duration: 400})
					.setTween(slide3paneEnter)
					.offset(-300)
					.addTo(controller);

	// Prehodi na slide 4 (menjava strani)
	var changeSide = new TimelineMax()
		.to("#phone-image",  1.2, {x: "200px", ease: Sine.easeInOut})
		.fromTo("#slide3 .right-pane",  1, {x:  "0%"}, {x: "100%", ease: Linear.easeNone}, '-=1')
		.fromTo("#slide3 .pane-content",  1, {x:  "0%"}, {x: "100%", ease: Linear.easeNone}, '-=1')
		.fromTo("#slide4 .left-pane",  1, {x:  "-50%"}, {x: "0%", ease: Linear.easeNone}, '-=1')
		.fromTo("#slide4 .pane-content",  1, {x:  "-30%", autoAlpha:0}, {x: "0%", autoAlpha:1, ease: Linear.easeNone}, '-=0.5');

	var changeSideScene = new ScrollMagic.Scene({triggerElement: "#slide3", duration: 800})
					.setTween(changeSide)
					.offset(300)
					.addTo(controller);

	var changeSideScene = new ScrollMagic.Scene({triggerElement: "#slide4"})
					.setPin("#slide4")
					.addTo(controller);


	// Prehodi na slide 5
	var slide5paneEnter = new TimelineMax()
		.fromTo("#slide5 .right-pane",  1, {autoAlpha:0}, {autoAlpha:1, ease: Linear.easeNone})
		.fromTo("#slide5 .pane-content",  1, {y:-100}, {y:0, ease: Linear.easeNone});

	var slide5pane = new ScrollMagic.Scene({triggerElement: "#slide5", duration: 400})
					.setTween(slide5paneEnter)
					.offset(-600)
					.addTo(controller);

	var slide5pane = new ScrollMagic.Scene({triggerElement: "#slide5"})
					.setPin("#slide5")
					.addTo(controller);


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