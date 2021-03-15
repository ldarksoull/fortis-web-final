<template>
<div class="wrapper flex-center">
    <div class="base">
      <div class="header">
        <span>Какую лодку вы желаете арендовать?</span>
      </div>
      <div class="body-wrapper">
        <div class="body">
            <div class="body-item" v-for="(item, i) in items" :key="i">
                <div class="item-props">
                    <div class="item-prop">
                        <span>Модель :</span> {{ item.modelName }}
                    </div>
                    <div class="item-prop">
                        <span>Вместимость: </span> {{ item.capacity }} чел.
                    </div>
                    <div class="item-prop">
                        <span>Цена аренды за час: </span> {{ item.hourPrice }}$
                    </div>
                    <div class="item-prop">
                        <span>Время аренды:</span> <input class="hours-input" min="0.5" step="0.5" v-model="item.hours" type="number"> часов
                    </div>
                    <div class="item-prop item-prop--total">
                        <span>Итого:</span> {{ totalPrice(item) }}$
                    </div>
                </div>
                <div class="item-btn" @click="rent(item.modelName, 700)">Арендовать</div>
            </div>
        </div>
      </div>
    </div>
</div>
</template>
<script>
export default {
  data(){
    return{
        items: [
            {
                modelName: 'Nagassaki Dinghy 2',
                capacity: 2,
                hourPrice: 1000,
                hours: 1,
            },
            {
                modelName: 'Nagassaki Dinghy 2',
                capacity: 2,
                hourPrice: 2000,
                hours: 1,
            },
            {
                modelName: 'Nagassaki Dinghy 2',
                capacity: 2,
                hourPrice: 3000,
                hours: 1,
            },
        ]
        }
    },
    methods:{
        totalPrice(e){
            return Math.round(e.hourPrice * e.hours)
        },
        rent(type, price) {
            mp.trigger("cMisc-CallServerEvent", "sVehicleRentBoat", type, price);
            this.exit();
        },
        exit() {
            mp.trigger("cCloseCef");
        },
        onKeyUp(e) {
            if (e.keyCode === 27) {
                this.exit();
            }
        },
    },
    created() {
        document.addEventListener("keyup", this.onKeyUp);
    },
    beforeDestroy() {
        document.removeEventListener("keyup", this.onKeyUp);
    },
}
</script>
<style lang="scss" scoped>
.flex-center{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .base{
    width: 40.31vw; //774px;
    background: linear-gradient(180deg, rgba(38, 153, 244, 0.3) 0%, rgba(255, 255, 255, 0) 100%), #045391;
    border-radius: 0.52vw; //10px;
    overflow: hidden;
  }
  .header{
    height: 3.65vw; //70px;
    background: linear-gradient(180deg, rgba(86, 163, 223, 0.8) 0%, rgba(109, 185, 244, 0) 100%), #1E7CC7;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Century Gothic";
    font-size: 1.3vw; //25px;
    color: #FFFEFE;
    text-shadow: 0px 0.21vw 0.21vw rgba(0, 0, 0, 0.25);
  }
  .body-wrapper{
    padding: 1.61vw 0.61vw; 
    height: 19.3vw;
    width: 100%;
  }
  .body{
    height: 100%;
    overflow-y: auto;
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(auto-fit, 1fr);
    place-content: start center;
    padding: 0 1vw;
    gap: 1.46vw; //28px;
    &::-webkit-scrollbar {
        width: 0.52vw!important;
    }
    &::-webkit-scrollbar-track{
        border-radius: 0.26vw;
        background: #1E7CC7;
    }
    &::-webkit-scrollbar-thumb{
        border-radius: 0.26vw;
        background: #FFFFFF;
    }
    &-item{
      background: linear-gradient(180deg, rgba(86, 163, 223, 0.8) 0%, rgba(109, 185, 244, 0) 100%), #1E7CC7;
      border-radius: 0.52vw; //10px;
      padding: 1.51vw; //29px;
      display: flex;
      flex-direction: column;
    }
  }
  .item-prop{
    font-family: "Century Gothic Bold";
    font-size: 0.94vw; //18px;
    color: #FFFEFE;
    margin-bottom: 0.73vw; //14px;
    &--total{
      margin-top: 2vw;
    }
  }
  .hours-input{
    display: inline;
    margin-left: 0.5em;
    width: 3vw;
    padding: 0.3em 0.5em;
    background: #045391;
    border-radius: 3vw;
    border: none;
    text-align: center;
    font-size: 0.94vw; //18px;
    line-height: 1.1;
    color: #FFFEFE;
  }
  .item-btn{
    width: 100%;
    height: 1.88vw; //36px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), #34A6FF;
    border-radius: 1.04vw; //20px;
    font-family: "Century Gothic Bold";
    font-size: 0.83vw; //16px;
    color: #FFFEFE;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.15s;
    margin-top: auto;
    &:hover{
      filter: brightness(115%);
    }
  }
</style>
