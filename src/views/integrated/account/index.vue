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
            <el-input v-model="tableInfo.phone" placeholder="手机号码查询" clearable style="width:250px;" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="tableInfo.userName" placeholder="持有人姓名查询" clearable style="width:250px;" />
          </el-form-item>
          <el-form-item>
            <el-select v-model="tableInfo.status" clearable placeholder="全部状态">
              <el-option label="启用" value="1"></el-option>
              <el-option label="停用" value="2"></el-option>
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
        <el-table-column prop="userName" label="登录手机号" />
        <el-table-column prop="nickName" label="持有人姓名" />
        <el-table-column prop="idCard" label="身份证号码" />
        <el-table-column prop="roleName" label="角色" />
        <el-table-column prop="status" label="账号状态">
          <template slot-scope="scope">
            <el-tag type="success" v-show="scope.row.status == 1 ">已启用</el-tag>
            <el-tag type="danger" v-show="scope.row.status == 2 ">已禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="companyName" label="所属公司" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button v-show="scope.row.status === 2" type="text" @click="handleEn(scope.row)">启用</el-button>
            <el-button v-show="scope.row.status === 1" type="text" style="color:red;" @click="handleDis(scope.row)">停用</el-button>
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
      @close="handleClose"
      width="40%">
      <el-alert title="账号创建后无法删除，手机号码唯一，一人可持有多个账号" type="success" :closable="false" />
      <el-form ref="addRef" :rules="addRules" :model="addForm" label-width="100px" style="padding:0 50px; position: relative;">
        <el-form-item prop="userName" label="手机号码">
          <el-input v-model="addForm.userName" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item prop="nickName" label="持有人姓名">
          <el-input v-model="addForm.nickName" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item prop="idCard" label="身份证号码">
          <el-input v-model="addForm.idCard" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password" label="登录密码">
          <el-input v-model="addForm.password" placeholder="请输入登录密码，限8-12位，由英文与数字组成，不区分大小写" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleName">
          <el-select v-model="addForm.roleName" placeholder="请选择" class="width100" clearable @change="handleRole">
            <el-option v-for="(item, index) in options" :label="item.roleName" :value="item.roleId" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="companyName" label="所属公司">
          <el-input v-model="addForm.companyName" placeholder="请输入" @focus="handleFocus" clearable></el-input>
        </el-form-item>
        <div class="divul" v-show="lis.length">
          <ul v-show="lis.length" style="list-style: none;">
            <li v-for="(item, index) in lis" :key="item.companyId" class="divli" :class="{ bgc: index === currentIndex }" @click="handleSelect(item, index)" @mousemove="handleMove(index)">{{ item.companyName }}</li>
          </ul>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>
     <!-- 编辑账号 -->
    <el-dialog
      title="编辑账号"
      :visible.sync="editDialogVisible"
      :close-on-click-modal="false"
      @close="handleClose"
      width="40%">
      <el-alert title="账号创建后无法删除，手机号码唯一，一人可持有多个账号" type="success" :closable="false" />
      <el-form ref="editRef" :rules="editRules" :model="editForm" label-width="100px" style="padding:0 50px;">
        <el-form-item prop="userName" label="手机号码">
          <el-input v-model="editForm.userName" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item prop="nickName" label="持有人姓名">
          <el-input v-model="editForm.nickName" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item prop="idCard" label="身份证号码">
          <el-input v-model="editForm.idCard" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password" label="登录密码">
          <el-input v-model="editForm.password" type="password" placeholder="请输入登录密码，限8-12位，由英文与数字组成，不区分大小写" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleName">
          <el-select v-model="editForm.roleName" placeholder="请选择" class="width100" clearable>
            <el-option v-for="(item, index) in options" :label="item" :value="item" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="companyName" label="所属公司">
          <el-input v-model="editForm.companyName" placeholder="请输入" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { selectList, addOne, updateAccont, roleList, getCompanyInfoList } from '@/api/integrated'

export default {
  name: 'Account',
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
        // console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('姓名不能为空'))
      } else {
        const reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
        // console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的姓名'))
        }
      }
    }
    var checkId = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('身份证号码不能为空'))
      } else {
        const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        // console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的身份证号码'))
        }
      }
    }
    var checkPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('登录密码不能为空'))
      } else {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/
        // console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的登录密码'))
        }
      }
    }
    return {
      tableInfo: {
        phone: '',
        userName: '',
        status: '',
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      total: 0,

      roleList: {
        pageIndex: 1,
        pageSize: 10,
        roleName: '',
        id:' '
      },
      options: [],
      // 创建账号
      addForm: {},
      addRules: {
        userName: [{ required: true, message: '请输入手机号码', trigger: 'blur' },
                   { validator: checkPhone, trigger: 'blur' }],
        nickName: [{ required: true, message: '请输入姓名', trigger: 'blur' },
                   { validator: checkName, trigger: 'blur' }],
          // idCard: [{ message: '请输入身份证号码', trigger: 'blur' },
          //          { validator: checkId, trigger: 'blur' }],
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' },
                   { validator: checkPwd, trigger: 'blur' }],
        roleName: [{ required: true, message: '请选择角色', trigger: 'change' }],
     companyName: [{ required: true, message: '请输入所属公司', trigger: ['blur', 'change'] },
                   { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }]
      },
      createDialogVisible: false,
      currentIndex: null,
      lis: [],
      // 编辑账号
      editForm: {},
      editRules: {
        userName: [{ required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }],
        nickName: [{ required: true, message: '请输入姓名', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }],
          idCard: [{ required: true, message: '请输入身份证号码', trigger: 'blur' },
          { validator: checkId, trigger: 'blur' }],
        // password: [{ required: false, message: '请输入登录密码', trigger: 'blur' },
        //            { validator: checkPwd, trigger: 'blur' }],
        roleName: [{ required: true, message: '请选择角色', trigger: 'change' }],
        companyName: [
            { required: true, message: '请输入所属公司', trigger: 'blur' },
            { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
          ],
        },
        editDialogVisible: false,
      }
  },
  created() {
    this.selectList()
  },
  methods: {
    // 列表请求
    selectList() {
      selectList(this.tableInfo).then(res => {
        const { records, total } = res.data
        this.tableData = records
        this.total = total
      })
    },
    handleFocus() {
      getCompanyInfoList().then(res => {
        this.lis = res.data.records
      })
    },
    handleMove(index) {
      this.currentIndex = index
    },
    handleSelect(item) {
      this.$set(this.addForm, 'companyName', item.companyName)
      this.$set(this.addForm, 'companyId', item.companyId)
      this.lis = []
    },
    // 创建账号
    create() {
      this.createDialogVisible = true
      roleList(this.roleList).then(res => { // 获取角色
        res.data.records.map(item => {
          let a = {
            roleName: item.roleName,
            roleId: item.id
          }
          this.options.push(a)
        })
      })
    },
    handleRole(val) {
      this.addForm.roleId = val
      let handleRole = {}
      handleRole = this.options.find((item)=>{
        return item.roleId === val;
      })
       this.addForm.roleName = handleRole.roleName
    },
    handleAdd() {
      this.$refs.addRef.validate( valid => {
        if(valid) {
          addOne(this.addForm).then(res => {
            this.$message.success('添加成功')
            this.createDialogVisible = false
            this.selectList()
          })
        }
      })
    },
    handleClose() {
      this.addForm = {}
      this.editForm = {}
      this.options = []
      this.$refs.addRef.clearValidate()
    },
    // 编辑账号
    edit(row) {
      this.editForm = row
      this.editDialogVisible = true
      roleList(this.roleList).then(res => { // 获取角色
        res.data.records.map(item => {
          this.options.push(item.roleName)
        })
      })
    },
    handleEdit() {
      this.$refs.editRef.validate(valid => {
        if(valid) {
          updateAccont(this.editForm).then(res => {
            this.$message.success('编辑成功')
            this.editDialogVisible = false
            this.selectList()
          })
        }
      })
    },

    async handleEn(row) { // 启用
      const confirmResult = await this.$confirm('是否启用该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消操作')
      }
      this.editForm = row
      this.editForm.status = 1
      updateAccont(this.editForm).then(res => {
        console.log(res)
        this.$message.success('状态修改成功')
        this.selectList()
      })
    },
    async handleDis(row) { // 禁用
      const confirmResult = await this.$confirm('禁用账号后，该账号无法登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消操作')
      }
      this.editForm = row
      this.editForm.status = 2
      updateAccont(this.editForm).then(res => {
        this.$message.success('状态修改成功')
        this.selectList()
      }) 
    },
    // 表dan查询
    handleQuery() {
      this.tableInfo.pageIndex = 1
      this.$refs.pagination.resetOption(this.tableInfo.pageIndex, this.tableInfo.pageSize)
      this.selectList()
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
      this.selectList()
    },

    handleSizeChange(val) {
      this.tableInfo.pageSize = val
      this.selectList()
    },
    handleCurrentChange(val) {
      this.tableInfo.pageIndex = val
      this.selectList()
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
  .divul {
    max-width: 600px;
    min-width: 200px;
    list-style: none;
    background-color: #fff;
    position: absolute;
    top: 360px;
    left: 150px;
    border:1px solid #DCDFE6;
    border-radius: 5px;
    overflow: auto;
  }
  .divli {
    margin-bottom: 10px;
    cursor: pointer;
    width: 100%;
  }
  .bgc:hover {
    color: blue;
  }
</style>