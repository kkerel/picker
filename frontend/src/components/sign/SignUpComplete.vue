<template>
  <!-- 로고 -->
  <div class="right_wrap">
    <div class="right_inner_wrap">
      <div class="title_image"><img src="../../assets/images/sign/complete_i.png" alt=""></div>
      <p>회원가입이 완료되었습니다.</p>
      <p class="small_text">이메일로 전송된 안내메일을 통해 인증 후, 사용해주세요.</p>
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
  .small_text{font-size:13px!important; padding-top:30px;}
  p{font-size:24px; font-weight:bold;text-align:center;}
}
</style>
