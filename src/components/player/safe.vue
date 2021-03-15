<template>
    <div class="wrapper">
        <div class="content">
            <div class="wheel-wrapper">
                <div class="wheel">
                    <div class="wheel-marks" :style="wheel"></div>
                </div>
            </div>
            <div class="locks">
                <div class="lock" :style="lock1"></div>
                <div class="lock" :style="lock2"></div>
                <div class="lock" :style="lock3"></div>
                <div class="lock" :style="lock4"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                turn: 0,
                lockSound:  new Audio('/audio/safe-lock.mp3'),
                lockBgPath0: '/img/safe/locked-lock.png',
                lockBgPath1: '/img/safe/locked-lock.png',
                lockBgPath2: '/img/safe/locked-lock.png',
                lockBgPath3: '/img/safe/locked-lock.png',
                lockNum: 0,  // Номер замка, с которым осуществляем работу на данном цикле (0-3)
                direct: 0,   // 0 - вправо, 1 - влево
                pFCkl: 0
            }
        },
        methods: {
            init() {
                this.turn = 0;
                this.lockNum = 0;
                this.closeLock(0);
                this.closeLock(1);
                this.closeLock(2);
                this.closeLock(3);
                this.direct = 0;
                if (this.pFCkl === 0)  {
                    this.chosenNum = Array(4);
                    for (let i = 0; i < this.chosenNum.length; i++) {
                        let l_b, r_b, chosenNumX;
                        if (i === 0) this.chosenNum[0] = Math.floor(360 / 100 * Math.floor(100 * Math.random()));
                        else {
                            chosenNumX = this.chosenNum[(i - 1)];
                            if ((i % 2) === 0) {
                                l_b = chosenNumX;
                                r_b = 360;
                            } else {
                                l_b = 0;
                                r_b = chosenNumX;
                            }
                            this.chosenNum[i] = Math.floor(l_b + (r_b - l_b) * Math.random());
                            };
                    };
                    this.pFCkl++;
                }
            },
            onKDn(k) {
                if (k.keyCode === 37)  this.turn = Math.floor(this.turn - 360/100);
                if (k.keyCode === 39)  this.turn = Math.floor(this.turn + 360/100);
                
                if (this.turn < -360)  this.turn += 360;
                if (360 <= this.turn)  this.turn -= 360;
                
                if ((this.pFCkl === 0) ||
                    ((k.keyCode === 39) && ((this.direct === 1) || ((this.chosenNum[(this.lockNum)] + 3) < this.turn))) ||
                    ((k.keyCode === 37) && ((this.direct === 0) || (this.turn < (this.chosenNum[(this.lockNum)] - 3)))))  {
                    if (0 < this.lockNum)  this.lockSound.play();
                    this.init();
                }
    
                if ((Math.abs(this.turn - this.chosenNum[(this.lockNum)])) < 3) {
                    this.unlock(this.lockNum);
                    this.lockNum++;
                    this.lockSound.play();
                    if (3 < this.lockNum) {
                        this.init();
                        mp.trigger("cMisc-CallServerEvent", "sSafeEndHackSucces");
                        this.exit();
                    } else  this.direct = 1 - this.direct;
                };
            },
            exit() {
                this.pFCkl = 0;
                mp.trigger("cCloseCef");
                mp.trigger("cSetPage", 'none');
            },
            onKeyUp(k) {
                if (k.keyCode === 27) {
                    this.init();
                    mp.trigger("cMisc-CallServerEvent", "sSafeEndHack");
                    this.exit();
                }
            },
            unlock(lockNum) {
                switch(lockNum) {
                    case 0:
                        this.lockBgPath0 = '/img/safe/unlocked-lock.png';
                        return this.lockBgPath0;
                        break;
                    case 1:
                        this.lockBgPath1 = '/img/safe/unlocked-lock.png';
                        return this.lockBgPath1;
                        break;
                    case 2:
                        this.lockBgPath2 = '/img/safe/unlocked-lock.png';
                        return this.lockBgPath2;
                        break;
                    case 3:
                        this.lockBgPath3 = '/img/safe/unlocked-lock.png';
                        return this.lockBgPath3;
                        break;
                    default: break;
                }
            },
            closeLock(lockNum) {
                switch(lockNum) {
                    case 0:
                        this.lockBgPath0 = '/img/safe/locked-lock.png';
                        return this.lockBgPath0;
                        break;
                    case 1:
                        this.lockBgPath1 = '/img/safe/locked-lock.png';
                        return this.lockBgPath1;
                        break;
                    case 2:
                        this.lockBgPath2 = '/img/safe/locked-lock.png';
                        return this.lockBgPath2;
                        break;
                    case 3:
                        this.lockBgPath3 = '/img/safe/locked-lock.png';
                        return this.lockBgPath3;
                        break;
                    default: break;
                }
            }
        },
        computed: {
            wheel() {
                let turn1 = 360 - this.turn;
                return { transform: 'rotate(' + turn1 + 'deg)'};
            },
            lock1() {
                return { backgroundImage: 'url(' + this.lockBgPath0 + ')' };
            },
            lock2() {
                return { backgroundImage: 'url(' + this.lockBgPath1 + ')' };
            },
            lock3() {
                return { backgroundImage: 'url(' + this.lockBgPath2 + ')' };
            },
            lock4() {
                return { backgroundImage: 'url(' + this.lockBgPath3 + ')' };
            },
        },
        created() {
            document.addEventListener('keydown', this.onKDn);
            document.addEventListener('keyup', this.onKeyUp);
        },
        beforeDestroy() {
            document.removeEventListener('keydown',this.onKDn);
            document.removeEventListener('keyup',this.onKeyUp);
        }
    }
</script>
<style scoped lang="scss">
    .wrapper{
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .wheel{
        background: url('/img/safe/wheel.png');
        background-size: contain;
        background-position: center;
        width: 26.51vw; // 509px
        height: 26.51vw; // 509px
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .wheel-marks{
        background: url('/img/safe/wheel-marks.png') no-repeat;
        background-size: contain;
        background-position: center;
        width: 20.47vw; // 393px
        height: 20.47vw; // 393px
        margin-top: 0.21vw; // 4px
    }
    .locks{
        display: flex;
    }
    .lock {
        background-size: contain;
        background-position: center;
        width: 10vw; // 192px
        height: 12.71vw; // 244px
    }
</style>
