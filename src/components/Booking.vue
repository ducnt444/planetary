<template>
  <div class="booking-modal">
    <transition name="fade" mode="out-in">
      <div v-if="!bookingSuccess" class="booking-initial" key="initial">
        <h3 class="header header-modal">Ready for {{ currentPlanet.name }}?</h3>
        <div class="mt-3">
          <label for="datepicker">Choose flight date: </label>
          <b-form-datepicker
            v-model="datepickerValue"
            id="datepicker"
            today-button
            reset-button
            close-button
            locale="vn"
          ></b-form-datepicker>
        </div>
        <div class="mt-3">
          <label for="number">Number of travelers: </label>
          <b-form-input
            id="number"
            type="number"
            min="1"
            max="100"
            v-model="mumberValue"
          ></b-form-input>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-4">
          <div>
            <span v-if="bookingError" class="error-message"
              >Please fill in both inputs</span
            >
          </div>
          <button class="btn d-block" @click="confirm()">Confirm</button>
        </div>
      </div>

      <div v-else class="booking-success" key="success">
        <p class="booking-welcome">
          All set! See you on {{ currentPlanet.name }}!
        </p>
        <p class="booking-check m-0">
          You can check your flight plans on User tab
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Booking",
  props: ["currentPlanet"],
  data() {
    return {
      datepickerValue: "",
      mumberValue: "",
      bookingError: false,
      bookingSuccess: false,
    };
  },
  computed: {
    // bookingDetails() {
    //   const newBookings = this.currentUser.bookings.slice();
    //   newBookings.push({})
    //   return {
    //     userID: this.currentUser.id,
    //     userBooking: newBookings,
    //   };
    // },
    ...mapState(["currentUser"]),
  },
  methods: {
    confirm() {
      if (this.datepickerValue === "" || this.mumberValue === "") {
        this.bookingError = true;
      } else {
        this.bookingError = false;
        const newBookings = this.currentUser.bookings.slice();
        newBookings.push({
          planet: this.currentPlanet.name,
          date: this.datepickerValue,
          number: this.mumberValue,
        });
        this.bookingAction({
          userID: this.currentUser.id,
          userBooking: newBookings,
        });
      }
    },
    ...mapActions(["bookingAction"]),
  },
  mounted() {
    this.$store.watch(
      () => {
        return this.$store.state.currentUser;
      },
      () => {
        this.bookingSuccess = true;
        this.$emit("childToggleSuccess");
      },
      {
        deep: true,
      }
    );
  },
};
</script>

<style scoped>
.booking-modal {
  height: 100%;
}
.booking-initial {
  padding: 0 20px 20px 20px;
}
.member {
  padding: 15px;
}
.member-logo {
  width: 35%;
}
.member-text {
  width: 55%;
}
.planetary-text {
  font-family: Aware;
  font-size: 20px;
  margin-bottom: 0px;
}
.error-message {
  color: rgb(255, 94, 94);
}
.btn {
  color: #fff;
  border: 2px solid #fff;
  border-radius: 8px;
}

.booking-success {
  height: 100%;
  font-weight: 500;
  text-align: center;
}
.success-img {
  width: 100%;
}
.booking-welcome {
  font-size: 20px;
  margin-bottom: 5px;
}
.booking-check {
  font-size: 14px;
  font-style: italic;
}
</style>
