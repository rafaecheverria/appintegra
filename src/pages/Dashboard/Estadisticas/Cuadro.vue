<template>
  <div>
      <div disabled class="row">
        <div class="col-xl-2 col-md-4 col-sm-6">
          <stats-card title="150GB" subTitle="CAPACIDAD">
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <template slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </template>
          </stats-card>
        </div>

        <div class="col-xl-2 col-md-4 col-sm-6">
          <stats-card title="$ 1,345" subTitle="MATRICULA">
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-light-3 text-success"></i>
            </div>
            <template slot="footer">
              <i class="fa fa-calendar-o"></i>Last day
            </template>
          </stats-card>
        </div>

        <div class="col-xl-2 col-md-4 col-sm-6">
          <stats-card title="23" subTitle="CUPOS">
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-vector text-danger"></i>
            </div>
            <template slot="footer">
              <i class="fa fa-clock-o"></i>Last day
            </template>
          </stats-card>
        </div>

        <div class="col-xl-2 col-md-4 col-sm-6">
          <stats-card title="+45K" subTitle="USO CAPACIDAD">
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-favourite-28 text-primary"></i>
            </div>
            <template slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </template>
          </stats-card>
        </div>

        <div class="col-xl-2 col-md-4 col-sm-6">
          <stats-card title="150GB" subTitle="% ASISTENCIA">
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <template slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </template>
          </stats-card>
        </div>

        <div class="col-xl-2 col-md-4 col-sm-6">
          <stats-card title="150GB" subTitle="MOVIMIENTOS">
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <template slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </template>
          </stats-card>
        </div>
      </div>
    </div>


</template>

<script>
  import {StatsCard} from 'src/components/index'

  export default {
      data (){
      return {
        disabled: false
      }
    },
    components: {
     StatsCard,
    },
     methods: {
        consultar(){
            console.log("consultar")
        }
     }
  }

</script>
<style>
div[disabled] {
  opacity: 0.4;
  pointer-events: none;
}
</style>
