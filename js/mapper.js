d3.atlas.mapper = function module() {
	// The mapper object contains a series of d3 maps (binding values to keys, keys corresponding to geographic objects)

	var maps = {}, 
		nullMap = d3.map(),
		data, 
		naString = "NA",
		nullValue = NaN,
		variables;

	function exports() {}
    
    exports.data = function(_x) {
    	if (!arguments.length) return data;
    	data = _x;
    	return this;
	};

    exports.naString = function(_x) {
    	if (!arguments.length) return naString;
    	naString = _x;
    	return this;
	};

	exports.nullValue = function(_x) {
    	if (!arguments.length) return nullValue;
    	nullValue = _x;
    	return this;
	};

	exports.variables = function(_x) {
    	if (!arguments.length) return variables;
    	variables = _x;
    	return this;
	};

	exports.maps = function(_x) {
    	if (!arguments.length) return maps;
    	return this;
	};

	exports.get = function(_x) {
    	var n;
    	if(typeof(_x) == "string") {
    		n = _x;
    	} else if(typeof(_x) == "object") {
    		n = _x['variable'] + '_' + _x['date'];
    	}

   	    if(Object.keys(maps).indexOf(n) >= 0) {
    		return maps[n];
    	} else {
    		return nullMap;
    	}
	};

	exports.map = function(_x) {
		var keys = Object.keys(data[0]);

       	// Initialize maps
       	for (var i = 0; i < keys.length; i ++) {
       		maps[keys[i]] = d3.map();
       	}

       	// Create data type casting rules from the variables
       	var cast = {"toFloat": [], "toInt": [], "toStr": []};
       	var bind = {"float": "toFloat", "int": "toInt", "str": "toStr"};

       	for (i = 0; i < variables['atlasvariables'].length; i++) {
       		v = variables['atlasvariables'][i];
       		if(Object.keys(bind).indexOf(v['type']) >= 0) {
       			cast[bind[v['type']]].push(v['name']);
       		}
       	}

       	// Map for each county
      	for (var i = 0; i < data.length; i ++) {
       		var d = data[i];
       		for (var j = 0; j < keys.length; j ++) {
       			var v = d[keys[j]];
                // Transform NA strings into null values
                if(v == naString) {
                   v = nullValue;
                }
                if(cast['toFloat'].indexOf(keys[j]) >= 0) {
                    maps[keys[j]].set(parseInt(d.id), parseFloat(v));
                } else if(cast['toInt'].indexOf(keys[j]) >= 0) {
                	maps[keys[j]].set(parseInt(d.id), parseInt(v));
                } else if(cast['toStr'].indexOf(keys[j]) >= 0) {
                	maps[keys[j]].set(parseInt(d.id), String(v));
                } else {
                    maps[keys[j]].set(parseInt(d.id), v);
                }
      		}
       	}

       	// Create the nullMap, returned when the queried variable is not in the data
       	var keys = Object.keys(maps[Object.keys(maps)[0]])
       	for(var i = 0; i < keys.length; i++) {
       		nullMap.set(keys[i], nullValue);
       	}
       	return this;
	}

	return exports;

}