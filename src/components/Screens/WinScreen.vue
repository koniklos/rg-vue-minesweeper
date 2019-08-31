<template>
  <div class="rgvms-center">
    <h3>Victory!</h3>
    <p class="rgvms-mt-1">Add your score to highscores table?</p>
      <form @submit.prevent="addScore">
        <input
          type="text"
          name="username"
          id="username"
          class="rgvms-text-input"
          placeholder="Your name"
          v-model="username"
        >
        <button class="rgvms-btn">Add</button>
      </form>
      <p class="rgvms-error" v-show="error">{{error}}</p>
    <br />
    <ButtonMainMenu />
    <ButtonReset />
  </div>
</template>

<script>
import ButtonMainMenu from "@/components/Buttons/ButtonMainMenu";
import ButtonReset from "@/components/Buttons/ButtonReset";

export default {
  components: {
    ButtonMainMenu,
    ButtonReset
  },

  data() {
    return {
      username: this.$store.state.username ? this.$store.state.username : "",
      error: ""
    }
  },

  created() {
    if (!this.$store.state.username && localStorage.getItem("rgVueMineSweeperUsername")) {
      // Username doesn't exist in state, but exists in localStorare
      this.username = localStorage.getItem("rgVueMineSweeperUsername");
      this.$store.dispatch("setUsername", this.username);
    }
  },

  methods: {
    addScore() {
      let exp = /^[A-Za-z\u0391-\u03C9]+[0-9]*$/;

      if (!this.username) {
        this.error = "You have to enter a name";
        return;
      }

      if (!exp.test(this.username)) {
        this.error = "Name must start with a letter and contain only letters and numbers";
        return;
      }

      if (this.username !== this.$store.state.username) {
        this.$store.dispatch("setUsername", this.username);
      }
      
      // - Dispatch action to post the score
      this.$store.dispatch("showScoreBoard");
      this.$store.dispatch("postScore");
    }
  }
}
</script>

<style>

.rgvms-error {
  max-width: 17em;
  background: #ee2f2f;
  color: #fff;
  padding: 3px;
  margin-top: 10px;
}

</style>