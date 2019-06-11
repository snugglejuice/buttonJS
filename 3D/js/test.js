var renderer, scene, camera, mesh;

init();
animate();

function init(){
    // on initialise le moteur de rendu
    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    // si WebGL ne fonctionne pas sur votre navigateur vous pouvez utiliser le moteur de rendu Canvas à la place
    // renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('container').appendChild(renderer.domElement);

    // on initialise la scène
    scene = new THREE.Scene();

    // on initialise la camera que l’on place ensuite sur la scène
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(0, 0, 1000);
    scene.add(camera);

    // on créé un  cube au quel on définie un matériau puis on l’ajoute à la scène
    var geometry = new THREE.CubeGeometry( 200, 200, 200 );
    var material = new THREE.MeshPhongMaterial({color: '#8AC'});
    mesh = new THREE.Mesh( geometry, material );
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add( mesh );

    // on ajoute une lumière blanche
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.castShadow = true;
    light.position.set(0, 500, 100);
    light.target.position.set(-4, 0, -4);
    scene.add(light);
    scene.add(light.target);

    const helper = new THREE.DirectionalLightHelper(light);
    scene.add(helper);


    //Create a helper for the shadow camera (optional)
    var helperCamera = new THREE.CameraHelper( light.shadow.camera );
    scene.add( helperCamera );
}

function animate(){
  // on appel la fonction animate() récursivement à chaque frame
  requestAnimationFrame( animate );
  // on fait tourner le cube sur ses axes x et y
  mesh.rotation.z += 0.01;

  // on effectue le rendu de la scène
  renderer.render( scene, camera );
}
