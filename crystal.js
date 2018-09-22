var container, scene, camera, renderer, group;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;


var crystal_width ;
var crystal_height;



function crystal_init() {
    container = document.createElement('div');
    $('#tamagochi').append(container);

    scene = new THREE.Scene();


    crystal_width = container.offsetWidth;
    crystal_height = $('#tamagochi').height();


    camera = new THREE.PerspectiveCamera(50, crystal_width / crystal_height, 1, 1000);
    camera.position.z = 750;
    scene.add(camera);

    var light = new THREE.PointLight(0xffffff, 0.8);
    camera.add(light);

    group = new THREE.Group();
    group.position.y = 50;
    scene.add(group);

    function addShape(shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {
        var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

        var meshMaterial = new THREE.MeshStandardMaterial({ color: color});
        var mesh = new THREE.Mesh(geometry, meshMaterial);

        mesh.position.set(x, y, z);
        mesh.rotation.set(rx, ry, rz);
        mesh.scale.set(s, s, s);
        group.add(mesh);
    }

    var hexShape = new THREE.Shape();
    hexShape.moveTo(0, 0.8);
    hexShape.lineTo(0.4, 0.5);
    hexShape.lineTo(0.3, 0);
    hexShape.lineTo(-0.3, 0);
    hexShape.lineTo(-0.4, 0.5);
    hexShape.lineTo(0, 0.8);

    var numberOfCrystals = 50;
    for (i = 0; i < numberOfCrystals; i++) {
        var extrudeSettings = {
            amount: Math.random() * 200,  // Length
            bevelEnabled: true, // Top
            bevelSegments: 1,
            steps: 1,
            bevelSize: (Math.random() * 10) + 15, // diameter
            bevelThickness: (Math.random() * 10) + 25 //length of top
        };

        colors = [ 0xfa4b69, 0xbaf241, 0xfacf47, 0x00c8e6 ];

        addShape(
            hexShape,
            extrudeSettings,
            colors[ Math.floor(Math.random() * 4)],
            0, // x pos
            0, // y pos
            0, // z pos
            Math.random() * 2 * Math.PI, // x rotation
            Math.random() * 2 * Math.PI, // y rotation
            Math.random() * 2 * Math.PI, // z rotation
            1
        );
    }

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setClearColor(0x25252d);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setSize(crystal_width, crystal_height);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {

    crystal_width = container.offsetWidth;
    crystal_height = $('#tamagochi').height();

    camera.aspect = crystal_width/ crystal_height;
    camera.updateProjectionMatrix();

    renderer.setSize(crystal_width, crystal_height);
}

function crystal_animate() {
    targetRotation = 0.03;
    requestAnimationFrame(crystal_animate);

    group.rotation.y += targetRotation ;
    group.rotation.z += 0.005;
    renderer.render(scene, camera);
}
