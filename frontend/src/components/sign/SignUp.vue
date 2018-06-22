<template>
  <div class="right_wrap">
    <div class="right_inner_wrap">
      <div class="form-wrap">
        <p class="section_title">회원가입</p>
        <form>
          <div class="form-group">
            <label for="email"><img src="../../assets/images/sign/mail_i.png" alt=""></label>
            <input type="email"
                   class="form-control"
                   id="email"
                   placeholder="이메일"
                   v-model="email">
          </div>
          <p class="email_prologue">※ 해당 주소로 인증메일이 전송됩니다.</p>
          <div class="form-group">
            <label for="password"><img src="../../assets/images/sign/mail_i.png" alt=""></label>
            <input type="password"
                   class="form-control"
                   id="password"
                   placeholder="비밀번호"
                   v-model="password">
          </div>
          <div class="form-group">
            <label for="password_check"><img src="../../assets/images/sign/mail_i.png" alt=""></label>
            <input type="password"
                   class="form-control"
                   id="password_check"
                   placeholder="비밀번호 확인"
                   v-model="password_check">
          </div>
          <div class="form-group">
            <label for="name"><img src="../../assets/images/sign/mail_i.png" alt=""></label>
            <input type="text"
                   class="form-control"
                   id="name"
                   placeholder="이름"
                   v-model="name">
          </div>
          <div>
            <div class="affiliation_wrap">
              <div class="affiliation_select"><ui-select :selectData="selectData"/></div>
            </div>
          </div>
        </form>
      </div>
      <button class="btn btn-success" @click="signUp()">회원가입</button>
    </div>
  </div>
</template>

<script>
import Select from '@/components/ui/Select'
export default {
  name: 'SignUp',
  components: {
    'ui-select': Select
  },
  data () {
    return {
      email: '',
      password: '',
      password_check: '',
      name: '',
      affiliation: '',
      selectData: {
        emptyText: '소속을 선택해주세요',
        textList: [
          '커뮤니케이션본부-기획1팀',
          '커뮤니케이션본부-기획2팀',
          '커뮤니케이션본부-기획3팀',
          '연구개발본부',
          '그외 기타본부'
        ]
      }
    }
  },
  methods: {
    signUp () {
      const emailValidation = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/

      if (emailValidation.test(this.email) === false) {
        alert('잘못된 이메일 주소입니다.')
      } else if (this.password !== this.password_check || this.password === '') {
        alert('비밀번호가 일치하지 않습니다.')
      } else {
        if (this.email && this.password && this.password_check && this.name && this.affiliation) {
          this.$http.post('/users/signup', {
            username: this.email,
            password: this.password,
            email: this.email,
            name: this.name,
            affiliation: this.affiliation,
            active: false
          }).then((res) => {
            console.log(res)
            alert('회원가입 완료')
            this.$router.push({name: 'SignUpComplete'})
          }).catch(err => {
            console.log(err)
          })
        } else {
          alert('입력되지 않은 항목이 존재합니다')
        }
      }
    },
    cancel () {
      this.$router.push({name: 'SignIn'})
    }
  }
}
</script>

<style lang="scss" scoped>
.sign{width:auto;}
  .affiliation_wrap{margin-bottom:12px;}
</style>
