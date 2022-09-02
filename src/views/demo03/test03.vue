<template>
  <div id="search">
    <el-input v-model="tableData.query" placeholder="请输入内容" clearable style="width:300px" @clear="getUserList">
      <el-button slot="append" icon="el-icon-search" @click="getUserList" />
      <el-button icon="el-icon-search" clearable @clear="getUserList" />
    </el-input>

    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="date"
          label="日期"
          width="150"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="120"
        />
        <el-table-column
          prop="province"
          label="省份"
          width="120"
        />
        <el-table-column
          prop="city"
          label="市区"
          width="120"
        />
        <el-table-column
          prop="address"
          label="地址"
          width="300"
        />
        <el-table-column
          prop="zip"
          label="邮编"
          width="120"
        />
        <el-table-column
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleClick(scope.row)">查看</el-button>
            <el-button type="text" size="small" style="color: #304156">编辑</el-button>
            <el-button type="text" size="small" style="color: #64d9d6">轨迹生成</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

@import url("//unpkg.com/element-ui@2.15.7/lib/theme-chalk/index.css");
<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/element-ui@2.15.7/lib/index.js"></script>
<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    async getUserList(){
      const {data:res} =await this.$http.get('users',{params:this.tableData})
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取用户列表失败')
      this.userlist = res.data.users
      this.total = res.data.total
    },

    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }]
      }
    }
  }
</script>
