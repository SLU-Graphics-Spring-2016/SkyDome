var txtLoader, time_of_day=0;
var renderer, scene, Sun;

init();
render();

function init(){
    
    //Scene
    scene = new THREE.Scene();
    
    Sun = new THREE.DirectionalLight( 0xFFFFFF, 1, 100 );
    Sun.position.set( Math.cos(time_of_day), Math.sin(time_of_day), 0 );
    scene.add( Sun );
    
    
    // Uniforms for the custom shaders for the sky
    var uniforms = [      ] ;
    
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
    
    uniforms['Sun_Position'] = { type : 'v3', value :Sun.position
    };
    console.log(Sun.Position);
    console.log(uniforms);
    
    //Defining the sky material;
    var mySky = new THREE.ShaderMaterial ({
	uniforms : uniforms,
	vertexShader : document.getElementById('vertexShader').innerHTML,
	fragmentShader : document.getElementById('fragmentShader').innerHTML,
	side : THREE.BackSide
	});
    
    
    
    //Adding the Dome to the scene:
    var domeGeometry = new THREE.SphereGeometry(100, 128, 128);
    var dome = new THREE.Mesh(domeGeometry, mySky);
    scene.add(dome);
    
    //Scene floor
    
    var planeGeometry = new THREE.PlaneGeometry(1000, 1000, 128, 128);
    var planeMaterial = new  THREE.MeshPhongMaterial({color : 0x20AA00,shininess: 300, side : THREE.DoubleSide});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotateX(-Math.PI/2);
    scene.add(plane);
    
    
    
    
    //Camera
    camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.y = 0.1;
    camera.position.z = 100;
    
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
    Sun.position.set( Math.cos(time_of_day), Math.sin(time_of_day), 0 );
    time_of_day += 0.01;
    renderer.render(scene, camera);
}
