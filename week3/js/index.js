var renderer;
function initRender() {
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    //告诉渲染器需要阴影效果
    renderer.setClearColor(0xffffff);
    document.body.appendChild(renderer.domElement);
}

var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0, 40, 50);
    camera.lookAt(new THREE.Vector3(0,0,0));
}

var scene;
function initScene() {
    scene = new THREE.Scene();
}

var light;
function initLight() {
    scene.add(new THREE.AmbientLight(0x444444));
    light = new THREE.PointLight(0xffffff);
    light.position.set(0,50,0);
    //告诉平行光需要开启阴影投射
    light.castShadow = true;
    scene.add(light);
}

function initModel(objColor) {
    // var mtlLoader = new THREE.MTLLoader();
    //加载mtl文件
    // mtlLoader.setPath('model/');
    // mtlLoader.load( 'juese.mtl', function (material) {
        var objLoader = new THREE.OBJLoader();
        //设置当前加载的纹理
        // objLoader.setMaterials(material);

        objLoader.load('model/juese.obj', function (object) {
            object.scale.set(1, 1, 1);
            object.traverse(function (child) {
                if(child instanceof THREE.Mesh){
                    if(objColor){
                        child.material.color.set(objColor)
                        // child.material.ambient.setHex(0xFF0000);
                    }

                }
            });
            scene.add(object);
        })
    // });
}

//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
var controls;
function initControls() {
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.minDistance  = 12;
    controls.maxDistance  = 20;
    controls.enablePan = true;
}

function render() {

    renderer.render( scene, camera );
}

//窗口变动触发的函数
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render();
    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
    //更新控制器
    render();
    controls.update();
    requestAnimationFrame(animate);
}

function draw() {
    initRender();
    initScene();
    initCamera();
    initLight();
    initModel();
    initControls();
    animate();
    window.onresize = onWindowResize;
}

function changeColor(hex) {
    initModel(hex);
}