<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>自选股</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-input v-model="filters.name" placeholder="名称" style="min-width: 240px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getUser">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>

     <!--列表-->
      <el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">
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
            <el-button size="small" @click="showk(scope.row)">查看</el-button>
            
            <el-button type="danger" @click="deluser(scope.$index,scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
  import { reqGetUserList,reqDeleteUser } from '../../api/api';

  export default {
    data() {
      return {
        filters: {
          name: '',
          code: ''
        },
        loading: false,
        users: [
        ],
       
      }
    },
     methods: {
       //删除特定股票
      deluser: function (index, row) {

        this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'}).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = {id: row.id};
          //console.log(para);
          reqDeleteUser(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getUser();
          });
        }).catch(() => {
        });
      },
      //显示K线图
      showk: function (row) {        
        this.$router.push({ path: '/user/kline/'+row["code"]}); 
       //this.$router.push({ path: '/Dashboard'});           
      
      },
      //获取用户列表
      getUser: function () {
        let para = {
          name: this.filters.name
        };
        this.loading = true;
        //NProgress.start();
        reqGetUserList(para).then((res) => {
          this.users = res.data.users;
          this.loading = false;
          //NProgress.done();
        });
      }
    },

    mounted() {
      this.getUser();
    }
  }
</script>

<style scoped>

</style>
