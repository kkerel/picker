<template>
  <div>
    <vue-chart
      :chart-type="chartType"
      :columns="columns"
      :rows="rows"
      :options="options"
    />
  </div>
</template>

<script>
export default {
  created () {
    switch (this.stackedColumnChartType) {
      case 'participationDegree':
        this.columns = [{
          'type': 'string',
          'label': '날짜'
        }, {
          'type': 'number',
          'label': '좋아요'
        }, {
          'type': 'number',
          'label': '댓글'
        }, {
          'type': 'number',
          'label': '저장'
        }]
        break
      case 'accountBuzzContentInsight':
        this.columns = [{
          'type': 'string',
          'label': '날짜'
        }, {
          'type': 'number',
          'label': '태그된 게시물'
        }, {
          'type': 'number',
          'label': '언급된 게시물'
        }, {
          'type': 'number',
          'label': '언급된 댓글'
        }]
        break
      default:
        break
    }
  },
  computed: {
    rows () {
      return this.stackedColumnChartRows
    }
  },
  data () {
    return {
      chartType: 'ColumnChart',
      columns: [],
      options: {
        height: 400,
        colors: ['#84dab1', '#8c7fd9', '#ffec83'],
        focusTarget: 'category',
        isStacked: 'true',
        legend: {
          position: 'top'
        },
        vAxis: {
          format: '#,###'
        }
      }
    }
  },
  props: [
    'stackedColumnChartRows',
    'stackedColumnChartType'
  ]
}
</script>

<style scoped>

</style>
