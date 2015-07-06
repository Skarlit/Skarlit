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
    var acceleration = new THREE.Vector3(0, -9.8, 0);


    // Particle Class
    function Particle() {
        this.pos = new THREE.Vector3();
        this.velocity = new THREE.Vector3();
       this.reset();
    }

    Particle.prototype.reset = function() {
        this.pos.set(mousePos.x + 2, mousePos.y - 5, 0);
        this.velocity.set(0, 0, 0);
        this.lifeTime = 180;
        this.emitted = false;
    };

    Particle.prototype.emit = function() {
        if(!this.emitted) {
            this.emitted = true;
            this.pos.set(mousePos.x, mousePos.y, 0);
            this.velocity.set(0.2*mouseVelocity.x,  - 10* Math.random(), 0);
        }
    };

    var particleNum = 200;
    var emitIndex = 0;
    var cloudPos = new THREE.Geometry();
    var particles = new Array(particleNum);

    // Need to build particle system class to handle passing the attributes.
    
    for(var i = 0; i < particleNum; i++) {
        particles[i] = new Particle();
        cloudPos.vertices.push( particles[i].pos);
    }

    //var material = new THREE.PointCloudMaterial({
    //    equation: THREE.MaxEquation,
    //    blendSrc: THREE.SrcAlphaSaturateFactor,
    //    blendDst: THREE.OneFactor,
    //    blending:  THREE.CustomBlending,
    //    opacity: 0.5,
    //    transparent: true,
    //    blendDst: THREE.OneFactor,
    //    size: 200,
    //    color: '#b5e853',
    //    fog: true,
    //    map: THREE.ImageUtils.loadTexture('img/star.png')
    //});

    //Shaders
    var vertexShader = [
        "uniform vec3 color;",
        "uniform float time;",
        "varying vec3 vColor;",
        "varying float vTime;",
        "void main() {",
        "vColor = color;",
        "vTime = time;",
        "gl_PointSize = 150.0;",
        "gl_Position = projectionMatrix * modelViewMatrix *vec4(position, 1.0);",
        "}"
    ].join("\n");

    var fragShader = [
        "uniform sampler2D texture;",
        "varying vec3 vColor;",
        "float alpha;",
        "varying float vTime;",
        "void main() {",
            "gl_FragColor = texture2D(texture, gl_PointCoord);",
            "if (gl_FragColor.x * gl_FragColor.y * gl_FragColor.z <= 0.005) {",
                "alpha = 0.0;",
            "} else { alpha = gl_FragColor.y; }",
            "gl_FragColor = vec4(vColor, alpha) * gl_FragColor ;",
        "}"
    ].join("\n");

    var material = new THREE.ShaderMaterial({
        uniforms: {
            time: {type: "f", value: 1.0},
            color: {type: "c", value: new THREE.Color(0xb5e853)},
            texture: {type: 't', value: THREE.ImageUtils.loadTexture('img/star.png')}
        },
        vertexShader:  vertexShader,
        fragmentShader: fragShader,
        //equation: THREE.AddEquation,
        //blendSrc: THREE.SrcAlphaSaturateFactor,
        //blendDst: THREE.OneFactor,
        blending:  THREE.AdditiveBlending,
        depthTest:      false,
        transparent:    true
    });

    var cloud = new THREE.PointCloud(cloudPos, material);
    scene.add(cloud);

    function update() {
        var cloudVec3 = cloud.position;
        for(var i = 0; i < particleNum; i++) {
            if (particles[i].emitted) {
                particles[i].velocity.add(acceleration);
                particles[i].pos.add(particles[i].velocity).add(acceleration.multiplyScalar(deltaT));
            } else {
                particles[i].reset();
            }
            if (particles[i].lifeTime < 0) {
                particles[i].reset();
            }
            particles[i].lifeTime -= 1;
        }
        cloud.geometry.verticesNeedUpdate = true;
    };

    function render () {
        window.requestAnimationFrame(render);
        renderer.render(scene, camera);
        update();
        t++;
    };

    var mouseMoveRate = 20;
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
            particles[emitIndex].emit();
            emitIndex = (emitIndex + 1) % particleNum;
        }
        mouseMoveCount++;
    });

    window.addEventListener('click', function(e) {

    });
    render();
};
