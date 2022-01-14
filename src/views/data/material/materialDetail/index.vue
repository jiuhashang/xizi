<template>
  <div>
    <div class="shang">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>资料收集</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="back">
        <div @click="$router.back()" style="width:240px;">
          <h2>&lt; {{ $route.meta.title }}</h2>
        </div>
        <div class="btnnn">
          <el-button size="small" @click="approval">审批记录</el-button>
          <el-button size="small" type="warning" @click="save">保 存</el-button>
          <el-button size="small" type="primary" @click="sub">提交审核</el-button>
        </div>
      </div>
    </div>
    <el-card>
      <div class="xian">
        <div>项目信息</div>
      </div>
      <el-row :gutter="20" style="margin-top:30px;">
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
      <el-row :gutter="20" style="margin-top:30px;margin-bottom:30px;">
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
      <el-row :gutter="20" style="margin-top:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">公司名称</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyInfo.companyName }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">统一社会信用代码</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyInfo.sameCreditCode }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">注册资本</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyInfo.registerMoney }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">公司性质</el-col>
            <el-col :span="16" class="span130">
                <span v-show="seProjectCompanyInfo.companyType == 0">央企</span>
                <span v-show="seProjectCompanyInfo.companyType == 1">外资</span>
                <span v-show="seProjectCompanyInfo.companyType == 2">国企</span>
                <span v-show="seProjectCompanyInfo.companyType == 3">上市公司</span>
                <span v-show="seProjectCompanyInfo.companyType == 4">股份制</span>
                <span v-show="seProjectCompanyInfo.companyType == 5">其他</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">建站地址</el-col>
            <el-col :span="16" class="span130">
              {{seProjectCompanyInfo.province}} {{seProjectCompanyInfo.city}}
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">详细地址</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyInfo.setAddress }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:30px;margin-bottom:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">公司联系人</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyInfo.legalPerson }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">联系人手机号</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyInfo.companyPhone }}</el-col>
          </el-row>
        </el-col>
      </el-row>

      <div class="xian">
        <div>近3年销售与利润</div>
      </div>
      <table style="width: 100%;text-align: center" cellpadding="0" cellspacing="0">
        <tr>
          <td></td>
          <td>2019年</td>
          <td>2020年</td>
          <td>2021年</td>
        </tr>
        <tr>
          <td>年销售额（万元）</td>
          <td>
            <el-input placeholder="请输入">
              <span slot="suffix">万元</span>
            </el-input>
          </td>
          <td>
            <el-input placeholder="请输入">
              <span slot="suffix">万元</span>
            </el-input>
          </td>
          <td>
            <el-input placeholder="请输入">
              <span slot="suffix">万元</span>
            </el-input>
          </td>
        </tr>
        <tr>
          <td>年利润额（万元）</td>
          <td>
            <el-input placeholder="请输入">
              <span slot="suffix">万元</span>
            </el-input>
          </td>
          <td>
            <el-input placeholder="请输入">
              <span slot="suffix">万元</span>
            </el-input>
          </td>
          <td>
            <el-input placeholder="请输入">
              <span slot="suffix">万元</span>
            </el-input>
          </td>
        </tr>
      </table>
      <!-- <el-form ref="tableListRef">
        <el-table :data="tableData" border style="width: 100%;margin:20px 0 30px 0;">
          <el-table-column type="index" :index="indexMethod" width="300px" />
          <el-table-column label="2019年">
            <template>
              <el-input placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column label="2020年">
            <template>
              <el-input placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column label="2021年">
            <template>
              <el-input placeholder="请输入" />
            </template>
          </el-table-column>
        </el-table>
      </el-form> -->

      <div class="xian">
        <div>其他材料</div>
      </div>
      <el-form :model="seProjectSupplementFile" style="margin-left:57px;margin-top:30px;" label-width="140px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="近3年财务报告" class="must-form-item">
              <file-upload-string
                v-model="seProjectSupplementFile.nearThreeYearFinanceReport"
                :limit="1"
                accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm">
              </file-upload-string>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="padding-left:30px;">
            <el-form-item label="材料补充额外材料">
              <file-upload-string
              v-model="seProjectSupplementFile.otherFile"
                :limit="1"
                accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm">
              </file-upload-string>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="补充说明">
          <el-input placeholder="请输入" class="width100"></el-input>
        </el-form-item>
      </el-form>
      
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
    </el-card>
  </div>
</template>

<script>
import { getProjectInfo, getProjectExamineLog, relevantInput, relevantInputSubmit } from '@/api/listProject'

export default {
  name: 'MaterialDetail',
  data() {
    return {
      projectId: '',
      seProjectCompanyInfo: { // 业主信息
        projectId: this.$route.query.projectId
      }, 
      // tableData: [{},{}],
      seProjectNearThreeYearSellProfixList: [
        { yearNum: 2019, sellMoney: '', profix: '' },
        { yearNum: 2020, sellMoney: '', profix: '' },
        { yearNum: 2021, sellMoney: '', profix: '' },
      ],
      logVisible: false, // 审批记录
      activities: [],
      seProjectCompanyBuildInfo: {}, // 屋面信息
      seProjectCooperate: {}, // 合作模式
      seProjectNearThreeYearSellProfixList: [], // 近三年
      seProjectPowerInfo: {}, // 供电现状
      seProjectPowerTransformInfoList: [], // 变压器列表
      seProjectRelevantFile: {}, // 相关材料
      seProjectSupplementFile: {  // 其他材料
        projectId: this.$route.query.projectId
      }, 
    }
  },
  created() {
    this.projectId = this.$route.query.projectId
    this.getProjectInfo(this.projectId)
  },
  watch: {
    tableData(oldVal, newVal) {
      console.log(oldVal, newVal)
    }
  },
  methods: {
    // 表格自定义索引
    // indexMethod(index) {
    //   return ['年销售额（万元）','年利润额（万元）'][index]
    // },

    getProjectInfo() {
      getProjectInfo({ projectId: this.projectId }).then(res => {
        console.log(res)
        const { seProjectCompanyInfo, seProjectCompanyBuildInfo, seProjectCooperate, seProjectNearThreeYearSellProfixList, seProjectPowerInfo, seProjectPowerTransformInfoList, seProjectRelevantFile, seProjectSupplementFile } = res.data
        this.seProjectCompanyInfo = { ...seProjectCompanyInfo }
        this.seProjectNearThreeYearSellProfixList = seProjectNearThreeYearSellProfixList 
        if( seProjectSupplementFile ) { this.seProjectSupplementFile = { ...seProjectSupplementFile }}
        this.seProjectCompanyBuildInfo = seProjectCompanyBuildInfo
        this.seProjectCooperate = seProjectCooperate
        this.seProjectPowerInfo = seProjectPowerInfo
        this.seProjectPowerTransformInfoList = seProjectPowerTransformInfoList
        this.seProjectRelevantFile = seProjectRelevantFile
      })
    },
    // 保存
    save() {
      relevantInput({
        projectId: this.projectId,
        seProjectSupplementFile: this.seProjectSupplementFile,
        seProjectCompanyInfo: this.seProjectCompanyInfo,
        seProjectCompanyBuildInfo: this.seProjectCompanyBuildInfo,
        seProjectCooperate: this.seProjectCooperate,
        seProjectNearThreeYearSellProfixList: this.seProjectNearThreeYearSellProfixList,
        seProjectPowerInfo: this.seProjectPowerInfo,
        seProjectPowerTransformInfoList: this.seProjectPowerTransformInfoList,
        seProjectRelevantFile: this.seProjectRelevantFile
      }).then(res => {
        console.log(res)
        this.$message.success(res.msg)
        this.getProjectInfo(this.projectId)
      })
    },
    // 提交
    sub() {
      relevantInputSubmit({ projectId: this.projectId }).then(res => {
        console.log(res)
        this.$router.back()
      })
    },
    // 审批记录
    approval() {
      this.logVisible = true
      getProjectExamineLog({ projectId: this.projectId }).then( res => {
        this.activities = res.data
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
  .custom-upload-files {
    text-align: left;
  }
  .must-form-item {
    /deep/ .el-form-item__label:before {
      content: '*';
      color: red;
      margin-right: 4px;
    }
  }
  table {
    width: 100%;
    height: 200px;
    margin: 30px 0;
    border-collapse:collapse; 
    border: 1px solid #aaa;
    tr {
      border: 1px solid #aaa;
      td {
        border: 1px solid #aaa;
        width: 25%;
      }
    }
  }
  .el-input {
    width: 90%;
  }
  /deep/ .el-input__suffix {
    top: 10px;
  }
</style>
