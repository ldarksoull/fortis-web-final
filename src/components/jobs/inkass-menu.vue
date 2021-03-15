<template>
    <div class="wrapper">
        <div class="taxi-menu">
            <div class="header"></div>
            <div class="body">
                <div class="info">Банки нуждается в инкассаторах. Ваш заработок будет зависеть от количества посещенных банкоматов.</div>
                <div class="action">
                    <div class="btn" @click="startWork">Устроиться на работу</div>
                    <div class="btn" @click="endWork">Уволиться с работы</div>
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
        startWork() {
            mp.trigger("cMisc-CallServerEvent", "sCashCollector-StartWork");
            this.exit();
        },
        endWork() {
            mp.trigger("cMisc-CallServerEvent", "sCashCollector-EndWork");
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
};
</script>
<style scoped>
.taxi-menu {
    position: absolute;
    left: 2vw;
    top: 3vw;
    box-shadow: 5px 7px 18px rgba(0, 0, 0, 0.22);
    background-color: rgba(0, 42, 78, 0.897);
    border-radius: 0.26vw;
    width: 21.46vw;
}
.header {
    height: 15.26vw;
    background: url("/img/inkass-logo.png");
    background-size: cover;
}
.info {
    color: rgb(255, 255, 255);
    font-family: "Century Gothic";
    font-size: 0.94vw;
    font-weight: 400;
    line-height: 1.87vw;
    background-color: rgb(17, 52, 91);
    padding: 1.2vw;
    margin: 0.52vw 0;
}
.btn {
    background: transparent;
    height: 4.17vw;
    display: flex;
    align-items: center;
    padding-left: 1.61vw;
    color: rgb(244, 244, 244);
    font-family: "Century Gothic";
    font-size: 0.94vw;
    font-weight: 400;
    letter-spacing: 0.6px;
}
.btn:last-child {
    border-bottom-right-radius: 0.26vw;
    border-bottom-left-radius: 0.26vw;
}
.btn:hover {
    background-color: rgb(17, 52, 91);
}
</style>
