<template>
  <div class="wrapper">
    <div class="help">
      <div class="help-content">
        <div class="help-text">
          <div class="help-title">Если Вам нужна помощь, нажмите М - “Помощь”</div>
          <div class="help-subtitle">Если не нашли ответ на Ваш вопрос, пишите администрации в М - “Репорт”</div>
        </div>
        <div class="help-image">
          <img src="/img/book.png" alt="">
        </div>
      </div>
      <div class="progress">
        <div class="progress-fill" :style="{ 'width': timer + '%' }" :class="{ yellow: timer >= 40 && timer <= 75, red: timer > 75 }"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      timer: 0,
      interval: null,
      intervalTime: 15000 // ms
    }
  },
  mounted(){
    this.startTimer()
  },
  methods:{
    startTimer(){
      this.interval = setInterval(()=>{
        this.timer++
        console.log(this.timer)
        if (this.timer >= 100){
          this.stopTimer()
        }
      }, this.intervalTime / 100) // 100% ширина блока с шагом 1
    },
    stopTimer(){
      clearInterval(this.interval)
      this.interval = null
    }
  }
}
</script>
<style lang="scss" scoped>
  .help{
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 48.54vw; //932px;
    background: linear-gradient(180deg, rgba(40, 93, 173, 0.4) 0%, rgba(48, 101, 180, 0) 100%), #1B2768;
    clip-path: polygon(0 0, 100% 0%, 80% 100%, 0 100%);
    display: flex;
    flex-direction: column;
    border-radius: 0.26vw; //5px;
    border-top-right-radius: 0;
    overflow: hidden;
    box-shadow: inset 0 0 0.104vw 0.156vw rgba(219, 226, 236, 0.103);
  }
  .help-content{
    display: flex;
    align-items: center;
  }
  .help-text{
    width: 75%;
    padding-left: 5%;
    padding-top: 1.302vw; //25px;
    padding-bottom: 1.302vw; //25px;
  }
  .help-title{
    font-family: "Century Gothic";
    font-weight: bold;
    font-size: 1.146vw; //22px;
    line-height: 1.25;
    color: #FFFFFF;
    margin-bottom: 0.521vw; //10px;
  }
  .help-subtitle{
    font-family: "Century Gothic";
    font-size: 0.938vw; //18px;
    line-height: 1.25;
    color: #FFFFFF;
  }
  .help-image{
    // position: absolute;
    // right: 17%;
    // top: 10%;
    margin-left: auto;
    margin-right: 17%;
    width: 3.125vw; //60px;
    height: 5.208vw; //100px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      max-width: 100%;
      height: auto;
    }
  }
  .progress{
    width: 80%;
    height: 0.78vw; //15px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.555) 0%, rgba(255, 255, 255, 0) 100%), rgba(189, 189, 189, 0.506);
    overflow: hidden;
    margin-top: auto;
    border-radius: 0.26vw; //5px;
  }
  .progress-fill{
    width: 0;
    height: 100%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%), rgba(32, 131, 53, 0.808);
    transition: 0.5s;
    &.yellow{
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%), rgba(168, 154, 31, 0.808);
    }
    &.red{
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%),  rgba(181, 41, 41, 0.822);
    }
  }
</style>