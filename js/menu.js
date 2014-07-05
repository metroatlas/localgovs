d3.atlas.menu = function module() {

	var years = [], 
		variables = [],
		json,
		data,
		spanId = "menu";

	var makeYears = function() {
    	var keys = Object.keys(data[0]);
    	for (var i = keys.length - 1; i >= 0; i--) {
    		var y = keys[i].split("_")[keys[i].split("_").length - 1];
    		if(y.length == 4 && /\d{4}/g.exec(y) != null) {
    			if(years.indexOf(y) < 0) {
    				years.push(y);
    			}
    		}
    	};
    	years.sort();
	};

	var makeVariables = function() {};

	function exports() {}

	exports.json = function(_x) {
    	if (!arguments.length) return json;
    	json = _x;
    	makeYears();
    	makeVariables();
    	return this;
	};

	exports.spanId = function(_x) {
    	if (!arguments.length) return spanId;
    	spanId = _x;
    	return this;
	};

	exports.data = function(_x) {
    	if (!arguments.length) return data;
    	data = _x;
    	return this;
	};

	exports.years = function() {
    	return years;
	};

	exports.variables = function() {
    	return variables;
	};

	exports.menu = function() {
    	// Add dates
    	if(years.length > 1) {
    		$("#" + spanId).append("<select id = 'dateselect'></select>");
    		for (var i = years.length - 1; i >= 0; i--) {
    			$('#dateselect').append("<option value=" + years[i] + ">" + years[i] + "</option>")
    		};
    	}

    	// Add variables
    	$("#" + spanId).append("<select id = 'valueselect'></select>");
    	for (var i = 0; i < json['atlasvariables'].length; i++) {
    		v = json['atlasvariables'][i];
    		$('#valueselect').append("<option value=" + v['name'] + ">" + v['description'] + "</option>")
    	};
    	return this;
	};

	return exports;
}