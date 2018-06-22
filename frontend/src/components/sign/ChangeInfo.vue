<template>
  <!-- 입력 폼 -->
  <div>
    <div class="name_wrap">
      <div class="title">이름</div>
      <div><input type="text" placeholder="이름을 입력해주세요" :value="solutionAccount.name" ref="name"></div>
    </div>
    <div class="affiliation_wrap">
      <div class="title">소속</div>
      <div class="affiliation_select"><ui-select :selectData="selectData"/></div>
    </div>
    <div class="pw_wrap">
      <div class="title">비밀번호</div>
      <div><input type="password" placeholder="현재 바밀번호를 입력해주세요" v-model="currentPassword"></div>
    </div>
    <p class="change_btn">
      <button @click="modify">변경</button>
    </p>
  </div>
</template>

<script>
import Select from '@/components/ui/Select'

export default {
  components: {
    'ui-select': Select
  },
  created () {
    this.solutionAccount = this.$store.state.solutionAccount
    this.selectData.emptyText = this.solutionAccount.affiliation
  },
  data () {
    return {
      selectData: {
        emptyText: '소속을 선택해주세요',
        textList: [
          '커뮤니케이션본부-기획1팀',
          '커뮤니케이션본부-기획2팀',
          '커뮤니케이션본부-기획3팀',
          '연구개발본부',
          '그외 기타본부'
        ]
      },
      currentPassword: ''
    }
  },
  methods: {
    modify () {
      this.$http.post('/users/' + this.$store.state.solutionAccount.id, {
        password: this.currentPassword
      }).then(res => {
        const success = res.data.success
        if (success === 'YES') {
          this.$http.put('/users/' + this.$store.state.solutionAccount.id, {
            name: this.$refs.name.value,
            affiliation: this.selectData.emptyText,
            password: this.currentPassword
          }).then(res => {
            alert('개인정보 변경이 완료되었습니다')
            this.$store.state.solutionAccount.name = this.$refs.name.value
            this.$store.state.solutionAccount.affiliation = this.selectData.emptyText
            this.$router.push({ name: 'Account' })
          })
        } else {
          alert('현재 비밀번호가 일치하지 않습니다')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.section_title{margin-bottom:74px;}
.title{font-size:14px; font-weight:bold; margin-bottom:10px; letter-spacing:1px;}
input[type="text"]{width:410px; height:32px; line-height:30px; border:2px solid #f5f5f5; border-radius:4px; text-indent:14px;
  &{
    input:-ms-input-placeholder { color: #000;}
    input::-webkit-input-placeholder { color: #000;}
    input::-moz-placeholder { color: #000;}
  }
}
.affiliation_wrap{margin-bottom:60px;
  .affiliation_select{height:32px; line-height:30px;
    input{height:32px; line-height:30px;}
  }
  .select_btn{width: 100%; margin: 0 auto; height: 38px; line-height: 36px; font-size: 16px;}
}
.pw_wrap{
  input{width: 410px; height: 32px; line-height: 30px; border: 2px solid #f5f5f5; border-radius: 4px; text-indent: 14px;}
}
.name_wrap{margin-bottom:18px;}
.section_prlogue{padding-top:8px;}
.change_btn{text-align:center; margin-top:68px;
  button{width:100px; height:45px; line-height:45px; background:#000; color:#fff; text-align:center; border-radius:4px;}
}
</style>
