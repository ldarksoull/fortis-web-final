<template>
        <div class="wrapper" id="app">
        <div class="charCreate">
            <div class="logo"><img src="/img/newCreateCharacter/logo-white-150px.png" alt=""></div>
            <div class="randomizer" @click="randomizeChar()"><div>Случайно</div><div class="r-image"></div></div>
            <div class="camera">
                <div class="camera-item">
                    <div class="item-icon">Q</div>
                    <div class="item-text">Повернуть влево</div>
                </div>
                <div class="camera-item">
                    <div class="item-icon">E</div>
                    <div class="item-text">Повернуть вправо</div>
                </div>
            </div>
            <div class="left">
                <div class="page-name">{{isChangeAppearance ? 'Изменение внешности' : 'Создание персонажа'}}</div>
                <div class="gender left-block" v-if="(pageName === 'general' && currentTab === 'gender')">
                    <div class="gender-title">Пол</div>
                    <div class="gender-items">
                        <div class="gender-item">
                            <div class="gender-icon" :class="{active: gender === 'female' }" ><img src="/img/newCreateCharacter/female.png" alt="" @click="setGender('female')"></div>
                            <div class="gender-name">Женский</div>
                        </div>
                        <div class="gender-item">
                            <div class="gender-icon" :class="{active: gender === 'male'}" ><img src="/img/newCreateCharacter/male.png" alt="" @click="setGender('male')"></div>
                            <div class="gender-name">Мужской</div>
                        </div>
                    </div>
                    <div class="gender-footer">
                        <div @click="currentTab = 'family'" class="gender-footer-item">Далее</div>
                    </div>
                </div>
                <div class="family left-block" v-if="(pageName === 'general' && currentTab === 'family')">
                    <div class="family-header">
                        <div class="family-image mom">
                            <img :src="motherPic" alt="">
                        </div>
                        <div class="family-image dad">
                            <img :src="fatherPic" alt="">
                        </div>
                    </div>
                    <div class="family-body">
                        <div class="title">Наследство</div>
                        <div class="item">
                            <div class="item-title">
                                Мать
                            </div>
                            <div class="item-select">
                                <div class="select-prev" @click="prevMother"></div>
                                <div class="select-body">{{ motherNames[mother] }}</div>
                                <div class="select-next" @click="nextMother"></div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="item-title">
                                Отец
                            </div>
                            <div class="item-select">
                                <div class="select-prev" @click="prevFather"></div>
                                <div class="select-body">{{ fatherNames[father] }}</div>
                                <div class="select-next" @click="nextFather"></div>
                            </div>
                        </div>
                    </div>
                    <div class="family-footer">
                        <div class="footer-item" @click="currentTab = 'gender'">Назад</div>
                        <div class="footer-item" @click="currentTab = 'similarity'">Далее</div>
                    </div>
                </div>
                <div class="family similarity left-block" v-if="(pageName === 'general' && currentTab === 'similarity')">
                    <div class="family-header">
                        <div class="family-image mom">
                            <img :src="motherPic" alt="">
                        </div>
                        <div class="family-image dad">
                            <img :src="fatherPic" alt="">
                        </div>
                    </div>
                    <div class="family-body">
                        <div class="title">Схожесть</div>
                        <div class="item h50">
                            <div class="item-select w100">
                                <div class="slider-item w100">
                                    <vue-slider v-model="slider.shapeMix"
                                                ref="slider"
												:mouseup="sliderEdit()"
                                                v-bind="optionParent">
                                    </vue-slider>
                                    <div class="slider-tooltip absolute">{{ slider.shapeMix }}</div>
                                </div>
                            </div>
                        </div>
                      
                    </div>
                    <div class="family-footer">
                        <div class="footer-item" @click="currentTab = 'family'">Назад</div>
                        <div class="footer-item" @click="setPage(2)">Далее</div>
                    </div>
                </div>
                <div class="nose block left-block" v-if="(pageName === 'faceSettings' && currentTab === 'nose')">
                    <div class="block-title">Нос</div>
                    <div class="slider-list">
                        <div class="slider-item">
                            <div class="slider-name">Ширина носа</div>
                            <vue-slider v-model="slider.nose.width"
                                        ref="slider"
										:mouseup="sliderEdit()"
                                        v-bind="options">
                            </vue-slider>
                            <div class="slider-tooltip">{{ slider.nose.width }}</div>
                        </div>
                         <div class="slider-item">
                            <div class="slider-name">Высота носа</div>
                            <vue-slider v-model="slider.nose.height"
                                        ref="slider"
										:mouseup="sliderEdit()"
                                        v-bind="options">
                            </vue-slider>
                            <div class="slider-tooltip">{{ slider.nose.height }}</div>
                        </div>
                         <div class="slider-item">
                            <div class="slider-name">Длина кончика носа</div>
                            <vue-slider v-model="slider.nose.tipLength"
                                        ref="slider"
										:mouseup="sliderEdit()"
                                        v-bind="options">
                            </vue-slider>
                            <div class="slider-tooltip">{{ slider.nose.tipLength }}</div>
                        </div>
                         <div class="slider-item">
                            <div class="slider-name">Высота кончика носа</div>
                            <vue-slider v-model="slider.nose.tipHeight"
                                        ref="slider"
										:mouseup="sliderEdit()"
                                        v-bind="options">
                            </vue-slider>
                            <div class="slider-tooltip">{{ slider.nose.tipHeight }}</div>
                        </div>
                         <div class="slider-item">
                            <div class="slider-name">Глубина кончика носа</div>
                            <vue-slider v-model="slider.nose.tipDepth"
                                        ref="slider"
										:mouseup="sliderEdit()"
                                        v-bind="options">
                            </vue-slider>
                            <div class="slider-tooltip">{{ slider.nose.tipDepth }}</div>
                        </div>
                         <div class="slider-item">
                            <div class="slider-name">Поломанность носа</div>
                            <vue-slider v-model="slider.nose.break"
                                        ref="slider"
										:mouseup="sliderEdit()"
                                        v-bind="options">
                            </vue-slider>
                            <div class="slider-tooltip">{{ slider.nose.break }}</div>
                        </div>
                    </div>
                    <div class="block-footer">
                        <div class="footer-item" @click="setPage(1)">Назад</div>
                        <div class="footer-item" @click="currentTab = 'eyebrows'">Далее</div>
                    </div>
                </div>
                <div class="eyebrows block left-block" v-if="(pageName === 'faceSettings' && currentTab === 'eyebrows')">
                    <div class="block-title mb-15">Брови</div>
                    <div class="slider-list">
                        <div class="slider-item">
                            <div class="slider-name">Глубина бровей</div>
                            <vue-slider v-model="slider.eyebrows.height"
                                        ref="slider"
										:mouseup="sliderEdit()"
                                        v-bind="options">
                            </vue-slider>
                            <div class="slider-tooltip">{{ slider.eyebrows.height }}</div>
                        </div>
                         <div class="slider-item">
                            <div class="slider-name">Высота бровей</div>
                            <vue-slider v-model="slider.eyebrows.depth"
                                        ref="slider"
										:mouseup="sliderEdit()"
                                        v-bind="options">
                            </vue-slider>
                            <div class="slider-tooltip">{{ slider.eyebrows.depth }}</div>
                        </div>
                    </div>
                    <div class="block-footer">
                        <div class="footer-item" @click="currentTab = 'nose'">Назад</div>
                        <div class="footer-item" @click="currentTab = 'cheeks'">Далее</div>
                    </div>
                </div>
                <div class="cheeks block left-block" v-if="(pageName === 'faceSettings' && currentTab === 'cheeks')">
                    <div class="block-title mb-15">Скулы и щеки</div>
                    <div class="slider-list mb-40">
                        <div class="slider-item">
                            <div class="slider-name">Высота скул</div>
                            <vue-slider v-model="slider.cheeks.height"
                                        ref="slider"
										:mouseup="sliderEdit()"
                                        v-bind="options">
                            </vue-slider>
                            <div class="slider-tooltip">{{ slider.cheeks.height }}</div>
                        </div>
                         <div class="slider-item">
                            <div class="slider-name">Ширина скул</div>
                            <vue-slider v-model="slider.cheeks.width"
                                        ref="slider"
										:mouseup="sliderEdit()"
                                        v-bind="options">
                            </vue-slider>
                            <div class="slider-tooltip">{{ slider.cheeks.width }}</div>
                        </div>
                        <div class="slider-item">
                            <div class="slider-name">Глубина щеки</div>
                            <vue-slider v-model="slider.cheeks.depth"
                                        ref="slider"
										:mouseup="sliderEdit()"
                                        v-bind="options">
                            </vue-slider>
                            <div class="slider-tooltip">{{ slider.cheeks.depth }}</div>
                        </div>
                    </div>
                    <div class="block-footer">
                        <div class="footer-item" @click="currentTab = 'eyebrows'">Назад</div>
                        <div class="footer-item" @click="currentTab = 'eyes'">Далее</div>
                    </div>
                </div>
                <div class="eyes block left-block" v-if="(pageName === 'faceSettings' && currentTab === 'eyes')">
                    <div class="block-title mb-15">Глаза</div>
                    <div class="slider-list mb-40">
                        <div class="slider-item">
                            <div class="slider-name">Размер глаз</div>
                            <vue-slider v-model="slider.eyes.size"
                                        ref="slider"
										:mouseup="sliderEdit()"
                                        v-bind="options">
                            </vue-slider>
                            <div class="slider-tooltip">{{ slider.eyes.size }}</div>
                        </div>
                    </div>
                    <div class="block-footer">
                        <div class="footer-item" @click="currentTab = 'cheeks'">Назад</div>
                        <div class="footer-item" @click="currentTab = 'lips'">Далее</div>
                    </div>
                </div>
                <div class="lips block left-block" v-if="(pageName === 'faceSettings' && currentTab === 'lips')">
                    <div class="block-title mb-15">Губы</div>
                    <div class="slider-list mb-40">
                        <div class="slider-item">
                            <div class="slider-name">Размер губ</div>
                            <vue-slider v-model="slider.lips.size"
                                        ref="slider"
										:mouseup="sliderEdit()"
                                        v-bind="options">
                            </vue-slider>
                            <div class="slider-tooltip">{{ slider.lips.size }}</div>
                        </div>
                    </div>
                    <div class="block-footer">
                        <div class="footer-item" @click="currentTab = 'eyes'">Назад</div>
                        <div class="footer-item" @click="currentTab = 'chin'">Далее</div>
                    </div>
                </div>
                <div class="nose block left-block" v-if="(pageName === 'faceSettings' && currentTab === 'chin')">
                    <div class="block-title">Подбородок</div>
                    <div class="slider-list">
                        <div class="slider-item">
                            <div class="slider-name">Ширина челюсти</div>
                            <vue-slider v-model="slider.chin.width1"
                                        ref="slider"
										:mouseup="sliderEdit()"
                                        v-bind="options">
                            </vue-slider>
                            <div class="slider-tooltip">{{ slider.chin.width1 }}</div>
                        </div>
                        <div class="slider-item">
                            <div class="slider-name">Форма челюсти</div>
                            <vue-slider v-model="slider.chin.form"
                                        ref="slider"
										:mouseup="sliderEdit()"
                                        v-bind="options">
                            </vue-slider>
                            <div class="slider-tooltip">{{ slider.chin.form }}</div>
                        </div>
                        <div class="slider-item">
                            <div class="slider-name">Высота подбородка</div>
                            <vue-slider v-model="slider.chin.height"
                                        ref="slider"
										:mouseup="sliderEdit()"
                                        v-bind="options">
                            </vue-slider>
                            <div class="slider-tooltip">{{ slider.chin.height }}</div>
                        </div>
                        <div class="slider-item">
                            <div class="slider-name">Глубина подбородка</div>
                            <vue-slider v-model="slider.chin.depth"
                                        ref="slider"
										:mouseup="sliderEdit()"
                                        v-bind="options">
                            </vue-slider>
                            <div class="slider-tooltip">{{ slider.chin.depth }}</div>
                        </div>
                        <div class="slider-item">
                            <div class="slider-name">Ширина подбородка</div>
                            <vue-slider v-model="slider.chin.width"
                                        ref="slider"
										:mouseup="sliderEdit()"
                                        v-bind="options">
                            </vue-slider>
                            <div class="slider-tooltip">{{ slider.chin.width }}</div>
                        </div>
                        <div class="slider-item">
                            <div class="slider-name">Подбородочный отступ</div>
                            <vue-slider v-model="slider.chin.indent"
                                        ref="slider"
										:mouseup="sliderEdit()"
                                        v-bind="options">
                            </vue-slider>
                            <div class="slider-tooltip">{{ slider.chin.indent }}</div>
                        </div>
                    </div>
                    <div class="block-footer">
                        <div class="footer-item" @click="currentTab = 'lips'">Назад</div>
                        <div class="footer-item" @click="currentTab = 'neck'">Далее</div>
                    </div>
                </div>
                <div class="lips block left-block" v-if="(pageName === 'faceSettings' && currentTab === 'neck')">
                    <div class="block-title mb-15">Шея</div>
                    <div class="slider-list mb-40">
                        <div class="slider-item">
                            <div class="slider-name">Обхват шеи</div>
                            <vue-slider v-model="slider.neck.size"
                                        ref="slider"
										:mouseup="sliderEdit()"
                                        v-bind="options">
                            </vue-slider>
                            <div class="slider-tooltip">{{ slider.neck.size }}</div>
                        </div>
                    </div>
                    <div class="block-footer">
                        <div class="footer-item" @click="currentTab = 'chin'">Назад</div>
                        <div class="footer-item" @click="setPage(3)">Далее</div>
                    </div>
                </div>
                <div class="hairs relative block left-block" v-if="(pageName === 'faceSettings2' && currentTab === 'hairs')">
                    <div class="block-title">Волосы</div>
                    <div class="settings">
                        <div class="item">
                            <div class="item-title">
                                Вид
                            </div>
                            <div class="item-select">
                                <div class="select-prev" @click="setNewSetting('hair',-1,0,21,0)"></div>
                                <div class="select-body">{{ showIndexOrNone(overHead.hair,0) }}</div>
                                <div class="select-next" @click="setNewSetting('hair',+1,0,21,0)"></div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="item-title">
                                Цвет
                            </div>
                            <div class="item-select">
                                <div class="select-prev" @click="setNewSetting('hairColor',-1,0,21,0)"></div>
                                <div class="select-body">{{ overHead.hairColor }}</div>
                                <div class="select-next" @click="setNewSetting('hairColor',1,0,21,0)"></div>
                            </div>
                        </div>
                        <div class="block-footer">
                            <div class="footer-item" @click="currentTab = 'nose', pageName='faceSettings'">Назад</div>
                            <div class="footer-item" @click="currentTab = 'eyebrowsType'">Далее</div>
                        </div>
                    </div>
                </div>
                <div class="hairs relative block left-block" v-if="(pageName === 'faceSettings2' && currentTab === 'eyebrowsType')">
                    <div class="block-title">Брови</div>
                    <div class="settings">
                        <div class="item">
                            <div class="item-title">
                                Вид
                            </div>
                            <div class="item-select">
                                <div class="select-prev" @click="setNewSetting('eyebrows',-1,0,34,255)"></div>
                                <div class="select-body">{{ showIndexOrNone(overHead.eyebrows,255) }}</div>
                                <div class="select-next" @click="setNewSetting('eyebrows',1,0,34,255)"></div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="item-title">
                                Цвет
                            </div>
                            <div class="item-select">
                                <div class="select-prev" @click="setNewSetting('eyebrowsColor',-1,0,21,0)"></div>
                                <div class="select-body">{{ overHead.eyebrowsColor }}</div>
                                <div class="select-next" @click="setNewSetting('eyebrowsColor',1,0,21,0)"></div>
                            </div>
                        </div>
                        <div class="block-footer">
                            <div class="footer-item" @click="currentTab = 'hairs'">Назад</div>
                            <div class="footer-item" @click="currentTab = 'eyes2'">Далее</div>
                        </div>
                    </div>
                </div>
                <div class="eyes relative block left-block" v-if="(pageName === 'faceSettings2' && currentTab === 'eyes2')">
                    <div class="block-title">Глаза</div>
                    <div class="settings">
                        <div class="item h120">
                            <div class="item-title">
                                Цвет
                            </div>
                            <div class="item-select">
                                <div class="select-prev" @click="setEyesColor(1)"></div>
                                <div class="select-body">{{ eyes[overHead.eyesColor] }}</div>
                                <div class="select-next" @click="setEyesColor(2)"></div>
                            </div>
                        </div>
                        <div class="block-footer">
                            <div class="footer-item" @click="currentTab = 'eyebrowsType'">Назад</div>
                            <div class="footer-item" @click="currentTab = 'freckles'">Далее</div>
                        </div>
                    </div>
                </div>
                <div class="hairs relative block left-block" v-if="(pageName === 'faceSettings2' && currentTab === 'freckles')">
                    <div class="block-title">Веснушки</div>
                    <div class="settings">
                        <div class="item">
                            <div class="item-title">
                                Вид
                            </div>
                            <div class="item-select">
                                <div class="select-prev" @click="setNewSetting('freckles',-1,0,18,255)"></div>
                                <div class="select-body">{{ showIndexOrNone(overHead.freckles,255) }}</div>
                                <div class="select-next" @click="setNewSetting('freckles',1,0,18,255)"></div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="item-title">
                                Цвет
                            </div>
                            <div class="item-select">
                                <div class="select-prev" @click="setNewSetting('frecklesColor',-1,0,21,0)"></div>
                                <div class="select-body">{{ overHead.frecklesColor }}</div>
                                <div class="select-next" @click="setNewSetting('frecklesColor',1,0,21,0)"></div>
                            </div>
                        </div>
                        <div class="block-footer">
                            <div class="footer-item" @click="currentTab = 'eyes2'">Назад</div>
                            <div class="footer-item" @click="currentTab = 'makeup'">Далее</div>
                        </div>
                    </div>
                </div>
                <div class="makeup relative block left-block" v-if="(pageName === 'faceSettings2' && currentTab === 'makeup')">
                    <div class="block-title">Макияж</div>
                    <div class="settings">
                        <div class="item">
                            <div class="item-title">
                                Помада
                            </div>
                            <div class="item-select">
                                <div class="select-prev" @click="setNewSetting('pomade',-1,0,10,255)"></div>
                                <div class="select-body">{{ showIndexOrNone(overHead.pomade,255) }}</div>
                                <div class="select-next" @click="setNewSetting('pomade',1,0,10,255)"></div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="item-title">
                                Цвет помады
                            </div>
                            <div class="item-select">
                                <div class="select-prev" @click="setNewSetting('pomadeColor',-1,0,21,0)"></div>
                                <div class="select-body">{{ overHead.pomadeColor }}</div>
                                <div class="select-next" @click="setNewSetting('pomadeColor',1,0,21,0)"></div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="item-title">
                                Румянец
                            </div>
                            <div class="item-select">
                                <div class="select-prev" @click="setNewSetting('blush',-1,0,7,255)"></div>
                                <div class="select-body">{{ showIndexOrNone(overHead.blush,255) }}</div>
                                <div class="select-next" @click="setNewSetting('blush',1,0,7,255)"></div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="item-title">
                                Цвет румянца
                            </div>
                            <div class="item-select">
                                <div class="select-prev" @click="setNewSetting('blushColor',-1,0,20,0)"></div>
                                <div class="select-body">{{ overHead.blushColor }}</div>
                                <div class="select-next" @click="setNewSetting('blushColor',1,0,20,0)"></div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="item-title">
                                Тени
                            </div>
                            <div class="item-select">
                                <div class="select-prev" @click="setNewSetting('shadows',-1,0,75,255)"></div>
                                <div class="select-body">{{ showIndexOrNone(overHead.shadows,255) }}</div>
                                <div class="select-next" @click="setNewSetting('shadows',1,0,75,255)"></div>
                            </div>
                        </div>
                        <div class="block-footer">
                            <div class="footer-item" @click="currentTab = 'freckles'">Назад</div>
                            <div class="footer-item" @click="changeNextPage">Далее</div>
                        </div>
                    </div>
                </div>
                <div class="hairs relative block left-block" v-if="(pageName === 'faceSettings2' && currentTab === 'beard')">
                    <div class="block-title">Борода</div>
                    <div class="settings">
                        <div class="item">
                            <div class="item-title">
                                Вид
                            </div>
                            <div class="item-select">
                                <div class="select-prev" @click="setNewSetting('beard',-1,0,29,255)"></div>
                                <div class="select-body">{{ showIndexOrNone(overHead.beard,255) }}</div>
                                <div class="select-next" @click="setNewSetting('beard',1,0,29,255)"></div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="item-title">
                                Цвет
                            </div>
                            <div class="item-select">
                                <div class="select-prev" @click="setNewSetting('beardColor',-1,0,20,0)"></div>
                                <div class="select-body">{{ overHead.beardColor }}</div>
                                <div class="select-next" @click="setNewSetting('beardColor',1,0,20,0)"></div>
                            </div>
                        </div>
                        <div class="block-footer">
                            <div class="footer-item" @click="currentTab = 'eyes2'">Назад</div>
                            <div class="footer-item" @click="openLastPage">Далее</div>
                        </div>
                    </div>
                </div>
                <div class="cheeks block left-block" v-if="pageName === 'passport'">
                    <div class="block-title mb-15">Паспортные данные</div>
                    <div class="settings">
                        <div class="item">
                            <div class="item-title">
                                Имя
                            </div>
                            <div class="item-select">
                                <input type="text" class="passport-input" name="" v-model.trim='name' maxlength="15">
                            </div>
                        </div>
                        <div class="item">
                            <div class="item-title">
                                Фамилия
                            </div>
                            <div class="item-select">
                                <input type="text" class="passport-input" name="" v-model.trim='family' maxlength="15">
                            </div>
                        </div>
                        <div class="item">
                            <div class="item-title">
                                Дата рождения
                            </div>
                            <div class="item-select">
                                <the-mask v-model.trim='bithday' class="passport-input" mask="##/##/####"/>
                            </div>
                        </div>
                        <div class="block-footer">
                            <div class="footer-item" @click="pageName = 'faceSettings2'">Назад</div>
                            <div class="footer-item"  @click="createCharacter">Создать</div>
                        </div>
                    </div>
                </div>
                <div class="cheeks block left-block save-appearance" v-if="pageName === 'saveAppearance'">
                    <div class="block-title mb-15">Сохранить изменения?</div>
                    <div class="settings">
                        <div class="block-footer">
                            <div class="footer-item" @click="pageName = 'faceSettings2'">Назад</div>
                            <div class="footer-item"  @click="saveAppearance">Сохранить</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="screen-name">{{ currentPage }}</div>
                <div class="main-block right-block" v-if="pageName != 'passport' && pageName != 'saveAppearance'">
                    <div class="header">
                        <img src="/img/newCreateCharacter/Medved-1.png" alt="">
                    </div>
                    <div class="body">
                        <div class="list-wrapper">
                            <div class="list" v-if="pageName === 'general'">
                                <div class="list-item" :class="{ active: currentTab === 'gender'}" @click="currentTab = 'gender'">
                                    <div class="item-text">Пол</div>
                                    <div class="item-icon">
                                        <img src="/img/newCreateCharacter/gender.png" alt="" @click="currentTab = 'gender'">
                                    </div>
                                </div>
                                <div class="list-item" :class="{ active: currentTab === 'family'}" @click="currentTab = 'family'">
                                    <div class="item-text">Наследство</div>
                                    <div class="item-icon"><img src="/img/newCreateCharacter/heritage.png" alt="" @click="currentTab = 'family'"></div>
                                </div>
                                <div class="list-item" :class="{ active: currentTab === 'similarity'}" @click="currentTab = 'similarity'">
                                    <div class="item-text">Схожесть</div>
                                    <div class="item-icon"><img src="/img/newCreateCharacter/similarity.png" alt="" @click="currentTab = 'similarity'"></div>
                                </div>
                            </div>
                            <div class="list scroll" v-if="pageName === 'faceSettings'">
                                <div class="list-item" :class="{ active: currentTab === 'nose'}" @click="currentTab = 'nose'">
                                    <div class="item-text">Нос</div>
                                    <div class="item-icon">
                                        <img src="/img/newCreateCharacter/nose.png" alt="" @click="currentTab = 'nose'">
                                    </div>
                                </div>
                                <div class="list-item" :class="{ active: currentTab === 'eyebrows'}" @click="currentTab = 'eyebrows'">
                                    <div class="item-text">Брови</div>
                                    <div class="item-icon"><img src="/img/newCreateCharacter/eyebrow.png" alt="" @click="currentTab = 'eyebrows'"></div>
                                </div>
                                <div class="list-item" :class="{ active: currentTab === 'cheeks'}" @click="currentTab = 'cheeks'">
                                    <div class="item-text">Скулы и щеки</div>
                                    <div class="item-icon"><img src="/img/newCreateCharacter/cheek.png" alt="" @click="currentTab = 'cheeks'"></div>
                                </div>
                                <div class="list-item" :class="{ active: currentTab === 'eyes'}" @click="currentTab = 'eyes'">
                                    <div class="item-text">Глаза</div>
                                    <div class="item-icon"><img src="/img/newCreateCharacter/eye.png" alt="" @click="currentTab = 'eyes'" ></div>
                                </div>
                                <div class="list-item" :class="{ active: currentTab === 'lips'}" @click="currentTab = 'lips'">
                                    <div class="item-text">Губы</div>
                                    <div class="item-icon"><img src="/img/newCreateCharacter/lips.png" alt="" @click="currentTab = 'lips'"></div>
                                </div>
                                <div class="list-item" :class="{ active: currentTab === 'chin'}" @click="currentTab = 'chin'">
                                    <div class="item-text">Подбородок</div>
                                    <div class="item-icon"><img src="/img/newCreateCharacter/chin.png" alt="" @click="currentTab = 'chin'"></div>
                                </div>
                                <div class="list-item" :class="{ active: currentTab === 'neck'}" @click="currentTab = 'neck'">
                                    <div class="item-text">Шея</div>
                                    <div class="item-icon"><img src="/img/newCreateCharacter/neck.png" alt="" @click="currentTab = 'neck'"></div>
                                </div>
                            </div>
                            <div class="list scroll" v-if="pageName === 'faceSettings2'">
                                <div class="list-item" :class="{ active: currentTab === 'hairs'}" @click="currentTab = 'hairs'">
                                    <div class="item-text">Волосы</div>
                                    <div class="item-icon">
                                        <img src="/img/newCreateCharacter/hair.png" alt="" @click="currentTab = 'hairs'">
                                    </div>
                                </div>
                                <div class="list-item" :class="{ active: currentTab === 'eyebrowsType'}" @click="currentTab = 'eyebrowsType'">
                                    <div class="item-text">Брови</div>
                                    <div class="item-icon"><img src="/img/newCreateCharacter/eyebrow.png" alt="" @click="currentTab = 'eyebrowsType'"></div>
                                </div>
                                <div class="list-item" :class="{ active: currentTab === 'eyes2'}" @click="currentTab = 'eyes2'">
                                    <div class="item-text">Глаза</div>
                                    <div class="item-icon"><img src="/img/newCreateCharacter/eye.png" alt="" @click="currentTab = 'eyes2'"></div>
                                </div>
                                <div class="list-item" :class="{ active: currentTab === 'freckles'}" @click="currentTab = 'freckles'">
                                    <div class="item-text">Веснушки</div>
                                    <div class="item-icon"><img src="/img/newCreateCharacter/freckles.png" alt="" @click="currentTab = 'freckles'"></div>
                                </div>
                                <div class="list-item" :class="{ active: currentTab === 'makeup'}" @click="currentTab = 'makeup'">
                                    <div class="item-text">Макияж</div>
                                    <div class="item-icon"><img src="/img/newCreateCharacter/makeup.png" alt="" @click="currentTab = 'makeup'"></div>
                                </div>
                                <div class="list-item" v-if="gender ==='male'" :class="{ active: currentTab === 'beard'}" @click="currentTab = 'beard'">
                                    <div class="item-text">Борода</div>
                                    <div class="item-icon"><img src="/img/newCreateCharacter/beard.png" alt="" @click="currentTab = 'beard'"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer" :class="{ flexBetween: pageName !== 'general' }">
                        <div class="next-page" v-if="pageName === 'faceSettings'" @click="setPage(1)">Назад</div>
                        <div class="next-page" v-if="pageName === 'faceSettings2'" @click="setPage(2)">Назад</div>
                        <div class="next-page" v-if="pageName === 'passport'" @click="setPage(3)">Назад</div>
                        <div class="dots">
                            <div class="dot" :class="{ active: pageName === 'general'}"></div>
                            <div class="dot" :class="{ active: pageName === 'faceSettings'}"></div>
                            <div class="dot" :class="{ active: pageName === 'faceSettings2'}"></div>
                            <div class="dot" :class="{ active: pageName === 'passport'}"></div>
                        </div>
                        <div class="next-page" v-if="pageName === 'general'" @click="setPage(2)">Далее</div>
                        <div class="next-page" v-if="pageName === 'faceSettings'" @click="setPage(3)">Далее</div>
                        <div class="next-page" v-if="pageName === 'faceSettings2' && !isChangeAppearance" @click="setPage(4)">Далее</div>
                        <div class="next-page" v-if="pageName === 'faceSettings2' && isChangeAppearance" @click="setPage(5)">Далее</div>
                    </div>
                </div>
                <div class="info" v-if="pageName === 'passport'">
                    <div class="info-title">Подсказка:</div>
                    <div class="info-text">Имя Фамилия должны быть на латинице.</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { TheMask } from 'vue-the-mask';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css'
import { mapGetters } from "vuex";

export default {
    data() {
        return{
			name:'',
			family:'',
			bithday:'',
			
            pageName: 'general',
            currentTab: 'gender',
            currentPage: 'Общее',
            gender: 'male',
            father: 0,
            mother: 0,
			skinColor: 0.5,
            fatherNames: ["Benjamin", "Daniel", "Joshua", "Noah", "Andrew", "Juan", "Alex", "Isaac", "Evan", "Ethan", "Vincent", "Angel", "Diego", "Adrian", "Gabriel", "Michael", "Santiago", "Kevin", "Louis", "Samuel", "Anthony", "Claude", "John", "Niko"],
            motherNames: ["Hannah", "Aubrey", "Jasmine", "Gisele", "Amelia", "Isabella", "Zoe", "Ava", "Camila", "Violet", "Sophia", "Evelyn", "Nicole", "Ashley", "Gracie", "Brianna", "Natalie", "Olivia", "Elizabeth", "Charlotte", "Emma", "Misty"],
            fathersID: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 42, 43, 44],
            mothersID: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 45],
            
			maleHair: [],
			
			fatherPic: '/img/newCreateCharacter/male_0.png',
            motherPic: '/img/newCreateCharacter/female_0.png',
            slider: {
                shapeMix: 0.5,
                nose:{
                    width: 0,
                    height: 0,
                    tipHeight: 0,
                    tipLength: 0,
                    tipDepth: 0,
                    break: 0
                },
                eyebrows:{
                    height: 0,
                    depth: 0
                },
                cheeks:{
                    height: 0,
                    width: 0,
                    depth: 0
                },
                eyes:{
                    size: 0
                },
                lips:{
                    size: 0
                },
                chin:{
                    width1: 0,
                    width: 0,
                    height: 0,
                    form: 0,
                    depth: 0,
                    indent: 0
                },
                neck:{
                    size: 0
                },
            },
            
			eyes: ['Карие', 'Серые', 'Голубые'],
			overHead:{
				hair: 1,
				hairV: 0,
				hairColor: 0,
				hairColorS: 0,
				eyebrows: 0,
				eyebrowsColor: 1,
				freckles: 255,
				frecklesColor: 1,
				pomade: 255,
				pomadeColor: 1,
				blush: 255,
				blushColor: 1,
				shadows: 255,
				beard: 255,
				beardColor: 1,
				chest: 16,
				chestColor: 0,
				eyesColor: 0,
			},
            
            options: {
                dotSize: 22,
                width: 'auto',
                height: "10px",
                contained: false,
                direction: 'ltr',
                data: null,
                min: -1,
                max: 1,
                interval: 0.1,
                disabled: false,
                clickable: true,
                duration: 0.2,
                adsorb: false,
                lazy: false,
                tooltip: null,
                tooltipPlacement: 'top',
                tooltipFormatter: void 0,
                useKeyboard: true,
                enableCross: true,
                fixed: false,
                minRange: void 0,
                maxRange: void 0,
                order: true,
                marks: false,
                dotOptions: void 0,
                process: true,
				
            },
			optionParent: {
                dotSize: 22,
                width: 'auto',
                height: "10px",
                contained: false,
                direction: 'ltr',
                data: null,
                min: 0,
                max: 1,
                interval: 0.1,
                disabled: false,
                clickable: true,
                duration: 0.2,
                adsorb: false,
                lazy: false,
                tooltip: null,
                tooltipPlacement: 'top',
                tooltipFormatter: void 0,
                useKeyboard: true,
                enableCross: true,
                fixed: false,
                minRange: void 0,
                maxRange: void 0,
                order: true,
                marks: false,
                dotOptions: void 0,
                process: true,
            }
        }
    },
    computed: {
            ...mapGetters({
                timeData: "getDataTime",
                isChangeAppearance: "getChangeAppearance",
            }),
    },
    methods:{
		showIndexOrNone(i,chek){
			if(i===chek) return 'НЕТ';
			else return i;
		},
		setNewSetting(j,i,min,max,def){
			if(this.overHead[j]+i>min && this.overHead[j]+i<max){
				this.overHead[j] = this.overHead[j] + i;
				return this.changeAppearance();
			}else{
				if(this.overHead[j] === def && i>0){
					this.overHead[j] = min;
					return this.changeAppearance();
				}
				
				if(this.overHead[j] === def && i<0){
					this.overHead[j] = max-1;
					return this.changeAppearance();
				}
				
				if(this.overHead[j] != def){
					this.overHead[j] = def;
					return this.changeAppearance();
				}
			}
		},
		setGender(gender){
			this.gender = gender;
            if (gender === 'female') {
                this.overHead.beard = 255;
                this.overHead.beardColor = 0;
            }
			mp.trigger("cMisc-CallServerEvent", "sCharCreatorChangeGender", gender);
			this.changeAppearance();
		},
        setEyesColor(g){
            if (g === 1){
                if(this.overHead.eyesColor <= 0) return false
                this.overHead.eyesColor--
            }
            if (g === 2){
                if(this.overHead.eyesColor >= 2) return false
                this.overHead.eyesColor++
            }
            this.changeAppearance();
        },
        setPage(pageName){
            if(pageName === 1){
                this.currentPage = 'Общее';
                this.pageName = 'general';
                this.currentTab = 'similarity';
				mp.trigger("cCharCreatorCamFull");
            }
            if(pageName === 2){
                this.currentPage = 'Характеристики';
                this.pageName = 'faceSettings';
                this.currentTab = 'nose';
				mp.trigger("cCharCreatorCamFace");
            }
            if(pageName === 3){
                this.currentPage = 'Внешние признаки';
                this.pageName = 'faceSettings2';
                this.currentTab = 'hairs';
				mp.trigger("cCharCreatorCamFace");
            }
            if(pageName === 4){
                this.currentPage = 'Паспортные данные';
                this.pageName = 'passport';
				mp.trigger("cCharCreatorCamFull");
            }
            if (pageName === 5){
                this.currentPage = '';
                this.pageName = 'saveAppearance';
            }
        },
        getFatherPic: function(id){
            return '/img/newCreateCharacter/male_'+id+'.png';
        },
        getMotherPic: function(id){
            return '/img/newCreateCharacter/female_'+id+'.png';
        },
        prevFather: function() {
			if (this.father === 0) this.father = 23;
			else this.father--;
            this.changeAppearance();
            this.fatherPic = this.getFatherPic(this.father); // :src="fatherPic"
        },	
		nextFather: function() {
			if (this.father === 23) this.father = 0;
			else this.father++;
            this.fatherPic = this.getFatherPic(this.father); // :src="fatherPic"
            this.changeAppearance();
		},	
		prevMother: function() {
			if (this.mother === 0) this.mother = 21;
            else this.mother--;
            this.motherPic = this.getMotherPic(this.mother); // :src="motherPic"
			this.changeAppearance();
		},	
		nextMother: function() {
			if (this.mother === 21) this.mother = 0;
            else this.mother++;
            this.motherPic = this.getMotherPic(this.mother); // :src="motherPic"
			this.changeAppearance();
		},	
		sliderEdit: function(){
			this.changeAppearance();
		},
		
		changeAppearance: function() {
			const facedata = [
				/* нос */
				this.slider.nose.width,
				this.slider.nose.height,
				this.slider.nose.tipHeight,
				this.slider.nose.tipLength,
				this.slider.nose.tipDepth,
				this.slider.nose.break,
				/* брови */
				this.slider.eyebrows.depth,
				this.slider.eyebrows.height,
				/*скулы */
				this.slider.cheeks.height,
				this.slider.cheeks.width,
				this.slider.cheeks.depth,
				/* глаза */
				-this.slider.eyes.size,
				/* губы */
				-this.slider.lips.size,
				/* челюсти */
				this.slider.chin.width1,
				this.slider.chin.width,
				this.slider.chin.height,
				this.slider.chin.form,
				this.slider.chin.depth,
				this.slider.chin.indent,
				/* шея */
				this.slider.neck.size,
			];
			
			const arr = [
				this.mothersID[this.mother],
				this.fathersID[this.father],
				this.skinColor,  
				this.slider.shapeMix,
			];
			
			const sendData = {
				face: facedata,
				skin: arr,
				overlay: this.overHead,
			};
			mp.trigger("cMisc-CallServerEvent", "sCharCreatorDoneOptions", JSON.stringify(sendData));
        },	
        prepareData() {
            const facedata = [
                /* нос */
                this.slider.nose.width,
                this.slider.nose.height,
                this.slider.nose.tipHeight,
                this.slider.nose.tipLength,
                this.slider.nose.tipDepth,
                this.slider.nose.break,
                /* брови */
                this.slider.eyebrows.depth,
                this.slider.eyebrows.height,
                /*скулы */
                this.slider.cheeks.height,
                this.slider.cheeks.width,
                this.slider.cheeks.depth,
                /* глаза */
                -this.slider.eyes.size,
                /* губы */
                -this.slider.lips.size,
                /* челюсти */
                this.slider.chin.width1,
                this.slider.chin.width,
                this.slider.chin.height,
                this.slider.chin.form,
                this.slider.chin.depth,
                this.slider.chin.indent,
                /* шея */
                this.slider.neck.size,
            ];
            
            const arr = [
                this.mothersID[this.mother],
                this.fathersID[this.father],
                this.skinColor,  
                this.slider.shapeMix,
            ];
            
            const sendData = {
                name: this.name,
                family: this.family,
                bithday: this.bithday,
                gender: this.gender,
                face: facedata,
                skin: arr,
                overlay: this.overHead,
            };
            return sendData;
        },
		createCharacter(){
            if (!this.name || !this.family) {
                return storage.addNotification({text: "Введите имя и фамилию персонажа",theme: "error"});
            }
            if (!/^[A-Za-z]{0,15}$/.test(this.name)) {
                return storage.addNotification({text: "Имя должно содержать только латинские буквы",theme: "error"});
            }
            if (!/^[A-Za-z]{0,15}$/.test(this.family)) {
                return storage.addNotification({text: "Фамилия должна содержать только латинские буквы",theme: "error"});
            }
            if (!this.validateBirth(this.bithday)){
                return storage.addNotification({text: "Некорректная дата рождения",theme: "error"});
            }
	
			const sendData = this.prepareData();
			mp.trigger("cMisc-CallServerEvent", "sCharCreatorDoneCreateCharacter", JSON.stringify(sendData));
		},
        validateBirth(birth) { 
            if (birth.length != 8) return false;
            const day = +birth.slice(0,2);
            const month = birth.slice(2,4) - 1;
            const year = +birth.slice(4);
            const moscowTime = new Date(this.timeData.date.year, this.timeData.date.month - 1,this.timeData.date.day, this.timeData.time.hour, this.timeData.time.mins);
            const d = new Date(year, month, day);
            
            if ((d.getFullYear() == year) && (d.getMonth() == month) && (d.getDate() == day)) {
                if (+d < +moscowTime) return true
            }
            return false;
        },
		onKeyDown(e){
			/*q*/
			if( e.keyCode === 81){
				mp.trigger("cCharCreatorRotPlayer",'l');
			}
			
			/*e*/
			if( e.keyCode === 69){
				mp.trigger("cCharCreatorRotPlayer",'r');
			}
		},
        randomizeChar(){
            for (const keyTitle in this.slider) {
                if (keyTitle === "shapeMix") {
                    this.slider[keyTitle] = this.getRandomFloat(0,1);
                } else {
                    for (const key in this.slider[keyTitle]) {
                        this.slider[keyTitle][key] = this.getRandomFloat(-1,1);
                    }
                }
            }

            this.mother = this.getRandomInt(0, 21)
            this.father = this.getRandomInt(0, 23)
            this.motherPic = this.getMotherPic(this.mother);
            this.fatherPic = this.getFatherPic(this.father);

            this.overHead.hair = this.getRandomInt(0, 21)
            this.overHead.hairColor = this.getRandomInt(0, 21)
            this.overHead.eyebrows = this.getRandomInt(0, 34)
            this.overHead.eyebrowsColor = this.getRandomInt(0, 21)
            // this.overHead.freckles = this.getRandomInt(0, 18)
            // this.overHead.frecklesColor = this.getRandomInt(0, 21)
            // this.overHead.pomade = this.getRandomInt(0, 10)
            // this.overHead.pomadeColor = this.getRandomInt(0, 21)
            // this.overHead.blush = this.getRandomInt(0, 7)
            // this.overHead.blushColor = this.getRandomInt(0, 20)
            // this.overHead.shadows = this.getRandomInt(0, 75)
            if (this.gender === "male") {
                this.overHead.beard = this.getRandomInt(0, 29)
                this.overHead.beardColor = this.getRandomInt(0, 20)
            }
            this.overHead.eyesColor = this.getRandomInt(0, 2)
            
            this.changeAppearance();
        },
        getRandomFloat(min = -1, max = 1) {
            return +(Math.random() * (min - max) + max).toFixed(1)
        },
        getRandomInt(min = 0, max = 100) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        changeNextPage() {
            this.gender === 'male' ? this.currentTab = 'beard' : this.pageName = 'passport'
            if (this.isChangeAppearance && this.gender === "female") this.pageName = 'saveAppearance';
        },
        openLastPage() {
            if (this.isChangeAppearance) {
                this.pageName = 'saveAppearance';
            } else {
                this.pageName = 'passport'
            }
        },
        saveAppearance() {
            const sendData = this.prepareData();
            mp.trigger("cPlayerChangeAppearanceEnd", JSON.stringify(sendData));
        },
    },
    components: {
        VueSlider,
        TheMask
    },
	created() {
		document.addEventListener('keydown', this.onKeyDown);
	},
    beforeDestroy() {
		document.removeEventListener('keydown',this.onKeyDown);
	}
}
</script>

<style scoped>
/* сброс стилей */
html, body { 
    padding: 0; 
    margin: 0; 
} 
html { 
    font-size: 1em; 
} 
body { 
    font-size: 100%; 
} 
*{
    box-sizing: border-box;
}
a img, :link img, :visited img { 
    border: 0; 
} 

.wrapper{
    width: 100%;
    height: 100vh;   
}
.charCreate{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: "Century Gothic";
}
.flexBetween{
    justify-content: space-between!important;
}
.logo{
    position: absolute;
    right: 5vh;
    top: 5vh;
}
.randomizer{
    position: absolute;
    bottom: 2vh;
    left: 3vw;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 193px;
    height: 43px;
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 22px;
    letter-spacing: -1.1px;
    box-shadow: 0 9px 40px rgba(0, 0, 0, 0.36);
    border-radius: 10px;
    background-color: rgba(10, 34, 81, 0.76);
    z-index: 100;
}
.r-image{
    width: 35px;
    height: 24px;
    transition: 0.3s;
    background: url('/img/newCreateCharacter/random-inactive.png');
}
.randomizer:hover > .r-image{
    background: url('/img/newCreateCharacter/random-active.png');
}
.w100{
    width: 100%!important;
}
/* camera */

.camera{
    position: absolute;
    bottom: 2vh;
    right: 3vw;
    width: 380px;
    height: 43px;
    box-shadow: 0 9px 40px rgba(0, 0, 0, 0.36);
    border-radius: 10px;
    background-color: rgba(10, 34, 81, 0.753);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.camera-item{
    display: flex;
    color: #ffffff;
    align-items: center;
    
}
.camera .item-icon{
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 22px;
    font-weight: 700;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 15px;
}
.camera .item-text{
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 17px;
    font-weight: 400;
    letter-spacing: -0.94px;
    margin-left: 13px;
}
.left{
    transform-origin: top left;
    position: absolute;
    top: 15vh;
    left: 3vw;
}
.right{
    position: absolute;
    right: calc(3vw + 116px);
    top: 20vh;
    transform-origin: right top;
}
.page-name{
    font-family: '10221';
    text-shadow: 0 9px 40px rgba(0, 0, 0, 0.38);
    color: #ffffff;
    font-size: 82px;
    font-weight: 400;
    letter-spacing: -0.41px;
    margin-bottom: 7.4vh;
}
.screen-name{
    text-shadow: 0 9px 40px rgba(0, 0, 0, 0.38);
    color: #ffffff;
    font-family: "10221";
    font-size: 72px;
    font-weight: 400;
    text-align: right;
    margin-right: 10px;
    letter-spacing: -0.36px;
}

/* gender */

.gender{
    width: 480px;
    height: 260px;
    background: url('/img/newCreateCharacter/gender-bg.png');
    background-size: cover;
    position: relative;
}
.gender-items{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 82.69%;
    padding-top: 6%;
}
.gender-title{
    position: absolute;
    left: 5%;
    top: 10%;
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 30px;
    letter-spacing: -0.15px;
    
}
.gender-item{
    height: 100%;
    width: 25%;
    display: flex;
    justify-content: center;
    flex-flow: column;
    align-items: center;
    transition: 0.3s;
}
.gender-icon{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100px;
    margin-bottom: 10px;
    transition: 0.3s;
}
.gender-icon.active{
    background: rgba(10, 34, 81, 0.753);
    border-radius: 10px;
}
.gender-name{
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 100%;
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 22px;
    font-weight: 400;
    letter-spacing: -1.65px;
}
.gender-footer{
    height: calc(100% - 82.69%);
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.gender-footer-item{
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 20px;
    font-weight: 400;
    letter-spacing: -1.5px;
    margin-right: 5%;
}

/* ///////////////////// */

/* family */
.family{
    width: 479px;
    height: 500px;
    background: url('/img/newCreateCharacter/family-bg.png');
}
.family-header{
    height: 231px;
    display: flex;
    align-items: flex-end;
    position: relative;
}
.family-body{
    height: 219px;
}
.family-body{
    padding: 0 30px;
    color: #ffffff;
}
.family-body .title{
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 27px;
    font-weight: 400;
    letter-spacing: -2.02px;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
.family-body .item-title{
    width: 30%;
}
.family-body .item-select{
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.family-body .item{
    display: flex;
    align-items: center;
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 22px;
    letter-spacing: 0.55px;
    height: 25%;
}
.family-body .select-body{
    width: 150px;
    text-align: center
}
.family-body .select-prev, .family-body .select-next{
    height: 30px;
    width: 30px;
    border-radius: 50%; 
}
.family-body .select-prev:active, .family-body .select-next:active{
    background-color: rgba(17, 67, 129, 0.616);
}
.family-body .select-prev{
    background: #114481 url('/img/newCreateCharacter/left.png') no-repeat;
    background-position: 50% 75%;
}
.family-body .select-next{
    background: #114481 url('/img/newCreateCharacter/right.png') no-repeat;
    background-position: 50% 75%;
}

.family-footer{
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ffffff;
    padding: 0 20px
}
.footer-item{
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 20px;
    letter-spacing: -1.09px;
}
.family-image{
    position: absolute;
    display: flex;
    align-items: flex-end;
    bottom: 1px;
}
.mom{
    left: 0;
    z-index: 2;
}
.dad{
    right: 0;
    z-index: 1;
}
.similarity .item-select{
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}

.similarity .family-body .item-title{
    width: 25%;
}
.similarity .family-body .item-select{
    width: 65%;
}


/* main */

.main-block{
    position: absolute;
    right: 0;
    margin-top: 5vh;
    background: url('/img/newCreateCharacter/background2.png') no-repeat;
    background-size: cover;
    width: 348px;
    height: 589px;
    transform-origin: top right;
}
@media (max-height: 1050px){
    .main-block, .block, .left, .right{
        transform: scale(0.95)
    }
}

@media (max-width: 1600px){
    .main-block, .block, .left, .right{
        transform: scale(0.9);
    }
    .right{
        right: 6vw
    }
}
@media (max-width: 1368px){
     .right{
        transform: scale(0.8);
        right: 6vw;
    }
}
@media (max-height: 820px){
    .main-block, .block, .left, .right{
        transform: scale(0.85)
    }
    .page-name{
        margin-bottom: 5vh;
    }
    .randomizer{
        transform-origin: bottom left;
        transform: scale(0.8)
    }
    .camera{
        transform-origin: bottom right;
        transform: scale(0.8)
    }
}
@media (max-height: 740px){
    .main-block, .block, .left, .right{
        transform: scale(0.8)
    }
    .page-name{
        margin-bottom: 3vh;
    }
}
@media (max-height: 650px){
    .main-block, .block, .left, .right{
        transform: scale(0.7)
    }
    .page-name{
        margin-bottom: 3vh;
        font-size: 70px;
    }
    .logo{
        transform-origin: top right;
        transform: scale(0.7)
    }
}
.main-block .header{
    height: 278px;
    width: 348px;
    position: relative;
}
.header img{
    position: absolute;
    height: 290px;
    max-width: 348px;
    top: -12px;
}
.main-block .body{
    height: 235px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 0;
}
.main-block .footer{
    height: 78px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
    position: relative;
}
.list-wrapper{
    width: 100%;
    direction: rtl;
    padding-left: 5px;
}
.list{
    width: 100%;
}
.list.scroll{
    max-height: 205px;
    overflow-y: scroll;
}
.list-item{
    height: 53px;
    padding: 0 20px;
    padding-left: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    direction: ltr
}
.list-item.active{
    background-color: #0A285F;
}
.list.scroll::-webkit-scrollbar {
    width: 12px;
}
.list.scroll::-webkit-scrollbar-track{
    background-color: #061c3b;
    border-radius: 6px;
}
.list.scroll::-webkit-scrollbar-thumb{
    background-color: #10396b;
    border-radius: 6px;
}
.item-text{
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 21px;
    letter-spacing: -1.57px;
}
.item-icon{
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.dots{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 25%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%)
}
.dot{
    width: 9px;
    height: 9px;
    background: rgb(35, 108, 235);
    box-shadow: 0 0 5px rgb(35, 108, 235);
    border-radius: 50%;
}
.dot.active{
    width: 13px;
    height: 13px;
}
.next-page{
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 16px;
    letter-spacing: -1.2px;
}
/* ////////////// */
.nose, .chin{
    background: url('/img/newCreateCharacter/nose-bg.png') no-repeat;
    width: 479px;
    height: 623px;
    transform-origin: top left;
}
.eyebrows, .hairs{
    background: url('/img/newCreateCharacter/eyebrows-bg.png') no-repeat;
    width: 480px;
    height: 311px;
    transform-origin: top left;
}
.cheeks{
    background: url('/img/newCreateCharacter/cheeks-bg.png') no-repeat;
    width: 479px;
    height: 432px;
    transform-origin: top left;
}
.eyes, .lips, .neck{
    background: url('/img/newCreateCharacter/neck-bg.png') no-repeat;
    width: 479px;
    height: 269px;
    transform-origin: top left;
}
.makeup{
    background: url('/img/newCreateCharacter/makeup-bg.png') no-repeat;
    width: 479px;
    height: 568px;
    transform-origin: top left;
}
/* костыли ебаные */
.mb-15{
    margin-bottom: 15px!important;
}
.mb-40{
    margin-bottom: 40px!important;
}
.h120{
    height: 120px!important;
}
/* //////// */
.left-block{
    transform-origin: top left;
}
.right-block{
    transform-origin: top right;
}
.block{
    padding-top: 35px;
    padding-left: 25px;
    padding-right: 25px;
    position: absolute;
}
.block-title{
    text-align: left;
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 30px;
    font-weight: 400;
    letter-spacing: -0.75px;
    margin-bottom: 3px;
}
.slider-list{
    width: 70%;
    margin: 0 auto;
}
.slider-item{
    position: relative;
    margin-bottom: 3px;
}
.slider-tooltip{
    display: flex;
    justify-content: center;
    margin-top: 8px;
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.18px;
}
.slider-tooltip.absolute{
    position: absolute;
    left: 50%;
    transform: translateX(-50%)
}
.slider-name{
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 22px;
    letter-spacing: -1.65px;
    margin-bottom: 10px;
}
.block-footer{
    height: 68px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* block  settings */
.relative{
    position: relative;
}
.settings .item{
    display: flex;
    align-items: center;
    height: 80px;
}
.settings .item-select{
    display: flex;
    justify-content: center;
    width: 70%;
}
.settings .item-title{
    padding-left: 30px;
    width: 30%;
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 22px;
    letter-spacing: 0.55px;
}
.settings .select-body{
    color: #ffffff;
    width: 135px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Century Gothic";
    font-size: 22px;
    font-weight: 700;
}
.settings .select-prev, .settings .select-next{
    height: 30px;
    width: 30px;
    border-radius: 50%; 
    transition: 0.1s;
}
.settings .select-prev:active, .settings .select-next:active{
    background-color: rgb(14, 51, 102);
}
.settings .select-prev{
    background: rgb(9, 36, 75) url('/img/newCreateCharacter/left.png') no-repeat;
    background-position: 50% 75%;
}
.settings .select-next{
    background: rgb(9, 36, 75) url('/img/newCreateCharacter/right.png') no-repeat;
    background-position: 50% 75%;
}
.settings .block-footer{
    position: absolute;
    bottom: 0;
    width: 430px;
    display: flex;
    justify-content: space-between;
}
.info{
    position: absolute;
    right: 0;
    width: 285px;
    height: 135px;
    border-radius: 15px;
    background: rgba(14, 51, 102, 0.795);
    padding-left: 40px;
    padding-top: 20px;
    margin-top: 5vh;
}
.info-title{
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 24px;
    letter-spacing: -1.8px;
    margin-bottom: 10px;
    position: relative;
}
.info-title::before{
    position: absolute;
    content: '';
    left: -33px;
    width: 28px;
    height: 28px;
    background: url('/img/newCreateCharacter/mark.png') no-repeat;
}
.info-text{
    color: #ffffff;
    font-family: "Century Gothic";
    font-size: 22px;
    letter-spacing: -1.1px;
}
.passport-input{
    text-align: center;
    outline: none;
    border: none;
    width: 250px;
    height: 38px;
    border-radius: 19px;
    background-color: #062b55;
    color: #fff;
    padding: 5px 20px;
    font-family: "Century Gothic";
    font-size: 22px;
    letter-spacing: 0.55px;
}
.h50{
    height: 50%!important;
}
.save-appearance{
    height: 9vw;
    border-radius: 31px;
}
</style>