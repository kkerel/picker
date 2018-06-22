<template>
  <div class="right_wrap">
    <div class="right_inner_wrap">
      <button class='btn btn-success' @click='fbLogin()'><img src="../../assets/images/sign/facebook_i.png" alt=""></button>
      <div class="face_login_prologue">
        <p>소셜피커 사용을 위해서는</p>
        <p>페이스북 로그인을 해야합니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Constant from '../../constant'

/* eslint-disable */
export default {
  data () {
    return {
      message: 'Facebook login'
    }
  },

  created () {
    let self = this;

    window.fbAsyncInit = function() {
      FB.init({
        appId: '1456607077970548', // 앱 아이디
        cookie: true,              // 쿠키가 세션을 참조할 수 있도록 허용
        xfbml: true,               // 소셜 플러그인 처리
        version: 'v2.12'           // 그래프 API 버전
      });

      FB.getLoginStatus(function(response) {
        self.statusChangeCallback(response)
      })
    };

    // SDK를 비동기적으로 호출
    (function(d, s, id){
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return}
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
  },

  methods: {
    // 로그인 상태 체크
    statusChangeCallback(response) {
      console.log('statusChangeCallback()');

      if (response.status === 'connected') {
        // 페이스북 로그인 됨
        this.message = 'Facebook login success';
        this.pickerLogin(response.authResponse.accessToken);
        // localStorage.setItem('fb-access-token', response.authResponse.accessToken);

        // console.log('FB_ACCESS_TOKEN: ' + localStorage.getItem('fb-access-token'));
        // console.log('LOCAL_ACCESS_TOKEN: ' + localStorage.getItem('local-access-token'));
        // this.$router.push({name: 'Main'})
      } else if (response.status === 'not_authorized') {
        // 페이스북 로그인은 했으나, 앱에는 로그인 되어있지 않은 경우
        this.message = 'Please log into this app'
      } else {
        // 페이스북 로그인이 되어있지 않음
        this.message = 'Please log into this Facebook'
      }
    },

    // onlogin 핸들러와 연결, 로그인 버튼에 대한 처리가 끝났을 때 호출 됨
    checkLoginState() {
      let self = this;

      FB.getLoginStatus(function(response) {
        self.statusChangeCallback(response)
      })
    },

    fbLogin() {
      let self = this;

      FB.login(function(response) {
        if (response.status === 'connected') {
          console.log('Facebook login success2');
          self.pickerLogin(response.authResponse.accessToken);
          // localStorage.setItem('fb-access-token', response.authResponse.accessToken);

          // console.log('fbLogin()');
          // console.log('FB_ACCESS_TOKEN: ' + localStorage.getItem('fb-access-token'));
          // console.log('LOCAL_ACCESS_TOKEN: ' + localStorage.getItem('local-access-token'));
          // self.$router.push({name: 'Main'})
        } else {
          console.log('Facebook login fail')
        }
      }, {
        scope: 'public_profile, email, manage_pages, instagram_basic, instagram_manage_insights, instagram_manage_comments, instagram_content_publish'
      })
    },

    pickerLogin (accessToken) {
      console.log("pickerLogin")
      const me = this
      FB.api('/me?fields=id,name,cover,first_name,last_name,age_range,link,gender,locale,picture,timezone,updated_time,verified,email', function(res) {
        // TODO cover undefined 또는 invalid string 체크 (필요없음삭제)
        axios.post('/fb_users/fb_signin', {
          fb_id: res.id,
          name: res.name,
          // cover: res.cover,
          first_name: res.first_name,
          last_name: res.last_name,
          age_range: JSON.stringify(res.age_range),
          link: res.link,
          gender: res.gender,
          locale: res.locale,
          picture_url: res.picture.data.url,
          timezone: res.timezone,
          updated_time: res.updated_time,
          verified: res.verified,
          email: res.email,
          fb_access_token: accessToken
        })
        .then((response) => {
          let success = response.data.success
          let data = response.data.data
          me.$store.commit(Constant.SET_FB_ACCOUNT, data)

          if (success === 'YES') {
            console.log('FB LOGIN SUCCESS')
            localStorage.setItem('fb-access-token', data.fb_access_token)

            console.log('FB_ACCESS_TOKEN: ' + localStorage.getItem('fb-access-token'))
            console.log('LOCAL_ACCESS_TOKEN: ' + localStorage.getItem('local-access-token'))
            me.$router.push({name: 'Main'})
          } else {
            alert(response.msg)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.right_wrap{
  .right_inner_wrap{
    .face_login_prologue{padding-top:30px;
      p{text-align:center; color:#000; font-size:14px; line-height:1.4;}
    }
  }
}
</style>
