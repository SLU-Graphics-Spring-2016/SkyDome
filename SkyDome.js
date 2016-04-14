var txtLoader;
var renderer, scene;

init();
render();

function init(){
    
    // Uniforms for the custom shaders for the sky
    var uniforms = THREE.UniformsUtils.merge( [
      THREE.UniformsLib[ "ambient" ],
      THREE.UniformsLib[ "lights" ]
      ] );
    
    // Simple Texture Loader
    txtLoader = new THREE.TextureLoader();
    
    
    // Additional textures for sky color
    uniforms['glow'] = { type: "t", value: 
	txtLoader.load( "glow.png",
			function( texture ){
			    var material = new THREE.MeshBasicMaterial( {
				map: texture
				} );
			    
			}
    )  };
    uniforms['color'] = { type: "t", value: 
	txtLoader.load( "sky.png",
			function( texture ){
			    var material = new THREE.MeshBasicMaterial( {
				map: texture
				} );
			    
			}
    )  };
    
    //Defining the sky material;
    var mySky = new THREE.ShaderMaterial ({
	uniforms : uniforms,
	vertexShader : document.getElementById('vertexShader').innerHTML,
	fragmentShader : document.getElementById('fragmentShader').innerHTML,
	side : THREE.BackSide
	});
    
    
    //Scene
    scene = new THREE.Scene();
    
    
    //Adding the Dome to the scene:
    var domeGeometry = new THREE.SphereGeometry(100, 128, 128);
    var dome = new THREE.Mesh(domeGeometry, mySky);
    scene.add(dome);
    
    //Scene floor
    
    var planeGeometry = new THREE.PlaneGeometry(100, 100, 128, 128);
    var planeMaterial = new  THREE.MeshPhongMaterial({color : 0xFF0000,shininess: 300, side : THREE.DoubleSide});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotateX(-Math.PI/2);
    scene.add(plane);
    
    
    var Sun = new THREE.PointLight( 0xFFFFFF, 1, 100 );
    Sun.position.set( 0, 50, 0 );
    scene.add( Sun );
    
    //Camera
    camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 0.1;
    
    //Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xC0A0A0);
    document.body.appendChild(renderer.domElement);
    
    //OrbitControls
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
}

function render(){
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
