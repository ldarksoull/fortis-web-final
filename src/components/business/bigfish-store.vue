<template>
    <div class="wrapper">
        <div class="store bigfish">
            <div class="main">
                <div class="header">
                    <div class="store-logo bigfish-logo"><img src="/img/stores/bigfish.png" alt=""></div>
                </div>
                <div class="body">
                    <div class="list">
                        <div class="row">
                            <div class="item">
                                <div class="left">
                                    <div class="item-name">Снасти новичка</div>
                                    <div class="item-info">Для новеньких рыболовов</div>
                                </div>
                                <div class="right">
                                    <div class="item-icon"><img src="/img/stores/fishing-rod1.png" alt=""></div>
                                    <div class="item-cost">20$</div>
                                </div>
                                <div class="btn">Купить</div>
                            </div>
                            <div class="item">
                                <div class="left">
                                    <div class="item-name">Снасти бывалого</div>
                                    <div class="item-info">Необходимо 25% опыта рыболова</div>
                                </div>
                                <div class="right">
                                    <div class="item-icon"><img src="/img/stores/fishing-rod2.png" alt=""></div>
                                    <div class="item-cost">20$</div>
                                </div>
                                <div class="btn">Купить</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="item">
                                <div class="left">
                                    <div class="item-name">Снасти опытного</div>
                                    <div class="item-info">Необходимо 50% опыта рыболова</div>
                                </div>
                                <div class="right">
                                    <div class="item-icon"><img src="/img/stores/fishing-rod3.png" alt=""></div>
                                    <div class="item-cost">20$</div>
                                </div>
                                <div class="btn">Купить</div>
                            </div>
                            <div class="item">
                                <div class="left">
                                    <div class="item-name">Снасти профи</div>
                                    <div class="item-info">Необходимо 100% опыта рыболова</div>
                                </div>
                                <div class="right">
                                    <div class="item-icon"><img src="/img/stores/fishing-rod4.png" alt=""></div>
                                    <div class="item-cost">20$</div>
                                </div>
                                <div class="btn">Купить</div>
                            </div>
                        </div>
                        <!-- <div class="row">
                            <div class="item">
                                <div class="left">
                                    <div class="item-name">Эхолот</div>
                                    <div class="item-info">Для рыбалки</div>
                                </div>
                                <div class="right">
                                    <div class="item-icon"><img src="/img/stores/echolot.png" alt=""></div>
                                    <div class="item-cost">20$</div>
                                </div>
                                <div class="btn">Купить</div>
                            </div>
                        </div> -->
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
    .bigfish .main{
        background-color: rgba(70, 130, 208, 0.95);
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
        height: 78%;
    }
    .bigfish-logo{
        width: 9.74vw;
        height: 7.55vw;
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
    .bigfish .item{
        background-color: #ffffff;
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
        font-family: "Century Gothic";
        font-size: 0.78vw;
        font-weight: 400;
        letter-spacing: -0.15px;
        transition: 0.3s;
    }
    .bigfish .item .btn{
        box-shadow: 0 0.21vw 0.42vw 0.26vw rgba(0, 0, 0, 0.06);
        background-color: #335292;
        color: #ffffff;
    }
    .bigfish .item .btn:hover{
        background-color: #ffffff;
        color: #335292;
    }
    .item-name{
        font-family: "Century Gothic";
        font-size: 0.99vw;
        font-weight: 700;
        letter-spacing: -0.19px;
        white-space: nowrap;
    }
    .bigfish .item-name, .bigfish .item-info, .bigfish .item-cost{
        color: #335292;
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
    .bigfish .body::-webkit-scrollbar-track{
        background-color: #335292;
    }
    .bigfish .body::-webkit-scrollbar-thumb{
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
    