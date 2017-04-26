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
        vec4 tex_color = texture2D(texture, gl_PointCoord * vec2(0.03125, 1.0) + vec2(vOffset, 0.0));
        gl_FragColor = vec4(tex_color.xyz + color, tex_color.a * vAlpha);
    }
`;

var filterVs = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`;


//  Borrow from https://github.com/Jam3/glsl-fast-gaussian-blur
var filterFs = `
    uniform sampler2D texture;
    uniform vec2 direction;

    varying vec2 vUv;
    void main() {
      vec4 color = vec4(0.0);
      vec2 off1 = vec2(1.411764705882353) * direction;
      vec2 off2 = vec2(3.2941176470588234) * direction;
      vec2 off3 = vec2(5.176470588235294) * direction;
      color += texture2D(texture, vUv) * 0.1964825501511404;
      color += texture2D(texture, vUv + (off1)) * 0.2969069646728344;
      color += texture2D(texture, vUv - (off1)) * 0.2969069646728344;
      color += texture2D(texture, vUv + (off2)) * 0.09447039785044732;
      color += texture2D(texture, vUv - (off2)) * 0.09447039785044732;
      color += texture2D(texture, vUv + (off3)) * 0.010381362401148057;
      color += texture2D(texture, vUv - (off3)) * 0.010381362401148057;
      gl_FragColor = color;
    }
`;

var screenVs = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`;

var screenFs = `
    uniform sampler2D h_blur;
    uniform sampler2D v_blur;
    uniform sampler2D image;

    varying vec2 vUv;
    void main() {
      vec3 image_color = texture2D(image, vUv ).rgb;
      vec3 bloom_color = texture2D(h_blur, vUv ).rgb + texture2D(v_blur, vUv ).rgb;
      image_color += bloom_color;
      vec3 result = vec3(1.0) - exp(-image_color * 0.6);
      result = pow(result, vec3(1.0 / 1.8));
      gl_FragColor = vec4(result, 1.0);

    }
`;

var mobileAndTabletcheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};


export function Rain () {
    var loopId;
    var bloom = mobileAndTabletcheck() ? false : true;


    /*
       Set up control
     */

    var bloomToggle = document.getElementById('bloom-toggle') || document.createElement('a');
    bloomToggle.href = "javascript://";
    bloomToggle.textContent = bloom ?  "Bloom off" : "Bloom on" ;
    bloomToggle.style["position"] = "absolute";
    bloomToggle.id = "bloom-toggle";
    // $(bloomToggle).on('click', function() {
    //     bloom = !bloom;
    //     bloomToggle.textContent =bloom ?  "Bloom off" : "Bloom on" ;
    // });
    document.body.appendChild(bloomToggle);


    /*
        Set up renderer
     */
    var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('canvas-overlay')});
    renderer.setSize( window.innerWidth, window.innerHeight );

    /*
        Set up scene to render
     */
    var sceneRTT = new THREE.Scene();
    var rtTexture = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat} );
    var matrix = new Matrix(window.innerWidth, window.innerHeight);
    sceneRTT.add(matrix.ps);


    /*
        Set up Passes
     */

    var camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -500, 10000 );
    camera.position.z = 100;
    var plane = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight );
    // FIRST PASS (HORIZONTAL)
    var materialFirstPass = new THREE.ShaderMaterial( {
        uniforms: {
            texture: { type: "t", value: rtTexture},
            direction: { type: 'v2', value:  new THREE.Vector2(0.001, 0.0)}
        },
        vertexShader: filterVs,
        fragmentShader: filterFs
    });

    var firstPassTex = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat} );
    var firstPassPlane = new THREE.Mesh(plane, materialFirstPass);
    var firstPassScene = new THREE.Scene();
    firstPassScene.add(firstPassPlane);

    // SECOND PASS (VERTICAL)
    var materialSecondPass = new THREE.ShaderMaterial( {
        uniforms: {
            texture: { type: "t", value: rtTexture},
            direction: { type: 'v2', value: new THREE.Vector2(0.0, 0.001)}
        },
        vertexShader: filterVs,
        fragmentShader: filterFs
    });
    var secondPassTex = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBFormat} );
    var secondPassPlane = new THREE.Mesh(plane, materialSecondPass);
    var secondPassScene = new THREE.Scene();
    secondPassScene.add(secondPassPlane);



    // FINAL PASS (BLENDING)
    var materialScreen = new THREE.ShaderMaterial( {
        uniforms: {
            h_blur: { type: "t", value: firstPassTex},
            v_blur: { type: "t", value: secondPassTex},
            image: { type: 't', value: rtTexture}
        },
        vertexShader: screenVs,
        fragmentShader: screenFs
    });
    var screen = new THREE.Mesh(plane, materialScreen);
    var scene = new THREE.Scene();
    scene.add(screen);


    var clock = new THREE.Clock();
    clock.start();

    var resizeCallbackId;
    window.addEventListener('resize', function() {
        resizeCallbackId && window.clearTimeout(resizeCallbackId);
        loopId && window.cancelAnimationFrame(loopId);
        // bloomToggle && $(bloomToggle).off('click');
        resizeCallbackId = window.setTimeout(function() {
            Rain().start();
        }, 400);
    }.bind(this));


    var render = function () {
        loopId = requestAnimationFrame( render );
        var dt = clock.getDelta();
        matrix.update(dt);
        if (bloom) {
            renderer.render(sceneRTT, camera, rtTexture, true);
            renderer.render(firstPassScene, camera, firstPassTex, true);
            renderer.render(secondPassScene, camera, secondPassTex, true);
            renderer.render(scene, camera);
        } else {
            renderer.render(sceneRTT, camera);
        }
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
    this.scannerNum = this.m * 2;
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
            v:  2 + Math.random() * 6
        })
    }

    this.psGeo.addAttribute('position', new THREE.BufferAttribute(this.vertices, 3));
    this.psGeo.addAttribute('alphas', new THREE.BufferAttribute(this.alphas, 1));
    this.psGeo.addAttribute('offset', new THREE.BufferAttribute(this.offset, 1));

    var tex = THREE.ImageUtils.loadTexture('../img/alphabet.png');
    tex.flipY = false;
    var uniforms = {
        color: { type: "c", value: new THREE.Color( 0xaa66ff ) },
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
                    row: Math.random()* this.n / 2,
                    v: 2 + Math.random() * 6
                }
            }
        }
        for(var i = 0; i < alphas.length; i++) {
            alphas[i] *= 0.97;
        }
        if (this.count > this.skipFrame) {
            this.count = 0;
            for(var i = 0; i < 2 * this.m; i++) {
                offset[parseInt(offset.length * Math.random())] = this.offsetTable[parseInt(Math.random() * this.letterCount)];
            }
        }

        this.psGeo.attributes.alphas.needsUpdate = true;
        this.psGeo.attributes.offset.needsUpdate = true;
    }
};

