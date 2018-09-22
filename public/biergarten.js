"use strict";


var makeBiergarten = function (pwd) {
    var API_KEY = '5MJYmI4aFb4akUO-_G5ew8BPHqlfvc2g_GvOq_nlGPaDwmuM0MUKtrNuCHVmQeKGaNzYSJ-tiwP1UupqIBbIdX6u2wIVw7tjxN2T6TJBRjuzo9fCpH2JJ42sMJl-eKeSduWmckdVCMIiOpxfb7isdPaJRFT4Jd1XSZaRRKPPBx-7skFfhH-6mh0in8rTpbb7FY_Lxld6rCUc2i_oQ9iAJkRC7ZNiNMCgtcKQq_bO1Lx4_Ql4ZhF42d9oYvUhdif4tXpCzJ-mA_hVKTvPuHtxhQFVf9HBSotsM1KOUj8fL0ZXSytk543oMUlpXVdPI5TesmVqMqdih9Z79xvbN1BP1GE28DpkyroAy-Sxij6qvOiL0nQfDVf-tEZjMODdHd1OeQmzsd2KBHCZoZV4tbMu2AmKg9dJSb1nFYpP2342T9t7wtATZ8XAj5_ooImt4_TzHmbWatWGogjcmbVc2AULfiFMpjnI_rkgNVMOkQfO8gk0By1PLIaKawNCsyfekqFvaesLvX0rKW7a-sjoVpm6QxfueG1nv55Svpd0YQZVAjk'

    var LOGIN_URI = "http://tourism.opendatahub.bz.it/api/LoginApi?api_key=" + API_KEY;
    var BIERGARTEN_URI = "http://tourism.opendatahub.bz.it/api/GastronomyLocalized?api_key" + API_KEY;
    var USER_ID = "tourism@hackthealps.it";
    var PWD = pwd;
    var BEARER_TOKEN = 0;
    var gastro_list = [];

    function get_token(userid, password, callback) {
        var payload = {
            "username": userid,
            "pswd": password
        };

        $.ajax(
            LOGIN_URI, {
                method: 'POST',
                data: payload,
                success: function (result) {
                    set_bearer_token( result);
                    callback();
                }
            });
    }

    function set_bearer_token(token) {
        BEARER_TOKEN = token.access_token
    }

    function store_biergarten_list( lat, lon, rad)  {
        return function() {
            $.ajax(BIERGARTEN_URI+"&categorycodefilter=65536&latitude="+ lat + "&longitude=" + lon + "&radius=" + rad, {
                headers: { "Authorization": "Bearer " + BEARER_TOKEN},
                success: consume_list,
            });
        }
    }

    function consume_list( result) {
        for (var i = 0; i < result.TotalResults; i++) {
            var gastro = result.Items[i];
            console.log(  gastro.Latitude, gastro.Longitude, gastro.Shortname)
            gastro_list.push( { lat: gastro.Latitude, lon: gastro.Longitude, sn: gastro.Shortname, visited: false});
        }
    }

	function coordinateDistance(cord1, cord2) {
		// https://www.movable-type.co.uk/scripts/latlong.html
		var R = 6371e3; // metres
		var φ1 = cord1.latitude * Math.PI / 180;
		var φ2 = cord2.latitude* Math.PI / 180;
		var Δφ = (cord2.latitude-cord1.latitude) * Math.PI / 180;
		var Δλ = (cord2.longitude-cord1.longitude) * Math.PI / 180;

		var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
			Math.cos(φ1) * Math.cos(φ2) *
			Math.sin(Δλ/2) * Math.sin(Δλ/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

		var d = R * c;

		return d;
}
	var numberOfPois = 0;
    var my_callback;
	
    var thus = {
        init: function (lat, lon, rad) {
            get_token(USER_ID, PWD, store_biergarten_list( lat, lon, rad))
        },
		
		subscribe: function(callback) {
            my_callback = callback;
        },

        unsubscribe: function(callback) {
            my_callback = undefined;
        },
		
        add_position: function( lat, lon) {
            for (var i = 0; i < gastro_list.length; i++) {
                var d = coordinateDistance( { 'latitude': lat, 'longitude' : lon},
                                    { 'latitude': gastro_list[i].lat, 'longitude' : gastro_list[i].lon })
				console.log( "DIST" + d);
				
				if (d < 10 && gastro_list.visited === false)
				{
					numberOfPois += 1;
					gastro_list[i].visited = true;
				}				
            }
        }


    };
    return thus;
}




/*

var biergarten = makeBiergarten( 'xxx'); // replace
biergarten.list(46.738419,11.958168,10000, printBiergarten);

function printBiergarten(result) {
    console.log(result)
    for (var i = 0; i < result.TotalResults; i++) {
        var gastro = result.Items[i];
        console.log(  gastro.Latitude, gastro.Longitude, gastro.Shortname)
    }
} */

