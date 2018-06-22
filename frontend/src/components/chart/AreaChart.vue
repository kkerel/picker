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
    rows () {
      return this.$store.state.accountProfileViews.rows
    }
  },
  data () {
    return {
      chartType: 'AreaChart',
      columns: [{
        'type': 'string',
        'label': '날짜'
      }, {
        'type': 'number',
        'label': '노출'
      }, {
        'type': 'number',
        'label': '도달'
      }],
      options: {
        colors: ['#42b883', '#8c7fd7'],
        legend: {
          position: 'top'
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
