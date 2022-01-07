<template>
  <div class="dashboard">
    <div class="top">
      <img :src="image" alt="">
      <h2>你好，{{ userName }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  computed: {
    userName() {
      return window.sessionStorage.getItem('userName')
    },
    image() {
      return window.sessionStorage.getItem('image')
    }
  }
}
</script>

<style>
.top {
  width: 100%;
  height: 125px;
  display: flex;
  padding: 30px 15px 30px 30px;
  background-color: #fff;
  box-sizing: border-box;
  line-height: 15px;
}
img {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  margin-right: 15px;
}
</style>