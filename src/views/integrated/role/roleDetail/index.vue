<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>综合管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="back">
        <div @click="$router.back()" style="width:240px;">
          <h2>&lt; {{ $route.meta.title }}</h2>
        </div>
        <div class="btnnn">
          <el-button size="small">取 消</el-button>
          <el-button size="small" type="primary">创 建</el-button>
        </div>
      </div>
      <el-card>
        <h3>角色信息</h3>
        <el-row :gutter="20" style="margin: 0 50px;">
          <el-col :span="10">
            <el-form ref="infoRef" :model="infoForm" label-width="80px">
              <el-form-item label="角色名称">
                <el-input v-model="infoForm.name" placeholder="请输入角色名称"></el-input>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="infoForm.name" placeholder="请输入备注"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <h3>权限配置</h3>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoleDetail',
  data() {
    return {
      infoForm: {}
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