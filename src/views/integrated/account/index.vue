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
            <el-input v-model="tableInfo.projectName" placeholder="手机号码查询" clearable style="width:250px;" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="tableInfo.companyName" placeholder="持有人姓名查询" clearable style="width:250px;" />
          </el-form-item>
          <el-form-item>
            <el-select v-model="tableInfo.firstExamine" clearable placeholder="全部来源">
              <el-option label="创建" value="1"></el-option>
              <el-option label="注册" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="tableInfo.firstExamine" clearable placeholder="全部状态">
              <el-option label="启用" value="1"></el-option>
              <el-option label="停用" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 20px;">
            <el-button type="primary" @click="handleQuery">查询</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-button type="primary" @click="create">创建账号</el-button>
        </div>
      </div>
      <el-alert title="所有账号默认可以创建项目、上传材料，如需设定其他权限请绑定角色。" type="success" :closable="false" />
      <el-table :data="tableData" stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="width: 100%">
        <el-table-column label="登录手机号" />
        <el-table-column label="持有人姓名" />
        <el-table-column label="身份证号码" />
        <el-table-column label="角色" />
        <el-table-column label="账号状态" />
        <el-table-column label="所属公司" />
        <el-table-column label="操作">
          <template>
            <el-button type="text">编辑</el-button>
            <el-button type="text">停用</el-button>
          </template>
        </el-table-column> 
      </el-table>
      <c-pagination ref="pagination" :total="total" @sendsize="handleSizeChange" @sendpage="handleCurrentChange" />
    </el-card>
    <!-- 创建账号 -->
    <el-dialog
      title="创建账号"
      :visible.sync="createDialogVisible"
      :close-on-click-modal="false"
      width="50%">
      <el-alert title="账号创建后无法删除，手机号码唯一，一人可持有多个账号" type="success" :closable="false" />
      <el-form ref="addRef" :model="addForm" label-width="100px">
        <el-form-item label="手机号码">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="持有人姓名">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" class="mb">
          <el-input v-model="addForm.name"></el-input>
          <span>限8-12位，由英文与数字组成，不区分大小写</span>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="addForm.region" placeholder="请选择角色" class="width100">
            <el-option label="管理人员" value="shanghai"></el-option>
            <el-option label="运营人员" value="beijing"></el-option>
            <el-option label="业务人员" value="beijing"></el-option>
            <el-option label="审核人员" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属公司">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList, addOne, getProjectExamineLog } from '@/api/listProject'

export default {
  name: 'Account',
  data() {
    return {
      tableInfo: {
        companyName: '',
        projectName: '',
        firstExamine: '',
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0,
      rules: {
        projectName: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
            { min: 4, max: 50, message: '长度在 4 到 50 个字符', trigger: 'blur' }
          ],
        companyName: [
          { required: true, message: '请输入业主名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ]
      },
      // 创建账号
      createDialogVisible: false,
      addForm: {},
    }
  },
  created() {
    // this.getList()
  },
  methods: {
    // 列表请求
    getList() {
      getList(this.tableInfo).then(res => {
        console.log(res)
        const { current, records, total } = res.data
        this.tableData = records
        // this.currentPage = current
        this.total = total
      })
    },

    // 创建账号
    create() {
      this.createDialogVisible = true
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
        pageIndex: 1,
        pageSize: 10
      }
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.getList()
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
  .mb {
    margin-bottom: 0;
  }
</style>