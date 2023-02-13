<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {
  AmbientLight,
  Box3, Clock,
  Color,
  DirectionalLight, Fog, GridHelper,
  Group, MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  Scene,
  SpotLight, TextureLoader, Vector3,
  WebGLRenderer
} from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader";
//车身颜色数组
const colorAry = [
  "rgb(64,0,0)",
  "rgb(142, 36, 170)",
  "rgb(81, 45, 168)",
  "rgb(48, 63, 159)",
  "rgb(30, 136, 229)",
  "rgb(0, 137, 123)",
  "rgb(67, 160, 71)",
  "rgb(251, 192, 45)",
  "rgb(245, 124, 0)",
  "rgb(230, 74, 25)",
  "rgb(233, 30, 78)",
  "rgb(156, 39, 176)",
  "rgb(0, 0, 0)"] // 车身颜色数组
const loader = new GLTFLoader() //引入模型的loader实例
const defaultMap = {
  x: 4,
  y: 2,
  z: 8,
}// 相机的默认坐标

let scene:Scene,
    camera:PerspectiveCamera,
    renderer:WebGLRenderer,
    controls:OrbitControls,
    light1,
    light2,
    light3
let isLoading = ref(true) //是否显示loading  这个load模型监听的进度
let loadingWidth = ref(0)// loading的进度
let carName = 'free_jaguar_f-type_rigged_high-poly'
let background = 'vr_exhibition_gallery_baked'
let carColor = 'Object_6'
let spotLight = new SpotLight()
let ambientLight = new AmbientLight()
//相机锁
let cameraMoveClock = false
//创建灯光
const setLight = () => {
  //单光源
  light1 = new DirectionalLight(0xffffff, 1)
  light1.position.set(5, 10, 5)
  light2 = new DirectionalLight(0xffffff, 1)
  light2.position.set(5, 10, -5)
  light3 = new DirectionalLight(0xffffff, 1)
  light3.position.set(-5, 10, -5)
  light3 = new DirectionalLight(0xffffff, 2)
  light3.position.set(-5, 10, 5)

  scene.add(light1)
  scene.add(light2)
  scene.add(light3)

  //聚光灯
  spotLight.position.set(0, 13, 0);
  //intensity - (可选参数) 光照强度。 缺省值 1。
  spotLight.intensity = 4;
  //聚光锥的半影衰减百分比。在0和1之间的值。默认为0。
  spotLight.penumbra = 0.3;
  //从聚光灯的位置以弧度表示聚光灯的最大范围。应该不超过 Math.PI/2。默认值为 Math.PI/3。
  spotLight.angle = 0.3;
  spotLight.shadow.bias = -0.0001;
  spotLight.castShadow = true;
  spotLight.target.position.set(0, 0, 0);

  scene.add(spotLight.target);
  scene.add(spotLight);

  //环境光
  ambientLight.intensity = 0.2;
  scene.add(ambientLight);
}


// 创建场景
const setScene = () => {
  scene = new Scene()
  renderer = new WebGLRenderer({
    powerPreference: "high-performance",
    //抗锯齿
    antialias: true,
    alpha: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.querySelector('.boxs')!.appendChild(renderer.domElement)

}

// 创建相机
const setCamera = () => {
  const {x, y, z} = defaultMap
  camera = new PerspectiveCamera(30, innerWidth / innerHeight, 1, 500 )
  camera.position.set(x, y, z)
}
// 设置模型控制
const setControls = () => {
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enablePan = false; //禁止右键拖拽
  //禁止缩放
  // controls.enableZoom = false
  controls.maxPolarAngle = Math.PI / 2; // 设置垂直旋转的最大角度
  controls.minPolarAngle = 0;  // 设置垂直旋转的最小角度
  // 这两个设置目前达到的效果是不能看模型的底面
  controls.autoRotate = true; // 镜头自动旋转
  controls.update()
}
//相机放大范围
let around = 13
const setCameraAnimate = () => {
  let x = camera.position.x
  let y = camera.position.y
  let z = camera.position.z
  let len = Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2)+Math.pow(z, 2))

  if (len >= around){
    camera.position.set(4, 2, 8);
    camera.lookAt(0,0,0);
  }
  requestAnimationFrame(setCameraAnimate);
};
//设置阴影
const setContactShadow = () => {
  const shadowGroup = new Group()
  shadowGroup.position.set(0, -1.01, 0);
  shadowGroup.rotation.set(0, Math.PI / 2, 0);
  scene.add(shadowGroup);
};

// 循环场景 、相机、 位置更新
const loop = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(loop)
}

//设置材质
const material = new MeshPhysicalMaterial({
  metalness:0.8,
  roughness:0.6,
  opacity:1,
  clearcoat:0.1,
  clearcoatRoughness:0,
  envMapIntensity: 2,
  color:'#222',
})
//设置车身颜色
const setCarColor = (index:number) => {
  const currentColor = new Color(colorAry[index])
  scene.traverse(child => {
    if (child.isMesh && child.name === carColor) {
      //console.log(child.material.color)
      child.material.color.set(currentColor)
      console.log(child)
      // if (child.name.includes('door_')) {
      //   child.material.color.set(currentColor)
      // }
    }
  })
}
//加载模型
const loadFile1 = (url:string) => {
  return new Promise(((resolve, reject) => {
    loader.load(url, (gltf) => {
          resolve(gltf)
        },
        ({loaded, total}) => {
          let load = Math.abs(loaded / total * 100)
          loadingWidth.value = load
          if (load >= 100) {
            setTimeout(() => {
              isLoading.value = false
            }, 1000)
          }
        },
        (err) => {
          reject(err)
        }
    )
  }))
}
//创建网格地面
// const setHelper = () => {
//   const gridHelper = new GridHelper(100,80,'0x888888','0x888888')
//   scene.add(gridHelper)
// }
//设置模型位置
const setPosition = (gltf:any) => {
  const box = new Box3().setFromObject(gltf.scene);
  //console.log(box)
  //向量坐标
  const x = -(Math.abs(box.max.x + box.min.x)/2)
  const y = -(Math.abs(box.max.y + box.min.y) / 2)
  const z = -(Math.abs(box.max.z + box.min.z) / 2)
  gltf.scene.position.set(x, y,z );
}

//初始化所有函数
const init = async () => {
  setScene()
  setCamera()
  setLight()
  setControls()
  setContactShadow()
  const gltf1 :any = await loadFile1(`public/models/${carName}/scene.gltf`)
  const gltf2 :any = await loadFile1(`public/models/${background}/scene.gltf`)
  //直接添加模型后会把模型的一个角对准坐标轴的原点，获取模型的大小除2计算后设置位置,让坐标轴原点刚好在模型的正中心，方便后续操作
  gltf2.scene.position.set(-9,-0.75,0)
  gltf2.scene.scale.set(0.5,2,0.5)
  setPosition(gltf1)
  // 设置相机运动动画
  setCameraAnimate();

  renderer.setClearColor('#000')
  scene.add(gltf1.scene)
  scene.add(gltf2.scene)
  scene.traverse(child => {if (child.isMesh && child.name == carColor) child.material = material})


  loop()
}
//用vue钩子函数调用
onMounted(init)
</script>

<template>
  <div class="boxs">
    <div class="maskLoading" v-if="isLoading">
      <div class="loading">
        <div :style="{width : loadingWidth +'%' }"></div>
      </div>
    </div>
    <div class="mask">
      <div class="flex">
        <div @click="setCarColor(index)" v-for="(item,index) in colorAry"
             :style="{backgroundColor : item}">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.boxs{
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.maskLoading {
  background: #000;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1111111;
  color: #fff;
}

.maskLoading .loading {
  width: 40vw;
  height: 20px;
  border: 1px solid #fff;
  background: #000;
  overflow: hidden;
  border-radius: 10px;
}

.maskLoading .loading div {
  background: #fff;
  height: 20px;
  width: 0;
  transition-duration: 500ms;
  transition-timing-function: ease-in;
}

canvas {
  width: 100%;
  height: 100%;
  margin: auto;
}

.mask {
  color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  /*padding: 20px;*/
}

.flex div {
  width: 30px;
  height: 30px;
  margin: 10px 5px;
  cursor: pointer;
}

</style>
