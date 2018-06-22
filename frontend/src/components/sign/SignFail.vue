<template>
  <!-- 로고 -->
  <div class="right_wrap">
    <div class="right_inner_wrap">
      <div class="title_image"><img src="../../assets/images/sign/nocomplete_i.png" alt=""></div>
      <p>입력한 정보와 일치하는</p>
      <p>회원정보가 없습니다.</p>
      <button class="confirm_btn black_btn" @click="confirm()">확인</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    confirm () {
      // 한 단계 뒤로 이동
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.right_inner_wrap{
  p{font-size:24px; text-align:center;}
}
</style>
