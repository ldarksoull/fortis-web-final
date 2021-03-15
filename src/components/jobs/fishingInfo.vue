<template>
    <div class="wrapper">
        <div class="base">
            <div class="header">
                <div class="white-circle f-rod"><img src="/img/stores/fishing-rod1.png" alt="" /></div>
                <h1 class="title">Как ловить рыбу?</h1>
                <div class="close-button" @click="exit()"></div>
            </div>
            <div class="main">
                <div class="col steps">
                    <div class="steps-item">
                        <div class="steps-item-left">
                            <div class="steps-number">1</div>
                        </div>
                        <div class="steps-item-content">
                            <div class="steps-text">
                                Купить снасти и приехать к <br />
                                месту для ловли.
                            </div>
                        </div>
                        <div class="steps-blip-help steps-text">- на карте</div>
                    </div>
                    <div class="steps-item">
                        <div class="steps-item-left">
                            <div class="steps-number">2</div>
                        </div>
                        <div class="steps-item-content">
                            <div class="steps-text">Перетащить наживку на удочку, правой кнопкой мыши нажать на необходимые снасти и использовать.</div>
                        </div>
                    </div>
                    <div class="steps-item">
                        <div class="steps-item-left">
                            <div class="steps-number">3</div>
                        </div>
                        <div class="steps-item-content">
                            <div class="steps-text">Успешно завершить мини-игру, выловив рыбу.</div>
                        </div>
                    </div>
                    <div class="step4">Чтобы прекратить ловлю рыбы - нажмите ESC</div>
                </div>
                <div class="col hints">
                    <div class="hints-item">
                        <div class="hints-item-left">
                            <div class="steps-number"><div class="hint1">!</div></div>
                        </div>
                        <div class="steps-text">В начале вам доступны лишь <span class="bold"> снасти новичка</span>, чтобы уметь пользоваться другими - увеличивайте свой опыт ловли</div>
                    </div>
                    <div class="hints-item">
                        <div class="hints-item-left">
                            <div class="steps-number img3"></div>
                        </div>
                        <div class="footer-item-text">
                            По достижению 100% опыта рыболова, становится доступна ловля на спиннинг. Для неё необходим сам спиннинг, блесна, лодка, эхолот и карты памяти для него
                        </div>
                    </div>
                    <div class="hints-item">
                        <div class="hints-item-left">
                            <div class="steps-number img1"></div>
                        </div>
                        <div class="hints-text">Вы забросили удочку, ожидайте поклевки</div>
                    </div>
                    <div class="hints-item">
                        <div class="hints-item-left">
                            <div class="steps-number img2"></div>
                        </div>
                        <div class="hints-text">
                            Рыба клюнула, нажмите <span class="bold"> E</span><br />
                            для подсечки
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="footer-col">
                    <div class="footer-item">
                        <div class="footer-item-icon">
                            <div class="white-circle">
                                <img src="/img/fishing/snasti.png" alt="" />
                            </div>
                        </div>
                        <div class="footer-item-text">У каждого вида снастей есть своя прочность, чем лучше снасть - тем она прочнее</div>
                    </div>
                    <div class="footer-item">
                        <div class="footer-item-icon">
                            <div class="white-circle">
                                <img src="/img/fishing/ice-fishing.png" alt="" />
                            </div>
                        </div>
                        <div class="footer-item-text">С каждой пойманной рыбой вы увеличиваете опыт рыболова</div>
                    </div>
                </div>
                <div class="footer-col">
                    <div class="footer-item">
                        <div class="footer-item-icon">
                            <div class="white-circle">
                                <img src="/img/fishing/clever.png" alt="" />
                            </div>
                        </div>
                        <div class="footer-item-text">Чем лучше снасть - тем выше шанс поймать рыбу дороже</div>
                    </div>
                    <div class="footer-item">
                        <div class="footer-item-icon">
                            <div class="white-circle">
                                <img src="/img/fishing/gold-fish.png" alt="" />
                            </div>
                        </div>
                        <div class="footer-item-text">
                            Есть минимальный шанс поймать <span class="bold"> золотую рыбку</span> и получить <span class="bold"> ценную награду</span>. Если вы её поймали - ищите
                            <span class="bold"> George</span> на карте для получения награды.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods: {
        exit() {
            storage.setPage("storeMenu");
        },
        onKeyDown(e) {
            if (e.keyCode === 27) {
                this.exit();
            }
        },
    },
    created() {
        document.addEventListener("keyup", this.onKeyDown);
    },
    beforeDestroy() {
        document.removeEventListener("keyup", this.onKeyDown);
    },
};
</script>
<style lang="scss" scoped>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}
.base {
    width: 77.5vw; //1488px;
    background: url("/img/stores/fishMarket-bg.png"), radial-gradient(50% 50% at 50% 50%, rgba(142, 185, 219, 0.5) 0%, rgba(170, 206, 235, 0) 100%), #19619a;
    border-radius: 0.52vw; //10px;
    background-size: cover;
    padding: 1.25vw 2.29vw; //24px 44px;
    position: relative;
    @media (min-aspect-ratio: 16/9) {
        transform: scale(0.75);
    }
}
.header {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 0.63vw; //12px;
}
.white-circle {
    width: 4.17vw; //80px;
    height: 4.17vw; //80px;
    border-radius: 50%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 2.6vw; //50px;
        height: 2.6vw; //50px;
    }
}
.f-rod {
    position: absolute;
    left: 2.71vw; //52px;
    top: 1.46vw; //28px;
}
.close-button {
    width: 2.29vw; //44px;
    height: 2.29vw; //44px;
    position: absolute;
    right: 2.71vw; //52px;
    display: flex;
    justify-content: center;
    align-items: center;
    &::before,
    &::after {
        width: 0.42vw; //8px;
        height: 100%;
        background: #fff;
        content: "";
        border-radius: 0.52vw; //10px;
    }
    &::before {
        transform: translateX(50%) rotate(45deg);
    }
    &::after {
        transform: translateX(-50%) rotate(-45deg);
    }
}
.title {
    font-family: "Century Gothic";
    font-weight: bold;
    font-size: 2.5vw; //48px;
    color: #ffffff;
    text-shadow: 0px 0.21vw 0.21vw rgba(0, 0, 0, 0.25);
}
.main {
    display: flex;
    justify-content: space-between;
    margin-top: 1.77vw; //34px;
}
.col {
    width: 35vw; //672px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.steps {
    height: 28.13vw; //540px;
    position: relative;
}
.steps-item {
    position: relative;
    display: flex;
    width: 100%;
    height: 8.8vw; //169px;
    background: radial-gradient(50% 50% at 50% 50%, rgba(38, 119, 183, 0.5) 0%, rgba(44, 93, 169, 0.315104) 30.21%, rgba(66, 84, 228, 0) 100%), #4c96d0;
    border-radius: 0.52vw; //10px;
    padding-right: 1.46vw; //28px;
}
.step4 {
    position: absolute;
    bottom: -2.08vw; //-40px;
    font-family: "Century Gothic";
    font-weight: bold;
    font-size: 1.25vw; //24px;
    line-height: 1.51vw; //29px;
    color: #ffffff;
}
.steps-item-left {
    min-width: 8.96vw; //172px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.steps-number {
    width: 5.21vw; //100px;
    height: 5.21vw; //100px;
    border-radius: 50%;
    background: #fff;
    font-family: "Century Gothic";
    font-weight: bold;
    font-size: 2.5vw; //48px;
    text-align: center;
    color: #19619a;
    display: flex;
    justify-content: center;
    align-items: center;
}
.steps-item-content {
    padding: 1.82vw 0; //35px 0;
}
.steps-text,
.hints-text {
    color: #ffffff;
    text-shadow: 0px 0.21vw 0.21vw rgba(0, 0, 0, 0.25);
    font-family: "Century Gothic";
}
.steps-text {
    font-size: 1.25vw; //24px;
    line-height: 1.51vw; //29px;
}
.hints-text {
    font-size: 1.67vw; //32px;
    line-height: 2.03vw; //39px;
    padding: 0.52vw 0; //10px 0;
}
.steps-blip-help {
    position: absolute;
    font-size: 1.46vw; //28px;
    right: 1.82vw; //35px;
    bottom: 1.82vw; //35px;
    &::before {
        content: "";
        width: 1.56vw; //30px;
        height: 1.56vw; //30px;
        background: url("/img/fishing/blip-fishing.png");
        background-repeat: no-repeat;
        background-size: contain;
        display: block;
        position: absolute;
        left: -1.82vw; //35px;
        top: 10%;
    }
}
.hints {
    background: radial-gradient(50% 50% at 50% 50%, rgba(142, 185, 219, 0.2) 0%, rgba(120, 186, 237, 0) 100%), #1b6198;
    border-radius: 0.52vw; //10px;
    padding: 1.35vw 0; //26px 0;
    padding-left: 1.77vw; //34px;
    padding-right: 0.5vw;
}
.hints-item {
    display: flex;
}
.hints-item-left {
    margin-right: 1.77vw; //34px;
}
.bold {
    font-weight: bold;
}
.hint1 {
    font-size: 3.33vw; // 64px;
    color: #19619a;
}
.stop {
    width: 3.28vw; //63px;
    height: 0.83vw; //16px;
    background: #19619a;
}
.img1 {
    background-image: url("/img/fishing/poplavok.png");
    background-repeat: no-repeat;
    background-size: cover;
}
.img2 {
    background-image: url("/img/fishing/poplavok2.png");
    background-repeat: no-repeat;
    background-size: cover;
}
.img3 {
    background-image: url("/img/fishing/spinning.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
}
.footer {
    margin-top: 2.81vw; //54px;
    width: 100%;
    height: 10.36vw; //199px;
    background: radial-gradient(50% 50% at 50% 50%, rgba(38, 119, 183, 0.5) 0%, rgba(44, 93, 169, 0.315104) 30.21%, rgba(66, 84, 228, 0) 100%), #4c96d0;
    border-radius: 0.52vw; //10px;
    display: flex;
    padding: 0.68vw 1.35vw; //13px 26px;
}
.footer-col {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &:first-child {
        margin-right: 1.56vw; //30px;
    }
}
.footer-item {
    display: flex;
    align-items: center;
    &-icon {
        margin-right: 1.35vw; //26px;
    }
    &-text {
        font-family: "Century Gothic";
        font-size: 1.04vw; //20px;
        line-height: 1.3vw; //25px;
        color: #ffffff;
        text-shadow: 0px 0.21vw 0.21vw rgba(0, 0, 0, 0.25);
    }
}
img {
    max-width: 100%;
}
</style>
