<template>
  <catFil/>
  <prodVi/>
</template>

<script lang="ts">
  import { Store } from 'vuex'

  declare module '@vue/runtime-core' {
    // declare your own store states
    interface State {
      count: number
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
      $store: Store<State>
    }
  }

  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'HomeView',
    created(){
      this.$store.dispatch('getAPICategories');
      this.$store.dispatch('getAPIProducts');
    },
    components:{
      'catFil': require('@/components/categoryFilter.vue').default,
      'prodVi': require('@/components/productsView.vue').default
    }
  });
</script>