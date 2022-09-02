<template>
  <div class="page">
    <!-- <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-input v-model="gpsNum" placeholder="请输入内容" size="small"></el-input>
      </el-col>
      <el-col :span="1">
        <el-button icon="el-icon-search" type="primary" size="small" style="margin:0 15px" @click="getList()">搜索
        </el-button>
      </el-col>
    </el-row> -->
    <el-row type="flex" class="mapBox" justify="center" :gutter="20">
      <el-col :span="8">
        <div class="leftBox">
          <el-table :data="list" style="width: 100%" @row-click="clickInfo">
            <el-table-column type="index" label="序号" width="50" align="center">
            </el-table-column>
            <el-table-column label="经纬度" align="center">
              <template slot-scope="scope">
                {{scope.row.lng}},{{scope.row.lat}}
              </template>
            </el-table-column>
            <el-table-column label="时间" align="center">
              <template slot-scope="scope">
                {{scope.row.time}}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="16">
        <div id="rightBox" class="rightBox"></div>
      </el-col>
    </el-row>
  </div>
</template>
 
<script>
import {loadBaiDuDrawMap} from "@/utils/bmpgl.js"

export default {
  name: "demo",
  data () {
    return {
      gpsNum: '',
      list: [],
      path : [{
            'lng': 116.297611,
            'lat': 40.047363,
            'time': '2022-7-17 9:00'
        }, {
            'lng': 116.302839,
            'lat': 40.048219,
            'time': '2022-7-17 10:00'
        }, {
            'lng': 116.308301,
            'lat': 40.050566,
            'time': '2022-7-17 11:00'
        }, {
            'lng': 116.305732,
            'lat': 40.054957,
            'time': '2022-7-17 12:00'
        }, {
            'lng': 116.304754,
            'lat': 40.057953,
            'time': '2022-7-17 13:00'
        }, {
            'lng': 116.306487,
            'lat': 40.058312,
            'time': '2022-7-17 14:00'
        }, {
            'lng': 116.307223,
            'lat': 40.056379,
            'time': '2022-7-17 15:00'
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
  created () {
    // this.getList();
    this.list = this.path;
    this.init() // 初始化轨迹路线
  },
  methods: {
    init () {
      // 初始化地图
      loadBaiDuDrawMap().then((BMapGL) => {
        // let that = this
        // 创建地图实例
        let bmap = new BMapGL.Map("rightBox")
        bmap.centerAndZoom(new BMapGL.Point(116.404, 39.915), 14) // 初始化地图,设置中心点坐标和地图级别
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
        duration: 10000,   // 动画持续时长，默认为10000，单位ms
        delay: 3000        // 动画开始的延迟，默认0，单位ms

      })
      this.trackAni.start ()
    },
    pauseAni () {
        this.trackAni.pause()
    },
    continueAni () {
        this.trackAni.continue()
    },


    // getList () {
    //     this.list = [{
    //         'lng': 116.297611,
    //         'lat': 40.047363
    //     }, {
    //         'lng': 116.302839,
    //         'lat': 40.048219
    //     }, {
    //         'lng': 116.308301,
    //         'lat': 40.050566
    //     }, {
    //         'lng': 116.305732,
    //         'lat': 40.054957
    //     }, {
    //         'lng': 116.304754,
    //         'lat': 40.057953
    //     }, {
    //         'lng': 116.306487,
    //         'lat': 40.058312
    //     }, {
    //         'lng': 116.307223,
    //         'lat': 40.056379
    //     }];
    // //   //创建虚拟数据
    // //   for (let i = 0; i < 50; i++) {
    // //     this.list.push({
    // //       lng: i + Math.round(Math.random()) + 5,
    // //       lat: 10 + i
    // //     })
    // //   }
    //   this.importBaiduMap()   //引入百度地图（如果是异步获取数据的话 要先拿到数据在初始化 地图api）
    // },
    // importBaiduMap () {
    //   var script = document.createElement('script');
    //   script.src = 'https://api.map.baidu.com/api?v=3.0&ak=ZNzXLY5wzIaeGuRv7oPHnRf2Ayuk04TX&setLang=en&callback=loadBaiduMap';
    //   document.body.appendChild(script);
    //   //完全载入后执行
    //   window.loadBaiduMap = () => {
    //     // let bmap = new BMapGL.Map("rightBox");    // 创建Map实例
    //     // bmap.centerAndZoom(new BMapGL.Point(116.297611, 40.047363), 17);  // 初始化地图,设置中心点坐标和地图级别
    //     // bmap.enableScrollWheelZoom(true);     // 开启鼠标滚轮缩放
    //     // this.drawBaiduMap(); //绘制点
    //     window.baiduMap = new BMap.Map('rightBox'); //找到页面id 绘制地图
    //     window.baiduMap.addControl(new BMap.NavigationControl());
    //     window.baiduMap.centerAndZoom(new BMap.Point(116.297611, 40.047363), 13); //设置默认中心点
    //     window.baiduMap.enableScrollWheelZoom(); //允许滚轮缩放
    //     this.drawBaiduMap(); //绘制点
    //     // window.baiduMap = new BMap.Map('rightBox'); //找到页面id 绘制地图
    //     // window.baiduMap.addControl(new BMap.NavigationControl());
    //     // window.baiduMap.centerAndZoom(new BMap.Point(70.0225, 40.027222), 3); //设置默认中心点
    //     // window.baiduMap.enableScrollWheelZoom(); //允许滚轮缩放
    //     // this.drawBaiduMap(); //绘制点
    //   };

    // },

    // //绘制点
    // drawBaiduMap () {
    // //   let trainIcon = 'https://www.aliboxx.com/uploadfile/static/icons/train.png';
    //   if (this.list.length > 0) {
    //     window.baiduMap.centerAndZoom(new BMap.Point(this.list[0].lng, this.list[0].lat), 16);  //取第一个点为地图中心点
    //     //画路线部分
    //     let pointsArray = [];
    //     const list = this.list;
    //     list.forEach(item => {
    //       console.log(item, 'item')
    //     //   pointsArray.push(new BMap.Point(item.lng, item.lat)); //添加每一个点
    //       let poi = new BMap.Point(item.lng, item.lat)
    //       pointsArray.push(poi); //添加每一个点
    //       let marker = new BMap.Marker(poi); //创建标注
    //       window.baiduMap.addOverlay(marker); //将标注添加到地图中
    //     });
    //     let polyline = new BMap.Polyline(pointsArray, {
    //       strokeColor: '#5352ed',    //轨迹的样式
    //       strokeWeight: 3,
    //       strokeOpacity: 1.0,
    //     });
    //     window.baiduMap.addOverlay(polyline);

    //     //标注起点窗口信息
    //     // let opts = {
    //     //   width: 100, // 信息窗口宽度
    //     //   // height: 60,     // 信息窗口高度
    //     // };
    //     // let contentString = `<div>第一个位置鼠标移动上去的信息</div>`;
    //     // let infoWindow = new BMap.InfoWindow(contentString, opts); // 创建信息窗口对象
    //     // let nowPoint = new BMap.Point(list[0].lng, list[0].lat);  //设置图标的位置
    //     // let nowIcon = new BMap.Icon(trainIcon, new BMap.Size(32, 32));
    //     // nowIcon.setImageSize(new BMap.Size(25, 25)); //设置图标大小
    //     // let nowPort = new BMap.Marker(nowPoint, { icon: nowIcon });

    //     // nowPort.addEventListener('mouseover', function () { //鼠标移动上去事件
    //     //   window.baiduMap.openInfoWindow(infoWindow, nowPoint);
    //     // });
    //     // nowPort.addEventListener('mouseout', function () { //移开清除
    //     //   window.baiduMap.closeInfoWindow(infoWindow, nowPoint);
    //     // });
    //     // window.baiduMap.addOverlay(nowPort);
    //   }
    // },
    clickInfo (row) {
      console.log(row, 'row')
      if (this.maps) {//如果当前渲染的是百度地图
        let opts = {
          width: 250, // 信息窗口宽度
          // height: 100,     // 信息窗口高度
        };
        let contentString = `<div><p>点：${row.lng},${row.lat}</p><p>时间：${row.time}</p></div>`;
        let infoWindow = new BMapGL.InfoWindow(contentString, opts); // 创建信息窗口对象
        this.maps.openInfoWindow(infoWindow, new BMapGL.Point(row.lng, row.lat)); // 打开信息窗口
      }
    }
  }
}
</script>
 
<style lang="scss" scoped >
.page {
  background: #fafafa;
  //   height: 100vh;
  padding-top: 30px;
  .mapBox {
    width: 1600px;
    margin: 30px auto 0 auto !important;
    .leftBox {
      width: 100%;
      height: 600px;
      margin-right: 30px;
      background: #ffffff;
      overflow-y: scroll;
    }
    .rightBox {
      width: 100%;
      height: 600px;
    }
  }
}
</style>
