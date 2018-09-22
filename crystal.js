var container, scene, camera, renderer, group;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


function crystal_init() {
    container = document.createElement('div');
    $('#tamagochi').append(container);

    scene = new THREE.Scene();

    var width = container.offsetWidth;
    var height = window.innerHeight;

    camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
    camera.position.z = 750;
    scene.add(camera);

    var light = new THREE.PointLight(0xffffff, 0.8);
    camera.add(light);

    group = new THREE.Group();
    group.position.y = 50;
    scene.add(group);

    function addShape(shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {
        var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

        var meshMaterial = new THREE.MeshNormalMaterial();
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

    var numberOfCrystals = 100;
    for (i = 0; i < numberOfCrystals; i++) {
        var extrudeSettings = {
            amount: Math.random() * 200,
            bevelEnabled: true,
            bevelSegments: 1,
            steps: 1,
            bevelSize: (Math.random() * 10) + 15,
            bevelThickness: (Math.random() * 10) + 25
        };

        addShape(
            hexShape,
            extrudeSettings,
            0xff3333, // color
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
    renderer.setClearColor(0x2d2d36);
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function crystal_animate() {
    targetRotation = 0.1;
    requestAnimationFrame(crystal_animate);

    group.rotation.y += targetRotation ;
    renderer.render(scene, camera);
}