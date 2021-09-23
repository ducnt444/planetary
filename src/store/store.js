import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import {
  GETPLANETS_TYPE,
  FINISHPREPARING_TYPE,
  ERRORLOGSIGN_TYPE,
  GETALLUSERS_TYPE,
  UPDATECURRENT_TYPE,
  TORIGHT_TYPE,
  TOLEFT_TYPE,
  BOOKING_TYPE,
  ADDUSER_TYPE,
  LOADINGASYNC_TYPE,
  LOADINGASYNCDARK_TYPE,
  NAVBARCONTROL_TYPE,
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
    bookings: [],
    users: [],
    currentUser: { username: null, password: null },
    planets: [],
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
    [GETPLANETS_TYPE](state, payload) {
      state.planets = payload;
    },

    [FINISHPREPARING_TYPE](state) {
      state.isFinishPreparing = true;
    },

    [NAVBARCONTROL_TYPE](state, payload) {
      state.isNavbarDisplay = payload;
    },

    [GETALLUSERS_TYPE](state, payload) {
      state.users = payload;
    },
    [ADDUSER_TYPE](state, payload) {
      state.users.push(payload);
    },

    [UPDATECURRENT_TYPE](state, payload) {
      state.currentUser = {
        ...state.currentUser,
        username: payload.username,
        password: payload.password,
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
      if (payload.date !== "" && payload.number !== "") {
        state.bookings = [
          ...state.bookings,
          {
            planet: payload.planet,
            date: payload.date,
            number: payload.number,
          },
        ];
      }
    },

    [ERRORLOGSIGN_TYPE](state, payload) {
      state.isAttemptLogSignError = payload;
    },
  },
  actions: {
    getPlanetsAction({ commit }) {
      return axios
        .get("https://test-heroku444.herokuapp.com/planets")
        .then((res) => {
          let planets = res.data;
          commit(GETPLANETS_TYPE, planets);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getCurrentAction({ commit }, localCurrent) {
      commit(LOADINGASYNCDARK_TYPE, true);
      // const localCurrentUsername = localStorage.getItem("PlanetaryUsername");
      // const localCurrentPassword = localStorage.getItem("PlanetaryPassword");
      // const localCurrent = {
      //   username: localCurrentUsername,
      //   password: localCurrentPassword,
      // };
      commit(UPDATECURRENT_TYPE, localCurrent);
      return axios
        .put("https://test-heroku444.herokuapp.com/currentUser", localCurrent)
        .then(() => {
          commit(LOADINGASYNCDARK_TYPE, false);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    logSignAction({ commit }, userInput) {
      commit(LOADINGASYNC_TYPE, true);
      return axios
        .get("https://test-heroku444.herokuapp.com/usersList")
        .then((res) => {
          const allUsers = res.data;
          const usernameInput = userInput.userData.usernameInput;
          const passwordInput = userInput.userData.passwordInput;
          const currentUserInput = {
            username: usernameInput,
            password: passwordInput,
          };
          const userChecking = allUsers.find(
            (user) =>
              user.username === usernameInput && user.password === passwordInput
          );

          commit(GETALLUSERS_TYPE, allUsers);

          if (userChecking) {
            if (userInput.type === "Log In") {
              commit(UPDATECURRENT_TYPE, currentUserInput);
              localStorage.setItem("PlanetaryUsername", usernameInput);
              localStorage.setItem("PlanetaryPassword", passwordInput);
              axios
                .put(
                  "https://test-heroku444.herokuapp.com/currentUser",
                  currentUserInput
                )
                .catch((err) => {
                  console.log(err);
                });
            } else {
              commit(ERRORLOGSIGN_TYPE, true);
            }
          } else {
            if (userInput.type === "Log In") {
              commit(ERRORLOGSIGN_TYPE, true);
            } else {
              commit(ADDUSER_TYPE, currentUserInput);
              commit(UPDATECURRENT_TYPE, currentUserInput);
              localStorage.setItem("PlanetaryUsername", usernameInput);
              localStorage.setItem("PlanetaryPassword", passwordInput);
              axios
                .post(
                  "https://test-heroku444.herokuapp.com/usersList",
                  currentUserInput
                )
                .then(() => {
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
          commit(LOADINGASYNC_TYPE, false);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    logoutAction({ commit }) {
      commit(LOADINGASYNC_TYPE, true);
      localStorage.setItem("PlanetaryUsername", "");
      localStorage.setItem("PlanetaryPassword", "");
      let emptyUser = { username: "", password: "" };
      return axios
        .put("https://test-heroku444.herokuapp.com/currentUser", emptyUser)
        .then(() => {
          commit(UPDATECURRENT_TYPE, emptyUser);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});

export default store;
