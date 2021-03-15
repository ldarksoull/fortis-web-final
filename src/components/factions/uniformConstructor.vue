<template>
    <div class="wrapper">
        <div class="camera">
            <div class="camera-item">
                <div class="camera-item-icon">Q</div>
                <div class="camera-item-text">Повернуть влево</div>
            </div>
            <div class="camera-item">
                <div class="camera-item-icon">E</div>
                <div class="camera-item-text">Повернуть вправо</div>
            </div>
            <div class="camera-item">
                <div class="camera-item-icon">Esc</div>
                <div class="camera-item-text">Выйти</div>
            </div>
        </div>
        <div class="left">
            <div class="header">
                <div class="header-image">
                    <div class="header-image-icon">
                        <img src="/img/shirt-icon.png" alt="" />
                    </div>
                </div>
                <div class="header-title">Конструктор формы</div>
                <div class="header-subtitle">Выберите нужный тип одежды</div>
            </div>
            <div class="body">
                <div class="list-item" v-if="formItems.length" @click="formItems = []">Назад</div>
                <ul class="list" v-if="!formItems.length">
                    <li class="list-item" v-for="form in uniform" @click="selectFormType(form)">{{ form.type }}</li>
                </ul>
                <ul class="list" v-if="formItems.length">
                    <li class="list-item" @click="removeCloth()">Убрать</li>
                    <li class="list-item" v-for="item in formItems" @click="setCloth(item)" :class="isDressed(item.id)">{{ item.title }}</li>
                </ul>
            </div>
            <div class="footer">
                <div class="list-item" @click="finishShift">Снять одежду</div>
                <div class="list-item" @click="startShift">Выйти на смену</div>
            </div>
        </div>
        <div class="right">
            <div class="header">
                <div class="header-title">Сохранённые комплекты</div>
                <div class="header-subtitle">Выберите готовый комплект</div>
            </div>
            <div class="body" v-if="kits.length != 0">
                <ul class="list">
                    <li class="list-item" v-for="kit in kits" @click="setKit(kit)" :class="{ active: kit.id === selectedKit }">
                        <div v-show="!kit.edit_mode" class="list-item-text">{{ kit.name }}</div>
                        <input v-show="kit.edit_mode" type="text" @keyup.enter="saveKitName(kit)" :ref="'kitName' + kit.id" v-model="kit.name" class="list-item-text" />
                        <div class="list-item-icons">
                            <div class="list-item-icon icon-delete" @click.stop="editKitName(kit)"><img src="/img/edit-icon.png" alt="" /></div>
                            <div class="list-item-icon icon-delete" @click.stop="deleteKit(kit)"><img src="/img/delete-icon.png" alt="" /></div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="footer">
                <div class="list-item" @click="addKit()">
                    <div class="list-item-text">Сохранить текущий комплект</div>
                    <div class="list-item-icon icon-save"><img src="/img/save-icon.png" alt="" /></div>
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
            formItems: [],
            dressed: {},
            selectedKit: null,
        };
    },
    computed: {
        ...mapGetters({
            uniform: "getFactionUniform",
            kits: "getFactionUniformKits",
            currentUniform: "getFactionCurrentUniform",
        }),
    },
    methods: {
        editKitName(kit) {
            if (kit.edit_mode) {
                this.saveKitName(kit);
            } else {
                this.$set(kit, "edit_mode", true);
                this.$nextTick(() => {
                    this.$refs["kitName" + kit.id][0].focus();
                });
            }
        },
        saveKitName(kit) {
            if (!kit.name) return;
            this.$set(kit, "edit_mode", false);
            mp.trigger("cFactionRenameUnifromKit", kit.id, kit.name);
        },
        addKit() {
            if (Object.keys(this.dressed).length === 0) {
                return storage.addNotification({ text: "Чтобы сохранить комплект нужно надеть как минимум 1 элемент формы", theme: "error" });
            }
            const clothId = [];
            for (const key in this.dressed) {
                clothId.push(this.dressed[key].id);
            }
            const count = this.kits.length + 1;
            const id = count + this.getRandomInt(0, 100000);
            const newKit = {
                id: id,
                name: "Комплект № " + count,
                edit_mode: false,
                clothId: clothId,
            };
            mp.trigger("cFactionSaveNewUnifromKit", JSON.stringify(newKit));
        },
        getRandomInt(min = 0, max = 100) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        deleteKit(kit) {
            mp.trigger("cFactionRemoveUnifromKit", kit.id, kit.name);
        },
        selectFormType(form) {
            this.formItems = form.itemsList;
            this.selectedTypeName = form.clothTypeName;
            mp.trigger("cClothingShopPreview", form.clothType);
        },
        setCloth(item, sendData = true) {
            this.$set(this.dressed, this.selectedTypeName, item);
            if (!sendData) return;
            if (item.isProp) {
                mp.trigger("cMiscSetProp", item.componentNumber, item.drawable, item.textureId);
            } else {
                mp.trigger("cMiscSetClothes", item.componentNumber, item.drawable, item.textureId, item.paletteId);
            }
        },
        removeCloth() {
            if (this.selectedTypeName) {
                const item = this.dressed[this.selectedTypeName];
                if (item) {
                    mp.trigger("cFactionRemoveUniformCloth", JSON.stringify(item));
                    this.$delete(this.dressed, this.selectedTypeName);
                }
            }
        },
        isDressed(id) {
            if (this.dressed[this.selectedTypeName] && this.dressed[this.selectedTypeName].id === id) return "active";
        },
        exit(resetUniform = false) {
            if (resetUniform) mp.trigger("cMisc-CallServerEvent", "sInventoryResetClothes");
            mp.trigger("cFactionExitWardrobe");
            mp.trigger("cCloseCefAndDestroyCam");
        },
        onKeyUp(e) {
            if (e.keyCode === 27) {
                this.exit(true);
            }
        },
        onKeyDown(e) {
            /*q*/
            if (e.keyCode === 81) {
                mp.trigger("cTattoSaloneRotPlayer", "l");
            }
            /*e*/
            if (e.keyCode === 69) {
                mp.trigger("cTattoSaloneRotPlayer", "r");
            }
        },
        finishShift() {
            mp.trigger("cMisc-CallServerEvent", "sFactionFinishShift");
            this.exit();
        },
        startShift() {
            if (Object.keys(this.dressed).length === 0) {
                return storage.addNotification({ text: "Чтобы выйти на смену нужно надеть как минимум 1 элемент формы", theme: "error" });
            }
            mp.trigger("cMisc-CallServerEvent", "sFactionStartShift", JSON.stringify(this.dressed));
            this.exit();
        },
        setKit(kit) {
            for (const key in this.dressed) {
                mp.trigger("cFactionRemoveUniformCloth", JSON.stringify(this.dressed[key]));
            }
            this.dressed = {};
            this.selectedKit = kit.id;
            kit.clothId.forEach(itemId => {
                for (const key in this.uniform) {
                    this.uniform[key].itemsList.forEach(item => {
                        if (item.id === itemId) {
                            this.selectedTypeName = this.uniform[key].clothTypeName;
                            this.setCloth(item);
                        }
                    });
                }
            });
            this.selectedTypeName = "";
            this.formItems = [];
        },
    },
    mounted() {
        this.currentUniform.forEach(equipedIted => {
            for (const key in this.uniform) {
                this.uniform[key].itemsList.forEach(item => {
                    if (item.id === equipedIted.id) {
                        this.selectedTypeName = this.uniform[key].clothTypeName;
                        this.setCloth(item, false);
                    }
                });
            }
        });
        this.selectedTypeName = "";
    },
    created() {
        document.addEventListener("keyup", this.onKeyUp);
        document.addEventListener("keydown", this.onKeyDown);
    },
    beforeDestroy() {
        document.removeEventListener("keyup", this.onKeyUp);
        document.removeEventListener("keydown", this.onKeyDown);
    },
};
</script>
<style lang="scss" scoped>
.header {
    font-family: "Century Gothic";
    width: 100%;
    margin-bottom: 1.41vw; //27px;
    &-image {
        display: flex;
        justify-content: center;
        &-icon {
            width: 14.32vw; //275px;
            height: 8.75vw; //168px;
            margin-top: 3.28vw; //63px;
            margin-bottom: 2.71vw; //52px;
        }
    }
    &-title {
        font-weight: bold;
        font-size: 1.82vw; //35px;
        color: #feffff;
        padding-left: 1.09vw; //21px;
    }
    &-subtitle {
        font-family: "Century Gothic";
        font-size: 1.09vw; //21px;
        color: rgba(254, 255, 255, 0.65);
        padding-left: 1.09vw; //21px;
    }
}

.left {
    width: 23.8vw; //457px;
    height: 100vh;
    background: #4d9ddc;
    display: flex;
    flex-direction: column;
    padding-bottom: 0.68vw; //13px;
    .body {
        .list {
            max-height: 21.09vw; //405px;
            overflow-y: auto;
            &::-webkit-scrollbar {
                width: 0.89vw; //17px;
            }
            &::-webkit-scrollbar-track {
                background: #e7eff4;
            }
            &::-webkit-scrollbar-thumb {
                background: #65b9fc;
            }
        }
    }
    .footer {
        margin-top: auto;
    }
}
.right {
    width: 23.8vw; //457px;
    background: #4d9ddc;
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 2.14vw; //41px;
    top: 1.88vw; //36px;
    padding-top: 1.46vw; //28px;
    padding-bottom: 1.82vw; //35px;
    border-radius: 0.52vw; //10px;
    .list {
        max-height: calc(2.34vw * 4); //45px
        overflow-y: auto;
        &::-webkit-scrollbar {
            width: 0.89vw; //17px;
        }
        &::-webkit-scrollbar-track {
            background: #e7eff4;
        }
        &::-webkit-scrollbar-thumb {
            background: #65b9fc;
        }
    }
    .header {
        &-title {
            font-size: 1.67vw; //32px;
        }
        &-subtitle {
            font-size: 1.04vw; //20px;
        }
    }
    .body {
        margin-bottom: 3.23vw; //62px;
    }
}
.list-item {
    font-family: "Century Gothic";
    font-size: 1.09vw; //21px;
    color: #ffffff;
    height: 2.34vw; //45px;
    display: flex;
    align-items: center;
    padding: 0 1.09vw; //21px;
    transition: 0.2s;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-icons {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.2s;
        margin-left: 0.26vw;
        &:hover {
            transform: scale(0.9);
        }
    }
    &:hover,
    &.active {
        background: #78b9ec;
    }
}
.list-item-text {
    background: none;
    border: none;
    font-family: "Century Gothic";
    font-size: 1.09vw; //21px;
    color: #ffffff;
    width: 100%;
    &.active {
        color: #e2e2e2;
        &::selection {
            background-color: #65a0ce;
        }
    }
}
.icon-save {
    width: 2.08vw; //40px
}
.icon-delete {
    width: 1.72vw; //33px
}
img {
    max-width: 100%;
    height: auto;
}
::selection {
    background-color: transparent;
}
.camera {
    position: absolute;
    bottom: 2vh;
    right: 2.14vw;
    width: 490px;
    height: 43px;
    box-shadow: 0 9px 40px rgba(0, 0, 0, 0.36);
    border-radius: 10px;
    background-color: #4d9ddc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.camera-item {
    display: flex;
    color: #ffffff;
    align-items: center;
}
.camera-item-icon {
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 22px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
}
.camera-item-text {
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 17px;
    font-weight: 400;
    letter-spacing: -0.94px;
    margin-left: 13px;
}
</style>
