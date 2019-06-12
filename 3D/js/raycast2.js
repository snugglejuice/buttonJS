      var container, stats;
			var camera, scene, raycaster, renderer;
			var mouse = new THREE.Vector2(), INTERSECTED;
			var radius = 100, theta = 0;
      var ToIntersect = [];
      var isAnimate = false;
      var toAnimate = null;

			init();
			animate();


      function rotate(object) {
        if (object === null) return;
        object.rotation.y += 0.03;
      }

      function animated() {
        isAnimate = !isAnimate;
      }

			function init() {

        // Bind to the canvas:

        var container = document.getElementById('raycast');

        // create camera
				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );

        // Create scene
				scene = new THREE.Scene();
				scene.background = new THREE.Color( 'black' );
          // Add light to the scene
				var light = new THREE.DirectionalLight( 0xffffff, 1 );
				light.position.set( 1, 1, 1 ).normalize();
				scene.add( light );

        var aLight = new THREE.AmbientLight( 0x404040 ); // soft white light
        scene.add( aLight );

        const loader = new THREE.ColladaLoader();
        // load a resource
        loader.load(
          // resource URL
          './asset/hex.dae',
          // called when resource is loaded
          function ( obj ) {

            var object = obj.scene;
            // some stuff here
            object.position.set(0, 0,-100);
            object.rotation.set(Math.PI,Math.PI,Math.PI);
            object.scale.set(10,10,10);

            var mesh = object.children.filter(function(child){
              return child instanceof THREE.Mesh;
            })[0];

            object.geometry = mesh.geometry;
            object.children.map( i => i.material = new THREE.MeshPhongMaterial({color: '#87d3f8'}));
            scene.add(object);

            object.traverse(function(child) {
              if (object.matrixWorld && object.geometry) {
                  ToIntersect.push(child);
              }
            });

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



        // Create the raycaster
				raycaster = new THREE.Raycaster();

        // Create the renderer
				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        stats = new Stats();
				container.appendChild( stats.dom );

				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'mousedown', onDocumentMouseClick, false);
				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

			function onDocumentMouseMove( event ) {
				event.preventDefault();
				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
			}

      function onDocumentMouseClick( click ) {
        var intersects = raycaster.intersectObjects( ToIntersect );
				if (intersects.length > 0) {
          animated();
          toAnimate = INTERSECTED;
        }
			}

			function animate() {
				requestAnimationFrame( animate );
				render();
				stats.update();
			}

			function render() {
        var pointer = document.getElementById('html');
				// find intersections
				raycaster.setFromCamera( mouse, camera );
				var intersects = raycaster.intersectObjects( ToIntersect );
				if ( intersects.length > 0 ) {
					if ( INTERSECTED != intersects[ 0 ].object ) {
						if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
						INTERSECTED = intersects[ 0 ].object;
						INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
						INTERSECTED.material.emissive.setHex( 0xff0000 );
            pointer.style.cursor = 'pointer';
					}
				} else {
					if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
					INTERSECTED = null;
          pointer.style.cursor = 'default';
				}

        if (isAnimate) {
          rotate(toAnimate);
          if (toAnimate.rotation.y > Math.PI) {
            animated();
            toAnimate.rotation.y = 0;
          }
        }

				renderer.render( scene, camera );
			}
