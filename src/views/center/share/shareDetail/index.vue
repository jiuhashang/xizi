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
        <div>项目信息</div>
      </div>
      <el-row :gutter="20" style="margin: 30px">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">创建时间</el-col>
            <el-col :span="16" class="span130">{{$route.query.createTime}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">业务人员</el-col>
            <el-col :span="16" class="span130">{{$route.query.createUserNickName}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">业务电话</el-col>
            <el-col :span="16" class="span130">{{$route.query.createUserPhone}}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 30px">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">项目名称</el-col>
            <el-col :span="16" class="span130">{{$route.query.projectName}}</el-col>
          </el-row>
        </el-col>
      </el-row>

      <div class="xian">
        <div>分享情况</div>
      </div>
      <div style="margin-top: 15px;text-align:right;">
        <el-button size="small">全部移除</el-button>
        <el-button type="primary" size="small">添加机构</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#f2f2f2',color:'#555'}">
        <el-table-column label="机构名称" />
        <el-table-column label="联系人" />
        <el-table-column label="加入分享时间" />
        <el-table-column label="权限管理" />
        <el-table-column label="其他">
          <template>
            <el-button type="text">分享权限</el-button>
            <el-button type="text" style="color:red;">移除分享</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ShareDetail',
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

.xian {
  color: #1890ff;
  border-bottom: 1px solid #1890ff;
  padding-bottom: 5px;
  div {
    border-left: 4px solid #1890ff;
    padding-left: 15px;
  }
}
.span13 {
    font-size: 13px;
    color: #aaa;
    text-align: right;
  }
  .span130 {
    font-size: 13px;
    color: #000;
  }
</style>
