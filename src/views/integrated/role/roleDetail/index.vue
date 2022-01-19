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
          <el-button v-else size="small" type="primary">创 建</el-button>
        </div>
      </div>
    </div>
     <el-card>
        <h3>角色信息</h3>
        <el-row :gutter="20" style="margin: 0 50px;">
          <el-col :span="10">
            <el-form ref="infoRef" :model="infoForm" label-width="80px">
              <el-form-item label="角色名称">
                <el-input v-model="infoForm.roleName" placeholder="请输入角色名称"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="infoForm.remark" placeholder="请输入备注"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <h3>权限配置</h3>
      </el-card>
  </div>
</template>

<script>
import { getRoleList } from '@/api/integrated'

export default {
  name: 'RoleDetail',
  data() {
    return {
      id: '',
      infoForm: {
        roleName: '',
        remark: ''
      }
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
        this.infoForm.roleName = roleName
        this.infoForm.remark = remark
      })
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