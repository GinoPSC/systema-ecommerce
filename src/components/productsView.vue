<template>
  <div class="Product_Menu">
    <el-scrollbar height="450px">
      <el-space wrap>
        <el-card
          v-for="things in $store.state.products"
          :key="things.id"
          class="box-card"
          style="width: 306px; height: 440px;"
        >
          <template #header>
            <div class="card-header">
              <el-scrollbar height="35px">
                <span>{{things.id}} - {{things.title}}</span>
              </el-scrollbar>
            </div>
          </template>
          <div class="text item">
            <img :src="things.image" style="width: 100px; height: 100px;" alt="">
          </div>
          <div class="card-footer">
            <hr><el-scrollbar height="74px">
              <span>{{things.description}}</span>
            </el-scrollbar><hr>
            <span>{{things.category}}</span><br>
            <span>price => {{things.price}}$</span><br>
            <span>rates => {{things.rating.rate}} - {{things.rating.count}}</span><hr>
            <el-button
              type="primary"
              style="margin-left: 16px"
              @click="
                $store.commit('updateTempProd', things.id);
                $store.dispatch('getAProduct', things.id);
                $store.commit('startCount');
                drawer = true;
              "
            >
              Select Item
            </el-button>
          </div>
        </el-card>
        <el-drawer v-model="drawer" direction="ttb" :with-header="false" size="55%">
          <span>You have selected a product!</span><hr>
          <div class="row">
            <div class="column_A">
              <el-space>
                <el-card
                  class="box-card"
                  style="width: 300px; height: 250px;"
                >
                  <template #header>
                    <div class="card-header">
                      <el-scrollbar height="35px">
                        <span>{{$store.state.singleProduct.id}} - {{$store.state.singleProduct.title}}</span>
                      </el-scrollbar>
                    </div>
                  </template>
                  <div class="text item">
                    <img :src="$store.state.singleProduct.image" style="width: 140px; height: 140px;" alt="">
                  </div>
                </el-card>
              </el-space>
            </div>
            <div class="column_B">
              <div class="card-footer">
                <span>Description: </span><br>
                <el-scrollbar height="55px">
                  <span>{{$store.state.singleProduct.description}}</span>
                </el-scrollbar><br>
                <span>Category: {{$store.state.singleProduct.category}}</span><br>
                <span>Price: {{$store.state.singleProduct.price}}$</span><br>
                <span>
                  Rate: {{$store.state.singleProduct.rating.rate}}
                   - {{$store.state.singleProduct.rating.count}}
                </span><br><br>
                <span>Amount: </span>
                <el-button
                  type="danger"
                  size="small"
                  circle
                  @click="$store.commit('dropCount')"
                >-</el-button>
                <span><b>| {{$store.state.cantProduct}} |</b></span>
                <el-button
                  type="primary"
                  size="small"
                  circle
                  @click="$store.commit('addCount')"
                >+</el-button><br><br>
                <el-button
                  type="success"
                  round
                  @click="
                    $store.dispatch('addTOcart',[
                      $store.state.singleProduct.id,
                      $store.state.cantProduct
                    ]);
                    cancelClick();
                  "
                >
                  Add to Cart
                </el-button>
              </div>
            </div>
          </div> 
        </el-drawer>
      </el-space>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const drawer = ref(false)
  function cancelClick() {
    drawer.value = false
  }
</script>

<style>
  .Product_Menu {
    padding: 30px;
  }

  .row {
    display: flex;
  }

  .column_B {
    text-align: justify;
  }
</style>