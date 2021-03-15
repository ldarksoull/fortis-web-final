<template>
    <div class="wrapper">
        <div class="water">
            <div class="base-layer">
                <div class="wave" :class="{ triggered: isTriggered }"></div>
                <div class="fish" :class="{ triggered: isTriggered }"></div>
                <div class="poplavok" :class="{ triggered: isTriggered }"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isTriggered: false,
            interval: false,
            bellSound: new Audio("/audio/bell-sound.mp3"),
        };
    },
    methods: {
        exit() {
            mp.trigger("cCloseCef");
            mp.trigger("cRenderChangeDisableKey", "[200]", false);
            mp.trigger("cMisc-CallServerEvent", "sFishingEnd");
        },
        onKeyUp(e) {
            /*ESC*/
            if (e.keyCode === 27) {
                storage.addNotification({ text: "Рыбалка окончена", theme: "info" });
                this.exit();
            }
            /*E*/
            if (e.keyCode === 69 && this.isTriggered) {
                storage.setPage("fishingGame");
                storage.setHud(false);
                mp.trigger("cRenderChangeDisableKey", "[200]", false);
                mp.trigger("cMisc-CallServerEvent", "sPlayer-setAnimation", "fishingCatch");
            }
        },
        getRandomInt(min = 0, max = 100) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
    },
    created() {
        document.addEventListener("keyup", this.onKeyUp);
        this.interval = setInterval(() => {
            if (this.isTriggered) {
                this.isTriggered = false;
                mp.trigger("cMisc-CallServerEvent", "sFishingRemoveBait");
               storage.addNotification({ text: "Рыба сорвалась", theme: "info" });
                this.exit();
                return;
            }
            if (this.getRandomInt() <= 30) {
                this.isTriggered = true;
                this.bellSound.play();
                storage.addNotification({ text: 'Нажмите "Е" для подсечки', theme: "info" });
            }
        }, 5000);
    },
    beforeDestroy() {
        document.removeEventListener("keyup", this.onKeyUp);
        clearInterval(this.interval);
    },
};
</script>
<style lang="scss" scoped>
.wrapper {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    background: #000;
}
.base-layer {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    background: url("/img/fishing/water.png") no-repeat;
    background-size: contain;
    width: 24.22vw; //465px;
    height: 15.73vw; //302px;
    overflow: hidden;
}
.wave {
    position: absolute;
    bottom: 0;
    left: 0;
    background: url("/img/fishing/wave.png") no-repeat;
    background-size: contain;
    width: 100%;
    height: 9.43vw; //181px;
    z-index: 2;
}
.fish {
    position: absolute;
    right: 10%;
    top: 48%;
    width: 7vw; 
    height: 5vw; 
    background: url("/img/fishing/fish.png") no-repeat;
    background-size: cover;
    z-index: 1;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-duration: 2s;
    animation-fill-mode: both;
    animation-direction: alternate;
    transform-origin: center center;
    animation-timing-function: ease-in-out;
    transition: 0.2s linear;
    animation-name: fish1;
    &.triggered {
        right: 40%;
        top: 52%;
        animation-name: fish;
        animation-duration: 1s;
        animation-timing-function: ease-in-out;
        z-index: 4;
    }
}
.poplavok {
    position: absolute;
    left: 23%;
    top: 35%;
    width: 4.17vw; //80px;
    height: 6.98vw; //134px;
    background: url("/img/fishing/kruk.png") no-repeat;
    background-size: cover;
    z-index: 3;
    animation-fill-mode: both;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-duration: 1s;
    animation-name: wave1;
    &::before{
        content: "";
        width: 0.26vw; //5px;
        height: 6.51vw; //125px;
        background: #fff;
        position: absolute;
        top: 17%;
        left: 60%;
        transition: 0.2s;
        transform-origin: bottom center;
        transform: translateY(-100%);
        animation-fill-mode: both;
        animation-direction: alternate;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        animation-duration: 1s;
    }
    &::after {
        content: "";
        width: 4.69vw; //90px;
        height: 3.13vw; //60px;
        position: absolute;
        background: url("/img/fishing/warm.png") no-repeat;
        background-size: contain;
        left: 52%;
        top: 58%;
    }
    &.triggered {
        animation-name: wave;
        &::before{
            animation-name: leska;
        }
        &::after{
            display: none;
        }
    }
}
@keyframes wave {
    0% {
        transform: translate(-3.5%, -15%) rotate(-10deg);
    }
    100% {
        transform: translate(0, -0%);
    }
}
@keyframes wave1 {
    0% {
        transform: translate(0, -2%);
    }
    100% {
        transform: translate(0, 0%);
    }
}
@keyframes fish {
    0% {
        transform: translate(-2.5%, -15%) rotate(20deg);
    }
    100% {
        transform: translate(1%, 1%) rotate(10deg);
    }
}
@keyframes fish1 {
    0% {
        transform: translate(0, 10%) rotate(0deg);
    }
    100% {
        transform: translate(5%, 0) rotate(-10deg);
    }
}
@keyframes leska {
    0% {
        transform: translateY(-100%) rotate(0);
        height: 5.47vw; //105px;
    }
    100% {
        transform: translateY(-100%) rotate(-20deg);
        height: 6.72vw; //129px;
    }
}

</style>
