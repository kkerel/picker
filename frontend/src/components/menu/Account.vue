<template>
  <div id="container">
    <div id="container_wrap" class="scroll">
      <div id="container_inner_wrap">
        <div class="account_wrap section_widget section_bottom">
          <div class="account_left">
            <ui-account class="account_info"/>
          </div>
          <div class="account_right">
            <div class="figure_widget">
              <div>
                <div class="figure_title">게시물</div>
                <div class="figure_value"
                     v-if="this.$store.state.account.media_count"
                     v-text="setComma(this.$store.state.account.media_count)"></div>
                <div class="figure_value" v-else>0</div>
              </div>
              <div>
                <div class="figure_title">팔로잉</div>
                <div class="figure_value"
                     v-if="this.$store.state.account.follows_count"
                     v-text="setComma(this.$store.state.account.follows_count)"></div>
                <div class="figure_value" v-else>0</div>
              </div>
                <div>
                <div class="figure_title">팔로워</div>
                <div class="figure_value"
                     v-if="this.$store.state.account.followers_count"
                     v-text="setComma(this.$store.state.account.followers_count)"></div>
                <div class="figure_value" v-else>0</div>
              </div>
            </div>
          </div>
        </div>
        <div class="post_mean_wrap section_widget section_bottom">
          <div class="section_title">게시물 TOP5 평균</div>
          <div class="section_contents">
            <!-- 게시물 TOP5 평균 -->
            <div class="post_figure">
              <!-- 좋아요 -->
              <div class="post_like">
                <div class="mean_figure"
                     v-if="this.$store.state.accountBestMedia.best_like_avg"
                     v-text="setComma(this.$store.state.accountBestMedia.best_like_avg)"></div>
                <div class="mean_figure" v-else>0</div>
                <div class="present_figure">
                  <p><img src="../../assets/images/icon/instar_i_01.jpg" alt=""></p>
                  <p class="figure"
                     v-if="diffBestLikeAvg"
                     v-text="setComma(diffBestLikeAvg)"></p>
                  <p class="figure" v-else>0</p>
                </div>
              </div>
              <!-- 댓글 -->
              <div class="post_reply">
                <div class="mean_figure"
                     v-if="this.$store.state.accountBestMedia.best_comments_avg"
                     v-text="setComma(this.$store.state.accountBestMedia.best_comments_avg)"></div>
                <div class="mean_figure" v-else>0</div>
                <div class="present_figure">
                  <p><img src="../../assets/images/icon/instar_i_02.jpg" alt=""></p>
                  <p class="figure"
                     v-if="diffBestLikeAvg"
                     v-text="setComma(diffBestCommentsAvg)"></p>
                  <p class="figure" v-else>0</p>
                </div>
              </div>
            </div>
            <!-- 게시물 TOP5 -->
            <div class="post_img_wrap">
              <ul>
                <ui-post-thumbnail class="account_img average_img" v-for="(media, index) in bestMedias" :key="'top-' + index" :media="media"/>
              </ul>
            </div>
          </div>
        </div>
        <div class="calender_chart section_widget section_bottom">
          <div class="profile_title_inner">
            <div class="section_title">프로필 뷰</div>
            <ui-calendar v-model="range"/>
          </div>
          <div class="chart">
            <area-chart/>
          </div>
        </div>
        <div class="instagram_chart section_widget section_bottom">
          <div class="section_title">팔로워 트렌드</div>
          <div class="chart">
            <stacked-combo-chart/>
          </div>
        </div>
        <div class="follower_chart section_widget section_bottom">
          <div class="section_title">팔로워 데모그래픽</div>
          <div class="chart">
            <stacked-row-chart/>
          </div>
        </div>
        <div class="follower_chart section_widget last_section_widget">
          <div class="section_title">버즈량</div>
          <div class="chart">
            <stacked-column-chart v-if="buzzContentInsight"
                                  :stackedColumnChartRows="buzzContentInsight"
                                  :stackedColumnChartType="stackedColumnChartType"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from '@/components/ui/Calendar'
import account from '@/components/ui/Account'
import PostThumbnail from '@/components/ui/PostThumbnail'
import StackedColumnChart from '@/components/chart/StackedColumnChart'
import StackedComboChart from '@/components/chart/StackedComboChart'
import AreaChart from '@/components/chart/AreaChart'
import StackedRowChart from '@/components/chart/StackedRowChart'
import Constant from '../../constant'

export default {
  name: 'Account',
  components: {
    'ui-calendar': Calendar,
    'ui-account': account,
    'ui-post-thumbnail': PostThumbnail,
    StackedColumnChart,
    StackedComboChart,
    AreaChart,
    StackedRowChart
  },
  computed: {
    diffBestLikeAvg () {
      if (this.$store.state.accountBestMedia.diff_best_like_avg >= 0) {
        return '+' + this.$store.state.accountBestMedia.diff_best_like_avg
      } else {
        return this.$store.state.accountBestMedia.diff_best_like_avg
      }
    },
    diffBestCommentsAvg () {
      if (this.$store.state.accountBestMedia.diff_best_comments_avg >= 0) {
        return '+' + this.$store.state.accountBestMedia.diff_best_comments_avg
      } else {
        return this.$store.state.accountBestMedia.diff_best_comments_avg
      }
    },
    bestMedias () {
      let medias = this.$store.state.accountBestMedia.best_media
      if (medias.length === 0) {
        return []
      } else {
        medias.forEach(media => {
          if (media['media_type'] === 'VIDEO') {
            media['media_url'] = media['thumbnail_url']
          }
        })
        return this.$store.state.accountBestMedia.best_media
      }
    },
    buzzContentInsight () {
      if (this.$store.state.accountBuzzContentInsight.rows.length > 0) {
        return this.$store.state.accountBuzzContentInsight.rows
      }
    }
  },
  data () {
    return {
      range: [(d => new Date(d.setDate(d.getDate() - 7)))(new Date()), (d => new Date(d.setDate(d.getDate() - 1)))(new Date())],
      stackedColumnChartType: 'accountBuzzContentInsight'
    }
  },
  watch: {
    range () {
      this.getProfileViews()
    }
  },
  methods: {
    getProfileViews () {
      let startDate = this.$moment(this.range[0]).format('YYYYMMDD')
      let endDate = this.$moment(this.range[1]).add(1, 'days').format('YYYYMMDD')

      const date = {
        since: startDate.toString(),
        until: endDate.toString()
      }
      this.$store.dispatch(Constant.CHANGE_ACCOUNT_PROFILE_VIEWS, {date})
    },
    setComma (str) {
      str = String(str)
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
    }
  }
}
</script>

<style lang="scss" scoped>
#container_inner_wrap{
  .account_wrap{border-bottom:1px solid #e6e6e6;
    .account_left{float:left;}
    .account_right{float:right; padding:38px 0px;}
  }
  .section_contents{float:right;
    .post_img_wrap{width:100%; display:table;}
  }
  .post_figure{position:absolute; top:50%; left:22%; transform:translate(0%, -50%);}
  .post_mean_wrap{position:relative; background:#fff; padding:40px;
    .section_title{float:left; padding:29px 0px; display:table;}
  }
}
@media all and (min-width: 768px) and (max-width: 1730px){
#container_inner_wrap {
  .post_figure{width: 100%; display: table; text-align: center; top:0; left:0; transform:none; position:static; margin:80px 0px;}
  .post_mean_wrap{
    .section_title{float:none; padding-bottom:0px;}
    .post_img_wrap{width:100%; display:table;
      .account_img{width:20%; height:auto; margin-left:0px;
        img{width:100%; height:auto;}
      }
    }
  }
  .section_contents{float:none;}
  }
}
</style>
