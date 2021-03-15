<template>
    <div class="wrapper" v-bind:class="{ blackBg: blackScreen }">
        <div class="blackBgMessage" v-if="blackScreen === 'bag'">На Вас был надет мешок</div>
        <div class="blackBgMessage" v-if="blackScreen === 'trunk'">Вы находитесь в багажнике</div>
        <div class="hud">
            <div class="right-top">
                <div class="quest-info" v-if="showLastQuest && lastQuest">
                    <div class="quest-info__item">
                        <div class="quest-info__item-title">Текущий квест:</div>
                        <div class="quest-info__item-text-wrapper">
                            <div class="quest-info__item-text-quest-title">{{ lastQuest.title }}</div>
                            <div class="quest-info__item-icon">
                                <img :src="getQuestIconPath(lastQuest.icon)" alt="" />
                            </div>
                        </div>
                    </div>
                    <div class="quest-info__item">
                        <div class="quest-info__item-title">Текущий этап:</div>
                        <div class="quest-info__item-text">{{ lastQuest.currentStep }}</div>
                    </div>
                </div>
                <div class="other">
                    <div class="logo"><img src="/img/hud/logo-100px-blue.png" alt="" /></div>
                    <div class="online">
                        <img class="icon" src="/img/hud/people.png" alt="" />
                        <div class="num">{{ playersNumber }} / 1000</div>
                    </div>
                </div>
            </div>
            <div class="help" :class="{ active: showHelp }" v-if="!deathTime && fullHudShow">
                <ul class="help-list">
                    <li class="help-item">
                        <div class="name">Меню персонажа</div>
                        <div class="key">M</div>
                    </li>
                    <li class="help-item">
                        <div class="name">Телефон</div>
                        <div class="key">P</div>
                    </li>
                    <li class="help-item">
                        <div class="name">Микрофон</div>
                        <div class="key">N</div>
                    </li>
                    <li class="help-item">
                        <div class="name">Говорить в рацию</div>
                        <div class="key">CAPS<br />LOCK</div>
                    </li>
                    <li class="help-item">
                        <div class="name">Инвентарь</div>
                        <div class="key">I</div>
                    </li>
                    <li class="help-item">
                        <div class="name">Курсор</div>
                        <div class="key">Ё</div>
                    </li>
                    <li class="help-item">
                        <div class="name">Завести ТС</div>
                        <div class="key">B</div>
                    </li>
                    <li class="help-item">
                        <div class="name">Отк./зак. ТС</div>
                        <div class="key">L</div>
                    </li>
                    <li class="help-item">
                        <div class="name">Бортовой компьютер</div>
                        <div class="key">H</div>
                    </li>
                    <li class="help-item">
                        <div class="name">Фракционный планшет</div>
                        <div class="key">F2</div>
                    </li>
                    <li class="help-item">
                        <div class="name">Рабочий планшет</div>
                        <div class="key">F3</div>
                    </li>
                    <li class="help-item">
                        <div class="name">Выход из меню</div>
                        <div class="key">ESC</div>
                    </li>
                    <li class="help-item">
                        <div class="name">Сесть пассажиром</div>
                        <div class="key">G</div>
                    </li>
                    <li class="help-item">
                        <div class="name">Круиз-контроль</div>
                        <div class="key">X</div>
                    </li>
                </ul>
                <div @click="toggleHelp" class="arrow"><img src="/img/hud/arrow.png" alt="" /></div>
            </div>
            <div class="right-bottom" v-if="fullHudShow">
                <div class="speedo" v-if="vehicleData.fuelRate">
                    <div class="block">
                        <div class="icon">
                            <img v-if="vehicleData.door" src="/img/hud/door_lock.png" alt="" />
                            <img v-else src="/img/hud/door_unlock.png" alt="" />
                        </div>
                        <div class="icon">
                            <img v-if="!vehicleData.engine" src="/img/hud/engine_off.png" alt="" />
                            <img v-if="vehicleData.engine" src="/img/hud/engine_on.png" alt="" />
                        </div>
                        <div class="speed">
                            <div class="num">{{ vehicleData.speed }}</div>
                            <div class="text">км/ч</div>
                        </div>
                    </div>
                    <div class="block">
                        <div class="icon">
                            <img v-if="(vehicleData.fuelTank / 100) * 10 > vehicleData.fuel" src="/img/hud/fuel_off.png" alt="" />
                            <img v-else src="/img/hud/fuel_on.png" alt="" />
                        </div>
                        <div class="fuel-amount">{{ showFuel() }}</div>
                        <div class="odometer">{{ showKm() }}</div>
                    </div>
                </div>
                <div class="main-info">
                    <div class="mic-status"><img :src="micIconSrc" @click="micOptions = !micOptions" alt="" /></div>
                    <div class="money-status">
                        <div class="icon"><img src="/img/hud/cash.png" alt="" /></div>
                        <div class="text">$ {{ money.cash | divideNumber }}</div>
                    </div>
                    <div class="money-status">
                        <div class="icon"><img src="/img/hud/card.png" alt="" /></div>
                        <div class="text">$ {{ money.bank | divideNumber }}</div>
                    </div>
                    <div class="time">
                        <div class="time-text">{{ timeData.time.hour }}:{{ timeData.time.mins }}</div>
                        <div class="date-text">{{ timeData.date.day }}.{{ timeData.date.month }}.{{ timeData.date.year }}</div>
                    </div>

                    <div class="radio-image" @click.self="toggleRadio()" :class="{ active: radio === true }" v-if="(factionData.guid !== 0 || jobRadio) && !deathTime">
                        <div class="changeRadioVol" @click="changeRadioVolume()"></div>
                        <div class="btns-mask">
                            <div class="radio-screen-freq b">{{ freqAddZero(selectedRadioChannel) }}</div>
                            <img class="radio-screen-sound b" :src="radioSoundIcon" />
                            <div class="btn-1 b" @click="radioMenu = !radioMenu"></div>
                            <div class="btn-2 b" @click="muteRadioChannel()"></div>
                            <div class="btn-3 b" @click="connectRadioChannel('ALL')"></div>
                            <div class="btn-4 b" @click="changeRadioChannelUp()"></div>
                            <div class="btn-5 b" @click="changeRadioChannelDown()"></div>
                        </div>
                        <transition name="slideup">
                            <div class="radio" v-if="radioMenu">
                                <div class="radio-channels">
                                    <div class="title">Список каналов</div>
                                    <div class="list">
                                        <div class="item-wrapper" v-for="(item, index) in radioChannels" :key="item.freq">
                                            <div class="item" @click="showMembers(index)">
                                                <div class="text" style="width: 20%">{{ freqAddZero(item.freq) }}</div>
                                                <div class="text center">
                                                    <div class="peoples-icon-wrapper center" style="margin-right: 0.1vw">
                                                        <img src="/img/hud/peoples-icon.png" alt="" />
                                                    </div>
                                                    <div>{{ item.players.length }}</div>
                                                </div>
                                                <div class="btn" v-if="selectedRadioChannel !== item.freq" @click.stop="connectRadioChannel(item.freq, item.isJob)">Подключиться</div>
                                                <div class="btn" v-if="selectedRadioChannel === item.freq" @click.stop="disconnectRadioChannel()" style="background-color: #f30000;">Отключиться</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="footer">
                                        <div v-if="factionData.guid !== 0" class="btn" @click="createRadioChannel()">Создать канал</div>
                                    </div>
                                </div>
                                <transition name="slide">
                                    <div class="radio-users" v-if="members === true && radioChannels[membersIndex]">
                                        <div class="title center">Участники</div>
                                        <div class="list">
                                            <div class="item-wrapper" v-for="item in radioChannels[membersIndex].players" :key="item.guid">
                                                <div class="item">{{ item.name }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </transition>
                            </div>
                        </transition>
                    </div>
                </div>
                <transition name="slideup">
                    <ul class="mic-options" v-if="micOptions">
                        <li class="mic-options-item" @click="changeMic('default')" :class="{ active: currentMic === 'default' }">
                            <div class="mic-options-item-text">Разговор</div>
                            <div class="mic-options-item-icon"><img src="/img/hud/default.png" alt="" /></div>
                        </li>
                        <li class="mic-options-item" @click="changeMic('whisper')" :class="{ active: currentMic === 'whisper' }">
                            <div class="mic-options-item-text">Шепот</div>
                            <div class="mic-options-item-icon"><img src="/img/hud/whisper.png" alt="" /></div>
                        </li>
                        <li class="mic-options-item" @click="changeMic('shout')" :class="{ active: currentMic === 'shout' }">
                            <div class="mic-options-item-text">Крик</div>
                            <div class="mic-options-item-icon"><img src="/img/hud/shout.png" alt="" /></div>
                        </li>
                        <li class="mic-options-item" @click="changeMic('rupor')" :class="{ active: currentMic === 'rupor' }">
                            <div class="mic-options-item-text">Мегафон</div>
                            <div class="mic-options-item-icon"><img src="/img/hud/rupor.png" alt="" /></div>
                        </li>
                    </ul>
                </transition>
            </div>
            <div class="left-bottom" v-if="!deathTime && fullHudShow">
                <div class="needs">
                    <div class="needs-item">
                        <img src="/img/hud/food.png" alt="" />
                        <div class="needs-amount">{{ needs.food }}/100</div>
                    </div>
                    <div class="needs-item">
                        <img src="/img/hud/water.png" alt="" />
                        <div class="needs-amount">{{ needs.water }}/100</div>
                    </div>
                </div>
                <div v-if="!blackScreen" class="gps">
                    <div class="gps-item">{{ adress.street }}</div>
                    <div class="gps-item">{{ adress.district }}</div>
                </div>
            </div>
            <div class="base" v-if="factionWar.isStarted">
                <div class="header">
                    <div class="title">{{ factionWar.title }}</div>
                    <div class="timer">{{ factionWarTime }}</div>
                </div>
                <div class="teams">
                    <div class="col">
                        <div class="team-name">{{ factionWar.attackName }}</div>
                        <div class="team-score" :class="{ bold: factionWar.attackPlayers > factionWar.defensePlayers }">{{ factionWar.attackPlayers }}</div>
                    </div>
                    <div class="col">
                        <div class="team-name">{{ factionWar.defenseName }}</div>
                        <div class="team-score" :class="{ bold: factionWar.defensePlayers > factionWar.attackPlayers }">{{ factionWar.defensePlayers }}</div>
                    </div>
                </div>
            </div>
            <div class="wrapper-death" v-if="deathTimer.seconds">
                <div class="skull">
                    <img class="skullImg" src="/img/skull.png" alt="" />
                </div>
                <div class="container">
                    <div class="panel">
                        <div>Время до возрождения:</div>
                        <div>{{ deathTimer.time }}</div>
                    </div>
                </div>
            </div>
            <div class="wrapper" v-show="minigameData.isStart">
                <div class="minigame">
                    <div id="path">
                        <div id="brick"></div>
                        <div id="point" :style="'width:' + minigameData.width + 'px;left:' + minigameData.left + 'px;'"></div>
                    </div>
                    <div class="icon"></div>
                </div>
            </div>
            <div class="prisonTimer" v-if="prisonTime > 0">
                <p>Осталось сидеть: {{ prettyTimePrison }}</p>
            </div>
            <div class="cancel-animation-info" v-if="cancelAnimInfo">
                Нажмите
                <div class="marked-word">TAB</div>
                чтобы завершить анимацию
            </div>
        </div>

        <div class="help-newbie" v-if="newbieInterval">
            <div class="help-content">
                <div class="help-text">
                    <div class="help-title">Если Вам нужна помощь, нажмите М - “Помощь”</div>
                    <div class="help-subtitle">Если не нашли ответ на Ваш вопрос, пишите администрации в М - “Репорт”</div>
                </div>
                <div class="help-image">
                    <img src="/img/book.png" alt="" />
                </div>
            </div>
            <div class="progress-newbie">
                <div class="progress-fill" :style="{ width: newbieTimer + '%' }" :class="{ yellow: newbieTimer >= 40 && newbieTimer <= 75, red: newbieTimer > 75 }"></div>
            </div>
        </div>
        <div class="echolot" v-if="echolot">
            <div class="echolot-screen">
                <div class="screen-header">
                    <div class="echolot-temp">+21°</div>
                    <div class="echolot-card">
                        <div class="echolot-card__amount">{{ echolot }}</div>
                    </div>
                </div>
                <div class="screen-body">
                    <div v-if="echolotFish" class="screen-body-fish screen-body-fish-1"></div>
                    <div v-if="echolotFish" class="screen-body-fish screen-body-fish-2"></div>
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
            currentMic: "default",
            prevMic: "default",
            micOptions: false,
            micIconSrc: "/img/hud/default.png",
            showHelp: true,
            captureTimer: null,
            progress: 0,
            right: true,
            anim: null,
            prisonTimerCount: null,
            trailCounter: 0,
            deathTimer: {
                time: "",
                seconds: 0,
                timer: null,
            },
            members: false,
            membersIndex: null,
            radio: false,
            radioMenu: false,
            radioSoundIcon: "/img/hud/soundOn.png",
            radioSoundState: true,
            micStates: ["default", "whisper", "shout", "rupor"],
            keyDownRepeat: false,
            newbieTimer: 0,
            newbieInterval: null,
            newbieTimerStep: 0.16,
        };
    },
    computed: {
        ...mapGetters({
            timeData: "getDataTime",
            money: "moneyData",
            needs: "getNeeds",
            adress: "getAdress",
            blackScreen: "getBlackScreen",
            factionWar: "getCaptureData",
            deathTime: "getDeathTime",
            increaseDeathTime: "getIncreaseDeathTime",
            vehicleData: "getVehSpeedData",
            playersNumber: "getPlayersNumber",
            selectedRadioChannel: "getSelectedRadioChannel",
            factionData: "getFactionData",
            page: "page",
            fullHudShow: "getFullHudShow",
            jobRadio: "getJobRadio",
            voiceState: "getVoiceState",
            micType: "getMicType",
            chatActive: "getChatActive",
            isPlayerNewbie: "getPlayerNewbie",
            echolot: "getEcholot",
            echolotFish: "getEcholotFish",
            showLastQuest: "getShowLastQuest",
            lastQuest: "getLastQuestData",
            cancelAnimInfo: "getCancelAnimInfo",
        }),
        factionWarTime() {
            if (!this.captureTimer) {
                this.startTimerCapture();
            }
            let time = this.factionWar.time / 60;
            let minutes = parseInt(time);
            let secondes = Math.round((time - minutes) * 60);
            if (minutes < 10) minutes = "0" + minutes;
            if (secondes < 10) secondes = "0" + secondes;
            return minutes + ":" + secondes;
        },
        minigameData() {
            this.startMinigame(this.$store.getters.getMinigameData);
            return this.$store.getters.getMinigameData;
        },
        prisonTime: {
            get: function() {
                return this.$store.state.Player.prisonTime;
            },
            set: function(n) {
                return (this.$store.state.Player.prisonTime = n);
            },
        },
        prDecr: {
            get: function() {
                return this.$store.state.Player.prDecr;
            },
            set: function(n) {
                return (this.$store.state.Player.prDecr = n);
            },
        },
        prettyTimePrison() {
            if (!this.prisonTimerCount) {
                this.startPrisonTimer();
            }
            if (this.prDecr === 1) {
                this.trailCounter = 5;
                this.prDecr = 0;
            }
            let trail = "",
                trCntrX = this.trailCounter;
            if (0 < this.trailCounter) this.trailCounter--;
            if (0 < this.trailCounter) trail = " - 1";
            else if (0 < trCntrX) this.prisonTime = this.prisonTime - 60;
            let time = this.prisonTime / 60;
            let minutes = parseInt(time);
            let secondes = Math.round((time - minutes) * 60);
            if (minutes < 10) minutes = "0" + minutes;
            if (secondes < 10) secondes = "0" + secondes;
            return minutes + ":" + secondes + trail;
        },
        radioChannels() {
            let channels = this.$store.getters.getRadioChannels;
            channels.sort((a, b) => b.freq - a.freq);
            return channels;
        },
    },
    methods: {
        toggleHelp() {
            this.showHelp = !this.showHelp;
        },
        showFuel() {
            if (!this.vehicleData.fuel) return this.vehicleData.fuel;
            return this.vehicleData.fuel.toFixed(0);
        },
        showKm() {
            const km = this.vehicleData.km ? this.vehicleData.km.toFixed(1) : this.vehicleData.km;
            let repeatCount = 8 - km.length;
            if (repeatCount < 0) repeatCount = 0;
            return "0".repeat(repeatCount) + km;
        },
        startTimerCapture() {
            this.captureTimer = setInterval(() => {
                if (this.factionWar.time > 0) {
                    this.factionWar.time--;
                } else {
                    clearInterval(this.captureTimer);
                    this.captureTimer = null;
                }
            }, 1000);
        },
        startPrisonTimer() {
            this.prisonTimerCount = setInterval(() => {
                if (this.prisonTime > 0) {
                    this.prisonTime--;
                } else {
                    clearInterval(this.prisonTimerCount);
                    this.prisonTimerCount = null;
                }
            }, 1000);
        },
        startMinigame(data) {
            if (!data.isStart) return;
            const keyDownHandler = e => {
                if (e.keyCode === 69) {
                    cancelAnimationFrame(this.anim);
                    document.removeEventListener("keydown", keyDownHandler);
                    const brickLeft = parseInt(brick.style.left);
                    const pointLeft = parseInt(point.style.left);
                    const pointWidth = parseInt(point.style.width);
                    let result;
                    if (brickLeft >= pointLeft && brickLeft <= pointLeft + pointWidth) {
                        result = "win";
                    } else {
                        result = "lose";
                    }
                    mp.trigger("cMisc-CallServerEvent", "sPlayer-endMinigame", result);
                }
            };
            let autoLoseCount = 0;
            const step = () => {
                if (this.progress >= (500 - 20) / 10) {
                    this.right = false;
                    autoLoseCount++;
                    if (autoLoseCount === 2) {
                        cancelAnimationFrame(this.anim);
                        document.removeEventListener("keydown", keyDownHandler);
                        mp.trigger("cMisc-CallServerEvent", "sPlayer-endMinigame", "lose");
                        return;
                    }
                }
                if (this.progress === 0) {
                    this.right = true;
                }
                if (this.right) {
                    this.progress++;
                } else {
                    this.progress--;
                }
                brick.style.left = this.progress * 10 + "px";
                this.anim = requestAnimationFrame(step);
            };
            this.anim = requestAnimationFrame(step);
            document.addEventListener("keydown", keyDownHandler);
        },
        startTimerDeath() {
            let minutes = parseInt(this.deathTimer.seconds / 60);
            let seconds = Math.round(this.deathTimer.seconds - minutes * 60);
            if (minutes < 10) minutes = "0" + minutes;
            if (seconds < 10) seconds = "0" + seconds;
            this.deathTimer.time = minutes + ":" + seconds;
            this.deathTimer.timer = setInterval(() => {
                if (this.deathTimer.seconds > 0) {
                    this.deathTimer.seconds--;
                } else {
                    clearInterval(this.deathTimer.timer);
                    this.deathTimer.timer = null;
                }
                let minutes = parseInt(this.deathTimer.seconds / 60);
                let seconds = Math.round(this.deathTimer.seconds - minutes * 60);
                if (minutes < 10) minutes = "0" + minutes;
                if (seconds < 10) seconds = "0" + seconds;
                this.deathTimer.time = minutes + ":" + seconds;
            }, 1000);
        },
        showMembers(i) {
            if (i === this.membersIndex) {
                this.members = false;
                this.membersIndex = null;
                return;
            }
            this.members = true;
            this.membersIndex = i;
        },
        toggleRadio() {
            this.radio = !this.radio;
            this.radioMenu = false;
            this.members = false;
            this.membersIndex = null;
        },
        changeMic(type) {
            if (this.currentMic === type) return (this.micOptions = false);
            this.micIconSrc = `/img/hud/${type}.png`;
            this.micOptions = false;
            mp.trigger("cVoiceChangeMicType", type, this.currentMic);
            this.currentMic = type;
        },
        createRadioChannel() {
            mp.trigger("cMisc-CallServerEvent", "sFactionCreateRadioChannel");
        },
        freqAddZero(num) {
            return Number.isInteger(num) ? num + ".0" : num;
        },
        connectRadioChannel(freq, isJobCh) {
            if (isJobCh) return mp.trigger("cMisc-CallServerEvent", "sJobConnectRadio", freq);
            mp.trigger("cMisc-CallServerEvent", "sFactionConnectRadioChannel", freq);
        },
        disconnectRadioChannel() {
            mp.trigger("cMisc-CallServerEvent", "sFactionDisconnectRadioChannel");
        },
        muteRadioChannel() {
            this.radioSoundState = !this.radioSoundState;
            mp.trigger("cMisc-CallServerEvent", "sFactionMuteRadioChannel", this.radioSoundState);
            if (this.radioSoundState) this.radioSoundIcon = "/img/hud/soundOn.png";
            if (!this.radioSoundState) this.radioSoundIcon = "/img/hud/soundOff.png";
        },
        changeRadioChannelUp() {
            if (typeof this.selectedRadioChannel === "string") return;
            if (this.selectedRadioChannel === null) {
                const ch = this.radioChannels.find(ch => typeof ch.freq !== "string");
                if (ch) return mp.trigger("cMisc-CallServerEvent", "sFactionConnectRadioChannel", ch.freq);
            }

            let nextChannel = this.selectedRadioChannel + 0.1;
            if (!nextChannel) return storage.addNotification({ text: `Произошла ошибка (changeRadioChannelUp) (${nextChannel})`, theme: "error" });
            nextChannel = parseFloat(nextChannel.toFixed(1));
            const i = this.radioChannels.findIndex(ch => ch.freq === nextChannel);
            if (i !== -1) mp.trigger("cMisc-CallServerEvent", "sFactionConnectRadioChannel", nextChannel);
        },
        changeRadioChannelDown() {
            if (typeof this.selectedRadioChannel === "string") return;
            if (this.selectedRadioChannel === null) {
                const ch = this.radioChannels.find(ch => typeof ch.freq !== "string");
                if (ch) return mp.trigger("cMisc-CallServerEvent", "sFactionConnectRadioChannel", ch.freq);
            }

            let nextChannel = this.selectedRadioChannel - 0.1;
            if (!nextChannel) return storage.addNotification({ text: `Произошла ошибка (changeRadioChannelDown) (${nextChannel})`, theme: "error" });
            nextChannel = parseFloat(nextChannel.toFixed(1));
            const i = this.radioChannels.findIndex(ch => ch.freq === nextChannel);
            if (i !== -1) mp.trigger("cMisc-CallServerEvent", "sFactionConnectRadioChannel", nextChannel);
        },
        voiceKeyDown(e) {
            switch (this.currentMic) {
                case "default":
                    this.micIconSrc = "/img/hud/mic-active.png";
                    break;
                case "whisper":
                    this.micIconSrc = "/img/hud/mic-active.png";
                    break;
                case "shout":
                    this.micIconSrc = "/img/hud/mic-active.png";
                    break;
                case "rupor":
                    this.micIconSrc = "/img/hud/rupor-active.png";
                    break;
                case "radio":
                    this.micIconSrc = "/img/hud/racia-active.png";
                    break;
                default:
                    break;
            }
        },
        voiceKeyUp() {
            switch (this.currentMic) {
                case "default":
                    this.micIconSrc = "/img/hud/default.png";
                    break;
                case "whisper":
                    this.micIconSrc = "/img/hud/whisper.png";
                    break;
                case "shout":
                    this.micIconSrc = "/img/hud/shout.png";
                    break;
                case "rupor":
                    this.micIconSrc = "/img/hud/rupor.png";
                    break;
                case "radio":
                    this.micIconSrc = "/img/hud/radio.png";
                    break;
                default:
                    break;
            }
        },
        changeRadioVolume() {
            mp.trigger("cVoiceChangeRadioVolume");
        },
        radioKeyDown() {
            if (this.keyDownRepeat) return;
            this.keyDownRepeat = true;
        },
        radioKeyUp() {
            this.keyDownRepeat = false;
        },
        changeMicDown() {
            if (this.keyDownRepeat) return;
            let index = this.micStates.findIndex(m => m === this.currentMic);
            index++;
            if (index === this.micStates.length) index = 0;
            const mic = this.micStates[index];
            this.changeMic(mic);
        },
        changeMicUp() {
            if (this.keyDownRepeat) return;
            let index = this.micStates.findIndex(m => m === this.currentMic);
            index--;
            if (index === -1) index = this.micStates.length - 1;
            const mic = this.micStates[index];
            this.changeMic(mic);
        },
        keyDownHandlers(e) {
            if (this.page === "none") {
                if (e.keyCode === 20 && !this.chatActive) this.radioKeyDown(e);
                if (e.ctrlKey && e.keyCode == 65) e.preventDefault();
                if (e.keyCode === 102) mp.trigger("cSpectateMoveCamera", "right");
                if (e.keyCode === 100) mp.trigger("cSpectateMoveCamera", "left");
                if (e.keyCode === 104) mp.trigger("cSpectateMoveCamera", "up");
                if (e.keyCode === 98) mp.trigger("cSpectateMoveCamera", "down");
            }
        },
        keyUpHandlers(e) {
            if (this.page === "none" && !this.chatActive) {
                if (e.keyCode === 20) this.radioKeyUp();
                if (e.keyCode === 38) this.changeMicUp();
                if (e.keyCode === 40) this.changeMicDown();
                if (e.keyCode === 39) this.showHelp = true;
                if (e.keyCode === 37) this.showHelp = false;
            }
        },
        startTimerNewbie() {
            this.newbieInterval = setInterval(() => {
                this.newbieTimer += this.newbieTimerStep;
                if (this.newbieTimer >= 100) {
                    this.stopTimerNewbie();
                }
            }, 100); // 100% ширина блока с шагом 1
        },
        stopTimerNewbie() {
            clearInterval(this.newbieInterval);
            this.newbieInterval = null;
        },
        getQuestIconPath(icon) {
            return "/img/quest-icons/" + icon + ".png";
        },
    },
    watch: {
        deathTime: function(sec) {
            this.deathTimer.seconds = sec;
            if (this.deathTimer.seconds > 0) {
                clearInterval(this.deathTimer.timer);
                this.startTimerDeath();
            } else {
                clearInterval(this.deathTimer.timer);
                this.deathTimer.timer = null;
                this.deathTimer.time = "";
            }
        },
        increaseDeathTime: function(sec) {
            this.deathTimer.seconds += sec;
        },
        voiceState: function(value) {
            if (value) {
                this.voiceKeyDown();
            } else {
                this.voiceKeyUp();
            }
        },
        micType: function(value) {
            if (value) {
                this.changeMic(value);
            }
        },
        isPlayerNewbie: function(value) {
            if (value) this.startTimerNewbie();
        },
    },
    created() {
        document.addEventListener("keydown", this.keyDownHandlers);
        document.addEventListener("keyup", this.keyUpHandlers);
    },
};
</script>

<style scoped lang="scss">
li {
    list-style: none;
}
img {
    max-width: 100%;
}
::selection {
    background-color: transparent;
}
#brick {
    width: 10px;
    height: 0.99vw;
    background-color: #d94c4c;
    z-index: 2;
    position: absolute;
}
#point {
    width: 54px;
    height: 0.99vw;
    position: absolute;
    z-index: 1;
    background-color: #2e2e2e;
}
.minigame {
    display: flex;
    position: absolute;
    bottom: 5vw;
    left: 50%;
    transform: translateX(-50%);
}
#path {
    width: 33.85vw;
    height: 1.82vw;
    border: 0.42vw solid #1065b2;
    border-radius: 0.42vw;
    position: relative;
    width: 500px;
    position: relative;
}
.minigame .icon {
    width: 3.18vw;
    height: 1.82vw;
    background: url("/img/masterkeys.png") no-repeat;
    background-size: contain;
    margin-left: -0.52vw;
}
.deathTimer,
.prisonTimer {
    position: absolute;
    bottom: 12vh;
    left: 45vw;
    font-family: "Century Gothic";
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    background-color: #000;
}
/* capt/bizwar */
.base {
    background-color: rgba(0, 41, 80, 0.945);
    padding: 0.4vw;
    border-radius: 0.52vw;
    color: #fff;
    font-family: "Century Gothic";
    position: absolute;
    bottom: 20vw;
    width: 9vw;
}

.header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-bottom: 0.1vw solid #fff;
    margin-bottom: 0.8vw;
}
.title {
    margin-bottom: 0.2vw;
    font-size: 0.9vw;
    font-weight: bold;
    text-align: center;
}
.timer {
    font-size: 1vw;
    margin-bottom: 0.4vw;
}
.teams {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.col {
    margin: 0.26vw 0;
}
.team-name {
    font-size: 0.83vw;
    text-align: center;
}
.team-score {
    font-size: 1vw;
    text-align: center;
}
.bold {
    font-weight: bold;
}
/* capt/bizwar end*/
.blackBg {
    background-color: #000;
}
.blackBgMessage {
    width: 220px;
    height: 0;
    color: white;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    font-family: "Century Gothic";
    font-size: 17px;
}
.hud {
    background-size: cover;
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
}
.right-top {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
}
.quest-info {
    margin-right: 20px;
    margin-top: 15px;
    max-width: 360px;
    &__item {
        font-family: "Century Gothic Bold";
        text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
        &-text {
            font-size: 18px;
            line-height: 18px;
            color: #fffefe;
            margin: 5px 0;
            &-quest-title {
                font-size: 18px;
                line-height: 18px;
                color: #fffefe;
                margin: 5px 0;
            }
        }
        &-title {
            font-size: 18px;
            line-height: 18px;
            color: #469de1;
        }
        &-icon {
            display: flex;
            justify-content: flex-end;
            img {
                display: block;
            }
        }
    }
}
.quest-info__item-text-wrapper {
    display: flex;
}
.quest-info__item-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        background-size: cover;
        width: 30px;
    }
}
.logo {
    margin: 15px;
}
.online {
    position: absolute;
    right: 0;
    background: rgba(0, 41, 80, 0.945);
    display: flex;
    align-items: center;
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 13px;
    font-weight: 400;
    padding: 5px 10px;
    padding-right: 20px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
}
.online .icon {
    margin-left: 5px;
    margin-right: 10px;
}
.help {
    position: absolute;
    right: 10px;
    top: 22vh;
    box-shadow: 0 0 45px 4px rgba(0, 0, 0, 0.26);
    border-radius: 10px;
    padding: 10px 20px;
    padding-bottom: 0;
    background-color: rgba(0, 41, 80, 0.452);
    color: #ffffff;
    transition: 0.3s;
}
.help.active {
    transform: translateX(calc(100% + 10px));
}
.help-list {
    margin-bottom: 10px;
}
.help-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.33);
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 14px;
    margin-bottom: 5px;
    font-weight: 400;
    letter-spacing: -0.63px;
}
.help-item .key {
    font-family: "Arial";
    font-size: 16px;
    font-weight: bold;
    margin-left: 20px;
}
.help .arrow {
    background-color: rgba(0, 41, 80, 0.452);
    position: absolute;
    left: 0;
    top: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    transform: translate(-100%, -50%);
}
.help.active .arrow img {
    transform-origin: center;
    transform: rotate(180deg);
}
.right-bottom {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.speedo .icon {
    height: 25px;
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.speedo {
    border-radius: 10px;
    background-color: rgba(0, 41, 80, 0.945);
    padding: 5px;
    padding-right: 10px;
}
.speedo .block {
    display: flex;
    align-items: center;
}
.speedo .speed {
    margin-left: 10px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100px;
}
.speedo .num {
    color: #ededed;
    font-family: "Century Gothic";
    font-size: 27px;
    font-weight: 700;
    margin-right: 5px;
}
.speedo .speed .text {
    color: #ededed;
    font-size: 21px;
    font-weight: 400;
    font-family: "Century Gothic";
}
.speedo .fuel-amount {
    color: #ededed;
    font-family: "Arial";
    font-size: 15px;
    font-weight: 400;
    width: 25px;
    text-align: center;
}
.speedo .odometer {
    color: #ededed;
    font-family: "Arial";
    font-size: 13px;
    font-weight: 400;
    width: 100px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 7px;
    background-color: #045391;
    margin-left: 10px;
}
.main-info {
    display: flex;
    border-radius: 10px;
    background-color: rgba(0, 41, 80, 0.945);
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 5px 10px;
    padding-left: 15px;
    align-items: center;
}
.main-info .time .time-text {
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 24px;
    font-weight: 700;
}
.main-info .time .date-text {
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 12px;
    font-weight: 400;
}
.main-info .money-status {
    display: flex;
    align-items: center;
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 17px;
    font-weight: 400;
    margin-right: 20px;
}
.main-info .money-status .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
}
.main-info .mic-status {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    width: 2vw;
    height: 2vw;
}
.mic-options {
    position: absolute;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: rgba(0, 41, 80, 0.452);
    left: 0;
    bottom: 60px;
}
.mic-options-item {
    display: flex;
    align-items: center;
    height: 35px;
    padding: 0 10px;
}
.mic-options-item:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.mic-options-item:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
.mic-options-item:hover {
    background-color: rgba(0, 41, 80, 0.801);
}
.mic-options-item.active {
    background-color: rgba(0, 41, 80, 0.801);
}
.mic-options-item-text {
    width: 80px;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.33);
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 12px;
    font-weight: 400;
}
.mic-options-item-icon {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.mic-options .arrow {
    padding: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.left-bottom {
    position: absolute;
    bottom: 2vh;
    left: 30vh;
    @media (aspect-ratio: 5/4) {
        left: 20vw;
    }
}
.needs-item {
    width: 45px;
    height: 47px;
    border-radius: 10px;
    background-color: rgba(0, 41, 80, 0.945);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 5px;
}
.needs-amount {
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 9px;
    font-weight: 400;
}
.gps {
    margin-top: 10px;
}
.gps-item {
    color: #ffffff;
    font-family: "Myriad Pro";
    font-size: 24px;
    line-height: 36.73px;
}
.chat {
    position: absolute;
    top: 1.6vw;
    left: 1.6vw;
}
.chat-field {
    width: 700px;
    height: 181px;
    box-shadow: 5px 8px 40px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #00294e;
    background-image: linear-gradient(to top, #0a2f4d 43%, #0d2b48 51%, rgba(30, 19, 39, 0) 100%);
    opacity: 0.38;
    resize: none;
    outline: none;
    border: none;
    display: block;
    margin-bottom: 16px;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.8), 0 0 0 rgba(0, 0, 0, 0.28);
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.07px;
    padding: 15px 10px;
}
.chat-input {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: rgba(0, 42, 78, 0.945);
    border: none;
    outline: none;
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 14px;
    font-weight: 400;
    padding-left: 10px;
    margin-bottom: 10px;
}
.chat-input::placeholder {
    color: rgba(255, 255, 255, 0.466);
    font-family: "Century Gothic";
    font-size: 14px;
    font-weight: 400;
}
.chat-input-wrapper {
    position: relative;
    display: block;
    width: 507px;
    height: 35px;
    margin-bottom: 10px;
}
.chat-icon {
    display: flex;
    position: absolute;
    content: "";
    background: url("/img/hud/chat_icon.png") no-repeat;
    background-position: center 55%;
    right: 0;
    top: 0;
    z-index: 11;
    width: 35px;
    height: 35px;
    margin-right: 5px;
}
.chat-options {
    display: flex;
    width: 300px;
}
.chat-options-item {
    width: 55px;
    height: 14px;
    border-radius: 7px;
    background-color: #00294e;
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 11px;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
}
.chat-options-item.active {
    background-color: #1662c1;
}

.skullImg {
    max-width: 100%;
}
.skull {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 17.76vw;
}
.container {
    display: flex;
    position: absolute;
    bottom: 1.56vw;
    left: 50%;
    transform: translateX(-50%);
}
.panel {
    width: 33.85vw;
    height: 1.82vw;
    border: 0.42vw solid #1065b2;
    border-radius: 0.42vw;
    position: relative;
    background-color: #2e2e2e;
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 1vw;
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.63vw;
}
.wrapper-death {
    width: 100%;
    height: 100vh;
}

.radio {
    position: absolute;
    right: 11.3vw;
    bottom: 10px;
    display: flex;
    font-family: "Century Gothic";
    transition: 0.2s;
}
.radio-channels {
    width: 13.5vw;
    height: 22.03vw;
    background-color: rgba(14, 49, 85, 0.95);
    border-radius: 0.52vw;
    overflow: hidden;
    position: relative;
    z-index: 2;
}
.radio-channels::after {
    content: "";
    display: block;
    position: absolute;
    top: 91%;
    left: -98%;
    width: 40vw;
    height: 50vw;
    background: #fff;
    border-radius: 50%;
    z-index: 1;
}
.radio-channels .title {
    color: #ffffff;
    font-size: 1.04vw;
    font-weight: bold;
    text-align: center;
    padding: 0.6vw 0;
}
.radio-channels .list {
    overflow-y: auto;
    height: 17.5vw;
    padding: 0 0.52vw;
}
.radio-channels .item {
    width: 100%;
    height: 1.56vw;
    box-shadow: 0 0 13px rgba(255, 255, 255, 0.19);
    background-color: #ffffff;
    margin-bottom: 0.52vw;
    display: flex;
    align-items: center;
    padding: 0 0.78vw;
    padding-right: 0.26vw;
    border-radius: 0.52vw;
}
.radio-channels .item .text {
    font-size: 0.78vw;
    font-weight: bold;
    color: #4f75c7;
}
.radio-channels .btn {
    color: #ffffff;
    font-size: 0.73vw;
    font-weight: bold;
    background-color: #015394;
    margin: auto;
    padding: 0.16vw 0.65vw;
    border-radius: 0.52vw;
    transition: 0.2s;
    z-index: 2;
}
.radio-channels .btn:hover {
    background-color: #016ac0;
}
.radio-channels .footer .btn {
    margin: auto;
}
.radio-channels .footer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.4vw;
}
.radio-users {
    width: 10vw;
    height: 14.48vw;
    background-color: rgba(14, 49, 85, 0.95);
    left: -10.2vw;
    border-top-left-radius: 0.52vw;
    border-bottom-left-radius: 0.52vw;
    margin-top: 2.38vw;
    position: absolute;
    z-index: 1;
}
.radio-users .title {
    color: #ffffff;
    font-size: 0.78vw;
    font-weight: bold;
    height: 10%;
    border-bottom: 2px solid #fff;
}
.radio-users .list {
    height: 90%;
    overflow-y: auto;
}
.radio-users .item {
    border-bottom: 2px solid #fff;
    padding: 0.26vw 0.52vw;
    color: #ffffff;
    font-size: 0.78vw;
}
.radio-image {
    width: 9.9vw;
    height: 24.38vw;
    background: url('/img/hud/radio-full.png') no-repeat;
    background-size: cover;
    position: absolute;
    bottom: 0;
    opacity: 0.3;
    transform: translateY(50%);
    transition: 0.2s;
    left: -11.9vw;
}
.radio-image.active {
    opacity: 1;
    transform: translateY(0);
}
.btns-mask {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 14.75vw;
    width: 100%;
}
.changeRadioVol {
    position: absolute;
    top: 6vw;
    right: 1vw;
    height: 2vw;
    width: 3vw;
}
.b {
    position: absolute;
}
.btn-1 {
    width: 1.35vw;
    height: 0.89vw;
    left: 1.5vw;
    top: 4.18vw;
}
.btn-2 {
    width: 1vw;
    height: 0.63vw;
    right: 1.6vw;
    top: 8.2vw;
}
.btn-3 {
    width: 1.3vw;
    height: 0.78vw;
    left: 1.8vw;
    top: 8.05vw;
}
.btn-4 {
    width: 1.2vw;
    height: 0.63vw;
    left: 3.4vw;
    top: 9.5vw;
}
.btn-5 {
    width: 1.2vw;
    height: 0.63vw;
    left: 5.17vw;
    top: 9.55vw;
}
.radio-screen-freq {
    width: 4vw;
    height: 2vw;
    left: 3vw;
    top: 0.5vw;
    font-family: "LCDnova";
    font-size: 2.1vw;
    color: #fff;
    opacity: 0.75;
    text-align: center;
}
.radio-screen-sound {
    width: 1vw;
    height: 1vw;
    left: 1.9vw;
    top: 0.5vw;
    opacity: 0.8;
}
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.radio-channels .list::-webkit-scrollbar,
.radio-users .list::-webkit-scrollbar {
    width: 0.26vw !important;
}
.radio-channels .list::-webkit-scrollbar-track,
.radio-users .list::-webkit-scrollbar-track {
    border-radius: 0.13vw;
    background-color: rgba(14, 49, 85, 0.95);
}
.radio-channels .list::-webkit-scrollbar-thumb,
.radio-users .list::-webkit-scrollbar-thumb {
    border-radius: 0.13vw;
    background-color: rgb(255, 255, 255);
}
.cancel-animation-info {
    display: flex;
    align-items: center;
    font-family: "Century Gothic Bold";
    font-size: 1.88vw; //36px;
    color: #ffffff;
    position: absolute;
    left: 50%;
    bottom: 10vh;
    transform: translateX(-50%);
    .marked-word {
        display: inline-block;
        margin: 0 0.5em;
        background: linear-gradient(180deg, #1262ab 0%, rgba(28, 112, 190, 0) 100%), #0c4f8c;
        border-radius: 100px;
        padding: 0.2em 1em;
    }
}

.slide-enter-active {
    transition: all 0.5s ease;
}
.slide-leave-active {
    transition: all 0.4s;
}
.slide-enter,
.slide-leave-to {
    transform: translate(11vw);
    opacity: 0;
}
.slideup-enter-active {
    transition: all 0.3s ease;
}
.slideup-leave-active {
    transition: all 0.3s;
}
.slideup-enter,
.slideup-leave-to {
    transform: translateY(100%);
    opacity: 0;
}
/*подсказка для новых игроков*/
.help-newbie {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 48.54vw;
    background: linear-gradient(180deg, rgba(40, 93, 173, 0.4) 0%, rgba(48, 101, 180, 0) 100%), #1b2768;
    clip-path: polygon(0 0, 100% 0%, 80% 100%, 0 100%);
    display: flex;
    flex-direction: column;
    border-radius: 0.26vw;
    border-top-right-radius: 0;
    overflow: hidden;
    box-shadow: inset 0 0 0.104vw 0.156vw rgba(219, 226, 236, 0.103);
}

.help-content {
    display: flex;
    align-items: center;
}

.help-text {
    width: 75%;
    padding-left: 5%;
    padding-top: 1.302vw;
    padding-bottom: 1.302vw;
}

.help-title {
    font-family: "Century Gothic";
    font-weight: bold;
    font-size: 1.146vw;
    line-height: 1.25;
    color: #ffffff;
    margin-bottom: 0.521vw;
}

.help-subtitle {
    font-family: "Century Gothic";
    font-size: 0.938vw;
    line-height: 1.25;
    color: #ffffff;
}

.help-image {
    margin-left: auto;
    margin-right: 17%;
    width: 3.125vw;
    height: 5.208vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
.help-image img {
    max-width: 100%;
    height: auto;
}

.progress-newbie {
    width: 80%;
    height: 0.78vw;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.555) 0%, rgba(255, 255, 255, 0) 100%), rgba(189, 189, 189, 0.506);
    overflow: hidden;
    margin-top: auto;
    border-radius: 0.26vw;
}

.progress-fill {
    width: 0;
    height: 100%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%), rgba(32, 131, 53, 0.808);
    transition: 0.5s;
}
.progress-fill.yellow {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%), rgba(168, 154, 31, 0.808);
}
.progress-fill.red {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%), rgba(181, 41, 41, 0.822);
}
/*подсказка для новых игроков конец*/
/*экхолот*/
.echolot {
    width: 11.91vw;
    height: 21.31vw;
    background: url("/img/fishing/echolot.png");
    background-size: cover;
    position: absolute;
    bottom: 35vh;
    left: 2vw;
}
@media (max-aspect-ratio: 1.3333333333) {
    .echolot {
        transform: scale(2);
        transform-origin: left bottom;
    }
}
.echolot-screen {
    width: 7.26vw;
    height: 9.98vw;
    background: url(/img/fishing/echolot-bg.png);
    background-size: cover;
    border-radius: 0.52vw;
    position: absolute;
    left: calc(50% - 6.86vw / 2);
    top: 15%;
}
.echolot-temp {
    font-family: "Century Gothic";
    font-weight: bold;
    font-size: 0.94vw;
    color: #203765;
}
.echolot-card {
    width: 2.6vw;
    height: 2.6vw;
    background: url("/img/fishing/micro-sd-card.png") no-repeat;
    background-size: contain;
    position: relative;
}
.echolot-card__amount {
    font-family: "Century Gothic";
    font-weight: bold;
    font-size: 0.52vw;
    color: #203765;
    position: absolute;
    bottom: 0.36vw;
    left: 0.78vw;
    width: 1.3vw;
    height: 0.68vw;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.screen-header {
    display: flex;
    justify-content: space-between;
    padding-top: 0.47vw;
    padding-left: 0.26vw;
}
.screen-body {
    width: 100%;
    height: 3.125vw;
    margin-top: 0.26vw;
    position: relative;
    overflow: hidden;
}
.screen-body-fish {
    position: absolute;
    width: 2.302vw;
    height: 2.146vw;
    background: url("/img/fishing/small-fish.png") no-repeat;
    background-size: contain;
    filter: drop-shadow(0px 0.208vw 0.208vw rgba(0, 0, 0, 0.25));
    animation-name: anim;
    animation-iteration-count: infinite;
    animation-duration: 4s;
    animation-timing-function: ease-in-out;
    transition: 0.2s;
}
.screen-body-fish-1 {
    left: 14%;
    top: 5%;
}
.screen-body-fish-2 {
    animation-delay: 1s;
    animation-duration: 3s;
    left: 54%;
    top: 20%;
}
@keyframes anim {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(23%);
    }
    100% {
        transform: translateY(0);
    }
}
/*эхолот конец*/
</style>
