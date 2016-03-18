import THREE from "three";

var vS = `
    attribute float alphas;
    attribute float offset;

    varying float vAlpha;
    varying float vOffset;

    void main() {
        vAlpha = alphas;
        vOffset = offset;

        gl_PointSize = 32.0;

        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`;


var fS = `
    uniform vec3 color;
    uniform sampler2D texture;

    varying float vAlpha;
    varying float vOffset;

    void main() {

        vec4 color = texture2D(texture, gl_PointCoord * vec2(0.03125, 1.0) + vec2(vOffset, 0.0));
        gl_FragColor = vec4(color.xyz, color.a * vAlpha);
    }
`;


export function Rain () {
    var loopId;
    var camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -500, 10000 );
    camera.position.z = 100;

    var scene = new THREE.Scene();

    var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas-overlay')});
    renderer.setSize( window.innerWidth, window.innerHeight );

    var matrix = new Matrix(window.innerWidth, window.innerHeight);

    scene.add(matrix.ps);

    camera.position.z = 500;

    var clock = new THREE.Clock();
    clock.start();


    var render = function () {
        loopId = requestAnimationFrame( render );
        var dt = clock.getDelta();
        matrix.update(dt);
        renderer.render(scene, camera);
    };
    return {
        start: function() {
            render();
        },
        end: function() {
            window.cancelAnimationFrame(loopId);
        }
    }
}

function Matrix(w, h) {
    this.w =  w;  // win width
    this.h =  h;  // win height
    this.psGeo = new THREE.BufferGeometry();

    this.letterCount = 32;
    this.alphabetWidth = 1024;
    this.offsetTable = new Array(32);

    for(var i = 0; i < this.letterCount; i++) {
        this.offsetTable[i] =  i / this.letterCount;
    }


    this.gridSize = 32;
    this.n = Math.ceil(this.h / this.gridSize);
    this.m = Math.ceil(this.w / this.gridSize);
    this.alphas = new Float32Array(this.n * this.m);
    this.offset = new Float32Array(this.n * this.m);
    this.vertices = new Float32Array(this.n * this.m * 3);
    this.scannerNum = 200;
    this.depth = -5;
    for(var i = 0; i < this.n; i++) {
        for(var j = 0; j < this.m; j++) {
            this.vertices[i * this.m * 3 + j * 3] = j * this.gridSize - this.w / 2;
            this.vertices[i * this.m * 3 + j * 3 + 1] =  - i * this.gridSize + this.h / 2;
            this.vertices[i * this.m * 3 + j * 3 + 2] = this.depth;
            this.alphas[i * this.m + j] = 0;
            this.offset[i * this.m + j] =  this.offsetTable[parseInt(Math.random() * this.letterCount)];
        }
    }

    this.scanners = [];
    for(var i = 0; i < this.scannerNum; i++) {
        this.scanners.push({
            col: Math.round(this.m * Math.random()),
            row: Math.random()* this.n,
            v: 10
        })
    }

    this.psGeo.addAttribute('position', new THREE.BufferAttribute(this.vertices, 3));
    this.psGeo.addAttribute('alphas', new THREE.BufferAttribute(this.alphas, 1));
    this.psGeo.addAttribute('offset', new THREE.BufferAttribute(this.offset, 1));

    var tex = THREE.ImageUtils.loadTexture('../img/alphabet.png');
    tex.flipY = false;
    var uniforms = {
        color: { type: "c", value: new THREE.Color( 0x00ffff ) },
        texture: { type: "t", value: tex}
    };

    this.psMat = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vS,
        fragmentShader: fS,
        transparent: true});

    this.ps = new THREE.Points(this.psGeo, this.psMat);
    this.ps.position.z = -10;

    this.skipFrame = 12;
    this.count = 0;
    this.speed = 100;
}

Matrix.prototype = {
    update: function(dt) {
        this.count++;
        var alphas = this.psGeo.attributes.alphas.array;
        var offset = this.psGeo.attributes.offset.array;
        for(var j = 0; j < this.scanners.length; j++) {
            var idx = Math.round(this.scanners[j].row) * this.m + this.scanners[j].col;
            alphas[idx] = Math.min(1, alphas[idx] + 0.2);
            this.scanners[j].row += dt * this.scanners[j].v;
            if (this.scanners[j].row > this.n - 1) {
                this.scanners[j] = {
                    col: parseInt(this.m * Math.random()),
                    row: Math.random()* this.n,
                    v: 10
                }
            }
        }
        for(var i = 0; i < alphas.length; i++) {
            alphas[i] *= 0.98;
        }
        if (this.count > this.skipFrame) {
            this.count = 0;
            for(var i = 0; i < 100; i++) {
                offset[parseInt(offset.length * Math.random())] = this.offsetTable[parseInt(Math.random() * this.letterCount)];
            }
        }

        this.psGeo.attributes.alphas.needsUpdate = true;
        this.psGeo.attributes.offset.needsUpdate = true;
    }
};

