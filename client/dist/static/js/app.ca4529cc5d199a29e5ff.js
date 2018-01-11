webpackJsonp([1],{"7zck":function(e,t){},"9Ces":function(e,t){},ABBJ:function(e,t){},EcnL:function(e,t){},GzIK:function(e,t){},LEKB:function(e,t){},NHnr:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("7+uW"),n={data:function(){return{title:"",backArrow:!1}},methods:{goBack:function(){this.$router.go(-1)}},created:function(){var e=this;Event.$on("toolbar-data",function(t,r){e.title=t,e.backArrow=r})}},i={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-toolbar",{attrs:{color:"amber",app:""}},[e.backArrow?r("v-btn",{staticClass:"hidden-xs-only",attrs:{icon:""},on:{click:e.goBack}},[r("v-icon",[e._v("arrow_back")])],1):e._e(),e._v(" "),r("v-toolbar-title",[e._v(e._s(e.title))]),e._v(" "),r("v-spacer"),e._v(" "),r("v-btn",{attrs:{icon:"",to:"/"}},[r("v-icon",[e._v("home")])],1),e._v(" "),r("v-btn",{attrs:{icon:""}},[r("v-icon",[e._v("settings")])],1)],1)},staticRenderFns:[]},s=r("VU/8")(n,i,!1,function(e){r("ABBJ")},"data-v-4b2527de",null).exports,o={name:"app",components:{PageHeader:s}},l={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("v-app",[t("page-header"),this._v(" "),t("main",[t("v-container",{attrs:{fluid:""}},[t("router-view")],1)],1)],1)],1)},staticRenderFns:[]},c=r("VU/8")(o,l,!1,function(e){r("WLhi")},null,null).exports,v=r("/ocq"),u=r("Xxa5"),p=r.n(u),d=r("exGp"),f=r.n(d),m=r("mtWM"),h=r.n(m),_=function(){return h.a.create({baseURL:"https://babbelbord.herokuapp.com/"})},y=function(){return _().get("/api/players")},g=function(e){return _().post("/api/player/update",e)},b=function(e){return _().post("/api/players/create",e)},k=function(){return _().get("/api/topics")},w=function(){return _().get("/api/questions")},x={data:function(){return{loading:!0}},created:function(){var e=this;return f()(p.a.mark(function t(){var r,a,n;return p.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return Event.$emit("toolbar-data","Babbelbord",!1),t.next=3,y();case 3:return r=t.sent,t.next=6,k();case 6:return a=t.sent,t.next=9,w();case 9:n=t.sent,e.$store.commit("initializePlayers",r),e.$store.commit("initializeTopics",a),e.$store.commit("initializeQuestions",n),e.loading=!1;case 14:case"end":return t.stop()}},t,e)}))()}},P={render:function(){var e=this.$createElement,t=this._self._c||e;return t("v-container",{attrs:{"text-xs-center":""}},[t("v-layout",{attrs:{row:"",wrap:""}},[t("v-flex",{attrs:{xs12:"",sm10:"","offset-sm1":""}},[t("v-content",[t("div",{staticClass:"welcome"},[t("h1",{staticClass:"display-2"},[this._v("Welcome to Babbelbord!")]),this._v(" "),t("p",[this._v("Here we should put a brief description of the game perhaps?")])]),this._v(" "),this.loading?t("div",{staticClass:"text-xs-center"},[t("v-progress-circular",{attrs:{indeterminate:"",size:100,width:3,color:"deep-purple"}}),this._v(" "),t("p",[this._v("Retrieving data...")])],1):this._e()])],1),this._v(" "),t("v-flex",{attrs:{xs12:""}},[t("v-btn",{attrs:{disabled:this.loading,dark:"",color:"deep-purple",to:"/players/select"}},[this._v("\n        Start game\n      ")]),this._v(" "),t("v-btn",{attrs:{disabled:this.loading,dark:"",color:"deep-purple",to:"/players/profiles"}},[this._v("\n        Profiles\n      ")])],1)],1)],1)},staticRenderFns:[]},$=r("VU/8")(x,P,!1,function(e){r("XTSF")},"data-v-046a756f",null).exports,C={components:{PageHeader:s},data:function(){return{loading:!0}},watch:{players_list:function(){this.loading=!1}},computed:{players_list:function(){return this.$store.state.players},topics:function(){return this.$store.state.topics}},created:function(){var e=this;return f()(p.a.mark(function t(){return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:Event.$emit("toolbar-data","Spelers",!0);case 1:case"end":return e.stop()}},t,e)}))()}},E={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h2",[e._v("Selecteer spelers")]),e._v(" "),r("p",[e._v("Selecteer twee spelers voor het babbelbord spel")]),e._v(" "),r("p",[e._v("Kies een van de volgende spelers")]),e._v(" "),r("v-container",{staticStyle:{"min-height":"0"},attrs:{fluid:"","grid-list-lg":""}},[r("v-layout",{attrs:{row:"",wrap:""}},e._l(e.players_list,function(t,a){return r("v-flex",{key:a,attrs:{xs4:""}},[r("v-card",[r("v-card-title",{attrs:{"primary-title":""}},[r("div",[r("h3",{staticClass:"headline mb-0"},[e._v(e._s(t.name)+" "+e._s(t.lastname))]),e._v(" "),r("div",[e._v("Topics avoided:\n                "),e._l(t.skipQuestions,function(t){return r("span",e._l(e.topics,function(a){return a.id==t?r("v-chip",{key:a.id,attrs:{color:"amber","text-color":"black"}},[e._v(e._s(a.name))]):e._e()}))})],2)])]),e._v(" "),r("v-card-actions",[r("v-btn",{attrs:{flat:"",to:"/players/edit/"+t.id,color:"deep-purple"}},[e._v("Edit")])],1)],1)],1)}))],1),e._v(" "),r("v-fab-transition",[r("v-btn",{staticStyle:{"margin-bottom":"3em","margin-right":"1em"},attrs:{dark:"",fab:"",fixed:"",absolute:"",bottom:"",right:"",color:"deep-purple",to:"/players/create"}},[r("v-icon",[e._v("add")])],1)],1)],1)},staticRenderFns:[]},q=r("VU/8")(C,E,!1,function(e){r("drsa")},"data-v-2fa5d575",null).exports,Q={render:function(){var e=this.$createElement,t=this._self._c||e;return t("v-card",[t("v-card-title",{attrs:{"primary-title":""}},[t("div",[t("h3",{staticClass:"headline mb-0"},[this._v(this._s(this.title))])])]),this._v(" "),this._t("default")],2)},staticRenderFns:[]},F={props:["player","active"],data:function(){return{}},methods:{toggleItem:function(e){Event.$emit("item-selected",e.id)}},computed:{topics:function(){return this.$store.state.topics}}},S={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-list-tile",{key:e.player.id,class:{enabled:e.active},attrs:{avatar:""},on:{click:function(t){t.stopPropagation(),e.toggleItem(e.player)}}},[r("v-list-tile-avatar",[r("v-icon",[e._v("face")])],1),e._v(" "),r("v-list-tile-content",[r("v-list-tile-title",[e._v(e._s(e.player.name)+" "+e._s(e.player.lastname)+" ")]),e._v(" "),r("v-list-tile-sub-title",e._l(e.player.skipQuestions,function(t){return r("span",e._l(e.topics,function(a){return a.id==t?r("span",{attrs:{color:"amber","text-color":"black"}},[e._v(" "+e._s(a.name)+" ")]):e._e()}))}))],1),e._v(" "),r("v-list-tile-action",[r("v-btn",{attrs:{icon:"",ripple:"",to:"/players/edit/"+e.player.id}},[r("v-icon",{attrs:{medium:"",color:"deep-purple"}},[e._v("mode_edit")])],1)],1)],1)},staticRenderFns:[]},L={components:{Panel:r("VU/8")({props:["title"],data:function(){return{}}},Q,!1,function(e){r("U27L")},"data-v-4fe156e0",null).exports,PlayerListItem:r("VU/8")(F,S,!1,function(e){r("GzIK")},"data-v-4361fa6d",null).exports},data:function(){return{caregiver:{name:""},player:{name:"",lastname:""},selectedPlayer:null,error:null,loader:null,valid:!1,loading:!1,snackbar:!1,timeout:3e3,showList:!0,showCaregiver:!1,showPlayer:!1}},computed:{players:function(){return this.$store.state.players}},methods:{register:function(){var e=this;return f()(p.a.mark(function t(){return p.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,b({name:e.player.name,lastname:e.player.lastname});case 3:e.$store.dispatch("retrievePlayers"),e.snackbar=!0,e.switchPlayerForm(),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),e.error=t.t0.response.data.error;case 11:case"end":return t.stop()}},t,e,[[0,8]])}))()},switchCaregiverForm:function(){this.showList=!this.showList,this.showCaregiver=!this.showCaregiver},switchPlayerForm:function(){this.showList=!this.showList,this.showPlayer=!this.showPlayer},addPlayer:function(e){console.log("Adding player to summary"),this.player=e},removeCaregiver:function(){this.caregiver.name=""},removePlayer:function(){this.player.name="",this.player.lastname=""},startGame:function(){console.log("Player: ",this.player),console.log("Caregiver: ",this.caregiver),this.$store.commit("setPlayerAndCaregiver",{player:this.player,caregiver:this.caregiver}),this.$router.push("/game")}},watch:{loader:function(){var e=this,t=this.loader;this[t]=!this[t],setTimeout(function(){return e[t]=!1},3e3),this.loader=null}},created:function(){Event.$emit("toolbar-data","Nieuw spel",!0)},mounted:function(){var e=this;Event.$on("item-selected",function(t){e.selectedPlayer=t})}},T={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{attrs:{fluid:"","grid-list-md":""}},[r("v-layout",{attrs:{row:"",wrap:""}},[r("v-flex",{attrs:{"d-flex":"",sm5:"","offset-sm1":""}},[e.players?r("panel",{attrs:{title:"Bestaande spelers"}},[r("v-list",{attrs:{"three-line":""}},[e._l(e.players,function(t){return[r("player-list-item",{attrs:{player:t,active:t.id===e.selectedPlayer},nativeOn:{click:function(r){e.addPlayer(t)}}}),e._v(" "),r("v-divider")]})],2)],1):e._e()],1),e._v(" "),r("v-flex",{attrs:{"d-flex":"",sm5:""}},[r("v-layout",{attrs:{column:""}},[r("v-flex",[r("panel",{attrs:{title:"Nieuwe speler"}},[r("v-list",{directives:[{name:"show",rawName:"v-show",value:e.showList,expression:"showList"}]},[r("v-list-tile",{attrs:{avatar:"",disabled:e.caregiver.name.length>0},on:{click:e.switchCaregiverForm}},[r("v-list-tile-avatar",[r("v-icon",[e._v("accessibility")])],1),e._v(" "),r("v-list-tile-content",[r("v-list-tile-title",[e._v("Zorgdrager")])],1)],1),e._v(" "),r("v-divider"),e._v(" "),r("v-list-tile",{attrs:{avatar:"",disabled:e.player.name.length>0},on:{click:e.switchPlayerForm}},[r("v-list-tile-avatar",[r("v-icon",[e._v("face")])],1),e._v(" "),r("v-list-tile-content",[r("v-list-tile-title",[e._v("Bewoner")])],1)],1)],1),e._v(" "),r("v-content",{directives:[{name:"show",rawName:"v-show",value:e.showCaregiver,expression:"showCaregiver"}]},[r("v-container",{attrs:{fluid:""}},[r("v-layout",{attrs:{row:"","justify-center":""}},[r("v-form",{attrs:{xs8:""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[r("v-text-field",{attrs:{label:"Naam van de zorgdrager",required:""},model:{value:e.caregiver.name,callback:function(t){e.$set(e.caregiver,"name",t)},expression:"caregiver.name"}}),e._v(" "),r("v-btn",{attrs:{flat:"",color:"orange"},on:{click:e.switchCaregiverForm}},[e._v("terug")]),e._v(" "),r("v-btn",{attrs:{color:"orange"},on:{click:e.switchCaregiverForm}},[e._v("\n                      ok\n                    ")])],1),e._v(" "),r("v-snackbar",{attrs:{timeout:e.timeout,color:"green"},model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v("\n                    Player created, taking you back to players' list in a moment.\n                    "),r("v-btn",{attrs:{dark:"",flat:""},nativeOn:{click:function(t){e.snackbar=!1}}},[e._v("Close")])],1)],1),e._v(" "),r("div",{staticClass:"error",domProps:{innerHTML:e._s(e.error)}})],1)],1),e._v(" "),r("v-content",{directives:[{name:"show",rawName:"v-show",value:e.showPlayer,expression:"showPlayer"}]},[r("v-container",{attrs:{fluid:""}},[r("v-layout",{attrs:{row:"","justify-center":""}},[r("v-form",{attrs:{xs8:""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[r("v-text-field",{attrs:{label:"Naam van de bewoner",required:""},model:{value:e.player.name,callback:function(t){e.$set(e.player,"name",t)},expression:"player.name"}}),e._v(" "),r("v-text-field",{attrs:{label:"Achternaam van de bewoner",required:""},model:{value:e.player.lastname,callback:function(t){e.$set(e.player,"lastname",t)},expression:"player.lastname"}}),e._v(" "),r("v-btn",{attrs:{flat:"",color:"orange"},on:{click:e.switchPlayerForm}},[e._v("terug")]),e._v(" "),r("v-btn",{attrs:{loading:e.loading,disabled:e.loading,color:"orange"},on:{click:e.register},nativeOn:{click:function(t){e.loader="loading"}}},[e._v("\n                      submit\n                    ")])],1),e._v(" "),r("v-snackbar",{attrs:{timeout:e.timeout,color:"green"},model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v("\n                    Player created, you can now select it from the list.\n                    "),r("v-btn",{attrs:{dark:"",flat:""},nativeOn:{click:function(t){e.snackbar=!1}}},[e._v("Close")])],1)],1),e._v(" "),r("div",{staticClass:"error",domProps:{innerHTML:e._s(e.error)}})],1)],1)],1)],1),e._v(" "),r("v-flex",{attrs:{"d-flex":""}},[r("panel",{attrs:{title:"Summary"}},[r("v-list",[e.caregiver.name?r("v-list-tile",{attrs:{avatar:""}},[r("v-list-tile-avatar",[r("v-icon",[e._v("accessibility")])],1),e._v(" "),r("v-list-tile-content",[r("v-list-tile-title",[e._v(e._s(e.caregiver.name))])],1),e._v(" "),r("v-list-tile-action",[r("v-btn",{attrs:{icon:"",ripple:""},on:{click:e.removeCaregiver}},[r("v-icon",{attrs:{medium:"",color:"red lighten-1"}},[e._v("delete")])],1)],1)],1):e._e(),e._v(" "),e.player.name?r("v-list-tile",{attrs:{avatar:""}},[r("v-list-tile-avatar",[r("v-icon",[e._v("face")])],1),e._v(" "),r("v-list-tile-content",[r("v-list-tile-title",[e._v(e._s(e.player.name)+" "+e._s(e.player.lastname))])],1),e._v(" "),r("v-list-tile-action",[r("v-btn",{attrs:{icon:"",ripple:""},on:{click:e.removePlayer}},[r("v-icon",{attrs:{medium:"",color:"red lighten-1"}},[e._v("delete")])],1)],1)],1):e._e()],1),e._v(" "),r("div",{staticClass:"text-xs-center"},[r("v-btn",{attrs:{color:"amber",disabled:0===e.player.name.length||0===e.caregiver.name.length},on:{click:e.startGame}},[e._v("Start Game")])],1)],1)],1)],1)],1)],1)],1)},staticRenderFns:[]},U=r("VU/8")(L,T,!1,function(e){r("EcnL")},"data-v-c10eb15a",null).exports,z={props:["id"],data:function(){return{player:{},loader:null,loading:!1,snackbar:!1,timeout:3e3}},computed:{topics:function(){return this.$store.state.topics}},methods:{changeTopicState:function(e){e.isDeselected=!e.isDeselected},savePlayerDetails:function(){var e=this;return f()(p.a.mark(function t(){var r;return p.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:for(r=0;r<e.topics.length;r++)null!=e.player.skipQuestions?e.topics[r].isDeselected?e.player.skipQuestions.includes(e.topics[r].id)||e.player.skipQuestions.push(e.topics[r].id):e.player.skipQuestions.includes(e.topics[r].id)&&e.player.skipQuestions.splice(e.player.skipQuestions.indexOf(e.topics[r].id),1):(e.player.skipQuestions=[],e.topics[r].isDeselected&&e.player.skipQuestions.push(e.topics[r].id));return t.prev=1,t.next=4,g(e.player);case 4:e.snackbar=!0,setTimeout(function(){e.$router.go(-1)},3e3),e.$store.dispatch("retrievePlayers"),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(1),e.error=t.t0.response.data.error;case 12:case"end":return t.stop()}},t,e,[[1,9]])}))()}},watch:{loader:function(){var e=this,t=this.loader;this[t]=!this[t],setTimeout(function(){return e[t]=!1},3e3),this.loader=null}},created:function(){var e=this;return f()(p.a.mark(function t(){var r;return p.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:for(console.log("this.player before: ",e.player),e.player=e.$store.getters.getPlayerById(e.id),r=0;r<e.topics.length;r++)null==e.player.skipQuestions?e.$set(e.topics[r],"isDeselected",!1):e.player.skipQuestions.includes(e.topics[r].id)?e.$set(e.topics[r],"isDeselected",!0):e.$set(e.topics[r],"isDeselected",!1);case 3:case"end":return t.stop()}},t,e)}))()}},B={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h2",[e._v("Onderwerpen")]),e._v(" "),r("p",[e._v("Deselecteer de onderwerpen die je wilt vermijden")]),e._v(" "),r("p",[e._v(" "+e._s(e.player.name)+" ")]),e._v(" "),r("v-container",{staticStyle:{"min-height":"0"},attrs:{fluid:"","grid-list-lg":""}},[r("v-layout",{attrs:{row:"",wrap:""}},e._l(e.topics,function(t,a){return r("v-flex",{key:a,attrs:{xs4:""}},[r("v-btn",{class:t.isDeselected?"disabled":"enabled",attrs:{large:""},on:{click:function(r){e.changeTopicState(t)}}},[e._v("\n          "+e._s(t.name)+"\n        ")])],1)}))],1),e._v(" "),r("div",{staticClass:"text-xs-center"},[r("v-btn",{attrs:{loading:e.loading,disabled:e.loading,color:"deep-purple"},on:{click:e.savePlayerDetails},nativeOn:{click:function(t){e.loader="loading"}}},[e._v("Save\n    ")]),e._v(" "),r("v-snackbar",{attrs:{timeout:e.timeout,color:"green"},model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},[e._v("\n      Player updated, taking you back to players' list in a moment.\n      "),r("v-btn",{attrs:{dark:"",flat:""},nativeOn:{click:function(t){e.snackbar=!1}}},[e._v("Close")])],1)],1)],1)},staticRenderFns:[]},R=r("VU/8")(z,B,!1,function(e){r("LEKB")},"data-v-7b091669",null).exports,V={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h4",[e._v("Category: "+e._s(e.question.category))]),e._v(" "),r("h2",[e._v(e._s(e.question.question))]),e._v(" "),e._l(e.question.subquestions,function(t){return r("h3",[e._v(e._s(t))])}),e._v(" "),r("v-btn",{on:{click:e.followUpQuestion}},[e._v("following question")]),e._v(" "),r("v-btn",{on:{click:e.nextTurn}},[e._v("done")]),e._v(" "),r("v-btn",{on:{click:e.addToSkipQuestions}},[e._v("skip")])],2)},staticRenderFns:[]},A={render:function(){var e=this.$createElement;return(this._self._c||e)("div")},staticRenderFns:[]},D={components:{Question:r("VU/8")({props:["question","subquestions"],data:function(){return{currentQuestion:""}},methods:{addToSkipQuestions:function(){},followUpQuestion:function(){},nextTurn:function(){}}},V,!1,function(e){r("zyrJ")},null,null).exports,Instruction:r("VU/8")({data:function(){return{}}},A,!1,function(e){r("SdEr")},null,null).exports},data:function(){return{currentPlayers:[{}],activePlayer:"",gameStatus:"turn",cards:{player1:0,player2:0},currentQuestion:{},currentSubQuestions:[],showInstructions:!0,showQuestions:!1}},computed:{questions:function(){return this.$store.state.questions}},created:function(){var e=this;return f()(p.a.mark(function t(){return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},t,e)}))()}},I={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h3",[this._v("It is "+this._s(this.activePlayer)+" turn.")]),this._v(" "),t("question",{attrs:{question:this.questions[2],subquestions:this.questions[2].subquestions}}),this._v(" "),t("instruction")],1)},staticRenderFns:[]},N=r("VU/8")(D,I,!1,function(e){r("9Ces")},null,null).exports;a.a.use(v.a);var O=new v.a({routes:[{path:"/",name:"welcome",component:$},{path:"/players/profiles",name:"players",component:q},{path:"/players/select",name:"selectPlayers",component:U},{path:"/players/edit/:id",name:"editPlayer",component:R,props:!0},{path:"/game",name:"game",component:N}]}),H=r("3EgV"),G=r.n(H),J=(r("9JMe"),r("7zck"),r("NYxO"));a.a.use(J.a);var j=new J.a.Store({strict:!0,state:{players:[],topics:[],categories:[],questions:[],player:{},caregiver:{}},getters:{getPlayerById:function(e){return function(t){for(var r=0;r<e.players.length;r++)if(e.players[r].id==t)return e.players[r]}}},mutations:{initializePlayers:function(e,t){e.players=t.data,console.log("Players set!")},initializeTopics:function(e,t){e.topics=t.data},initializeQuestions:function(e,t){e.questions=t.data},setPlayerAndCaregiver:function(e,t){var r=t.player,a=t.caregiver;console.log("Caregiver: ",a),e.player=r,e.caregiver=a}},actions:{retrievePlayers:function(e){var t=this;return f()(p.a.mark(function r(){var a;return p.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,y();case 3:a=t.sent,console.log("Players in retrieveUpdated function: ",a),e.commit("initializePlayers",a),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.log("Error in getting updated players");case 11:case"end":return t.stop()}},r,t,[[0,8]])}))()}}});a.a.config.productionTip=!1,a.a.use(G.a),window.Event=new a.a,new a.a({el:"#app",router:O,store:j,template:"<App/>",components:{App:c}})},SdEr:function(e,t){},U27L:function(e,t){},WLhi:function(e,t){},XTSF:function(e,t){},drsa:function(e,t){},zyrJ:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.ca4529cc5d199a29e5ff.js.map