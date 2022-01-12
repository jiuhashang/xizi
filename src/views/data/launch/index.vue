<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>资料收集</el-breadcrumb-item>
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
          <el-form-item>
          <el-input v-model="tableInfo.companyName" placeholder="业主名称查询" clearable style="width:250px;" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="tableInfo.firstExamine" clearable placeholder="全部状态">
            <el-option
              v-for="item in options"
              :key="item.firstExamine"
              :label="item.label"
              :value="item.firstExamine">
            </el-option>
          </el-select>
        </el-form-item>
          <el-form-item style="margin-left: 20px;">
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" @click="create">创建项目表单</el-button>
        </div>
      </div>
      <el-table :data="tableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="width: 100%">
        <el-table-column prop="projectName" label="项目名称" />
        <el-table-column prop="companyName" label="业主名称" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="province" label="建站地址">
          <template slot-scope="scope">
            {{scope.row.province}} - {{scope.row.city}}
          </template>
        </el-table-column>
        <el-table-column label="发起进度">
          <template slot-scope="scope">
            <span v-if="scope.row.companyInfoStatus == 1 && scope.row.companyBuildStatus == 1 && scope.row.cooperateStatus == 1 && scope.row.powerStatus == 1 && scope.row.relevantStatus == 1" style="color:#70B603;">已完善</span>
            <span v-else>未完善</span>
          </template>
        </el-table-column>
        <el-table-column label="审批状态">
          <template slot-scope="scope">
            <span v-if="scope.row.firstExamine == 0">待提交</span>
            <span v-else-if="scope.row.firstExamine == 1" style="color:#F59A23;">审核中</span>
            <span v-else-if="scope.row.firstExamine == 3" style="color:#1890FF;">初审通过</span>
            <span v-else-if="scope.row.firstExamine == 2" style="color:#D9001B;">初审未通过</span>
            <span v-else-if="scope.row.firstExamine == 99">项目已终止</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleView(scope.row)">查看</el-button>
            <el-button type="text" @click="approval(scope.row.projectId)">审批记录</el-button>
          </template>
        </el-table-column> 
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>
    <!-- 创建项目表单 -->
    <el-dialog
      title="创建项目表单"
      :visible.sync="dialogVisible"
      width="40%"
      :close-on-click-modal="false"
      @close="colseDialog">
      <el-alert
        title="公司名称确保与营业执照上的名称一致，创建表单后将无法修改，请认真核对。"
        type="success"
        :closable="false">
      </el-alert>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" style="width:80%;margin:auto;">
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="ruleForm.projectName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="公司名称" prop="companyName">
          <el-select
            v-model="ruleForm.companyName"
            filterable
            clearable
            remote
            reserve-keyword
            placeholder="请输入"
            :remote-method="remoteMethod"
            :loading="loading"
            class="width100">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.name" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createProject">创 建</el-button>
      </span>
    </el-dialog>
    <!-- 审批记录 -->
    <el-dialog
      title="审批记录"
      :visible.sync="logVisible"
      width="50%"
      :close-on-click-modal="false">
      <el-timeline :reverse="true">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.createTime">
          <p>{{activity.title}}</p>
          <p>{{activity.userName}}</p>
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import { getList, addOne, getCompanyInfoList, getProjectExamineLog } from '@/api/listProject'

export default {
  name: 'Launch',
  data() {
    return {
      tableInfo: {
        companyName: '',
        projectName: '',
        firstExamine: '',
        type: 0,
        pageIndex: 1,
        pageSize: 10
      },
      options: [
        {
          firstExamine: '0',
          label: '待提交'
        }, 
        {
          firstExamine: '1',
          label: '审核中'
        }, 
        {
          firstExamine: '3',
          label: '审核通过'
        }, 
        {
          firstExamine: '2',
          label: '审核未通过'
        }, 
        {
          firstExamine: '99',
          label: '项目已终止'
        }
      ],
      tableData: [],
      total: 0,

      // 创建项目表单
      dialogVisible: false,
      ruleForm: {
        projectName: '',
        companyName: '',
        pageIndex: 1,
        pageSize: 10
      },
      options: [],
      list: [],
      states: [],
      loading: false,
      rules: {
        projectName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
            { min: 4, max: 50, message: '长度在 4 到 50 个字符', trigger: 'blur' }
          ],
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          { min: 4, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ]
      },

      // 审批记录
      logVisible: false,
      activities: []
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: `value:${item}`, label: `label:${item}` };
    })
  },
  methods: {
    // 列表请求
    getList() {
      getList(this.tableInfo).then(res => {
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
      this.getList()
    },
    // 表dan重置
    reset() {
      this.tableInfo = {
        companyName: '',
        firstExamine: '',
        firstExamine: '',
        type: 0,
        pageIndex: 1,
        pageSize: 10
      }
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getList()
    },

    // 查看详情
    handleView(row) {
      this.$router.push({ name: 'LaunchDetail', query: { 
        projectId: row.projectId,
        createTime: row.createTime,
        createUserNickName: row.createUserNickName,
        createUserPhone: row.createUserPhone,
        projectName: row.projectName,
        companyName: row.companyName
       }
      })
    },
    
    // 审批记录
    approval(projectId) {
      this.logVisible = true
      getProjectExamineLog({projectId}).then(res => {
        this.activities = res.data
      })
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.tableInfo.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.tableInfo.pageIndex = val
      this.getList()
    },

    // 创建项目表单
    create() {
      this.dialogVisible = true
    },
    colseDialog() {
      this.ruleForm = {
        projectName: '',
        companyName: '',
        pageIndex: 1,
        pageSize: 10
      }
    },
    remoteMethod(query) {
      console.log(query)
      if (query !== '' && query.length >=4) {
        this.ruleForm.companyName = query
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          getCompanyInfoList(this.ruleForm).then( res => {
            console.log('1111', res)
            this.options = res.data
          })
          this.options = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 500);
      } else {
        this.options = [];
      }
    },
    createProject() {
      this.$refs.ruleForm.validate(valid => {
        if(valid) {
          addOne(this.ruleForm).then(res => {
            console.log(res)
            this.$message.success('创建项目表单成功')
            this.$router.push({ name: 'LaunchDetail', query: { 
              projectId: res.data.projectId,
              createTime: res.data.createTime,
              createUserNickName: res.data.createUserNickName,
              createUserPhone: res.data.createUserPhone,
              projectName: res.data.projectName,
              companyName: res.data.companyName
              }
            })
          })
        }
      })
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
  .el-alert {
    margin-bottom: 25px;
  }
</style>