<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>查看市场</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="getshares">查询</el-button>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" @click="showAddDialog">新增</el-button>
          </el-form-item> -->
        </el-form>
      </el-col>

      <!--列表-->
      <el-table :data="shares" highlight-current-row v-loading="loading" style="width: 100%;">
        <el-table-column type="index" width="80">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="120" sortable>
        </el-table-column>
        <el-table-column prop="code" label="代码" width="100" sortable>
        </el-table-column>
        <el-table-column prop="updown" label="涨跌" width="80" sortable>
        </el-table-column>
        <el-table-column prop="range" label="幅度%" width="80" sortable>
        </el-table-column>
        <el-table-column prop="exist" label="现量" width="80" sortable>
        </el-table-column>
        <el-table-column prop="open" label="开盘价" width="80" sortable>
        </el-table-column>
        <el-table-column prop="close" label="收盘价" width="80" sortable>
        </el-table-column>
        <el-table-column prop="price" label="现价" width="80" sortable>
        </el-table-column>
        <el-table-column prop="high" label="最高" width="80" sortable>
        </el-table-column>
        <el-table-column prop="low" label="最低" width="80" sortable>
        </el-table-column>
        <el-table-column prop="operate" label="操作" width="140" sortable>
         <template scope="scope">
            <el-button size="small">查看</el-button>
            
            <el-button type="danger" size="small">新增</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <el-col :span="24" class="toolbar">
 
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
                       style="float:right;">
        </el-pagination>
      </el-col>

      

    </el-col>
  </el-row>
</template>
<script>
  import util from '../../common/util'
  import {reqGetshareListPage, reqDeleteshare,reqAddshare} from '../../api/api';

  export default{
      data(){
      return {
        filters: {
          name: ''
        },
        shares: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [], //列表选中列      
      }
    },
   
    methods: {
      handleCurrentChange(val) {
        this.page = val;
        this.getshares();
      },
      //获取用户列表
      getshares() {
        let para = {
          page: this.page,
          name: this.filters.name
        };
        this.listLoading = true;
        //NProgress.start();
        reqGetshareListPage(para).then((res) => {
          this.total = res.data.total;
          this.shares = res.data.shares;
          this.listLoading = false;
          //NProgress.done();
        })
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //删除
      delshare: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = {id: row.id};
          reqDeleteshare(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getshares();
          });
        }).catch(() => {
        });
      }
      },
    mounted() {
      this.getshares();
    }
  }

</script>

<style>
  .demo-table-expand label {
    font-weight: bold;
  }
</style>
