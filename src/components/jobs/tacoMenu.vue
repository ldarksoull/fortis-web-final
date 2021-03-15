<template>
  <div class="wrapper">
    <div class="base">
      <div class="header">
        <div class="logo"></div>
      </div>
      <div class="main">
        <div class="col">
          <div class="main-header">
            <div class="title">Еда</div>
          </div>
          <div class="body">
            <div class="row">
              <div class="item">
                <div class="left">
                    <div class="item-name">Тако</div>
                    <div class="item-info">По мексиканскому рецепту</div>
                </div>
                <div class="right">
                    <div class="item-icon"><img src="/img/tacoMenu/taco.png" alt=""></div>
                    <div class="item-cost">{{ItemPrice(98)}} $</div>
                </div>
                <div class="btn" @click="buyItem(98)">Купить</div>
              </div>
              <div class="item">
                <div class="left">
                    <div class="item-name">Хот-дог</div>
                    <div class="item-info">Простой и очень питательный</div>
                </div>
                <div class="right">
                    <div class="item-icon"><img src="/img/tacoMenu/hotdog.png" alt=""></div>
                    <div class="item-cost">{{ItemPrice(99)}} $</div>
                </div>
                <div class="btn" @click="buyItem(99)">Купить</div>
              </div>
            </div>
            <div class="row">
              <div class="item">
                <div class="left">
                    <div class="item-name">Чипсы</div>
                    <div class="item-info">Для любителей похрустеть</div>
                </div>
                <div class="right">
                    <div class="item-icon"><img src="/img/tacoMenu/chips.png" alt=""></div>
                    <div class="item-cost">{{ItemPrice(36)}} $</div>
                </div>
                <div class="btn" @click="buyItem(36)">Купить</div>
              </div>
              <div class="item">
                <div class="left">
                    <div class="item-name">Шоколадка</div>
                    <div class="item-info">Выбор сладкоежки</div>
                </div>
                <div class="right">
                    <div class="item-icon"><img src="/img/tacoMenu/chocolade.png" alt=""></div>
                    <div class="item-cost">{{ItemPrice(100)}} $</div>
                </div>
                <div class="btn" @click="buyItem(100)">Купить</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="main-header">
            <div class="title">Напитки</div>
          </div>
          <div class="body">
            <div class="row">
              <div class="item">
                <div class="left">
                    <div class="item-name">Кока-Кола</div>
                    <div class="item-info">Классическая газировка</div>
                </div>
                <div class="right">
                    <div class="item-icon"><img src="/img/tacoMenu/cola.png" alt=""></div>
                    <div class="item-cost">{{ItemPrice(41)}} $</div>
                </div>
                <div class="btn" @click="buyItem(41)">Купить</div>
              </div>
              <div class="item">
                <div class="left">
                    <div class="item-name">Вода</div>
                    <div class="item-info">Бутылка воды без газа</div>
                </div>
                <div class="right">
                    <div class="item-icon"><img src="/img/tacoMenu/water.png" alt=""></div>
                    <div class="item-cost">{{ItemPrice(35)}} $</div>
                </div>
                <div class="btn" @click="buyItem(35)">Купить</div>
              </div>
            </div>
            <div class="row">
              <div class="item">
                <div class="left">
                    <div class="item-name">Кофе</div>
                    <div class="item-info">Утоляет жажду и усталость</div>
                </div>
                <div class="right">
                    <div class="item-icon"><img src="/img/tacoMenu/coffee.png" alt=""></div>
                    <div class="item-cost">{{ItemPrice(45)}} $</div>
                </div>
                <div class="btn" @click="buyItem(45)">Купить</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
    data(){
        return {}
    },
    computed: {
        ...mapGetters({
            tacoSellData: "getTacoSellData",
        }),
    },
    methods: {
        buyItem(id) {
            mp.trigger("cMisc-CallServerEvent", "sTacoBuyItem", id);
        },
        ItemPrice(id) {
            const keys = Object.keys(this.tacoSellData);
            const i = keys.indexOf(id.toString());
            return  this.tacoSellData[keys[i]];
        },
        exit() {
            mp.trigger("cCloseCef");
            mp.trigger("cSetPage", 'none');
        },
        onKeyUp(k) {
            if (k.keyCode === 27) {
                this.exit();
            }
        }
    },
    created() {
        document.addEventListener('keyup', this.onKeyUp);
    },
    beforeDestroy() {
        document.removeEventListener('keyup',this.onKeyUp);
    }
}
</script>
<style lang="scss" scoped>
  .wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .base{
    width: 82.34vw;
    height: 44vw;
    background: #D8D3D0;
    border-radius: 0.52vw;
    overflow: hidden;
  }
  .header{
    height: 18.5%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    background: linear-gradient(180deg, rgba(218, 145, 35, 0.75) 0%, rgba(207, 166, 104, 0) 100%), #E8A33B;
  }
  .logo{
    background-image: url('/img/tacoMenu/attack-a-taco.png');
    background-size: cover;
    width: 26.04vw;
    height: 7.4vw;
  }
  .main{
    padding: 2.08vw 1.56vw;
    width: 100%;
    height: 81.5%;
    display: flex;
    justify-content: space-between;
  }
  .col{
    height: 100%;
    width: 49%;
    background: #B5A9A5;
    border-radius: 0.52vw;
  }
  .item{
    width: 17.19vw;
    height: 8.18vw;
    border-radius: 0.52vw;
    background: linear-gradient(8.02deg, rgba(154, 154, 154, 0.0001) 7.33%, rgba(154, 154, 154, 0.22) 93.25%), #DA9123;
    box-shadow: 0px 0.21vw 0.21vw rgba(0, 0, 0, 0.25);
    position: relative;
    display: flex;
    margin: 0 auto;
    }
  .item .btn{
    width: 10.94vw;
    height: 2.45vw;
    border-radius: 0.52vw;
    position: absolute;
    bottom: 0;
    transform: translateY(50%);
    left: calc(50% - 10.94vw / 2);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: "Century Gothic";
    font-size: 1.56vw;
    font-weight: 400;
    transition: 0.3s;
    background: linear-gradient(175.26deg, rgba(208, 198, 198, 0.3) -30.81%, rgba(192, 144, 144, 0) 86.21%), #8D2923;
    box-shadow: 0px 0.21vw 0.21vw rgba(0, 0, 0, 0.25);
    color: #ffffff;
  }
  .item .btn:hover{
    background-color: #ffffff;
    color: #8D2923;
  }
  .item-name{
    font-family: "Century Gothic";
    font-size: 1.72vw;
    font-weight: 700;
    letter-spacing: -0.19px;
    white-space: nowrap;
  }
  .item-name, .item-info, .item-cost{
    color: #ffffff;
  }
  .item-info{
    font-family: "Century Gothic";
    font-size: 1.09vw;
    line-height: 1.02vw;
    font-weight: 400;
    letter-spacing: -0.13px;
    margin-top: 0.2vw;
  }
  .item-cost{
    font-family: "Century Gothic";
    font-size: 1.22vw;
    font-weight: 700;
    position: absolute;
    bottom: 1.3vw;
    left: 50%;
    transform: translateX(-50%)
  }
  .left{
      width: 60%;
      padding-left: 0.8vw;
      padding-top: 0.9vw;
  }
  .right{
      width: 40%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
  }
  .item-icon{
      width: 4.17vw;
      height: 5.21vw;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  img{
    max-width: 100%;
  }
  .main-header{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.56vw 0;
  }
  .title{
    font-family: "Century Gothic";
    font-size: 3.33vw;
    color: #FFF9F9;
  }
  .body{
    padding: 0 1.4vw;
  }
  .row{
    display: flex;
    &:first-child{
      margin-bottom: 4.22vw;
    }
  }
</style>
