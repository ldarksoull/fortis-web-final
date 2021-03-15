<template>
    <div class="wrapper">
        <div class="tablet-wrapper">
            <div class="tablet">
                <transition name="fade">
				<div class="tablet-inner homescreen" v-if="page === 'homescreen'">
                    <div class="hmscr-items">
                        <div class="hmscr-item">
                            <div class="hmscr-item-icon" ><img src="/img/lspd-tablet/icon-gears.png" alt="" @click="openApp('memberList')"></div>
                            <div class="hmscr-item-name" @click="openApp('memberList')">Управление организацией</div>
                        </div>
                        <div class="hmscr-item" v-if="factionData.type === 'cop'">
                            <div class="hmscr-item-icon" ><img src="/img/lspd-tablet/icon-notebook.png" alt="" @click="openApp('lspdDB')"></div>
                            <div class="hmscr-item-name" @click="openApp('lspdDB')">Базы данных</div>
                        </div>
                        <div class="hmscr-item" v-if="factionData.type === 'cop' || factionData.type === 'ems'">
                            <div class="hmscr-item-icon red"><img src="/img/lspd-tablet/icon-car.png" alt="" @click="openApp('calls')"></div>
                            <div class="hmscr-item-name" @click="openApp('calls')">Вызовы</div>
                        </div>
                        <div class="hmscr-item">
                            <div class="hmscr-item-icon"><img src="/img/lspd-tablet/icon-car2.png" alt="" @click="openApp('transport')"></div>
                            <div class="hmscr-item-name" @click="openApp('transport')"> Управление транспортом </div>
                        </div>
                        <div class="hmscr-item">
                            <div class="hmscr-item-icon" @click="page = 'announcing', mainPageTab = 'announcing', mainPage = 'announcing'">
                                <img src="/img/lspd-tablet/announcing.png" alt="">
                            </div>
                            <div class="hmscr-item-name">
                                Доска объявлений
                            </div>
                        </div>
                        <div class="hmscr-item" v-if="factionData.type === 'news'">
                            <div class="hmscr-item-icon wn-icon" @click="page = 'wn', mainPageTab = 'wn', mainPage = 'wn'">
                                <img src="/img/lspd-tablet/weazel.png" alt="">
                            </div>
                            <div class="hmscr-item-name">
                                Weazel News
                            </div>
                        </div>
                        <div class="hmscr-item" v-if="!crimeFactionTypes.includes(factionData.type)">
                            <div class="hmscr-item-icon" @click="page = 'announcing2', mainPageTab = 'wn', mainPage = 'wn'">
                                <img src="/img/lspd-tablet/spiker.png" alt="">
                            </div>
                            <div class="hmscr-item-name">
                                Публикация новостей
                            </div>
                        </div>
                    </div>
                </div>
                </transition>
                <transition name="fade">
                <div class="tablet-inner" v-if="page === 'transport'">
                    <div class="sidebar">
                        <div class="sidebar-title">{{factionData.title}}</div>
                        <div class="sidebar-item" :class="{active: mainPage === 'transport'}" @click="mainPage = 'transport', modalPage = '', statTabPage = 'transport'">Транспорт организации</div>
                        <div class="sidebar-item" :class="{active: mainPage === 'transportRanks'}" @click="mainPage = 'transportRanks', modalPage = '', statTabPage = 'transportRanks'" v-if="playerGUID === factionData.leader || adminWatch">Доступ к транспорту</div>
                    </div>
                    <transition name="fade2">
                     <div class="main padding" v-if="mainPage === 'transport'">
                        <div class="main-title text-title">Транспорт организации</div>
                        <div class="text-center darkenwhite transport-title">
                            <div class="text">В организации: {{factionVehicles.length}} единиц транспорта</div>
                        </div>
                        <div class="content">
                            <div class="table table-1">
                                <div class="table-header blue">
                                    <div class="table-head-col w-25">№</div>
                                    <div class="table-head-col w-35" @click="changeSort('title')">
                                        Марка авто 
                                        <div class="sort">
                                            <div class="sort-up" v-if="sortParam[0]==='title'&&sortParam[1]==='up'">&#9650;</div>
                                            <div class="sort-down" v-if="sortParam[0]==='title'&&sortParam[1]==='down'">&#9660;</div>
                                        </div>
                                    </div>
                                    <div class="table-head-col w-20" @click="changeSort('price')" v-if="crimeFactionTypes.includes(factionData.type)">
                                        Цена авто
                                        <div class="sort">
                                            <div class="sort-up" v-if="sortParam[0]==='price'&&sortParam[1]==='up'">&#9650;</div>
                                            <div class="sort-down" v-if="sortParam[0]==='price'&&sortParam[1]==='down'">&#9660;</div>
                                        </div>
                                    </div>
                                    <div class="table-head-col w-20" v-if="crimeFactionTypes.includes(factionData.type)">
                                        Продать
                                    </div>
                                    <div class="table-head-col w-20">
                                        Эвакуировать
                                    </div>
                                    <div class="table-head-col w-20">
                                        Отследить
                                    </div>
                                </div>
                                <div class="table-body overflow scrollable-col" style="height: 25.04vw">
                                    <div class="item-wrapper" v-for="item in factionVehicles">
                                        <div class="table-row">
                                            <div class="table-col w-25">{{item.number}}</div>
                                            <div class="table-col w-35 col scrollable-col overflow">{{item.title}}</div>
                                            <div class="table-col w-20" v-if="crimeFactionTypes.includes(factionData.type)">{{item.price | divideNumber}}$</div>
                                            <div class="table-col w-20 center" v-if="crimeFactionTypes.includes(factionData.type)">
                                                <div class="sell-btn center">
                                                    <div class="sell-icon-wrapper">
                                                        <img src="/img/lspd-tablet/sell-icon.png" alt="" @click="changeModalPageVeh('sellFractionAuto', item)">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="table-col w-20 center">
                                                <div class="sell-btn center">
                                                    <div class="sell-icon-wrapper">
                                                        <img src="/img/lspd-tablet/evacuator-icon.png" alt="" @click="changeModalPageVeh('evacuateAuto', item)">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="table-col w-20 center">
                                                <div class="sell-btn center">
                                                    <div class="sell-icon-wrapper">
                                                        <img src="/img/lspd-tablet/search-icon2.png" alt="" @click="trackFactionCar(item.guid)">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="overlay" :class="{active: modalPage != ''}"></div>
                            <transition name="fade">
                                <div class="modal-confirm" v-if="modalPage === 'sellFractionAuto'">
                                    <div class="modal-confirm-body">
                                    Вы уверены, что хотите продать <div>{{modalData.carTitle}}</div><div>за {{modalData.carPrice | divideNumber}}$ ?</div> 
                                    </div>
                                    <div class="modal-confirm-btns">
                                        <div class="modal-confirm-btn" @click="modalPage = ''">Нет</div>
                                        <div class="modal-confirm-btn" @click="sellFactionCar(modalData.carGuid)">Да</div>
                                    </div>
                                </div>
                            </transition>
                            <transition name="fade">
                                <div class="modal-confirm" v-if="modalPage === 'evacuateAuto'">
                                    <div class="modal-confirm-body">
                                    Вы уверены, что хотите эвакуировать <div>{{modalData.carTitle}} ?</div>(Эвакуация доступна один раз в 24 часа) 
                                    </div>
                                    <div class="modal-confirm-btns">
                                        <div class="modal-confirm-btn" @click="modalPage = ''">Нет</div>
                                        <div class="modal-confirm-btn" @click="evacuateCar(modalData.carGuid)">Да</div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                    </transition>
                    <transition name="fade2">
                    <div class="main padding" v-if="mainPage === 'transportRanks'">
                         <div class="main-title text-title">Доступ к транспорту</div>
                         <div class="table-3">
                                <div class="table-caption center text-center">Панель управления доступа к транспорту</div>
                                <div class="table-header">
                                    <div class="table-h-col text-center center w-7">Ранг</div>
                                    <div class="table-h-col text-center center w-28">Должность</div>
                                    <div class="table-h-col text-center center w-26">Номер авто</div>
                                    <div class="table-h-col text-center center w-39">Марка авто</div>
                                </div>
                                <div class="table-content" style="height: 24vw">
                                    <div class="w-35 scrollable-col table-h">
                                        <div class="table-row" v-for="(item,index) in ranks" :key='index'>
                                            <div class="table-col w-20 text-center center" :class="classIsActiveRank(index)">{{item.rank}}</div>
                                            <div class="table-col w-80 text-center center" v-if="item.title" @click="rangOpenSetting(index)" :class="classIsActiveRank(index)">{{item.title}}</div>
                                            <div class="table-col w-80 text-center center" v-if="!item.title" @click="rangOpenSetting(index)" :class="classIsActiveRank(index)">У ранга нет названия</div>
                                        </div>
                                    </div>
                                    <div class="w-65 table-h scrollable-col" v-if="settingRank.rank>-1">
                                        <div class="table-row" v-for="item in factionVehicles"  :key='item.guid' >
                                            <div class="table-col w-40 text-center center" :class="vehicleStyle(item.guid)" @click="switchVehicleRank(item.guid)">{{item.number}}</div>
                                            <div class="table-col w-60 text-center center" :class="vehicleStyle(item.guid)" @click="switchVehicleRank(item.guid)">{{item.title}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-footer" v-if="needSaveRangSetting">
                                    <div class="table-save">
                                        <div class="save-body" @click="saveRankSettings()">Сохранить настройки</div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    </transition>
                </div>
                </transition>
                <transition name="fade">
                <div class="tablet-inner" v-if="page === 'memberList'">
                    <div class="sidebar">
                        <div class="sidebar-title">{{factionData.title}}</div>
                        <div class="sidebar-item" :class="{active: mainPage === 'staffList'}" @click="mainPage = 'staffList', mainPageTab = 'staffList', modalPage = ''">Список сотрудников</div>
                        <div class="sidebar-item" v-if="playerGUID === factionData.leader || adminWatch" :class="{active: mainPage === 'rankSetting'}" @click="mainPage = 'rankSetting', modalPage = ''">Настройка рангов</div>
                        <div class="sidebar-item" v-if="playerGUID === factionData.leader || adminWatch" :class="{active: mainPage === 'fractionManagment'}" @click="mainPage = 'fractionManagment', modalPage = '', statTabPage = 'warhouse2'">Управление складом</div>
                        <div class="sidebar-item" :class="{active: mainPage === 'fractionMoney'}" @click="mainPage = 'fractionMoney', modalPage = '', statTabPage = 'warhouse2'">Управление счетом</div>
                        <div class="sidebar-item" :class="{active: mainPage === 'fractionStatistics'}" @click="mainPage = 'fractionStatistics', modalPage = '', statTabPage = 'warhouse'">Статистика организации</div>
                    </div>
                    <transition name="fade2">
                    <div class="main padding" v-if="mainPage === 'staffList'">
                        <div class="main-title text-title">Список сотрудников</div>
                        <div class="stat_small">
                            <div class="stat_small-item w-big " :class="filterClass('online')" @click="activePlayersFilter='online'">
                                <div class="stat_small-item-icon">
                                    <img src="/img/lspd-tablet/icon-peoples.png" alt="">
                                </div>
                                <div class="stat_small-item-text ">
                                    <div class="ss-number colored">{{countPlayers("online")}}</div>
                                    <div class="ss-text">онлайн</div>
                                </div>
                            </div>
                            <div class="stat_small-item" :class="filterClass('offline')" @click="activePlayersFilter='offline'">
                                <div class="stat_small-item-text">
                                    <div class="ss-number">{{countPlayers("offline")}}</div>
                                    <div class="ss-text">оффлайн</div>
                                </div>
                            </div>
                            <div class="stat_small-item" :class="filterClass('all')"  @click="activePlayersFilter='all'">
                                <div class="stat_small-item-text">
                                    <div class="ss-number">{{countPlayers("all")}}</div>
                                    <div class="ss-text">всего</div>
                                </div>
                            </div>
                        </div>
                        <div class="blue-line"></div>
                        <div class="content">
                            <div class="table table-1">
                                <div class="table-header">
                                    <div class="table-head-col w-10">ID</div>
                                    <div class="table-head-col w-5" @click="changeSort('rank')">
                                        Ранг 
                                        <div class="sort">
                                            <div class="sort-up" v-if="sortParam[0]==='rank'&&sortParam[1]==='up'">&#9650;</div>
                                            <div class="sort-down" v-if="sortParam[0]==='rank'&&sortParam[1]==='down'">&#9660;</div>
                                        </div>
                                    </div>
                                    <div class="table-head-col w-20" >
                                        Должность
                                        <div class="sort">
                                            <!-- <div class="sort-up" v-if="sortParam[0]==='title'&&sortParam[1]==='up'">&#9650;</div> -->
                                            <!-- <div class="sort-down" v-if="sortParam[0]==='title'&&sortParam[1]==='down'">&#9660;</div> -->
                                        </div>
                                    </div>
                                    <div class="table-head-col w-25" @click="changeSort('name')">
                                        Имя Фамилия
                                        <div class="sort">
                                            <div class="sort-up" v-if="sortParam[0]==='name'&&sortParam[1]==='up'">&#9650;</div>
                                            <div class="sort-down" v-if="sortParam[0]==='name'&&sortParam[1]==='down'">&#9660;</div>
                                        </div>
                                    </div>
                                    
                                    <div class="table-head-col w-25" >Ранговая система</div>
                                    <div class="table-head-col w-10 f-s-12" v-if="!crimeFactionTypes.includes(factionData.type)">Выдать премию</div>
									<div class="table-head-col f-s-12" :class="getWidthColumn()">Уволить</div>
                                </div>
                                <div class="table-body">
                                    <div class="item-wrapper" v-for="(item,index) in filteredPlayers[playersPage]" :key='item.pid'>
                                        <div class="table-row">
                                            <div class="table-col w-10">{{item.pid}}</div>
                                            <div class="table-col w-5">{{(item.rank)}}</div>
                                            <div class="table-col w-20">{{getRankTitle(item.rank)}}</div> 
                                            <div class="table-col w-25">{{item.name}}
                                                <div class="info center"><img src="/img/lspd-tablet/info.png" alt="" @click="showInfo(item, index)"></div>
                                            </div>
                                            
                                            <div class="table-col w-25">
                                                <div class="w-50 center b-r" style="height: 100%" @click="playerDown(item.pid)">Понизить</div>
                                                <div class="w-50 center" style="height: 100%" @click="playerUp(item.pid)">Повысить</div> 
                                            </div>
                                            <div class="table-col w-10" v-if="!crimeFactionTypes.includes(factionData.type)"><div class="moneybag center"><img @click="openPremiaModel(item.pid, item.name)" src="/img/lspd-tablet/moneybag.png" alt=""></div></div>
											<div class="table-col colorRed" :class="getWidthColumn()" @click="playerKick(item.pid)">&#128711;</div>
										</div>
                                    </div>
                                </div>
                                <div class="table-footer">
                                    <div class="table-pagination">
                                        <div class="pag-arrow-left pag-arrow" @click="changePage(0, 'playersPage')"></div>
                                        <div class="pag-body">{{playersPage}}</div>
                                        <div class="pag-arrow-right pag-arrow" @click="changePage(1, 'playersPage', 'playersPageAll')"></div>
                                    </div>
                                </div>
                                <div class="member-info w-40" v-if="memberInfoIndex !== false">
                                    <div class="title">Данные о сотруднике:</div>
                                    <div class="item">
                                        <div class="item-name w-20">Имя:</div>
                                        <div class="item-data w-80 text-center">{{filteredPlayers[playersPage][memberInfoIndex].name}}</div>
                                    </div>
                                    <div class="item">
                                        <div class="item-name w-30">Должность:</div>
                                        <div class="item-data w-70 text-center">{{getRankTitle(filteredPlayers[playersPage][memberInfoIndex].rank)}}</div>
                                    </div>
                                    <div class="item">
                                        <div class="item-name w-70">Времени в организации:</div>
                                        <div class="item-data w-30">{{filteredPlayers[playersPage][memberInfoIndex].factionHours | divideNumber(" ")}} часов</div>
                                    </div>
                                    <div class="item">
                                        <div class="item-name w-70">Времени на текущей должности:</div>
                                        <div class="item-data w-30">{{filteredPlayers[playersPage][memberInfoIndex].rankHours | divideNumber(" ")}} часов</div>
                                    </div>
                                    <div class="item">
                                        <div class="item-name w-70">Времени сегодня:</div>
                                        <div class="item-data w-30">{{filteredPlayers[playersPage][memberInfoIndex].todayHoursFaction}} часов</div>
                                    </div>
                                    <div class="item">
                                        <div class="item-name w-70">Материалы со склада за сегодня:</div>
                                        <div class="item-data w-30">{{filteredPlayers[playersPage][memberInfoIndex].todayMats | divideNumber(" ")}} шт.</div>
                                    </div>
                                    <div class="item">
                                        <div class="item-name w-70">Деньги со склада за сегодня:</div>
                                        <div class="item-data w-30">{{filteredPlayers[playersPage][memberInfoIndex].todayMoney | divideNumber(" ")}} $ </div>
                                    </div>
                                    <div class="close" @click="hideInfo()"></div>
                                </div>
                            </div>
                            <div class="overlay" :class="{active: modalPage != ''}"></div>
                            <transition name="fade">
                                <div class="modal" v-if="modalPage === 'premia'">
                                    <div class="modal-title">Заявка на премию</div>
                                    <div class="modal-item">
                                        <div class="modal-input-title">Сумма</div>
                                        <div class="modal-input">
                                            <input type="number" v-model.number="premia.amount">
                                        </div>
                                    </div>
                                    <div class="modal-item">
                                        <div class="modal-input-title">Причина</div>
                                        <div class="modal-input">
                                            <input type="text" maxlength="50" v-model="premia.reason">
                                        </div>
                                    </div>
                                    <div class="modal-btn" @click="sendPremiaRequest()">Отправить</div>
                                    <div class="modal-close" @click="closePremiaModel()"></div>
                                </div>
                            </transition>
                        </div>
                    </div>
                    </transition>
                    <transition name="fade2">
                    <div class="main padding" v-if="mainPage === 'rankSetting'">
                        <div class="main-title text-title">Настройка рангов</div>
                        <div class="stat_small">
                            <div class="stat_small-item w-big white">
                                <div class="stat_small-item-icon">
                                    <img src="/img/lspd-tablet/icon-hz.png" alt="">
                                </div>
                                <div class="stat_small-item-text ">
                                    <div v-if="!editedRank" class="ss-number colored borderfix" data-editable="true" @click="editRankCount">{{rankCount}}</div>
                                    <input ref="rankCount" v-show="editedRank" class="ss-number input" data-editable="true" type="number" v-model.number="rankCount">
                                    <div class="ss-text">рангов</div>
                                </div>
                            </div>
                            <div class="stat_small-item darkenwhite">
                                <div class="stat_small-item-text">
                                    <div class="ss-text">доступно лидеру</div>
                                </div>
                            </div>
                        </div>
                        <div class="table-3">
                            <div class="table-caption center text-center">Панель управления рангов</div>
                            <div class="table-header">
                                <div class="table-h-col text-center center w-7">Ранг</div>
                                <div class="table-h-col text-center center w-28">Должность</div>
                                <div class="table-h-col text-center center w-26">Действие</div>
                                <div class="table-h-col text-center center w-39">Описание</div>
                            </div>
                            <div class="table-content">
                                <div class="w-35 scrollable-col table-h">
                                    <div class="table-row" v-for="(item,index) in ranks" :key='index'>
                                        <div class="table-col w-20 text-center center" :class="classIsActiveRank(index)">{{item.rank}}</div>
                                        <div class="table-col w-80 text-center center" @click="rangOpenSetting(index)" :class="classIsActiveRank(index)">
                                                <p v-if="editedTitle !== index" class="editable" data-editable="true" @click="editTitle(index)">{{item.title}}</p>
                                                <input :ref="'rankTitle'+ index " v-show="editedTitle === index" class="rankTitle" data-editable="true" type="text" v-model.trim="item.title" maxlength="20">
                                                <p v-if="!item.title && editedTitle !== index" data-editable="true" @click="editTitle(index)">У ранга нет названия</p>
                                        </div>
                                        <!-- <div class="table-col w-80 text-center center" v-if="!item.title" @click="rangOpenSetting(index)" :class="classIsActiveRank(index)"> -->
                                        <!-- </div> -->
                                    </div>
                                </div>
                                <div class="w-65 table-h scrollable-col" v-if="settingRank.rank>-1">
                                    <div class="table-row" v-for="(item,index) in actions"  :key='index' >
                                        <div class="table-col w-40 text-center center" :class="actionStyle(item.key)" @click="switchActionRank(item.key)">{{item.title}}</div>
                                        <div class="table-col w-60 overflow scrollable-col f-s-12" :class="actionStyle(item.key)" @click="switchActionRank(item.key)">{{item.description}}</div>
                                    </div>
                                </div>
                            </div>
							
							<div class="table-footer" v-if="needSaveRangSetting">
										<div class="table-save">
											<div class="save-body" @click="saveRankSettings()">Сохранить настройки</div>
										</div>
							</div>
                        </div>
                    </div>
                    </transition>
                    <div class="main padding" v-if="mainPage === 'fractionManagment'">
                        <div class="main-title text-title">Управление складом</div>
                        <div class="stat">
                            <div class="stat-item active" >
                                <div class="stat-item-icon">
                                    <div class="stat-icon-wrapper">
                                        <img src="/img/lspd-tablet/icon-mats.png" alt="">
                                    </div>
                                </div>
                                <div class="stat-item-text">
                                    <div class="main-text">{{factionData.materials | divideNumber(' ')}} / {{factionData.materialsMax | divideNumber(' ')}}</div>
                                    <div class="text">материалов</div>
                                </div>
                            </div>
                            <div class="stat-action-wrapper">
                                <div class="stat-action-btn center text-center" @click="changeStorage(1)">Открыть склад</div>
                                <div class="stat-action-btn center text-center" @click="changeStorage(0)">Закрыть склад</div>
                            </div>
                        </div>
                        <div class="content" v-if="statTabPage === 'warhouse2'">
                            <div class="table-3">
                                <div class="table-caption center text-center">Панель управления доступа к складу</div>
                                <div class="table-header">
                                    <div class="table-h-col text-center center w-7">Ранг</div>
                                    <div class="table-h-col text-center center w-28">Должность</div>
                                    <div class="table-h-col text-center center w-26">Предметы</div>
                                    <!-- <div class="table-h-col text-center center w-39">Описание</div> -->
                                </div>
                                <div class="table-content">
                                    <div class="w-35 scrollable-col table-h">
                                        <div class="table-row" v-for="(item,index) in ranks" :key='index'>
											<div class="table-col w-20 text-center center" :class="classIsActiveRank(index)">{{item.rank}}</div>
											<div class="table-col w-80 text-center center" v-if="item.title" @click="rangOpenSetting(index)" :class="classIsActiveRank(index)">{{item.title}}</div>
											<div class="table-col w-80 text-center center" v-if="!item.title" @click="rangOpenSetting(index)" :class="classIsActiveRank(index)">У ранга нет названия</div>
										</div>
                                    </div>
                                    <div class="w-65 table-h scrollable-col" v-if="settingRank.rank>-1">
										<div class="table-row" v-for="(item,index) in factionItems"  :key='item.id' >
											<div class="table-col w-40 text-center center" :class="itemStyle(item.id)" @click="switchItemRank(item.id)">{{item.title}}</div>
											<!-- <div class="table-col w-60 overflow scrollable-col f-s-12" :class="actionStyle(item.key)" @click="switchActionRank(item.key)">{{item.description}}</div> -->
										</div>
									</div>
                                </div>
                                <div class="table-footer" v-if="needSaveRangSetting">
                                    <div class="table-save">
                                        <div class="save-body" @click="saveRankSettings()">Сохранить настройки</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <transition name="fade2">
                    <div class="main padding" v-if="mainPage === 'fractionMoney'">
                        <div class="main-title text-title">Управление счетом</div>
                        <div class="stat">
                            <div class="stat-item active">
                                <div class="stat-item-icon">
                                    <div class="stat-icon-wrapper">
                                        <img src="/img/lspd-tablet/icon-moneybag.png" alt="">
                                    </div>
                                </div>
                                <div class="stat-item-text">
                                    <div class="main-text">{{ factionData.money | divideNumber }} $</div>
                                    <div class="text">в организации</div>
                                </div>
                            </div>
                        </div>
                        <div class="content">
                            <div class="caption center text-center">Панель управления доступа к счету организации</div>
                            <div class="content-body white">
                                <div class="actions">
                                    <div class="actions-btn actions-btn-1" @click="changeFactionMoney('take')">
                                        <div class="actions-btn-icon">
                                            <div class="actions-btn-icon-wrapper">
                                                <img src="/img/lspd-tablet/baks-icon.png" alt="">
                                            </div>
                                        </div>
                                        <div class="actions-btn-text">Снять деньги со счета</div>
                                    </div>
                                    <div class="actions-btn actions-btn-2" @click="changeFactionMoney('put')">
                                        <div class="actions-btn-icon">
                                            <div class="actions-btn-icon-wrapper"><img src="/img/lspd-tablet/baks-icon.png" alt=""></div>
                                        </div>
                                        <div class="actions-btn-text">Положить деньги на счет</div>
                                    </div>
                                </div>
                                <div class="inputs">
                                    <div class="inputs-item">
                                        <div class="input-name">Сумма</div>
                                        <div class="input-wrapper">
                                            <input v-model.number="changeMoneyInput" type="number">
                                        </div>
                                    </div>
                                    <div class="inputs-item">
                                        <div class="input-name">Причина</div>
                                        <div class="input-wrapper">
                                            <input type="text" maxlength="50" v-model.trim="changeMoneyReason">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </transition>
                    <transition name="fade2">
                    <div class="main padding" v-if="mainPage === 'fractionStatistics'">
                        <div class="main-title text-title">Статистика организации</div>
                        <div class="stat">
                            <div class="stat-item" @click="statTabPage = 'warhouse'" :class="{active: statTabPage === 'warhouse'}">
                                <div class="stat-item-icon">
                                    <div class="stat-icon-wrapper">
                                        <img src="/img/lspd-tablet/icon-mats.png" alt="">
                                    </div>
                                </div>
                                <div class="stat-item-text">
                                    <div class="main-text">{{factionData.materials | divideNumber(' ')}} / {{factionData.materialsMax | divideNumber(' ')}}</div>
                                    <div class="text">материалов</div>
                                </div>
                            </div>
                            <div class="stat-item" @click="statTabPage = 'moneyInfo'" :class="{active: statTabPage === 'moneyInfo'}">
                                <div class="stat-item-icon">
                                    <div class="stat-icon-wrapper">
                                        <img src="/img/lspd-tablet/icon-moneybag.png" alt="">
                                    </div>
                                </div>
                                <div class="stat-item-text">
                                    <div class="main-text">{{ factionData.money | divideNumber }} $</div>
                                    <div class="text">в организации</div>
                                </div>
                            </div>
                        </div>
                        <div class="blue-line_small"></div>
                        <div class="content" v-if="statTabPage === 'warhouse'">
                            <div class="table table-2">
                                <div class="table-caption text-center center orange">Склад</div>
                                <div class="table-header">
                                    <div class="table-h-col w-5 text-center center">№</div>
                                    <div class="table-h-col w-30 text-center center">Описание</div>
                                    <div class="table-h-col w-15 text-center center">Действие</div>
                                    <div class="table-h-col w-10 text-center center">Кол-во</div>
                                    <div class="table-h-col w-15 text-center center">Дата</div>
                                    <div class="table-h-col w-10 text-center center">Время</div>
                                    <div class="table-h-col w-30 text-center center">Имя сотрудника</div>
                                </div>
                                <div class="table-body">
                                     <div class="item-wrapper" v-for="(item, index) in filteredHistory[storagePageNumber]">
                                        <div class="table-row">
                                            <div class="table-col w-5 text-center center">{{item.index}}</div>
                                            <div class="table-col w-30 text-center center">{{item.title}}</div>
                                            <div class="table-col w-15 text-center center">{{item.type}}</div>
                                            <div class="table-col w-10 text-center center">{{item.count}}</div>
                                            <div class="table-col w-15 text-center center">{{item.date | getDate}}</div>
                                            <div class="table-col w-10 text-center center">{{item.date | getTime}}</div>
                                            <div class="table-col w-30 text-center center">{{item.name}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-footer">
                                    <div class="table-pagination">
                                        <div class="pag-arrow-left pag-arrow" @click="changePage(0, 'storagePageNumber')"></div>
                                        <div class="pag-body">{{storagePageNumber}}</div>
                                        <div class="pag-arrow-right pag-arrow" @click="changePage(1, 'storagePageNumber', 'storagePageAll')"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content" v-if="statTabPage === 'moneyInfo'">
                            <div class="table table-2">
                                <div class="table-caption text-center center lightgreen">Доходы и расходы</div>
                                <div class="table-header">
                                    <div class="table-h-col w-5 text-center center">№</div>
                                    <div class="table-h-col w-35 text-center center">Описание</div>
                                    <div class="table-h-col w-10 text-center center">Сумма</div>
                                    <div class="table-h-col w-15 text-center center">Дата</div>
                                    <div class="table-h-col w-10 text-center center">Время</div>
                                    <div class="table-h-col w-25 text-center center">Имя сотрудника</div>
                                </div>
                                <div class="table-body">
                                     <div class="item-wrapper" v-for="item in filteredMoney[moneyPageNumber]">
                                        <div class="table-row">
                                            <div class="table-col w-5 text-center center">{{item.index}}</div>
                                            <div class="table-col w-35 text-center center">{{item.reason}}</div>
                                            <div class="table-col w-10 text-center center">{{item.type === "put" ? '+' : '-'}} {{item.value | divideNumber}}</div>
                                            <div class="table-col w-15 text-center center">{{item.date | getDate}}</div>
                                            <div class="table-col w-10 text-center center">{{item.date | getTime}}</div>
                                            <div class="table-col w-25 text-center center">{{item.name}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-footer">
                                    <div class="table-pagination">
                                        <div class="pag-arrow-left pag-arrow" @click="changePage(0, 'moneyPageNumber')"></div>
                                        <div class="pag-body">{{moneyPageNumber}}</div>
                                        <div class="pag-arrow-right pag-arrow" @click="changePage(1, 'moneyPageNumber', 'moneyPageAll')"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </transition>
                </div>
                </transition>
                <transition name="fade">
                <div class="tablet-inner" v-if="page === 'lspdDB'">
                    <div class="sidebar">
                        <div class="sidebar-title">{{factionData.title}}</div>
                        <div class="sidebar-item" :class="{active: mainPage === 'home'}" @click="mainPage = 'home', mainPageTab = 'home', modalPage = ''">Розыск и <br> штрафы</div>
                        <div class="sidebar-item" @click="mainPage = 'db', modalPage = '', mainPageTab = 'toIssueDB'" :class="{active: mainPage === 'db'}">База <br> данных</div>
                    </div>
                    <transition name="fade2">
                    <div class="main padding-big" v-if="mainPage === 'home'">
                        <div class="main-title text-title">Главная страница</div>
                        <div class="main-menu">
                            <div class="main-menu-item" @click="mainPageTab = 'wantedList', modalPage = ''" :class="{active: mainPageTab === 'wantedList'}">
                                <div class="main-menu-item-icon center"><img src="/img/lspd-tablet/handcuffs.png" alt=""></div>
                                <div class="main-menu-item-text">Объявленные в розыск</div>
                            </div>
                            <div class="main-menu-item" @click="mainPageTab = 'penaltyList', modalPage = ''" :class="{active: mainPageTab === 'penaltyList'}">
                                <div class="main-menu-item-icon center"><img src="/img/lspd-tablet/hammer.png" alt=""></div>
                                <div class="main-menu-item-text">Список оштрафованных</div>
                            </div>
                            <div class="main-menu-item" @click="mainPageTab = 'search', modalPage = ''" :class="{active: mainPageTab === 'search'}">
                                <div class="main-menu-item-icon center"><img src="/img/lspd-tablet/search.png" alt=""></div>
                                <div class="main-menu-item-text">Поиск <br> по имени</div>
                            </div>
                        </div>
                        <div class="content" v-if="mainPageTab === 'home'">
                            <div class="line line-small blue"></div>
                            <div class="text-title">Розыск и штрафы</div>
                            <div class="block">
                                <div class="block-item">
                                    <div class="block-item-icon">
                                        <div class="img"><img src="/img/lspd-tablet/alarm.png" alt=""></div>
                                    </div>
                                    <div class="block-item-btn" @click="modalPage = 'addWanted'">Объявить в розыск</div>
                                    <div class="block-item-btn2" @click="modalPage = 'cancelWanted'">Снять розыск</div>
                                </div>
                                <div class="block-item">
                                    <div class="block-item-icon">
                                        <div class="img"><img src="/img/lspd-tablet/note.png" alt=""></div>
                                    </div>
                                    <div class="block-item-btn" @click="modalPage = 'getPenalty'">Выписать штраф</div>
                                    <div class="block-item-btn2" @click="modalPage = 'cancelPenalty'">Снять штраф</div>
                                </div>
                            </div>
                            <transition name="fade">
                            <div class="modal" v-if="modalPage === 'addWanted'">
                                <div class="modal-title">Объявить в розыск</div>
                                <div class="modal-item">
                                    <div class="modal-input-title">Имя Фамилия</div>
                                    <div class="modal-input">
                                        <input type="text" v-model.trim="wanted.name" maxlength="20">
                                    </div>
                                </div>
                                <div class="modal-item">
                                    <div class="modal-input-title">Причина</div>
                                    <div class="modal-input">
                                        <input type="text" v-model.trim="wanted.reason" maxlength="100">
                                    </div>
                                </div>
                                <div class="modal-item">
                                    <div class="modal-input-title">Срок</div>
                                    <div class="modal-input">
                                        <input type="number" v-model.number="wanted.time">
                                    </div>
                                </div>
                                <div class="modal-btn" @click="addWanted()">Объявить в розыск</div>
                                <div class="modal-close" @click="modalPage = ''"></div>
                            </div>
                            </transition>
                            <transition name="fade">
                            <div class="modal" v-if="modalPage === 'cancelWanted'">
                                <div class="modal-title">Снять розыск</div>
                                <div class="modal-item">
                                    <div class="modal-input-title">Имя Фамилия</div>
                                    <div class="modal-input">
                                        <input type="text" v-model.trim="cancelWanted.name" maxlength="20">
                                    </div>
                                </div>
                                <div class="modal-item">
                                    <div class="modal-input-title">Причина</div>
                                    <div class="modal-input">
                                        <input type="text" v-model.trim="cancelWanted.reason" maxlength="100">
                                    </div>
                                </div>
                                <div class="modal-item">
                                    <div class="modal-input-title">ID розыска</div>
                                    <div class="modal-input">
                                        <input type="number" v-model.number="cancelWanted.id">
                                    </div>
                                </div>
                                <div class="modal-btn" @click="removeWanted()">Снять розыск</div>
                                <div class="modal-close" @click="modalPage = ''"></div>
                            </div>
                            </transition>
                            <transition name="fade">
                            <div class="modal" v-if="modalPage === 'getPenalty'">
                                <div class="modal-title">Выписать штраф</div>
                                <div class="modal-item">
                                    <div class="modal-input-title">Имя Фамилия</div>
                                    <div class="modal-input">
                                        <input v-model.trim="penalty.name" type="text" maxlength="20">
                                    </div>
                                </div>
                                <div class="modal-item">
                                    <div class="modal-input-title">Причина</div>
                                    <div class="modal-input">
                                        <input v-model.trim="penalty.reason" type="text" maxlength="100">
                                    </div>
                                </div>
                                <div class="modal-item">
                                    <div class="modal-input-title">Сумма штрафа</div>
                                    <div class="modal-input">
                                        <input v-model.number="penalty.price" type="number">
                                    </div>
                                </div>
                                <div class="modal-btn" @click="getPenalty()">Выписать штраф</div>
                                <div class="modal-close" @click="modalPage = ''"></div>
                            </div>
                            </transition>
                            <transition name="fade">
                            <div class="modal" v-if="modalPage === 'cancelPenalty'">
                                <div class="modal-title">Убрать штраф</div>
                                <div class="modal-item">
                                    <div class="modal-input-title">Имя Фамилия</div>
                                    <div class="modal-input">
                                        <input type="text" v-model.trim="cancelPenalty.name" maxlength="20">
                                    </div>
                                </div>
                                <div class="modal-item">
                                    <div class="modal-input-title">Причина</div>
                                    <div class="modal-input">
                                        <input type="text" v-model.trim="cancelPenalty.reason" maxlength="100">
                                    </div>
                                </div>
                                <div class="modal-item">
                                    <div class="modal-input-title">ID штрафа</div>
                                    <div class="modal-input">
                                        <input type="number" v-model.number="cancelPenalty.id">
                                    </div>
                                </div>
                                <div class="modal-btn" @click="removePenalty()">Убрать штраф</div>
                                <div class="modal-close" @click="modalPage = ''"></div>
                            </div>
                            </transition>
                            <div class="overlay" :class="{active: modalPage != ''}"></div>
                        </div>
                        <div class="content" v-if="mainPageTab === 'wantedList'">
                            <div class="table wanted-table">
                                <div class="table-caption">Объявленные в розыск</div>
                                <div class="table-header">
                                    <div class="table-header-col h-col-0">ID розыска</div>
                                    <div class="table-header-col h-col-1">Имя Фамилия</div>
                                    <div class="table-header-col h-col-2">Отследить</div>
                                    <div class="table-header-col h-col-3">Причина</div>
                                    <div class="table-header-col h-col-4">Срок</div>
                                </div>
                                <div class="table-body">
                                    <div class="table-row" v-for="item in filteredWanted[wantedPageNumber]" :key="item.id">
                                        <div class="table-body-col col-0 col">{{item.id}}</div>
                                        <div class="table-body-col col-1 col">{{item.name}}</div>
                                        <div class="table-body-col col-2 col">
                                            <div class="icon-wrapper gps" @click="modalPage = 'track'">
                                                <img src="/img/lspd-tablet/gps-icon.png" alt="">
                                            </div>
                                        </div>
                                        <div class="table-body-col col-3 col scrollable-col">{{item.reason}}</div>
                                        <div class="table-body-col col-4 col">{{item.time}}</div>
                                    </div>
                                </div>
                                <div class="table-footer">
                                    <div class="table-pagination">
                                        <div class="pag-arrow-left pag-arrow" @click="changePage(0, 'wantedPageNumber')"></div>
                                        <div class="pag-body">{{wantedPageNumber}}</div>
                                        <div class="pag-arrow-right pag-arrow" @click="changePage(1, 'wantedPageNumber', 'wantedPageAll')"></div>
                                    </div>
                                </div>
                            </div>
                            <transition name="fade">
                            <div class="modal" v-if="modalPage === 'track'">
                                <div class="modal-title">Отследить по номеру телефона</div>
                                <div class="modal-item">
                                    <div class="modal-input-title">Введите номер телефона</div>
                                    <div class="modal-input">
                                        <input type="text" maxlength="6" v-model.trim="trackPhoneNumber">
                                    </div>
                                </div>
                                <div class="modal-btn" @click="trackNumber()">Отследить</div>
                                <div class="modal-close" @click="modalPage = ''"></div>
                            </div>
                            </transition>
                            <div class="overlay" :class="{active: modalPage != ''}"></div>
                        </div>
                        <div class="content" v-if="mainPageTab === 'penaltyList'">
                            <div class="table penalty-table">
                                <div class="table-caption">Список оштрафованных</div>
                                <div class="table-header violet">
                                    <div class="table-header-col h-col-0">ID штрафа</div>
                                    <div class="table-header-col h-col-1">Имя Фамилия</div>
                                    <div class="table-header-col h-col-2">Причина</div>
                                    <div class="table-header-col h-col-3">Сумма</div>
                                </div>
                                <div class="table-body">
                                    <div class="table-row" v-for="item in filteredFinesList[finesPageNumber]" :key="item.id">
                                        <div class="table-body-col col-0 col">{{item.id}}</div>
                                        <div class="table-body-col col-1 col">{{item.name}}</div>
                                        <div class="table-body-col col-2 col scrollable-col">{{item.reason}}</div>
                                        <div class="table-body-col col-3 col">{{item.price | divideNumber}}</div>
                                    </div>
                                </div>
                                <div class="table-footer">
                                    <div class="table-pagination">
                                        <div class="pag-arrow-left pag-arrow" @click="changePage(0, 'finesPageNumber')"></div>
                                        <div class="pag-body">{{finesPageNumber}}</div>
                                        <div class="pag-arrow-right pag-arrow" @click="changePage(1, 'finesPageNumber', 'finesPageAll')"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content" v-if="mainPageTab === 'search'">
                            <div class="search-title">Введите Имя и Фамилию гражданина </div>
                            <div class="search-input-wrapper">
                                <input type="text" class="search-input" v-model.trim="personName">
                                <div class="search-input-icon" @click="searchPerson()"><img src="/img/lspd-tablet/search-icon.png" alt=""></div>
                            </div>
                            <div class="search-result-title" v-if="searchByNameNotFound">Ничего не найдено</div>
                            <div class="preloader" v-if="searchByNamePreloader">
                                <div class='sk-circle-bounce'>
                                    <div class='sk-child sk-circle-1'></div>
                                    <div class='sk-child sk-circle-2'></div>
                                    <div class='sk-child sk-circle-3'></div>
                                    <div class='sk-child sk-circle-4'></div>
                                    <div class='sk-child sk-circle-5'></div>
                                    <div class='sk-child sk-circle-6'></div>
                                    <div class='sk-child sk-circle-7'></div>
                                    <div class='sk-child sk-circle-8'></div>
                                    <div class='sk-child sk-circle-9'></div>
                                    <div class='sk-child sk-circle-10'></div>
                                    <div class='sk-child sk-circle-11'></div>
                                    <div class='sk-child sk-circle-12'></div>
                                </div>
                            </div>
                            <div class="search-result" v-if="filteredSearchResult[1]">
                                <div class="search-result-title">Результаты поиска</div>
                                <div class="blue-line"></div>
                                <div class="search-table">
                                    <div class="search-result-table" v-for="(item, index) in filteredSearchResult[searchPageNumber]" :key="item.id">
                                        <div class="table-header lightorange" v-if="index % 4 === 0 && item.type === 'wanted'">
                                            <div class="table-header-col h-col-1">Имя Фамилия </div>
                                            <div class="table-header-col h-col-2">Причина розыска</div>
                                            <div class="table-header-col h-col-3">Срок</div>
                                        </div>
                                        <div class="table-row" v-if="item.type === 'wanted'">
                                            <div class="table-body-col col-1 col">{{item.name}}</div>
                                            <div class="table-body-col col-2 col scrollable-col">{{item.reason}}</div>
                                            <div class="table-body-col col-3 col">{{item.time}}</div>
                                        </div>
                                        <div class="table-header violet" v-if="index % 4 === 0 && item.type === 'fine'">
                                            <div class="table-header-col h-col-1">Имя Фамилия </div>
                                            <div class="table-header-col h-col-2">Причина штрафа</div>
                                            <div class="table-header-col h-col-3">Сумма штрафа</div>
                                        </div>
                                        <div class="table-row" v-if="item.type === 'fine'">
                                            <div class="table-body-col col-1 col">{{item.name}}</div>
                                            <div class="table-body-col col-2 col scrollable-col">{{item.reason}}</div>
                                            <div class="table-body-col col-3 col">{{item.price | divideNumber}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-footer">
                                    <div class="table-pagination">
                                        <div class="pag-arrow-left pag-arrow" @click="changePage(0, 'searchPageNumber')"></div>
                                        <div class="pag-body">{{searchPageNumber}}</div>
                                        <div class="pag-arrow-right pag-arrow" @click="changePage(1, 'searchPageNumber', 'searchPageAll')"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </transition>
                    <transition name="fade2">
                    <div class="main padding-big" v-if="mainPage === 'db'">
                        <div class="main-title">
                            <div class="text-title">База данных</div> 
                            <div class="main-menu-item m-l-a" @click="mainPageTab = 'searchDB'" :class="{active: mainPageTab === 'searchDB'}">
                                <div class="main-menu-item-icon center"><img src="/img/lspd-tablet/search-icon2.png" alt=""></div>
                                <div class="main-menu-item-text">Поиск <br> по Database</div>
                            </div>
                        </div>
                        <div class="main-menu">
                            <div class="main-menu-item" @click="mainPageTab = 'toIssueDB'" :class="{active: mainPageTab === 'toIssueDB'}">
                                <div class="main-menu-item-icon center"><img src="/img/lspd-tablet/icon1.png" alt=""></div>
                                <div class="main-menu-item-text">Database</div>
                            </div>
                            <div class="main-menu-item" @click="selectSecretPageTab('classifyDB')" :class="{active: mainPageTab === 'classifyDB'}">
                                <div class="main-menu-item-icon center"><img src="/img/lspd-tablet/icon2.png" alt=""></div>
                                <div class="main-menu-item-text">Засекретить Database</div>
                            </div>
                            <div class="main-menu-item" @click="selectSecretPageTab('classifiedDB')" :class="{active: mainPageTab === 'classifiedDB'}">
                                <div class="main-menu-item-icon center"><img src="/img/lspd-tablet/icon3.png" alt=""></div>
                                <div class="main-menu-item-text">Засекреченные Database</div>
                            </div>
                        </div>
                        <div class="content" v-if="mainPageTab === 'searchDB'">
                            <div class="search-title">Введите Имя и Фамилию гражданина</div>
                            <div class="search-input-wrapper">
                                <input type="text" class="search-input" v-model.trim="findDbPerson">
                                <div class="search-input-icon" @click="searchPersonDb()"><img src="/img/lspd-tablet/search-icon.png" alt=""></div>
                            </div>
                            <div class="search-result-title" v-if="searchDbNotFound">Ничего не найдено</div>
                            <div class="preloader" v-if="searchDbPreloader">
                                <div class='sk-circle-bounce'>
                                    <div class='sk-child sk-circle-1'></div>
                                    <div class='sk-child sk-circle-2'></div>
                                    <div class='sk-child sk-circle-3'></div>
                                    <div class='sk-child sk-circle-4'></div>
                                    <div class='sk-child sk-circle-5'></div>
                                    <div class='sk-child sk-circle-6'></div>
                                    <div class='sk-child sk-circle-7'></div>
                                    <div class='sk-child sk-circle-8'></div>
                                    <div class='sk-child sk-circle-9'></div>
                                    <div class='sk-child sk-circle-10'></div>
                                    <div class='sk-child sk-circle-11'></div>
                                    <div class='sk-child sk-circle-12'></div>
                                </div>
                            </div>
                            <div class="search-result" v-if="filteredSearchDbResult[1]">
                                <div class="search-result-title">Результаты поиска</div>
                                <!-- максимум 5 строк в таблице на одной странице -->
                                <div class="blue-line"></div>
                                <div class="search-result-table resultDB">
                                    <div class="table-header lightred">
                                        <div class="table-header-col h-col-0">№ дела</div>
                                        <div class="table-header-col h-col-1">Имя Фамилия</div>
                                        <div class="table-header-col h-col-2">Database</div>
                                        <div class="table-header-col h-col-3">Срок</div>
                                    </div>
                                    <div class="table-body">
                                        <div class="table-row" v-for="item in filteredSearchDbResult[searchDbPageNumber]" :key="item.id" @click="selectDbQuery(item)">
                                            <div class="table-body-col col-0 col">{{item.id}}</div>
                                            <div class="table-body-col col-1 col">{{item.name}}</div>
                                            <div class="table-body-col col-2 col scrollable-col">{{item.reason}}</div>
                                            <div class="table-body-col col-3 col">{{item.time}}</div>
                                        </div>
                                    </div>
                                    <div class="table-footer">
                                        <div class="table-pagination">
                                            <div class="pag-arrow-left pag-arrow" @click="changePage(0, 'searchDbPageNumber')"></div>
                                            <div class="pag-body">{{searchDbPageNumber}}</div>
                                            <div class="pag-arrow-right pag-arrow" @click="changePage(1, 'searchDbPageNumber', 'searchDbPageAll')"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content" v-if="mainPageTab === 'toIssueDB'">
                            <div class="table penalty-table">
                                <div class="table-caption">Список дел</div>
                                <div class="table-header orange">
                                    <div class="table-header-col h-col-0">№ дела</div>
                                    <div class="table-header-col h-col-1">Имя Фамилия </div>
                                    <div class="table-header-col h-col-2">Причина</div>
                                    <div class="table-header-col h-col-3">Срок</div>
                                </div>
                                <div class="table-body">
                                    <div class="table-row" v-for="item in filteredDatabase[databasePageNumber]" :key="item.id" @click="selectDbQuery(item)">
                                        <div class="table-body-col col-0 col">{{item.id}}</div>
                                        <div class="table-body-col col-1 col">{{item.name}}</div>
                                        <div class="table-body-col col-2 col scrollable-col">{{item.reason}}</div>
                                        <div class="table-body-col col-3 col">{{item.time}}</div>
                                    </div>
                                </div>
                                <div class="table-footer">
                                    <div class="table-pagination">
                                        <div class="pag-arrow-left pag-arrow" @click="changePage(0, 'databasePageNumber')"></div>
                                        <div class="pag-body">{{databasePageNumber}}</div>
                                        <div class="pag-arrow-right pag-arrow" @click="changePage(1, 'databasePageNumber', 'databasePageAll')"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content" v-if=" mainPageTab === 'dbQuery'">
                            <div class="preloader" v-if="dbQueryPreloader">
                                <div class='sk-circle-bounce'>
                                    <div class='sk-child sk-circle-1'></div>
                                    <div class='sk-child sk-circle-2'></div>
                                    <div class='sk-child sk-circle-3'></div>
                                    <div class='sk-child sk-circle-4'></div>
                                    <div class='sk-child sk-circle-5'></div>
                                    <div class='sk-child sk-circle-6'></div>
                                    <div class='sk-child sk-circle-7'></div>
                                    <div class='sk-child sk-circle-8'></div>
                                    <div class='sk-child sk-circle-9'></div>
                                    <div class='sk-child sk-circle-10'></div>
                                    <div class='sk-child sk-circle-11'></div>
                                    <div class='sk-child sk-circle-12'></div>
                                </div>
                            </div>
                             <div class="case-form" v-if="policeCase">
                                <div class="case-form-header">
                                    <div class="case-form-title">Дело № {{policeCase.id}}</div>
                                </div>
                                <div class="case-form-list">
                                    <div class="case-form-list-left">
                                        <div class="case-form-list-item">
                                            <div class="case-form-item-title">Имя:</div>
                                            <div class="case-form-item-title fw100">{{policeCase.name}}</div>
                                        </div>
                                        <div class="case-form-list-item">
                                            <div class="case-form-item-title">Паспорт:</div>
                                            <div class="case-form-item-title fw100">
                                                    111 222
                                            </div>
                                        </div>
                                        <div class="case-form-list-item">
                                            <div class="case-form-item-title">Лицензии:</div>
                                            <div class="case-form-item-title fw100">
                                                    {{policeCase.license}}
                                            </div>
                                        </div>
                                        <div class="case-form-list-item">
                                            <div class="case-form-item-title">Место жительства:</div>
                                            <div class="case-form-item-title fw100">
                                                   {{policeCase.location}}
                                            </div>
                                        </div>
                                        <div class="case-form-list-item">
                                            <div class="case-form-item-title">Телефон:</div>
                                            <div class="case-form-item-title fw100">
                                                    {{policeCase.phoneNumber}}
                                            </div>
                                        </div>
                                        <div class="case-form-list-item">
                                            <div class="case-form-item-title">Транспорт и номера:</div>
                                            <div class="case-form-item-title overflow scrollable-col fw100" style="height: 2vw; width: 14vw">
                                                    {{policeCase.vehicles}}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="case-form-list-right">
                                        <div class="case-form-list-item">
                                            <div class="case-form-item-title">Статус дела</div>
                                            <div class="case-form-item-status orange" v-if="policeCase.secret">
                                                Засекречено
                                            </div>
                                            <div class="case-form-item-status blue2" v-else>
                                                Общий
                                            </div>
                                        </div>
                                        <div class="case-form-list-item">
                                            <div class="case-form-item-title">Дата последнего обновления:</div>
                                            <div class="case-form-item-title fw100">{{policeCase.lastTime}}</div>
                                        </div>
                                        <div class="case-form-list-item">
                                            <div class="case-form-item-title">Список судимостей:</div>
                                            <div class="case-form-item-title overflow scrollable-col fw100" style="height: 8vw; width: 14vw">{{policeCase.reasons}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content" v-if=" mainPageTab === 'classifyDB'">
                            <div class="blue-line" style="margin-bottom: 1.41vw"></div>
                            <div class="search-title">Введите номер дела, чтобы засекретить его</div>
                            <div class="search-input-wrapper">
                                <input type="text" class="search-input" v-model.number="hideCaseId">
                                <div class="search-input-icon" @click="openHideCaseModal()"><img src="/img/lspd-tablet/icon-lock.png" alt=""></div>
                            </div>
                            <transition name="fade">
                            <div class="modal-confirm" v-if="modalPage === 'classifyConfirm'">
                                <div class="modal-confirm-body">
                                    Вы уверены, что <br> хотите засекретить дело?
                                </div>
                                <div class="modal-confirm-btns">
                                    <div class="modal-confirm-btn" @click="hideCase()">Да</div>
                                    <div class="modal-confirm-btn" @click="modalPage = ''">Нет</div>
                                </div>
                            </div>
                            </transition>
                            <div class="overlay" :class="{active: modalPage != ''}"></div>
                        </div>
                        <div class="content" v-if=" mainPageTab === 'classifiedDB'">
                             <div class="table penalty-table">
                                <div class="table-caption">Список засекреченных дел</div>
                                <div class="table-header orange">
                                    <div class="table-header-col h-col-0">№ дела</div>
                                    <div class="table-header-col h-col-1">Имя Фамилия</div>
                                    <div class="table-header-col h-col-2">Причина</div>
                                    <div class="table-header-col h-col-3">Срок</div>
                                </div>
                                <div class="table-body">
                                    <div class="table-row" v-for="item in filteredSecretDatabase[databaseSecretPageNumber]" :key="item.id" @click="selectDbQuery(item)">
                                        <div class="table-body-col col-0 col">{{item.id}}</div>
                                        <div class="table-body-col col-1 col">{{item.name}}</div>
                                        <div class="table-body-col col-2 col scrollable-col">{{item.reason}}</div>
                                        <div class="table-body-col col-3 col">{{item.time}}</div>
                                    </div>
                                </div>
                                <div class="table-footer">
                                    <div class="table-pagination">
                                        <div class="pag-arrow-left pag-arrow" @click="changePage(0, 'databaseSecretPageNumber')"></div>
                                        <div class="pag-body">{{databaseSecretPageNumber}}</div>
                                        <div class="pag-arrow-right pag-arrow" @click="changePage(1, 'databaseSecretPageNumber', 'databaseSecretPageAll')"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </transition>
                </div>
                </transition>
                <transition name="fade">
                <div class="tablet-inner" v-if="page === 'calls'">
                    <div class="sidebar">
                        <div class="sidebar-title">{{factionData.title}}</div>
                        <div class="sidebar-item" :class="{active: mainPage === 'callsList'}" @click="mainPage = 'callsList', mainPageTab = 'callsList', modalPage = ''">Список <br> вызовов</div>
                    </div>
                    <transition name="fade2">
                    <div class="main padding">
                        <div class="main-title text-title">Диспетчерская</div>
                        <div class="blue-line_small"></div>
                        <div class="content" v-if="statTabPage === 'warhouse'">
                            <div class="table table-2">
                                <div class="table-caption text-center center green">Список вызовов</div>
                                <div class="table-header">
                                    <div class="table-h-col w-5 text-center center">№</div>
                                    <div class="table-h-col w-30 text-center center">Описание</div>
                                    <div class="table-h-col w-10 text-center center">Время</div>
                                    <div class="table-h-col w-25 text-center center">Имя вызвавшего</div>
                                    <div class="table-h-col w-20 text-center center">Действие</div>
                                    <div class="table-h-col w-10 text-center center">Чел. на вызове</div>
                                </div>
                                <div class="table-body">
                                    <div class="item-wrapper">
                                        <div class="table-row" v-for="(call, index) in filteredCalls[callsPage]">
                                            <div class="table-col w-5 text-center center">{{ call.id }}</div>
                                            <div class="table-col w-30 overflow scrollable-col" style="padding-left: 0.47vw">{{call.description}}</div>
                                            <div class="table-col w-10 text-center center">{{call.time}}</div>
                                            <div class="table-col w-25 text-center center">{{call.name}}</div>
                                            <div class="table-col w-20 text-center center">
                                                <div class="w-50 center text-center green h100 text-white" @click="callAccept(call.id)">Принять</div>
                                                <div class="w-50 center text-center lightred h100 text-white" @click="callDecline(call.id)">Отклонить</div>
                                            </div>
                                            <div class="table-col w-10 text-center center">{{call.acceptedList.length}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-footer">
                                    <div class="table-pagination">
                                        <div class="pag-arrow-left pag-arrow" @click="changePage(0,'callsPage')"></div>
                                        <div class="pag-body">{{callsPage}}</div>
                                        <div class="pag-arrow-right pag-arrow" @click="changePage(1, 'callsPage', 'callsPageAll')"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </transition>
                </div>
                </transition>
                <transition name="fade">
                <div class="tablet-inner" v-if="page === 'announcing'">
                    <div class="sidebar">
                        <div class="sidebar-title">Доска объявлений</div>
                        <div class="sidebar-item" :class="{active: announcingPageTab === 1}" @click="announcingPageTab = 1, modalPage = ''">Написать объявление</div>
                        <div class="sidebar-item" :class="{active: announcingPageTab === 2}" @click="announcingPageTab = 2, modalPage = ''">Список объявлений</div>
                    </div>
                    <transition name="fade2">
                    <div class="main padding" v-if="announcingPageTab === 1">
                        <div class="main-title text-title">Написать объявление</div>
                        <div class="blue-line_small"></div>
                        <div class="caption_new orange"></div>
                        <div class="content">
                            <div class="announcing-create">
                                <input placeholder="Тема объявления" type="text" class="announcing-title" maxlength="20" v-model.trim='createAnnounce.title'>
                                <textarea placeholder="Текст объявления" class="announcing-body" maxlength="500" v-model.trim='createAnnounce.msg'></textarea>
                            </div>
                            <div class="announcing-back">
                                <div class="announcing-back-btn" @click="sendAnnounce()">Подать объявление</div>
                            </div>
                        </div>
                    </div>
                    </transition>
                    <transition name="fade2">
                    <div class="main padding" v-if="announcingPageTab === 2">
                        <div class="main-title text-title">Список объявлений</div>
                        <div class="blue-line_small"></div>
                        <div class="caption_new orange">Доступные объявления</div>
                        <div class="content" >
                            <div class="announcing-list">
                                <div class="announcing-item" @click="selectAnnouncement(announce)" v-for="announce in announcement[announcementPageNumber]" :key="announce.id">
                                    <div class="announcing-left">
                                        <div class="announcing-avatar">
                                            <img src="/img/phone/avatar-big.png" alt="">
                                        </div>
                                    </div>
                                    <div class="announcing-main">
                                        <div class="announcing-main-top">
                                            <div class="announcer-name">{{announce.playerName}}</div>
                                            <div class="announce-date">{{announce.date.time}}</div>
                                            <div class="announce-date">{{announce.date.date}}</div>
                                        </div>
                                        <div class="announcing-main-bot">
                                            <div class="announcing-text-preview">{{announce.title}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="table-pagination">
                                <div class="pag-arrow-left pag-arrow" @click="changePage(0,'announcementPageNumber')"></div>
                                <div class="pag-body">{{announcementPageNumber}}</div>
                                <div class="pag-arrow-right pag-arrow" @click="changePage(1,'announcementPageNumber', 'announcementPageAll')"></div>
                            </div>
                        </div>
                    </div>
                    </transition>
                    <transition name="fade">
                    <div class="main padding" v-if="announcingPageTab === 3">
                        <div class="main-title text-title">Просмотр объявления</div>
                        <div class="blue-line_small"></div>
                        <div class="caption_new orange"></div>
                        <div class="content">
                            <div class="announcing-create announcing-show">
                                <div class="announcing-title d-flex sp-bw">
                                    <div>{{selectedAnnounce.playerName}}</div>
                                    <div class="announce-date d-flex mr0">
                                        <div>{{selectedAnnounce.date.time}}</div>
                                        <div class="ml">{{selectedAnnounce.date.date}}</div>
                                    </div>
                                </div>
                                <div class="announcing-title">{{selectedAnnounce.title}}</div>
                                <div class="announcing-body">{{selectedAnnounce.msg}}</div>
                            </div>
                            <div class="announcing-back">
                                <div class="announcing-back-btn" @click="announcingPageTab = 2">Вернуться назад</div>
                            </div>
                        </div>
                    </div>
                    </transition>
                </div>
                </transition>
                <transition name="fade">
                <div class="tablet-inner weazel" v-if="page === 'wn'">
                    <div class="header"><div class="wn-header-icon"><img src="/img/lspd-tablet/weazel-head.png" alt=""></div></div>
                    <div class="body">
                        <div class="news-list">
                            <div class="news-item" v-for="(ad, i) in adsList" :key="i">
                                <div class="news-item-left">
                                    <div class="news-item-text">{{ad.text}}</div>
                                </div>
                                <div class="news-item-right">
                                    <div class="news-item-btn y" @click="startEditAd(ad.id, ad.text,'edit')">Редактировать</div>
                                    <div class="news-item-btn r" @click="startEditAd(ad.id, ad.text,'reject')">Отклонить</div>
                                    <div class="news-item-btn g" @click="sendAd(ad.id)">Подать</div>
                                </div>
                            </div>
                        </div>
                        <transition name="fade">
                        <div class="w-modal" v-if="weazelModal === 'edit'">
                            <div class="w-modal-header">
                                Редактирование
                            </div>
                            <div class="w-modal-body">
                                <textarea class="w-modal-text" v-model.trim="editedAd" maxlength="60"></textarea>
                            </div>
                            <div class="w-modal-footer">
                                <div class="w-modal-btn" @click="sendAd()">Ок</div>
                                <div class="w-modal-btn" @click="stopEditAd()">Отменить</div>
                            </div>
                        </div>
                        </transition>
                        <transition name="fade">
                        <div class="w-modal reject" v-if="weazelModal === 'reject'">
                            <div class="w-modal-header">
                                Причина отклонения
                            </div>
                            <div class="w-modal-body">
                                <input type="text" class="w-modal-text" v-model.trim="rejectReason" maxlength="60">
                            </div>
                            <div class="w-modal-footer">
                                <div class="w-modal-btn" @click="rejectAd()">Ок</div>
                                <div class="w-modal-btn" @click="stopEditAd()">Отменить</div>
                            </div>
                        </div>
                        </transition>
                        <div class="overlay" :class="{active: weazelModal != ''}"></div>
                    </div>
                </div>
                </transition>
                <transition name="fade">
                <div class="tablet-inner announcing2" v-if="page === 'announcing2'">
                    <div class="header"><div class="header-title">Публикация новостей</div></div>
                    <div class="body">
                        <div class="message">
                            <textarea class="textarea" v-model.trim='createNew.New'></textarea>
                        </div>
                        <div class="message-action">
                            <div class="message-btn" @click="sendNew()">Опубликовать</div>
                        </div>
                    </div>
                </div>
                </transition>
                <div class="home-btn" @click="openApp('homescreen')">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters,mapActions } from "vuex";

export default {
    data(){
        return{
            modalPage: '',
            mainPageTab: 'home',
            mainPage: 'home',
            page: 'homescreen',
            memberInfoIndex: false,
            statTabPage: 'warhouse',
            isActive: -1,
            changeMoneyInput: null,
            changeMoneyReason: "",
            storagePageNumber: 1,
            storagePageAll: 1,
            callsPage: 1,
            callsPageAll: 1,
            editedTitle: null,
            editedRank: false,
            activePlayersFilter: "online",
            playersPage: 1,
            playersPageAll: 1,
			sortParam:['null','null'],
            finesPageNumber: 1,
            finesPageAll: 1,
            wantedPageNumber: 1,
            wantedPageAll: 1,
            searchPageNumber: 1,
            searchPageAll: 1,
            databasePageNumber: 1,
            databasePageAll: 1,
            databaseSecretPageNumber: 1,
            databaseSecretPageAll: 1,
            searchDbPageNumber: 1,
            searchDbPageAll: 1,
            announcingPageTab: 1,
            announcementPageAll:1,
            announcementPageNumber:1,
            moneyPageAll:1,
            moneyPageNumber:1,
            selectedAnnounce: {},
            createAnnounce: {
                title:'',
                msg:'',
            },
            createNew: {
                New:''
            },
            
			settingRank:[],
			needSaveRangSetting: false,
            
            penalty: {
                name: "",
                reason: "",
                price: ""
            },
            cancelPenalty: {
                name: "",
                reason: "",
                id: "",
            },
            wanted: {
                name: "",
                reason: "",
                time: ""
            },
            cancelWanted: {
                name: "",
                reason: "",
                id: "",
            },
            personName: "",
            searchByNamePreloader: false,
            searchByNameNotFound: false,
            searchDbNotFound: false,
            searchDbPreloader: false,
            findDbPerson: "",
            hideCaseId: "",
            dbQuery:{
                secret: 0,
            },
            dbQueryPreloader: false,
            modalData: {
                carGuid: null,
                carTitle: null,
                carPrice: null,
            },
            vehiclesSort: ['null','null'],
            crimeFactionTypes: ['mafia', 'band'],
            premia: {
                amount: '',
                reason: '',
                playerGuid: '',
                playerName: '',
            },
            weazelModal: '',
            editedAd:'',
            editedAdId: '',
            rejectReason: '',
            trackPhoneNumber: '',
        }
    },
	computed: {
		...mapGetters({
				playerGUID: "getGUID",
				factionData: "getFactionData",
				players: "getFactionPlayers",
				ranks: "getFactionRanks",
				actions: "getFactionActions",
                adsList: "getWeazelNewsAdsUnedited",
                declinedCalls: "getDeclinedCalls",
                adminWatch: "getAdminWatchTablet",
			}),
        filteredHistory: function () {
            let final = {};
            let num = 1;
            this.storagePageAll = 1;
            this.$store.state.Faction.storageHistory.forEach((i,index,arr)=>{
                if (!final[this.storagePageAll]){
                    final[this.storagePageAll] = []
                }
                i.index = num;
                num++
                final[this.storagePageAll].push(i)
                if (final[this.storagePageAll].length === 9 && index<arr.length - 1){
                    this.storagePageAll++
                }    
            })
            return final
        },
        filteredCalls: function () {
            let final = {};
            let num = 1;
            this.callsPageAll = 1;
            let calls = this.$store.state.Faction.calls;
            calls = calls.filter(c=> c.type === this.factionData.type && !this.declinedCalls.includes(c.id));
            calls.forEach((i,index,arr)=>{
                if (!final[this.callsPageAll]){
                    final[this.callsPageAll] = []
                }
                i.index = num;
                num++
                final[this.callsPageAll].push(i)
                if (final[this.callsPageAll].length === 10 && index<arr.length - 1){
                    this.callsPageAll++
                }    
            })
            return final
        },
        factionItems: function () {
            let final = [];
            for (const key in this.$store.state.Faction.storage) {
                if (Array.isArray(this.$store.state.Faction.storage[key])) {
                    final = final.concat(this.$store.state.Faction.storage[key])
                }
            }
            return final;
        },
        rankCount: {
            get: function () {
                return this.$store.state.Faction.ranks.length;
            },
            set: function (n) {
                if (!n || n <= 0) return;
                if (n > 28) return storage.addNotification({text: "Максимальное кол-во рангов 28",theme: "error"});
                const playerRanks = [];
                this.$store.state.Faction.players.forEach(p=>{
                    playerRanks.push(p.rank);
                })
                const maxRank = Math.max(...playerRanks);
                if (n < maxRank) {
                    return storage.addNotification({text: "Понизьте ранги членов вашей фракции, чтобы установить такое количество рангов",theme: "error"});
                }
                const ranksCount = this.$store.state.Faction.ranks.length
                if (n < ranksCount) {
                    const deleteRanks = ranksCount - n;
                    for (let i = ranksCount - 1; i>n-1; i-- ) {
                        this.$store.state.Faction.ranks.splice(i, 1);
                    }
                } else if (n > ranksCount) {
                    const addRanks = n - ranksCount
                    for(let i = 0;i < addRanks; i++) {
                        const emptyRank = {
                            rank: this.$store.state.Faction.ranks[this.$store.state.Faction.ranks.length-1].rank + 1,
                            title: "",
                            actions: [],
                            items: [],
                            vehicles: [],
                        }
                        this.$store.state.Faction.ranks.push(emptyRank)
                    }
                }
                this.settingRank = [];
                this.isActive = -1;
                this.needSaveRangSetting = true;
            }
        },
        filteredPlayers: function() {
            let final = {};
            this.playersPageAll = 1;
            this.playersPage = 1;
            let allPlayers = this.$store.state.Faction.players;

            if (this.activePlayersFilter === "online") {
                allPlayers = allPlayers.filter(p=>p.online)
            } else if (this.activePlayersFilter === "offline") {
                allPlayers = allPlayers.filter(p=>!p.online)
            }
            const sortParam = this.sortParam[0];
            const sortType = this.sortParam[1];
            if (sortParam !== "null") {
                if (sortParam === "rank") {
                    if (sortType === "up") {
                        allPlayers.sort(sortRankUp);
                    } else if (sortType === "down") {
                        allPlayers.sort(sortRankDown);
                    }
                } else if (sortParam === "name") {
                    if (sortType === "up") {
                        allPlayers.sort(sortNameUp);
                    } else if (sortType === "down") {
                        allPlayers.sort(sortNameDown);
                    }
                }
            }
            
            allPlayers.forEach((i,index,arr)=>{
                if (!final[this.playersPageAll]){
                    final[this.playersPageAll] = []
                }
                final[this.playersPageAll].push(i)
                if (final[this.playersPageAll].length === 10 && index<arr.length - 1){
                    this.playersPageAll++
                }    
            })
            return final
        },
        filteredFinesList: function () {
            let final = {};
            this.finesPageAll = 1;
            this.$store.state.Faction.finesList.forEach((i,index,arr)=>{
                if (!final[this.finesPageAll]){
                    final[this.finesPageAll] = []
                }
                final[this.finesPageAll].push(i)
                if (final[this.finesPageAll].length === 8 && index<arr.length - 1){
                    this.finesPageAll++
                }    
            })
            return final
        },
        filteredWanted: function () {
            let final = {};
            this.wantedPageAll = 1;
            this.$store.state.Faction.wantedList.forEach((i,index,arr)=>{
                if (!final[this.wantedPageAll]){
                    final[this.wantedPageAll] = []
                }
                final[this.wantedPageAll].push(i)
                if (final[this.wantedPageAll].length === 8 && index<arr.length - 1){
                    this.wantedPageAll++
                }    
            })
            return final
        },
        filteredSearchResult: function () {
            this.searchPageAll = 1;
            if (this.$store.state.Faction.searchResult.length > 0) {
                this.searchByNamePreloader = false;
            }
            if (this.$store.state.Faction.searchResult === false) {
                this.searchByNameNotFound = true;
                this.searchByNamePreloader = false;
                return [];
            }
            this.searchByNameNotFound = false;
            let final = {};
            const wanted = this.$store.state.Faction.searchResult.filter(x=>x.type==="wanted");
            const fines =  this.$store.state.Faction.searchResult.filter(x=>x.type==="fine");
            wanted.forEach((i,index,arr)=>{
                if (!final[this.searchPageAll]){
                    final[this.searchPageAll] = []
                }
                final[this.searchPageAll].push(i)
                if (final[this.searchPageAll].length === 4 && index<arr.length - 1){
                    this.searchPageAll++
                }    
            })
            if (fines.length > 0 && wanted.length > 0){
                this.searchPageAll++;
            }
            fines.forEach((i,index,arr)=>{
                if (!final[this.searchPageAll]){
                    final[this.searchPageAll] = []
                }
                final[this.searchPageAll].push(i)
                if (final[this.searchPageAll].length === 4 && index<arr.length - 1){
                    this.searchPageAll++
                }    
            })
            return final
        },
        filteredDatabase: function () {
            let final = {};
            this.databasePageAll = 1;
            const unSecretDb = this.$store.state.Faction.policeDb.filter(db => !db.secret)
            unSecretDb.forEach((i,index,arr)=>{
                if (!final[this.databasePageAll]){
                    final[this.databasePageAll] = []
                }
                final[this.databasePageAll].push(i)
                if (final[this.databasePageAll].length === 8 && index<arr.length - 1){
                    this.databasePageAll++
                }    
            })
            return final
        },
        filteredSecretDatabase: function () {
            this.databaseSecretPageAll = 1;
            let final = {};
            const unSecretDb = this.$store.state.Faction.policeDb.filter(db => db.secret)
            unSecretDb.forEach((i,index,arr)=>{
                if (!final[this.databaseSecretPageAll]){
                    final[this.databaseSecretPageAll] = []
                }
                final[this.databaseSecretPageAll].push(i)
                if (final[this.databaseSecretPageAll].length === 8 && index<arr.length - 1){
                    this.databaseSecretPageAll++
                }    
            })
            return final
        },
        filteredSearchDbResult: function () {
            this.searchDbPageAll = 1;
            if (this.$store.state.Faction.searchDbResult.length > 0) {
                this.searchDbPreloader = false;
            }
            if (this.$store.state.Faction.searchDbResult === false) {
                this.searchDbNotFound = true;
                this.searchDbPreloader = false;
                return [];
            }
            this.searchDbNotFound = false;
            let final = {};
            this.$store.state.Faction.searchDbResult.forEach((i,index,arr)=>{
                if (!final[this.searchDbPageAll]){
                    final[this.searchDbPageAll] = []
                }
                final[this.searchDbPageAll].push(i)
                if (final[this.searchDbPageAll].length === 5 && index<arr.length - 1){
                    this.searchDbPageAll++
                }    
            })
            return final
        },
        policeCase: function () {
            let data = this.$store.state.Faction.policeCase;
            let crimes = data.crimes;
            if (crimes.length === 0) return;

            let reasons = "";
            let license = "";
            let vehicles = "";
            if (this.factionData.guid !== 25) crimes = crimes.filter(c => !c.secret);
            crimes.forEach((item, index, array) => {
                reasons += item.reason + " - " + item.time;
                if (index !== array.length - 1) reasons += " / ";
            });
            data.license.forEach((item, index, array) => {
                license += item.title;
                if (index !== array.length - 1) license += " / ";
            });
            data.vehicles.forEach((item, index, array) => {
                vehicles += item.title + " - " + item.numberPlate;
                if (index !== array.length - 1) vehicles += " / ";
            });
            if (!license) license = "НЕТ";
            if (!vehicles) vehicles = "НЕТ";
            const lastTime = convertDate(crimes[0].data);
            const phoneNumber = crimes[0].phoneNumber;
            const location = crimes[0].location;

            this.dbQuery = Object.assign(this.dbQuery, { reasons, license, vehicles, lastTime, phoneNumber, location });
            this.dbQueryPreloader = false;
            return this.dbQuery;
    	},
        factionVehicles: function () {
            const sortedVeh = this.$store.state.Faction.vehicles;
            const sortParam = this.sortParam[0];
            const sortType = this.sortParam[1];
            if (sortParam !== "null") {
                if (sortParam === "price") {
                    if (sortType === "up") {
                        sortedVeh.sort(sortPriceUp);
                    } else if (sortType === "down") {
                        sortedVeh.sort(sortPriceDown);
                    }
                } else if (sortParam === "title") {
                    if (sortType === "up") {
                        sortedVeh.sort(sortTitleUp);
                    } else if (sortType === "down") {
                        sortedVeh.sort(sortTitleDown);
                    }
                }
            }
            return sortedVeh;
        },
        announcement: function () {
            let final = {};
            this.announcementPageAll = 1;
            this.$store.state.Faction.announcement.forEach((i,index,arr)=>{
                if (!final[this.announcementPageAll]){
                    final[this.announcementPageAll] = []
                }
                final[this.announcementPageAll].push(i)
                if (final[this.announcementPageAll].length === 5 && index<arr.length - 1){
                    this.announcementPageAll++
                }    
            })
            return final
        },
        filteredMoney: function () {
            let final = {};
            let num = 1;
            this.moneyPageAll = 1;
            this.$store.state.Faction.moneyHistory.forEach((i,index,arr)=>{
                if (!final[this.moneyPageAll]){
                    final[this.moneyPageAll] = []
                }
                i.index = num;
                num++
                final[this.moneyPageAll].push(i)
                if (final[this.moneyPageAll].length === 9 && index<arr.length - 1){
                    this.moneyPageAll++
                }    
            })
            return final
        },
    },
    methods:{
		openApp(app){
			if(app === 'homescreen'){
                if (this.page === 'homescreen') return this.exit()
				this.page = app;
				this.modalPage = '';
				this.mainPageTab = 'home';
				this.mainPage = 'home';
				return;
			}
			
			if(app === 'memberList'){
				this.page = app;
				this.modalPage = '';
				this.mainPageTab = 'staffList';
				this.mainPage = 'staffList';
				return;
			}
			
			if(app === 'lspdDB'){
				this.page = app;
				this.modalPage = '';
				this.mainPageTab = 'home';
				this.mainPage = 'home';
				return;
			}
			
			if(app === 'calls'){
				this.page = app;
				this.modalPage = '';
				this.mainPageTab = 'callsList';
				this.mainPage = 'callsList';
				return;
			}

            if(app === "transport") {
                this.page = app;
                this.mainPageTab = app;
                this.mainPage = app;
                this.modalPage = '';
                return;
            }
			
			storage.addNotification({text: "Ошибка: приложение не найдено",theme: "error"});
		},
	
	
        showInfo(data, index){
            if (this.adminWatch) {
                mp.trigger("cMisc-CallServerEvent", "sFactionGetPlayerData", data.pid, this.factionData.guid);
            } else {
                mp.trigger("cMisc-CallServerEvent", "sFactionGetPlayerData", data.pid);
            }
            this.memberInfoIndex = index;
        },
        hideInfo(){
            this.memberInfoIndex = false
        },
		selectPage(p){
			this.select = p;
		},
		secondPage(p){
			this.selectSecond = p;
		},
		classIsActiveRank(key){
			if(key === this.isActive) return 'blue3';
		},
		rangOpenSetting(index){
			this.isActive = index;
			this.settingRank = this.ranks[index];
		},
		actionStyle(key){
			if(this.settingRank.actions.indexOf(key)>-1) return 'green2';
			//else return 'actionOff';
		},
        itemStyle(id) {
            if(this.settingRank.items.indexOf(id)>-1) return 'green2';
        },
        vehicleStyle(id) {
            if(this.settingRank.vehicles.indexOf(id)>-1) return 'green2';
        },
		playerUp(id){
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
			mp.trigger("cMisc-CallServerEvent", "sFactionNewRank", id,"up");
		},
		playerDown(id){
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
			mp.trigger("cMisc-CallServerEvent", "sFactionNewRank", id,"down");
		},
        playerKick(id){
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            mp.trigger("cMisc-CallServerEvent", "sFactionKick", id);
        },
		switchActionRank(key){
			this.needSaveRangSetting = true;
			let newRanks = this.ranks;
			let indexRank = this.ranks.findIndex((r)=>r.rank === this.settingRank.rank);
			let searchIndex = newRanks[indexRank].actions.indexOf(key);
			if(searchIndex>-1){
				delete newRanks[indexRank].actions[searchIndex];
				newRanks[indexRank].actions = newRanks[indexRank].actions.filter(function(e){return e}); 
			}else{
				newRanks[indexRank].actions.push(key);
			}
			storage.setFactionRanks(newRanks);
		},
        switchItemRank(id) {
            this.needSaveRangSetting = true;
            let newRanks = this.ranks;
            let indexRank = this.ranks.findIndex((r)=>r.rank === this.settingRank.rank);
            let searchIndex = newRanks[indexRank].items.indexOf(id);
            if(searchIndex>-1){
                delete newRanks[indexRank].items[searchIndex];
                newRanks[indexRank].items = newRanks[indexRank].items.filter(function(e){return e}); 
            }else{
                newRanks[indexRank].items.push(id);
            }
            storage.setFactionRanks(newRanks);
        },
        switchVehicleRank(id) {
            this.needSaveRangSetting = true;
            let newRanks = this.ranks;
            let indexRank = this.ranks.findIndex((r)=>r.rank === this.settingRank.rank);
            let searchIndex = newRanks[indexRank].vehicles.indexOf(id);
            if(searchIndex>-1){
                newRanks[indexRank].vehicles.splice(searchIndex, 1)
            }else{
                newRanks[indexRank].vehicles.push(id);
            }
            storage.setFactionRanks(newRanks);
        },
		saveRankSettings(){
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            for (const rank of this.ranks) {
                if (!rank.title) return storage.addNotification({ text: "Все ранги должны иметь названия", theme: "error" });
            }
			var sendData = {
				factionData: this.factionData,
				ranks: this.ranks
			}
			
			mp.trigger("cMisc-CallServerEvent", "sFactionSave", JSON.stringify(sendData));
            this.needSaveRangSetting = false;
            this.editedTitle = null;
            this.editedRank = false;
            this.isActive = -1;
            this.settingRank = [];
		},
		exit: function() {
            storage.setAdminWatchTablet(false);
			mp.trigger("cSetPage","none");
            mp.trigger("cMisc-CallServerEvent", "sPlayerAddAtachment", "tablet", true);
            mp.trigger("cMisc-CallServerEvent", "sPlayer-setAnimation", "smoothCancel");
		},
		onKeyDown(e) {
			if( e.keyCode === 27){
				this.exit();
			}
		},
        changeFactionMoney(type) {
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            if (!this.changeMoneyInput || this.changeMoneyInput <= 0) return storage.addNotification({ text: "Введите сумму", theme: "error" });
            if (!this.changeMoneyReason) return storage.addNotification({ text: "Введите причину", theme: "error" });
            const sendData = {
                money: this.changeMoneyInput,
                reason: this.changeMoneyReason,
                type: type,
            }
            this.changeMoneyInput = "";
            this.changeMoneyReason = "";
            mp.trigger("cMisc-CallServerEvent", "sFactionChangeMoney", JSON.stringify(sendData));
        },
        changePage(type, curPage, maxPage) {
            if (type === 0) {
                if (this[curPage] === 1) return
                this[curPage]--
            } else if (type === 1) {
                if (this[curPage] === this[maxPage]) return
                this[curPage]++
            }
        },
        callAccept(id) {
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            mp.trigger("cMisc-CallServerEvent", "sFactionAcceptCall", id);
        },
        callDecline(id) {
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            storage.setFactionDeclinedCalls(id);
            mp.trigger("cMisc-CallServerEvent", "sFactionDeclineCall", id);
            storage.addNotification({text: "Вызов отклонен",theme: "info"});
        },
        editTitle(i) {
            this.editedTitle = i;
            this.needSaveRangSetting = true;
            this.$nextTick(() => {
                 this.$refs["rankTitle"+i][0].select()
            });
        },
        editRankCount() {
            this.editedRank = true;
            this.$nextTick(() => {
                 this.$refs["rankCount"].select()
            });
            // this.needSaveRangSetting = true;
        },
        onMouseDown({target}) {
            if (!target.dataset.editable) {
                this.editedTitle = null;
                this.editedRank = false;
            }
        },
        getRankTitle(r) {
           return this.ranks.find(x=>x.rank === r).title;
        },
        filterClass (type) {
            if (this.activePlayersFilter === type) {
                return 'white';
            } else {
                return "darkenwhite";
            }
        },
        // caseStatusClass () {
        //     if (this.policeCase.status === 'Общий') {
        //         return 'blue2';
        //     } else {
        //         return "orange";
        //     }
        // },
        changeSort(param, type) {
            const sortTypes = ["up", "down", "null"];
            let nextSortType  = "up";
            if (param === this.sortParam[0]) {
                const prevSortType = this.sortParam[1];
                const prevSortTypeIndex = sortTypes.findIndex(e=>e===prevSortType);
                let nextSortTypeIndex = prevSortTypeIndex + 1;
                if (nextSortTypeIndex === sortTypes.length) nextSortTypeIndex = 0;
                nextSortType = sortTypes[nextSortTypeIndex];
            }
            this.sortParam = [param, nextSortType];
        },
        getPenalty(){
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            const name = this.penalty.name.split(' ');
            if (!name[0] || !name[1]) return storage.addNotification({text: "Введите имя и фамилию",theme: "error"});
            if (!this.penalty.reason) return storage.addNotification({text: "Введите причину штрафа",theme: "error"});
            if (!this.penalty.price) return storage.addNotification({text: "Введите сумму штрафа",theme: "error"});
            const data = {
                nFirst: name[0],
                nSecond: name[1],
                reason: this.penalty.reason,
                price: this.penalty.price
            }
            mp.trigger("cMisc-CallServerEvent", "sPoliceAddFine", JSON.stringify(data));
        },
        removePenalty() {
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            const name = this.cancelPenalty.name.split(' ');
            if (!name[0] || !name[1]) return storage.addNotification({text: "Введите имя и фамилию",theme: "error"});
            if (!this.cancelPenalty.reason) return storage.addNotification({text: "Введите причину снятия штрафа",theme: "error"});
            if (!this.cancelPenalty.id) return storage.addNotification({text: "Введите ID штрафа",theme: "error"});
            const data = {
                nFirst: name[0],
                nSecond: name[1],
                reason: this.cancelPenalty.reason,
                id: this.cancelPenalty.id
            }
            mp.trigger("cMisc-CallServerEvent", "sPoliceRemoveFine", JSON.stringify(data));
        },
        countPlayers(type) {
            const allPlayers = this.$store.state.Faction.players;
            if (type === 'all') return allPlayers.length;
            if (type === 'online') return allPlayers.filter(p=>p.online).length;
            if (type === 'offline') return allPlayers.filter(p=>!p.online).length;
        },
        searchPerson() {
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            const name = this.personName.split(' ');
            if (!name[0] || !name[1]) return storage.addNotification({text: "Введите имя и фамилию",theme: "error"});
            this.$store.state.Faction.searchResult = [];
            mp.trigger("cMisc-CallServerEvent", "sPoliceSearchPerson", JSON.stringify({nFirst: name[0], nSecond: name[1]}));
            this.searchByNamePreloader = true;
            this.searchByNameNotFound = false;
        },
        searchPersonDb() {
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            const name = this.findDbPerson.split(' ');
            if (!name[0] || !name[1]) return storage.addNotification({text: "Введите имя и фамилию",theme: "error"});
            this.$store.state.Faction.searchDbResult = [];
            mp.trigger("cMisc-CallServerEvent", "sPoliceSearchDb", JSON.stringify({nFirst: name[0], nSecond: name[1]}));
            this.searchDbPreloader = true;
            this.searchDbNotFound = false;
        },
        addWanted() {
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            const name = this.wanted.name.split(' ');
            if (!name[0] || !name[1]) return storage.addNotification({text: "Введите имя и фамилию",theme: "error"});
            if (!this.wanted.reason) return storage.addNotification({text: "Введите причину объявления в розыск",theme: "error"});
            if (!this.wanted.time) return storage.addNotification({text: "Введите срок",theme: "error"});
            const data = {
                nFirst: name[0],
                nSecond: name[1],
                reason: this.wanted.reason,
                time: this.wanted.time
            }
            mp.trigger("cMisc-CallServerEvent", "sPoliceAddWanted", JSON.stringify(data));
            this.modalPage = "";
        },
        removeWanted() {
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            const name = this.cancelWanted.name.split(' ');
            if (!name[0] || !name[1]) return storage.addNotification({text: "Введите имя и фамилию",theme: "error"});
            if (!this.cancelWanted.reason) return storage.addNotification({text: "Введите причину снятия розыска",theme: "error"});
            if (!this.cancelWanted.id) return storage.addNotification({text: "Введите ID розыска",theme: "error"});
            const data = {
                nFirst: name[0],
                nSecond: name[1],
                reason: this.cancelWanted.reason,
                id: this.cancelWanted.id,
            }
            mp.trigger("cMisc-CallServerEvent", "sPoliceRemoveWanted", JSON.stringify(data));
        },
        selectSecretPageTab(page){
            /*25 - ид фибов*/
            if (this.factionData.guid !== 25) return storage.addNotification({text: "Вам недоступно это действие",theme: "error"});
            this.mainPageTab = page;
        },
        openHideCaseModal() {
            if (!this.hideCaseId) return storage.addNotification({text: "Введите номер дела",theme: "error"});
            this.modalPage = 'classifyConfirm';
        },
        hideCase() {
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            this.modalPage = '';
            mp.trigger("cMisc-CallServerEvent", "sPoliceHideCase", this.hideCaseId);
        },
        selectDbQuery(item) {
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            this.$store.state.Faction.policeCase = {crimes: []};
            this.dbQueryPreloader = true;
            this.mainPageTab = "dbQuery"
            this.dbQuery = {
                id: item.id,
                name: item.name,
                secret: item.secret,
            }
            mp.trigger("cMisc-CallServerEvent", "sPoliceGetCaseData", item.playerGuid);
        },
        changeModalPageVeh(modal, item) {
            this.modalPage = modal;
            this.modalData = { 
                carGuid: item.guid,
                carTitle: item.title,
                carPrice: item.price,
            };
        },
        sellFactionCar(carGuid) {
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            mp.trigger("cMisc-CallServerEvent", "sVehicleSellFactionVehicle", carGuid);
            this.modalPage = '';
        },
        evacuateCar(carGuid) {
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            mp.trigger("cMisc-CallServerEvent", "sVehicleEvacuateFactionVehicle", carGuid);
            this.modalPage = '';
        },
        trackFactionCar(carGuid) {
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            mp.trigger("cMisc-CallServerEvent", "sVehicleTrackFactionVehicle", carGuid);
            this.modalPage = '';
        },
        selectAnnouncement(announce) {
            this.announcingPageTab = 3;
            this.selectedAnnounce = announce;
        },
        sendAnnounce() {
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            if (!this.createAnnounce.title || !this.createAnnounce.msg) {
                return storage.addNotification({text: "Введите тему и текст объявления",theme: "error"});
            }
            const data = {
                title: this.createAnnounce.title,
                msg: this.createAnnounce.msg,
                date: {date:this.$store.getters.getDate,time:this.$store.getters.getTime}
            }
            mp.trigger("cMisc-CallServerEvent", "sFactionAddAnnounce", JSON.stringify(data));
            this.createAnnounce.title = '';
            this.createAnnounce.msg = '';
        },
        sendNew() {
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            let maxLength = 500;
            let realLength = this.createNew.New.length;
            if (maxLength < realLength) {
                return storage.addNotification({text: `Длина новости не должна превышать ${maxLength} символов. Текущая длина: ${realLength} символов.`,theme: "error"});
            }
            if (!this.createNew.New) {
                return storage.addNotification({text: "Введите текст новости",theme: "error"});
            }
            mp.trigger("cMisc-CallServerEvent", "sFactionAddNew", this.createNew.New);
            this.createNew.New = '';
        },
        openPremiaModel(playerGuid, name) {
            this.modalPage = 'premia';
            this.premia.playerGuid = playerGuid;
            this.premia.playerName = name;
        },
        closePremiaModel() {
            this.premia = {amount: '', reason: '', playerGuid: 0, playerName: ""}
            this.modalPage = '';
        },
        sendPremiaRequest() {
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            if (!this.premia.amount || !this.premia.reason) {
                return storage.addNotification({text: "Введите сумму и причину премии",theme: "error"});
            }
            mp.trigger("cMisc-CallServerEvent", "sGovAddPremia", JSON.stringify(this.premia));
            this.closePremiaModel();
        },
        startEditAd(id, text, modal) {
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            this.weazelModal = modal;
            this.editedAd = text;
            this.editedAdId = id;
            mp.trigger("cMisc-CallServerEvent", "sAdsStartEdit", id);
        },
        stopEditAd() {
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            this.weazelModal = '';
            mp.trigger("cMisc-CallServerEvent", "sAdsStopEdit", this.editedAdId);
            this.editedAdId = '';
        },
        sendAd(id) {
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            let sendData = {};
            if (id) {
                sendData = {
                    id: id,
                    text: false
                }
            } else {
                sendData = {
                    id: this.editedAdId,
                    text: this.editedAd,
                }
                if (!this.editedAd) return;
            }
            mp.trigger("cMisc-CallServerEvent", "sAdsSendAd", JSON.stringify(sendData));
            this.editedAd = "";
            this.editedAdId = "";
            this.weazelModal = '';
        },
        rejectAd() {
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            if (!this.rejectReason) return storage.addNotification({text: "Введите причину",theme: "error"});
            const sendData = {id: this.editedAdId, reason: this.rejectReason};
            mp.trigger("cMisc-CallServerEvent", "sAdsRejectAdd", JSON.stringify(sendData));
            this.editedAdId = '';
            this.weazelModal = '';
            this.rejectReason = '';
        },
        getWidthColumn() {
            return this.crimeFactionTypes.includes(this.factionData.type) ? "w-20" : "w-10"
        },
        changeStorage(state) {
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            mp.trigger("cMisc-CallServerEvent", "sFactionChangeStorageState", state);
        },
        trackNumber() {
            if (this.adminWatch) return storage.addNotification({ text: "Действие не доступно в режиме просмотра планшета", theme: "error" });
            if (!this.trackPhoneNumber) return storage.addNotification({text: "Введите номер",theme: "error"});
            if (this.trackPhoneNumber.length != 6 || !+this.trackPhoneNumber) return storage.addNotification({text: "Неправильный номер",theme: "error"});
            mp.trigger("cMisc-CallServerEvent", "sPoliceTrackNumber", this.trackPhoneNumber);
            this.trackPhoneNumber = "";
            this.modalPage = "";
        }
    },
    filters: {
        divideNumber: (x) => {
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            return parts.join(",");
        },
        getDate: (date) => {
            return date.split(" ")[1];
        },
        getTime: (date) => {
            return date.split(" ")[0];
        }
    },
	created() {
		document.addEventListener('keyup', this.onKeyDown);
        document.addEventListener('mousedown', this.onMouseDown);
	},
	beforeDestroy() {
        if (this.editedAdId) this.stopEditAd();
		document.removeEventListener('keyup',this.onKeyDown);
        document.removeEventListener('mousedown',this.onMouseDown);
	},
}
const sortRankDown = (a, b) => b.rank - a.rank;
const sortRankUp = (a, b) => a.rank - b.rank;
const sortNameUp = (a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : 0;
const sortNameDown = (a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? 1 : (a.name.toLowerCase() > b.name.toLowerCase()) ? -1 : 0;

const sortPriceDown = (a, b) => b.price - a.price;
const sortPriceUp = (a, b) => a.price - b.price;
const sortTitleUp = (a, b) => (a.title.toLowerCase() < b.title.toLowerCase()) ? -1 : (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : 0;
const sortTitleDown = (a, b) => (a.title.toLowerCase() < b.title.toLowerCase()) ? 1 : (a.title.toLowerCase() > b.title.toLowerCase()) ? -1 : 0;

const convertDate = date => {
    var date = date.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})/);
    if (date == null) {
        return false;
    } else {
        const dateObj = date[3] + "." + date[2] + "." + date[1] + " " + date[4] + ":" + date[5] + ":" + date[6];
        return dateObj;
    }
};
</script>  
<style scoped>
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
* {
	padding: 0;
  	margin: 0;
  	outline: 0;
	text-decoration: none;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}
li {
    list-style: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

.wrapper{
	width: 100%;
	height: 100vh;
}

    .tablet-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }
    .tablet{
        background: url('/img/lspd-tablet/tablet.png');
        background-size: contain;
        width: 55.83vw;
        height: 39.79vw;
        padding-top: 2.6vw;
        padding-left: 4.69vw;
        padding-bottom: 2.34vw;
        padding-right: 4.64vw;
        position: relative;
        overflow: hidden;
    }
    .homescreen{
        background: url('/img/lspd-tablet/tablet-bg.png');
        background-size: cover;
        padding: 3vw;
    }
    .hmscr-items{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
    }
    .hmscr-item{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        flex: 0 0 20%;
        height: auto;
        margin-bottom: 1vw;
    }
    .hmscr-item-icon{
        width: 4.38vw;
        height: 4.27vw;
        border-radius: 0.52vw;
        background-color: #093762;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0.57vw;
        padding: 10%;
    }
    .hmscr-item-name{
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 0.78vw;
        font-weight: bold;
        letter-spacing: -0.38px;
        text-align: center;
    }

    .home-btn{
        height: 3.8vw;
        width: 1.41vw;
        border: 0.1vw solid rgb(199, 199, 199);
        box-shadow: inset 0 0 0.63vw 0.1vw rgba(0, 0, 0, 0.486);
        border-radius: 0.78vw;
        position: absolute;
        right: 1.77vw;
        top: 45.5%;
    }
    .tablet-inner{
        width: calc(100% - 9.28vw);
        height: calc(100% - 4.68vw);
        background-color: #e4e7ea;
        display: flex;
        position: absolute;
        top: 2.6vw;
        left: 4.69vw;
        overflow: hidden;
    }
    .sidebar{
        width: 17.23%;
        height: 100%;
        background-color: #093762;
        z-index: 101;
    }
    .main{
        width: 82.77%;
        height: 100%;
        position: absolute;
        left: 17.23%;
    }
    .main-title{
        margin-bottom: 0.63vw;
        display: flex;
        height: 2.29vw;
        align-items: center;
    }
    .text-title{
        color: #8090a0;
        font-family: "Century Gothic";
        font-size: 1.25vw;
        font-weight: 700;
        letter-spacing: 0.12px;
    }
    .main-menu{
        height: 3.39vw;
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 1.41vw;
    }
    .main-menu-item{
        background: #f3f5f6;
        height: 100%;
        width: 33.1%;
        display: flex;
        transition: 0.2s;
    }
    .main-menu-item.active,.main-menu-item:hover{
        background: #fefdff;
        
    }
    .main-menu-item.active .main-menu-item-text,.main-menu-item:hover .main-menu-item-text{
        color: #4d6085;
    }
    .main-menu-item-icon{
        width: 30.77%;
        height: 100%;
    }
    .main-menu-item-icon img{
        max-width: 70%;
    }
    .main-menu-item-text{
        width: 69.33%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: #92a0ad;
        font-family: "Century Gothic";
        font-size: 0.73vw;
        font-weight: bold;
        letter-spacing: 0.07px;
        padding-left: 2%;
    }
    .line{
        width: 100%;
    }
    .line-small{
        height: 0.94vw;
        margin-bottom: 1.41vw;
    }
    .blue{
        background-color: #093762;
    }
    .block{
        display: flex;
        justify-content: space-between;
        margin-top: 0.83vw;
    }
    .block-item{
        height: 15vw;
        width: 47.5%;
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .block-item-icon{
        width: 100%;
        height: 45%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }
    .block-item-icon .img{
        height: 3.75vw;
        width: 3.8vw;
        display: flex;
        justify-content: center;
        align-items: center
    }
    .block-item-btn{
        color: #093762;
        font-family: "Century Gothic";
        font-size: 1.25vw;
        font-weight: bold;
        letter-spacing: -0.6px;
        margin-top: 1.04vw;
    }
    .block-item-btn2{
        color: #727272;
        font-family: "Century Gothic";
        font-size: 0.94vw;
        font-weight: 400;
        letter-spacing: -0.45px;
        margin-top: 1.04vw;
    }
    .sidebar-title{
        color: #e4e7ea;
        font-family: "Century Gothic";
        font-size: 1.04vw;
        font-weight: 700;
        letter-spacing: 0.5px;
        padding-top: 1.93vw;
        padding-bottom: 1.93vw;
        padding-left: 0.78vw;
    }
    .sidebar-item{
        color: #e4e7ea;
        font-family: "Century Gothic";
        font-size: 0.73vw;
        font-weight: 400;
        letter-spacing: 0.35px;
        border-left: 3px solid transparent;
        height: 2.6vw;
        display: flex;
        align-items: center;
        background-color: transparent;
        padding-left: 0.83vw;
        margin-bottom: 0.6vw;
        transition: 0.4s;
    }
    .sidebar-item.active{
        background-color: #012b51;
        border-left: 3px solid #145999;
    }
    .sidebar-item:not(.active):hover{
        background-color: rgba(1, 44, 81, 0.507);
        border-left: 3px solid #145999;
    }
    .modal{
        background-color: rgba(9, 55, 98, 0.945);
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: absolute;
        top: 36%;
        left: 50%;
        transform: translateX(-50%);
        padding: 1.56vw 2.6vw 2vw;
        z-index: 3;
    }
    .modal-title{
        color: #ececec;
        font-family: "Century Gothic";
        font-size: 1.25vw;
        font-weight: bold;
        letter-spacing: -0.24px;
        text-align: center;
        margin-bottom: 1.25vw;
    }
    .modal-item{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1.15vw;
    }
    .modal-input-title{
        color: rgba(236, 236, 236, 0.932);
        font-family: "Century Gothic";
        font-size: 0.73vw;
        font-weight: 400;
        letter-spacing: -0.14px;
        text-align: center;
        margin-bottom: 0.47vw;
    }
    .modal-input {
        width: 15.21vw;
        height: 1.77vw;
    }
    .modal-input input{
        background-color: rgba(1, 44, 81, 0.952);
        border: none;
        width: 100%;
        height: 100%;
        display: block;
        color: #ececec;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 400;
        letter-spacing: 0.07px;
        padding: 0.68vw;
    }
    .modal-btn{
        width: 9.9vw;
        height: 1.82vw;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #ececec;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 400;
        letter-spacing: 0.07px;
        background-color: #012b51;
        position: absolute;
        bottom: -0.9vw;
        left: 50%;
        transform: translateX(-50%)
    }
    .modal-close{
        position: absolute;
        top: 1vw;
        right: 1vw;
        width: 0.73vw;
        height: 0.73vw;
        background: url('/img/lspd-tablet/close.png') no-repeat;
        background-position: center center;
        background-size: contain;
    }
    .modal-confirm{
        width: 19.95vw;
        height: 9.22vw;
        background-color: rgba(9, 55, 98, 0.952);
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 36%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 3;
    }
    .modal-confirm-body{
        color: #ececec;
        font-family: "Century Gothic";
        font-size: 0.83vw;
        font-weight: bold;
        line-height: 1.15vw;
        letter-spacing: -0.16px;
        text-align: center;
    }
    .modal-confirm-btns{
        display: flex;
        position: absolute;
        width: 85%;
        justify-content: space-between;
        bottom: -0.9vw;
        left: 50%;
        transform: translateX(-50%)
    }
    .modal-confirm-btn{
        width: 6.82vw;
        height: 1.82vw;
        background-color: #012b51;
        color: #ececec;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 400;
        letter-spacing: 0.07px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }



    .wanted-table .table{
        background-color: #ffffff;
    }
    .wanted-table .icon-wrapper.gps{
        width: 0.78vw;
        height: 0.83vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .wanted-table .table-caption{
        width: 100%;
        height: 1.46vw;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 0.73vw;
        font-weight: bold;
        letter-spacing: 0.07px;
        background-color: #093762;
    }
    .wanted-table .table-header{
        display: flex;
        width: 100%;
        background: #e09e78;
        color: #f0f0f0;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: bold;
        letter-spacing: 0.07px;
    }
    .wanted-table .table-header-col{
        height: 1.35vw;
        line-height: 0.6vw;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .resultDB .col-0{
        width: 15%;
        border-right: 1px solid rgba(165, 164, 164, 0.397);
        height: 100%;
        overflow: auto;
        color: #898989;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 400;
        letter-spacing: 0.07px;
        width: 15%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .resultDB .h-col-0{
        width: 15%;
    }
    .wanted-table .h-col-0{
        width: 15%;
    }
    .wanted-table .h-col-1{
        width: 25%;
    }
    .wanted-table .h-col-2{
        width: 12%;
    }
    .wanted-table .h-col-3{
        width: 53%;
    }
    .wanted-table .h-col-4{
        width: 10%;
    }
    .wanted-table .table-row{
        display: flex;
        height: 2.1vw;
        background: #f0f0f0;
    }
    .wanted-table .table-row:nth-child(2n+2){
        background: #fff;
    }
    .wanted-table .col{
        border-right: 1px solid rgba(165, 164, 164, 0.397);
        height: 100%;
        overflow: auto;
    }
    .wanted-table .col:last-child{
        border: none
    }
    .wanted-table .col-0{
        color: #898989;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 400;
        letter-spacing: 0.07px;
        width: 15%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .wanted-table .col-1{
        color: #898989;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 400;
        letter-spacing: 0.07px;
        width: 27%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .wanted-table .col-2{
        width: 8%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .wanted-table .col-3{
        width: 55%;
        color: #898989;
        font-family: "Century Gothic";
        font-size: 0.63vw;
        font-weight: 400;
        letter-spacing: 0.06px;
        padding: 0.42vw;
    }
    .wanted-table .col-4{
        width: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #898989;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 400;
        letter-spacing: 0.07px;
    }

    .wanted-table .table-footer{
        padding-top: 0.58vw;
        padding-bottom: 0.52vw;
        background: #fff;;
    }
    .table-pagination, .table-save{
        display: flex;
        justify-content: center;
        align-items: center;
    }
	.save-body{
		width: 10.25vw;
        height: 1.56vw;
        border: 1px solid #999999;
        background-color: #bef0ba!important;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #093762;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 800;
        letter-spacing: 0.07px;
		border-radius: 0.26vw;
	}
    .pag-body{
        width: 6.25vw;
        height: 1.56vw;
        border: 1px solid #999999;
        background-color: #ffffff;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #898989;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 400;
        letter-spacing: 0.07px;
    }
    .pag-arrow{
        width: 1.56vw;
        height: 1.56vw;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    .pag-arrow-right{
        border: 1px solid #999999;
        border-left: none;
        border-top-right-radius: 0.26vw;
        border-bottom-right-radius: 0.26vw;
        background: url('/img/lspd-tablet/right.png') no-repeat;
        background-position: center 48%;
        background-size: 40%;
        background-color: #fff;
    }
    .pag-arrow-left{
        border: 1px solid #999999;
        border-right: none;
        border-top-left-radius: 0.26vw;
        border-bottom-left-radius: 0.26vw;
        background: url('/img/lspd-tablet/left.png') no-repeat;
        background-position: center 48%;
        background-size: 40%;
        background-color: #fff;
    }


    .penalty-table .table{
        background-color: #ffffff;
    }
    .penalty-table .table-caption{
        width: 100%;
        height: 1.46vw;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 0.73vw;
        font-weight: bold;
        letter-spacing: 0.07px;
        background-color: #093762;
    }
    .penalty-table .table-header{
        display: flex;
        width: 100%;
        color: #f0f0f0;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: bold;
        letter-spacing: 0.07px;
    }
    .penalty-table .table-header-col{
        height: 1.35vw;
        line-height: 0.6vw;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .penalty-table .h-col-0{
        width: 15%;
    }
    .penalty-table .h-col-1{
        width: 30%;
    }
    .penalty-table .h-col-2{
        width: 50%;
    }
    .penalty-table .h-col-3{
        width: 20%;
    }
    .penalty-table .table-row{
        display: flex;
        height: 2.1vw;
        background: #f0f0f0;
    }
    .penalty-table .table-row:nth-child(2n+2){
        background: #fff;
    }
    .penalty-table .col{
        border-right: 1px solid rgba(165, 164, 164, 0.397);
        height: 100%;
        overflow: auto;
    }
    .penalty-table .col:last-child{
        border: none
    }
    .penalty-table .col-0{
        color: #898989;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 400;
        letter-spacing: 0.07px;
        width: 15%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .penalty-table .col-1{
        color: #898989;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 400;
        letter-spacing: 0.07px;
        width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .penalty-table .col-2{
        width: 50%;
        color: #898989;
        font-family: "Century Gothic";
        font-size: 0.63vw;
        font-weight: 400;
        letter-spacing: 0.06px;
        padding: 0.42vw;
    }
    .penalty-table .col-3{
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #898989;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 400;
        letter-spacing: 0.07px;
    }

    .penalty-table .table-footer{
        padding-top: 0.58vw;
        padding-bottom: 0.52vw;
        background: #fff;;
    }

    .search-title{
        color: #8090a0;
        font-family: "Century Gothic";
        font-size: 0.83vw;
        font-weight: bold;
        letter-spacing: 0.08px;
    }
    .search-input-wrapper{
        width: 100%;
        height: 2.66vw;
        margin-top: 0.68vw;
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 1vw;
    }
    .search-input{
        display: block;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        border: none;
        color: #8090a0;
        font-family: "Century Gothic";
        font-size: 1.25vw;
        font-weight: bold;
        letter-spacing: 0.12px;
        padding-left: 1.25vw;
        padding-right: 3.1vw;
    }
    .search-input-icon{
        width: 1.61vw;
        height: 1.51vw;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 0.83vw
    }
    .search-result-title{
        margin-bottom: 0.89vw;
        color: #8090a0;
        font-family: "Century Gothic";
        font-size: 0.94vw;
        font-weight: 400;
        letter-spacing: 0.09px;
    }
    .blue-line{
        width: 100%;
        height: 1.46vw;
        background-color: #093762;
    }
    .caption{
        color: #f0f0f0;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: bold;
        letter-spacing: 0.07px;
        background-color: #093762;
        height: 1.67vw;
    }
    .search-result-table{
        /*background-color: #ffffff;*/
    }
    .search-result-table .table-header{
        display: flex;
        width: 100%;
        color: #f0f0f0;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: bold;
        letter-spacing: 0.07px;
    }
   
    .search-result-table .table-header-col{
        height: 1.35vw;
        line-height: 0.6vw;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .search-result-table .h-col-1{
        width: 30%;
    }
    .search-result-table .h-col-2{
        width: 50%;
    }
    .search-result-table .h-col-3{
        width: 20%;
    }
    .search-result-table .table-row{
        display: flex;
        height: 2.1vw;
        /*background: #f0f0f0;*/
    }
    .search-table .search-result-table:nth-child(2n+2){
        background: #fff!important;
    }
    .search-result-table .col{
        border-right: 1px solid rgba(165, 164, 164, 0.397);
        height: 100%;
        overflow: auto;
    }
    .search-result-table .col:last-child{
        border: none
    }
    .search-result-table .col-1{
        color: #898989;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 400;
        letter-spacing: 0.07px;
        width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .search-result-table .col-2{
        width: 50%;
        color: #898989;
        font-family: "Century Gothic";
        font-size: 0.63vw;
        font-weight: 400;
        letter-spacing: 0.06px;
        padding: 0.42vw;
    }
    .search-result-table .col-3{
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #898989;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 400;
        letter-spacing: 0.07px;
    }
    .scrollable-col::-webkit-scrollbar {
        width: 3px!important;
    }
    .scrollable-col::-webkit-scrollbar-track{
        background-color: #aaaaaa!important;
    }
    .scrollable-col::-webkit-scrollbar-thumb{
        background-color: #737373!important;
    }
    .search-result .table-footer{
        padding-top: 0.58vw;
        padding-bottom: 0.52vw;
        background: #fff;;
    }
    .case-form-header{
        display: flex;
        /*justify-content: center;*/
    }
    .case-form{
        width: 100%;
        padding-left: 1.35vw;
        padding-right: 1.35vw;
        padding-bottom: 2.55vw;
        background-color: #ffffff;
        position: relative;
    }
    .case-form-title{
        color: #898989;
        font-family: "Century Gothic";
        font-size: 1.41vw;
        font-weight: 700;
        margin: 1.41vw 0;
    }
    .case-form-button{
        position: absolute;
        right: 2.19vw;
        top: 1.2vw;
        width: 6.51vw;
        height: 1.98vw;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 0.78vw;
        font-weight: 400;
        letter-spacing: -0.38px;
    }
    .case-form-list{
        display: flex;
    }
    .case-form-list-left{
        width: 55%;
    }
    .case-form-list-right{
        width: 45%;
        /*padding-top: 2.65vw;*/
    }
    .case-form-item-title.fw100 {
        font-weight: 100;
    }
    .case-form-list-item{
        margin-bottom: 0.5vw;
        font-family: "Century Gothic";
    }
    .case-form-item-title{
        color: #898989;
        font-family: "Century Gothic";
        font-size: 0.73vw;
        font-weight: bold;
        letter-spacing: 0.35px;
        margin-bottom: 0.2vw;
    }
    .case-form-item-input{
        width: 10.21vw;
        height: 1.09vw;
    }
    .case-form-item-input input{
        background-color: #f3f5f6;
        width: 100%;
        height: 100%;
        color: #898989;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: bold;
        letter-spacing: 0.13px;
        padding: 0 4%;
        border: none; 
    }
    .case-form-item-status{
        width: 10.21vw;
        height: 1.72vw;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: bold;
        letter-spacing: -0.33px;
        display: flex;
        align-items: center;
        padding-left: 0.4vw;
    }
/*    .resultDB .h-col-1,.resultDB .col-1{
        width: 6%;
    }
    .resultDB .h-col-2,.resultDB .col-2{
        width: 34%;
    }
    .resultDB .h-col-3, .resultDB .col3{
        width: 60%;
    }
    .resultDB .col-2, .resultDB .col-1{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .resultDB .col3{
        color: #898989;
        font-family: "Century Gothic";
        font-size: 0.63vw;
        font-weight: 400;
        letter-spacing: 0.06px;
        padding: 0.42vw;
    }*/
    .stat_small{
        display: flex;
        height: 3.39vw;
        margin-bottom: 1.4vw;
    }
    .stat_small-item{
        display: flex;
        align-items: center;
        height: 100%;
        padding-left: 0.68vw;
    }
    .stat_small-item{
        width: 5.57vw;
        margin-right: 1px;
    }
    .stat_small-item.w-big{
        width: 6.2vw
    }
    .stat_small-item-icon{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 0.47vw;
        width: 1.77vw;
        height: 1.77vw;
    }
    .stat_small-item-text .ss-number{
        color: #92a0ad;
        font-family: "Century Gothic";
        font-size: 1.04vw;
        font-weight: bold;
        letter-spacing: 0.1px;
        /*height: 1vw;*/
        width: 2vw;
        /*border: 0;*/
    }
    .stat_small-item-text .ss-number.input{
        border: 1px solid black;
    }
    .stat_small-item-text .ss-number.borderfix{
        border: 1px solid transparent;
    }
    .stat_small-item-text .ss-number.colored{
        color: #4d6085; 
    }
    .stat_small-item-text .ss-text{
        color: #8090a0;
        font-family: "Century Gothic";
        font-size: 0.73vw;
        font-weight: 400;
        letter-spacing: -0.07px;
    }
    .table-1{
        background: #fff;
        position: relative;
    }
    .table-1 .table-header{
        display: flex;
        background-color: #82c1b1;
    }
    .table-1 .table-head-col{
        color: #f0f0f0;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: bold;
        letter-spacing: 0.07px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .table-1 .table-col{
        color: #898989;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 400;
        letter-spacing: 0.07px;
        height: 100%;
        border-right: 1px solid rgba(165, 164, 164, 0.452);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .table-1 .table-row{
        background: #e4e7ea;
        height: 1.67vw;
    }
    .table-1 .item-wrapper:nth-child(even) > .table-row{
        background: #fff!important;
    }
    .table-row{
        display: flex;
    }
    .table-1 .table-footer, .table-2 .table-footer{
        padding-bottom: 0.68vw;
        padding-top: 1.46vw;
    }
    .member-info{
        position: absolute;
        background-color: #f0f0f0;
        top: 0;
        right: 0;
        padding: 0.68vw;
    }
    .member-info .title{
        color: #898989;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: bold;
        letter-spacing: 0.07px;
        margin-bottom: 0.73vw;
    }
    .member-info .item{
        display: flex;
        color: #898989;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 400;
        letter-spacing: 0.07px;
        margin-bottom: 1vw;
    }
    .member-info .close{
        position: absolute;
        top: 3%;
        right: 3%;
        width: 0.88vw;
        height: 0.88vw;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.452) url('/img/lspd-tablet/close.png');
        background-size: contain;
    }
    .sort{
        margin-left: 0.26vw;
    }
    .sort-up,.sort-down{
        font-size: 0.42vw;
    }
    .map-gps{
        width: 1.25vw;
        height: 0.99vw;
    }
    .moneybag{
        width: 1.3vw;
        height: 1.04vw;
    }
    .info{
        width: 0.73vw;
        height: 0.73vw;
        margin-left: 0.42vw;
    }
    .b-r{
        border-right: 1px solid rgba(165, 164, 164, 0.452);
    }
    .text-center{
        text-align: center;
    }

    .stat{
        display: flex;
        margin-bottom: 1.09vw;
    }
    .stat-item{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 4.38vw;
        padding-right: 1.09vw;
        background-color: #f3f5f6
    }
    .stat-icon-wrapper{
        width: 1.77vw;
        height: 1.77;
    }
    .stat-item.active{
        background-color: #fff!important;
    }
    .stat-item.active .stat-item-text{
        color: #4d6085;
    }
    .stat-item-text{
        color: #8090a0;
    }
    .stat-item-text .main-text{
        font-family: "Century Gothic";
        font-size: 1.35vw;
        font-weight: bold;
        letter-spacing: 0.1px;
    }
    .stat-item-text .text{
        font-family: "Century Gothic";
        font-size: 0.73vw;
        font-weight: 400;
        letter-spacing: -0.05px;
    }
    .stat-item-icon{
        margin: 0 0.57vw;
    }
    .blue-line_small{
        width: 100%;
        height: 1.09vw;
        background-color: #093762;
    }
    .table-2{
        width: 100%;
        background: #fff;
    }
    .table-2 .table-caption{
        width: 100%;
        height: 1.67vw;
        background-color: #e09578;
        color: #f0f0f0;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: bold;
        letter-spacing: 0.07px;
    }
    .table-header{
        display: flex;
        background: #f0f0f0;
    }
    .table-2 .table-h-col, .table-2 .table-col{
        color: #898989;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 400;
        letter-spacing: 0.07px;
        height: 1.67vw;
    }
    .table-2 .table-col{
        border-right: solid 1px rgba(165, 164, 164, 0.4);
    }
    .table-2 .table-row{
        background: #f0f0f0;
    }
    .table-2 .table-col:last-child{
        border: none;
    }
    .table-2 .item-wrapper:nth-child(odd) > .table-row{
        background: #fff!important;
    } 


    .table-3 .table-caption{
        width: 100%;
        height: 1.67vw;
        background-color: #093762;
        color: #f0f0f0;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: bold;
        letter-spacing: 0.07px;
    }
    .table-3 .table-header, .table-3 .table-col{
        background-color: #f0f0f0;
        height: 1.67vw;
        color: #898989;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 400;
        letter-spacing: 0.07px;
    }
    .table-3 .table-content{
        width: 100%;
        display: flex;
        height: 18.37vw;
    }
    .table-3 .table-col{
        height: 1.67vw;
        background-color: #ffffff;
        border: 1px solid rgba(165, 164, 164, 0.4);
    }
    .table-3 .table-h{
        height: 18.37vw;
        overflow-y: auto;
    }

    .stat-action-wrapper{
        margin-left: auto;
        flex-direction: column;
        display: flex;
        justify-content: space-between;
        height: 4.38vw;
    }
    .stat-action-btn{
        width: 8.13vw;
        height: 1.93vw;
        background-color: #f3f5f6;
        color: #898989;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 400;
        letter-spacing: 0.07px;
    }
    .stat-action-btn:hover{
        background-color: #fff;
    }
    .content-body{
        width: 100%;
        height: 21.82vw;
        padding-left: 1.41vw;
        padding-right: 0.99vw;
        padding-top: 3.33vw;
        display: flex;
        justify-content: space-between;
    }
    .content-body .actions-btn-1{
        background-color: #e09578;
    }
    .content-body .actions-btn-2{
        background-color: #b6d187;
    }
    .content-body .actions-btn{
        display: flex;
        align-items: center;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 0.83vw;
        font-weight: 400;
        letter-spacing: 0.08px;
        width: 12.81vw;
        height: 4.38vw;
        padding-left: 1.15vw;
        margin-bottom: 1.46vw;
    }
    .content-body .actions-btn-icon{
        margin-right: 0.94vw;
    }
    .content-body .actions-btn-icon-wrapper{
        height: 2.92vw;
        width: 2.92vw;
    }
    .content-body .inputs{
        width: 19.95vw;
        height: 13.33vw;
        background-color: rgba(9, 55, 98, 0.945);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2.34vw;
    }
    .content-body .inputs .inputs-item{
        width: 100%;
        margin-bottom: 1.15vw;
    }
    .content-body .inputs .input-name{
        color: #ececec;
        font-family: "Century Gothic";
        font-size: 0.73vw;
        font-weight: 400;
        letter-spacing: -0.14px;
        text-align: center;
        margin-bottom: 0.47vw;
    }
    .content-body .inputs .input-wrapper{
        width: 100%;
        height: 1.77vw;
    }
    .content-body .inputs .input-wrapper input{
        width: 100%;
        height: 100%;
        border: none;
        background-color: rgba(1, 44, 81, 0.945);
        color: #ececec;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: 400;
        letter-spacing: 0.07px;
        padding: 0.68vw;
    }
    .sell-icon-wrapper{
        width: 1.3vw;
        height: 1.3vw;
    }
    .transport-title{
        padding: 0.3vw;
        margin-bottom: 0.5vw;
    }
    .transport-title .text{
        text-align: center;
        font-family: "Century Gothic";
        font-size: 1.04vw;
        color: #4d6085;
        font-weight: bold;
    }
    .table-actions{
        display: flex;
        justify-content: space-evenly;
    }
    .footer-btn{
        padding: 0.4vw 0.6vw;
        text-align: center;
        color: #fff;
        font-family: "Century Gothic";
        border-radius: 0.4vw;
        font-size: 0.8vw;
        background-color: rgba(0, 63, 117, 0.945);
        transition: 0.2s;
    }
    .footer-btn:hover{
        background-color: rgba(1, 44, 81, 0.945);
    }
    .btn{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        width: auto;
        font-family: "Century Gothic";
    }
    .padding{
        padding: 4% 2% 0;
    }
    .padding-big{
        padding: 6.08% 7.43% 0;
    }
    .center{
        display: flex;
        justify-content: center;
        align-items: center
    }
    .overflow{
        overflow-y: auto
    }
    .h100{
        height: 100%;
    }
    .text-white{
        color: #fff
    }
    img{
        max-width: 100%;
    }
    .m-l-a{
        margin-left: auto;
    }




.overlay {
   opacity: 0;
   visibility: hidden;
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(9, 55, 98, 0.404);
   z-index: 2;
   transition: .3s all;
}
.overlay.active{
   opacity: 1;
   visibility: visible;
}

.w-100{
    width: 100%;
}
.w-95{
    width: 95%;
}
.w-90{
    width: 90%;
}
.w-85{
    width: 85%;
}
.w-80{
    width: 80%;
}
.w-75{
    width: 75%;
}
.w-70{
    width: 70%;
}
.w-65{
    width: 65%;
}
.w-60{
    width: 60%;
}
.w-55{
    width: 55%;
}
.w-50{
    width: 50%;
}
.w-45{
    width: 45%;
}
.w-40{
    width: 40%;
}
.w-39{
    width: 39%;
}
.w-38{
    width: 38%;
}
.w-37{
    width: 37%;
}
.w-35{
    width: 35%;
}
.w-30{
    width: 30%;
}
.w-28{
    width: 28%;
}
.w-27{
    width: 27%;
}
.w-26{
    width: 26%;
}
.w-25{
    width: 25%;
}
.w-20{
    width: 20%;
}
.w-15{
    width: 15%;
}
.w-10{
    width: 10%;
}
.w-7{
    width: 7%;
}
.w-5{
    width: 5%;
}
.f-s-12{
    font-size: 0.63vw!important
}
 .orange{
        background-color: #e69855!important;
    }
    .lightorange{
        background-color: #e09e78!important;
    }
    .violet{
        background-color: #9678e0!important;
    }
    .lightblue{
        background-color: #4859a5!important;
    }
    .blue2{
        background-color: #145999!important;
    }
    .blue3{
        background-color: #b8d7f3!important;
    }
    .lightred{
        background-color: #ef7474!important;
    }
    .red{
        background-color: #8d1d1d!important;
    }
    .white{
         background-color: #ffffff!important;
    }
    .darkenwhite{
        background-color: #f3f5f6!important;
    }
    .lightgreen{
        background-color: #b6d187!important;
    }
    .green{
        background-color: #7ec99a!important;
    }
    .green2{
        background-color: #bef0ba!important;
    }
.table-row >>> .colorRed{
	color:red;
	font-weight: bold;
}
.rankTitle {
    color: #898989;
    font-family: "Century Gothic";
    font-size: 0.68vw;
    font-weight: 400;
    letter-spacing: 0.07px;
    text-align: center;
}
/* прелоадер */
.sk-circle-bounce {
  width: 4vw;
  height: 4vw;
  position: relative;
  margin: auto;
  top: 6vw;
}
.sk-circle-bounce .sk-child {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.sk-circle-bounce .sk-child:before {
  content: '';
  display: block;
  margin: 0 auto;
  width: 15%;
  height: 15%;
  background-color: #337ab7;
  border-radius: 100%;
  -webkit-animation: sk-circle-bounce-delay 1.2s infinite ease-in-out both;
          animation: sk-circle-bounce-delay 1.2s infinite ease-in-out both;
}
.sk-circle-bounce .sk-circle-2 {
  -webkit-transform: rotate(30deg);
          transform: rotate(30deg);
}
.sk-circle-bounce .sk-circle-3 {
  -webkit-transform: rotate(60deg);
          transform: rotate(60deg);
}
.sk-circle-bounce .sk-circle-4 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}
.sk-circle-bounce .sk-circle-5 {
  -webkit-transform: rotate(120deg);
          transform: rotate(120deg);
}
.sk-circle-bounce .sk-circle-6 {
  -webkit-transform: rotate(150deg);
          transform: rotate(150deg);
}
.sk-circle-bounce .sk-circle-7 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}
.sk-circle-bounce .sk-circle-8 {
  -webkit-transform: rotate(210deg);
          transform: rotate(210deg);
}
.sk-circle-bounce .sk-circle-9 {
  -webkit-transform: rotate(240deg);
          transform: rotate(240deg);
}
.sk-circle-bounce .sk-circle-10 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}
.sk-circle-bounce .sk-circle-11 {
  -webkit-transform: rotate(300deg);
          transform: rotate(300deg);
}
.sk-circle-bounce .sk-circle-12 {
  -webkit-transform: rotate(330deg);
          transform: rotate(330deg);
}
.sk-circle-bounce .sk-circle-2:before {
  -webkit-animation-delay: -1.1s;
          animation-delay: -1.1s;
}
.sk-circle-bounce .sk-circle-3:before {
  -webkit-animation-delay: -1s;
          animation-delay: -1s;
}
.sk-circle-bounce .sk-circle-4:before {
  -webkit-animation-delay: -0.9s;
          animation-delay: -0.9s;
}
.sk-circle-bounce .sk-circle-5:before {
  -webkit-animation-delay: -0.8s;
          animation-delay: -0.8s;
}
.sk-circle-bounce .sk-circle-6:before {
  -webkit-animation-delay: -0.7s;
          animation-delay: -0.7s;
}
.sk-circle-bounce .sk-circle-7:before {
  -webkit-animation-delay: -0.6s;
          animation-delay: -0.6s;
}
.sk-circle-bounce .sk-circle-8:before {
  -webkit-animation-delay: -0.5s;
          animation-delay: -0.5s;
}
.sk-circle-bounce .sk-circle-9:before {
  -webkit-animation-delay: -0.4s;
          animation-delay: -0.4s;
}
.sk-circle-bounce .sk-circle-10:before {
  -webkit-animation-delay: -0.3s;
          animation-delay: -0.3s;
}
.sk-circle-bounce .sk-circle-11:before {
  -webkit-animation-delay: -0.2s;
          animation-delay: -0.2s;
}
.sk-circle-bounce .sk-circle-12:before {
  -webkit-animation-delay: -0.1s;
          animation-delay: -0.1s;
}

.wn-icon{
    padding: 0.3vw!important;
    background: linear-gradient(170.82deg, rgba(252, 179, 179, 0.75) 4.89%, rgba(222, 132, 132, 0) 92.79%), #EA133A;
}
.weazel{
    display: block;
}
.weazel .header{
    width: 100%;
    height: 14%;
    background: linear-gradient(180deg, rgba(205, 76, 76, 0.6) 0%, rgba(254, 195, 195, 0) 100%), #EA133A;
    display: flex;
    justify-content: center;
    align-items: center;
}
.weazel .body{
    height: 86%;
    width: 100%;
    padding: 1vw;
    position: relative;
}
.wn-header-icon{
    width: 10vw;
    height: 100%;
}
.news-list{
    height: 100%;
    overflow-y: auto;
    padding: 0 0.5vw;
}
.news-list::-webkit-scrollbar{
    width: 0.52vw;
}
.news-list::-webkit-scrollbar-track{
    background: #FFF4F4;
    border-radius: 0.52vw;
}
.news-list::-webkit-scrollbar-thumb{
    background: #F54A4A;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 0.52vw;
}
.news-item{
    background: rgba(248, 248, 248, 0.7);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25), inset 0px 2px 2px rgba(255, 255, 255, 0.25);
    border-radius: 0.52vw;
    width: 100%;
    height: 6.5vw;
    margin-bottom: 0.5vw;
    display: flex;
}
.news-item-left{
    width: 75%;
    padding: 0.5vw 1vw;
}
.news-item-right{
    width: 25%;
    padding: 0.5vw;
    padding-left: 0;
}
.news-item-text{
    background: #FFFFFF;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    border-radius: 0.52vw;
    width: 100%;
    height: 100%;
    padding: 1% 2%;
    font-family: "Century Gothic";
    font-size: 0.83vw;
    line-height: 0.94vw;
    overflow: auto;
}
.news-item-text::-webkit-scrollbar{
    width: 0.2vw;
}
.news-item-text::-webkit-scrollbar-track{
    background: rgba(0, 0, 0, 0.363);
    border-radius: 0.2vw;
}
.news-item-text::-webkit-scrollbar-thumb{
    background: rgb(255, 255, 255);
    border-radius: 0.2vw;
}
.news-item-right{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.news-item-btn{
    border-radius: 0.52vw;
    width: 100%;
    height: 1.6vw;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Century Gothic";
    text-align: center;
    color: #FEF1F1;
    font-weight: bold;
    transition: 0.2s;
    background-position: 0% 0%;
    background-size: 100% 100%;
    font-size: 0.83vw;
    box-shadow: inset 0px 0px 0.21vw 0.21vw rgba(255, 255, 255, 0.25);
}
.news-item-btn.y{
    background: linear-gradient(180deg, rgba(244, 149, 6, 0.75) 0%, rgba(255, 225, 180, 0) 100%), #E2CD0B;
}
.news-item-btn.g{
    background: linear-gradient(180deg, rgba(23, 111, 16, 0.75) 0%, rgba(255, 255, 255, 0) 100%), #138D09;
}
.news-item-btn.r{
    background: linear-gradient(180deg, rgba(201, 5, 5, 0.4) 0%, rgba(205, 107, 107, 0.2875) 7.19%, rgba(248, 148, 148, 0) 45.63%), #FD2222;
}
.news-item-btn:hover{
    box-shadow: none;
}
.w-modal{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(180deg, rgba(51, 51, 51, 0.25) 0%, rgba(165, 161, 161, 0.25) 100%), #FF1D1D;
    box-shadow: 0px 0.21vw 0.21vw rgba(0, 0, 0, 0.25);
    border-radius: 0.52vw;
    padding: 0 1vw;
    z-index: 99;
    width: 33vw;
}
.w-modal-header{
    font-family: "Century Gothic";
    font-size: 1.56vw;
    text-align: center;
    color: #FFFFFF;
    padding: 0.75vw;
}
.w-modal-text{
    background: #FFFFFF;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    border-radius: 0.52vw;
    width: 100%;
    height: 100%;
    padding: 1% 2.5%;
    font-family: "Century Gothic";
    font-size: 0.94vw;
    line-height: 1.15vw;
    overflow: auto;
    border: none;
    width: 100%;
    height: 8vw;
    resize: none;
}
.w-modal.reject {
    width: 25vw;
}
.reject .w-modal-text{
    height: 2vw;
}
.w-modal-footer{
    padding: 1vw 0;
    display: flex;
    justify-content: space-between;
}
.w-modal-btn{
    background: linear-gradient(180deg, rgba(233, 210, 153, 0.5) -35.5%, rgba(210, 210, 210, 0) 92.17%), #C50818;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    border-radius: 0.52vw;
    width: 6vw;
    height: 2vw;
    font-family: "Century Gothic";
    color: #FFF8F8;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.25s;
    font-size: 0.83vw;
}
.w-modal-btn:hover{
    box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.25), 0px 2px 4px rgba(0, 0, 0, 0.25);
}
.announcing2 .header{
    height: 20%;
    width: 100%;
    background: #349DE9;
    box-shadow: 0px 4px 2px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
}
.announcing2{
    display: block;
}
.announcing2 .header-title{
    font-family: "Century Gothic";
    font-size: 3.39vw;
    color: #FFFBFB;
    text-shadow: 0px 0.21vw 0.21vw rgba(0, 0, 0, 0.25);
}
.announcing2 .body{
    background: #206BA2;
    height: 80%;
    width: 100%;
}
.announcing2 .message{
    height: 65%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
.announcing2 .textarea{
    width: 75%;
    height: 75%;
    resize: none;
    background: linear-gradient(180deg, #FFF2F2 0%, #FFF2F2 0%, #FFF2F2 0%, #FFFEFE 0.01%, rgba(186, 174, 174, 0) 100%), #C4C4C4;
    box-shadow: 0px 0.21vw 0.21vw rgba(0, 0, 0, 0.25);
    border-radius: 0.52vw;
    padding: 1% 2%;
    font-family: "Century Gothic";
    font-size: 1.46vw;
    color: #000000;
}
.announcing2 .textarea::selection{
    background: #206BA2!important;
    color: #ffffff!important;
}
.announcing2 .textarea::-webkit-scrollbar{
    width: 0.52vw;
}
.announcing2 .textarea::-webkit-scrollbar-track{
    background: #206BA2;
}
.announcing2 .textarea::-webkit-scrollbar-thumb{
    background: rgb(255, 255, 255);
}
.announcing2 .message-action{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35%;
}
.announcing2 .message-btn{
    background: linear-gradient(180deg, rgba(10, 127, 211, 0.75) 0%, rgba(95, 121, 139, 0) 100%), #349DE9;
    box-shadow: 0px 0.21vw 0.21vw rgba(0, 0, 0, 0.25);
    border-radius: 0.52vw;
    color: #fff;
    font-family: "Century Gothic";
    font-size: 1.8vw;
    text-shadow: 0px 0.21vw 0.21vw rgba(0, 0, 0, 0.25);
    display: flex;
    padding: 0.5vw 2vw;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: 0.2s;
}
.announcing2 .message-btn:hover{
    box-shadow: 0px 0.1vw 0.1vw rgba(0, 0, 0, 0.25);
    color: rgb(226, 226, 226)
}
.announcing2 .message-btn:active{
    box-shadow: 0px 0vw 0vw rgba(0, 0, 0, 0.25), inset 0 0 0.31vw rgba(0, 0, 0, 0.25);
    color: rgb(226, 226, 226)
}

@-webkit-keyframes sk-circle-bounce-delay {
  0%, 80%, 100% {
    -webkit-transform: scale(0);
            transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}

@keyframes sk-circle-bounce-delay {
  0%, 80%, 100% {
    -webkit-transform: scale(0);
            transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}
.caption_new{
        width: 100%;
        height: 1.9vw;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 0.78vw;
        line-height: 1.9vw;
        padding-left: 0.89vw;
    }
    .announcing-list{
        margin-bottom: 1vw;
    }
    .announcing-item{
        width: 100%;
        height: 4.1vw;
        background-color: #ffffff;
        margin-top: 0.5vw;
        display: flex;
    }
    .announcing-left{
        height: 100%;
        width: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .announcing-avatar{
        width: 2.03vw;
    }
    .announcing-avatar img{
        display: block;
    }
    .announcing-main{
        width: 90%;
        padding-right: 0.6vw;
        padding-top: 0.6vw;
        padding-bottom: 0.6vw;
    }
    .announcing-main-top{
        display: flex;
    }
    .announcer-name{
        color: #667483;
        font-family: "Gotham Pro";
        font-size: 0.73vw;
        font-weight: bold;
        margin-right: 1.1vw;
    }
    .announce-date{
        color: #a1adb8;
        font-family: "Century Gothic";
        font-size: 0.73vw;
        font-weight: bold;
        margin-right: 0.8vw;
    }
    .announcing-main-bot{
        padding-top: 0.2vw;
    }
    .announcing-text-preview{
        color: #8090a0;
        font-family: "Century Gothic";
        font-size: 0.68vw;
        font-weight: bold;
        line-height: 0.94vw;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;  
        overflow: hidden;
    }
    .announcing-create{
        background: #fff;
        padding: 0 0.89vw;
        padding: 0.89vw;
        padding-bottom: 1.8vw;
    }
    .announcing-title, .announcing-body{
        background-color: #f0f0f0;
        width: 100%;
        color: #8090a0;
        font-family: "Century Gothic";
        border: none;
    }
    .announcing-title{
        display: block;
        padding: 0.5vw 0.9vw;
        font-size: 0.9vw;
        font-weight: bold;
        margin-bottom: 0.5vw;

    }
    .announcing-body{
        resize: none;
        font-size: 0.8vw;
        font-weight: 400;
        line-height: 1.15vw;
        padding: 0.5vw 0.9vw;
        height: 14.69vw;
        word-break: break-all;
    }
    .announcing-show .announcing-body{
        height: 13.6vw;
    }
    .announcing-back{
        margin-top: 1.56vw;
        display: flex;
        justify-content: center;
    }
    .announcing-back-btn{
        width: 13.18vw;
        height: 2.45vw;
        background-color: #fda862;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 0.83vw;
        font-weight: 400;
        transition: 0.15s;
    }
    .announcing-back-btn:hover{
        background-color: #e69855;
    }
    .btn{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        width: auto;
        font-family: "Century Gothic";
    }
    .sp-bw{
        justify-content: space-between;
    }
    .d-flex{
        display: flex;
    }
    .ml{
        margin-left: 0.52vw;
    }
    .mr0{
        margin-right: 0;
    }

.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .3s ease;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.fade2-enter-active {
  transition: all .3s ease;
}
.fade2-leave-active {
  transition: all .3s ease;
}
.fade2-enter, .fade2-leave-to{
  opacity: 0;
  left: 0%;
}
</style>
