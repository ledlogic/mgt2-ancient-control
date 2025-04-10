var b = {
	blinkIndex: -0.5,
	delayMs: 250,
	
	lights: [
		{
			sel: '10000',
			active: false
		},
		{
			sel: '01000',
			active: false
		},
		{
			sel: '00100',
			active: false
		},
		{
			sel: '00010',
			active: false
		},
		{
			sel: '00001',
			active: false
		}
	],
	
	pushBtn: {
		sel: "t-push",
		active: false
	},
	
	init: function() {
		b.findEl();
		b.blink();
	},
	
	capsule: function(test) {
		var i = 1;
		for (var a1 = 1; a1 <= 6; a1++) {
			for (var a2 = 1; a2 <= 6; a2++) {
				var bin = b.decimalToBinary(i);
				if (test == bin) {
					var capsule = a1 + "" + a2;
					return capsule;
				}
				i++;
			}
		}
		return "RANDOM";
	},
	
	findEl: function() {
		var cls = "." + b.pushBtn.sel;
		b.pushBtn.el = $(cls);
		b.pushBtn.el.on("click", b.pushClick);
		
		_.each(b.lights, function (light) {
			cls = "[data-sel=b-" + light.sel + "]";
			light.el = $(cls);
			light.el.addClass("t-b-" + light.sel);
			light.el.on("click", b.lightClick);
		});
	},
	
	lightClick: function() {
		var sel = $(this).data("sel");
		
		_.each(b.lights, function (light) {
			if ("b-" + light.sel == sel) {
				light.active = !light.active;
			}
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
		
		if (!b.pushBtn.active) {
			setTimeout(b.blink, b.delayMs);
		}
		if (b.pushBtn.active) {
			var n = 0;
			_.each(b.lights, function (light) {
				if (light.active) {
					var sel = light.sel;
					n += b.binaryToDecimal(sel);
				}
			});
			var bin = b.decimalToBinary(n);
			var c = b.capsule(bin)
			var s = "Please report:\nCAPSULE: "+ c;
			alert(s);
		}
	},
	
	blink: function() {
		if (b.pushBtn.active) {
			return;
		}

		_.each(b.lights, function (light, index) {
			var $img = $(light.el).find("img");
			var src = "";
			var green = light.active;
			var bright = b.blinkIndex == index;
			if (green && bright) {
				src = "img/button-bright-green.png";
			} else if (green) {
				src = "img/button-green.png";
			} else if (bright) {
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
		setTimeout(b.blink, b.delayMs);
	},
	
	binaryToDecimal: function(s) {
		return parseInt(s, 2);
	},
	
	decimalToBinary: function(decimal) {
		if (decimal < 0) {
			return "-" + (decimal >>> 0).toString(2);
		}
		return (decimal >>> 0).toString(2);
	}
}

$(b.init);