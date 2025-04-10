var b = {
	blinkIndex: -0.5,
	
	lights: [
		{sel: '10000'},
		{sel: '01000'},
		{sel: '00100'},
		{sel: '00010'},
		{sel: '00001'}
	],
	
	pushBtn: {
		sel: "t-push",
		active: false
	},
	
	init: function() {
		b.findEl();
		b.blink();
	},
	
	findEl: function() {
		var cls = "." + b.pushBtn.sel;
		b.pushBtn.el = $(cls);
		b.pushBtn.el.on("click", b.pushClick);
		
		_.each(b.lights, function (light) {
			cls = ".t-b-" + light.sel;
			light.el = $(cls);
		});
	},
	
	pushClick: function() {
		b.pushBtn.active = !b.pushBtn.active;
		var src = "";
		if (b.pushBtn.active) {
			src = "img/button-bright.png";
		} else {
			src = "img/button.png";
		}
		var $img = $(b.pushBtn.el).find("img");
		$img.attr("src", src);
	},
	
	blink: function() {
		_.each(b.lights, function (light, index) {
			var $img = $(light.el).find("img");
			var src = "";
			if (b.blinkIndex == index) {
				src = "img/button-bright.png";
			} else {
				src = "img/button.png";
			}
			$img.attr("src", src);
		});
		
		b.blinkIndex += 0.5;
		if (b.blinkIndex > b.lights.length) {
			b.blinkIndex = -0.5;
		}
		setTimeout(b.blink, 1000);
	}
}

$(b.init);