<template> 
  <!-- 小标题 -->
  <div class="xian">
    <div>{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: 'ProjectTitle',
  props: {
    title: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.xian {
  color: #1890FF;
  border-bottom: 1px solid #1890FF;
  padding-bottom: 5px;
  div {
    border-left: 4px solid #1890FF;
    padding-left: 15px;
  }
}
</style>