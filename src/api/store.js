import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {

  personInformation: {},

  imageUrl: ''

};

const store = new Vuex.Store({

  state

});



export default store;
