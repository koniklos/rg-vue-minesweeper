<template>
  <button @click="restartGame" class="rgvms-btn">Main Menu</button>
</template>

<script>
export default {
  methods: {
    restartGame() {
      this.$store.dispatch("restartGame");
    }
  }
}
</script>

<style>

</style>