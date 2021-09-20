<template>
  <div class="page-content p-3">
    <h1>Playground</h1>
    <button class="test-btn mt-3 mb-4" @click="add">Test!!!</button>
    <button class="test-btn mt-3 mb-4" @click="incrementBy(payload)">Test!!!</button>
    <!-- <p class="test-text">count: {{ count }}</p> -->
    <!-- <p class="test-text">countAlias: {{ countAlias }}</p> -->
    <p class="test-text">storeCount: {{ storeCount }}</p>
    <!-- <p class="test-text">localCount: {{ localCount }}</p> -->
    <!-- <p class="test-text">countPlusLocalState: {{ countPlusLocalState }}</p> -->
    <!-- <p class="test-text">done todos: {{ store.getters.doneTodos }}</p> -->
    <p class="test-text">local done todos: {{ localDoneTodos }}</p>
    <p class="test-text">local done todos count: {{ localDoneTodosCount }}</p>
    <p class="test-text">local get todo by Id(3): {{ localGetTodoById(3) }}</p>

    <p class="test-text">
      mapGetters done todos: <br />
      {{ doneTodos }}
    </p>
    <p class="test-text">
      mapGetters done todos count: <br />
      {{ doneTodosCount }}
    </p>

    <p class="test-text">
      mapGetters object done todos: <br />
      {{ doneTask }}
    </p>
    <p class="test-text">
      mapGetters object done todos count: <br />
      {{ doneCount }}
    </p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "Playground",
  data() {
    return {
      localCount: 10,
    };
  },
  // computed: mapState({
  //   //C1: arrow function: tên tùy ý: (state) => state.tênStoreValue
  //   count: (state) => state.storeCount,

  //   //C2: string value: tên tùy ý: "tênStoreValue"
  //   countAlias: "storeCount",

  //   //truy cập local state: dùng normal function và this
  //   countPlusLocalState(state) {
  //     return state.storeCount + this.localCount;
  //   },
  // }),
  computed: {
    localDoneTodos() {
      return this.$store.getters.doneTodos;
    },
    localDoneTodosCount() {
      return this.$store.getters.doneTodosCount;
    },
    // mix this into the outer object with the object spread operator
    ...mapState([
      // C3: array: ["tênStoreValue1", "tênStoreValue2"]
      "storeCount",
    ]),
    ...mapGetters(["doneTodos", "doneTodosCount"]),
    //new name:
    ...mapGetters({ doneTask: "doneTodos", doneCount: "doneTodosCount" }),
    payload() {
      return {
        amount: 10,
      };
    },
  },
  methods: {
    // increment() {
    //   //Style 1: arguments style
    //   // this.$store.commit("increment", {
    //   //   amount: 10,
    //   // });

    //   //Style 2: object style, dùng prop "type"
    //   // this.$store.commit({
    //   //   type: "increment",
    //   //   amount: 10,
    //   // });
    // },
    ...mapMutations([
      //Style 3: mapMutations style, dùng prop "type"
      "increment", // map `this.increment()` to `this.$store.commit('increment')`

      // `mapMutations` also supports payloads:
      "incrementBy", // map `this.incrementBy(amount)` to `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: "increment", // map `this.add()` to `this.$store.commit('increment')`
    }),
    localGetTodoById(id) {
      return this.$store.getters.getTodoById(id);
    },
  },
};
</script>

<style scoped>
.test-text {
  margin: 5px 0;
  border-bottom: 2px solid red;
}
</style>
