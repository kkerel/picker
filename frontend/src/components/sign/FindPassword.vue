<template>
  <div class="right_wrap">
    <div class="right_inner_wrap">
      <div class="form-wrap">
        <p class="section_title">비밀번호 찾기</p>
        <p class="middle_prologue">회원가입 시 등록한 이메일로 아이디를 찾을 수 있습니다.<br>아래 정보를 입력해주세요.</p>
        <form>
          <div class="form-group">
            <label for="username"><img src="../../assets/images/sign/mail_i.png" alt=""></label>
            <input type="text" class="form-control" id="username" placeholder="이메일" v-model="username">
          </div>
          <div class="form-group">
            <label for="name"><img src="../../assets/images/sign/mail_i.png" alt=""></label>
            <input type="text" class="form-control" id="name" placeholder="이름" v-model="name">
          </div>
        </form>
      </div>
      <button class="btn btn-success" @click="confirm()">확인</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      name: ''
    }
  },
  methods: {
    confirm () {
      this.$http.put('/users/find_password', {
        username: this.username,
        name: this.name
      }).then(res => {
        const success = res.data.success
        if (success === 'NO') {
          this.$router.push({ name: 'SignFail' })
        } else {
          this.$router.push({ name: 'FindPasswordComplete' })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sign{width:auto;}
.middle_prologue{padding-top:9px; padding-bottom:15px; color:#7f7f7f; font-size:13px;}
</style>
