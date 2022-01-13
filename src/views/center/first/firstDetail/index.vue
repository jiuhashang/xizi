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
          <el-button size="small">终止项目</el-button>
          <el-button size="small">工商数据查看</el-button>
          <el-button size="small">审批记录</el-button>
          <el-button size="small" type="danger">驳回审核</el-button>
          <el-button size="small" type="primary">进入补充</el-button>
          <el-button size="small" type="primary">直接终审</el-button>
          <el-button size="small" type="primary">进入复核</el-button>
        </div>
      </div>
    </div>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="审核材料" name="first">
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
        </el-tab-pane>

        <el-tab-pane label="收益测算" name="second">
          <div class="xian">
            <div>项目数据</div>
          </div>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">建站地址</el-col>
                <el-col :span="16" class="span130">{{ seProjectCompanyInfo.province }} {{ seProjectCompanyInfo.city }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">年日照</el-col>
                <el-col :span="16" class="span130">{{ yearSunShine }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">预估装机容量</el-col>
                <el-col :span="16" class="span130">{{ mayInstallVolume }}</el-col>
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
                  <el-select v-model="seProjectCompanyBuildInfo.colorSteelType" multiple placeholder="请选择(可多选)" class="width100" clearable>
                    <el-option label="直立锁边" value="1"></el-option>
                    <el-option label="角齿" value="2"></el-option>
                    <el-option label="T型" value="3"></el-option>
                    <el-option label="其它" value="4"></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin:30px;">
            <el-col :span="8">
              <el-row :gutter="20">
                <el-col :span="8" class="span13">彩钢瓦比水泥顶</el-col>
                <el-col :span="16" class="span130">
                  <el-input v-model="seProjectCompanyBuildInfo.colorSteelCementTopScale" class="width100" placeholder="请输入" clearable>
                  <span slot="suffix">%</span>
                </el-input>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

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

          <div class="xian" style="display:flex;justify-content:space-between;">
            <div>参数配置</div>
            <el-button type="primary" size="mini">测算数据</el-button>
          </div>
          <el-form ref="form" :model="seProjectProfitConfig" label-width="130px">
            <el-row :gutter="20" style="margin:30px 30px 0 30px;">
              <el-col :span="8">
                <el-row :gutter="20">
                  <el-col :span="8" class="span13">脱硫煤电价</el-col>
                  <el-col :span="16" class="span130">{{ seProjectProfitConfig.desulfurizeElectricityPrice }} 元/KWH</el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-form-item label="加权电价">
                  <el-input v-model="seProjectProfitConfig.weightElectricityPrice" @input="handleBlur" clearable>
                    <span slot="suffix">元/KWH</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-row :gutter="20">
                  <el-col :span="8" class="span13">折后电价</el-col>
                  <el-col :span="16" class="span130">{{   seProjectProfitConfig.discountElectricityPrice }} 元/KWH</el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin:30px;">
              <el-col :span="8">
                <el-form-item label="每年固定运维费用">
                  <el-input v-model="seProjectProfitConfig.yearRepairPrice" clearable>
                    <span slot="suffix">元/瓦</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="第10年运维费用">
                  <el-input v-model="seProjectProfitConfig.tenRepairPrice" clearable>
                    <span slot="suffix">元/瓦</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="第15年运维费用">
                  <el-input v-model="seProjectProfitConfig.fifteenRepairPrice" clearable>
                    <span slot="suffix">元/瓦</span>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin:0 30px 30px 30px;">
              <el-col :span="8">
                <el-form-item label="自发自用比例">
                  <el-input v-model="seProjectProfitConfig.selfUseScale" clearable>
                    <span slot="suffix">%</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="单瓦价格">
                  <el-input v-model="seProjectProfitConfig.unitPrice" clearable>
                    <span slot="suffix">元/瓦</span>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="并网电压类型">
                  <el-select v-model="seProjectProfitConfig.voltageType" placeholder="请选择" class="width100">
                    <el-option label="高压" :value="1"></el-option>
                    <el-option label="低压" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <div class="xian">
            <div>测算结果</div>
          </div>
          <div style="margin-top:15px;display:flex;justify-content:space-around;">
            <div class="t1" style="background-color:#3C4563;">
              <h3>全投资内部收益率</h3>
              <h1>12.00%</h1>
            </div>
            <div class="t1" style="background-color:#8892DF;">
              <h3>投资偿还期（年）</h3>
              <h1>12.00%</h1>
            </div>
            <div class="t1" style="background-color:#6FACFD;">
              <h3>总投资费用（万元）</h3>
              <h1>12.00%</h1>
            </div>
            <div class="t1" style="background-color:#ED7E77;">
              <h3>首年发电量</h3>
              <h1>12.00%</h1>
            </div>
          </div>
          <div style="margin-top:15px;display:flex;justify-content:space-around;">
            <div class="b1">
              <div style="display:flex;justify-content:space-between;">
                <p>发电总效益（万元）</p>
                <h3>1212.12</h3>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <p>每年均值（万元）</p>
                <h3>1212.12</h3>
              </div>
            </div>
            <div class="b1">
              <div style="display:flex;justify-content:space-between;">
                <p>总净利润（万元）</p>
                <h3>1212.12</h3>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <p>每年均值（万元）</p>
                <h3>1212.12</h3>
              </div>
            </div>
            <div class="b1">
              <div style="display:flex;justify-content:space-between;">
                <p>投资方总收入（万元）</p>
                <h3>1212.12</h3>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <p>每年均值（万元）</p>
                <h3>1212.12</h3>
              </div>
            </div>
            <div class="b1">
              <div style="display:flex;justify-content:space-between;">
                <p>自投总收入（万元）</p>
                <h3>1212.12</h3>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <p>每年均值（万元）</p>
                <h3>1212.12</h3>
              </div>
            </div>
          </div>
          <el-table border style="width: 100%;margin-top:50px;" :header-cell-style="{background:'#f2f2f2',color:'#555'}">
            <el-table-column label="年份" />
            <el-table-column label="发电量" />
            <el-table-column label="企业自用电量" />
            <el-table-column label="企业用电收入万元" />
            <el-table-column label="余电上网电量" />
            <el-table-column label="余电上网收入万元" />
            <el-table-column label="自投总收入万元" />
            <el-table-column label="企业用电收益万元" />
            <el-table-column label="投资方收入万元" />
            <el-table-column label="企业分享节能效益" />
            <el-table-column label="运维支出万元" />
            <el-table-column label="净利润万元" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getProjectInfo } from '@/api/listProject'
import { getProfitMessage } from '@/api/center'

export default {
  name: 'FirstDetail',
  data() {
      return {
        activeName: 'second',
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
        }, // 参数配置
      }
    },
    created() {
      this.projectId = this.$route.query.projectId
      this.getProjectInfo(this.projectId)
    },
    methods: {
      handleClick(tab, event) {
        if(this.activeName == 'second') {
          getProfitMessage({ projectId: this.projectId}).then(res => {
            console.log('11', res)
            const { yearSunShine, mayInstallVolume, seProjectProfitConfig } = res.data
            this.yearSunShine = yearSunShine
            this.mayInstallVolume = mayInstallVolume
            this.seProjectProfitConfig = seProjectProfitConfig
          })
        }
      },
      getProjectInfo() {
        getProjectInfo({ projectId: this.projectId }).then(res => {
          console.log(res)
          const { seProjectCompanyInfo, seProjectCompanyBuildInfo, seProjectPowerInfo, seProjectPowerTransformInfoList, seProjectCooperate, seProjectRelevantFile } = res.data
          this.seProjectCompanyInfo = seProjectCompanyInfo
          this.seProjectCompanyBuildInfo = seProjectCompanyBuildInfo
          if(seProjectCompanyBuildInfo.housePartType) {
            this.seProjectCompanyBuildInfo.colorSteelType = seProjectCompanyBuildInfo.colorSteelType.split(',')
          }
          console.log()
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
      handleBlur() { // 计算折后电价
        if(this.seProjectCooperate.electricityDiscountScale) {
            this.seProjectProfitConfig.discountElectricityPrice =  this.seProjectProfitConfig.weightElectricityPrice * ((this.seProjectCooperate.electricityDiscountScale)/100)
        } else {
            this.seProjectProfitConfig.discountElectricityPrice = this.seProjectProfitConfig.weightElectricityPrice * 1
        }
      },
      handleDown(url) {
        window.open(url)
      },
    },
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
  .t1 {
    width: 312px;
    height: 116px;
    color: #fff;
    background-color: #f2f2f2;
    h3 {
      margin-left: 15px;
    }
    h1 {
      text-align: center;
    }
  }
  .b1 {
    width: 312px;
    height: 116px;
    box-sizing: border-box;
    padding: 0 20px;
    background-color: #E8E8EE;
  }
</style>