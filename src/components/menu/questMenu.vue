<template>
    <div class="wrapper flex-center">
        <div class="base">
            <div class="close" @click="exit()"></div>
            <h1 class="title">Квесты</h1>
            <div class="blocks">
                <div class="block left">
                    <div class="block-inner">
                        <section class="quest-section">
                            <div class="quest-title">{{ selectQuest.title }}</div>
                            <div class="quest-text quest-main-text" v-if="selectQuest.description">{{ selectQuest.description }}</div>
                        </section>
                        <section class="quest-section" v-if="selectQuest.reward.length">
                            <div class="quest-title">Награда</div>
                            <div class="quest-reward-item" v-for="reward in selectQuest.reward">
                                <div class="quest-reward-icon">
                                    <img :src="getIconPath(reward.icon)" alt="" />
                                </div>
                                <div class="quest-text bold">{{ reward.title }}</div>
                            </div>
                        </section>
                        <section class="quest-section">
                            <div class="quest-title">Этапы прохождения</div>
                            <div class="quest-steps">
                                <div class="quest-steps-item bold" v-for="step in selectQuest.steps" :class="{ dark: step.complete }">
                                    <div class="quest-check" :class="{ complete: step.complete }"></div>
                                    <div class="quest-text bold">{{ step.title }}</div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                <div class="block right">
                    <div class="block-inner">
                        <div class="quest-list">
                            <div class="quest-list-item" v-for="(quest, index) in questData" @click="selectQuestIndex = index" :class="{ active: selectQuestIndex === index }">
                                <div class="quest-list-item__title">{{ quest.title }}</div>
                                <div v-if="quest.icon" class="quest-list-item__icon">
                                    <img :src="getIconPath(quest.icon)" alt="" />
                                </div>
                            </div>
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
            selectQuestIndex: 0,
        };
    },
    computed: {
        ...mapGetters({
            questData: "getQuestData",
        }),
        selectQuest: function() {
            return this.questData[this.selectQuestIndex];
        },
    },
    methods: {
        exit() {
            mp.trigger("cCloseCef");
        },
        onKeyUp(e) {
            if (e.keyCode === 27) {
                this.exit();
            }
        },
        getIconPath(icon) {
            return "/img/quest-icons/" + icon + ".png";
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
<style lang="scss" scoped>
.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.base {
    width: 875px;
    background: linear-gradient(180deg, rgba(64, 141, 201, 0.5) 0%, rgba(23, 98, 156, 0) 100%), #1061a0;
    border-radius: 20px;
    position: relative;
    padding: 0 30px 25px 30px;
    @media (max-width: 1152px) {
        transform: scale(0.75);
    }
}
.close {
    position: absolute;
    right: 30px;
    top: 25px;
    width: 20px;
    height: 20px;
    background: url("/img/close-white-20px.png") no-repeat;
    background-size: cover;
}
.title {
    padding: 30px 0;
    font-family: "Century Gothic Bold";
    font-size: 33px;
    color: #ffffff;
    text-align: center;
}
.blocks {
    height: 403px;
    display: flex;
    justify-content: space-between;
}
.block {
    background: rgba(8, 45, 101, 0.5);
    border-radius: 10px;
    height: 100%;
    width: 50%;
}
.block-inner {
    overflow-y: auto;
    height: 100%;
    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%), #1081da;
        border-radius: 50px;
    }
    &::-webkit-scrollbar-track {
        background: #ffffff;
        border-radius: 50px;
    }
}
.left {
    padding: 28px 10px 20px 28px;
    margin-right: 20px;
}
.right {
    padding: 28px 10px;
    .block-inner {
        padding: 0 15px;
    }
}
.quest-title {
    font-family: "Century Gothic Bold";
    font-size: 18px;
    color: #fffefe;
    margin-bottom: 10px;
}
.quest-main-text {
    line-height: 20px;
}
.quest-text {
    font-family: "Century Gothic";
    font-size: 14px;
    color: #fffefe;
}
.quest-section {
    margin-bottom: 20px;
    padding-right: 14px;
}
.quest-reward-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
.quest-reward-icon {
    display: flex;
    align-items: center;
    min-width: 37px;
    width: 37px;
    img {
        width: 1.5vw;
        background-size: cover;
    }
}
.quest-list-item__icon {
    img {
        background-size: cover;
        width: 3vw;
    }
}
.quest-steps-item {
    margin-bottom: 10px;
    display: flex;
    align-items: flex-start;
    .quest-text {
        padding-top: 2px;
    }
}
.quest-check {
    width: 22px;
    min-width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #fffefe;
    margin-right: 15px;
    &.complete {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%), #31a4ff url("/img/check.png") no-repeat center;
    }
}
.quest-list-item {
    width: 100%;
    min-height: 68px;
    background: linear-gradient(180deg, rgba(49, 164, 255, 0.8) 0%, rgba(122, 196, 254, 0) 100%), #1168ac;
    border-radius: 10px;
    margin-bottom: 25px;
    padding: 10px 15px;
    display: flex;
    gap: 10px;
    &:hover {
        background: linear-gradient(180deg, rgba(49, 164, 255, 0.4) 0%, rgba(122, 196, 254, 0) 100%), #1168ac;
    }
    &:last-child {
        margin-bottom: 0;
    }
    &__title {
        width: 85%;
        font-family: "Century Gothic Bold";
        font-size: 16px;
        line-height: 20px;
        color: #ffffff;
    }
    &__icon {
        width: 15%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.bold {
    font-family: "Century Gothic Bold";
}
.active {
    background: linear-gradient(180deg, rgba(49, 164, 255, 0.4) 0%, rgba(122, 196, 254, 0) 100%), #1168ac;
}
.dark {
    opacity: 0.5;
}
</style>
