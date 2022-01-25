<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>综合管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <h2>{{ $route.meta.title }}</h2>
    </div>
    <el-card>
      <div style="display:flex;justify-content:space-between;">
        <el-form ref="ruleForm" :model="tableInfo" inline>
          <el-form-item>
            <el-input v-model="tableInfo.projectName" placeholder="项目名称查询" clearable style="width:250px;" />
          </el-form-item>
          <el-form-item style="margin-left: 20px;">
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-alert
        title="下载的项目文件，会通过服务器预下载进行管理，方便使用者快速下载，减少因网络问题导致的失败。预下载的文件最多保存7天，超时后将会被清除。"
        type="success"
        :closable="false">
      </el-alert>
      <el-table :data="tableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="width: 100%">
        <el-table-column label="项目名称" />
        <el-table-column label="完成预下载时间" />
        <el-table-column label="进度" />
        <el-table-column label="文件大小" />
        <el-table-column label="剩余存储时间" />
        <el-table-column label="操作">
          <template>
            <el-button type="text">下载</el-button>
            <el-button type="text" style="color:red;">删除</el-button>
          </template>
        </el-table-column> 
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>
  </div>
</template>

<script>
import { selectDownFileList } from '@/api/integrated'

export default {
  name: 'Download',
  data() {
    return {
      tableInfo: {
        projectName: '',
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0,
    }
  },
  created() {
    this.selectDownFileList()
  },
  methods: {
    // 列表请求
    selectDownFileList() {
      selectDownFileList(this.tableInfo).then(res => {
        console.log(res)
        const { records, total } = res.data
        this.tableData = records
        this.total = total
      })
    },
    // 表dan查询
    handleQuery() {
      this.tableInfo.pageIndex = 1
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.selectDownFileList()
    },
    // 表dan重置
    reset() {
      this.tableInfo = {
        projectName: '',
        pageIndex: 1,
        pageSize: 10
      }
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.selectDownFileList()
    },
    
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.tableInfo.pageSize = val
      this.selectDownFileList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.tableInfo.pageIndex = val
      this.selectDownFileList()
    },
  }
}
</script>

<style lang="scss" scoped>
  .shang {
    height: 97px;
    background-color: #fff;
    .el-breadcrumb {
      padding: 15px 0 0 25px;
    }
    h2 {
      text-align: left;
      padding-left: 25px;
    }
  }
  .el-alert {
    margin-bottom: 25px;
  }
</style>