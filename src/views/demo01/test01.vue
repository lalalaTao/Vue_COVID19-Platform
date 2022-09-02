<template>
  <!--地图-->
  <div style='width: 100%;height: 700px;'>
    <div id="container"></div>
    <ul class="drawing-panel" style="z-index: 99;">
        <li class = "btn" @click="pauseAni">暂停</li>
        <li class = "btn"  @click="continueAni">继续</li>
    </ul>
  </div>
</template>
 <script type='text/javascript' src='http://api.map.baidu.com/api?v=3.0&ak=ZNzXLY5wzIaeGuRv7oPHnRf2Ayuk04TX'></script>
<script>
  import {loadBaiDuDrawMap} from "@/utils/bmpgl.js"
  
  export default {
    name: 'index',
    data () {
      return {
        path : [{
            'lng': 116.297611,
            'lat': 40.047363
        }, {
            'lng': 116.302839,
            'lat': 40.048219
        }, {
            'lng': 116.308301,
            'lat': 40.050566
        }, {
            'lng': 116.305732,
            'lat': 40.054957
        }, {
            'lng': 116.304754,
            'lat': 40.057953
        }, {
            'lng': 116.306487,
            'lat': 40.058312
        }, {
            'lng': 116.307223,
            'lat': 40.056379
        }],
        interval: null, // 定时器
        timesRun: 0, // 循环次数
        localSearch: null,  // 自动搜索
        loading: false,
        transportmanageList: [],
        trackAni: null,
        maps:'', // 存放地图
        pls:''
      }
    },
    mounted () {
       this.init() // 初始化轨迹路线
    },
    created () {},
    methods: {
      init () {
        // 初始化地图
        loadBaiDuDrawMap().then((BMapGL) => {
          let that = this
          // 创建地图实例
          let bmap = new BMapGL.Map("container")
        //   bmap.centerAndZoom(new BMapGL.Point(116.404, 39.915), 14) // 初始化地图,设置中心点坐标和地图级别
          //(116.297611, 40.047363), 13
          bmap.centerAndZoom(new BMapGL.Point(116.297611, 40.047363), 13) // 初始化地图,设置中心点坐标和地图级别
          bmap.enableScrollWheelZoom(true)  //开启鼠标滚轮缩放

          // 添加比例尺控件
          bmap.addControl(
            new BMapGL.ScaleControl({
              anchor: BMAP_ANCHOR_BOTTOM_LEFT,
              offset: new BMapGL.Size(10, 10)
            })
          )
          // 添加缩放控件
          bmap.addControl(
            new BMapGL.ZoomControl({
              anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
              offset: new BMapGL.Size(10, 10)
            })
          )

          let point = []
          for (var i = 0; i < this.path.length; i++) {
            let poi = new BMapGL.Point(this.path[i].lng, this.path[i].lat)
            point.push(poi)
            let marker = new BMapGL.Marker(poi); //创建标注
            bmap.addOverlay(marker); //将标注添加到地图中
          }
          let pl = new BMapGL.Polyline(point,{strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5})
          // 保存地图
          this.maps = bmap
          this.pls = pl

          setTimeout(this.start(), 3000)
          bmap.setHeading(64.5)
          bmap.setTilt(73)
        })
      },
      // 创建个轨迹动画对象，并配置参数
      start (){
        this.trackAni = new BMapGLLib.TrackAnimation(this.maps, this.pls, {
          overallView: true, // 动画完成后自动调整视野到总览
          tilt: 30,          // 轨迹播放的角度，默认为55
          duration: 20000,   // 动画持续时长，默认为10000，单位ms
          delay: 3000        // 动画开始的延迟，默认0，单位ms

        })
        this.trackAni.start ()
      },
      pauseAni () {
         this.trackAni.pause()
      },
      continueAni () {
          this.trackAni.continue()
      }
    }
  }
</script>
<style scoped>
 
  #result {
    position: fixed;
    top: 10px;
    left: 20px;
    width: 300px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #fff;
    box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
    border-radius: 7px;
    z-index: 99;
  }

   #container {
        overflow: hidden;
        width: 100%;
        height: 100%;
        margin: 0;
        font-family: "微软雅黑";
    }
    ul li {
        list-style: none;
    }
    .drawing-panel {
        z-index: 999;
        position: fixed;
        bottom: 3.5rem;
        margin-left: 3rem;
        padding: 1rem 1rem;
        border-radius: .25rem;
        background-color: #fff;
        box-shadow: 0 2px 6px 0 rgba(27, 142, 236, 0.5);
    }
    .btn {
        width: 90px;
        height: 30px;
        float: left;
        background-color: #fff;
        color: rgba(27, 142, 236, 1);
        font-size: 14px;
        border:1px solid rgba(27, 142, 236, 1);
        border-radius: 5px;
        margin: 0 5px;
        text-align: center;
        line-height: 30px;
    }
    .btn:hover {

        color: #fff;
    }
</style>
