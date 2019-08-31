<template>
  <div class="rgvms-center">
    <h3>Leaderboard</h3>
    <Spinner v-if="isLoading" />
    <div v-show="!isLoading">
      <p>Your position: {{ position }}/{{ totalPositions }}</p>
      <div class="score-table-container rgvms-mt-1">
        <table class="score-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Time</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(score, index) in scores" 
              :key="score.id" 
              :class="{currentPosition: position - 1 === index}"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ score.username }}</td>
              <td>{{ score.time }}</td>
              <td>{{ score.points }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="rgvms-mt-1">
        <ButtonMainMenu />
        <ButtonReset />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ButtonMainMenu from "@/components/Buttons/ButtonMainMenu";
import ButtonReset from "@/components/Buttons/ButtonReset";
import Spinner from "@/components/Utils/Spinner.vue";

export default {
  components: {
    ButtonMainMenu,
    ButtonReset,
    Spinner
  },

  data() {
    return {
      scores: []
    }
  },

  created() {
    this.fetchScores();
  },

  methods: {
    fetchScores() {
      fetch(`https://api.airtable.com/v0/appBMvlUZUhZLm0B9/scores?filterByFormula=({level_id}=${this.$store.state.difficulty.value})&sort%5B0%5D%5Bfield%5D=points&sort%5B0%5D%5Bdirection%5D=desc`, {
        headers: {
            Authorization: "Bearer key2l4ENsUrBvtvsm"
          }
      })
      .then(res => res.json())
      .then(res => {
        res.records.map(record => {
          this.scores.push({...record.fields, id: record.id});
        });

        this.$store.dispatch("setLoading", false);
      });
    }
  },

  computed: {
    ...mapGetters({
      "isLoading": "isLoading"
    }),

    position() {
      return this.scores.findIndex(score => score.id === this.$store.state.winRecordId) + 1;
    },

    totalPositions() {
      return this.scores.length;
    }
  }
}
</script>

<style scoped>
.score-table-container {
  height: 14em;
  overflow-y: scroll;
  /* background: #cecece;
  border-top: 0 solid #808080;
  border-left: 0 solid #808080;
  border-bottom: 0 solid #ffffff;
  border-right: 0 solid #ffffff;
  border-width: 3px;
  box-shadow: 0 0 0 3px #c0c0c0;
  margin-top: 1em; */
}

table {
  border-collapse: collapse;
  width: 100%;
}

td {
  padding: 4px 2px;
  text-align: center;
  box-sizing: border-box;
  cursor: default;
  font-size: 12px;
  vertical-align: middle;
  line-height: 1em;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

th {
  font-size: 1rem;
}

.currentPosition {
  background-color: rgb(255, 236, 69);
}

</style>