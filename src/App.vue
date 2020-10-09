<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Produtos</a>
      </div>
    </nav>
        
    <br>

    <template>
      <div class="container">
        <div class="card-panel red lighten-4" v-if="errors.length">
          <ul v-for='(error, index) in errors' :key="index">
            <li>
              {{ error }}  
            </li>  
          </ul>
        </div>
      </div>
    </template>

    <br>

    <div class="container">

      <div class="row">
        <form class="col s12" @submit.prevent="save">
          
          <div class="row">
            <div class="input-field col s6">
              <input v-model="product.name" 
                autocomplete="off" 
                placeholder="Nome do produto" 
                id="name" 
                type="text" 
                class="validate">
              <label for="name">Nome</label>
            </div>
            <div class="input-field col s6">
              <input v-model="product.value" 
                autocomplete="off" 
                placeholder="Insira um valor" 
                id="value" 
                type="text"
                class="validate">
              <label for="value">Preço</label>
            </div>
          </div>
     
          <button type="submit" class="waves-effect waves-light btn"><i class="material-icons left">save</i>Salvar</button>

        </form>
      </div>

      <ul class="collection">
        <li class="collection-item avatar" v-for="product in products" :key="product.id">
          <i class="material-icons circle">local_grocery_store</i>
          <span class="title">{{ product.name }}</span>
          <p> {{ currencyFormat(product.value) }} </p>
          <div class="secondary-content">
            <a class="waves-effect waves-light btn blue" @click="edit(product)">
              <i class="material-icons">edit</i>
            </a>&nbsp;
            <a class="waves-effect waves-light btn red" @click='remove(product)'>
              <i class="material-icons">remove</i>
            </a>
          </div>
        </li>
      </ul>

    </div>

  </div>
</template>

<script>

import Product from './services/products'

export default {

  data() {
    return {
      product: {
        id: null,
        name: '',
        value: null
      },
      products: [],
      errors: []
    }
  },

  methods: {
    list() {
      Product.list().then(response => {
        this.products = response.data
      })
    },
    currencyFormat(value) {
      return parseInt(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    },
    save() {

      if(!this.product.id) {
        Product.save(this.product).then(response => {
          this.product = {}
          this.errors = []
          this.list()
          return response
        }).catch(e => {
          this.errors = []
          for(var i in e.response.data.errors) {
            this.errors.push((e.response.data.errors[i]).toString())
          }
        })
      } else {
        Product.update(this.product).then(response => {
          this.product = {}
          this.errors = []
          this.list()
          return response
        }).catch(e => {
          this.errors = []
          for(var i in e.response.data.errors) {
            this.errors.push((e.response.data.errors[i]).toString())
          }
        })
      }

    },
    remove(product) {
      Product.remove(product).then(response => {
        this.list()
        return response
      })
    },
    edit(product) {
      this.product = product
    }
  },

  mounted() {
    this.list()
  }
}
</script>
