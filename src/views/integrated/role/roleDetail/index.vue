<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>综合管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="id">编辑角色</el-breadcrumb-item>
        <el-breadcrumb-item v-else>创建角色</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="back">
        <div @click="$router.back()" style="width:240px;">
          <h2>&lt; 角色管理</h2>
        </div>
        <div class="btnnn">
          <el-button size="small">取 消</el-button>
          <el-button v-if="id" size="small" type="primary">保 存</el-button>
          <el-button v-else size="small" type="primary" @click="handleAddRole">创 建</el-button>
        </div>
      </div>
    </div>
     <el-card>
        <h3>角色信息</h3>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-row :gutter="20">
              <el-col :span="8" style="text-align:right;margin-top:5px;"><span style="color:red;">*</span> 角色名称</el-col>
              <el-col :span="16">
                <el-input v-model="addRoleInfo.roleName" placeholder="请输入"></el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:10px;">
          <el-col :span="8">
            <el-row :gutter="20">
              <el-col :span="8" style="text-align:right;margin-top:5px;">备注</el-col>
              <el-col :span="16">
                <el-input v-model="addRoleInfo.remark" placeholder="请输入"></el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <h3>权限配置</h3>
        <div style="margin-left:110px;">
          <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1" @change="handleCheckAllChange1">资料收集</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities1" @change="handleCheckedCitiesChange1" style="margin-left:30px;">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <!-- <div style="margin: 15px 0 0 110px;">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">审批中心</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" style="margin-left:30px;">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div> -->
        <!-- <div style="margin:15px 0 0 110px;">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">综合管理</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" style="margin-left:30px;">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </div> -->
      </el-card>
  </div>
</template>

<script>
import { getRoleList, addRole } from '@/api/integrated'
const dataCollection = ['项目发起', '材料补充', '立项补充']
const approvalCenter = ['项目初审', '图纸复核', '项目终审', '项目预览']
const integrate = ['账户管理', '角色管理', '下载管理']
export default {
  name: 'RoleDetail',
  data() {
    return {
      addRoleInfo: {
        id: '',
        roleName: '',
        roleType: '',
        remark: '',
        menuId: ''
      },
      
      checkAll1: false,
      checkedCities1: [],
      cities: dataCollection,
      isIndeterminate1: true
    }
  },
  created() {
    this.id = this.$route.query.id
    if( this.id ) {
      this.getRoleList()
    }
  },
  methods: {
    getRoleList() {
      getRoleList({ id: this.id }).then(res => {
        console.log(res)
        const { roleName, remark } = res.data
        this.addRoleInfo.roleName = roleName
        this.addRoleInfo.remark = remark
      })
    },
    handleCheckAllChange1(val) {
      this.checkedCities = val ? dataCollection : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange1(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleAddRole() { // 创建角色
      addRole(this.addRoleInfo).then(res => {
        // console.log(res)
        this.$message.success(res.msg)
        this.$router.back()
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
    .back {
      position: relative;
      .btnnn {
        position: absolute;
        bottom: 0;
        right: 15px;
      }
    }
    h2 {
      padding-left: 25px;
      cursor: pointer;
    }
  }
</style>