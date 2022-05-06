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
    //productos
    updateProducts(state, moreProducts){
      state.products = moreProducts;
    },
    updateTempProd(state, NewTemp){
      state.tempProduct = NewTemp;
    },
    //producto unico, esto para evitar sobre-escribir la lista original de productos
    updateSingleProduct(state, otherProduct){
      state.singleProduct = otherProduct;
    },
    //categorias
    updateCategories(state, moreCategories){
      state.categories = moreCategories;
    },
    //cantidad de un producto
    startCount(state){
      state.cantProduct=1;
    },
    addCount(state){
      if(state.cantProduct<100){state.cantProduct++;}
    },
    dropCount(state){
      if(state.cantProduct>1){state.cantProduct--;}
    },
    //manejo del carrito
    updateCart(state, newProd){
      state.cart.push(newProd);
    },
    emptyCart(state){
      state.cart = [null];
    }
  },
  actions: {
    //coneccion con la api para recolectar los datos de los productos
    getAPIProducts({commit}){
      axios.get('https://fakestoreapi.com/products')
      .then(response =>{
        commit('updateProducts', response.data)
      })
    },
    //coneccion con la api para recolectar los datos de las categorias
    getAPICategories({commit}){
      axios.get('https://fakestoreapi.com/products/categories')
      .then(response =>{
        commit('updateCategories', response.data)
      })
    },
    //coleccion de productos filtrados por categoria
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
    //obtencion de un producto especifico
    getAProduct({commit}, TID){
      let url = 'https://fakestoreapi.com/products/'+TID;
      axios.get(url)
      .then(response =>{
        commit('updateSingleProduct', response.data)
      })
    },
    //añadir productos al carro de compras
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

      commit('updateCart', posteada.products);
    }
  },
  modules: {
  }
})
