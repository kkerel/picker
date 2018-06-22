<template>
  <!-- 로고 -->
  <div class="right_wrap">
    <div class="right_inner_wrap">
      <div class="title_image"><img src="../../assets/images/sign/complete_i.png" alt=""></div>
      <p>입력하신 이메일로</p>
      <p>임시 비밀번호가 전송되었습니다.</p>
      <button class="confirm_btn black_btn" @click="confirm()">확인</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    confirm () {
      this.$router.push({ name: 'SignIn' })
    }
  }
}
</script>

<style lang="scss" scoped>
.right_inner_wrap{
  p{font-size:24px; font-weight:bold;text-align:center;}
}
</style>
