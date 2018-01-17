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
    setCardForPlayer(state, category){
      console.log("Now in setCardPlayer")
      console.log("---- Category passed: " + category)

      if(!state.player.categoriesCollected){
        // set categoriesCollected array that doesn't exists
        Vue.set(state.player,'categoriesCollected', [])
        state.player.categoriesCollected.push({name: category, count: 1})

        // set last item added to lastItem
        Vue.set(state.player,'lastItem', category)
        console.log("Should be that state.player.lastItem is ", state.player.lastItem)

        console.log("---- categoriesCollected not existing before, but now: ", state.player.categoriesCollected)
      } else {

        for(var i = 0; i < state.player.categoriesCollected.length; i++){
          if(state.player.categoriesCollected[i].name === category){
            state.player.categoriesCollected[i].count++
          }
        }

        let findCategory = state.player.categoriesCollected.filter(function(obj){ return obj.name == category})
        if(findCategory.length === 0){
          console.log("-------- Category " + category + " still not in array, adding it!")
          state.player.categoriesCollected.push({name: category, count: 1})
          console.log("-------- Situation after adding new category: ", state.player.categoriesCollected)
        }

        // set last item added to lastItem
        state.player.lastItem = category
      }
    },
    setCardForCaregiver(state, category){
      console.log("Now in setCardCaregiver")
      console.log("---- Category passed: " + category)
      if(!state.caregiver.categoriesCollected){

        Vue.set(state.caregiver,'categoriesCollected', [])
        state.caregiver.categoriesCollected.push({name: category, count: 1})

        // set last item added to lastItem
        Vue.set(state.caregiver,'lastItem', category)

        console.log("---- categoriesCollected not existing before, but now: ", state.caregiver.categoriesCollected)
      } else {
        console.log("---- categoriesCollected for caregiver existing, going through existing array")

        for(var i = 0; i < state.caregiver.categoriesCollected.length; i++){
          console.log("-------- current item looped: ", state.caregiver.categoriesCollected[i])
          if(state.caregiver.categoriesCollected[i].name === category){
            state.caregiver.categoriesCollected[i].count++
          }
        }

        let findCategoryCaregiver = state.caregiver.categoriesCollected.filter(function(obj){ return obj.name == category})
        if(findCategoryCaregiver.length === 0){
          console.log("-------- Category " + category + " still not in array, adding it!")
          state.caregiver.categoriesCollected.push({name: category, count: 1})
          console.log("-------- Situation after adding new category: ", state.caregiver.categoriesCollected)
        }

        // set last item added to lastItem
        state.caregiver.lastItem = category
      }
    },
    resetPlayers(state){
      state.player = {}
      state.caregiver = {}
    },
    removeCardsForPlayers(state, {activePlayer, category}){
      console.log("ActivePlayer is " + activePlayer)
      var categoryToRemove = {}
      if(activePlayer === "player"){

        console.log("Inside player")
        // remove cards from player
        categoryToRemove = state.player.categoriesCollected.filter(function(obj){return obj.name == category})[0]
        console.log("---- This is the category to remove found for player: ", categoryToRemove)
        categoryToRemove.count = categoryToRemove.count - 2
        console.log("---- Updated count: ", categoryToRemove.count)

        // remove card from caregiver
        categoryToRemove = state.caregiver.categoriesCollected.filter(function(obj){return obj.name == category})[0]
        console.log("---- This is the category to remove found for caregiver: ", categoryToRemove)
        categoryToRemove.count = categoryToRemove.count - 1
        console.log("---- Updated count: ", categoryToRemove.count)
      } else {
        console.log("Inside caregiver")
        // remove cards from player
        let categoryToRemove = state.caregiver.categoriesCollected.filter(function(obj){return obj.name == category})[0]
        categoryToRemove.count = categoryToRemove.count - 2

        // remove card from caregiver
        categoryToRemove = state.player.categoriesCollected.filter(function(obj){return obj.name == category})[0]
        categoryToRemove.count = categoryToRemove.count - 1
      }
    },
    removeOneCardPlayer(state, category){
      for(let i = 0; i < state.player.categoriesCollected.length; i++){
        if(state.player.categoriesCollected[i].name == category && state.player.categoriesCollected[i].count > 0){
          state.player.categoriesCollected[i].count--
        }
      }
    },
    removeOneCardCaregiver(state, category){
      for(let i = 0; i < state.caregiver.categoriesCollected.length; i++){
        if(state.caregiver.categoriesCollected[i].name == category && state.caregiver.categoriesCollected[i].count > 0){
          state.caregiver.categoriesCollected[i].count--
        }
      }
    },
    giveCardToCaregiver(state){
      let lastCategory = state.player.lastItem
      console.log("LastCategory in player is " + lastCategory)

      // remove card from player
      for(let i = 0; i < state.player.categoriesCollected.length; i++){
        if(state.player.categoriesCollected[i].name = lastCategory){
          state.player.categoriesCollected[i].count--
        }
      }

      let cardAdded = false

      // give it to caregiver
      for(let i = 0; i < state.caregiver.categoriesCollected.length; i++){
        if(state.caregiver.categoriesCollected[i].name = lastCategory){
          state.caregiver.categoriesCollected[i].count++
          cardAdded = true
        }
      }

      // if it didn't find the category, push to the array
      if(!cardAdded){
        state.caregiver.categoriesCollected.push({name: lastCategory, count: 1})
      }
    },
    giveCardToPlayer(state){
      let lastCategory = state.caregiver.lastItem
      console.log("LastCategory in caregiver is " + lastCategory)

      // remove card from caregiver
      for(let i = 0; i < state.caregiver.categoriesCollected.length; i++){
        if(state.caregiver.categoriesCollected[i].name = lastCategory){
          state.caregiver.categoriesCollected[i].count--
        }
      }

      let cardAdded = false

      // give it to player
      for(let i = 0; i < state.player.categoriesCollected.length; i++){
        if(state.player.categoriesCollected[i].name = lastCategory){
          state.player.categoriesCollected[i].count++
          cardAdded = true
        }
      }

      // if it didn't find the category, push to the array
      if(!cardAdded){
        state.player.categoriesCollected.push({name: lastCategory, count: 1})
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
      context.commit('setCardForPlayer', category)
    },
    removePlayersCards(context, {activePlayer, category}){
      context.commit('removeCardsForPlayers', {activePlayer: activePlayer, category: category})
    },
    setCaregiverCard(context, category){
      context.commit('setCardForCaregiver', category)
    },
    resetPlayerCaregiver(context){
      context.commit('resetPlayers')
    },
    removeOneCardPlayer(context, category){
      context.commit('removeOneCardPlayer', category)
    },
    removeOneCardCaregiver(context, category){
      context.commit('removeOneCardCaregiver', category)
    },
    giveCardToCaregiver(context){
      context.commit('giveCardToCaregiver')
    },
    giveCardToPlayer(context){
      context.commit('giveCardToPlayer')
    }
  }
})
