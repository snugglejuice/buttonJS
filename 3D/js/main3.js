
function main() {

  const canvas = document.getElementById('c');
  const renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  renderer.shadowMap.enabled = true;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('black');

  const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set( 0, 20, 100 );

  // Add DirectionalLight
  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.castShadow = true;
    light.position.set(10, 30, 10);
    light.target.position.set(0, 20, 0);
    scene.add(light);
    scene.add(light.target);


  }

  //Add Ambient light

  var aLight = new THREE.AmbientLight( 0x666666 ); // soft white light
  scene.add( aLight );

  // Collada 3D Obj loader
  var logoRing = null;
  const loader = new THREE.ColladaLoader();
  // load a resource
  loader.load(
    // resource URL
    './asset/LW2.dae',
    // called when resource is loaded
    function ( object ) {
      if (object.scene == undefined) return;
      var daeScene = object.scene;
      var objectScene = [];
      daeScene.children.map( i => objectScene.push(i));
      var j = 0;
      objectScene.map( i => scene.add(i) );
      objectScene.map( i => {
        i.materials = new THREE.MeshPhongMaterial({color: '#87d3f8'});
        i.name = 'object'+j;
        j+= 1;
      })
      scene.scale.set(10,10,10);
      scene.position.set(0,20,0);
      console.log(scene.getObjectByName('object0'));
      scene.overrideMaterial = new THREE.MeshPhongMaterial({color: '#87d3f8'});
      logoRing = scene.getObjectByName('object5');
    },
    // called when loading is in progresses
    function ( xhr ) {

      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    // called when loading has errors
    function ( error ) {

      console.log( 'An error happened' );

    }
  );



  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  // Logo animation
  function animate() {
    if (logoRing === null) return;
    logoRing.rotation.y += 0.01;
  }

  function render() {

    resizeRendererToDisplaySize(renderer);

    {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
    animate();
  }

  requestAnimationFrame(render);
}

main();
