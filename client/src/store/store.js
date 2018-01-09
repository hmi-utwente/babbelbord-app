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
    questions: []
  },
  getters: {
    // functions to get modified data from the store
  },
  mutations: {
    // functions to modify data on the store
    initializePlayers: (state, players) => {
      state.players = players.data;
      console.log('Players set!')
    },
    initializeTopics: (state, topics) => {
      state.topics = topics.data;
    },
    initializeQuestions: (state, questions) => {
        state.questions = questions.data;
    },
  },
  actions: {
    async retrievePlayers(context) {
      try {
        const players = await PlayersService.getPlayers()
        console.log('Players in retrieveUpdated function: ', players)
        context.commit('initializePlayers', players)
      } catch (error) {
        console.log('Error in getting updated players')
      }
    }
  }
})
