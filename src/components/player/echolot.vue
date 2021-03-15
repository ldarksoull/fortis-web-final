<template>
  <div class="wrapper">
    <div class="echolot">
      <div class="echolot-screen">
        <div class="screen-header">
          <div class="echolot-temp">+21°</div>
          <div class="echolot-card">
            <div class="echolot-card__amount">10</div>
          </div>
        </div>
        <div class="screen-body">
          <div class="screen-body-fish screen-body-fish-1"></div>
          <div class="screen-body-fish screen-body-fish-2"></div>
        </div>
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
  .echolot{
    width: 8.91vw; //171px;
    height: 15.31vw; //294px;
    background: url('/img/fishing/echolot.png');
    background-size: contain;
    position: absolute;
    bottom: 25vh; /// позиция эхолота 
    left: 2vw; /// позиция эхолота 
    @media (max-aspect-ratio: 4/3) { // для квадратных моников размер х2
      transform: scale(2); 
      transform-origin: left bottom; 
    }
    &-screen{
      width: 5.26vw; //101px;
      height: 6.98vw; //134px;
      background: url('/img/fishing/echolot-bg.png');
      background-size: contain;
      border-radius: 0.52vw; //10px;
      position: absolute;
      left: calc(50% - 5.26vw / 2);
      top: 15%;
    }
    &-temp{
      font-family: "Century Gothic";
      font-weight: bold;
      font-size: 0.94vw; //18px;
      color: #203765;
    }
    &-card{
      width: 2.6vw; //50px;
      height: 2.6vw; //50px;
      background: url('/img/fishing/micro-sd-card.png') no-repeat;
      background-size: contain;
      position: relative;
      &__amount{
        font-family: "Century Gothic";
        font-weight: bold;
        font-size: 0.52vw; //10px;
        color: #203765;
        position: absolute;
        bottom: 0.36vw; //7px;
        left: 0.78vw; //15px;
        width: 1.3vw; //25px;
        height: 0.68vw; //13px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
    }
  }
  .screen-header{
    display: flex;
    justify-content: space-between;
    padding-top: 0.47vw; //9px;
    padding-left: 0.26vw; //5px;
  }
  .screen-body{
    width: 100%;
    height: 3.125vw; //60px;
    margin-top: 0.26vw; //5px;
    position: relative;
    overflow: hidden;
  }
  .screen-body-fish{
    position: absolute;
    width: 1.302vw; //25px;
    height: 1.146vw; //22px;
    background: url('/img/fishing/small-fish.png') no-repeat;
    background-size: contain;
    filter: drop-shadow(0px 0.208vw 0.208vw rgba(0, 0, 0, 0.25));
    animation-name: anim;
    animation-iteration-count: infinite;
    animation-duration: 4s;
    animation-timing-function: ease-in-out;
    transition: 0.2s;
  }
  .screen-body-fish-1{
    left: 14%;
    top: 5%;
  }
  .screen-body-fish-2{
    animation-delay: 1s;
    animation-duration: 3s;
    left: 54%;
    top: 20%;
  }
  @keyframes anim {
    0%{
      transform: translateY(0);
    }
    50%{
      transform: translateY(23%);
    }
    100%{
      transform: translateY(0);
    }
  }
</style>