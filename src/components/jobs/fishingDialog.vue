<template>
  <div class="wrapper">
    <div class="dialog">
      <div class="dialog-author">George</div>
      <div class="dialog-body">Lorem ipsu ipsum dort, consectetur adipisectetur adipi Lorem ipsum dolor sit amet, consectetur adipi</div>
      <div class="dialog-footer">
        <div class="dialog-btn">Если поймаю, привезу тебе</div>
        <div class="dialog-btn">Я принёс тебе золотую рыбкку</div>
        <div class="dialog-btn">Я принёс тебе золотую рыбкку</div>
         <div class="dialog-btn">Я принёс тебе золотую рыбкку</div>
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
  .dialog{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: radial-gradient(50% 50% at 50% 50%, rgba(243, 240, 240, 0.3) 0%, rgba(216, 212, 212, 0) 100%), #FFFFFF;
  }
  .dialog-author{
    position: absolute;
    top: 0;
    transform: translateY(-50%);
    left: 5%;
    width: 22.86vw; //439px;
    height: 3.85vw; //74px;
    background: radial-gradient(50% 50% at 50% 50%, rgba(243, 240, 240, 0.1) 0%, rgba(216, 212, 212, 0) 100%), #281E1E;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    clip-path: polygon(0 0, 90% 0, 100% 100%, 10% 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Century Gothic";
    font-weight: bold;
    font-size: 1.88vw; //36px;
    color: #FFFFFF;
  }
  .dialog-body{
    font-family: "Century Gothic";
    font-size: 1.25vw; //24px;
    line-height: 1.51vw; //29px;
    color: #000000;
    padding-top: 2.6vw; //50px
    padding-left: 5.2vw;
    padding-right: 5.2vw;
    text-align: center;
  }
  .dialog-footer{
    display: flex;
    justify-content: center;
    padding: 1vw 0;
  }
  .dialog-btn{
    border: 0.05vw solid #000000;
    box-sizing: border-box;
    border-radius: 5.21vw; //100px;
    min-width: 21.51vw; //413px;
    min-height: 2.55vw; //49px;
    margin: 0 1%;
    font-family: "Century Gothic";
    font-weight: bold;
    font-size: 1.04vw; //20px;
    color: #000000;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
    &:hover{
      opacity: 0.75;
    }
  }
</style>