<template>
    <div class="wrapper">
        <div class="store fortisbar">
            <div class="main">
                <div class="header">
                    <div class="store-logo fortisbar-logo"><img src="/img/stores/fortisbar-logo.png" alt=""></div>
                </div>
                <div class="body">
                    <div class="list">
                        <div class="row">
                            <div class="item">
                                <div class="left">
                                    <div class="item-name">Водка</div>
                                    <div class="item-info">Крепкая как твой характер</div>
                                </div>
                                <div class="right">
                                    <div class="item-icon"><img src="/img/player/shop/vodka.png" alt=""></div>
                                    <div class="item-cost">20$</div>
                                </div>
                                <div class="btn">Купить</div>
                            </div>
                            <div class="item">
                                <div class="left">
                                    <div class="item-name">Виски</div>
                                    <div class="item-info">Решит все твои проблемы</div>
                                </div>
                                <div class="right">
                                    <div class="item-icon"><img src="/img/player/shop/whiskey.png" alt=""></div>
                                    <div class="item-cost">20$</div>
                                </div>
                                <div class="btn">Купить</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="item">
                                <div class="left">
                                    <div class="item-name">Тушенные бобы</div>
                                    <div class="item-info">Попрощайся с голодом</div>
                                </div>
                                <div class="right">
                                    <div class="item-icon"><img src="/img/player/inv/bobi.png" alt=""></div>
                                    <div class="item-cost">20$</div>
                                </div>
                                <div class="btn">Купить</div>
                            </div>
                            <div class="item">
                                <div class="left">
                                    <div class="item-name">Вода</div>
                                    <div class="item-info">Утоляет жажду к приключениям</div>
                                </div>
                                <div class="right">
                                    <div class="item-icon"><img src="/img/player/shop/water.png" alt=""></div>
                                    <div class="item-cost">20$</div>
                                </div>
                                <div class="btn">Купить</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="item">
                                <div class="left">
                                    <div class="item-name">Тушенные бобы</div>
                                    <div class="item-info">Попрощайся с голодом</div>
                                </div>
                                <div class="right">
                                    <div class="item-icon"><img src="/img/player/inv/bobi.png" alt=""></div>
                                    <div class="item-cost">20$</div>
                                </div>
                                <div class="btn">Купить</div>
                            </div>
                            <div class="item">
                                <div class="left">
                                    <div class="item-name">Вода</div>
                                    <div class="item-info">Утоляет жажду к приключениям</div>
                                </div>
                                <div class="right">
                                    <div class="item-icon"><img src="/img/player/shop/water.png" alt=""></div>
                                    <div class="item-cost">20$</div>
                                </div>
                                <div class="btn">Купить</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="item">
                                <div class="left">
                                    <div class="item-name">Тушенные бобы</div>
                                    <div class="item-info">Попрощайся с голодом</div>
                                </div>
                                <div class="right">
                                    <div class="item-icon"><img src="/img/player/inv/bobi.png" alt=""></div>
                                    <div class="item-cost">20$</div>
                                </div>
                                <div class="btn">Купить</div>
                            </div>
                            <div class="item">
                                <div class="left">
                                    <div class="item-name">Вода</div>
                                    <div class="item-info">Утоляет жажду к приключениям</div>
                                </div>
                                <div class="right">
                                    <div class="item-icon"><img src="/img/player/shop/water.png" alt=""></div>
                                    <div class="item-cost">20$</div>
                                </div>
                                <div class="btn">Купить</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="escape">
                <img src="/img/stores/escape-tips.png" alt="">
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
<style scoped>
    .store{
        width: 100%;
        height: 100%;
        background: url('/img/stores/bg.png');
        background-size: cover;
        padding-left: 1.56vw;
        padding-top: 3.7vw;
    }
    .store .main{
        width: 31.15vw;
        height: 35.94vw;
        box-shadow: 0 0.5vw 2.08vw rgba(0, 0, 0, 0.25);
        border-radius: 0.52vw;
        padding-bottom: 0.28vw;
    }
    .fortisbar .main{
        background-color: rgb(81, 154, 220);
        background-image: url('/img/stores/fortisbar-bg.png');
        background-size: cover;
        background-repeat: no-repeat;
    }
    .header{
        width: 100%;
        height: 21%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1%;
    }
    .store-logo{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .body{
        height: 77%;
    }
    .fortisbar-logo{
        width: 80%;
    }
    img{
        max-width: 100%;
    }
    .body{
        direction: rtl;
        overflow-y: auto;
        margin-left: 0.42vw;
    }
    .list{
        display: flex;
        flex-wrap: wrap;
        direction: ltr;
        margin-right: 0.42vw;
    }
    .row{
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        margin-bottom: 3.3vw;
    }
    .item{
        width: 12.34vw;
        height: 5.94vw;
        border-radius: 0.52vw;
        background-image: linear-gradient(31deg, rgba(154, 154, 154, 0) 0%, rgba(154, 154, 154, 0.22) 100%);
        position: relative;
        display: flex;
    }
    .fortisbar .item{
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%), #1779D1;
    }
    .item .btn{
        width: 6.25vw;
        height: 1.50vw;
        border-radius: 0.52vw;
        position: absolute;
        bottom: -0.75vw;
        left: calc(50% - 6.25vw / 2);
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 0.78vw;
        letter-spacing: -0.15px;
        transition: 0.3s;
        font-family: "Century Gothic Bold";
    }
    .fortisbar .item .btn{
        box-shadow: 0 0.21vw 0.42vw 0.26vw rgba(0, 0, 0, 0.06);
        background: #145C9C;
        color: #ffffff;
    }
    .fortisbar .item .btn:hover{
        background-color: #ffffff;
        color: #1779D1;
    }
    .item-name{
        font-family: "Century Gothic";
        font-size: 0.99vw;
        font-weight: 700;
        letter-spacing: -0.19px;
        white-space: nowrap;
    }
    .fortisbar .item-name, .fortisbar .item-info, .fortisbar .item-cost{
        color: #FFFFFF;
    }
    .item-info{
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 400;
        letter-spacing: -0.13px;
        margin-top: 0.2vw;
    }
    .left{
        width: 60%;
        padding-left: 0.68vw;
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
        width: 3.59vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .item-cost{
        font-family: "Century Gothic";
        font-size: 0.83vw;
        font-weight: 700;
        position: absolute;
        bottom: 0.9vw;
        left: 50%;
        transform: translateX(-50%)
    }
    .escape{
        position: absolute;
        bottom: 2vw;
        right: 2vw;
        width: 5.94vw;
        height: 2.19vw;
    }
/* ползунок */
    .body::-webkit-scrollbar {
        width: 0.52vw!important;
    }
    .body::-webkit-scrollbar-track{
        border-radius: 0.26vw;
    }
    .body::-webkit-scrollbar-thumb{
        border-radius: 0.26vw;
    }
 /* .... */
    .fortisbar .body::-webkit-scrollbar-track{
        background-color: #0B5598;
    }
    .fortisbar .body::-webkit-scrollbar-thumb{
        background-color: #ffffff;
    }

    @media (max-aspect-ratio: 4/3) {
        .store .main{
            position: absolute;
            top: 50%;
            left: 4vw;
            transform: translateY(-50%)
        }
    }
    
</style>
    