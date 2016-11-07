export default class Orbiter {
  constructor() {
    this.obj = new THREE.Object3D();
    this.r = 220;
    this.v = 0.05;
    this.obj.position.y = this.r;
    this.obj.position.x = 0;
    this.obj.position.z = 0;
    this.prevPos =  this.obj.position.clone();
    this.origin = new THREE.Vector3(0, 0, 0);
  }
  update(dt, t) {
    // this.prevPos.y = this.obj.position.y;
    // this.prevPos.z = this.obj.position.z;
    // this.obj.position.y = this.prevPos.y - dt * this.v * this.prevPos.z;
    // this.obj.position.z = this.prevPos.z + dt * this.v * this.prevPos.y;
    this.obj.position.y = this.r * Math.cos(this.v * t);
    this.obj.position.z = this.r * Math.sin(this.v * t);
    // this.obj.lookAt(this.origin);
  }
  get mesh () {
    return this.obj;
  }
}
