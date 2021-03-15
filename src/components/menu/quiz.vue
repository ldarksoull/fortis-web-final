<template>
  <div class="wrapper quiz">
    <div class="quiz-body">
      <div class="question-bg">
        <div class="question-body">Насколько хорошо ты знаешь Role Play режим в Grand Theft Auto 5?</div>
      </div>
      <div class="answers">
        <div class="answer">
          <div class="answer-btn">Я - Новичок</div>
          <div class="answer-text">Никогда ранее <span class="bold">не</span> играл в GTA 5, или играл, но <span class="bold">не</span> знаком с Role Play серверами</div>
        </div>
        <div class="answer answer-offset-left">
          <div class="answer-btn">Я - Опытный</div>
          <div class="answer-text">Играл ранее в GTA 5 и в Role Play режим в частности</div>
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
  .quiz{
    background: url('/img/quiz/background.jpg') no-repeat;
    background-size: cover;
    background-position: center;
    padding: 7%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .question-bg{
    width: 76.82vw; //1475px;
    min-height: 18.33vw; //352px;
    background: url('/img/quiz/question-bg.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (aspect-ratio: 5/4){
      width: calc(76.82vw / 1.2);
      min-height: calc(18.33vw / 1.2); //352px;
    }
  }
  .question-body{
    padding: 2em 0;
    font-family: "Century Gothic bold";
    font-size: 2.29vw; //44px;
    line-height: 1.1;
    color: #FFFFFF;
    width: 70%;
    @media (aspect-ratio: 5/4){
      font-size: calc(2.29vw / 1.2);
    }
  }
  .answers{
    margin-left: 17.45vw;//335px;
  }
  .answer{
    margin-bottom: 5.56vh; //60px;
    &:last-child{
      margin-bottom: 0;
    }
  }
  .answer-offset-left{
    margin-left: 7.6vw; //146px;
  }
  .answer-btn{
    width: 23.54vw; //452px;
    height: 5.47vw; //105px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.16vw solid #FFFFFF;
    box-sizing: border-box;
    border-radius: 5.21vw; //100px;
    font-family: "Century Gothic bold";
    font-size: 2.08vw; //40px;
    color: #FFFFFF;
    margin-bottom: 0.94vw; //18px;
    cursor: pointer;
    transition: 0.5s ease;
    &:hover{
      background: #FFFFFF;
      color: #57139B;
    }
  }
  .answer-text{
    font-family: "Century Gothic";
    font-size: 1.3vw; //25px;
    line-height: 1.2;
    color: #FFFFFF;
    padding-left: 1.56vw; //30px;
    max-width: 41.67vw; //800px;
  }
  .bold{
    font-family: "Century Gothic bold";
  }
</style>