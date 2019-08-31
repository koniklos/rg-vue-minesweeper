import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mines: null,
    rows: null,
    cols: null,
    flags: null,
    board: [],
    time: null,
    openCells: 0,
    gameStarted: false,
    gameOn: false,
    gameOver: false,
    gameWin: false,
    gameRestarted: false,
    levels: [],
    difficulty: null,
    username: "",
    winRecordId: "",
    scoreSubmitted: false,
    isLoading: false,
    showScoreBoard: false,
    showWinScreen: false
  },

  mutations: {
    CREATEBOARD(state, generatedBoard) {
      state.board = generatedBoard;
    },
    STARTGAME(state) {
      state.gameRestarted = false;
      state.gameOn = true;
    },
    SETCELLOPEN(state, cell) {
      state.board[cell.y][cell.x].isOpen = true;
      state.board[cell.y][cell.x].count = cell.count;
    },
    ENDGAME(state) {
      state.gameOver = true;
      state.gameOn = false;
    },
    ENDGAMEWIN(state) {
      state.gameOver = true;
      state.gameWin = true;
      state.gameOn = false;
      state.showWinScreen = true;
    },
    SETLOADING(state, value) {
      state.isLoading = value;
    },
    SETINTERVAL(state, { fn, time }) {
      state.intervals.push(setInterval(fn, time));
    },
    SETCELLFLAG(state, cell) {
      state.board[cell.y][cell.x].hasFlag = !state.board[cell.y][cell.x]
        .hasFlag;
    },
    SETFLAGS(state, flags) {
      state.flags = flags;
    },
    INCREMENTOPENCELLS(state) {
      state.openCells += 1;
    },
    RESETGAME(state) {
      state.flags = state.mines;
      state.time = null;
      state.openCells = 0;
      state.points = 0;
      state.gameOn = false;
      state.gameOver = false;
      state.gameWin = false;
      state.gameRestarted = true;
      state.winRecordId = "";
      state.scoreSubmitted = false;
      state.showScoreBoard = false;
      state.showWinScreen = false;
    },
    RESTARTGAME(state) {
      state.gameStarted = false;
    },
    SETLEVELS(state, levels) {
      levels.map(level => state.levels.push({ ...level.fields, id: level.id }));
    },
    SETBOARD(state, board) {
      state.rows = board.rows;
      state.cols = board.cols;
      state.mines = board.mines;
      state.flags = board.mines;
      state.difficulty = {
        id: board.id,
        value: board.level_id
      };
      state.gameStarted = true;
      state.gameOver = false;
    },
    SETTIMEANDSCORE(state, timeAndScore) {
      state.time = timeAndScore.formattedTime;
      state.points = timeAndScore.score;
    },
    SETUSERNAME(state, username) {
      state.username = username;
    },
    SETWINID(state, id) {
      state.winRecordId = id;
      state.scoreSubmitted = true;
    },
    SHOWSCOREBOARD(state) {
      state.showScoreBoard = !state.showScoreBoard;
    },
    SHOWWINSCREEN(state) {
      state.showWinScreen = !state.showWinScreen;
    }
  },

  actions: {
    createBoard(context) {
      let board = [];

      // Generating empty cells
      for (let i = 0; i < context.state.rows; i += 1) {
        board.push([]);

        for (let j = 0; j < context.state.cols; j += 1) {
          board[i].push({
            x: j,
            y: i,
            count: 0,
            isOpen: false,
            hasMine: false,
            hasFlag: false
          });
        }
      }

      // Adding the mines
      for (let i = 0; i < context.state.mines; i += 1) {
        let randomRow = Math.floor(Math.random() * context.state.rows);
        let randomCol = Math.floor(Math.random() * context.state.cols);

        let cell = board[randomRow][randomCol];

        cell.hasMine ? (i -= 1) : (cell.hasMine = true);
      }

      context.commit("CREATEBOARD", board);
    },

    checkForWin(context) {
      const { rows, cols, gameOver, openCells, mines } = context.state;

      if (mines + openCells >= rows * cols && !gameOver) {
        setTimeout(function() {
          context.commit("ENDGAMEWIN");
        }, 500);
      }
    },

    setFlags(context, amount) {
      let flags = context.state.flags + amount;
      context.commit("SETFLAGS", flags);
    },

    setCellFlag(context, cell) {
      context.commit("SETCELLFLAG", cell);
    },

    handleCellClick(context) {
      if (!context.state.gameOn) {
        context.commit("STARTGAME");
      }

      context.commit("INCREMENTOPENCELLS");
    },

    resetGame(context) {
      context.commit("RESETGAME");
      context.dispatch("createBoard");
    },

    restartGame(context) {
      context.commit("RESETGAME");
      context.commit("RESTARTGAME");
    },

    fetchLevels(context) {
      if (context.state.levels.length === 0) {
        fetch("https://api.airtable.com/v0/appBMvlUZUhZLm0B9/levels", {
          headers: {
            Authorization: "Bearer key2l4ENsUrBvtvsm"
          }
        })
          .then(res => res.json())
          .then(levels => {
            context.commit("SETLEVELS", levels.records);
            context.dispatch("setLoading", false);
          });
      }
    },

    setBoard(context, selectedLevel) {
      const [board] = context.state.levels.filter(
        level => level.level_id === Number.parseInt(selectedLevel)
      );

      context.commit("SETBOARD", board);
      context.dispatch("createBoard");
    },

    setTimeAndScore(context, time) {
      let score = Number.parseInt(
        (Math.max(9990 - time.deciseconds) * 200) /
          (200 / context.state.difficulty.value)
      );
      let timeAndScore = { ...time, score };

      context.commit("SETTIMEANDSCORE", timeAndScore);
    },

    setUsername(context, username) {
      if (username !== localStorage.getItem("rgVueMineSweeperUsername")) {
        localStorage.setItem("rgVueMineSweeperUsername", username);
      }

      if (context.state.username === username) {
        return;
      }

      context.commit("SETUSERNAME", username);
    },

    postScore(context) {
      context.dispatch("showWinScreen");
      context.dispatch("setLoading", true);

      const gameData = {
        level_id: [context.state.difficulty.id],
        username: context.state.username,
        time: context.state.time,
        points: context.state.points
      };

      fetch("https://api.airtable.com/v0/appBMvlUZUhZLm0B9/scores", {
        method: "POST",
        body: JSON.stringify({ fields: gameData }),
        headers: {
          Authorization: "Bearer key2l4ENsUrBvtvsm",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(response => {
          context.commit("SETWINID", response.id);
        })
        .catch(error => console.error("Error:", error));
    },

    setLoading(context, value) {
      context.commit("SETLOADING", value);
    },

    showScoreBoard(context) {
      context.commit("SHOWSCOREBOARD");
    },

    showWinScreen(context) {
      context.commit("SHOWWINSCREEN");
    }
  },

  getters: {
    flags: state => state.flags,

    gameOn: state => state.gameOn,

    gameOver: state => state.gameOver,

    gameWin: state => state.gameWin,

    gameRestarted: state => state.gameRestarted,

    isLoading: state => state.isLoading,

    showScoreBoard: state => state.showScoreBoard,

    showWinScreen: state => state.showWinScreen,

    findMines: state => cell => {
      let adjacentMines = 0;
      let rows = state.board;

      for (let row = -1; row <= 1; row += 1) {
        for (let col = -1; col <= 1; col += 1) {
          if (cell.y + row >= 0 && cell.x + col >= 0) {
            if (cell.y + row < rows.length && cell.x + col < rows[0].length) {
              if (
                rows[cell.y + row][cell.x + col].hasMine &&
                !(row === 0 && col === 0)
              ) {
                adjacentMines += 1;
              }
            }
          }
        }
      }

      return adjacentMines;
    },

    board: state => state.board
  }
});
