import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import {
  UPDATEPLANETS_TYPE,
  UPDATECURRENT_TYPE,
  TORIGHT_TYPE,
  TOLEFT_TYPE,
  LOADINGASYNC_TYPE,
  LOADINGASYNCDARK_TYPE,
  FINISHPREPARING_TYPE,
  NAVBARCONTROL_TYPE,
  ERRORLOGSIGN_TYPE,
} from "./mutationType";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoadingAsync: false,
    isLoadingAsyncDark: true,
    isFinishPreparing: false,
    isMuted: false,
    isAttemptLogSignError: false,
    isNavbarDisplay: true,
    currentPlanetIndex: 0,
    currentUser: {},
    currentUserID: null,
    planets: [],
    bookings: [],
  },
  getters: {
    isLoggedIn: (state) => {
      if (state.currentUser.username) return true;
      else return false;
    },
    planetSlug: (state) => (slug) => {
      return state.planets.find((planet) => planet.slug === slug);
    },
  },
  mutations: {
    [UPDATEPLANETS_TYPE](state, payload) {
      state.planets = payload;
    },

    [FINISHPREPARING_TYPE](state) {
      state.isFinishPreparing = true;
    },

    [NAVBARCONTROL_TYPE](state, payload) {
      state.isNavbarDisplay = payload;
    },

    [UPDATECURRENT_TYPE](state, payload) {
      state.currentUser = {
        ...state.currentUser,
        id: payload.id,
        username: payload.username,
        password: payload.password,
        bookings: payload.bookings,
      };
    },

    [LOADINGASYNC_TYPE](state, payload) {
      state.isLoadingAsync = payload;
    },
    [LOADINGASYNCDARK_TYPE](state, payload) {
      state.isLoadingAsyncDark = payload;
    },

    [TORIGHT_TYPE](state) {
      if (state.currentPlanetIndex < state.planets.length - 1)
        state.currentPlanetIndex++;
    },
    [TOLEFT_TYPE](state) {
      if (state.currentPlanetIndex > 0) state.currentPlanetIndex--;
    },

    // [BOOKING_TYPE](state, payload) {
    //   if (payload.date !== "" && payload.number !== "") {
    //     state.bookings = [
    //       ...state.bookings,
    //       {
    //         planet: payload.planet,
    //         date: payload.date,
    //         number: payload.number,
    //       },
    //     ];
    //   } else if (payload === "clear") {
    //     state.bookings = [];
    //   }
    // },

    [ERRORLOGSIGN_TYPE](state, payload) {
      state.isAttemptLogSignError = payload;
    },
  },
  actions: {
    //update current state from API
    updateCurrentAction({ commit }) {
      // commit(LOADINGASYNC_TYPE, true);
      return axios
        .get("https://test-heroku444.herokuapp.com/currentUser")
        .then((res) => {
          commit(UPDATECURRENT_TYPE, res.data);
          // commit(LOADINGASYNC_TYPE, false);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //update planets state from API
    updatePlanetsAction({ commit }) {
      // commit(LOADINGASYNC_TYPE, true);
      return axios
        .get("https://test-heroku444.herokuapp.com/planets")
        .then((res) => {
          commit(UPDATEPLANETS_TYPE, res.data);
          // commit(LOADINGASYNC_TYPE, false);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // log in/sign up action
    logSignAction({ commit }, userInput) {
      //Loading on
      commit(LOADINGASYNC_TYPE, true);

      //get all user from API
      return axios
        .get("https://test-heroku444.herokuapp.com/usersList")
        .then((res) => {
          const allUsers = res.data;

          //get current input
          const usernameInput = userInput.userData.usernameInput;
          const passwordInput = userInput.userData.passwordInput;
          const currentUserInput = {
            id: null,
            username: usernameInput,
            password: passwordInput,
            bookings: [],
          };

          //user checking: whether find user in put in user list or not
          const userChecking = allUsers.find(
            (user) =>
              user.username === usernameInput && user.password === passwordInput
          );

          //user checking A: found user input in user list
          if (userChecking) {
            currentUserInput.id = userChecking.id;
            currentUserInput.bookings = userChecking.bookings;

            //if request is for "log in" => accept
            if (userInput.type === "Log In") {
              //update current state
              commit(UPDATECURRENT_TYPE, currentUserInput);

              //update current api
              axios
                .put(
                  "https://test-heroku444.herokuapp.com/currentUser",
                  currentUserInput
                )
                .catch((err) => {
                  console.log(err);
                });

              //if request is for "sign up" => deny
            } else {
              commit(ERRORLOGSIGN_TYPE, true);
            }

            //user checking B: not found user input in user list
          } else {
            //if request is for "log in" => deny
            if (userInput.type === "Log In") {
              commit(ERRORLOGSIGN_TYPE, true);

              //if request is for "sign up" => accept
            } else {
              //post user list API
              axios
                .post(
                  "https://test-heroku444.herokuapp.com/usersList",
                  currentUserInput
                )
                .then((res) => {
                  currentUserInput.id = res.data.id;
                  //update current state
                  commit(UPDATECURRENT_TYPE, currentUserInput);

                  //update current API
                  axios.put(
                    "https://test-heroku444.herokuapp.com/currentUser",
                    currentUserInput
                  );
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }
          //loading off
          commit(LOADINGASYNC_TYPE, false);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //log out action
    logoutAction({ commit }) {
      //loading on
      commit(LOADINGASYNC_TYPE, true);

      let emptyUser = { id: "", username: "", password: "" };

      //update current state
      commit(UPDATECURRENT_TYPE, emptyUser);

      //update current API
      return axios
        .put("https://test-heroku444.herokuapp.com/currentUser", emptyUser)
        .catch((err) => {
          console.log(err);
        });
    },

    //booking confirm action
    bookingAction({ commit }, booking) {
      commit(LOADINGASYNC_TYPE, true);

      //add booking API
      return axios
        .post("https://test-heroku444.herokuapp.com/bookings", booking)
        .then(() => {
          //add booking state
          commit(LOADINGASYNC_TYPE, false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});

export default store;
