export default class Globe {
  constructor() {
    var geometry = new THREE.SphereGeometry(200, 32, 32 );
    var material = new THREE.MeshPhongMaterial( {color: 0xffff00 } );
    this.sphere = new THREE.Mesh(geometry, material );
  }
  get mesh () {
    return this.sphere;
  }
}
