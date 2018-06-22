<template>
  <aside>
    <div class="aside_wrap">
      <h1><img src="../../assets/images/common/logo.png" alt=""></h1>
      <ui-account class="aside_info"/>
      <ui-select :selectData="this.selectData" :onClick="selectAccount"/>
      <div class="menu_wrap">
        <div class="analytics_menu menu_widget">
          <p>Analytics</p>
          <ul>
            <li><router-link v-bind:to="{ name: 'Account' }">계정</router-link></li>
            <li><router-link v-bind:to="{ name: 'Post' }">게시물</router-link></li>
          </ul>
        </div>
        <div class="contents_menu menu_widget">
          <p>Contents Publishing</p>
          <ul>
            <li><router-link v-bind:to="{ name: 'ReservationScheduler' }">예약/업로드</router-link></li>
          </ul>
        </div>
        <div class="picker_menu menu_widget">
          <p>Event</p>
          <ul>
            <li><router-link v-bind:to="{ name: 'Drawlots' }">댓글 추첨</router-link></li>
            <li><router-link v-bind:to="{ name: 'UserManagement' }">유저 관리</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import Select from '@/components/ui/Select'
import Account from '@/components/ui/Account'
import Constant from '../../constant'

export default {
  name: 'Aside',
  components: {
    'ui-select': Select,
    'ui-account': Account
  },
  created () {
    this.$http.get('/instagram/accounts', {
      params: {
        fb_access_token: localStorage.getItem('fb-access-token')
      }
    }).then(res => {
      const data = res.data.data
      let savedAccount = null
      this.accounts = data.slice()
      this.accounts.forEach(account => {
        // 기존에 저장된 account_id 가 있다면 저장한다.
        if (localStorage.getItem('account_id') === account['id']) {
          savedAccount = account
        }
        this.selectData.textList.push(account['username'])
      })

      if (localStorage.getItem('account_id') == null) {
        // 기존에 저장된 account_id가 없는 경우
        if (this.accounts.length > 0) {
          // 첫번째 계정으로 초기화
          this.selectAccount(this.accounts[0]['username'])
        }
      } else {
        // 기존에 저장된 account_id가 있는 경우
        if (savedAccount != null) {
          // 저장해 둔 account로 초기화
          this.selectAccount(savedAccount['username'])
        } else if (this.accounts.length > 0) {
          // 저장해 둔 account를 오류가 났던 찾지 못했던 한다면 첫번째 계정으로 초기화
          this.selectAccount(this.accounts[0]['username'])
        }
      }
    })

    let nowDate = new Date()
    let preDate = new Date(nowDate - 7 * 1000 * 60 * 60 * 24)

    nowDate = this.$moment(nowDate).format('YYYYMMDD')
    preDate = this.$moment(preDate).format('YYYYMMDD')

    this.nowDate = nowDate
    this.preDate = preDate

    console.log('nowDate ', this.nowDate)
    console.log('preDate ', this.preDate)
  },
  data () {
    return {
      accounts: [],
      selectData: {
        emptyText: '계정선택',
        textList: []
      },
      nowDate: '',
      preDate: ''
    }
  },
  methods: {
    selectAccount (username) {
      window.scrollTo(0, 0)
      this.selectData.emptyText = username
      this.accounts.forEach(account => {
        if (account['username'] === username) {
          this.$store.commit(Constant.CHANGE_ACCOUNT, account)
          this.$store.dispatch(Constant.CHANGE_ACCOUNT_BEST_MEDIA)
          this.getProfileViews()
          this.$store.dispatch(Constant.CHANGE_ACCOUNT_FOLLOWER_INSIGHT)
          this.$store.dispatch(Constant.CHANGE_ACCOUNT_FOLLOWER_DEMOGRAPHICS)
          this.$store.dispatch(Constant.CHANGE_ACCOUNT_BUZZ_CONTENT_INSIGHT)
          this.$store.dispatch(Constant.CHANGE_ACCOUNT_SUMMARY_MEDIAS)
          this.$store.dispatch(Constant.ADD_ACCOUNT_MEDIAS, {status: 'init'})
          this.$router.push({ name: 'Account' })
        }
      })
    },
    getProfileViews () {
      const date = {
        since: this.preDate.toString(),
        until: this.nowDate.toString()
      }
      this.$store.dispatch(Constant.CHANGE_ACCOUNT_PROFILE_VIEWS, {date})
    }
  }
}
</script>

<style lang="scss" scoped>
aside{position: fixed; top: 0px; left: 0px; z-index: 10; width: 250px; height: 100%;
  .aside_wrap{height:100%; background:#fff;
    h1{border-bottom: 1px solid #f2f1f1; padding:67px 0px;}
    .menu_wrap{margin-top:50px;
      .menu_widget{margin-bottom:33px;
        a{font-weight:bold; padding-left:30px; font-size:16px;}
        &:last-child{margin-bottom:0px;}
        p{padding-left:30px; color:#a5a5a5; height: 26px; line-height: 26px; font-size:16px;}
        li{height: 26px; line-height: 26px; margin:7px 0px;}
        .router-link-active{border-left: 8px solid #84dab1; color: #65ba91; font-size:16px; padding-left:22px;}
      }
    }
    .user_info{padding:50px 30px 10px 30px;}
    /* 셀렉트 버튼 */
    .select_btn{width:188px; margin:0 auto; height:30px; line-height:30px; font-size:16px;}
  }
}
</style>
