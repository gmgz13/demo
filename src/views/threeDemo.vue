<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref} from 'vue'
import {
  AmbientLight,
  Box3,
  DirectionalLight,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  Scene,
  SpotLight,
  WebGLRenderer
} from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import ResourceTracker from "../utils/TrackResource";
// 在外层定义resMgr和track
let resMgr = new ResourceTracker();
const track = resMgr.track.bind(resMgr);

let renderer: WebGLRenderer

//创建灯光
let light1,
    light2,
    light3
let spotLight = track(new SpotLight())
let ambientLight = track(new AmbientLight())
const setLight = () => {
  //单光源
  light1 = track(new DirectionalLight(0xffffff, 0.8))
  light1.position.set(5, 10, 5)
  light2 = track(new DirectionalLight(0xffffff, 0.8))
  light2.position.set(5, 10, -5)
  light3 = track(new DirectionalLight(0xffffff, 0.8))
  light3.position.set(-5, 10, -5)

  //聚光灯
  spotLight.position.set(0, 13, 0);
  //intensity - (可选参数) 光照强度。 缺省值 1。
  spotLight.intensity = 3.5;
  //聚光锥的半影衰减百分比。在0和1之间的值。默认为0。
  spotLight.penumbra = 0.2;
  //从聚光灯的位置以弧度表示聚光灯的最大范围。应该不超过 Math.PI/2。默认值为 Math.PI/3。
  spotLight.angle = 0.23;
  spotLight.target.position.set(0, 0, 0);

  scene.add(spotLight.target);

  //环境光
  ambientLight.intensity = 0.2;

  scene.add(light1,light2,light3,spotLight,ambientLight)
}


// 创建场景
let scene: Scene
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
const defaultMap = {
  x: 4,
  y: 2,
  z: 8,
}// 相机的默认坐标

let camera: PerspectiveCamera
const setCamera = () => {
  const {x, y, z} = defaultMap
  camera = new PerspectiveCamera(25, innerWidth / innerHeight, 1, 500)
  camera.position.set(x, y, z)

}
// 设置模型控制
let controls: OrbitControls
const setControls = () => {
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enablePan = false; //禁止右键拖拽
  //禁止缩放
  // controls.enableZoom = false
  controls.maxPolarAngle = Math.PI / 2; // 设置垂直旋转的最大角度
  controls.minPolarAngle = 0;  // 设置垂直旋转的最小角度
  // 这两个设置目前达到的效果是不能看模型的底面
  controls.autoRotate = true; // 镜头自动旋转
  controls.enableDamping = true //启用阻尼
  controls.dampingFactor = 0.11 // 动态阻尼系数
  controls.rotateSpeed = 0.5 //旋转速度
}
//相机放大范围限制
let around = 12
let animationId: number
const setCameraAnimate = () => {
  let x = camera.position.x
  let y = camera.position.y
  let z = camera.position.z
  let len = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2))
  let t = around / len
  if (len >= around) {
    camera.position.set(t * x, t * y, t * z);
    camera.lookAt(0, 0, 0);
  }
  animationId = requestAnimationFrame(setCameraAnimate);
};
//设置阴影
const setContactShadow = () => {
  const shadowGroup = track(new Group())
  shadowGroup.position.set(0, -1.01, 0);
  shadowGroup.rotation.set(0, Math.PI / 2, 0);
  scene.add(shadowGroup);
};

// 循环场景 、相机、 位置更新
let animationId2 :number
const loop = () => {
  renderer.render(scene, camera)
  renderer.shadowMap.enabled = true
  animationId2 = requestAnimationFrame(loop)
  controls.update()
}

//设置材质
const material = new MeshPhysicalMaterial({
  metalness: 0.88,
  roughness: 0.38,
  opacity: 0.8,
  clearcoat: 0.1,
  clearcoatRoughness: 0.1,
  envMapIntensity: 2,
  color: '#222',
  transmission: 0.1,
  attenuationDistance: 0.5,
  ior: 2
})

//设置车身颜色
let carColor = 'Object_6'
let color = ref("#222")
const setCarColor = () => {
  scene.traverse(child => {
    if (child instanceof Mesh && child.name === carColor) {
      child.material.color.set(color.value)
      // if (child.name.includes('door_')) {
      //   child.material.color.set(currentColor)
      // }
    }
  })
}

//加载模型
let isLoading = ref(true) //是否显示loading  这个load模型监听的进度
let loadingWidth = ref(0)// loading的进度

const loader = new GLTFLoader() //引入模型的loader实例
const loadFile1 = (url: string) => {
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
const setPosition = (gltf: any) => {
  const box = new Box3().setFromObject(gltf.scene);
  //console.log(box)
  //向量坐标
  const x = -(Math.abs(box.max.x + box.min.x) / 2)
  const y = -(Math.abs(box.max.y + box.min.y) / 2)
  const z = -(Math.abs(box.max.z + box.min.z) / 2)
  gltf.scene.position.set(x, y, z);
}

//初始化所有函数
let carName = 'free_jaguar_f-type_rigged_high-poly'
let background = 'vr_exhibition_gallery_baked'
const init = async () => {
  setScene()
  setCamera()
  setLight()
  setControls()
  setContactShadow()
  const gltf1: any = track(await loadFile1(`public/models/${carName}/scene.gltf`))
  const gltf2: any = track(await loadFile1(`public/models/${background}/scene.gltf`))
  //直接添加模型后会把模型的一个角对准坐标轴的原点，获取模型的大小除2计算后设置位置,让坐标轴原点刚好在模型的正中心，方便后续操作
  gltf2.scene.position.set(-9, -0.75, 0)
  gltf2.scene.scale.set(0.5, 2, 0.5)
  setPosition(gltf1)
  // 设置相机运动动画
  setCameraAnimate();

  renderer.setClearColor('#000')
  scene.add(gltf1.scene,gltf2.scene)

  scene.traverse(child => {
    if (child instanceof Mesh && child.name == carColor) child.material = material
  })

  loop()
}

//用vue钩子函数调用
onMounted(init)

onBeforeUnmount(() => {
  try {
    scene.clear();
    resMgr && resMgr.dispose()
    renderer.dispose();
    renderer.forceContextLoss();
    cancelAnimationFrame(animationId)
    cancelAnimationFrame(animationId2)
    console.log(renderer.info)   //查看memery字段即可
  }catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <div class="boxs">
    <div v-if="isLoading" class="maskLoading">
      <div class="loading">
        <div :style="{width : loadingWidth +'%' }"></div>
      </div>
    </div>
    <div class="mask">
      <div class="flex">
        <input id="body-color" v-model="color" type="color" @input=setCarColor()>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.boxs {
  height: 100vh;
  width: 100vw;
  overflow: hidden;

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
    z-index: 1;
    color: #fff;

    .loading {
      width: 25vw;
      height: 1.6rem;
      border: 1px solid #fff;
      background: #000;
      overflow: hidden;
      border-radius: 10px;

      div {
        background: #fff;
        height: 2rem;
        width: 0;
        transition-duration: 500ms;
        transition-timing-function: ease-in;
      }
    }
  }

  .mask {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    width: 100%;

    .flex {
      margin-bottom: 3rem;
      cursor: pointer;

      #body-color {
        width: 2rem;
        height: 2rem;
      }
    }
  }
}

canvas {
  width: 100%;
  height: 100%;
  margin: auto;
}

</style>
