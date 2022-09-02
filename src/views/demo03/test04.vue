<template>
<el-form ref="form" :model="form" label-width="150px" style="margin-top: 1%">
  <el-row>
    <el-col :span="11">
      <el-form-item label="姓名">
        <el-input style="width: 200" v-model="form.name"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="日期">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="11">
      <el-form-item label="省份">
        <el-input style="width: 200" v-model="form.name"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="市区">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="11">
      <el-form-item label="地址">
        <el-input style="width: 200" v-model="form.name"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="邮编">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="11">
      <el-form-item label="身份证号码">
        <el-input style="width: 200" v-model="form.name"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="手机号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-col>
  </el-row>
  <!-- <el-form-item label="姓名">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="日期">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="省份">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="市区">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="地址">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="邮编">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="身份证号码">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="手机号">
    <el-input v-model="form.name"></el-input>
  </el-form-item> -->
  <el-row>
    <el-col :span="23">
      <el-form-item label="个人行程轨迹列表：">
        <el-table :data="list" style="width: 100%" >
          <el-table-column type="index" label="序号" width="50" align="center">
          </el-table-column>
          <el-table-column label="地点名称" align="center">
            <template slot-scope="scope">
              {{scope.row.address}}
            </template>
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
      </el-form-item>
    </el-col>
  </el-row>
  
  <el-form-item style="text-align: center">
    <el-button type="primary" @click="onSubmit">轨迹恢复</el-button>
    <el-button>返回</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import axios from 'axios'
// axios.interceptors.request.use(config=> {
//   var token = window.localStorage.getItem('token');
//   if (token && token.startsWith("Bearer_")) {
//     config.headers.Authorization = token;
//   }
//   return config;
// }, err=> {
// })

  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        list: [{
            'address': '地区1',
            'lng': 116.297611,
            'lat': 40.047363,
            'time': '2022-7-17 09:00'
        }, {
            'address': '地区2',
            'lng': 116.302839,
            'lat': 40.048219,
            'time': '2022-7-17 10:00'
        }, {
            'address': '地区3',
            'lng': 116.308301,
            'lat': 40.050566,
            'time': '2022-7-17 11:00'
        }, {
            'address': '地区4',
            'lng': 116.305732,
            'lat': 40.054957,
            'time': '2022-7-17 12:00'
        }, {
            'address': '地区5',
            'lng': 116.304754,
            'lat': 40.057953,
            'time': '2022-7-17 13:00'
        }, {
            'address': '地区6',
            'lng': 116.306487,
            'lat': 40.058312,
            'time': '2022-7-17 14:00'
        }, {
            'address': '地区7',
            'lng': 116.307223,
            'lat': 40.056379,
            'time': '2022-7-17 15:00'
        }]
      }
    },
    mounted () {
      axios({
        method: 'get',
        url: '/hello',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
      }).then(data => {
        console.log(data)
      })


    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>