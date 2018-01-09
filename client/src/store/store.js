import Vue from 'vue'
import Vuex from 'vuex'

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
    },
    initializeTopics: (state, topics) => {
      state.topics = topics.data;
    },
    initializeQuestions: (state, questions) => {
        state.questions = questions.data;
    }
  }
})
