COBI.init('token');

// Make clock appear in upper right corner
COBI.app.clockVisible.write(false);
// Also listen to standard controller events
COBI.devkit.overrideThumbControllerMapping.write(true);

// Disable Reordering in Experience
var inEditMode = (COBI.parameters.state() == COBI.state.edit);

// React on theme changes
COBI.app.theme.subscribe(function (value) {
  $('.unit').css('color', 'rgb(' + value.baseColor.red + ',' + value.baseColor.green + ',' + value.baseColor.blue + ')');
});

// Allow user to zoom in and out
COBI.hub.externalInterfaceAction.subscribe(function(action) {
  // Listen to inputs and update zoom index variable
  if ((action == 'UP' || action == 'RIGHT')) {
    zoomIn();
  }
  if ((action == 'DOWN' || action == 'LEFT')) {
    zoomOut();
  }
});

// Display detailled item names if touch interaction is allowed
COBI.app.touchInteractionEnabled.subscribe(function(touchInteractionEnabled) {
//  updateInterfaceVisibility(touchInteractionEnabled);
  if (touchInteractionEnabled) {
    $('#maingrid').removeClass('grid2');
    $('#maingrid').addClass('grid1');
  } else {
    $('#maingrid').removeClass('grid1');
    $('#maingrid').addClass('grid2');
  }
});

// Define id, name, events, formatting functions, units and default value for each item
var definitions = [
  {
    id: 'data-field1',
    name: 'Speed',
    subscribe: COBI.rideService.speed.subscribe,
    unsubscribe: COBI.rideService.speed.unsubscribe,
    formatter: formatSpeedDot1,
    unit: 'km/h',
    defaultValue: '-',
    type: 'value',
      color: 0xff3333,
      value: 0,
  },
  {
    id: 'data-field5',
    name: 'Avg Speed',
    subscribe: COBI.tourService.averageSpeed.subscribe,
    unsubscribe: COBI.tourService.averageSpeed.unsubscribe,
    formatter: formatSpeedDot1,
    unit: 'Ø km/h',
    defaultValue: '-',
    type: 'value',
      color:  0x33ff33,
      value : 0.
  },
  {
    id: 'data-field6',
    name: 'User Power',
    subscribe: COBI.rideService.userPower.subscribe,
    unsubscribe: COBI.rideService.userPower.unsubscribe,
    formatter: formatInt,
    unit: 'watts',
    defaultValue: '-',
    type: 'value',
      color: 0x3333ff,
      xscale: 10,
      yoff: 10,
      value : 0,
  },
  {
    id: 'data-field7',
    name: 'Cadence',
    subscribe: COBI.rideService.cadence.subscribe,
    unsubscribe: COBI.rideService.cadence.unsubscribe,
    formatter: formatInt,
    unit: 'rpm',
    defaultValue: '-',
    type: 'value',
     color: 0xffff33,
      xscale: 10,
      yoff: 10,
      value : 0,
  },
  {
    id: 'data-field2',
    name: 'Distance',
    subscribe: COBI.tourService.ridingDistance.subscribe,
    unsubscribe: COBI.tourService.ridingDistance.unsubscribe,
    formatter: formatDistanceDot1,
    unit: 'km',
    defaultValue: '-',
    type: 'value',
      xscale: 10,
      yoff: 10,
  },
  {
    id: 'calories',
    name: 'Calories',
    subscribe: COBI.tourService.calories.subscribe,
    unsubscribe: COBI.tourService.calories.unsubscribe,
    formatter: formatInt,
    unit: 'kcal',
    defaultValue: '-',
    type: 'value',
      xscale: 10,
      yoff: 10,
  },
  {
    id: 'data-field4',
    name: 'Ascent',
    subscribe: COBI.tourService.ascent.subscribe,
    unsubscribe: COBI.tourService.ascent.unsubscribe,
    formatter: formatInt,
    unit: 'm',
    defaultValue: '-',
    type: 'value',
      xscale: 10,
      yoff: 10,

  },
  {
    id: 'heart_rate',
    name: 'Heart Rate',
    subscribe: COBI.rideService.heartRate.subscribe,
    unsubscribe: COBI.rideService.heartRate.unsubscribe,
    formatter: formatInt,
    unit: 'bpm',
    defaultValue: '-',
    type: 'value',
  },
  {
    id: 'data-field3',
    name: 'Duration',
    subscribe: COBI.tourService.ridingDuration.subscribe,
    unsubscribe: COBI.tourService.ridingDuration.unsubscribe,
    formatter: formatMins,
    unit: 'min',
    defaultValue: '-',
    type: 'value',
  },
  {
    id: 'tamagochi',
    name: 'tamagochi',
    subscribe: tamagochi.subscribe,
    unsubscribe: tamagochi.unsubscribe,
    defaultValue: '-',
    unit: 'test unit',
    type: 'tamagochi'
  }
];
