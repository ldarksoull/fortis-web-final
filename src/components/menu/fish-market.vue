<template>
    <div class="wrapper center">
        <div class="base">
            <div class="items">
                <div class="item" v-for="fish in fishList">
                    <div class="item-header center">{{ fish.title }}</div>
                    <div class="item-body">
                        <div class="item-info">
                            <div class="info-row">
                                <div class="info-title">Средний вес:</div>
                                <div class="info-text">{{ fish.weight }} кг.</div>
                            </div>
                            <div class="info-row">
                                <div class="info-title">Цена/кг. :</div>
                                <div class="info-text">{{ fish.price }}$</div>
                            </div>
                        </div>
                        <div class="item-image">
                            <img :src="getImgSrc(fish.img)" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer center">
                <div class="total-sum">
                    Общая сумма: <span> {{ fishPrice | divideNumber(" ") }}$</span>
                </div>
                <div class="margin">
                    Наценка: <span> {{ fishMargin }}%</span>
                </div>
                <div class="button-sell center" @click="sell()">Продать всю рыбу</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            fishList: [
                { title: "Калифорнийский корбин", weight: 2.95, price: 5, img: "corbin" },
                { title: "Тунец обыкновенный", weight: 1.3, price: 19, img: "tunec" },
                { title: "Лосось тихоокеанский", weight: 3.25, price: 15, img: "losos" },
                { title: "Орляковый скат", weight: 9.1, price: 4, img: "skat" },
                { title: "Желтоперый горбыль", weight: 1.6, price: 10, img: "gorbil" },
                { title: "Калифорнийский палтус", weight: 11.4, price: 7, img: "paltus" },
                { title: "Калифорнийский гитарист", weight: 14.75, price: 6, img: "gitarist" },
                { title: "Пятнистый горбыль", weight: 4.15, price: 7, img: "gorbil2" },
                { title: "Леопардовая акула", weight: 12.5, price: 9, img: "akula" },
                { title: "Хек (мерлуза)", weight: 0.6, price: 20, img: "hec" },
            ],
        };
    },
    computed: {
        ...mapGetters({
            fishPrice: "getFishPrice",
            fishMargin: "getFishMargin",
        }),
    },
    methods: {
        sell() {
            if (this.fishPrice === 0) return;
            mp.trigger("cMisc-CallServerEvent", "sFishingSellFish", this.fishMargin);
        },
        exit() {
            mp.trigger("cCloseCef");
        },
        onKeyDown(e) {
            if (e.keyCode === 27) {
                this.exit();
            }
        },
        getImgSrc(title) {
            return `/img/player/inv/${title}.png`;
        },
    },
    created() {
        document.addEventListener("keyup", this.onKeyDown);
    },
    mounted() {
        if (this.fishMargin === 0) return;
        this.fishList.forEach(fish => {
            fish.price += (fish.price / 100) * this.fishMargin;
            fish.price = this.$options.filters.roundNum(fish.price, 2);
        });
    },
    beforeDestroy() {
        document.removeEventListener("keyup", this.onKeyDown);
    },
};
</script>
<style lang="scss" scoped>
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.base {
    width: 77.5vw; //1488px;
    background: #19619a url("/img/stores/fishMarket-bg.png");
    background-size: contain;
    border-radius: 0.52vw; //10px;
    padding: 2.6vw 1.82vw 1.04vw; //50px 35px 20px;
    font-family: "Century Gothic";
}
.item {
    background: #4092d2;
    border-radius: 0.52vw; //10px;
    overflow: hidden;
    height: 100%;
    width: 31%;
    margin: 0.5vw;
    &-header {
        height: 2.81vw; //54px;
        background: #88bfea;
        font-weight: bold;
        font-size: 1.04vw; //20px;
        color: #fffcfc;
    }
    &-body {
        height: 5vw; //96px;
    }
}
.items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.row {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 1.04vw; //20px;
}
.footer {
    height: calc(5.63vw - 1.04vw); //108px;-//20px;
    position: relative;
}
.button-sell {
    width: 25.78vw; //495px;
    height: 2.76vw; //53px;
    background: #174971;
    border-radius: 0.52vw; //10px;
    font-size: 1.56vw; //30px;
    color: #fffcfc;
    transition: 0.2s;
    &:hover {
        background: #fdfeff;
        color: #174971;
    }
}
.info-row {
    display: flex;
    align-items: center;
    font-family: "Century Gothic";
    font-size: 0.89vw; //17px;
    color: #fffcfc;
    height: 50%;
}
.info-title {
    min-width: 4.69vw; //90px;
}
.info-text {
    margin-left: 0.5vw;
}
.item-body {
    padding: 0 5%;
    display: flex;
}
.item-info {
    width: 50%;
    padding: 1.04vw 0; //20px 0;
}
.item-image {
    width: 50%;
    display: flex;
    justify-content: center;
    img {
        max-width: 100%;
        object-fit: contain;
    }
}
.total-sum {
    position: absolute;
    left: 0;
    font-family: "Century Gothic";
    font-size: 1.67vw; //32px
    color: #fffcfc;
}
.margin {
    position: absolute;
    right: 0;
    font-family: "Century Gothic";
    font-size: 1.67vw; //32px
    color: #fffcfc;
}
.flex-center {
    justify-content: center;
}
</style>
