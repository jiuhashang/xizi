<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>审批中心</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="back">
        <div @click="$router.back()" style="width:240px;">
          <h2>&lt; {{ $route.meta.title }}</h2>
        </div>
        <div class="btnnn">
          <el-button size="small">审批记录</el-button>
          <el-button size="small" type="danger">驳回审核</el-button>
          <el-button size="small" type="primary">审核通过</el-button>
        </div>
      </div>
    </div>
    <el-card>
          <div class="xian">
            <div>项目信息</div>
          </div>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">创建时间</el-col>
                <el-col :span="16" class="span130">{{ $route.query.createTime }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">业务人员</el-col>
                <el-col :span="16" class="span130">{{ $route.query.createUserNickName }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">业务电话</el-col>
                <el-col :span="16" class="span130">{{ $route.query.createUserPhone }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">项目名称</el-col>
                <el-col :span="16" class="span130">{{ $route.query.projectName }}</el-col>
              </el-row>
            </el-col>
          </el-row>

          <div class="xian">
            <div>业主信息</div>
          </div>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">公司名称</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">统一社会信用代码</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">注册资本</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">公司性质</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">建站地址</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">详细地址</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">公司联系人</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">联系人手机号</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>

          <div class="xian">
            <div>屋面信息</div>
          </div>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">屋面总面积</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">建筑物个数</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">屋面正南遮挡物</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">屋顶使用年限</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">屋面材质</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">彩钢瓦类型</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">彩钢瓦比水泥顶</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">其他屋面材质说明</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>

          <div class="xian">
            <div>供电现状</div>
          </div>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">供电类型</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">变压器容量</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">变压器台数</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">预估装机容量</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">法定节假日是否休息</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">周末生产情况</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">中午设备是否停机</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">其他供电说明</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-card style="margin-bottom:50px;">
            <div slot="header" class="clearfix">
              <span>变压器各台容量（选填）</span>
            </div>
            <div>
              <el-table style="width: 100%" :header-cell-style="{background:'#f2f2f2',color:'#555'}">
                <el-table-column label="变压器名称" />
                <el-table-column label="容量（kVA）" />
                <!-- <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="danger" size="small" @click="deleteData(scope.row)">删除</el-button>
                    <el-button type="info" size="small" @click="editData(scope.row)">编辑</el-button>
                  </template>
                </el-table-column> -->
              </el-table>
            </div>
          </el-card>
          
          <div class="xian">
            <div>合作模式</div>
          </div>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">合作模式</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>

          <div class="xian">
            <div>相关材料</div>
          </div>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">不动产权证或三证</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">近12个月电费复核单</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">结构图</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">配电图内部照片</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">建筑图</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">总平图</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">厂房内部照片</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">厂名正面照片</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">屋顶细节照片</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">厂房内屋顶照片</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">项目发起额外材料</el-col>
                <el-col :span="16" class="span130">{{  }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="4" class="span13">项目发起额外说明</el-col>
            <el-col :span="20">

            </el-col>
          </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ReviewDetail',
  
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
    color: #1890FF;
    border-bottom: 1px solid #1890FF;
    padding-bottom: 5px;
    div {
      border-left: 4px solid #1890FF;
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
  .el-alert {
    margin: 15px 0;
  }
  /deep/  .el-checkbox__label {
    padding-left: 0;
  }
  .custom-upload-files {
    text-align: left;
  }

</style>