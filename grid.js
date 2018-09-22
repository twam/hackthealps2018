// Define constants

var touchInteractionEnabled = false;
var isPortrait = window.matchMedia('(orientation: portrait)').matches;

var biergarten;
var tamagochi;

// Define getter and setters for saving and retrieving local storage variables or default variables

if (inEditMode && isPortrait) {
  // Override zoom when editing grid in portrait mode
  // we may need it later
}

if (!inEditMode) {
  // we may need it later
}

// Hook onto event that triggers on value change
function subscribeGritItem(definition) {
  var formatter = definition.formatter;
  var type = definition.type;

  if (type === 'value') {
    definition.unsubscribe();
    definition.subscribe(function(value) {
      updateGridItem(definition, formatter(value));
    });
  } else if (type === 'tamagochi') {
      definition.unsubscribe();
      definition.subscribe(function(value) {
        updateTamagochi(definition, value.time );
      });
      setInterval( function() {
          tamagochi.update( "time", Date.now())
      }, 3000);
  }
}

function updateTamagochi( definition, value) {
   $('#' + definition.id + '_value').html(`${value}`);
   definition.value = value;
}

function linkDefinition( definition) {
    $('#' + definition.id + " .label").html(definition.name);
    $('#' + definition.id + " .unit").html(definition.unit);
    $('#' + definition.id + " .value").html(definition.defaultValue);
    subscribeGritItem(definition);

}

function hookDefinitions() {
    linkDefinition(definitions[0]);
    linkDefinition(definitions[4]);
    linkDefinition(definitions[8]);
    linkDefinition(definitions[6]);
    linkDefinition(definitions[1]);
    linkDefinition(definitions[2]);
    linkDefinition(definitions[3]);

    var container = $('#tamagochi')
}

// Update dom element with values for item
function updateGridItem(definition, value) {
  $('#' + definition.id + ' .value').html(`${value}`);
}

function initStats() {
  COBI.rideService.speed.subscribe(function(value, timestamp) {
    maxSpeed = localStorage.getItem("maxSpeed");
    if (value > maxSpeed) {
      maxSpeed = value;
      localStorage.setItem("maxSpeed", maxSpeed);
      // console.log("maxspeed:" + value);
    }
  });

  COBI.mobile.location.subscribe(function(value, timestamp) {
      if (localStorage.getItem("lastBiergartenSet") === null) {

         // biergarten.init(value.coordinate.latitude, value.coordinate.longitude, 10000);
          biergarten.init(46.776221,11.948397,10000);

          localStorage.setItem("lastBiergartenSet", true);
      }
      biergarten.add_position(value.coordinate.latitude, value.coordinate.longitude)
  });
}

$(window).on('load', function(e) {
  hookDefinitions();

  initStats();

  biergarten = makeBiergarten('$h4cKth34lpS');
  biergarten.init();
  tamagochi = make_tamagochi();

  crystal_init(definitions);
  crystal_animate();
});
