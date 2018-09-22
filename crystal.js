var container, scene, camera, renderer, group;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


function crystal_init() {
    container = document.createElement('div');
    $('#target').append(container);

    /*+
        '' +
        '.appendChild(container);
*/
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
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
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    window.addEventListener('resize', onWindowResize, false);
}

function onDocumentMouseDown(event) {
    event.preventDefault();
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('mouseout', onDocumentMouseOut, false);
    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;
}

function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;
}

function onDocumentMouseUp(event) {
    document.removeEventListener('mousemove', onDocumentMouseMove, false);
    document.removeEventListener('mouseup', onDocumentMouseUp, false);
    document.removeEventListener('mouseout', onDocumentMouseOut, false);
}

function onDocumentMouseOut(event) {
    document.removeEventListener('mousemove', onDocumentMouseMove, false);
    document.removeEventListener('mouseup', onDocumentMouseUp, false);
    document.removeEventListener('mouseout', onDocumentMouseOut, false);
}

function onDocumentTouchStart(event) {
    if (event.touches.length == 1) {
        event.preventDefault();
        mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;
    }
}

function onDocumentTouchMove(event) {
    if (event.touches.length == 1) {
        event.preventDefault();
        mouseX = event.touches[0].pageX - windowHalfX;
        targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;
    }
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function crystal_animate() {
    requestAnimationFrame(crystal_animate);
    render();
}

function render() {
    group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
    renderer.render(scene, camera);
}