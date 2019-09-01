<template>
  <div class="rgvms">
    <StartScreen v-if="!this.$store.state.gameStarted" />
    <BoardContainer v-if="this.$store.state.gameStarted" />
  </div>
</template>

<script>
import BoardContainer from '@/components/Screens/BoardContainer.vue'
import StartScreen from '@/components/Screens/StartScreen.vue'

export default {
  name: 'app',
  components: {
    BoardContainer,
    StartScreen
  }
}
</script>

<style>
/* * {
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
} */

.rgvms {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  height: 100%;
  background: #ededed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}

.rgvms-board-head {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.rgvms-reset, .rgvms-flag-count, .rgvms-timer {
  display: flex;
  justify-content: center;
  align-items: center;
}


.rgvms-flag-count, .rgvms-timer {
  background: #e0e1e2;
  color: #6a5861;
  min-width: 3em;
  padding: 2px;
  font-weight: bold;
  border-radius: .28571429rem;
}

.rgvms-board {
  background: #c0c0c0;
  border-top: 0 solid #808080;
  border-left: 0 solid #808080;
  border-bottom: 0 solid #ffffff;
  border-right: 0 solid #ffffff;
  border-width: 3px;
  box-shadow: 0 0 0 3px #c0c0c0;
  display: table;
  margin: 0 auto;
}

div.rgvms-row {
  display: table-row;
}

div.rgvms-cell {
  display: table-cell;
  padding: 0;
  width: 17px;
  min-width: 17px;
  max-width: 17px;
  height: 17px;
  min-height: 17px;
  max-height: 17px;
  text-align: center;
  box-sizing: border-box;
  cursor: default;
  font-size: 12px;
  font-family: cursive;
  font-weight: bold;
  vertical-align: middle;
  line-height: 1em;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid #808080;
}

div.rgvms-cell:nth-child(2n+1),
div.rgvms-cell:nth-child(2n+1).rgvms-cell--closed:active,
div.rgvms-cell:nth-child(2n+2),
div.rgvms-cell:nth-child(2n+2).rgvms-cell--closed:active,
div.rgvms-row div.rgvms-cell:nth-child(2n+2).rgvms-cell--closed.rgvms-cell--closed__had-mine {
  border-right: none;
}

div.rgvms-cell:last-child {
  border-right: 1px solid #808080;
}

div.rgvms-row:nth-child(2n+1) div.rgvms-cell,
div.rgvms-row:nth-child(2n+1) div.rgvms-cell.rgvms-cell--closed:active,
div.rgvms-row:nth-child(2n+2) div.rgvms-cell,
div.rgvms-row:nth-child(2n+2) div.rgvms-cell.rgvms-cell--closed:active,
div.rgvms-row:nth-child(2n+1) div.rgvms-cell.rgvms-cell--closed.rgvms-cell--closed__had-mine {
  border-bottom: none;
}

div.rgvms-row:last-child div.rgvms-cell {
  border-bottom: 1px solid #808080;
}

div.rgvms-row div.rgvms-cell.rgvms-cell--closed {
  text-indent: -1000px;
  border-top: 0 solid #ffffff;
  border-left: 0 solid #ffffff;
  border-bottom: 0 solid #808080;
  border-right: 0 solid #808080;
  border-width: 2px;
}

div.rgvms-row div.rgvms-cell--closed:active,
div.rgvms-row div.rgvms-cell--closed.rgvms-cell--closed__had-mine {
  border: 1px solid #808080;
}

.rgvms-cell--closed.rgvms-cell--closed__has-flag {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFAAAA/wAA////ZxlkHgAAAAN0Uk5T//8A18oNQQAAAD1JREFUeNpiYMIGGOEAiyTDMNXCiAWMDC2MuMDI0DLCY38072NKgcColhGlhQELGPZaGIgEo1qGlRaAAAMAT9UNlLz52TwAAAAASUVORK5CYII=');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 80%;
}

.rgvms-cell--open.rgvms-cell--open__hit-mine,
.rgvms-cell--closed__had-mine {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACpQTFRFAAAAf39/QEBA////v7+/EBAQn5+fz8/P7+/vICAgcHBwMDAwj4+P////li1vTgAAAA50Uk5T/////////////////wBFwNzIAAAArUlEQVR42uyWQQ6EIAxFaQcRdLj/da0iyaS0ZmzUuOBtMNS3aIkfXZZxhFbqilHxABBoDVBYlf2xbnumrO8grega6jZcpsTUKinKSkDEKY+DExjGPFE5SBOTjc1RhqwZzPlRomqQE1uFetk6//rCzGfQ9gJ7yX8KwrChK1aFMWPh4FjfC2v/AG1iXflXqR+yRhJD6Wxc2ELpbPQZAtYQ48/cL4aLr/9d3KgsAgwA+m4/x2kyJrkAAAAASUVORK5CYII=');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 80%;
}

.rgvms-cell--open.rgvms-cell--open__hit-mine {
  background-color: red;
}

.rgvms-cell--open__text-blue {
  color: blue;
}
.rgvms-cell--open__text-green {
  color: green;
}
.rgvms-cell--open__text-red {
  color: red;
}
.rgvms-cell--open__text-darkBlue {
  color: darkblue;
}
.rgvms-cell--open__text-darkRed {
  color: darkred;
}
.rgvms-cell--open__text-petrol {
  color: darkcyan;
}
.rgvms-cell--open__text-darkGreen {
  color: darkgreen;
}
.rgvms-cell--open__text-grey {
  color: #444;
}

button.rgvms-btn {
  cursor: pointer;
  display: inline-block;
  min-height: 1em;
  outline: 0;
  border: none;
  vertical-align: baseline;
  background: #e0e1e2 none;
  color: rgba(0,0,0,.6);
  margin: 0 .25em 0 0;
  padding: .78571429em 1.5em .78571429em;
  text-transform: none;
  text-shadow: none;
  font-weight: 700;
  line-height: 1em;
  font-style: normal;
  text-align: center;
  text-decoration: none;
  border-radius: .28571429rem;
  -webkit-box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
  box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: opacity .1s ease,background-color .1s ease,color .1s ease,background .1s ease,-webkit-box-shadow .1s ease;
  transition: opacity .1s ease,background-color .1s ease,color .1s ease,background .1s ease,-webkit-box-shadow .1s ease;
  transition: opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s ease;
  transition: opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s ease,-webkit-box-shadow .1s ease;
  -webkit-tap-highlight-color: transparent;
}

button.rgvms-btn:active {
  background-color: #babbbc;
  color: rgba(0,0,0,.9);
  -webkit-box-shadow: 0 0 0 1px transparent inset,none;
  box-shadow: 0 0 0 1px transparent inset,none;
}

button.rgvms-btn:focus {
  background-color: #cacbcd;
  color: rgba(0,0,0,.8);    
  -webkit-box-shadow: ''!important;
  box-shadow: ''!important;
}

button.rgvms-btn:hover {
  background-color: #cacbcd;  
  -webkit-box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
  box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
  color: rgba(0,0,0,.8);
}

button.rgvms-btn:disabled {
  color: b6b6b6;
}

select.rgvms-select {
  cursor: pointer;
  word-wrap: break-word;
  line-height: 1em;
  white-space: normal;
  outline: 0;
  -webkit-transform: rotateZ(0);
  transform: rotateZ(0);
  min-width: 14em;
  min-height: 2.71428571em;
  background: #fff;
  display: inline-block;
  padding: .78571429em 2.1em .78571429em 1em;
  color: rgba(0,0,0,.87);
  -webkit-box-shadow: none;
  box-shadow: none;
  border: 1px solid rgba(34,36,38,.15);
  border-radius: .28571429rem;
  -webkit-transition: width .1s ease,-webkit-box-shadow .1s ease;
  transition: width .1s ease,-webkit-box-shadow .1s ease;
  transition: box-shadow .1s ease,width .1s ease;
  transition: box-shadow .1s ease,width .1s ease,-webkit-box-shadow .1s ease;
}

select.rgvms-select {
    border: 1px solid #d5d5d5;
    box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
    border-radius: .5em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOTIuNCIgaGVpZ2h0PSIyOTIuNCI+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTI4NyA2OS40YTE3LjYgMTcuNiAwIDAgMC0xMy01LjRIMTguNGMtNSAwLTkuMyAxLjgtMTIuOSA1LjRBMTcuNiAxNy42IDAgMCAwIDAgODIuMmMwIDUgMS44IDkuMyA1LjQgMTIuOWwxMjggMTI3LjljMy42IDMuNiA3LjggNS40IDEyLjggNS40czkuMi0xLjggMTIuOC01LjRMMjg3IDk1YzMuNS0zLjUgNS40LTcuOCA1LjQtMTIuOCAwLTUtMS45LTkuMi01LjUtMTIuOHoiLz48L3N2Zz4='),
      linear-gradient(to bottom, #ffffff 0%,#ececec  100%);
    background-repeat: no-repeat, repeat;
    background-position: right .7em top 50%, 0 0;
    background-size: .65em auto, 100%;
}
select.rgvms-select::-ms-expand {
    display: none;
}
select.rgvms-select:hover {
    border-color: #888;
}
select.rgvms-select:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222; 
    outline: none;
}
select.rgvms-select option {
    font-weight:normal;
}

input[type=text].rgvms-text-input {
  -webkit-appearance: none;
  -moz-appearance: none;
  margin: 0;
  max-width: 100%;
  -webkit-box-flex: 1;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  outline: 0;
  -webkit-tap-highlight-color: rgba(255,255,255,0);
  text-align: left;
  line-height: 1.21428571em;
  font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  padding: .67857143em 1em;
  background: #fff;
  border: 1px solid rgba(34,36,38,.15);
  color: rgba(0,0,0,.87);
  border-radius: .28571429rem;
  -webkit-transition: border-color .1s ease,-webkit-box-shadow .1s ease;
  transition: border-color .1s ease,-webkit-box-shadow .1s ease;
  transition: box-shadow .1s ease,border-color .1s ease;
  transition: box-shadow .1s ease,border-color .1s ease,-webkit-box-shadow .1s ease;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.rgvms-center {
  text-align: center;
}

.rgvms-mt-1 {
  margin-top: 1em;
}
</style>
