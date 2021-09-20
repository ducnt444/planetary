---------------------------------------- Section II. General ----------------------------------------
view -> action -> state -> view...

- Quy trình:

1. Tạo state trong store
2. mapState trong components

3. Tạo getters trong store
4. mapGetters trong components

5. Tạo mutations types
6. Tạo mutations trong store
7. mapMutations trong components

8. Tạo actions trong store
9. mapActions trong components

setup:

```js
const store = new Vuex.Store({
  //state
  state: {
    count: 0,
  },

  //mutations
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});
```

---------------------------------------- Section II. State ----------------------------------------

1. Tương tác ở Component:
   A. Cơ bản:

```js
const Counter = {
  computed: {
    //get state
    count() {
      return this.$store.state.count;
    },
  },

  methods: {
    //call mutation
    increment() {
      this.$store.commit("increment");
    },
  },
};
```

B. mapState:

```js
// map
import { mapState } from "vuex";

export default {
  computed: {
    localComputed() {
      //các local computed...
      return {
        localCount: 4,
      };
    },

    //mapState: object syntax
    ...mapState({
      //Cách 1 (arrow function) tên tùy ý: (state) => state.tênStoreValue
      renderCount: (state) => state.count, // {{ renderCount }}

      //Cách 2 (string value) tên tùy ý: "tênStoreValue"
      countAlias: "count", // {{ countAlias }}

      //Nếu cần access local state trong data(), sử dụng this
      countPlusLocalState(state) {
        return state.count + this.localCount; // {{ countPlusLocalState }}
      },
    }),

    //mapState: array syntax
    ...mapState([
      //tạo this.count từ store.state.count
      "count", //{{ count }}
    ]),
  },
};
```

2. getter ở store:

- Đôi khi chúng ta cần một dạng "computed" ngay từ trong store, vì có thể công đoạn này sẽ sử dụng ở nhiều page, không nên copy đoạn computed sau cho từng trang.
- Computed tại component:

```js
//sẽ phải copy đoạn này cho mọi trang cần đếm số todo done
computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```

- Computed tại store:

```js
//computed ngay tại store, các component sẽ nhận giá trị return
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: "...", done: true },
      //...
    ],
  },

  //getters: Property-Style Access
  getters: {
    //1 argument: state của store
    storeDoneTodos: (state) => {
      return state.todos.filter((todo) => todo.done);
    },
    //2 arguments: state của store và getters của store, dùng để truy cập các getter khác
    storeDoneTodosCount: (state, getters) => {
      return getters.doneTodos.length;
    },
  },

  //getters: Method-Style Access, dùng khi cần query 1 array
  getters: {
    // ...
    storeGetTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    }
  }
});

//nhận giá trị tại components bằng mapGetters
computed: {
  //các local computed...

  // mapGetters giữ nguyên tên getter trong store
  ...mapGetters([
    'storeDoneTodos', //{{ storeDoneTodos }}
    'storeDoneTodosCount', //{{ storeDoneTodosCount }}
  ])

  // mapGetters customize tên
  ...mapGetters({
    doneCount: 'doneTodosCount' //{{ doneCount }}
  })
}
```

---------------------------------------- Section III. Mutations ----------------------------------------

1. Mutations generals

- Chỉ có thể update state bằng cách commit các mutations
- Mutations bao gồm: type (string) và handler (function)
- Mutations cơ bản:

```js
const store = new Vuex.Store({
  //đăng ký mutations
  mutations: {
    //"increment" là type
    //increment(state) là handler
    increment(state) {
      //argument #1: state
      state.count++;
    },
    incrementValue(state, payloadValue) {
      //argument #2: payload là 1 value
      state.count += payloadValue;
    },
    incrementObjectValue(state, payloadObj) {
      //argument #2: payload là 1 object
      state.count += payloadObj.amount;
    },
  },
});

//commit không payload
store.commit("increment");

//commit payload value
store.commit("incrementValue", 10);

//commit payload object
store.commit("incrementObjectValue", {
  amount: 10,
});

//commit payload object (object style)
store.commit({
  type: "increment",
  amount: 10,
});
```

2. Mutations với 1 obj

- Dùng Vue.set
  Vue.set(obj, 'newProp', 123)
  hoặc
- Thay thế obj cũ bằng 1 bản sao của nó, có chứa giá trị mới
  state.obj = { ...state.obj, newProp: 123, anOldProp: newValueForThisOldProp }

3. Dùng Constants cho Mutation Types

- Tạo 1 file .js chuyên chứa các types

```js
// mutation-types.js
export const INCREMENT_TYPE = "increment";
```

```js
// store.js
import Vuex from 'vuex'
import { INCREMENT_TYPE } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    //ES2015 computed property name: dùng 1 constant làm function name
    [INCREMENT_TYPE] (state) {
      // mutate state...
    }
  }
})
```

4. Commmit bằng mapMutations

```js
import { mapMutations } from "vuex";

export default {
  // ...
  methods: {
    ...mapMutations([
      //giữ tên: tạo method increment(), tương ứng commit "increment"
      "increment",

      //custom tên: tạo method add(), tương ứng commit "increment"
      (add: "increment"),
      //tạo method incrementBy(payload), tương ứng commit "incrementBy" + payload tùy ý
      "incrementBy",
    ]),
  },
};
```

---------------------------------------- Section IV. Actions ----------------------------------------

- Action như 1 bước đệm trước mutations, sẽ không trực tiếp mutate state.
- Action dùng để xử lý bất đống độ trước (nếu có), sau đó commit các mutations.
- Action cơ bản:

```js
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    //argument destructuring: call method commit() của object truyền vào
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit("increment");
      }, 1000);
    },
  },
});
```

- Trigger action bằng method store.dispatch

```js
//dispatch action không payload
store.dispatch("incrementAsync");

//dispatch action có payload
store.dispatch("incrementAsync", {
  amount: 10,
});

//dispatch action có payload, bằng object style
store.dispatch({
  type: "incrementAsync",
  amount: 10,
});
```

- Dispatch action tại components bằng mapActions

```js
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions([
      "increment", // tạo method "increment()", tương ứng với "this.$store.dispatch('increment')"

      "incrementBy", //  tạo method "incrementBy(amount)", tương ứng với "this.$store.dispatch('incrementBy', amount)"
    ]),
    ...mapActions({
      //custom tên
      add: "increment", //tạo method "add()", tương ứng với "this.$store.dispatch('increment')"
    }),
  },
};
```

- VD real-world: action khi checkout giỏ hàng thường sẽ call async API và commit nhiều mutations:

```js
actions: {
  checkout ({ commit, state }, products) {

    // lưu các sản phẩm đang có trong giỏ hàng
    const savedCartItems = [...state.cart.added]

    //gửi request checkout và xóa giỏ hàng
    commit(types.CHECKOUT_REQUEST)

    //API sẽ có callback cho thành công và thất bại
    shop.buyProducts(
      products,
      // xử lý khi thành công
      () => commit(types.CHECKOUT_SUCCESS),
      // xử lý khi thất bại
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  }
}
```

- store.dispatch có thể xử lý Promise mà action handler trả về, và nó cũng trả về Promise

```js
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  },
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}

//dispatch

store.dispatch('actionA').then(() => {
  // ...
})
```

async/await:

```js
// giả dụ như "getData()" và "getOtherData()" trả về Promise

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData()) //chờ getData() hoàn thành, commit "gotData"
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') //chờ actionA hoàn thành
    commit('gotOtherData', await getOtherData()) //chờ getOtherData() hoàn thành, commit "gotOtherData"
  }
}
```

---------------------------------------- Section V. Modules ----------------------------------------

- Với các app lớn, store sẽ quá lớn. Có thể chia store thành các modules
- Modules có state, mutations, getters, actions riêng, và có thể chứa các nested modules

```js
const moduleA = {
  state: () => ({
    count: 0
  }),
  mutations: {
    // state ở đây là local module state
    increment (state) {
      state.count++ //localState.count ++
    }
  },
  getters: {
    // state ở đây là local module state
    doubleCount (state) {
      return state.count * 2 //trả về localState.count * 2
    },
    // rootState ở đây là store state
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count //trả về localState.count + rootState.count
    }
  },
  actions: {
    // rootState ở đây là store state
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment') // nếu tổng của localState.count và rootState.count là số lẻ, commit increment
      }
    }
  }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> state của moduleA
store.state.b // -> state của moduleB
```

Full template 

```js
store:
import Vue from "vue";
import Vuex from "vuex";
import { LOADING_TYPE, TORIGHT_TYPE, TOLEFT_TYPE } from "./mutationType";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    testKey: "testValue",
    isLoading: true,
    isMuted: false,
    currentPlanetIndex: 0,
    planets: [
      {
        id: "1",
        slug: "mercury",
        name: "Mercury",
        img: "Mercury/Mercury-2.png",
        imgMin: "Mercury/Mercury-min.png",
        background: "Mercury/bg.jpg",
        title: "the Swift Planet",
        symbol: "Mercury/symbol-active.png",
        description:
          "Mercury is the smallest planet in the Solar System and the closest to the Sun. It is named after the Roman god Mercurius (Mercury), god of commerce, messenger of the gods, and mediator between gods and mortals, corresponding to the Greek god Hermes (Ἑρμῆς). The planet can only be seen near the western horizon after sunset or the eastern horizon before sunrise, usually in twilight.",
        flights: {
          name: "SS Discovery",
          img: "Mercury/spacecraft.jpg",
          tier: "A-Class",
          desc: `SS Discovery is one of the orbiters from NASA's Space Shuttle program. Over 27 years of service it launched and landed 39 times, aggregating more spaceflights than any other spacecraft to date. Discovery performed both research and International Space Station (ISS) assembly missions, and also carried the Hubble Space Telescope into orbit.`,
        },
        priceStandard: "$50,000",
        pricePremier: "$100,000",
        stats: {
          Spacecraft: `SS Discovery<sup>TM</sup> <br/> A-Class`,
          Preparation: `2 weeks`,
          "Flight Duration": `2 month 15 days <br/> (Round-trip)`,
          Price: "From $50,000",
        },
        attractions: [
          {
            name: "MESSENGER",
            slug: "messenger",
            img: "Mercury/attraction-1-full.jpg",
            thumbnail: "Mercury/attraction-1.jpg",
            description: `MESSENGER was a NASA robotic space probe that orbited the planet Mercury from 2011, studying Mercury's chemical composition, geology, and magnetic field. The name is a backronym for "Mercury Surface, Space Environment, Geochemistry, and Ranging", and a reference to the messenger god Mercury from Roman mythology.`,
          },
          {
            name: "Caloris Planitia",
            slug: "caloris-planitia",
            img: "Mercury/attraction-2-full.jpg",
            thumbnail: "Mercury/attraction-2.jpg",
            description:
              'Caloris Planitia is a plain within a large impact basin on Mercury, informally named Caloris, about 1,550 km (960 mi) in diameter. It is one of the largest impact basins in the Solar System. "Calor" is Latin for "heat" and the basin is so-named because the Sun is almost directly overhead every second time Mercury passes perihelion. The crater, discovered in 1974, is surrounded by the Caloris Montes, a ring of mountains approximately 2 km (1.2 mi) tall.',
          },
          {
            name: "BepiColombo",
            slug: "bepicolombo",
            img: "Mercury/attraction-3-full.jpg",
            thumbnail: "Mercury/attraction-3.jpg",
            description:
              "BepiColombo is a joint mission of the European Space Agency (ESA) and the Japan Aerospace Exploration Agency (JAXA) to the planet Mercury. The mission comprises two satellites launched together: the Mercury Planetary Orbiter (MPO) and Mio (Mercury Magnetospheric Orbiter, MMO). The mission will perform a comprehensive study of Mercury, including characterization of its magnetic field, magnetosphere, and both interior and surface structure.",
          },
        ],
      },
      {
        id: "2",
        slug: "venus",
        name: "Venus",
        img: "Venus/Venus.png",
        imgMin: "Venus/Venus-min.png",
        background: "Venus/bg.jpg",
        title: "the Brightest One",
        symbol: "Venus/symbol-active.png",
        description:
          "Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty. As the brightest natural object in Earth's night sky after the Moon, Venus can cast shadows and can be, on rare occasions, visible to the naked eye in broad daylight. A terrestrial planet, Venus is sometimes called Earth's 'sister planet' because of their similar size, mass, and proximity to the Sun. Venus has been a major fixture in human culture for as long as records have existed. It has been made sacred to gods of many cultures, and has been a prime inspiration for writers and poets as the 'morning star' and 'evening star'.",
        flights: {
          name: "Dream Chaser",
          img: "Venus/spacecraft.jpg",
          tier: "A-Class",
          desc: `Dream Chaser is an American reusable lifting-body spaceplane being developed by Sierra Nevada Corporation (SNC) Space Systems. It is planned to carry up to seven people and cargo to and from low Earth orbit. The cargo Dream Chaser is designed to resupply the International Space Station with both pressurized and unpressurized cargo.`,
        },
        price: "$50,000",
        stats: {
          Spacecraft: `Dream Chaser<sup>TM</sup> <br/> A-Class`,
          Preparation: `2 weeks`,
          "Flight Duration": `1 month 20 days <br/> (Round-trip)`,
          Price: "From $35,000",
        },
        attractions: [
          {
            name: "Maat Mons",
            slug: "maat-mons",
            img: "Venus/attraction-1-full.jpg",
            thumbnail: "Venus/attraction-1.jpg",
            description:
              "Maat Mons is a massive shield volcano. It is the second-highest mountain, and the highest volcano, on the planet Venus. It rises 8 kilometres (5.0 mi) above the mean planetary radius at 0.5°N 194.6°E, and nearly 5 km above the surrounding plains. It is named after the Egyptian goddess of truth and justice, Ma'at.",
          },
          {
            name: "Venera 14",
            slug: "venera-14",
            img: "Venus/attraction-2-full.jpg",
            thumbnail: "Venus/attraction-2.jpg",
            description:
              "Venera 14 (Russian: Венера-14 meaning Venus 14) was a probe in the Soviet Venera program for the exploration of Venus. Venera 14 was identical to the Venera 13 spacecraft and built to take advantage of the 1981 Venus launch opportunity and launched five days apart. It was launched on 4 November 1981 at 05:31:00 UTC and Venera 13 on 30 October 1981 at 06:04:00 UTC, both with an on-orbit dry mass of 760 kg (1,680 lb).",
          },
          {
            name: "Venus Express",
            slug: "venus-express",
            img: "Venus/attraction-3-full.jpg",
            thumbnail: "Venus/attraction-3.jpg",
            description:
              "Venus Express (VEX) was the first Venus exploration mission of the European Space Agency (ESA). Launched in November 2005, it arrived at Venus in April 2006 and began continuously sending back science data from its polar orbit around Venus. Equipped with seven scientific instruments, the main objective of the mission was the long term observation of the Venusian atmosphere.",
          },
        ],
      },
      {
        id: "3",
        slug: "mars",
        name: "Mars",
        img: "Mars/Mars.png",
        imgMin: "Mars/Mars-min.png",
        background: "Mars/bg.jpg",
        title: "the Next Home",
        symbol: "Mars/symbol-active.png",
        description:
          "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. In English, Mars carries the name of the Roman god of war and is often referred to as the 'Red Planet'. The latter refers to the effect of the iron oxide prevalent on Mars's surface, which gives it a reddish appearance distinctive among the astronomical bodies visible to the naked eye. Mars is a terrestrial planet with a thin atmosphere, with surface features reminiscent of the impact craters of the Moon and the valleys, deserts and polar ice caps of Earth.",
        flights: {
          name: "Crew Dragon",
          img: "Mars/spacecraft.jpg",
          tier: "S-Class",
          desc: `Dragon 2 is a class of spacecraft developed and manufactured by SpaceX and Crew Dragon variant is a space capsule capable of ferrying up to seven astronauts. The spacecraft can autonomously dock to the International Space Station (ISS). Crew Dragon is equipped with an integrated launch escape system (LES) consisting of eight SuperDraco engines, capable of accelerating the vehicle away from the rocket in an emergency.`,
        },
        stats: {
          Spacecraft: `Crew Dragon<sup>TM</sup> <br/> S-Class`,
          Preparation: `2.5 weeks`,
          "Flight Duration": `6 months <br/> (Round-trip)`,
          Price: "From $120,000",
        },
        attractions: [
          {
            name: "Hope",
            slug: "hope",
            img: "Mars/attraction-1-full.jpg",
            thumbnail: "Mars/attraction-1.jpg",
            description:
              "The Hope orbiter was launched on 19 July 2020, and went into orbit around Mars on 9 February 2021. The space probe will study daily and seasonal weather cycles, weather events in the lower atmosphere such as dust storms, and how the weather varies in different regions of the planet. It will also add to knowledge about Mars atmospheric hydrogen and oxygen loss and other possible reasons behind the planet's drastic climate changes.",
          },
          {
            name: "Olympus Mons",
            slug: "olympus-mons",
            img: "Mars/attraction-2-full.jpg",
            thumbnail: "Mars/attraction-2.jpg",
            description:
              "Olympus Mons is an enormous shield volcano on the planet Mars. The volcano has a height of over 21.9 km (13.6 mi or 72,000 ft). Olympus Mons is about two and a half times Mount Everest's height above sea level. It is one of the largest volcanoes, the tallest planetary mountain, and the second tallest mountain currently discovered in the Solar System.",
          },
          {
            name: "Opportunity",
            slug: "opportunity ",
            img: "Mars/attraction-3-full.jpg",
            thumbnail: "Mars/attraction-3.jpg",
            description: `Opportunity, nicknamed "Oppy", is a robotic rover that was active on Mars from 2004 until mid-2018. Opportunity was operational on Mars for 5110 sols (5250 days; 14 years, 136 days). Mission highlights included the initial 90-sol mission, finding meteorites such as Heat Shield Rock. The Opportunity mission is considered one of NASA's most successful ventures.`,
          },
        ],
      },
      {
        id: "4",
        slug: "jupiter",
        name: "Jupiter",
        img: "Jupiter/Jupiter.png",
        imgMin: "Jupiter/Jupiter-min.png",
        background: "Jupiter/bg.jpg",
        title: "the Gaint",
        symbol: "Jupiter/symbol-active.png",
        description:
          "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than 2.5 times that of all the other planets in the Solar System combined, but slightly less than 1/1000 the mass of the Sun. Jupiter is the third-brightest natural object in the Earth's night sky after the Moon and Venus. It is named after the Roman god Jupiter, the king of the gods, because of its observed size. Surrounding Jupiter is a faint planetary ring system with 80 known moons, including the 4 large Galilean moons discovered by Galileo Galilei in 1610.",
        flights: {
          name: "VSS Unity",
          img: "Jupiter/spacecraft.jpg",
          tier: "A-Class",
          desc: `VSS Unity (Virgin Space Ship Unity) is a SpaceShipTwo-class suborbital rocket-powered crewed spaceplane. It is the second SpaceShipTwo to be built and will be used as part of the Virgin Galactic fleet. The name Unity was chosen by British physicist Stephen Hawking. Hawking's eye is also used as the model for the eye logo on the side of Unity.`,
        },
        stats: {
          Spacecraft: `VSS Unity<sup>TM</sup> <br/> A-Class`,
          Preparation: `3.5 weeks`,
          "Flight Duration": `1 year <br/> (Round-trip)`,
          Price: "From $500,000",
        },
        attractions: [
          {
            name: "Great Red Spot",
            slug: "great-red-spot",
            img: "Jupiter/attraction-1-full.jpg",
            thumbnail: "Jupiter/attraction-1.jpg",
            description:
              "The Great Red Spot is a persistent high-pressure region in the atmosphere of Jupiter, producing an anticyclonic storm that is the largest in the Solar System. Located 22 degrees south of Jupiter's equator, it produces wind-speeds up to 432 km/h. Observations from 1665 to 1713 are believed to be of the same storm; if this is correct, it has existed for at least 356 years.",
          },
          {
            name: "Europa",
            slug: "europa",
            img: "Jupiter/attraction-2-full.jpg",
            thumbnail: "Jupiter/attraction-2.jpg",
            description:
              "Europa, or Jupiter II, is the smallest of the four Galilean moons orbiting Jupiter. It is also the sixth-largest moon in the Solar System. Europa was discovered in 1610 by Galileo Galilei and was named after Europa, the Phoenician mother of King Minos of Crete and lover of Zeus. Slightly smaller than Earth's Moon, Europa is primarily made of silicate rock and has a water-ice crust[14] and probably an iron–nickel core.",
          },
          {
            name: "Juno",
            slug: "Juno",
            img: "Jupiter/attraction-3-full.jpg",
            thumbnail: "Jupiter/attraction-3.jpg",
            description:
              "Juno is a NASA space probe orbiting the planet Jupiter. The spacecraft was launched from Cape Canaveral Air Force Station on 5 August 2011 UTC, as part of the New Frontiers program. Juno's mission is to measure Jupiter's composition, gravitational field, magnetic field, and polar magnetosphere. It will also search for clues about how the planet formed, including whether it has a rocky core, the amount of water present within the deep atmosphere, mass distribution, and its deep winds. Juno's three largest solar panel wings ever deployed on a planetary probe play an integral role in stabilizing the spacecraft as well as generating power.",
          },
        ],
      },
    ],
  },
  getters: {
    planetSlug: (state) => (slug) => {
      return state.planets.find((planet) => planet.slug === slug);
    },
  },
  mutations: {
    [LOADING_TYPE](state) {
      state.isLoading = !state.isLoading;
    },
    [TORIGHT_TYPE](state) {
      if (state.currentPlanetIndex < state.planets.length - 1)
        state.currentPlanetIndex++;
    },
    [TOLEFT_TYPE](state) {
      if (state.currentPlanetIndex > 0) state.currentPlanetIndex--;
    },
  },
});

export default store;
```