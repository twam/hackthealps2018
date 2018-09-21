"use strict"

var make_tamagochi = function () {
    var state = {};
    var my_callback;
    var thus = {
        subscribe: function(callback) {
            my_callback = callback;
        },

        unsubscribe: function(callback) {
            my_callback = undefined;
        },

        update: function( key, value) {
            state[ key] = value;
            my_callback( state);
        },

    };
    return thus;
}

function print_state( state) {
    console.log(state);
}

/*var tamagochi = make_tamagochi();
tamagochi.subscribe( print_state);
tamagochi.update("goo", "bar")
tamagochi.update("goo", "wfhskdfh")
tamagochi.update("foo", "bla")*/
