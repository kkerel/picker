<template>
  <!-- 입력 폼 -->
  <div class="right_wrap">
    <div class="right_inner_wrap">
      <div class="form-wrap">
        <form>
          <div class="form-group">
            <label for="username"><img src="../../assets/images/sign/mail_i.png" alt=""></label>
            <input type="text" class="form-control" id="username" placeholder="이메일" v-model="username">
          </div>
          <div class="form-group">
            <label for="password"><img src="../../assets/images/sign/pw_i.png" alt=""></label>
            <input type="password" class="form-control" id="password" placeholder="비밀번호" v-model="password" @keyup.enter="signIn">
          </div>
        </form>
        <button class="btn btn-success" @click="signIn()">로그인</button>
      </div>
      <div class="sign_etc">
        <button class="btn btn-info" @click="signPassword()">비밀번호 찾기</button>
        <button class="btn btn-info" @click="signUp()">회원가입</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Constant from '../../constant'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signIn () {
      this.$http.post('/users/signin', {
        username: this.username,
        password: this.password
      }).then((res) => {
        const data = res.data.data
        const success = res.data.success

        if (success === 'YES' && data.active === true) {
          // 로컬 액세스 토큰 저장
          localStorage.setItem('local-access-token', data.token)
          // default request header 설정
          Vue.prototype.$http.defaults.headers.common['x-access-token'] = localStorage.getItem('local-access-token')

          const solutionAccount = this.parseJwt(localStorage.getItem('local-access-token'))
          this.$store.commit(Constant.SET_SOLUTION_ACCOUNT, solutionAccount)
          this.$router.push({name: 'SignInFacebook'})
        } else if (success === 'YES' && data.active === false) {
          alert('이메일 인증을 확인해주세요')
        } else {
          this.$router.push({name: 'SignFail'})
        }
      })
    },
    signPassword () {
      this.$router.push({name: 'FindPassword'})
    },
    signUp () {
      this.$router.push({name: 'SignUp'})
      console.log('signup')
    },
    parseJwt (token) {
      let base64Url = token.split('.')[1]
      let base64 = base64Url.replace('-', '+').replace('_', '/')
      return JSON.parse(window.atob(base64))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
