<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>审批中心</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="back">
        <div @click="$router.back()" style="width: 240px">
          <h2>&lt; {{ $route.meta.title }}</h2>
        </div>
      </div>
    </div>
    <el-card>
      <div class="xian">
        <div>负责人信息</div>
      </div>
      <el-row :gutter="20" style="margin: 30px">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">负责人</el-col>
            <el-col :span="16" class="span130"></el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">所属公司</el-col>
            <el-col :span="16" class="span130"></el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">负责人电话</el-col>
            <el-col :span="16" class="span130"></el-col>
          </el-row>
        </el-col>
      </el-row>
      <div class="xian">
        <div>负责项目</div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top: 30px;">
        <el-form ref="ruleForm" :model="tableInfo" inline>
          <el-form-item>
            <el-input v-model="tableInfo.projectName" placeholder="项目名称查询" clearable style="width:250px;" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="tableInfo.projectName" placeholder="公司名称查询" clearable style="width:250px;" />
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="value2"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions" />
          </el-form-item>
          <el-form-item style="margin-left: 20px;">
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="width: 100%">
        <el-table-column label="项目名称" />
        <el-table-column label="公司名称" />
        <el-table-column label="创建时间" />
        <el-table-column label="当前进度" />
        <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
      </el-table>

    </el-card>
  </div>
</template>

<script>
export default {
  name: 'StatistDetail',

  data() {
    return {
      tableInfo: {
        companyName: '',
        projectName: '',
        type: '',
        pageIndex: 1,
        pageSize: 10
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value2: '',

      tableData: [],
      total: 0,
    };
  },
  methods: {
    // 表dan查询
    handleQuery() {
      this.tableInfo.pageIndex = 1
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getProjectCount()
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
      this.getProjectCount()
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
      this.getProjectCount()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.tableInfo.pageIndex = val
      this.getProjectCount()
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
.xian {
  color: #1890ff;
  border-bottom: 1px solid #1890ff;
  padding-bottom: 5px;
  div {
    border-left: 4px solid #1890ff;
    padding-left: 15px;
  }
}
</style>