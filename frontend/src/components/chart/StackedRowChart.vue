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
      return this.$store.state.accountFollowerDemographics.rows
    }
  },
  data () {
    return {
      chartType: 'BarChart',
      columns: [{
        'type': 'string',
        'label': '연령'
      }, {
        'type': 'number',
        'label': '여성'
      }, {
        'type': 'number',
        'role': 'tooltip'
      }, {
        'type': 'number',
        'label': '남성'
      }, {
        'type': 'number',
        'role': 'tooltip'
      }],
      options: {
        height: 400,
        colors: ['#84dab1', '#8c7fd9'],
        focusTarget: 'category',
        isStacked: 'true',
        legend: {
          position: 'top'
        },
        vAxis: {
          title: '연령'
        },
        hAxis: {
          format: '#,###;#,###'
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
