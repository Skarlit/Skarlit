const PI_2 = Math.PI / 2;

export default class FreeLookCamera {
  constructor(camera, el) {
    this.camera = camera;
    this.el = el;

    this.mousemove = this.mousemove.bind(this);
    this.pointerLock = this.pointerLock.bind(this);

    this.camera.rotation.set( 0, 0, 0 );
    this.camera.zoom = 3;
    this.camera.updateProjectionMatrix();
  	this.pitchObject = new THREE.Object3D();
  	this.pitchObject.add( this.camera );
    this.yawObject = new THREE.Object3D();
  	this.yawObject.position.y = 10;
  	this.yawObject.add( this.pitchObject );
    document.addEventListener('mousemove', this.mousemove, false );
    window.addEventListener('click', this.pointerLock);
  }
  pointerLock() {
    // Ask the browser to lock the pointer
      this.el.requestPointerLock = this.el.requestPointerLock || this.el.mozRequestPointerLock || this.el.webkitRequestPointerLock;
      if ( /Firefox/i.test( navigator.userAgent ) ) {
        var fullscreenchange = function ( event ) {
          if ( document.fullscreenElement === this.el || document.mozFullscreenElement === this.el || document.mozFullScreenElement === this.el ) {
            document.removeEventListener( 'fullscreenchange', fullscreenchange );
            document.removeEventListener( 'mozfullscreenchange', fullscreenchange );
            this.el.requestPointerLock();
          }
        };
        document.addEventListener( 'fullscreenchange', fullscreenchange, false );
        document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );
        this.el.requestFullscreen = this.el.requestFullscreen || this.el.mozRequestFullscreen || this.el.mozRequestFullScreen || this.el.webkitRequestFullscreen;
        this.el.requestFullscreen();
      } else {
        this.el.requestPointerLock();
      }
  }
  mousemove(e) {
		var movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
		var movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

		this.yawObject.rotation.y -= movementX * 0.002;
		this.pitchObject.rotation.x -= movementY * 0.002;

		this.pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, this.pitchObject.rotation.x ) );
  }
  getDirection() {
    var direction = new THREE.Vector3( 0, 0, - 1 );
    var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

    return function( v ) {
      rotation.set( this.pitchObject.rotation.x, this.yawObject.rotation.y, 0 );
      v.copy( direction ).applyEuler( rotation );
      return v;
    };
  }
  get mesh() {
    return this.yawObject;
  }
}
