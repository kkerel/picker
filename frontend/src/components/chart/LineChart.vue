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
  computed: {
    rows: {
      get () {
        return this.arr
      },
      set () {
        this.arr = []
        const rows = this.participationRateRows
        rows.forEach(row => {
          this.arr.push([row[0], this.createCustomHTMLContent(row[0], row[1], row[2]), row[1], row[2]])
        })
      }
    }
  },
  data () {
    return {
      arr: [],
      chartType: 'LineChart',
      columns: [{
        'type': 'string',
        'label': '기간'
      }, {
        'type': 'string',
        'role': 'tooltip',
        'p': { 'html': true }
      }, {
        'type': 'number',
        'label': '현재 게시물'
      }, {
        'type': 'number',
        'label': '비교 게시물'
      }],
      options: {
        height: 300,
        colors: ['#42b883', '#8c7fd9'],
        focusTarget: 'category',
        tooltip: { isHtml: true },
        vAxis: {
          minValue: 0,
          maxValue: 50,
          format: '#\'%\''
        },
        legend: {
          position: 'top'
        },
        pointSize: 5
      }
    }
  },
  props: [
    'participationRateRows'
  ],
  watch: {
    participationRateRows (newVal, oldVal) {
      this.rows = newVal
    }
  },
  methods: {
    createCustomHTMLContent (day, currentMedia, compareMedia) {
      return '<div class="chart_info">' +
             '<div class="day">' + day + '</div>' +
             '<div class="currentMedia"><span class="bullet"></span><span>현재 게시물:</span><span>' + currentMedia + '%</span></div>' +
             '<div class="compareMedia"><span class="bullet"></span><span>비교 게시물:</span><span>' + compareMedia + '%</span></div>' +
             '</div>'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
