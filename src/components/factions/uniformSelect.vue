<template>
  <div class="wrapper">
    <div class="base">
      <div class="close"></div>
      <div class="header">Готовые комплекты формы</div>
      <div class="title">Выберите один из комплектов</div>
      <div class="body">
        <div class="item" :class="{ selected: selected === item }" v-for="(item, i) in items" :key="i">
          <div class="item-body">Форма отряда №{{i}}</div>
          <div class="item-btn" @click="setActiveItem(item)">Надеть</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      selected: null,
      items:[1,2,3,4,5,6,7,8,9,10]
    }
  },
  methods:{
    setActiveItem(e){
      this.selected = e
    }
  }
}
</script>
<style lang="scss" scoped>
  .wrapper{
    padding-left: 4vw;
    padding-top: 3vw;
  }
  .close{
    width: 20px;
    height: 20px;
    position: absolute;
    right: 15px;
    top: 20px;
    background: url('/img/close-white-20px.png');
  }
  .base{
    position: relative;
    width: 496px;
    background: #4D9DDC;
    border-radius: 10px;
    padding-top: 28px;
    padding-bottom: 22px;
    transform-origin: left top;
    @media (max-width: 1350px){
      transform: scale(0.75);
    }
  }
  .header{
    font-family: "Century Gothic Bold";
    font-size: 26px;
    color: #FFFFFF;
    margin-bottom: 5px;
    padding: 0 22px;
  }
  .title{
    font-family: "Century Gothic";
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 20px;
    padding: 0 22px;
  }
  .body{
    padding: 0 22px;
    padding-bottom: 12px;
    max-height: 350px;
    overflow-y: auto;
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 25px;
    &::-webkit-scrollbar{
      width: 9px;
    }
    &::-webkit-scrollbar-track{
      background: #E7EFF4;
    }
    &::-webkit-scrollbar-thumb{
      background: #65B9FC;
    }
  }
  .item{
    padding: 12px 15px;
    padding-bottom: 20px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%), #257EC5;
    position: relative;
    min-height: 66px;
    transition: 0.3s;
    &:last-child{
      padding-bottom: 26px;
    }
    &-body{
      font-family: "Century Gothic";
      font-size: 14px;
      color: #FFFFFF;
    }
    &-btn{
      position: absolute;
      width: 115px;
      height: 22px;
      line-height: 22px;
      text-align: center;
      background: #1167AA;
      border-radius: 10px;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%);
      font-family: "Century Gothic Bold";
      font-size: 12px;
      color: #FFFFFF;
      transition: 0.2s;
      &:hover, .item.selected &{
        background: #FFFEFE;
        color: #257EC5;
        
      }
    }
    &.selected{
      box-shadow: 0 5px 5px 0px rgba(0, 0, 0, 0.3);
    }
  }
</style>