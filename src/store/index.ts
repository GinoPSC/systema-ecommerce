import { CaretTop } from '@element-plus/icons-vue/dist/types';
import axios from 'axios';
import { createStore } from 'vuex'

export default createStore({
  state: {
    tempProduct: -1,
    products: [],
    singleProduct: [],
    categories: [],
    cantProduct: 1,
    cart: [null]
  },
  getters: {
  },
  mutations: {
    updateProducts(state, moreProducts){
      state.products = moreProducts;
    },
    updateSingleProduct(state, otherProduct){
      state.singleProduct = otherProduct;
    },
    updateCategories(state, moreCategories){
      state.categories = moreCategories;
    },
    updateTempProd(state, NewTemp){
      state.tempProduct = NewTemp;
    },
    startCount(state){
      state.cantProduct=1;
    },
    addCount(state){
      if(state.cantProduct<100){state.cantProduct++;}
    },
    dropCount(state){
      if(state.cantProduct>1){state.cantProduct--;}
    },
    updateCart(state, newProd){
      state.cart.push(newProd);
    },
    emptyCart(state){
      state.cart = [null];
    }
  },
  actions: {
    getAPIProducts({commit}){
      axios.get('https://fakestoreapi.com/products')
      .then(response =>{
        commit('updateProducts', response.data)
      })
    },
    getAPICategories({commit}){
      axios.get('https://fakestoreapi.com/products/categories')
      .then(response =>{
        commit('updateCategories', response.data)
      })
    },
    productsCategory1({commit}){
      axios.get('https://fakestoreapi.com/products/category/electronics')
      .then(response =>{
        commit('updateProducts', response.data)
      })
    },
    productsCategory2({commit}){
      axios.get('https://fakestoreapi.com/products/category/jewelery')
      .then(response =>{
        commit('updateProducts', response.data)
      })
    },
    productsCategory3({commit}){
      axios.get("https://fakestoreapi.com/products/category/men's clothing")
      .then(response =>{
        commit('updateProducts', response.data)
      })
    },
    productsCategory4({commit}){
      axios.get("https://fakestoreapi.com/products/category/women's clothing")
      .then(response =>{
        commit('updateProducts', response.data)
      })
    },
    getAProduct({commit}, TID){
      let url = 'https://fakestoreapi.com/products/'+TID;
      axios.get(url)
      .then(response =>{
        commit('updateSingleProduct', response.data)
      })
    },
    addTOcart({commit}, prodData){
      let posteada = {
        userId: 1,
        date: '2020-02-03',
        products:[{
          productId: prodData[0],
          quantity: prodData[1]
        }]
      };

      //un POST hacia fakestoreapi no actualiza su base de datos
      //por lo tanto, guardare los productos en una variable state de vuex
      axios.post('https://fakestoreapi.com/carts',posteada)
      .then(response => {
        console.log(response)
      });

      commit('updateCart', posteada);
    }
  },
  modules: {
  }
})
