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
          <el-button size="small" type="warning" @click="handleSave">保 存</el-button>
        </div>
      </div>
    </div>
    <el-card>
      <ProjectInfo />
      <OwnerInfo :seProjectCompanyInfo="seProjectCompanyInfo" />

      <div class="xian">
        <div>相关材料</div>
      </div>
      <el-alert title="如文件较多，可将文件进行压缩打包上传，并等待文件完成上传。" type="success" :closable="false" />
      <el-form ref="relevantFileForm" :rules="relevantFileRules" :model="seProjectRelevantFile" style="margin-left:57px;margin-top:30px;" label-width="160px">
        <!-- <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="不动产权证或三证" prop="realPropertyRightFile" class="must-form-item">
              <file-upload-string
                v-model="seProjectRelevantFile.realPropertyRightFile"
                :limit="1" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="近12个月电费复核单" prop="nearYearElectricityBill" class="must-form-item">
              <file-upload-string
                v-model="seProjectRelevantFile.nearYearElectricityBill"
                :limit="1" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结构图" prop="structureFile" class="must-form-item">
              <file-upload-string
                v-model="seProjectRelevantFile.structureFile"
                :limit="1" />
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="配电室内部照片">
              <file-upload-string
                v-model="seProjectRelevantFile.electricityRoomInsideFile"
                :limit="1" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建筑图">
              <file-upload-string
                v-model="seProjectRelevantFile.buildFile"
                :limit="1" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="总平图">
              <file-upload-string
                v-model="seProjectRelevantFile.generalLayoutFile"
                :limit="1" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="厂房内部照片">
              <file-upload-string
                v-model="seProjectRelevantFile.workShopInsideFile"
                :limit="1" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="厂名正面照片">
              <file-upload-string
                v-model="seProjectRelevantFile.workShopFrontFile"
                :limit="1" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="屋顶细节照片">
              <file-upload-string
                v-model="seProjectRelevantFile.houseTopDetailFile"
                :limit="1" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="厂房内屋顶照片">
              <file-upload-string
                v-model="seProjectRelevantFile.workShopInsideTopFile"
                :limit="1" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目发起额外材料">
              <file-upload-string
                v-model="seProjectRelevantFile.projectOtherFile"
                :limit="1" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="项目发起额外说明">
              <el-input type="textarea" autosize v-model="seProjectRelevantFile.projectOtherMessage" class="width100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="xian">
        <div>立项补充</div>
      </div>
      <el-form ref="form" :model="seProjectEndSupplementFile" style="margin-left:60px;margin-top:30px;" label-width="140px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="能源管理合同" class="must-form-item">
              <file-upload-string
                v-model="seProjectEndSupplementFile.energyContractFile"
                :limit="1">
              </file-upload-string>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="padding-left:25px;">
            <el-form-item label="项目建议书" class="must-form-item">
              <file-upload-string
                v-model="seProjectEndSupplementFile.adviseBookFile"
                :limit="1">
              </file-upload-string>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="padding-left:48px;">
            <el-form-item label="备案文件" class="must-form-item">
              <file-upload-string
                v-model="seProjectEndSupplementFile.recordFile"
                :limit="1">
              </file-upload-string>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="接入文件" class="must-form-item">
              <file-upload-string
                v-model="seProjectEndSupplementFile.insertFile"
                :limit="1">
              </file-upload-string>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="padding-left:25px;">
            <el-form-item label="营业执照" class="must-form-item">
              <file-upload-string
                v-model="seProjectEndSupplementFile.businessFile"
                :limit="1">
              </file-upload-string>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="padding-left:48px;">
            <el-form-item label="关联项目公司" class="must-form-item">
              <el-input v-model="seProjectEndSupplementFile.projectCompanyName" placeholder="请输入" clearable @input="handleInput" @clear="handleClear" />
            </el-form-item>
            <div class="divul" v-show="options.length">
              <ul style="list-style: none;">
                <li v-for="(item, index) in options" :key="item.id" class="divli" @click="handleSelect(item, index)">{{ item.name }}</li>
              </ul>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="补充说明">
              <el-input type="textarea" autosize v-model="seProjectEndSupplementFile.otherMessage" class="width100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 审批记录 -->
      <ApprovalLog :logVisible.sync="logVisible" :activities="activities" />
    </el-card>
  </div>
</template>

<script> 
import { getProjectInfo, getProjectExamineLog, setProjectInput, getByCompanyName } from '@/api/listProject'

import ApprovalLog from '@/components/Log/ApprovalLog.vue'
import ProjectInfo from '@/components/Project/ProjectInfo.vue'
import OwnerInfo from '@/components/Project/OwnerInfo.vue'

export default {
  name: 'AddedDetail',
  data() {
    return {
      projectId: '',
      logVisible: false, // 审批记录
      activities: [],
      seProjectCompanyInfo: {}, // 业主信息
      seProjectRelevantFile: {
        projectId: undefined
      }, // 相关材料
      seProjectEndSupplementFile: { // 立项补充
        projectId: undefined
      }, 
      options: [],
    }
  },
  components: { ApprovalLog, ProjectInfo, OwnerInfo },
  created() {
    this.projectId = this.$route.query.projectId
    this.seProjectRelevantFile.projectId = this.projectId
    this.seProjectEndSupplementFile.projectId = this.projectId
    this.getProjectInfo( this.projectId )
  },
  methods: {
    getProjectInfo( projectId ) {
      getProjectInfo({ projectId }).then(res => {
        const { seProjectCompanyInfo, seProjectRelevantFile, seProjectEndSupplementFile } = res.data
        this.seProjectCompanyInfo = seProjectCompanyInfo
        this.seProjectRelevantFile = { ...seProjectRelevantFile }
        this.seProjectEndSupplementFile = { ...seProjectEndSupplementFile }
      })
    },
    handleInput() {
      getByCompanyName({ companyName: this.seProjectEndSupplementFile.projectCompanyName }).then(res => {
        console.log(res)
        this.options = res.data.orders
      })
    },
    handleSelect(item, index) {

    },
    handleClear() {},
     // 审批记录
    approval() {
      getProjectExamineLog({ projectId: this.projectId }).then( res => {
        this.activities = res.data
      })
      this.logVisible = true
    },
    // 保存
    handleSave() {
      setProjectInput({
        seProjectRelevantFile: this.seProjectRelevantFile, 
        seProjectEndSupplementFile: this.seProjectEndSupplementFile 
      }).then(res => {
        this.$message.success('保存成功')
        this.getProjectInfo(this.projectId)
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
  .divul {
    width: 300px;
    height: 310px;
    background-color: #fff;
    position: absolute;
    top: 170px;
    left: 153px;
    border:1px solid #DCDFE6;
    border-radius: 5px;
  }
  .divli {
    margin-bottom: 10px;
  }
/deep/ .el-button--primary.is-disabled {
  background-color: #eee;
  border-color: #eee;
}
</style>
