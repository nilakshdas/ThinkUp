var EmotionalQuotientRoseChart = function(placeholder_id, chart_size, emotionalquotient, avatar_url) {
	var vis = d3.select('#'+placeholder_id)
	.append("svg")
	.attr("width", (chart_size+50))
	.attr("height", (chart_size+50))
	.style("display", "block")
	.style("margin", "0 auto")
	.append("g")
	.attr("transform","translate("+0.5*(chart_size+50)+","+0.5*(chart_size+50)+")");

	var vis_color = {
		"happiness": "#ffff00",
		"sadness": "#000080",
		"fear": "#404040",
		"anger": "#c00000",
		"disgust": "#808000",
		"surprise": "#ff8000" 
	};

	for (var i = 0; i < 6; i++) {
		var axis1 = d3.svg.arc()
		.innerRadius(0)
		.outerRadius(chart_size/2)
		.startAngle((60*i-30)*(Math.PI/180))
		.endAngle((60*(i+1)-30)*(Math.PI/180));

		var axis2 = d3.svg.arc()
		.innerRadius(0)
		.outerRadius(3*chart_size/8)
		.startAngle((60*i-30)*(Math.PI/180))
		.endAngle((60*(i+1)-30)*(Math.PI/180));

		var axis3 = d3.svg.arc()
		.innerRadius(0)
		.outerRadius(chart_size/4)
		.startAngle((60*i-30)*(Math.PI/180))
		.endAngle((60*(i+1)-30)*(Math.PI/180));

		var axis4 = d3.svg.arc()
		.innerRadius(0)
		.outerRadius(chart_size/8)
		.startAngle((60*i-30)*(Math.PI/180))
		.endAngle((60*(i+1)-30)*(Math.PI/180));

		var axis_label = d3.svg.arc()
		.innerRadius(0)
		.outerRadius(10+(chart_size/2))
		.startAngle((60*i-30)*(Math.PI/180))
		.endAngle((60*(i+1)-30)*(Math.PI/180));

		
		vis.append("path").attr("d",axis1).attr("fill", "white").attr("stroke", "grey");
		vis.append("path").attr("d",axis2).attr("fill", "white").attr("stroke", "grey");
		vis.append("path").attr("d",axis3).attr("fill", "white").attr("stroke", "grey");
		vis.append("path").attr("d",axis4).attr("fill", "white").attr("stroke", "grey");
		vis.append("path").attr("id", "axis_label_"+placeholder_id+"_"+i).attr("d",axis_label).attr("opacity", 0);

		var max_emwt = Math.max(
			emotionalquotient.happiness,
			emotionalquotient.sadness,
			emotionalquotient.fear,
			emotionalquotient.anger,
			emotionalquotient.disgust,
			emotionalquotient.surprise,
			Number.MIN_VALUE
		);
		
		var label = vis.append("g")
		.append("text")
		.style("font-size", "12px")
		.append("textPath")
		.attr("xlink:href", "#axis_label_"+placeholder_id+"_"+i)
		.attr("startOffset", 0.13)
		.attr("dy", "+10em");
		
		if (i == 0) {
			label.text("Happiness");
			
			var rose = d3.svg.arc()
			.innerRadius(0)
			.outerRadius((chart_size/2)*emotionalquotient.happiness/max_emwt)
			.startAngle((60*i-15)*(Math.PI/180))
			.endAngle((60*i+15)*(Math.PI/180));

			vis.append("path")
			.attr("d",rose)
			.attr("fill", vis_color.happiness);
		} else if (i == 1) {
			label.text("Sadness");
			
			var rose = d3.svg.arc()
			.innerRadius(0)
			.outerRadius((chart_size/2)*emotionalquotient.sadness/max_emwt)
			.startAngle((60*i-15)*(Math.PI/180))
			.endAngle((60*i+15)*(Math.PI/180));

			vis.append("path")
			.attr("d",rose)
			.attr("fill", vis_color.sadness);
		} else if (i == 2) {
			label.text("Fear");
			
			var rose = d3.svg.arc()
			.innerRadius(0)
			.outerRadius((chart_size/2)*emotionalquotient.fear/max_emwt)
			.startAngle((60*i-15)*(Math.PI/180))
			.endAngle((60*i+15)*(Math.PI/180));

			vis.append("path")
			.attr("d",rose)
			.attr("fill", vis_color.fear);
		} else if (i == 3) {
			label.text("Anger");
			
			var rose = d3.svg.arc()
			.innerRadius(0)
			.outerRadius((chart_size/2)*emotionalquotient.anger/max_emwt)
			.startAngle((60*i-15)*(Math.PI/180))
			.endAngle((60*i+15)*(Math.PI/180));

			vis.append("path")
			.attr("d",rose)
			.attr("fill", vis_color.anger);
		} else if (i == 4) {
			label.text("Disgust");
			
			var rose = d3.svg.arc()
			.innerRadius(0)
			.outerRadius((chart_size/2)*emotionalquotient.disgust/max_emwt)
			.startAngle((60*i-15)*(Math.PI/180))
			.endAngle((60*i+15)*(Math.PI/180));

			vis.append("path")
			.attr("d",rose)
			.attr("fill", vis_color.disgust);
		} else if (i == 5) {
			label.text("Surprise");
			
			var rose = d3.svg.arc()
			.innerRadius(0)
			.outerRadius((chart_size/2)*emotionalquotient.surprise/max_emwt)
			.startAngle((60*i-15)*(Math.PI/180))
			.endAngle((60*i+15)*(Math.PI/180));

			vis.append("path")
			.attr("d",rose)
			.attr("fill", vis_color.surprise);
		}
	}

	vis.append("clipPath")
	.attr("id", "avatar_clip_"+placeholder_id)
	.append("circle")
	.attr("transform","translate("+(chart_size/16)+","+(chart_size/16)+")")
	.attr("r", (chart_size/16));

	vis.append("image")
	.attr("xlink:href", avatar_url)
	.attr("width", (chart_size/8))
	.attr("height", (chart_size/8))
	.attr("transform","translate(-"+(chart_size/16)+",-"+(chart_size/16)+")")
	.attr("clip-path", "url(#avatar_clip_"+placeholder_id+")");
};