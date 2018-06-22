<template>
  <div id="container">
    <div id="container_wrap">
      <div id="container_inner_wrap">
        <div class="user_board_wrap">
          <!-- 탭 네비 -->
          <div class="pick_tab">
            <!--<div @click="wTabs(0,'wTab')" v-bind:class="[(wTab.tab1 === true) ? 'active' : '']">기존당첨자</div>-->
            <!--<div @click="wTabs(1,'wTab')" v-bind:class="[(wTab.tab2 === true) ? 'active' : '']">블랙리스트</div>-->
            <router-link to="/main/user_management/winnerlist">기존당첨자</router-link>
            <router-link to="/main/user_management/blacklist">블랙리스트</router-link>
          </div>
          <ui-search/>
          <!-- 탭 네비 컨텐츠 -->
          <div class="pick_tab_contents">
            <router-view @moveToMedia="moveToMedia"></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/ui/Search'
import Winnerlist from '@/components/ui/Winnerlist'
import Blacklist from '@/components/ui/Blacklist'

export default {
  components: {
    'ui-search': Search,
    'ui-winnerlist': Winnerlist,
    'ui-blacklist': Blacklist
  },
  created () {
    this.$router.push({ name: 'Winnerlist' })
  },
  data () {
    return {
      // wTab: {
      //   tab1: true,
      //   tab2: false
      // }
    }
  },
  methods: {
    // wTabs (num, obj) {
    //   const tabs = Object.keys(this[obj])
    //   for (let i = 0; i < tabs.length; i++) {
    //     if (num === i) {
    //       this.wTab[tabs[i]] = true
    //     } else {
    //       this.wTab[tabs[i]] = false
    //     }
    //   }
    // }
    moveToMedia (mediaId) {
      this.$router.push({name: 'PostDetail', params: { id: mediaId }})
    }
  }
}
</script>

<style lang="scss" scoped>
#container_inner_wrap{
  .user_board_wrap{background:#fff; padding:40px;
    .pick_tab{width:100%; display:table; text-align:center; border-bottom:1px solid #f2f1f1;
      a{display:inline-block; vertical-align:middle; padding:0px 60px; font-weight:bold; color:#a6a6a6; font-weight:bold; cursor:pointer; padding-bottom:14px;}
      .router-link-active{color: #000; border-bottom: 2px solid #000; padding-bottom: 12px;}
    }
    .pick_tab_contents{margin-top:36px;}
  }
}
</style>
