<template>
  <div>
    <ProjectTitle title="业主信息" />
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
          <el-col :span="16" class="span130">{{seProjectCompanyInfo.province}} {{seProjectCompanyInfo.city}}</el-col>
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
  </div>
</template>

<script>
import ProjectTitle from '@/components/Project/ProjectTitle.vue'
export default {
  name: 'OwnerInfo',
  props: {
    seProjectCompanyInfo: {
      type: Object,
      default: () => {},
      require: true
    }
  },
  components: { ProjectTitle },
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>

</style>