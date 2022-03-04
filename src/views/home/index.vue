<template>
  <el-container>
    <el-header>
      <div class="left">
        <h2>西子光能智慧能源管理平台</h2>
        <el-menu
        :default-active="$route.path"
        class="el-menu-demo"
        mode="horizontal"
        active-text-color="#1890FF"
        @select="handleSelect"
        router>
        <el-menu-item index="/dashboard">首页</el-menu-item>
        <el-submenu index="2" v-show="collect">
          <template slot="title">资料收集</template>
          <el-menu-item index="/launch" v-show="menuId.indexOf('项目发起') !== -1">项目发起</el-menu-item>
          <el-menu-item index="/material" v-show="menuId.indexOf('材料补充') !== -1">材料补充</el-menu-item>
          <el-menu-item index="/added" v-show="menuId.indexOf('立项补充') !== -1">立项补充</el-menu-item>
        </el-submenu>
        <el-submenu index="3" v-show="center">
          <template slot="title">审批中心</template>
          <el-menu-item index="/first" v-show="menuId.indexOf('项目初审') !== -1">项目初审</el-menu-item>
          <el-menu-item index="/review" v-show="menuId.indexOf('图纸复核') !== -1">图纸复核</el-menu-item>
          <el-menu-item index="/final" v-show="menuId.indexOf('项目终审') !== -1">项目终审</el-menu-item>
          <el-menu-item index="/share" v-show="menuId.indexOf('项目分享') !== -1">项目分享</el-menu-item>
          <el-menu-item index="/overview" v-show="menuId.indexOf('项目总览') !== -1">项目总览</el-menu-item>
          <el-menu-item index="/statist" v-show="menuId.indexOf('项目统计') !== -1">项目统计</el-menu-item>
        </el-submenu>
        <el-submenu index="4" v-show="manage">
          <template slot="title">综合管理</template>
          <el-menu-item index="/account" v-show="menuId.indexOf('账户管理') !== -1">账户管理</el-menu-item>
          <el-menu-item index="/role" v-show="menuId.indexOf('角色管理') !== -1">角色管理</el-menu-item>
          <el-menu-item index="/organization" v-show="menuId.indexOf('机构管理') !== -1">机构管理</el-menu-item>
          <el-menu-item index="/download" v-show="menuId.indexOf('下载管理') !== -1">下载管理</el-menu-item>
        </el-submenu>
      </el-menu>
      </div>
      <div class="right">
        <el-dropdown>
          <span class="el-dropdown-link">
            <img :src="image" alt="">
            <h3 style="display: inline-block;">{{ nickName }}</h3>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleOpen">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      @close="handleClose"
      width="30%">
      <div style="padding:0 35px;">
        <el-form :model="ruleForm" :rules="rules" ref="refForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="当前密码" prop="oldPassword">
            <el-input v-model="ruleForm.oldPassword" placeholder="请输入原密码" clearable></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="ruleForm.newPassword" placeholder="新密码限8-12位，由英文与数字组成，区分大小写" clearable></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="rePassword">
            <el-input v-model="ruleForm.rePassword" placeholder="请再次输入新密码" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import { editPassword } from '@/api/integrated'
export default {
  data() {
    var checkPwd = (rule, value, callback) => {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,12}$/
      if (value == '' || value == undefined || value == null) {
        callback()
      } else {
        if (!reg.test(value)) {
          callback(new Error('限8-12位，由英文与数字组成，区分大小写'))
        } else {
          callback()
        }
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      activeIndex: '1',
      meunId: window.sessionStorage.getItem('menuId'),

      ruleForm: {
        oldPassword: '',
        newPassword: '',
        rePassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 1, max: 20, message: '最长输入20位', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: checkPwd, trigger: 'blur' }
        ],
        rePassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      dialogVisible: false
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    loginOut() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    handleOpen() {
      this.dialogVisible = true
    },
    handleEdit() {
      this.$refs.refForm.validate(valid => {
        if(valid) {
          editPassword(this.ruleForm).then(res => {
            this.$message.success(res.msg)
            this.dialogVisible = false
          })
        }
      })
    },
    handleClose() {
      this.ruleForm = {
        oldPassword: '',
        newPassword: '',
        rePassword: ''
      }
      this.$refs.refForm.resetFields()
    }
  },
  computed: {
    menuId() {
      return window.sessionStorage.getItem('menuId')
    },
    nickName() {
      return window.sessionStorage.getItem('nickName')
    },
    image() {
      return window.sessionStorage.getItem('image')
    },
    collect() {
      return this.meunId.indexOf('项目发起') !== -1 || this.meunId.indexOf('材料补充') !== -1 || this.meunId.indexOf('立项补充') !== -1
    },
    center() {
      return this.meunId.indexOf('项目初审') !== -1 || this.meunId.indexOf('图纸复核') !== -1 || this.meunId.indexOf('项目终审') !== -1 || this.meunId.indexOf('项目分享') !== -1 || this.meunId.indexOf('项目总览') !== -1 || this.meunId.indexOf('项目统计') !== -1
    },
    manage() {
      return this.meunId.indexOf('账户管理') !== -1 || this.meunId.indexOf('角色管理') !== -1 || this.meunId.indexOf('机构管理') !== -1 || this.meunId.indexOf('下载管理') !== -1 
    }
  }
}
</script>

<style scoped>
  .el-container {
    width: 100%;
    height: 100%;
  }
  .el-header {
    height: 64px;
    display: flex;
    justify-content:space-between;
    border-bottom: 6px solid #1890FF;
  }
  .el-menu {
    margin-bottom: 15px;
  }
  .el-menu--horizontal {
    border-bottom: none !important;
  }
  .el-main {
    padding: 0;
    background-color: rgba(240, 242, 245, 1);
  }
  .left {
    display: flex;
  }
  .right {
    /* line-height: 64px; */
    margin-right: 20px;
  }
  h2 {
    margin: 11px 60px 11px 5px;
  }
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 15px;
  }
</style>>
