var container, scene, camera, renderer, group;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;


var crystal_width;
var crystal_height;
var crystal_animation_speedfactor = 1.0;

var hexShape;


var crystal_params = [];

var hexShape;

var group;

function crystal_init(definitions) {
    container = document.createElement('div');
    $('#tamagochi').append(container);

    scene = new THREE.Scene();

    hexShape = new THREE.Shape();
    hexShape.moveTo(0, 0.8);
    hexShape.lineTo(0.4, 0.5);
    hexShape.lineTo(0.3, 0);
    hexShape.lineTo(-0.3, 0);
    hexShape.lineTo(-0.4, 0.5);
    hexShape.lineTo(0, 0.8);

    crystal_width = $('#tamagochi').width();
    crystal_height = $('#tamagochi').height();

    camera = new THREE.PerspectiveCamera(60, crystal_width / crystal_height, 1, 1000);
    camera.position.z = 600;
    scene.add(camera);

    COBI.rideService.speed.subscribe(function(value) {
        var speed = value * 3.6
        crystal_animation_speedfactor = speed >= 20 ? 0 : (1+Math.sin(Math.PI/2+Math.PI*speed/(20)))/2;
    })

    var light = new THREE.PointLight( 0xffffff, 3, 700 );

    camera.add(light);

    group = new THREE.Group();
    group.position.y = 0;
    scene.add(group);

    init_crystal_params(definitions);

    window.addEventListener('resize', onWindowResize, false);

    update_crystal(group, definitions);
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setClearColor(0x25252d);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setSize(crystal_width, crystal_height);
    container.appendChild(renderer.domElement);
}

function update_single_crystal_param(definition) {
    var s = scaleit(definition);
    var new_number = Math.floor(s);

    for (var j = definition.crystal_params.length; j < new_number; j++) {
        param = {
            color: definition.color,
            rx: Math.random() * 2 * Math.PI,
            ry: Math.random() * 2 * Math.PI,
            rz: Math.random() * 2 * Math.PI,
            lengthFactor: Math.random(),
            s: s
        }
        definition.crystal_params.push(param)
    }
}

function init_crystal_params(definitions) {
    for (var i = 0; i < definitions.length; i++) {
        definitions[i].crystal_params = [];
        update_single_crystal_param(definitions[i]);
    }
}

function update_crystal(group, definitions) {
    scene.remove(group);

    var childs = group.children;
    for (var k = 0; childs.length; k++) {
        group.remove( childs[k]);
    }

    for (var i = 0; i < definitions.length; i++) {
        console.log("HIER:", definitions[i].name, definitions[i].value);
        update_single_crystal_param(definitions[i]);
        for (var j = 0; j < definitions[i].crystal_params.length; j++) {
            var spike = create_spike( definitions[i].crystal_params[j]);
            group.add(spike);
        }
    }

    scene.add(group);
}


// Create a single spike with parans
function create_spike(param) {

    var extrudeSettings = {
        depth: (0.75+0.5*param.lengthFactor)*param.s,  // Length
        bevelEnabled: true, // Top
        bevelSegments: 1,
        steps: 1,
        bevelSize: (0.9+0.2*param.lengthFactor)*20, // diameter
        bevelThickness: (0.9+0.2*param.lengthFactor)*35 //length of top
    };

    var geometry = new THREE.ExtrudeGeometry(hexShape, extrudeSettings);

    var meshMaterial = new THREE.MeshStandardMaterial({color: param.color});
    var mesh = new THREE.Mesh(geometry, meshMaterial);

    mesh.position.set(0, 0, 0);
    mesh.rotation.set(param.rx, param.ry, param.rz);
   // mesh.scale(1, 1, 1);
    return mesh;
}

function scaleit(definition) {
    return Math.log10(definition.value + 1) * definition.xscale + definition.yoff
}

function onWindowResize() {
    crystal_width = $('#tamagochi').width();
    crystal_height = $('#tamagochi').height();

    console.log("size: " + crystal_width+"x"+crystal_height);
    camera.aspect = crystal_width / crystal_height;
    camera.updateProjectionMatrix();

    renderer.setSize(crystal_width, crystal_height);
}

var animation;

window.setInterval(function() {
    cancelAnimationFrame()
    update_crystal(group, definitions);
    crystal_animate();
}, 1000);


function crystal_animate() {

    animation = requestAnimationFrame(crystal_animate);

    group.rotation.y += crystal_animation_speedfactor*0.02;
    group.rotation.z += crystal_animation_speedfactor*0.005;
    renderer.render(scene, camera);
}
