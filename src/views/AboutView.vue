<template>
  <div class="about">
    <!--configuracion para nombrar los pasos del proceso de compra-->
    <el-steps :active="active" finish-status="success">
      <el-step title="Step 1" />
      <el-step title="Step 2" />
      <el-step title="Step 3" />
    </el-steps>
    <template v-if="active == 0">
      <template v-if="$store.state.cart.length == 1">
        <h1>Your cart is empty</h1>
      </template>
      <!--productos en el carrito-->
      <template v-if="$store.state.cart.length != 1">
        <h1>Your cart has stuff</h1>
        <el-scrollbar height="120px">
          <el-space wrap>
            <el-card
              v-for="index in $store.state.cart.length-1"
              :key="index"
              class="box-card"
              style="width: 170px; height: 110px;"
            >
              <template #header>
                <div class="card-header">
                  <span>ProductID: {{$store.state.cart[index][0]['productId']}}</span>
                </div>
              </template>
              <div class="text item">
                <span>Quantity: {{$store.state.cart[index][0]['quantity']}}</span>
              </div> 
            </el-card>
          </el-space>
        </el-scrollbar><br>
      </template>
    </template>

    <template v-if="active == 1">
      <h1>Set your location</h1>
      <!--formulario de ingreso de ubicacion de envio-->
    </template>

    <template v-if="active == 2">
      <h1>Choose a payment option</h1>
      <!--formulario para elegir el tipo de pago-->
    </template>

    <template v-if="active == 3">
      <h1>Confirm the information</h1>
      <!--pantalla que muestre un resumen de la compra-->
    </template>

    <!--botones para avanzar al siguiente paso y confirmar compra-->
    <template v-if="$store.state.cart.length != 1 && active != 3">
      <el-button style="margin-top: 12px" @click="next()">Next step</el-button>
    </template>

    <template v-if="$store.state.cart.length != 1 && active == 3">
      <el-button style="margin-top: 12px" @click="$store.commit('emptyCart'); next(); complete();">Finish</el-button>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const active = ref(0)

  function next() {
    if (active.value++ > 2) active.value = 0
  }

  import { ElMessage } from 'element-plus'

  function complete() {
    ElMessage('Product Purchased, Thanks!')
  }
</script>

<style>
  .about{
    padding: 30px;
  }
</style>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: auto;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
</style>