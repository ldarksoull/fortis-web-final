<template>
    <div class="wrapper">
        <div class="card-wrapper">
            <div class="card">
                <div class="stamp" v-if="registration"></div>
                <div class="gerb"></div>
                <div class="card-number">{{ documentData.passportId }}</div>
                <div class="card-header">SAN ANDREAS STATE FORTIS</div>
                <div class="card-body">
                    <div class="avatar-wrapper">
                        <div class="avatar-block">
                            <div class="avatar-image"></div>
                        </div>
                    </div>
                    <div class="card-data">
                        <div class="col">
                            <div class="data-list">
                                <div class="data-item">
                                    <div class="item-name">Name</div>
                                    <div class="item-data">{{ documentData.n }}</div>
                                </div>
                                <div class="data-item">
                                    <div class="item-name">Surname</div>
                                    <div class="item-data">{{ documentData.f }}</div>
                                </div>
                                <div class="data-item">
                                    <div class="item-name">Nationality</div>
                                    <div class="item-data">American</div>
                                </div>
                                <div class="data-item">
                                    <div class="item-name">Date of Birth</div>
                                    <div class="item-data">{{ fixBirthDate(documentData.dateOfBirth) }}</div>
                                </div>
                                <div class="data-item">
                                    <div class="item-name">Place of work</div>
                                    <div class="item-data">{{ getPlaceOfWork() }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="data-list">
                                <div class="data-item">
                                    <div class="item-name">Date of issue</div>
                                    <div class="item-data">{{ documentData.creationDate | formatDate("date") }}</div>
                                </div>
                                <div class="data-item">
                                    <div class="item-name">Expiration date</div>
                                    <div class="item-data">24.12.2042</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="row">
                        <span style="margin-right: 0.4vw">P</span>
                        <span>&#60;</span>
                        <span class="footer-data">{{ documentData.n }}</span>
                        <span>&#60;</span><span>&#60;</span>
                        <span class="footer-data">{{ documentData.f }}</span>
                        <span>
                            &#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;&#60;
                        </span>
                    </div>
                    <div class="row">
                        <div class="footer-number">
                            {{ documentData.passportId }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            govFactionId: [11, 23, 24, 25, 26, 28, 29],
        };
    },
    computed: {
        ...mapGetters({
            documentData: "getShowDocument",
            registration: "getRegistration",
        }),
    },
    methods: {
        fixBirthDate: function(birth) {
            const day = birth.slice(0, 2);
            const month = birth.slice(2, 4);
            const year = birth.slice(4);
            return `${day}.${month}.${year}`;
        },
        exit() {
            mp.trigger("cPlayerStopWatchDocs", this.documentData.id, "passport");
            mp.trigger("cSetPage", "none");
        },
        getPlaceOfWork() {
            if (this.govFactionId.includes(this.documentData.factionID)) {
                return this.documentData.factionTitle;
            } else if (this.documentData.job) {
                return this.documentData.job;
            } else {
                return "None";
            }
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
.card-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.card {
    width: 42.45vw;
    height: 22.5vw;
    background: rgb(197, 197, 197);
    border-radius: 0.6vw;
    position: relative;
    overflow: hidden;
    background: #fff url("/img/id-card/bg1.png") no-repeat;
    background-size: cover;
}
.card-header {
    color: #1065b2;
    font-family: "NewYorkNineteenSixty";
    font-size: 1.41vw;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.1px;
    margin: 0.8vw 0;
    text-align: right;
    padding-right: 2.55vw;
}
.card-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    background: #1065b2;
    height: 3.85vw;
    width: 100%;
    color: #ffffff;
    font-family: "ParisNineteenSixty";
    font-size: 1.35vw;
    padding: 0.2vw 0.52vw;
    .row {
        display: flex;
        max-width: 100%;
        overflow: hidden;
    }
}
.footer-data {
    margin: 0 1.04vw;
}
.card-body {
    display: flex;
}
.avatar-wrapper {
    margin-left: 2vw;
}
.avatar-block {
    position: relative;
    z-index: 2;
    width: 12.92vw;
    height: 12.92vw;
    border: 1px solid rgba(16, 101, 178, 0.32);
    background-color: #fefefe;
    border-radius: 0.52vw;
    padding: 1.77vw 2.45vw 0.99vw;
}
.avatar-image {
    background: url("/img/id-card/avatar.png") no-repeat;
    width: 100%;
    height: 100%;
    background-size: contain;
}
.item-name,
.item-data {
    color: #292929;
    font-size: 0.99vw;
    line-height: 0.99vw;
}
.item-name {
    font-family: "ParisNineteenSixty";
}
.item-data {
    font-family: "NewYorkNineteenSixty";
}
.card-data {
    display: flex;
    padding-top: 0.52vw;
    padding-left: 4.58vw;
}
.data-item {
    margin-bottom: 0.52vw;
}
.data-list {
    width: 8.85vw;
}
.card-number {
    position: absolute;
    color: #292929;
    font-family: "ParisNineteenSixty";
    font-size: 1.82vw;
    font-weight: 400;
    transform: rotate(90deg);
    transform-origin: left top;
    right: -7.81vw;
    top: 6vw;
}
.gerb {
    position: absolute;
    top: 1vw;
    left: 10.15vw;
    width: 8.54vw;
    height: 8.54vw;
    background: url("/img/id-card/us-vector-state-8.png");
    background-size: contain;
    z-index: 1;
}
.stamp{
    position: absolute;
    right: 2vw;
    bottom: 3.6vw;
    width: 12vw;
    height: 12vw;
    background: url('/img/stamp.png') no-repeat;
    background-size: contain;
    z-index: 999;
}
</style>
