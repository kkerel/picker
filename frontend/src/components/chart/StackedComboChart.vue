<template>
  <div>
    <vue-chart
      :chart-type="chartType"
      :columns="columns"
      :rows="rows"
      :options="options"
      class="chart_test"
    />
  </div>
</template>

<script>
export default {
  computed: {
    rows () {
      return this.$store.state.accountFollowerInsight.rows
    }
  },
  data () {
    return {
      chartType: 'ColumnChart',
      columns: [{
        'type': 'string',
        'label': '날짜'
      }, {
        'type': 'number',
        'label': '증가'
      }, {
        'type': 'number',
        'label': '감소'
      }, {
        'type': 'number',
        'label': '전체 팔로워 수'
      }],
      options: {
        height: 400,
        colors: ['#84dab1', '#ffec83', '#8c7fd9'],
        isStacked: 'true',
        seriesType: 'bars',
        series: {
          0: { targetAxisIndex: 0 },
          1: { targetAxisIndex: 0 },
          2: { targetAxisIndex: 1, type: 'line' }
        },
        vAxes: [
          {
            title: '증감'
          },
          {
            title: '전체 팔로워 수'
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.chart_test{transition: opacity .5s;}
</style>
