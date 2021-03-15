<template>
  <div class="wrapper">
    <div class="base">
      <div class="title">Продажа нелегала</div>
      <div class="body">
        <div class="item" v-for="(item, i) in items" :key="i">
          <div class="item__icon"><img :src="`/img/illegalItems/${item.image}.png`" alt=""></div>
          <div class="item-main">
            <div class="item__name">{{ item.name }} - {{ item.price }}$ за ед.</div>
            <div class="item__info">У вас <span class="bold">{{ item.amount }}</span> ед.</div>
          </div>
          <div class="item-right">
            <div class="item-input">
              <div class="item-input__name">Кол-во: </div>
              <div class="item-input__body">
                <input type="number" v-model="item.sellAmount">
              </div>
            </div>
            <div class="item__info">Сумма: <span class="bold">{{ item.amount * item.sellAmount }}</span>$</div>
          </div>
          <div class="item-button">Продать</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      items:[
        {
          name: 'Марихуана',
          price: 2,
          amount: 10,
          image: 'ganja',
          sellAmount: 0,
        },
        {
          name: 'Метанфетамин',
          price: 2,
          amount: 130,
          image: 'meth',
          sellAmount: 0,
        },
        {
          name: 'Отмычки',
          price: 2,
          amount: 10,
          image: 'masterKey',
          sellAmount: 0,
        },
        {
          name: 'Ножовки',
          price: 2,
          amount: 10,
          image: 'hacksaw',
          sellAmount: 0,
        },
        {
          name: 'Мешки',
          price: 2,
          amount: 10,
          image: 'bag',
          sellAmount: 0,
        },
        {
          name: 'Стяжки',
          price: 2,
          amount: 10,
          image: 'screed',
          sellAmount: 0,
        },
        // {
        //   name: 'Стяжки',
        //   price: 2,
        //   amount: 10,
        //   image: 'screed',
        //   sellAmount: 0,
        // },
      ]
    }
  },
}
</script>
<style lang="scss" scoped>
.bold{
  font-family: "Century Gothic Bold";
}
  .base{
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), #121416;
    box-shadow: 0px 9px 40px rgba(0, 0, 0, 0.25);
    width: 23.44vw; //450px;
    border-radius: 0.52vw;
    padding: 1.04vw 0.26vw; //20px 5px;
    padding-bottom: 1.56vw; //30px;
    position: absolute;
    left: 5vw;
    top: 5vw;
    font-family: "Century Gothic";
    color: #ffffff;
    transform-origin: left top;
    @media(max-aspect-ratio: 4/3){
      transform: scale(1.5);
    }
  }
  .title{
    font-family: "Century Gothic";
    font-weight: bold;
    font-size: 1.15vw; //22px;
    text-align: center;
    padding: 1.04vw 0; //20px 0;
    margin-bottom: 0.52vw; //10px;
  }
  .body{
    height: 29.69vw; //570px;
    overflow-y: auto;
    padding: 0 1.04vw; //20px;
    &::-webkit-scrollbar{
      width: 0.31vw; //6px;
    }
    &::-webkit-scrollbar-track{
      background: rgb(0, 0, 0);
      border-radius: 0.31vw; //6px;
    }
    &::-webkit-scrollbar-thumb{
      background: #656565;
      border-radius: 0.31vw; //6px;
    }
  }
  .item{
    width: 100%;
    height: 3.39vw; //65px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%), #656565;
    border-radius: 5.21vw; //100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 0 1.04vw; //20px;
    position: relative;
    margin-bottom: 1.56vw; //30px;
  }
  .item-button{
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 50%);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%), #434343;
    border-radius: 5.21vw; //100px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.21vw 2.08vw; //4px 40px;
    font-size: 0.63vw; //12px;
    font-family: "Century Gothic Bold";
    transition: 0.2s;
    &:hover{
      background: #FFFFFF;
      color: #434343;
    }
  }
  .item__icon{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.52vw; //10px;
    width: 8%;
  }
  img{
    max-width: 100%;
  }
  .item-main{
    width: 60%;
  }
  .item-right{
    margin-left: auto;
    width: 28%;
  }
  .item__name{
    font-weight: bold;
    font-size: 0.73vw; //14px;
    font-family: "Century Gothic Bold";
  }
  .item__info{
    font-size: 0.63vw; //12px;
    margin-top: 0.16vw; //3px;
  }
  .item-input{
    display: flex;
    align-items: center;
    &__name{
      font-size:  0.73vw; //14px;
    }
    &__body{
      width: 1.98vw; //38px;
      height: 0.99vw; //19px;
      margin-left: 0.52vw; //10px;
      display: flex;
      input{
        font-family: Century Gothic;
        width: 100%;
        height: 100%;
        border: 0.05vw solid #FFFFFF;//1px
        border-radius: 2.6vw; //50px;
        color: #ffffff;
        text-align: center;
        background: transparent;
        font-size: 0.57vw; //11px;
      }
    }
  }
</style>