<template>
  <div>
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card title="180GB" subTitle="Capacidad">
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <template slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </template>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card title="$ 1,345" subTitle="Matricula">
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-light-3 text-success"></i>
            </div>
            <template slot="footer">
              <i class="fa fa-calendar-o"></i>Last day
            </template>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card title="23" subTitle="Vacantes">
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-vector text-danger"></i>
            </div>
            <template slot="footer">
              <i class="fa fa-clock-o"></i>Last day
            </template>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card title="+45K" subTitle="% Asistencia">
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-favourite-28 text-primary"></i>
            </div>
            <template slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </template>
          </stats-card>
        </div>

      </div>

      <div class="row">
        <div class="col-md-6">
          <chart-card
            :chart-data="barChart.data"
            :chart-options="barChart.options"
            :chart-responsive-options="barChart.responsiveOptions"
            chart-type="Bar">
            <template slot="header">
              <h4 class="card-title">2014 Sales</h4>
              <p class="card-category">All products including Taxes</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Tesla Model S
                <i class="fa fa-circle text-danger"></i> BMW 5 Series
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-check"></i> Data information certified
              </div>
            </template>
          </chart-card>
        </div>
      </div>
  </div>
</template>

<script>
import {StatsCard, ChartCard} from 'src/components/index'
export default {
   components: {
      StatsCard,
      ChartCard
    },

  data () {
    return {
      barChart: {
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
              [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
            ]
          },
          options: {
            seriesBarDistance: 10,
            axisX: {
              showGrid: false
            },
            height: '245px'
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },

    }
  }

}
</script>

<style>

</style>
