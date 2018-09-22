"use strict"

var make_tamagochi = function () {
    var state = {};
    var my_callback;
	
	function init() {
	  COBI.tourService.ridingDistance.subscribe(function(value) {
	    state['distance'] = value;
		console.log(state['distance']);
	  })
	  COBI.tourService.ridingDuration.subscribe(function(value) {
	    state['duration'] = value;
		console.log(state['duration']);
	  })
	  COBI.tourService.ascent.subscribe(function(value) {
	    state['ascent'] = value;
		console.log(state['ascent']);
	  })
	  biergarten.subscribe(function(value) {
		state['numberOfPois'] = value;
		console.log(state['numberOfPois']);
	  })
	}	
	init();
	
    var thus = {
        subscribe: function(callback) {
            my_callback = callback;
        },

        unsubscribe: function(callback) {
            my_callback = undefined;
        },

        update: function(key, value) {
            state[key] = value;
            my_callback(state);
        },
    };
    return thus;
}

