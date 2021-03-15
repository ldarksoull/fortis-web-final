<template>
  <div class="wrapper">
    <div class="base">
      <div class="item item-1">
        <div class="item-header">
          <div class="icon-door"></div>
        </div>
        <div class="item-btn">Выйти на улицу</div>
      </div>
      <div class="item item-2">
        <div class="item-header">
          <div class="icon-door"></div>
        </div>
        <div class="item-btn">Выйти в гараж</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  }
}
</script>
<style lang="scss" scoped>
::selection{
  background: transparent;
}
  .wrapper{
    display: flex;
    justify-content: center;
    align-items: center;

  }
  .base{
    width: 77.5vw; //1488px;
    height: 42.19vw; //810px;
    background: #19619A;
    border-radius: 0.52vw; //10px;
    padding: 2.08vw; //40px;
    display: flex;
    justify-content: space-between;
  }
  .item{
    width: 49%;
    height: 100%;
    border-radius: 0.52vw; //10px;
    position: relative;
    &.item-1{
      background: #4092D2 url('/img/houses/street.png') no-repeat;
      background-position: center 145%;
      background-size: 100%;
    }
    &.item-2{
      background: #4092D2 url('/img/houses/garage.png') no-repeat;
      background-position: center 105%;
      background-size: 80%;
    }
  }
  .item-header{
    padding-top: 1.56vw; //30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon-door{
    width: 10.42vw; //200px;
    height: 11.25vw; //216px;
    background: url('/img/houses/exit.png') no-repeat;
    background-size: contain;
  }
  .item-btn{
    width: 29.9vw; //574px;
    height: 4.43vw; //85px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: rgba(25, 97, 154, 0.7);
    border-radius: 0.52vw; //10px;
    font-family: "Century Gothic";
    font-size: 2.81vw; //54px;
    color: #FFFCFC;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%);
    transition: 0.2s;
    cursor: pointer;
    &:hover{
      background: #FDFEFF;
      color: #19619A;
    }
  }
</style>