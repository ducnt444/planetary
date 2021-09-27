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
  BOOKING_TYPE,
  LOGIN_TYPE,
  LOGOUT_TYPE,
} from "./mutationType";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoadingAsync: false,
    isLoadingAsyncDark: true,
    isFinishPreparing: false,
    isAttemptLogSignError: false,
    isNavbarDisplay: false,
    currentPlanetIndex: 0,
    currentUser: {},
    planets: [],
    logoutToggler: 0,
    loginToggler: 0,
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

    [BOOKING_TYPE](state, payload) {
      state.currentUser = {
        ...state.currentUser,
        bookings: payload,
      };
    },

    [ERRORLOGSIGN_TYPE](state, payload) {
      state.isAttemptLogSignError = payload;
    },

    [LOGIN_TYPE](state) {
      state.loginToggler++;
    },

    [LOGOUT_TYPE](state) {
      state.logoutToggler++;
    },
  },
  actions: {
    // ============== Get current user ==============
    updateCurrentAction({ commit }) {
      return axios
        .get("https://test-heroku444.herokuapp.com/currentUserID")
        .then((res) => {
          if (res.data.id !== "") {
            axios
              .get(
                `https://test-heroku444.herokuapp.com/usersList/${res.data.id}`
              )
              .then((respond) => {
                commit(UPDATECURRENT_TYPE, respond.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
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
          let currentUserInput = {
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
            currentUserInput = {
              ...currentUserInput,
              id: userChecking.id,
              bookings: userChecking.bookings,
            };
            console.log(currentUserInput);

            //if request is for "log in" => accept
            if (userInput.type === "Log In") {
              //update current state
              commit(UPDATECURRENT_TYPE, currentUserInput);
              commit(LOGIN_TYPE);

              //update current api
              axios
                .put("https://test-heroku444.herokuapp.com/currentUserID", {
                  id: currentUserInput.id,
                })
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
                  commit(LOGIN_TYPE);

                  //update current API
                  axios.put(
                    "https://test-heroku444.herokuapp.com/currentUserID",
                    {
                      id: currentUserInput.id,
                    }
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

      //update current API
      return axios
        .put("https://test-heroku444.herokuapp.com/currentUserID", { id: "" })
        .then(() => {
          //update current state
          commit(UPDATECURRENT_TYPE, {
            id: "",
            username: "",
            password: "",
            bookings: [],
          });
          commit(LOGOUT_TYPE);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //booking confirm action
    bookingAction({ commit }, booking) {
      //userID, planet, date, number
      commit(LOADINGASYNC_TYPE, true);
      return axios
        .patch(
          `https://test-heroku444.herokuapp.com/usersList/${booking.userID}`,
          { bookings: booking.userBooking }
        )
        .then(() => {
          commit(BOOKING_TYPE, booking.userBooking);
          commit(LOADINGASYNC_TYPE, false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});

export default store;
