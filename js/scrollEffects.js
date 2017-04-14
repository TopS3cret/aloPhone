
$(function () { // wait for document ready
	var controller = new ScrollMagic.Controller({
			globalSceneOptions: {
				triggerHook: 'onLeave'
			}
		});

	var slide2 = new ScrollMagic.Scene({triggerElement: "#slide2"})
					.setPin("#slide2")
					//.addIndicators() // add indicators (requires plugin)
					.addTo(controller)
					.on("start", function (e) {
						$("#phone-image").attr("src", "images/back.png");
					})

	var slide2paneEnter = new TimelineMax()
		.fromTo("#slide2 .right-pane",  1, {x:  "100%"}, {x: "0%", ease: Linear.easeNone})
		.fromTo("#slide2 .pane-content",  1, {x:  "100%"}, {x: "0%", ease: Linear.easeNone}, '-=1');

	var slide2pane = new ScrollMagic.Scene({triggerElement: "#slide2", duration: 400})
					.setTween(slide2paneEnter)
					.offset(-200)
					//.addIndicators() // add indicators (requires plugin)
					.addTo(controller);

	var slide3 = new ScrollMagic.Scene({triggerElement: "#slide3"})
					.setPin("#slide3")
					//.addIndicators() // add indicators (requires plugin)
					.addTo(controller)

	var slide3paneEnter = new TimelineMax()
		.fromTo("#slide3 .right-pane",  1, {x:  "100%"}, {x: "0%", ease: Linear.easeNone})
		.fromTo("#slide3 .pane-content",  1, {x:  "100%"}, {x: "0%", ease: Linear.easeNone}, '-=1');

	var slide3pane = new ScrollMagic.Scene({triggerElement: "#slide3", duration: 400})
					.setTween(slide3paneEnter)
					.offset(-300)
					//.addIndicators() // add indicators (requires plugin)
					.addTo(controller);
});