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
          <el-button size="small" v-show="firstExamine == 0 || firstExamine	 == 2" type="warning" :loading="saveLoading" @click="save">保 存</el-button>
          <el-button size="small" v-show="firstExamine == 0 || firstExamine	 == 2" type="primary" :loading="subLoading" @click="sub">提交审核</el-button>
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
            <el-col :span="7" class="span13">创建时间</el-col>
            <el-col :span="16" class="span130">{{ $route.query.createTime }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="6" class="span13">业务人员</el-col>
            <el-col :span="16" class="span130">{{ $route.query.createUserNickName }}</el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="5" class="span13" style="padding-right:15px;">业务电话</el-col>
            <el-col :span="16" class="span130" style="padding-left:0;">{{ $route.query.createUserPhone }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:30px;margin-bottom:30px;">
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="7" class="span13">项目名称</el-col>
            <el-col :span="16" class="span130">{{ $route.query.projectName }}</el-col>
          </el-row>
        </el-col>
      </el-row>
      
      <div class="xian">
        <div>业主信息</div>
      </div>
      <el-form ref="companyInfoForm" :rules="companyInfoRules" :disabled="firstExamine == 1 || firstExamine == 3 || firstExamine == 99" :model="seProjectCompanyInfo" label-width="130px">
        <el-row :gutter="20" style="margin-top:30px;">
          <el-col :span="8">
            <el-row :gutter="20">
              <el-col :span="7" class="span13">公司名称</el-col>
              <el-col :span="16" class="span130">{{ $route.query.companyName }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row :gutter="20">
              <el-col :span="6" class="span13">统一社会信用代码</el-col>
              <el-col :span="16" class="span130">{{ seProjectCompanyInfo.sameCreditCode }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row :gutter="20">
              <el-col :span="5" class="span13" style="padding-right:15px;">注册资本</el-col>
              <el-col :span="16" class="span130" style="padding-left:0;">{{ seProjectCompanyInfo.registerMoney }}</el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin:30px 30px 10px 30px;">
          <el-col :span="8">
            <el-form-item label="公司性质" prop="companyType" class="must-form-item">
              <el-select v-model="seProjectCompanyInfo.companyType" clearable placeholder="请选择" class="width100">
                <el-option label="央企" :value="0"></el-option>
                <el-option label="外资" :value="1"></el-option>
                <el-option label="国企" :value="2"></el-option>
                <el-option label="上市公司" :value="3"></el-option>
                <el-option label="股份制" :value="4"></el-option>
                <el-option label="其他" :value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建站地址" prop="value" class="must-form-item">
              <el-cascader
                v-model="seProjectCompanyInfo.value"
                :options="options"
                :props="{ expandTrigger: 'hover', label:'province', value: 'province', children:'cities' }"
                @change="handleChange"
                clearable
                class="width100" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="详细地址" prop="setAddress">
              <el-input v-model="seProjectCompanyInfo.setAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin:0 30px 30px 30px;">
          <el-col :span="8">
            <el-form-item label="公司联系人" prop="legalPerson">
              <el-input v-model="seProjectCompanyInfo.legalPerson"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人手机号" prop="companyPhone">
              <el-input v-model="seProjectCompanyInfo.companyPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="xian">
        <div>屋面信息</div>
      </div>
      <el-form ref="companyBuildInfoForm" :rules="CompanyBuildInfoRules" :disabled="firstExamine == 1 || firstExamine == 3 || firstExamine == 99" :model="seProjectCompanyBuildInfo" label-width="130px">
        <el-row :gutter="20" style="margin:30px 30px 0 30px;">
          <el-col :span="8">
            <el-form-item label="屋顶总面积" prop="houseArea" class="must-form-item">
              <el-input v-model="seProjectCompanyBuildInfo.houseArea">
                <span slot="suffix">㎡</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建筑物个数" prop="buildNum" class="must-form-item">
              <el-input v-model="seProjectCompanyBuildInfo.buildNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="屋面正南遮挡物" prop="houseSouthScreenFlag" class="must-form-item">
              <el-select v-model="seProjectCompanyBuildInfo.houseSouthScreenFlag" placeholder="请选择" class="width100">
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin:10px 30px 0 30px;">
          <el-col :span="8">
            <el-form-item label="屋顶使用年限" prop="useYears" class="must-form-item">
              <el-select v-model="seProjectCompanyBuildInfo.useYears" placeholder="请选择" class="width100">
                <el-option label="0-5年" :value="0"></el-option>
                <el-option label="6-10年" :value="1"></el-option>
                <el-option label="11-15年" :value="2"></el-option>
                <el-option label="16-20年" :value="3"></el-option>
                <el-option label="21-25年" :value="4"></el-option>
                <el-option label="26-30年" :value="5"></el-option>
                <el-option label="31年以上" :value="6"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="屋面材质" prop="housePartType" class="must-form-item">
              <el-select v-model="housePartType"
                @change="housePartTypeChange"
                multiple
                clearable
                placeholder="请选择(可多选)"
                class="width100">
                <el-option label="瓦砾屋面" value="0"></el-option>
                <el-option label="混泥土屋面" value="1"></el-option>
                <el-option label="彩钢瓦屋面" value="2"></el-option>
                <el-option label="其它" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="彩钢瓦类型" prop="colorSteelType" class="must-form-item">
              <el-select v-model="colorSteelType"
                @change="colorSteelTypeChange"
                multiple
                clearable
                placeholder="请选择(可多选)" 
                class="width100">
                <el-option label="无" value="0"></el-option>
                <el-option label="直立锁边" value="1"></el-option>
                <el-option label="角齿" value="2"></el-option>
                <el-option label="T型" value="3"></el-option>
                <el-option label="其它" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin:10px 30px 30px 30px;">
          <el-col :span="8">
            <el-form-item label="彩钢瓦比水泥顶" prop="colorSteelCementTopScale" class="must-form-item">
              <el-input v-model="seProjectCompanyBuildInfo.colorSteelCementTopScale" type="number" clearable>
                <span slot="suffix">%</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="其他屋面材质说明" prop="otherMessage">
              <el-input v-model="seProjectCompanyBuildInfo.otherMessage" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="xian">
        <div>供电现状</div>
      </div>
      <el-form ref="powerInfoForm" :rules="powerInfoRules" :disabled="firstExamine == 1 || firstExamine == 3 || firstExamine == 99" :model="seProjectPowerInfo" label-width="150px">
        <el-row :gutter="20" style="margin:30px 10px 0;">
          <el-col :span="8">
            <el-form-item label="供电类型" prop="prowerType" class="must-form-item">
              <el-select v-model="seProjectPowerInfo.prowerType" placeholder="请选择"  class="width100">
                <el-option label="工业" value="工业"></el-option>
                <el-option label="商业" value="商业"></el-option>
                <el-option label="共用" value="共用"></el-option>
                <el-option label="居民用电" value="居民用电"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="padding-left:0;">
            <el-form-item label="变压器容量" prop="transformerVolume" class="must-form-item">
              <el-input v-model="seProjectPowerInfo.transformerVolume">
                <span slot="suffix">kVA</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="padding-left:0;">
            <el-form-item label="变压器台数" prop="transformerNum" class="must-form-item">
              <el-input v-model="seProjectPowerInfo.transformerNum">
                <span slot="suffix">台</span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin:10px 10px 0;">
          <el-col :span="8">
            <el-form-item label="预估装机容量" prop="mayInstallVolume" class="must-form-item">
              <el-input v-model="seProjectPowerInfo.mayInstallVolume">
                <span slot="suffix">kW</span>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="padding-left:0;">
            <el-form-item label="法定节假日是否休息" prop="legalHolidayFlag" class="must-form-item">
              <el-select v-model="seProjectPowerInfo.legalHolidayFlag" placeholder="请选择"  class="width100">
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="padding-left:0;">
            <el-form-item label="周末生产情况" prop="weekendFlag" class="must-form-item">
              <el-select v-model="seProjectPowerInfo.weekendFlag" placeholder="请选择"  class="width100">
                <el-option label="单班" value="单班"></el-option>
                <el-option label="双班" value="双班"></el-option>
                <el-option label="连续生产" value="连续生产"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin:10px 20px 0;">
          <el-col :span="8" style="padding-left:0;">
            <el-form-item label="中午设备是否停机" prop="noonEquipmentFlag" class="must-form-item">
              <el-select v-model="seProjectPowerInfo.noonEquipmentFlag" placeholder="请选择"  class="width100">
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16" style="padding-left:0;">
            <el-form-item label="其他供电说明" prop="otherMessage">
              <el-input v-model="seProjectPowerInfo.otherMessage"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-card style="margin-bottom:50px;">
        <div slot="header" class="clearfix">
          <span>变压器各台容量（选填）</span>
        </div>
        <div>
          <el-button type="primary" size="small" :disabled="firstExamine == 1 || firstExamine == 3 || firstExamine == 99" @click="handleAdd">添加变压器</el-button>
          <el-table :data="seProjectPowerTransformInfoList" style="width: 100%" :header-cell-style="{background:'#f2f2f2',color:'#555'}">
            <el-table-column prop="transformName" label="变压器名称" />
            <el-table-column prop="transformVolume" label="容量（kVA）" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="danger" size="small" @click="deleteData(scope.row)">删除</el-button>
                <el-button type="info" size="small" @click="editData(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

      <div class="xian">
        <div>合作模式</div>
      </div>
      <el-alert title="请选择投资模式，在其他投资情况下，折扣与租金可以多选。" type="success" :closable="false" />
      <el-form ref="cooperateForm" :rules="cooperateRules" :disabled="firstExamine == 1 || firstExamine == 3 || firstExamine == 99" :model="seProjectCooperate" label-width="130px">
        <el-row :gutter="20" style="margin:30px 30px 0 30px;">
          <el-col :span="8">
            <el-form-item label="合作模式" prop="cooperateType" class="must-form-item">
              <el-select v-model="seProjectCooperate.cooperateType" placeholder="请选择" class="width100" @change="selectChange">
                <el-option label="业主投资" :value="0"></el-option>
                <el-option label="其他投资" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-show="seProjectCooperate.cooperateType == 0">
            <div style="display:flex;">
              <el-checkbox v-model="seProjectCooperate.ownPutFlag" style="margin-top:10px;" />
              <el-form-item label="业主自投，预算">
                <el-input v-model="seProjectCooperate.ownPutMoney" class="width100" clearable type="number" placeholder="请输入" :disabled="!seProjectCooperate.ownPutFlag">
                  <span slot="suffix">万元</span>
                </el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8" v-show="seProjectCooperate.cooperateType == 1">
            <div style="display:flex;">
              <el-checkbox v-model="seProjectCooperate.electricityDiscountFlag" style="margin-top:10px;" @click="handleEle" />
              <el-form-item label="电费折扣，比例">
                <el-input v-model="seProjectCooperate.electricityDiscountScale" class="width100" type="number" clearable placeholder="请输入" :disabled="!seProjectCooperate.electricityDiscountFlag">
                  <span slot="suffix">%</span>
                </el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8" v-show="seProjectCooperate.cooperateType == 1">
            <div style="display:flex;">
              <el-checkbox v-model="seProjectCooperate.houseLeaseFlag" style="margin-top:10px;" @change="handleHou" />
              <el-form-item label="出租屋面，租金">
                <el-input v-model="seProjectCooperate.houseLeaseMoney" class="width100" clearable type="number" placeholder="请输入" :disabled="!seProjectCooperate.houseLeaseFlag">
                  <span slot="suffix">万元/年</span>
                </el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <div class="xian">
        <div>相关材料</div>
      </div>
      <el-alert title="如文件较多，可将文件进行压缩打包上传，并等待文件完成上传。" type="success" :closable="false" />
      <el-form ref="relevantFileForm" :rules="relevantFileRules" :disabled="firstExamine == 1 || firstExamine == 3 || firstExamine == 99" :model="seProjectRelevantFile" style="text-align:right;" label-width="160px">
        <el-row :gutter="20" style="margin:0 30px;">
          <el-col :span="8">
            <el-form-item label="不动产权证或三证" prop="realPropertyRightFile" class="must-form-item">
              <file-upload-string
                v-model="seProjectRelevantFile.realPropertyRightFile"
                :limit="1"
                accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="近12个月电费复核单" prop="nearYearElectricityBill" class="must-form-item">
              <file-upload-string
                v-model="seProjectRelevantFile.nearYearElectricityBill"
                :limit="1"
                accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结构图" prop="structureFile" class="must-form-item">
              <file-upload-string
                v-model="seProjectRelevantFile.structureFile"
                :limit="1"
                accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin:0 30px;">
          <el-col :span="8">
            <el-form-item label="配电图内部照片">
              <file-upload-string
                v-model="seProjectRelevantFile.electricityRoomInsideFile"
                :limit="1"
                accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="建筑图">
              <file-upload-string
                v-model="seProjectRelevantFile.buildFile"
                :limit="1"
                accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="总平图">
              <file-upload-string
                v-model="seProjectRelevantFile.generalLayoutFile"
                :limit="1"
                accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin:0 30px;">
          <el-col :span="8">
            <el-form-item label="厂房内部照片" prop="workShopInsideFile" class="must-form-item">
              <file-upload-string
                v-model="seProjectRelevantFile.workShopInsideFile"
                :limit="1"
                accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="厂名正面照片" prop="workShopFrontFile" class="must-form-item">
              <file-upload-string
                v-model="seProjectRelevantFile.workShopFrontFile"
                :limit="1"
                accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="屋顶细节照片" prop="houseTopDetailFile" class="must-form-item">
              <file-upload-string
                v-model="seProjectRelevantFile.houseTopDetailFile"
                :limit="1"
                accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin:0 30px;">
          <el-col :span="8">
            <el-form-item label="厂房内屋顶照片" prop="workShopInsideTopFile" class="must-form-item">
              <file-upload-string
                v-model="seProjectRelevantFile.workShopInsideTopFile"
                :limit="1"
                accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目发起额外材料">
              <file-upload-string
                v-model="seProjectRelevantFile.projectOtherFile"
                :limit="1"
                accept=".jpg,.jpeg,.png,.dwg,.bak,.dwt,.bak,.rar,.zip,.ppt,.pptx,.pdf,.xls,.xlsx,.csv,.xlsm" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin:0 30px;">
          <el-col>
            <el-form-item label="项目发起额外说明">
              <el-input placeholder="请输入" v-model="seProjectRelevantFile.projectOtherMessage" class="width100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-dialog
      title="添加变压器"
      :visible.sync="addDialogVisible"
      width="40%"
      :close-on-click-modal="false">
      <el-form ref="form" :model="addForm" :rules="addRules" label-width="120px">
        <el-form-item label="变压器名称" prop="transformName" class="must-form-item">
          <el-input v-model="addForm.transformName"></el-input>
        </el-form-item>
        <el-form-item label="容量（kVA)" prop="transformVolume" class="must-form-item">
          <el-input v-model="addForm.transformVolume"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">添 加</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑变压器"
      :visible.sync="editDialogVisible"
      width="40%"
      :close-on-click-modal="false">
      <el-form ref="form" :model="editForm"  label-width="120px">
        <el-form-item label="变压器名称">
          <el-input v-model="editForm.transformName"></el-input>
        </el-form-item>
        <el-form-item label="容量（kVA)">
          <el-input v-model="editForm.transformVolume"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">编 辑</el-button>
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
          :key="index">
          <el-card style="margin-top:0;margin-bottom:0;">
            <p>{{activity.title}}</p>
            <p><span>{{activity.userName}}</span><span style="margin-left:14px;">{{activity.createTime}}</span></p>
            <p v-show="activity.remark">审批备注: {{activity.remark}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import { getProjectInfo, projectInput, projectInputSubmit, getProjectExamineLog, getProvinceCity, deleteOne } from '@/api/listProject'
export default {
  name: 'LaunchDetail',
  data() {
    var checkTwo = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error('内容不能为空'))
      // } else {
      const reg = /(^[0-9]{1,9}$)|(^[0-9]{1,9}[\.]{1}[0-9]{1,2}$)/
      // console.log(reg.test(value))
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('限数字，小数点后2位'))
      }
      // }
    }
    var checkZs = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error('大于0的整数'))
      // } else {
      const reg = /^[1-9]\d*$/
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('限数字，整数，≥1'))
      }
      // }
    }
    var checkCe = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error('内容不能为空'))
      // } else {
      const reg = /^(?:100|\d{1,2})(?:\.\d{1,2})?$/ 
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('限数字，0-100之间，小数点后2位'))
      }
    }
    var checkCd = (rule, value, callback) => {
      // if (!value) {
      //   return callback(new Error('内容不能为空'))
      // } else {
      const reg = /^([1-9]\d*(\.\d{1,2})?|([0](\.([0][1-9]|[1-9]\d{0,1}))))$/
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('限数字、若小数最多2位，＞0'))
      }
    }
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        // console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    return {
      firstExamine: '',
      projectId: '',
      must: false, // 控制是否必填
      addForm: { // 添加变压器
        projectId: this.$route.query.projectId,
        transformName: '',
        transformVolume: ''
      },
      addRules: {
        transformName: [
          { message: '请输入变压器名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
        ],
        transformVolume: [
          { message: '请输入', trigger: 'blur' },
          { validator: checkCd, trigger: 'blur' }
        ]
      },
      editForm: { // 编辑变压器
        transformName: '',
        transformVolume: '',
        transformId: Date.now()
      },
      seProjectPowerTransformInfoList: [], // 变压器数据
      addDialogVisible: false, // 添加变压器弹框
      editDialogVisible: false, 
      housePartType: [], // 屋面材质
      colorSteelType: [], // 彩钢瓦类型
      logVisible: false, // 审批记录
      activities: [], // 审批记录内容
      value: [], // 省市
      options: [],
      saveLoading: false, 
      subLoading: false, 

      seProjectCompanyInfo: {
        projectId: this.$route.query.projectId,
      }, // 业主信息
      companyInfoRules: {
        companyType: [{ required: this.must, message: '请选择', trigger: 'change, blur' }],
        value: [{ required: this.must, message: '请选择', trigger: 'change, blur' }],
        setAddress: [{ min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }],
        legalPerson: [{ min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }],
        companyPhone: [{ validator: checkPhone, trigger: 'blur' }]
      },

      seProjectCompanyBuildInfo: {
        projectId: this.$route.query.projectId,
      }, // 屋面信息
      CompanyBuildInfoRules: {
        houseArea: [
          { required: this.must, message: '请输入屋顶总面积', trigger: 'blur' },
          { validator: checkTwo, trigger: 'blur' }
        ],
        buildNum: [
          { message: '请输入建筑物个数', trigger: 'blur' },
          { validator: checkZs, trigger: 'blur' }
        ],
        houseSouthScreenFlag: [{ required: this.must, message: '请选择', trigger: 'change, blur' }],
        useYears: [{ required: this.must, message: '请选择', trigger: 'change, blur' }],
        housePartType: [{ required: this.must, message: '请选择建站地址', trigger: 'change, blur' }],
        // colorSteelType: [],
        colorSteelCementTopScale: [
          { required: this.must, message: '请输入', trigger: 'blur' },
          { validator: checkCe, trigger: 'blur' }
        ],
        otherMessage: [{ min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }]
      },

      seProjectPowerInfo: {
        projectId: this.$route.query.projectId,
      }, // 供电现状
      powerInfoRules: {
        prowerType: [{ required: this.must, message: '请选择', trigger: 'change, blur' }],
        transformerVolume: [
          { required: this.must, message: '请输入', trigger: 'blur' },
          { validator: checkCd, trigger: 'blur' }
        ],
        transformerNum: [
          { required: this.must, message: '请输入', trigger: 'blur' },
          { validator: checkZs, trigger: 'blur' }
        ],
        mayInstallVolume: [
          { required: this.must, message: '请输入', trigger: 'blur' },
          { validator: checkCd, trigger: 'blur' }
        ],
        legalHolidayFlag: [{ required: this.must, message: '请选择', trigger: 'change, blur' }],
        weekendFlag: [{ required: this.must, message: '请选择', trigger: 'change, blur' }],
        noonEquipmentFlag: [{ required: this.must, message: '请选择', trigger: 'change, blur' }],
        otherMessage: [{ min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }]
      },

      seProjectCooperate: {
        projectId: this.$route.query.projectId,
        cooperateType: '',
        ownPutFlag: false,
        ownPutMoney: '',
        electricityDiscountFlag: false,
        electricityDiscountScale: '',
        houseLeaseFlag: false,
        houseLeaseMoney: ''
      }, // 合作模式
      cooperateRules: {
        cooperateType: [{ required: this.must, message: '请选择', trigger: 'change, blur' }]
      },

      seProjectRelevantFile: {
        projectId: this.$route.query.projectId,
      }, // 相关材料
      relevantFileRules: {
        realPropertyRightFile: [],
        nearYearElectricityBill: [],
        structureFile: [],
        workShopInsideFile: [],
        workShopFrontFile: [],
        houseTopDetailFile: [],
        workShopInsideTopFile: []
      }
    }
  },
  created() {
    this.firstExamine = this.$route.query.firstExamine
    this.projectId = this.$route.query.projectId
    this.getProjectInfo( this.projectId )
    getProvinceCity().then(res => {
      this.options = res.data
    })
  },
  // watch: {
  //   'seProjectCooperate.cooperateType':function(newVal, oldVal) {
  //     console.log(newVal, oldVal)
  //     if(newVal === 0) {
  //       this.seProjectCooperate.ownPutFlag = true
  //       this.seProjectCooperate.electricityDiscountFlag = false
  //       this.seProjectCooperate.electricityDiscountScale = ''
  //       this.seProjectCooperate.houseLeaseFlag = false
  //       this.seProjectCooperate.houseLeaseMoney = ''
  //     } else if(newVal === 1) {
  //       this.seProjectCooperate.ownPutFlag = false
  //       this.seProjectCooperate.ownPutMoney = ''
  //     } 
  //   }
  // },
  methods: {
    getProjectInfo( projectId ) {
      getProjectInfo({ projectId }).then(res => {
        const {seProjectCompanyInfo,seProjectCompanyBuildInfo,seProjectPowerInfo,seProjectCooperate,seProjectRelevantFile,seProjectPowerTransformInfoList} = res.data
        this.seProjectCompanyInfo = {...seProjectCompanyInfo}
        this.seProjectCompanyBuildInfo = {...seProjectCompanyBuildInfo}
        this.seProjectPowerInfo = {...seProjectPowerInfo}
        this.seProjectCooperate = {...seProjectCooperate}
        if(this.seProjectCooperate.ownPutFlag &&  this.seProjectCooperate.ownPutFlag == 1) { this.seProjectCooperate.ownPutFlag = true }
        if(this.seProjectCooperate.electricityDiscountFlag &&  this.seProjectCooperate.electricityDiscountFlag == 1) { this.seProjectCooperate.electricityDiscountFlag = true }
        if(this.seProjectCooperate.houseLeaseFlag &&  this.seProjectCooperate.houseLeaseFlag == 1) { this.seProjectCooperate.houseLeaseFlag = true }
        this.seProjectRelevantFile = {...seProjectRelevantFile}
        this.seProjectPowerTransformInfoList = seProjectPowerTransformInfoList
        this.seProjectCompanyInfo.value = [this.seProjectCompanyInfo.province, this.seProjectCompanyInfo.city]
        if(this.seProjectCompanyBuildInfo.housePartType) { this.housePartType = this.seProjectCompanyBuildInfo.housePartType.split(',') }
        if(this.seProjectCompanyBuildInfo.colorSteelType) { this.colorSteelType = this.seProjectCompanyBuildInfo.colorSteelType.split(',') }
        if(this.seProjectCompanyBuildInfo.housePartType.indexOf('2') !== -1) { this.houseDis = false }
      })
    },
    front(msg) {
      this.saveLoading = true
      if(this.seProjectCooperate.ownPutFlag == false ) {
        this.seProjectCooperate.ownPutFlag = 0
      } else if (this.seProjectCooperate.ownPutFlag == true) {
        this.seProjectCooperate.ownPutFlag = 1
      }
      if(this.seProjectCooperate.electricityDiscountFlag == false ) {
        this.seProjectCooperate.electricityDiscountFlag = 0
      } else if (this.seProjectCooperate.electricityDiscountFlag == true) {
        this.seProjectCooperate.electricityDiscountFlag = 1
      }
      if(this.seProjectCooperate.houseLeaseFlag == false ) {
        this.seProjectCooperate.houseLeaseFlag = 0
      } else if (this.seProjectCooperate.houseLeaseFlag == true) {
        this.seProjectCooperate.houseLeaseFlag = 1
      }
      if(this.seProjectCooperate.cooperateType == 0) {
        this.seProjectCooperate.electricityDiscountFlag = 0
        this.seProjectCooperate.electricityDiscountScale = ''
        this.seProjectCooperate.houseLeaseFlag = 0
        this.seProjectCooperate.houseLeaseMoney = ''
      }
      if(this.seProjectCooperate.cooperateType == 1) {
        this.seProjectCooperate.ownPutFlag = 0
        this.seProjectCooperate.ownPutMoney = ''
      }
      projectInput({projectId: this.projectId,
        seProjectCompanyInfo: this.seProjectCompanyInfo,
        seProjectCompanyBuildInfo: this.seProjectCompanyBuildInfo,
        seProjectPowerInfo: this.seProjectPowerInfo,
        seProjectPowerTransformInfoList: this.seProjectPowerTransformInfoList,
        seProjectCooperate: this.seProjectCooperate,
        seProjectRelevantFile: this.seProjectRelevantFile
      }).then(res => {
        this.saveLoading = false
        if(res.code == 0 && !msg) { 
          this.$message.success('保存成功')
        }
        this.getProjectInfo(this.projectId)
      }).catch(err => {
        this.saveLoading = false
      })
    },
    // 保存
    save() {
      this.front()
    },
    // 提交审核
    async sub() {
      const confirmResult = await this.$confirm('是否提交审核?', '提示', {
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        type: 'warning'
      }).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消')
      }
      this.front(1)
      this.subLoading = true
      projectInputSubmit({projectId: this.projectId}).then(res => {
        console.log(res)
        this.subLoading = false
        if(res.code == 0) this.$message.success('提交成功')
        this.$router.back()
      }).catch( err => {
        this.subLoading = false
      })
    },
    // 添加变压器
    handleAdd() { // 添加弹框
      this.addDialogVisible = true
    },
    add() { // 添加变压器
      this.seProjectPowerTransformInfoList.push(this.addForm)
      this.save()
      this.addDialogVisible = false
      this.addForm = { 
        projectId: this.$route.query.projectId,
        transformName: '',
        transformVolume: '',
        transformId: Date.now()
      }
    },
    async deleteData(row) { // 删除变压器
      const confirmResult = await this.$confirm('此操作将永久删除该数据，是否继续?', '提示', {
          confirmButtonText: '确 定',
          cancelButtonText: '取 消',
          type: 'warning'
        }).catch((err) => err)
        if (confirmResult !== 'confirm') {
          return this.$message.info('已取消')
        }
      deleteOne({ id: row.transformId }).then(res => {
        console.log(res)
        this.$message.success('删除成功')
        this.getProjectInfo(this.projectId)
        // this.save()
      })
    },
    editData(row) { // 编辑变压器弹框
      this.editForm = row
      this.editDialogVisible = true
    },
    edit() { // 编辑变压器
      var index = this.seProjectPowerTransformInfoList.indexOf(this.editForm)
      if (index !== -1) {
        this.seProjectPowerTransformInfoList.splice(index, 0)
      }
      this.editDialogVisible = false
      this.editForm = {}
    },

    handleEle() {
      if(this.seProjectCooperate.cooperateType === 1 && this.seProjectCooperate.electricityDiscountFlag == false ) {
        this.$set(this.seProjectCooperate,'electricityDiscountFlag', 'true')
      } else {
        this.$set(this.seProjectCooperate,'electricityDiscountFlag', 'false')
      }
    },
    handleHou() {},
    // 合作模式
    selectChange(val) {
      if(val === 0) {
        this.seProjectCooperate.ownPutFlag = true
        this.seProjectCooperate.electricityDiscountFlag = false
        this.seProjectCooperate.electricityDiscountScale = ''
        this.seProjectCooperate.houseLeaseFlag = false
        this.seProjectCooperate.houseLeaseMoney = ''
      } else if(val === 1) {
        this.seProjectCooperate.ownPutFlag = false
        this.seProjectCooperate.ownPutMoney = ''
      } 
    },
    housePartTypeChange(value) { // 屋面材质
      this.seProjectCompanyBuildInfo.housePartType = value.join(',')
    },
    colorSteelTypeChange(value) { // 彩钢瓦类型转换
      this.seProjectCompanyBuildInfo.colorSteelType = value.join(',')
    },
    // 审批记录
    approval() {
      this.logVisible = true
      getProjectExamineLog({projectId: this.projectId}).then(res => {
        this.activities = res.data
      })
    },
    // 省市
    handleChange(val) {
      this.seProjectCompanyInfo.province = val[0]
      this.seProjectCompanyInfo.city = val[1]
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
  .el-alert {
    margin: 15px 0;
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
  /deep/  .el-checkbox__label {
    padding-left: 0;
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
  /deep/ .el-input-number__decrease {
    display: none;
  }
  /deep/ .el-input-number__increase {
    display: none;
  }
  /deep/ .el-input-number .el-input__inner {
    padding-left: 10px;
    text-align: left;
  }
</style>