import Vue from 'vue'
import Vuex from 'vuex'

import PlayersService from '@/services/PlayersService'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    players: [],
    topics: [],
    categories: [],
    questions: [],
    player: {},
    caregiver: {}
  },
  getters: {
    // functions to get modified data from the store
    getPlayerById: (state) => (id) => {
      for(var i=0; i < state.players.length; i++){
        if(state.players[i].id == id){
          return state.players[i]
        }
      }
    }
  },
  mutations: {
    // functions to modify data on the store
    initializePlayers: (state, players) => {
      state.players = players.data;
    },
    initializeTopics: (state, topics) => {
      state.topics = topics.data;
    },
    initializeQuestions: (state, questions) => {
        state.questions = questions.data;
    },
    initializeCategories: (state, categories) => {
      state.categories = categories.data;
    },
    setPlayerAndCaregiver: (state, {player, caregiver}) => {
      console.log('Caregiver: ', caregiver)
      state.player = player
      state.caregiver = caregiver
    },
    updatePlayerQuestions: (state, question) => {
      if(state.player.skipQuestions == null){
        state.player.skipQuestions = []
      }

      state.player.skipQuestions.push(question.id)
      console.log("player.skipQuestion after update: ", state.player.skipQuestions)
    },
    setCard(state, category){
      console.log("Now in setCard")
      console.log("---- Category passed: " + category)
      if(!state.player.categoriesCollected){
        Vue.set(state.player,'categoriesCollected', [])
        state.player.categoriesCollected.push({name: category, count: 1})
        // Vue.set(state.player.categoriesCollected[state.player.categoriesCollected.length], {name: category, count: 1})
        console.log("---- categoriesCollected not existing before, but now: ", state.player.categoriesCollected)
      } else {
        for(var i = 0; i < state.player.categoriesCollected.length; i++){
          if(state.player.categoriesCollected[i].name === category){
            state.player.categoriesCollected[i].count++
          }
        }
      }
    }
  },
  actions: {
    async retrievePlayers(context) {
      try {
        const players = await PlayersService.getPlayers()
        context.commit('initializePlayers', players)
        console.log("Players retrieved from server!")
      } catch (error) {
        console.log('Error in getting updated players')
      }
    },
    async updatePlayerSkippedQuestions(context, question){
      context.commit('updatePlayerQuestions', question)
      try {
        await PlayersService.update(context.state.player)
        context.dispatch('retrievePlayers')
      } catch(error) {
        console.log('Error in updating the player\'s questions: ' + error.message)
      }
    },
    setPlayerCard(context, category){
      context.commit('setCard', category)
    }
  }
})
