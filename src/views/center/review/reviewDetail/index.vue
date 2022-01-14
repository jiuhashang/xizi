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
          <el-button size="small" @click="handleApproval">审批记录</el-button>
          <el-button size="small" type="danger" @click="handleReject">驳回审核</el-button>
          <el-button size="small" type="primary" @click="handlePass">审核通过</el-button>
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
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">公司性质</el-col>
            <el-col :span="16" class="span130">
              <span v-if="seProjectCompanyInfo.companyType == 0">央企</span>
              <span v-else-if="seProjectCompanyInfo.companyType == 1">外资</span>
              <span v-else-if="seProjectCompanyInfo.companyType == 2">国企</span>
              <span v-else-if="seProjectCompanyInfo.companyType == 3">上市公司</span>
              <span v-else-if="seProjectCompanyInfo.companyType == 4">股份制</span>
              <span v-else>其他</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">建站地址</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyInfo.province }} {{ seProjectCompanyInfo.city }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">详细地址</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyInfo.setAddress }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:30px;">
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
        <div>屋面信息</div>
      </div>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">屋面总面积</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyBuildInfo.houseArea }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">建筑物个数</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyBuildInfo.buildNum }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">屋面正南遮挡物</el-col>
            <el-col :span="16" class="span130">
              <span v-if="seProjectCompanyBuildInfo.houseSouthScreenFlag ==0">否</span>
              <span v-else>是</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">屋顶使用年限</el-col>
            <el-col :span="16" class="span130">
              <span v-if="seProjectCompanyBuildInfo.useYears == 0">0-5年</span>
              <span v-else-if="seProjectCompanyBuildInfo.useYears == 1">6-10年</span>
              <span v-else-if="seProjectCompanyBuildInfo.useYears == 2">11-15年</span>
              <span v-else-if="seProjectCompanyBuildInfo.useYears == 3">16-20年</span>
              <span v-else-if="seProjectCompanyBuildInfo.useYears == 4">21-25年</span>
              <span v-else-if="seProjectCompanyBuildInfo.useYears == 5">26-30年</span>
              <span v-else>31年以上</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">屋面材质</el-col>
            <el-col :span="16" class="span130">
              <span v-show="seProjectCompanyBuildInfo.housePartType.indexOf(0) !== -1">&nbsp;瓦铄屋面</span>&nbsp;
              <span v-show="seProjectCompanyBuildInfo.housePartType.indexOf(1) !== -1">&nbsp;混泥土屋面</span>
              <span v-show="seProjectCompanyBuildInfo.housePartType.indexOf(2) !== -1">&nbsp;彩钢瓦屋面</span>
              <span v-show="seProjectCompanyBuildInfo.housePartType.indexOf(3) !== -1">&nbsp;其他</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">彩钢瓦类型</el-col>
            <el-col :span="16" class="span130">
              <span v-show="seProjectCompanyBuildInfo.colorSteelType.indexOf(0) !== -1">无</span>
              <span v-show="seProjectCompanyBuildInfo.colorSteelType.indexOf(1) !== -1">直立锁边</span>
              <span v-show="seProjectCompanyBuildInfo.colorSteelType.indexOf(2) !== -1">角齿</span>
              <span v-show="seProjectCompanyBuildInfo.colorSteelType.indexOf(3) !== -1">T型</span>
              <span v-show="seProjectCompanyBuildInfo.colorSteelType.indexOf(4) !== -1">其他</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">彩钢瓦比水泥顶</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyBuildInfo.colorSteelCementTopScale }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">其他屋面材质说明</el-col>
            <el-col :span="16" class="span130">{{ seProjectCompanyBuildInfo.otherMessage }}</el-col>
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
            <el-col :span="16" class="span130">
              <span v-if="seProjectPowerInfo.prowerType == 0">工业</span>
              <span v-else-if="seProjectPowerInfo.prowerType == 1">商业</span>
              <span v-else-if="seProjectPowerInfo.prowerType == 2">共用</span>
              <span v-else>居民用电</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">变压器容量</el-col>
            <el-col :span="16" class="span130">{{ seProjectPowerInfo.transformerVolume }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">变压器台数</el-col>
            <el-col :span="16" class="span130">{{ seProjectPowerInfo.transformerNum }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">预估装机容量</el-col>
            <el-col :span="16" class="span130">{{ seProjectPowerInfo.mayInstallVolume }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">法定节假日是否休息</el-col>
            <el-col :span="16" class="span130">
              <span v-if="seProjectPowerInfo.legalHolidayFlag == 1">是</span>
              <span v-else>否</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">周末生产情况</el-col>
            <el-col :span="16" class="span130">
              <span v-if="seProjectPowerInfo.weekendFlag == 0">单班</span>
              <span v-else-if="seProjectPowerInfo.weekendFlag == 1">双班</span>
              <span v-else>连续生产</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">中午设备是否停机</el-col>
            <el-col :span="16" class="span130">
              <span v-if="seProjectPowerInfo.noonEquipmentFlag == 1">是</span>
              <span v-else>否</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">其他供电说明</el-col>
            <el-col :span="16" class="span130">{{ seProjectPowerInfo.otherMessage }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-card style="margin-bottom:50px;">
        <div slot="header" class="clearfix">
          <span>变压器各台容量（选填）</span>
        </div>
        <div>
          <el-table :data="seProjectPowerTransformInfoList" style="width: 100%" :header-cell-style="{background:'#f2f2f2',color:'#555'}">
            <el-table-column prop="transformName" label="变压器名称" />
            <el-table-column prop="transformVolume" label="容量（kVA）" />
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
            <el-col :span="16" class="span130">
              <span v-if="seProjectCooperate.cooperateType == 0">业主投资</span>
              <span v-else>其他投资</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8" v-show="seProjectCooperate.cooperateType == 0">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">
              <el-checkbox v-model="seProjectCooperate.ownPutFlag" disabled></el-checkbox>
            </el-col>
            <el-col :span="16" class="span130">
              <span>业主自投，预算 : {{ seProjectCooperate.ownPutMoney }}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8" v-show="seProjectCooperate.cooperateType == 1">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">
              <el-checkbox v-model="seProjectCooperate.electricityDiscountFlag" disabled></el-checkbox>
            </el-col>
            <el-col :span="16" class="span130">
              <span>电费折扣，比例 : {{ seProjectCooperate.electricityDiscountScale }} %</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8" v-show="seProjectCooperate.cooperateType == 1">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">
              <el-checkbox v-model="seProjectCooperate.houseLeaseFlag" disabled></el-checkbox>
            </el-col>
            <el-col :span="16" class="span130">
              <span>出租屋面，租金 : {{ seProjectCooperate.houseLeaseMoney }}</span>
            </el-col>
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
            <el-col :span="16" class="span130">
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.realPropertyRightFile)"
              :disabled="seProjectRelevantFile.realPropertyRightFile == '' || seProjectRelevantFile.realPropertyRightFile == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">近12个月电费复核单</el-col>
            <el-col :span="16" class="span130">
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.nearYearElectricityBill)"
              :disabled="seProjectRelevantFile.nearYearElectricityBill == '' || seProjectRelevantFile.nearYearElectricityBill == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">结构图</el-col>
            <el-col :span="16" class="span130">
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.structureFile)"
              :disabled="seProjectRelevantFile.structureFile == '' || seProjectRelevantFile.structureFile == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">配电图内部照片</el-col>
            <el-col :span="16" class="span130">
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.electricityRoomInsideFile)"
              :disabled="seProjectRelevantFile.electricityRoomInsideFile == '' || seProjectRelevantFile.electricityRoomInsideFile == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">建筑图</el-col>
            <el-col :span="16" class="span130">
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.buildFile)"
              :disabled="seProjectRelevantFile.buildFile == '' || seProjectRelevantFile.buildFile == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">总平图</el-col>
            <el-col :span="16" class="span130">
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.generalLayoutFile)"
              :disabled="seProjectRelevantFile.generalLayoutFile == '' || seProjectRelevantFile.generalLayoutFile == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">厂房内部照片</el-col>
            <el-col :span="16" class="span130">
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.workShopInsideFile)"
              :disabled="seProjectRelevantFile.workShopInsideFile == '' || seProjectRelevantFile.workShopInsideFile == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">厂名正面照片</el-col>
            <el-col :span="16" class="span130">
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.workShopFrontFile)"
              :disabled="seProjectRelevantFile.workShopFrontFile == '' || seProjectRelevantFile.workShopFrontFile == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">屋顶细节照片</el-col>
            <el-col :span="16" class="span130">
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.houseTopDetailFile)"
              :disabled="seProjectRelevantFile.houseTopDetailFile == '' || seProjectRelevantFile.houseTopDetailFile == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">厂房内屋顶照片</el-col>
            <el-col :span="16" class="span130">
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.workShopInsideTopFile)"
              :disabled="seProjectRelevantFile.workShopInsideTopFile == '' || seProjectRelevantFile.projectOtherFile == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">项目发起额外材料</el-col>
            <el-col :span="16" class="span130">
              <el-button size="small" type="primary" @click="handleDown(seProjectRelevantFile.projectOtherFile)"
              :disabled="seProjectRelevantFile.projectOtherFile == '' || seProjectRelevantFile.projectOtherFile == null ">下 载</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="8" class="span13">项目发起额外说明</el-col>
            <el-col :span="16" class="span130">
              <span>{{ seProjectRelevantFile.projectOtherMessage }}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" @close="handleClose">
      <el-alert :title="alert" type="success" :closable="false" style="margin-top:0;" />
      <el-input type="textarea" :rows="3" placeholder="最多输入200字符（选填）" v-model="message" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog>
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
          :timestamp="activity.timestamp">
          {{activity.content}}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import { getProjectInfo, getProjectExamineLog } from '@/api/listProject'
import { projectSecondExamine } from '@/api/center'
export default {
  name: 'ReviewDetail',
  data() {
    return {
      province: '',
      city:'',
      activeName: 'first',
      projectId: '',
      seProjectCompanyInfo: {},
      seProjectCompanyBuildInfo: {}, 
      seProjectPowerInfo: {}, 
      seProjectPowerTransformInfoList: [], 
      seProjectCooperate: {}, 
      seProjectRelevantFile: {},
      yearSunShine: '',
      mayInstallVolume: '',
      seProjectProfitConfig: {
        projectId: this.$route.query.projectId,
        weightElectricityPrice: undefined,
      }, // 参数配置
      projectTotalProfitModel: {}, // 收益统计
      seProjectProfitCountList: [], //  收益表格数据

      // 审核
      dialogVisible: false,
      title: '',
      message: '',
      alert: '',
      type: '',
      // 审批记录
      logVisible: false,
      activities: []
    }
  },
  created() {
    this.projectId = this.$route.query.projectId
    this.getProjectInfo(this.projectId)
  },
  methods: {
    getProjectInfo() {
      getProjectInfo({ projectId: this.projectId }).then(res => {
        // console.log(res)
        const { seProjectCompanyInfo, seProjectCompanyBuildInfo, seProjectPowerInfo, seProjectPowerTransformInfoList, seProjectCooperate, seProjectRelevantFile } = res.data
        this.seProjectCompanyInfo = seProjectCompanyInfo
        this.seProjectCompanyBuildInfo = seProjectCompanyBuildInfo
        if(seProjectCompanyBuildInfo.housePartType) {
          this.seProjectCompanyBuildInfo.colorSteelType = seProjectCompanyBuildInfo.colorSteelType.split(',')
        }
        this.seProjectPowerInfo = seProjectPowerInfo
        this.seProjectPowerTransformInfoList = seProjectPowerTransformInfoList
        this.seProjectCooperate = seProjectCooperate
        if(seProjectCooperate.electricityDiscountFlag == 1) {
          this.seProjectCooperate.electricityDiscountFlag = true
        }
        if(seProjectCooperate.houseLeaseFlag == 1) {
          this.seProjectCooperate.houseLeaseFlag = true
        }
        if(seProjectCooperate.ownPutFlag == 1) {
          this.seProjectCooperate.ownPutFlag = true
        }
        this.seProjectRelevantFile = seProjectRelevantFile
      })
    },
    // 审批记录
    handleApproval(projectId) {
      this.logVisible = true
      getProjectExamineLog(projectId).then(res => {
        console.log(res)
      })
    },

    // 审核
    handleReject() {
      this.dialogVisible = true
      this.title = '驳回审核'
      this.alert = '进行审核通过处理，将项目提交至材料补充，请输入审核详情。'
      this.type = 0
    },
    handlePass() {
      this.dialogVisible = true
      this.title = '审核通过'
      this.alert = '审核驳回处理，请输入驳回理由'
      this.type = 1
    },
    handleConfirm() {
      projectSecondExamine({
        projectId: this.projectId,
        type: this.type,
        message: this.message
      }).then(res => {
        if( this.type == 0 ) {
          // console.log(res)
          this.$message.success('项目已驳回')
          this.dialogVisible = false
          this.$router.back()
        } else if( this.type == 1 ) {
          // console.log(res)
          this.$message.success('项目已通过')
          this.dialogVisible = false
          this.$router.back()
        }
      }).catch( err => {
        this.dialogVisible = false
      })
    },

    handleClose() {
      this.title = '',
      this.message = '',
      this.alert = ''
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