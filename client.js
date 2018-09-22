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

biergarten = makeBiergarten('$h4cKth34lpS');
biergarten.init(46.776221, 11.948397, 10000);

// Define id, name, events, formatting functions, units and default value for each item
var definitions = [
    {
        id: 'data-field1',
        name: 'POI Count',
        subscribe: biergarten.subscribe,
        unsubscribe: biergarten.unsubscribe,
        formatter: formatInt,
        unit: 'POIs',
        defaultValue: '-',
        color: 0xe8596c,
        value: 0,
        xscale: 1000,
        yoff: 10,
    },
    {
        id: 'data-field5',
        name: 'Avg Speed',
        subscribe: COBI.tourService.averageSpeed.subscribe,
        unsubscribe: COBI.tourService.averageSpeed.unsubscribe,
        formatter: formatSpeedDot1,
        unit: 'Ø km/h',
        defaultValue: '-',
        color: 0x33ff33,
        value: 0.,
        xscale: 1000,
        yoff: 10,
    },
    {
        id: 'data-field6',
        name: 'User Power',
        subscribe: COBI.rideService.userPower.subscribe,
        unsubscribe: COBI.rideService.userPower.unsubscribe,
        formatter: formatInt,
        unit: 'watts',
        defaultValue: '-',
        color: 0xd1ef7f,
        xscale: 10,
        yoff: 10,
        value: 0,
    },
    {
        id: 'data-field7',
        name: 'Cadence',
        subscribe: COBI.rideService.cadence.subscribe,
        unsubscribe: COBI.rideService.cadence.unsubscribe,
        formatter: formatInt,
        unit: 'rpm',
        defaultValue: '-',
        color: 0xffff33,
        xscale: 1000,
        yoff: 10,
        value: 0,
    },
    {
        id: 'data-field2',
        name: 'Distance',
        subscribe: COBI.tourService.ridingDistance.subscribe,
        unsubscribe: COBI.tourService.ridingDistance.unsubscribe,
        formatter: formatDistanceDot1,
        unit: 'km',
        defaultValue: '-',
        color: 0xd1ef7f,
        xscale: 10,
        yoff: 10,
        value: 0
    },
    {
        id: 'calories',
        name: 'Calories',
        subscribe: COBI.tourService.calories.subscribe,
        unsubscribe: COBI.tourService.calories.unsubscribe,
        formatter: formatInt,
        unit: 'kcal',
        defaultValue: '-',
        color: 0xff3333,
        xscale: 10,
        yoff: 10,
        value: 0
    },
    {
        id: 'data-field4',
        name: 'Ascent',
        subscribe: COBI.tourService.ascent.subscribe,
        unsubscribe: COBI.tourService.ascent.unsubscribe,
        formatter: formatInt,
        unit: 'm',
        defaultValue: '-',
        color: 0x58c6e2,
        xscale: 10,
        yoff: 10,
        value: 0
    },
    {
        id: 'heart_rate',
        name: 'Heart Rate',
        subscribe: COBI.rideService.heartRate.subscribe,
        unsubscribe: COBI.rideService.heartRate.unsubscribe,
        formatter: formatInt,
        unit: 'bpm',
        defaultValue: '-',
        color: 0xffffff,
        xscale: 10,
        yoff: 10,
        value: 0
    },
    {
        id: 'data-field3',
        name: 'Duration',
        subscribe: COBI.tourService.ridingDuration.subscribe,
        unsubscribe: COBI.tourService.ridingDuration.unsubscribe,
        formatter: formatMins,
        unit: 'min',
        defaultValue: '-',
        color: 0xf4cf61,
        xscale: 10,
        yoff: 10,
        value: 0
    },
];
