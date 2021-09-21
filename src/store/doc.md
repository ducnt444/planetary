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

Space is for everybody. It’s not just for a few people in science or math, or for a select group of astronauts. That’s our new frontier out there, and it’s everybody’s business to know about space.

Curiosity is the essence of our existence.

Across the sea of space, the stars are other suns.

We are limited only by our imagination and our will to act.

The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself.

Somewhere, something incredible is waiting to be known.

Sure, there are dead stars. But at least before they died, they were stars.

And their death was a supernova - their death demanded attention.