<template>
    <div class="wrapper">
        <div class="container">
            <div class="info">
                <span>Удерживайте ПРОБЕЛ чтобы рыба была в светлой зоне</span>
            </div>
            <div class="game">
                <div class="fish" :style="style"><img src="/img/fishing/fishonkruk.png" alt="" /></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            move: 35,
            moveMax: 70,
            moveMin: 0,
            downStep: 1,
            timers: {
                down: false,
                result: false,
                changeSpeed1: false,
                changeSpeed2: false,
                moveUp: false,
            },
            moveUpTrigger: false,
        };
    },
    computed: {
        style() {
            return {
                bottom: this.move + "%",
            };
        },
    },
    methods: {
        checkResult() {
            clearInterval(this.timers.down);
            if (this.move > 22 && this.move < 46) {
                mp.trigger("cMisc-CallServerEvent", "sFishingCatched");
            }
            this.exit();
        },
        getRandomInt(min = 0, max = 100) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        onKeyDown(e) {
            /*space*/
            if (e.repeat) return;
            if (e.keyCode === 32) {
                this.moveUpTrigger = true;
            }
        },
        onKeyUp(e) {
            /*space*/
            if (e.keyCode === 32) {
                this.moveUpTrigger = false;
            }
        },
        moveDown() {
            if (this.moveUpTrigger) return;
            if (this.move > this.moveMin) {
                this.move -= this.downStep;
            }
        },
        checkPos() {
            if (this.move < 22 || this.move > 46) {
                storage.addNotification({ text: "Рыба сорвалась", theme: "error" });
                mp.trigger("cMisc-CallServerEvent", "sFishingRemoveBait");
                this.exit();
            }
        },
        exit() {
            mp.trigger("cMisc-CallServerEvent", "sFishingEnd");
            mp.trigger("cCloseCef");
        },
    },
    created() {
        this.timers.down = setInterval(() => {
            this.moveDown();
            this.checkPos();
        }, 100);
        this.timers.result = setTimeout(() => {
            this.checkResult();
        }, 10000);
        this.timers.changeSpeed1 = setTimeout(() => {
            this.downStep = this.getRandomInt(1, 3);
        }, 3000);
        this.timers.changeSpeed2 = setTimeout(() => {
            this.downStep = this.getRandomInt(1, 3);
        }, 7000);
        this.timers.moveUp = setInterval(() => {
            if (this.moveUpTrigger && this.move <= this.moveMax) {
                this.move += 1;
            }
        }, 50);
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);
    },
    beforeDestroy() {
        clearInterval(this.timers.down);
        clearTimeout(this.timers.result);
        clearTimeout(this.timers.changeSpeed1);
        clearTimeout(this.timers.changeSpeed2);
        clearInterval(this.timers.moveUp);
        document.removeEventListener("keydown", this.onKeyDown);
        document.removeEventListener("keyup", this.onKeyUp);
    },
};
</script>
<style lang="scss" scoped>
.wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
.game {
    position: relative;
    width: 29.17vw; //560px;
    height: 27.6vw; //530px;
    background: url("/img/fishing/fishing-game.png") no-repeat;
    background-size: contain;
    margin: 3.44vw auto 1.56vw; //66px 30px;
}
.fish {
    position: absolute;
    left: calc(50% - 8.85vw / 2);
    width: 8.85vw; //170px;
    height: 7.81vw; //150px;
    bottom: 0;
    transform-origin: center center;
    transition: 0.2s;
    img {
        max-width: 100%;
        display: block;
    }
}
.info {
    width: 71.72vw; //1377px;
    height: 5.52vw; //106px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #133563;
    border-radius: 5.21vw; //100px;
    font-family: "Century Gothic";
    font-weight: bold;
    font-size: 1.88vw; //36px;
    text-align: center;
    margin: 0 auto;
    color: #ffffff;
}
</style>
