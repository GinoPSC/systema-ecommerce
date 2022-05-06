<template>
  <div class="Category_Menu">
    <el-collapse accordion>
      <el-collapse-item title="Category Filter" name="1">
        <template #title>
          Category Filter
        </template>
        <div>
          <el-space wrap>
            <!--configuracion de botones para filtrar por categoria-->
            <el-card style="width: 200px; height: 130px;">
              <template #header>
                <div class="card-header">
                  <span>Category #0</span>
                </div>
              </template>
              <div class="text item">
                <el-button round @click="$store.dispatch('getAPIProducts')">all</el-button>
                <span></span>
              </div>
            </el-card>
            <el-card
              v-for="CategoryIndex in 4"
              :key="CategoryIndex"
              class="box-card"
              style="width: 200px; height: 130px;"
            >
              <template #header>
                <div class="card-header">
                  <span>Category #{{CategoryIndex}}</span>
                </div>
              </template>
              <div class="text item">
                <el-button round @click="$store.dispatch('productsCategory'+CategoryIndex)">
                  {{$store.state.categories[CategoryIndex-1]}}
                </el-button>
                <span></span>
              </div>
            </el-card>
          </el-space>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style>
  .Category_Menu {
    padding: 30px;
  }
</style>