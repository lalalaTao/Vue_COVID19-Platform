<template>
  <div class="about">
    <el-input
      v-model="inputVal"
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      clearable
    />
    <el-button class="searchbtn" style="background-color:#18918dcf ; color: white;" @click="Search_table">搜索</el-button>

    <el-table :data="tableData" style="width:100%; border: gray;">
      <el-table-column fixed prop="date" label="日期" width="200" />
      <el-table-column prop="name" label="姓名" width="200" />
      <el-table-column prop="province" label="省份" width="200" />
      <el-table-column prop="city" label="市区" width="200" />
      <el-table-column prop="address" label="地址" width="300" />
      <el-table-column prop="zip" label="邮编" />
      <el-table-column
        label="操作"
        width="260"
      >
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="handleClick(scope.row)">查看</el-button>
          <el-button type="text" size="small" style="color: #304156">编辑</el-button>
          <el-button type="text" size="small" style="color: #64d9d6">轨迹生成</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
import { tableData } from '/mock/tablelist'
export default {
  data() {
    return {
      inputVal: '',
      showTable: [],
      tableData: []
    }
  },
  watch: {
    inputVal(item1, item2) {
      if (item1 == '') {
        this.tableData = this.showTable
      }
    }
  },
  mounted() {
    // 用来对搜索之后的数据进行展示
    this.showTable = tableData
    // 给table表格组件遍历数据用的
    this.tableData = tableData
  },
  methods: {
    Search_table() {
      const Search_List = []
      const res1 = this.inputVal
      const res = res1.replace(/\s/gi, '')
      const searchArr = this.showTable
      searchArr.forEach((e) => {
        const date = e.date
        const name = e.name
        const province = e.province
        const city = e.city
        const address = e.address
        const zip = e.zip

        if (date.includes(res)) {
          if (Search_List.indexOf(e) === '-1') {
            Search_List.push(e)
          }
        }
        if (name.includes(res)) {
          if (Search_List.indexOf(e) === '-1') {
            Search_List.push(e)
          }
        }
        if (province.includes(res)) {
          if (Search_List.indexOf(e) === '-1') {
            Search_List.push(e)
          }
        }
        if (city.includes(res)) {
          if (Search_List.indexOf(e) === '-1') {
            Search_List.push(e)
          }
        }
        if (address.includes(res)) {
          if (Search_List.indexOf(e) === '-1') {
            Search_List.push(e)
          }
        }
        if (zip.includes(res)) {
          if (Search_List.indexOf(e) === '-1') {
            Search_List.push(e)
          }
        }
      })
      this.tableData = Search_List
    }
  }
}
</script>
<style lang="scss" scoped>
.about {
  width: 100%;
  height: 100%;
  .el-input {
    width: 300px;
  }
  .el-table {
    width: 500px;
    margin: 0 auto;
  }
}
</style>
//eslint-disable-line