var sunTextureUrl = require("file?name=picture.png!../textures/flare.png");
console.log(sunTextureUrl);
export default class Sun {
  constructor() {
    this.container = new THREE.Object3D();
    this.container.position.set(0, 0, 1000);

    var orbGeo = new THREE.CircleGeometry(10, 32 );
    var orbMat = new THREE.MeshPhongMaterial({color: 0xffffaa})

    var loader = new THREE.TextureLoader();
    loader.load(
    	// resource URL
    	sunTextureUrl,
    	// Function when resource is loaded
    	function ( texture ) {
    		orbMat.map = texture;
        orbMat.map.needsUpdate = true;
    	},
    	// Function called when download progresses
    	function ( xhr ) {
    		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    	},
    	// Function called when download errors
    	function ( xhr ) {
    		console.log( 'An error happened', xhr );
    	}
    );

    this.orb = new THREE.Mesh(orbGeo, orbMat);
    this.orb.rotateX(- Math.PI);
    this.light = new THREE.DirectionalLight(0xffffaa, 1);
    this.light.position.set(0, 0, 1);
    this.container.add(this.light);
    this.container.add(this.orb);

    this.orbFacing = new THREE.Vector3(0, 0, 0);
  }
  get mesh () {
    return this.container;
  }
  update(orbiter) {
    this.orbFacing.z = orbiter.mesh.position.z - this.container.position.z;
    this.orbFacing.y = orbiter.mesh.position.y - this.container.position.y;
    this.orb.lookAt(this.orbFacing);
  }
}
