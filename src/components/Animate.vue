<template>
  <div>
    <button @click="shuffle">shuffle</button>
    <button @click="arr.splice(0,1)">del</button>
    <transition-group name="fade" tag="ul">
      <li v-for="union in arr" :key="union">{{union}}</li>
    </transition-group>
  </div>
</template>
<style>
  ul{
    display: inline-block;
    margin: 0;
    padding: 0;
    list-style: none;
    border-bottom: 1px solid #e2e2e2;
    border-left: 1px solid #e2e2e2;
    width: 300px;
  }
  li {
    width: 30px;
    line-height: 30px;
    text-align: center;
    border-top: 1px solid #e2e2e2;
    border-right: 1px solid #e2e2e2;
    float:left;
    display: inline-block;
  }
  .grid>li:nth-child(9n) {
    display: inline-block;
    clear: both;
  }
  .grid>li:nth-child(9n):after{
    clear: both;
    content: '';
    display: table;
  }
  .grid>li:nth-child(9n):before{
    clear: both;
    content: '';
    display: table;
  }
  .fade-move {
    transition: transform 1s;
  }
  .fade-enter-active,.fade-leave-active{
    transition: all 1s linear;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
    transform: translateY(30px);
  }
</style>
<script type="text/ecmascript-6">
  export default {
    data: () => {
      return {
        arr: []
      }
    },
    created: function () {
      let i = 1
      this.arr = Array.apply(null, {length: 81}).map(() => {
        return i++
      })
    },
    methods: {
      shuffle: function () {
        let tempArr = this.arr.slice()
        let len = tempArr.length
        let i = len
        let r = 0
        let temp = 0
        for (; i > 0; i--) {
          r = Math.floor(Math.random() * i)
          temp = tempArr[r]
          tempArr[r] = tempArr[i - 1]
          tempArr[i - 1] = temp
        }
        this.arr = tempArr
      }
    }
  }
</script>
