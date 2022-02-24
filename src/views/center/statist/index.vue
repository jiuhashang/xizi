<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>审批中心</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <h2>{{ $route.meta.title }}</h2>
    </div>
    <el-alert title="点击此处查看搜索规则与数据统计规则" type="success" :closable="false" @click.native="handleDetail" />
    <el-card>
      <div style="display:flex;justify-content:space-between;">
        <el-form ref="ruleForm" :model="tableInfo" inline>
          <el-form-item>
            <el-input v-model="tableInfo.projectName" placeholder="账号持有人查询" clearable style="width:250px;" />
          </el-form-item>
          <el-form-item>
            <el-select v-model="tableInfo.type" clearable placeholder="全部公司">
              <el-option
              v-for="item in options"
              :key="item.type"
              :label="item.label"
              :value="item.type">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 20px;">
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      
      <el-table :data="tableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="width: 100%">
        <el-table-column label="负责人" />
        <el-table-column label="所属公司" />
        <el-table-column label="发起项目" />
        <el-table-column label="提交审核" />
        <el-table-column label="初审通过" />
        <el-table-column label="终审通过" />
        <el-table-column label="目前已初审通过" />
        <el-table-column label="目前已终审通过" />
        <el-table-column label="目前已终止" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row)">项目明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>
    <el-dialog
      title="规则说明"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="40%">
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getShareBankProjectList } from '@/api/integrated'

export default {
  name: 'Statist',
  data() {
    return {
      tableInfo: {
        companyName: '',
        projectName: '',
        type: '',
        pageIndex: 1,
        pageSize: 10
      },
      options: [],
      tableData: [],
      total: 0,

      dialogVisible: false
    }
  },
  created() {
  },
  methods: {
    // 表dan查询
    handleQuery() {
      this.tableInfo.pageIndex = 1
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getShareBankProjectList()
    },
    // 表dan重置
    reset() {
      this.tableInfo = {
        companyName: '',
        projectName: '',
        type: '',
        pageIndex: 1,
        pageSize: 10
      }
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getShareBankProjectList()
    },

    // 查看详情
    handleView(row) {
      this.$router.push({ name: 'Statist', query: { 
        projectId: row.projectId,
        createTime: row.createTime,
        createUserNickName: row.createUserNickName,
        createUserPhone: row.createUserPhone,
        projectName: row.projectName,
        companyName: row.companyName
       } })
    },
    handleDetail() {
      this.dialogVisible = true
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.tableInfo.pageSize = val
      this.getShareBankProjectList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.tableInfo.pageIndex = val
      this.getShareBankProjectList()
    }
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
  .el-form {
    width: 80%;
  }
  .el-alert {
    margin: 20px;
    text-decoration:underline;
  }
</style>