window.onload = function() {
    // Canvas setup
    var mouseScreen = document.createElement('canvas');
    mouseScreen.id = 'mouse-wrap';
    var w = window.innerWidth;
    var h = window.innerHeight;
    mouseScreen.width =w;
    mouseScreen.height = h;
    window.addEventListener('resize', function() {
        w = window.innerWidth;
        h = window.innerHeight;
        mouseScreen.width = w;
        mouseScreen.height = h;
    });
    document.body.appendChild(mouseScreen);

    // ThreeJS setup
    var scene = new THREE.Scene();
    var camera = new THREE.OrthographicCamera(w / -2, w/2, h/2, h/-2, 1, 1000);
    var renderer = new THREE.WebGLRenderer({canvas: mouseScreen, alpha: true});
    scene.add(camera);

    camera.position.z = 1000;
    var x = 0, y = 0;
    var t = 0;
    var time = 0;
    var mousePos = new THREE.Vector3();
    var mouseVelocity = new THREE.Vector3();
    var deltaT = 0.1;
    var acceleration = new THREE.Vector3(0, -0.98, 0);

    var bottomLimit = ( function() {
        return ( new THREE.Vector3(0, -1, 0.5)).unproject(camera).y;
    })();


    // Particle System Class
    function ParticleSystem(n, mousePos) {
        this.n = n;
        this.pos = new Array(n);
        this.velocity = new Array(n);
        this.lifeTimes = new Array(n);
        this.emitted = new Array(n);
        this.geometry = new THREE.Geometry();
        this.geometry.vertices = this.pos;
        this.emitIndex = 0;
        for(var i = 0; i < n; i++) {
            this.pos[i] = new THREE.Vector3(mousePos.x + 2, mousePos.y - 5, 0);
            this.velocity[i] = new THREE.Vector3(0, 0, 0);
            this.lifeTimes[i] = 180;
            this.emitted[i] = 0.0;
        }
    };

    ParticleSystem.prototype.bindMaterial = function(material) {
        this.system =  new THREE.PointCloud(this.geometry, material);
    };

    ParticleSystem.prototype.reset = function(i, mousePos) {
        this.pos[i].set(mousePos.x + 2, mousePos.y - 5, 0);
        this.velocity[i].set(0, 0, 0);
        this.lifeTimes[i] = 180;
        this.emitted[i] = 0.0;
    };

    ParticleSystem.prototype.emit = function() {
        if (!this.emitted[this.emitIndex]) {
            this.emitted[this.emitIndex] = 1.0;
            this.emitIndex = (this.emitIndex + 1) % this.n;
            this.velocity[this.emitIndex].set(20*Math.random()-10, 0, 0);
        }
    };

    //ParticleSystem.prototype.
    var particleNum = 200;
    var pSystem = new ParticleSystem(particleNum, mousePos);
    var vertexShader = [
        "uniform vec3 color;",
        "attribute float lifeTime;",
        "attribute float emitted;",
        "varying vec3 vColor;",
        "varying float vTime;",
        "varying float vLifeTime;",
        "varying float vEmitted;",
        "void main() {",
            "vColor = color;",
            "vLifeTime = lifeTime;",
            "vEmitted = emitted;",
            "gl_PointSize = 150.0;",
            "gl_Position = projectionMatrix * modelViewMatrix *vec4(position, 1.0);",
        "}"
    ].join("\n");
    var fragShader = [
        "uniform sampler2D texture;",
        "uniform float time;",
        "varying float vLifeTime;",
        "varying float vEmitted;",
        "varying vec3 vColor;",
        "float alpha;",
        "varying float vTime;",
        "void main() {",
            "gl_FragColor = texture2D(texture, gl_PointCoord);",
            "gl_FragColor = vec4(vColor + vec3(sin(vLifeTime*0.1), cos(vLifeTime*0.1), tan(vLifeTime*0.1)) ,  gl_FragColor.y *  vEmitted *exp((vLifeTime/180.0 - 1.0)*0.5)) * gl_FragColor ;",
        "}"
    ].join("\n");
    var material = new THREE.ShaderMaterial({
        uniforms: {
            time: {type: "f", value: 1.0},
            color: {type: "c", value: new THREE.Color(0xb5e853)},
            texture: {type: 't', value: THREE.ImageUtils.loadTexture('img/star.png')}
        },
        attributes:  {
            lifeTime: {type: "f", value: pSystem.lifeTimes},
            emitted: {type: "f", value: pSystem.emitted}
        },
        vertexShader:  vertexShader,
        fragmentShader: fragShader,
        blending:  THREE.AdditiveBlending,
        depthTest:      false,
        transparent:    true
    });

    pSystem.bindMaterial(material);
    scene.add(pSystem.system);

    function update() {
        var cloudVec3 = pSystem.system.position;
        for(var i = 0; i < particleNum; i++) {
            if (pSystem.emitted[i]) {
                pSystem.velocity[i].add(acceleration);
                pSystem.pos[i].add(pSystem.velocity[i]);
                if (pSystem.pos[i].y < bottomLimit + 75) {
                    if (pSystem.velocity[i].y * pSystem.velocity[i].y < 1) {
                        pSystem.reset(i, mousePos);
                    } else {
                        pSystem.velocity[i].set( 10*(Math.random() - 0.5) -  pSystem.velocity[i].x,  pSystem.velocity[i].y * -0.5*(1+Math.random()), 0);
                    }
                }
            } else {
                pSystem.reset(i, mousePos);
            }
            if (pSystem.lifeTimes[i] < 0) {
                pSystem.reset(i, mousePos);
            }
            pSystem.lifeTimes[i] -= 1;
        }
        pSystem.geometry.verticesNeedUpdate = true;
        pSystem.system.material.attributes.lifeTime.needsUpdate = true;
        pSystem.system.material.attributes.emitted.needsUpdate = true;
    };

    function render () {
        window.requestAnimationFrame(render);
        renderer.render(scene, camera);
        update();
        t++;
    };

    var mouseMoveRate = 5;
    var mouseMoveCount = 0;

    window.addEventListener('mousemove', function(e) {
        x = e.pageX;
        y = e.pageY;
        var current = new THREE.Vector3();
        current.set((x / w ) * 2 - 1, -(y / h) * 2 + 1, 0.5);
        current.unproject(camera);
        mouseVelocity.subVectors(current, mousePos).multiplyScalar(10);
        mousePos = current;
        if (mouseMoveCount > mouseMoveRate) {
            mouseMoveCount = 0;
            pSystem.emit();
        }
        mouseMoveCount++;
    });

    window.addEventListener('click', function(e) {

    });
    render();
};