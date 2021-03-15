<template>
    <div class="wrapper" v-bind:class="{ blackBg: blackScreen }">
        <div class="center full">
            <div class="main-menu">
                <div class="sidebar">
                    <div class="sidebar-title">Главное меню</div>
                    <div class="sidebar-menu">
                        <div class="sidebar-menu-item" @click="page = 'player'" :class="{active: page === 'player'}">Персонаж</div>
                        <div class="sidebar-menu-item" @click="page = 'help'" :class="{active: page === 'help'}">Помощь</div>
                        <div class="sidebar-menu-item" @click="page = 'report'" :class="{active: page === 'report'}">Репорт</div>
                        <div class="sidebar-menu-item" @click="page = 'donate'" :class="{active: page === 'donate'}">Донат</div>
                        <div class="sidebar-menu-item" @click="openQuestMenu()" >Квесты</div>
                        <div class="sidebar-menu-item" @click="page = 'settings'" :class="{active: page === 'settings'}">Настройки</div>
                    </div>
                </div>
                <div class="content" v-if="page === 'player'">
                    <div class="header">
                        <div class="player-menu">
                            <div class="player-menu-item item-1 center" @click="playerTab = 1" :class="{active: playerTab === 1}">Статистика</div>
                            <div class="player-menu-item item-2 center" @click="playerTab = 2" :class="{active: playerTab === 2}">Характеристики</div>
                            <div class="player-menu-item item-3 center" @click="playerTab = 3" :class="{active: playerTab === 3}">Имущество</div>
                        </div>
                        <div class="content-title">Информация <br> о персонаже</div>
                    </div>
                    <div class="body" v-if="playerTab === 1">
                        <div class="chel-image">
                            <img src="/img/man.png" alt="">
                        </div>
                        <div class="player-info">
                            <div class="player-info-header">
                                <div class="w-50 v-center align-right">
                                    <div>
                                        <div class="text title">Имя</div>
                                        <div class="text">{{mainData.name}}</div>
                                    </div>
                                </div>
                                <div class="w-50 v-center align-right">
                                    <div>
                                        <div class="text title">Пол</div>
                                        <div class="text">{{mainData.gender ? "Женский" : "Мужской"}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="player-info-list">
                                <div class="player-info-item">
                                    <div class="text">Дата рождения:</div>
                                    <div class="text">{{fixBirthDate(mainData.dateOfBirth)}}</div>
                                </div>
                                <div class="player-info-item">
                                    <div class="text">Деньги:</div>
                                    <div class="text">{{moneyData.cash + moneyData.bank | divideNumber}}</div>
                                </div>
                                <div class="player-info-item">
                                    <div class="text">Организация:</div>
                                    <div class="text">{{mainData.factionTitle ? mainData.factionTitle : 'Нет'}}</div>
                                </div>
                                <div class="player-info-item">
                                    <div class="text">Должность:</div>
                                    <div class="text">{{mainData.rankTitle ? mainData.rankTitle : 'Нет'}}</div>
                                </div>
                                <div class="player-info-item">
                                    <div class="text">Ранг:</div>
                                    <div class="text">{{mainData.rank ? mainData.rank : 'Нет'}}</div>
                                </div>
                                <div class="player-info-item">
                                    <div class="text">Работа:</div>
                                    <div class="text">{{mainData.job ? mainData.job : 'Нет'}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="body" v-if="playerTab === 2">
                        <div class="skill">
                            <div class="skill-item">
                                <div class="skill-icon">
                                    <img src="/img/menu/zamok.png" alt="">
                                </div>
                                <div class="skill-block">
                                    <div class="skill-percent">{{skills.carHack ? skills.carHack : 0}}%</div>
                                    <div class="skill-name">Взломщик</div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <div class="skill-icon">
                                    <img src="/img/menu/narkotiki.png" alt="">
                                </div>
                                <div class="skill-block">
                                    <div class="skill-percent">{{skills.addiction ? skills.addiction : 0}}%</div>
                                    <div class="skill-name">Зависимость</div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <div class="skill-icon">
                                    <img src="/img/menu/fisher.png" alt="">
                                </div>
                                <div class="skill-block">
                                    <div class="skill-percent">{{skills.fishing ? skills.fishing : 0}}%</div>
                                    <div class="skill-name">Рыболов</div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <div class="skill-icon">
                                    <img src="/img/menu/fermer.png" alt="">
                                </div>
                                <div class="skill-block">
                                    <div class="skill-percent">{{skills.farm ? skills.farm : 0}}%</div>
                                    <div class="skill-name">Фермер</div>
                                </div>
                            </div>
                            <div class="skill-item">
                                <div class="skill-icon">
                                    <img src="/img/menu/fermer.png" alt="">
                                </div>
                                <div class="skill-block">
                                    <div class="skill-percent">{{skills.electric ? skills.electric : 0}}%</div>
                                    <div class="skill-name">Электрик</div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="body" v-if="playerTab === 3">
                        <div class="property">
                            <div class="card house">
                                <div class="card-header">
                                    <div class="card-icon">
                                        <img src="/img/menu/dom.png" alt="">
                                    </div>
                                    <div class="card-title">Недвижимость</div>
                                </div>
                                <div class="card-body scrollable"  v-if="playerProperty.house.length">
                                    <div class="card-item" v-if="playerProperty.house[0].class === 'hotel'">
                                        <div class="card-item-body">
                                            <div class="card-item-row">
                                                <div class="text">Отель:</div>
                                                <div class="text">{{playerProperty.house[0].hotelTitle}}</div>
                                            </div>
                                            <div class="card-item-row">
                                               <div class="text">Цена за сутки:</div>
                                               <div class="text">{{playerProperty.house[0].rentPrice}}</div>
                                            </div>
                                            <div class="card-item-footer">
                                                <div class="gps" @click="setGpsPoint('hotel', playerProperty.house[0].id)">gps</div>
                                            </div>
                                        </div>
                                    </div>
                                     <div class="card-item" v-else v-for="house in playerProperty.house">
                                        <div class="card-item-body">
                                            <div class="card-item-row">
                                                <div class="text">Номер дома:</div>
                                                <div class="text">{{house.id}}</div>
                                            </div>
                                            <div class="card-item-row">
                                                <div class="text">Цена:</div>
                                                <div class="text">{{house.price | divideNumber}}</div>
                                            </div>
                                            <div class="card-item-row">
                                                <div class="text">Класс:</div>
                                                <div class="text">{{house.class}}</div>
                                            </div>
                                            <div class="card-item-row">
                                                <div class="text">Гаражные места:</div>
                                                <div class="text">{{house.maxCar}}</div>
                                            </div>
                                            <div class="card-item-row">
                                                <div class="text">Жильцы:</div>
                                                <div class="text">{{house.lodger}}</div>
                                            </div>
                                            <div class="card-item-row">
                                                <div class="text">Налог за неделю:</div>
                                                <div class="text">{{taxPercent.find(t=>t.type==="house").value}}%</div>
                                            </div>
                                            <div class="card-item-footer">
                                                <div class="gps" @click="setGpsPoint('house', house.id)">gps</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="cards">
                                <div class="card">
                                    <div class="card-header">
                                        <div class="card-icon">
                                            <img src="/img/menu/car.png" alt="">
                                        </div>
                                        <div class="card-title">Транспорт</div>
                                    </div>
                                    <div class="card-body scrollable">
                                        <div class="card-item" v-for="car in playerProperty.vehicle">
                                            <div class="card-item-body">
                                                <div class="card-item-row">
                                                    <div class="text">Модель:</div>
                                                    <div class="text">{{car.title}}</div>
                                                </div>
                                                <div class="card-item-row">
                                                    <div class="text">Номер:</div>
                                                    <div class="text">{{car.numberPlate}}</div>
                                                </div>
                                                <div class="card-item-row">
                                                    <div class="text">Налог за неделю:</div>
                                                    <div class="text">{{taxPercent.find(t=>t.type==="vehicle").value}}%</div>
                                                </div>
                                            </div>
                                            <div class="card-item-footer">
                                                <div class="gps" @click="setGpsPoint('vehicle', car.id)">gps</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               <div class="card">
                                    <div class="card-header">
                                        <div class="card-icon">
                                            <img src="/img/menu/biz.png" alt="">
                                        </div>
                                        <div class="card-title">Бизнес</div>
                                    </div>
                                    <div class="card-body scrollable" v-if="playerProperty.business">
                                        <div class="card-item">
                                            <div class="card-item-body">
                                                <div class="card-item-row">
                                                    <div class="text">Название:</div>
                                                    <div class="text">{{playerProperty.business.title}}</div>
                                                </div>
                                                <div class="card-item-row">
                                                    <div class="text">Номер:</div>
                                                    <div class="text">{{playerProperty.business.id}}</div>
                                                </div>
                                                <div class="card-item-row">
                                                    <div class="text">Налог за неделю:</div>
                                                    <div class="text">{{taxPercent.find(t=>t.type==="business").value}}%</div>
                                                </div>
                                            </div>
                                            <div class="card-item-footer">
                                                <div class="gps" @click="setGpsPoint('business', playerProperty.business.id)">gps</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content help" v-if="page === 'help'">
                    <div class="header">
                        <div class="content-title">Получить <br> помощь</div>
                    </div>
                    <div class="content-name">Ответы на интересующие вопросы:</div>
                    <div class="accordion">
                        <template v-for="(faq, i) in filteredFaqs">
                            <div :key="i" class="accordion-item" :class="faq.open ? 'faq open' : 'faq'" @click="toggleOpen(i)">
                                <div class="accordion-header">
                                    <div class="accordion-icon"><img src="/img/menu/question.png" alt=""></div> 
                                    <div class="accordion-header-title">{{ faq.question }}</div>
                                    <div class="accordion-status" :class="{active: faq.open === true}"></div>
                                </div>
                                <div class="accordion-body"><p v-html="faq.answer"></p></div>
                            </div> 
                        </template>
                    </div>
                    <div class="tabs">
                        <div v-for="(button, i) in buttons" :key="i" class="btn" @click="helpTab = i+1" :class="{active: helpTab === i+1}">{{ button }}</div>
                    </div>
                </div>
                <div class="content report" v-if="page === 'report'">
                    <div class="header">
                        <div class="content-title">Сообщить <br> о нарушении</div>
                    </div>
                    <div class="content-name">Доброго времени суток, Вас приветствует <br> администрация Fortis RP.</div>
                    <div class="report-content">
                        <div class="chat">
                            <div class="chat-field-wrapper">
                                <div class="chat-field" ref="chatField">
                                    <div class="msg-wrapper incoming-msg">
                                        <div class="msg">Здравствуйте, напишите Ваше обращение к администрации сюда</div>
                                    </div>
                                    <div class="msg-wrapper" :class="getMsgClass(message.from)" v-for="message in selectedTicketMessages">
                                        <div class="msg">
                                            <p class="msg-admin" v-if="message.name">{{message.name}}:</p>
                                            <p>{{message.msg}}</p>
                                        </div>
                                        <div class="msg-date"><div class="time">{{message.time}}</div><div class="date">{{message.date}}</div></div>
                                    </div>
                                </div>
                            </div>
                            <div class="chat-input" v-if="isTicketOpen()">
                                <input type="text" placeholder="Введите сообщение" v-model.trim="messageInput" maxlength="300" @keydown.enter="sendMsg()">
                                <div class="btn" @click="sendMsg()"></div>
                            </div>
                            <div  v-else class="new-ticket" @click="createTicket()">Создать новый тикет</div>
                        </div>
                        <div class="tickets">
                            <div class="tickets-list-wrapper">
                                <div class="tickets-list">
                                    <div class="tickets-title">Ваши тикеты:</div>
                                    <div class="ticket" :class="selectedTicketClass(ticket.id)" v-for="ticket in ticketList" @click="selectTicket(ticket.id)">{{ticket.ticketName}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content donate" v-if="page === 'donate'">
                    <div class="header">
                        <div class="balance">
                            <div class="balance-title">У вас на балансе:</div>
                            <div class="balance-amount">
                                <span class="num">{{fortisCoin | divideNumber(" ")}}</span>
                                <span class="fp">FC</span>
                            </div>
                            <div class="reload-donate-btn" @click="reloadDonate">Обновить</div>
                        </div>
                        <div class="content-title">Донат <br> магазин</div>
                    </div>
                    <div class="body">
                        <div class="vip-status" v-if="vipStatus">VIP статус: {{vipStatus.type}} Активен до {{vipStatus.dateTo}}</div>
                        <div class="title">Обмен валюты</div>
                        <div class="description">За каждый пожертвованный рубль в знак благодарности начисляется 1 Fc, который можно  обменять на различные внутриигровые бонусы.</div>
                        <div class="control-block">
                            <div class="side">
                                <div class="list">
                                    <div class="item" v-for="(item, i) in donateItems" :key="i" @click="donateTab = i+1" :class="{active: donateTab === i+1}">{{ item }}</div>
                                </div>
                            </div>
                            <div class="main">
                                <div class="donate-action" v-if="donateTab === 1">
                                    <div class="action-body">
                                        <div class="action-input frub">
                                            <input type="number" @change="validateMoney" @input="calcMoney('coin', $event)" v-model="calc.coin">
                                        </div>
                                        <div class="equal">=</div>
                                        <div class="action-input dollar">
                                            <input type="number" @change="validateMoney" @input="calcMoney('dollar', $event)" v-model="calc.dollar">
                                        </div>
                                    </div>
                                    <div class="action-footer">
                                        <div class="action-btn" @click="convertMoney">Подтвердить</div>
                                    </div>
                                </div>
                                <div class="donate-action" v-if="donateTab === 2">
                                    <div class="action-body">
                                        <div class="text">1. Второй <span class="red">персонаж</span> без достижения 2-го уровня.</div>
                                        <div class="text">2. <span class="red">+20%</span> к зарплате как на работе так и во фракциях.</div>
                                        <div class="text">3. Увеличения лимита оплаты налога дома/автомобиля/бизнеса <span class="red">в 2 раза</span>.</div>
                                        <div class="text">4. Время ожидания воскрешения после реанимации уменьшено: при вызове врачей - <span class="red">6 минут</span>, без вызова врачей <span class="red">2 минуты</span>.</div>
                                        <div class="text">5. Возможность иметь <span class="red">два</span> дома.</div>
                                    </div>
                                    <div class="action-footer">
                                        <div class="action-btn" @click="buyVip('vipPlatinum')">{{donatePrice.vipPlatinum}} FC на месяц</div>
                                    </div>
                                </div>
                                <div class="donate-action" v-if="donateTab === 3">
                                    <div class="action-body">
                                        <div class="text">1. Второй <span class="red">персонаж</span> без достижения 2-го уровня.</div>
                                        <div class="text">2. <span class="red">+10%</span> к зарплате как на работе так и во фракциях.</div>
                                        <div class="text">3. Время ожидания воскрешения после реанимации уменьшено: при вызове врачей - <span class="red">6 минут</span>, без вызова врачей <span class="red">2 минуты</span>.</div>
                                    </div>
                                    <div class="action-footer">
                                        <div class="action-btn" @click="buyVip('vipSilver')" >{{donatePrice.vipSilver}} FC на месяц</div>
                                    </div>
                                </div>
                                <div class="donate-action" v-if="donateTab === 4">
                                    <div class="action-body flex-start">
                                       <div class="action-title">Сядьте в ТС в котором вы хотите изменить номер</div>
                                       <div class="action-list">
                                           <div class="action-item">
                                               <div class="veh-number active"><input type="text" v-model="newVehNumber" maxlength="8" v-uppercase></div>
                                           </div>
                                       </div>
                                    </div>
                                    <div class="action-footer">
                                        <div class="action-btn" @click="changeNumber()">{{donatePrice.changeVehNumber}} FC</div>
                                    </div>
                                </div>
                                <div class="donate-action" v-if="donateTab === 5">
                                    <div class="action-body flex-start">
                                       <div class="action-title">Имя:</div>
                                       <div class="action-input big">
                                            <input type="text" class="change-name" maxlength="15" v-model.trim="newName.firstName">
                                        </div>
                                       <div class="action-title">Фамилия:</div>
                                       <div class="action-input big">
                                            <input type="text" class="change-name" maxlength="15" v-model.trim="newName.lastName">
                                        </div>
                                    </div>
                                    <div class="action-footer">
                                        <div class="action-btn" @click="changeName">{{donatePrice.changeName}} FC</div>
                                    </div>
                                </div>
                                <div class="donate-action" v-if="donateTab === 6">
                                    <div class="action-body">
                                       <div class="action-title big">Желаете сменить внешность вашего персонажа?</div>
                                    </div>
                                    <div class="action-footer">
                                        <div class="action-btn" @click="changeAppearance">{{donatePrice.changeAppearance}} FC</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content settings" v-if="page === 'settings'">
                    <div class="header">
                        <div class="content-title">
                            Настройки <br />
                            аккаунта
                        </div>
                    </div>
                    <div class="content-name">Настройки игрового аккаунта</div>
                    <div class="content-info">Для активации перетяните ползунок</div>
                    <div class="body">
                        <div class="block">
                            <div class="block-name">Отображение чата</div>
                            <div class="block-check">
                                <label class="switch purple">
                                    <input type="checkbox" v-model="chatMessageShow" />
                                    <span class="switch-slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="block">
                            <div class="block-name">Ники игроков</div>
                            <div class="block-check">
                                <label class="switch purple">
                                    <input type="checkbox" v-model="showNameTags" />
                                    <span class="switch-slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="block">
                            <div class="block-name">Видимый HUD</div>
                            <div class="block-check">
                                <label class="switch purple">
                                    <input type="checkbox" v-model="fullHudShow" />
                                    <span class="switch-slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="block">
                            <div class="block-name">Отображение текущего квеста</div>
                            <div class="block-check">
                                <label class="switch purple">
                                    <input type="checkbox" v-model="showLastQuest" />
                                    <span class="switch-slider round"></span>
                                </label>
                            </div>
                        </div>
                        <div class="block" :class="{active: mailChangeState === true}">
                            <div class="block-name">Изменить почту</div>
                            <div class="block-icon"></div>
                            <div class="layerForClick" @click="mailChangeState = !mailChangeState"></div>
                        </div>
                        <div class="block" :class="{active: passwordChange === true}">
                            <div class="block-name">Изменить пароль</div>
                            <div class="block-icon"></div>
                            <div class="layerForClick" @click="passwordChange = !passwordChange"></div>
                        </div>
                        <div class="block">
                            <div class="block-name text-center" @click="reloadVoiceChat()">Перезагрузить войсчат</div>
                        </div>
                    </div>
                    <div class="change-blocks">
                        <div class="change-data change-password" v-if="passwordChange === true">
                            <div class="item">
                                <div class="item-name">Отправить код подтверждения на почту:</div>
                                <div class="item-data">
                                    <div class="item-data-name" @click="passChangeSendCode">Отправить</div>
                                    <div class="item-data-icon"></div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="item-name">Введите код отправленный на почту:</div>
                                <div class="item-input">
                                    <input type="text" maxlength="6" v-model="passChange.code" />
                                </div>
                            </div>
                            <div class="item">
                                <div class="item-name">Введите новый пароль:</div>
                                <div class="item-input big">
                                    <input type="text" maxlength="20" v-model="passChange.newPass" />
                                </div>
                            </div>
                            <div class="main-btn" @click="passChangeVerifyCode">Подтвердить</div>
                        </div>
                        <div class="change-data change-mail" v-if="mailChangeState === true">
                            <div class="item">
                                <div class="item-name">Отправить код подтверждения на почту:</div>
                                <div class="item-data">
                                    <div class="item-data-name" @click="mailChangeSendCode">Отправить</div>
                                    <div class="item-data-icon"></div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="item-name">Введите код отправленный на почту:</div>
                                <div class="item-input">
                                    <input type="text" maxlength="6" v-model="mailChange.code" />
                                </div>
                            </div>
                            <div class="item">
                                <div class="item-name">Введите новый адрес почты:</div>
                                <div class="item-input big">
                                    <input type="text" maxlength="100" v-model="mailChange.newMail" />
                                </div>
                            </div>
                            <div class="main-btn" @click="mailChangeVerifyCode">Подтвердить</div>
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
            page: "player",
            playerTab: 1,
            helpTab: 1,
            donateTab: 1,
            settingsTab: 1,
            active: false,
            convert: 0,
            mailChangeState: false,
            passwordChange: false,
            messageInput: "",
            // selectedTicketId: false,
            buttons: ["О фракциях", "О работах", "О имуществе", "Для новичков"],
            donateItems: ["Конвертер валюты", "Platinum VIP статус", "Silver VIP статус", "Уникальный номер на транспорт", "Смена имени", "Смена внешности"],
            filteredFaqs: [],
            faqs: [
                {
                    question: "Полицейский департамент",
                    answer: `Полицейский департамент находится в районе Мишн-Роу, на перекрестке Синнер-стрит и Атли-стрит, что немного восточнее центра города. Полицейский департамент поддерживает правопорядок на улицах Лос-Сантоса. В здании департамента можно оплатить штрафы, у персонажа Bob.
                        <p class="faq-header">Транспорт организации </p>
                        Транспорт полицейского департамента базируется в трех местах. Несколько патрульных автомобилей находится на парковке прямо перед входом в департамент. Восточнее входа находится парковка, где располагается значительная часть автомобилей, весь остальной транспорт находится ещё восточное на крытой парковке. Также, на крыше департамента стоят 2 вертолета. 
                        В каждой единице транспорта есть встроенный мегафон и бортовой компьютер. Чтобы разговаривать в мегафон необходимо выбрать его как режим голосового чата.
                         <p class="faq-header">Подсказки по клавишам</p>
                        X - надеть наручники на человека,
                        Z - повести за собой человека,
                        Caps Lock - говорить в канал рации,
                        F2 - фракционный планшет,
                        H ( в фракционном транспорте ) - открыть бортовой компьютер.
                         <p class="faq-header">Склад вещдоков</p>
                        В подвале полицейского департамента находится склад вещдоков, которым заведует Sandra. Сюда сотрудники полицейского департамента должны относить нелегальные предметы, после того как положить их туда они полностью пропадают с сервера.`,
                    open: true,
                    type: 1,
                },
                {
                    question: "Департамент Шерифа",
                    answer: `
                        Департамент Шерифа находится в южной части Палето-Бэй на Бульваре Палето. Департамент Шерифа поддерживает правопорядок в Округе Лос-Сантоса, а также заведуют окружной тюрьмой. В здании департамента можно оплатить штрафы у персонажа Gary.
                        <p class="faq-header">Транспорт организации</p>
                        Весь транспорт находится на задней парковке департамента, в том числе и вертолет. 
                        В каждой единице транспорта есть встроенный мегафон и бортовой компьютер. Чтобы разговаривать в мегафон необходимо выбрать его как режим голосового чата.
                        <p class="faq-header">Подсказки по клавишам</p>
                        X - надеть наручники на человека,
                        Z - повести за собой человека,
                        Caps Lock - говорить в канал рации,
                        F2 - фракционный планшет,
                        H ( в фракционном транспорте ) - открыть бортовой компьютер.
                        Склад вещдоков
                        На первом этаже департамента Шерифа находится склад вещдоков. Сюда сотрудники полицейского департамента должны относить нелегальные предметы, после того как положить их туда они полностью пропадают с сервера.

                    `,
                    open: false,
                    type: 1,
                },
                {
                    question: "Федеральное бюро расследований",
                    answer: `
                        Здание Федерального бюро расследований находится в районе Пиллбокс-Хилл, немного восточней центра города. Федеральное бюро расследований является органом внутренней разведки и, одновременно, федеральной правоохранительной структурой.
                        <p class="faq-header">Транспорт организации</p>
                        Весь транспорт находится на внутренней парковке здания, кроме двух вертолетов которые стоят на крыше здания. В каждой единице транспорта есть встроенный мегафон и бортовой компьютер. Чтобы разговаривать в мегафон необходимо выбрать его как режим голосового чата.
                        <p class="faq-header">Подсказки по клавишам</p>
                        X - надеть наручники на человека,
                        Z - повести за собой человека,
                        Caps Lock - говорить в канал рации,
                        F2 - фракционный планшет,
                        H ( в фракционном транспорте ) - открыть бортовой компьютер.
                        `,
                    open: false,
                    type: 1,
                },
                {
                    question: "Национальная гвардия",
                    answer: `
                        Национальная гвардия базируется в Форте Занкудо, на Лаго-Занкудо.
                        Национальная гвардия может быть активирована в чрезвычайных ситуациях губернатором для выполнения различных задач внутри штата, является военизированным резервом вооруженных сил США.  
                        <p class="faq-header">Транспорт организации</p>
                        На северо-западе от выхода с диспетчерской вышки находится 6 внедорожников, западнее на внутренной парковке находится большое количество военных автомобилей, в том числе 2 командных пункта. На юге от входа находится склад и около него парковка транспорта военной полиции и ещё несколько автомобилей. На севере от входа в крытых парковочных местах находятся самолеты, ещё севернее на специализированных местах находятся вертолеты. Северо-западнее этого места стоят военные автобусы и грузовики. В каждой единице транспорта есть встроенный мегафон и бортовой компьютер. Чтобы разговаривать в мегафон необходимо выбрать его как режим голосового чата.
                        <p class="faq-header">Подсказки по клавишам</p>
                        X - надеть наручники на человека,
                        Z - повести за собой человека,
                        Caps Lock - говорить в канал рации,
                        F2 - фракционный планшет,
                        `,
                    open: false,
                    type: 1,
                },
                {
                    question: "Правительство",
                    answer: `
                        Капитолий находится в районе Рокфорд-Хиллз, что в северной части города. Правительство издает законопроекты, за которые голосует сенат, а также курирует государственные структуры.
                        <p class="faq-header">Транспорт организации</p>
                        Весь транспорт правительства находится на подземной парковке у капитолия. В каждой единице транспорта есть встроенный мегафон и бортовой компьютер. Чтобы разговаривать в мегафон необходимо выбрать его как режим голосового чата.
                        <p class="faq-header">Подсказки по клавишам</p>
                        X - надеть наручники на человека,
                        Z - повести за собой человека,
                        Caps Lock - говорить в канал рации,
                        F2 - фракционный планшет.
                        `,
                    open: false,
                    type: 1,
                },
                {
                    question: "Больница",
                    answer: `
                        Больница находится в районе Пиллбокс-Хиллз на Элгин-Авеню, что на северо-востоке города. Медицинские служащие лечат людей на вызовах, помогают справится с зависимостями, выдают мед-карты и лечат пациентов в больнице.
                        <p class="faq-header">Транспорт организации</p>
                        Весь транспорт находится на подземной парковке с тыльной части больницы. В каждой единице транспорта есть встроенный мегафон и бортовой компьютер. Чтобы разговаривать в мегафон необходимо выбрать его как режим голосового чата.
                        <p class="faq-header">Подсказки по клавишам</p>
                        Caps Lock - говорить в канал рации,
                        F2 - фракционный планшет

                    `,
                    open: true,
                    type: 1,
                },
                {
                    question: "Мафия",
                    answer: `
                        Мафия - криминальное сообщество, зачастую бандитская организация, которая путём запугивания, рэкета и террора добиваются необходимых для себя целей.
                        Титульные территории мафий скрыты от общего взора игроков.
                        <p class="faq-header">Чем занимаются мафии?</p>
                        Главная возможность мафий, которой они могут заполучить определенные ресурсы это контрабанда, с помощью неё каждая мафия получает свои уникальные ресурсы. Также, мафии грабят, похищают людей, крышуют бизнесы устраивают теракты, продвигают выгодные законопроекты и т.д.
                        <p class="faq-header">Транспорт мафий</p>
                        Мафии сами покупают и расставляют свой транспорт, как и другие криминальные организации.
                        <p class="faq-header">Подсказки по клавишам</p>
                        X - надеть стяжки на человека,
                        Z - повести за собой человека,
                        Caps Lock - говорить в канал рации,
                        F2 - фракционный планшет
                        `,
                    open: false,
                    type: 1,
                },
                {
                    question: "Банды",
                    answer: `
                        Банды - преступные группировки, чаще всего они сформированы по расовому этническому признаку, хотя нередко и в этнические группировки входят представители других рас и этносов. Титульные территории банд скрыты от общего взора игроков.
                        <p class="faq-header">Чем занимаются банды?</p>
                        Банды могут выращивать марихуану на наркофермах, нередко во время этого процесса происходят стычки между разными бандами. Также, банды грабят, похищают людей, крышуют дилеров на подконтрольным им территориям, сами продают наркотики и т.д.
                        <p class="faq-header">Транспорт мафий</p>
                        Банды сами покупают и расставляют свой транспорт, как и другие криминальные организации.
                        <p class="faq-header">Подсказки по клавишам</p>
                        X - надеть стяжки на человека,
                        Z - повести за собой человека,
                        Caps Lock - говорить в канал рации,
                        F2 - фракционный планшет
                        `,
                    open: false,
                    type: 1,
                },
                {
                    question: "Байкерские клубы",
                    answer: `
                        Байкерские клубы - преступные группировки, которые любят байки и метал. Они имеют четкую иерархию, строгие правила и обычаи. Часто встречаются дополнительные ограничения для членства в клубе: только мужчины, не гомосексуалисты, возможны расовые критерии, иногда ограничения по классу и/или марке мотоцикла. Титульные территории байкеров скрыты от общего взора игроков.
                        <p class="faq-header">Чем занимаются байкеры?</p>
                        Байкеры занимаются контрабандой ресурсов, грабежам, мотопробегами, крышеванием подконтрольных территорий, продажей отмычек.
                        <p class="faq-header">Транспорт мафий</p>
                        БК сами покупают и расставляют свой транспорт, как и другие криминальные организации.
                        <p class="faq-header">Подсказки по клавишам</p>
                        X - надеть стяжки на человека,
                        Z - повести за собой человека,
                        Caps Lock - говорить в канал рации,
                        F2 - фракционный планшет
                        `,
                    open: false,
                    type: 1,
                },
                {
                    question: "Ферма",
                    answer: `
                        Ферма находится в районе Грейпсид, север Сэнди Шорс. На карте обозначается желтым ангаром. Работа фермеров доступна без какого-либо ограничения.
                        <p class="faq-header">Начало работы</p>
                        Для того чтобы начать работу необходимо подойти к персонажу Gabriel и выбрать пункт: “Работать фермером” или же если у вас есть 100% скилла фермера вы можете выбрать “Работать трактористом”.
                        После устройства необходимо подойти к шкафчикам с надписью “Рабочая одежда”, после чего уже можно направляться к поинтам на поле.
                        Рабочий процесс фермера
                        Как только вы соберете 5 кочанов капусты, отнесите их на склад. Каждый такой цикл сопровождается повышением навыка фермера на 1 единицу. Для того чтобы иметь возможность устроится трактористом необходимо иметь 100 единиц навыка.
                        <p class="faq-header">Бесплатная еда</p>
                        Каждый работник фермы имеет право получить бесплатный паёк после каждых 30 отработанных минут. Для этого необходимо подойти к вагончику, внутри которого стоит Michael. Если Вы отработали меньше чем 30 минут то уведомление сообщит о том сколько времени ещё нужно поработать.
                        <p class="faq-header">Рабочий процесс тракториста</p>
                        Для начала работы необходимо взять трактор с прицепом, после чего направляться к поинтам на поле. Следуя меткам в конце цикла Вам необходимо будет выгрузить продукты на складе, после чего снова направляться к меткам на поле.
                        Внимание! Лучше не покидать рабочее место на тракторе, иначе последствия Вам не понравятся. Он будет отбуксирован, Вы будете уволены, а назад придется добираться пешком.
                        <p class="faq-header">Получение денег и увольнение с работы</p>
                        Для увольнения необходимо подойти к персонажу Gabriel и выбрать пункт: “Увольнение с работы”, после чего у Вас отберут рабочую одежду и выдадут заработанные деньги.

                        `,
                    open: false,
                    type: 2,
                },
                {
                    question: "Мясокомбинат",
                    answer: `
                        Мясокомбинат находится в промышленном районе Эль-Бурро-Хайтс, что на юго-востоке города. На карте обозначается желтой буквой “M”. Работа мясника доступна без какого-либо ограничения. Вход в мясокомбинат прямо за спиной персонажа Oscar.
                        <p class="faq-header">Начало работы</p>
                        Для того чтобы начать работу необходимо подойти к персонажу Jonas, который находится на мини-карте прямо на букве M ( c входа идти прямо ) и выбрать пункт: “Устроится на работу”. После этого необходимо подойти к поинту переодевания у халатов висящих на стене в двух шагах налево от Jonas’a и нажать Е.
                        После этого направляйтесь к желтой точке на мини-карте, около свиных туш.
                        <p class="faq-header">Рабочий процесс мясника</p>
                        Сначала необходимо срезать мясо со свиной туши, после чего отнести к предложенному комбинату для того чтобы с него сделали фарш. После этого коробку с фаршом необходимо отнести на склад. Теперь Вы можете либо начать цикл заново, либо закончить работу. 
                        <p class="faq-header">Получение денег и увольнение с работы</p>
                        Для увольнения необходимо подойти к персонажу Jonas и выбрать пункт: “Уволиться с работы”, после чего у Вас отберут рабочую одежду и выдадут заработанные деньги.
                        `,
                    open: false,
                    type: 2,
                },
                {
                    question: "Работа электриком",
                    answer: `
                        Работа электриком находится в районе Вайнвуд-Хиллз, в северо-восточной части города. На карте обозначается желтым знаком молнии. Работа электриком доступна при условии владения лицензией категории А.
                        <p class="faq-header">Начало работы</p>
                        Для того чтобы начать работу необходимо подойти к персонажу Gaffer, который на карте находится прямо на знаке молнии и нажать Е. В меню необходимо нажать “Устроиться на работу”. После этого необходимо идти на парковку которая на карте обозначилась белым кругом и арендовать транспорт для работы и на нём направляться к щитку, к которому ведет желтый маршрут на GPS.
                        <p class="faq-header">Рабочий транспорт</p>
                        Если у Вас не полностью развит навык электрика то доступен для аренды будет только мопед, но и для него необходимо лицензия на вождение транспортом категории A. 
                        Когда у Вас будет развит навык, Вы сможете арендовать автомобили, но для этого необходима лицензия на вождение транспортом категории B.
                        Внимание! Рабочий транспорт перед посадкой необходимо открыть буквой L, а после подтверждения аренды завести буквой B.
                        Настоятельно рекомендуем заправить рабочий транспорт после начала работы.
                        Если вы покинете рабочий транспорт более чем на 5 минут, он будет возвращен на парковку,а Вы будете оштрафованы на 500$ за халатное отношение к транспорту 
                        <p class="faq-header">Рабочий процесс электрика</p>
                        Работа заключается в том что Вам нужно ездить по карте и чинить щитки, тем самым Вы повышаете навык электрика и зарабатываете деньги. Для того чтобы починить щиток необходимо подойти к нему и нажать на Е.
                        <p class="faq-header">Увольнение с работы</p>
                        Для увольнение необходимо подойти к персонажу Jonas на метке работы электриков, нажать Е и в меню выбрать пункт “Уволиться с работы”. Примечание, если Вы не вернете транспорт на место работы то будете оштрафованы.
                        `,
                    open: false,
                    type: 2,
                },
                {
                    question: "Работа водителем автобуса",
                    answer: `
                        Автобусный парк находится в районе Текстайл-Сити, немного севернее полицейского департамента. На карте обозначается желтым знаком автобуса. Работа водителем автобуса доступна людям с лицензией на вождение транспортом категории D и мед-картой.
                        <p class="faq-header">Начало работы</p>
                        Для того чтобы начать работу необходимо подойти к персонажу Solomon, который на карте находится прямо на знаке автобуса и выбрать пункт “Устроиться на работу”. После этого необходимо арендовать автобус желаемого для Вас цвета. Цвет автобуса обозначает его принадлежность к определенному маршруту. Узнать пути каждого маршрута можно в телефонном приложении “Навигатор”.
                        Внимание, для того чтобы сесть в рабочий транспорт сначала его нужно открыть на букву L, после чего подтвердить аренду и завести на букву B.
                        <p class="faq-header">Рабочий процесс водителя автобуса</p>
                        После аренды автобуса необходимо ездить по остановкам к которым прокладывается маршрут на карте. У остановки обязательно необходимо 10 секунд подождать перед продолжением маршрута. Оплата труда поступает в конце маршрута. Когда Вы закончили маршрут то можете либо начать новый, либо увольняться с работы.
                        <p class="faq-header">Увольнение с работы</p>
                        Для увольнение необходимо подойти к персонажу Solomon на автовокзале и нажать “Уволиться с работы”. Примечание, если Вы не вернете автобус на вокзал то будете принудительно оштрафованы на 500$ за халатное отношение с рабочим транспортом.
                        `,
                    open: false,
                    type: 2,
                },
                {
                    question: "Работа таксистом",
                    answer: `
                        Таксопарк находится в районе Восточного Вайнвуде, на северо-востоке города. На карте обозначается желтым знаком автомобиля такси. Работа таксиста доступна людям с лицензией на вождение транспортом категории B и мед-картой.
                        <p class="faq-header">Начало работы</p>
                        Для того чтобы начать работу необходимо подойти к персонажу Siemon, который на карте находится прямо на знаке такси и выбрать пункт “Устроиться на работу”. После этого подойдите к рабочему автомобилю, откройте его на L, сядьте в него, согласитесь с арендой и заведите на B. Просмотреть список заказов можно в рабочем планшете на кнопку F3.
                        <p class="faq-header">Работа по заказам</p>
                        В рабочий планшет приходят заказы с мобильного приложения или с точки вызова такси у телефона общественного пользования. Заказ можно принять, отклонить, или заблокировать для себя заказы от неадекватного пассажира.
                        После принятия заказа необходимо направляться к клиенту, к нему Вам был проложен маршрут. Вы можете отклонить текущий вызов нажав на одноименную кнопку в рабочем планшете.
                        <p class="faq-header">Работа по случайному клиенту</p>
                        Перед тем как Вы поедите, клиент должен поставить у себя на карте метку к которой он хочет доехать, после чего вы должны согласиться с его маршрутом и довести его до места.
                        <p class="faq-header">Увольнение с работы</p>
                        Для увольнение необходимо подойти к персонажу Siemon у таксопарка и нажать “Уволиться с работы”. Примечание, если Вы не вернете машину такси к таксопарку, после чего в рабочем планшете не нажмете “Закончить смену” то будете принудительно оштрафованы на 500$ за халатное отношение с рабочим транспортом.
                        `,
                    open: false,
                    type: 2,
                },
                {
                    question: "Работа дальнобойщиком",
                    answer: `
                        Работа дальнобойщиком находится в терминале, на юго-востоке города. На карте обозначается желтым знаком фуры. Работа таксиста доступна людям с лицензией на вождение транспортом категории C или C+E и мед-картой.
                        <p class="faq-header">Начало работы</p>
                        Для того чтобы начать работу необходимо подойти к персонажу John, который на карте находится прямо на знаке фуры, нажать Е и выбрать пункт “Устроиться на работу”. После этого подойдите к рабочему автомобилю на парковке справа в 100 метрах от устройства на работу, откройте его на L, сядьте в него, согласитесь с арендой и заведите на B. Просмотреть список заказов можно в рабочем планшете на кнопку F3.
                        <p class="faq-header">Рабочий транспорт и рабочий процесс.</p>
                        У Вас на выбор есть 3 автомобиля для аренды. 
                        Белые - Mule доступны людям с лицензией на вождение транспортом категории С. На них осуществляется перевозка материалов и продуктов к бизнесам. 
                        Зеленые - Pounder доступны людям с лицензией на вождение транспортом категории С+E. На них осуществляется перевозка материалов и продуктов к заводам, а также доставка транспорта к салонам торговли.
                        Красные с голубыми цистернами - грузовики MTL доступны людям с лицензией на вождение транспортом категории С+E.  На них осуществляется перевозка нефти к нефтеперерабатывающему заводу, а также топлива на заправки.
                        <p class="faq-header">Увольнение с работы</p>
                        Для увольнение необходимо подойти к персонажу John у начала работы и нажать “Уволиться с работы”. Примечание, если Вы не вернете фуру на точку сдачи транспорта у парковки, то будете принудительно оштрафованы на 500$ за халатное отношение с рабочим транспортом.
                        `,
                    open: false,
                    type: 2,
                },
                {
                    question: "Работа инкассатором",
                    answer: `
                        Работа инкассатором находится в районе Дель-Перро, на северо-западе города. На карте обозначается обведенным желтым знаком доллара. Работа инкассатором доступна людям с лицензией на вождение транспортом категории С, лицензией на оружие и мед-картой.
                        <p class="faq-header">Начало работы</p>
                        Для того чтобы начать работу необходимо подойти к персонажу Oliver, который на карте находится прямо на знаке доллара и выбрать пункт “Устроиться на работу”, дальше направляйтесь на подземную парковку слева от устройства на работу, подойдите к рабочему автомобилю, откройте его на L, сядьте в него, согласитесь с арендой и заведите на B. После чего вернитесь немного выше, к небольшому пункту и у персонажа Henry возьмите рабочую форму и табельное оружие. После этого либо дождитесь напарника, либо в рабочем планшете на кнопку F3 кнопкой начните смену.
                        <p class="faq-header">Работа с напарником</p>
                        Чтобы начать работу с напарником, необходимо чтобы тот человек который будет водителем арендовал автомобиль, человек желающий стать его напарником сел к нему в авто и согласился стать напарником. Водитель должен подтвердить что согласен работать в паре. После чего напарник должен взять рабочую форму и табельное оружие. И только после того как оба человека будут в форме сидеть в рабочем автомобиле, необходимо чтобы водитель в рабочем планшете нажал “Начать смену”.
                        Если водитель работает в паре с напарником, то для обналичивания банкоматов с автомобиля должен выходить его напарник, а не он сам.
                        <p class="faq-header">Рабочий процесс</p>
                        Необходимо ездить по маршруту к банкоматам и обналичивать их. После того как Вы забрали деньги с банкомата необходимо подойти к автомобилю и нажать Е. Только после того как Вы переложите деньги в автомобиль высветляется маршрут к следующему банкомату. После обналичивания 10 банкоматов необходимо вернуться на подземную парковку, взять с автомобиля все деньги, после чего принести их в лифт и сдать.
                        Будьте внимательны! Вас в любой момент могут попытаться ограбить криминальные элементы.
                        <p class="faq-header">Увольнение с работы</p>
                        Для увольнение необходимо подойти к персонажу John у начала работы и нажать “Уволиться с работы”. Примечание, если перед этим Вы не вернете фуру на место откуда её взяли, после чего в рабочем планшете не завершите смену то Вам не будет возвращен залог в 2.000$ который Вы оплачивали при аренде автомобиля.
                        `,
                    open: false,
                    type: 2,
                },
                {
                    question: "Дома",
                    answer: `
                        Дом является местом жительства Вашего персонажа, у каждого в доме имеется шкаф для хранения вещей, а также гараж\парковочные места (по указанию в меню покупки) благодаря которым можно покупать и хранить автомобили.
                        В доме есть возможность появится после длительного отсутствия в игре, но это стоит денег.
                        В меню персонажа, вкладке “Персонаж” - “Имущество” можно отметить Ваш дом на карте.
                        <p class="faq-header">Покупка/управление домом</p>
                        Для того чтобы открыть меню дома необходимо подойти к входной двери и нажать кнопку E. В данном меню если дом принадлежит государству, а не частному лицу то Вы можете его приобрести. Если дом принадлежит частному лицу, Вы можете войти в него если открыто, или попытаться взломать замок отмычкой. Если дом Ваш, то здесь Вы можете открывать\закрывать двери, просматривать налоги в день и список жильцов, а также продать его государству.
                        <p class="faq-header">Подселение жильцов</p>
                        Вы можете подселить к себе определенное количество которое зависит от класса дома. Жилец может использовать дом для появления после длительного отсутствия в игре, а также использовать автомобили, но не все, а только которые Вы ему разрешили. Подселить человека можно в меню взаимодействия с ним.
                        Разрешить использования автомобилей для жильцов можно в меню взаимодействия с автомобилем.
                        Внимание, подселенный человек получает доступ к Вашему шкафу!
                        Выселить человека можно в меню взаимодействия с ним, также он сделает это автоматически когда обзаведется собственным жильем.
                        Жилец не может купить свой автомобиль и поставить его в гараж владельца дома.
                        <p class="faq-header">Гараж/парковочное место</p>
                        Чтобы купить автомобиль необходимо иметь место где его хранить. Сейчас на сервере есть несколько вариантов для этого: купить дом с 1 и больше местом под автомобиль или снять номер в отеле, к которому автоматически на время проплаты номера прилагается 1 паркоместо. 
                        Чтобы зайти в гараж необходимо подойти к большому желтому чекпоинту у дома и нажать Е, либо сделать аналогичное за рулём автомобиля.
                        В домах с местом под 1 автомобиль нет гаражей, в таких около дома находится парковочное место.

                        `,
                    open: false,
                    type: 3,
                },
                {
                    question: "Отель",
                    answer: `
                        В отелях можно снимать номера, которые являются временным местом жительства Вашего персонажа(строго на проплаченный период). В номере есть возможность появится после длительного отсутствия в игре, но это стоит денег. К каждому номеру прилагается 1 паркоместо для автомобиля.
                        В меню персонажа, вкладке “Персонаж” - “Имущество” можно отметить Ваш отель на карте.
                        <p class="faq-header">Выбор отеля</p>
                        На карте Вы можете найти несколько отелей, они отличаются своим месторасположением и ценами. Соответственно номер в Opium Night Hotel стоит на 50$ за день аренды дороже чем в Dream View.
                        <p class="faq-header">Меню отеля</p>
                        В меню отеля Вы можете снять номер, или управлять им если уже это сделали.
                        Для аренды сначала выберите приглянувшийся номер, введите количество дней аренды(действует 100% предоплата) и нажмите кнопку “Арендовать”.
                        В управлении доступны такие функции как продление аренды, выселение, а также открытие\закрытие двери, ведь другие игроки могут к Вам зайти. Здесь же можно войти в номер.
                        `,
                    open: false,
                    type: 3,
                },
                {
                    question: "Автомобиль",
                    answer: `
                    Автомобиль можно приобрести в автосалоне или с рук у человека.<br>
                    Для покупки автомобиля в автосалоне нужно подойти к продавцу машин, находящемуся на метке автосалона (значок машины), и взаимодействовать с ним ( клавиша “E” ). Вам на выбор предоставляется список машин одного из 4 автосалонов ( Albany (эконом) , Benefactor (стандарт) , Enus (комфорт) , Grotti (премиум) ). После того как Вы определитесь с автомобилем, выберите один из десяти стоковых цветов, и купите транспорт на кнопку “купить”. Автомобиль будет ждать вас на парковке рядом с автосалоном. Не забудьте оплатить налог на транспорт в отделении банка.<br>
                    При покупке автомобиля с рук сделка происходит через меню взаимодействия. Продавец взаимодействует с покупателем: клавиша “Е” > финансы > продать транспорт > ввести цену продажи. Покупателю остается только согласиться или отказаться от сделки.<br>
                    Кастомизация и улучшение характеристик автомобиля производится в одном из восьми салонов LS Custom (значок баллончика)<br>
                    Если с Вашим автомобилем что-то произошло, Вы можете восстановить его на метке эвакуации транспорта, который находится в южной части города (значок крючка на карте).
                        `,
                    open: false,
                    type: 3,
                },
                {
                    question: "Бизнес",
                    answer: `
                    Когда Вы накопите достаточно денег для покупки бизнеса, вы можете купить его у государства или с рук другого бизнесмена. <br>
                    Для покупки у государства нужно найти около бизнеса поинт с ID бизнеса, взаимодействовать с ним нажав клавишу “Е” и подтвердить свою покупку.<br>
                    Все взаимодействие с бизнесом происходит в том же месте где и покупка. Открыв планшет бизнеса Вы увидите статистику о доходе, расходах, покупателях. Изменить наценку, закупить товар и снять деньги с бизнеса можно в том же планшете. Налог оплачивается в банке.

                        `,
                    open: false,
                    type: 3,
                },
                {
                    question: "Начало",
                    answer: `
                    Когда Вы прилетаете в штат, первым делом нужно добраться в город. Для этого на выходе из аэропорта стоит таксофон для вызова такси. Чтобы вызвать такси поставьте метку на конечную цель, подойдите к таксофону и нажмите клавишу “Е”. Цена за такси будет указана при вызове. Если уйти далеко от места вызова, вызов будет отменен. Также через аэропорт проходят 2 автобусных маршрута.

                        `,
                    open: false,
                    type: 4,
                },
                {
                    question: "Работы",
                    answer: `
                    Первым делом нужно заработать денег, сделать это можно на начальных работах. 
                    см. Начальные работы

                        `,
                    open: false,
                    type: 4,
                },
                {
                    question: "Еда и напитки",
                    answer: `
                        У всех есть потребности, и главные из них это еда и питье. Чтобы купить пропитания найдите одну из 18 закусочных (буква В на карте). Для покупки взаимодействуйте с кассиром (клавиша “Е”) и купите еду и напитки из списка.<br>
Еда и вода также продается в магазинах 24/7, которые разбросаны по всему штату.
В игре можно встретить фургончики Тако, где тоже можно купить еду и напитки.

                        `,
                    open: false,
                    type: 4,
                },
                {
                    question: "Телефон",
                    answer: `
                    Для удобной жизни в мегаполисе требуется купить телефон (телефон продается без сим-карты), который продается в магазинах электроники (значок компьютера на карте). С его помощью можно позвонить в 911, вызвать такси, подать объявление в Weazel News или просто послушать радио. Еще с телефона можно позвонить или написать сообщение другому человеку если узнать его номер телефона. Сим-карту можно купить как в магазине электроники, так и в магазине 24/7.
                        `,
                    open: false,
                    type: 4,
                },
                {
                    question: "Лицензия на вождение",
                    answer: `
                        Вождение транспортного средства без прав запрещена законом. Для получения прав есть автошкола (значок автомобильного руля на карте). Категорий прав 7 штук: от управления мотоциклом и легковым автомобилем, до лицензии пилота.<br>
                        Для сдачи экзамена на получение прав нужно прибыть в автошколу и начать теоретический тест. Сначала Вам дадут прочитать основные положения дорожного кодекса, после начнется тест. Когда Вы успешно сдадите теоретический тест, Вам дадут возможность начать сдавать практический тест. Для его начала нужно сесть в автомобиль той категории на которую вы сдали теорию и подтвердить начало теста. ВАЖНО: не превышайте скорость и не допускайте повреждения транспортного средства, после двух ошибок тест будет провален.<br>
                        Как только Вы успешно сдадите практическую часть, у Вас появится лицензия на управление транспортом.

                        `,
                    open: false,
                    type: 4,
                },
                {
                    question: "Заправки",
                    answer: `
                     Главная потребность автомобиля для работоспособности, это наличие в баке бензина.<br>
                    Заправить автомобиль можно на заправках (значок канистры на карте), которые разбросаны по всему штату. Если так получилось что Ваше транспортное средство не смогло доехать до заправки, Вы можете воспользоваться канистрой, которую можно купить в магазинах 24/7.<br> ВАЖНО: Канистры продаются пустыми, для наполнения воспользуйтесь заправкой для автомобилей.
                    Важно: Учитывайте класс топлива при заправке, у разного транспорта - разный класс.
                        `,
                    open: false,
                    type: 4,
                },
                {
                    question: "Лицензия на оружие",
                    answer: `
                        Кроме лицензий на право вождения транспортного средства, есть еще лицензии: медицинская и оружейная. Для их получения обратитесь к персоналу мед учреждения и полицейского/шериф департамента.<br>
                        В штате существуют магазины для розничной продажи мелкокалиберного оружия. Для покупки требуется наличие лицензии на оружие.
                        `,
                    open: false,
                    type: 4,
                },
            ],
            mailChange: {
                code: "",
                newMail: "",
            },
            passChange: {
                code: "",
                newPass: "",
            },
            calc: {
                coin: 0,
                dollar: 0,
            },
            newVehNumber: "",
            donatePrice: {
                virtMoney: 100,
                vipPlatinum: 1000,
                vipSilver: 500,
                changeVehNumber: 1000,
                changeName: 25,
                changeAppearance: 50,
            },
            newName: {
                firstName: "",
                lastName: "",
            },
        };
    },
    computed: {
        ...mapGetters({
            mainData: "getMainData",
            moneyData: "moneyData",
            skills: "getPlayerSkills",
            ticketList: "getAllTickets",
            playerProperty: "getPlayerProperty",
            taxPercent: "getTaxValues",
            fortisCoin: "getFortisCoin",
            vipStatus: "getVipStatus",
            blackScreen: "getBlackScreen",
        }),
        fullHudShow: {
            get: function() {
                return this.$store.getters.getFullHudShow;
            },
            set: function(bool) {
                storage.setFullHudShow(bool);
            },
        },
        chatMessageShow: {
            get: function() {
                return this.$store.getters.getChatMessageShow;
            },
            set: function(bool) {
                mp.trigger("cMiscSetChatMessageShow", bool);
            },
        },
        showNameTags: {
            get: function() {
                return this.$store.getters.getShowNametags;
            },
            set: function(bool) {
                mp.trigger("cMiscSetShowNametags", bool);
            },
        },
        selectedTicketId: {
            get: function() {
                return this.$store.getters.getSelectedTicketId;
            },
            set: function(id) {
                storage.setSelectedTicketId(id);
            },
        },
        showLastQuest: {
            get: function() {
                return this.$store.getters.getShowLastQuest;
            },
            set: function(bool) {
                mp.trigger("cPlayerSetShowLastQuest", bool);
            },
        },
        selectedTicketMessages: function() {
            if (this.selectedTicketId === false) return;
            return this.ticketList.find(t => t.id === this.selectedTicketId).messagesList;
        },
    },
    watch: {
        helpTab: function() {
            this.filterFaqs();
            this.filteredFaqs = this.filteredFaqs.map(faq => {
                faq.open = false;
                return faq;
            });
        },
    },
    methods: {
        filterFaqs: function() {
            this.filteredFaqs = this.faqs.filter(faq => {
                return faq.type === this.helpTab;
            });
        },
        toggleOpen: function(index) {
            this.filteredFaqs = this.filteredFaqs.map((faq, i) => {
                if (index === i) {
                    faq.open = !faq.open;
                } else {
                    faq.open = false;
                }
                return faq;
            });
        },
        changeNumber: function() {
            if (this.fortisCoin < this.donatePrice.changeVehNumber) return storage.addNotification({ text: "Недостаточно FC", theme: "error" });

            if (this.newVehNumber.length != 8) return storage.addNotification({ text: "Номер должен содержать 8 символов", theme: "error" });
            if (!/^[A-Z0-9]+$/.test(this.newVehNumber))
                return storage.addNotification({ text: "Номер может содержать только латинские заглавные буквы и/или цифры", theme: "error" });

            mp.trigger("cMisc-CallServerEvent", "sVehicleChangeNumber", this.newVehNumber);
        },
        exit: function() {
            mp.trigger("cSetPage", "none");
        },
        onKeyUp: function(e) {
            if (e.keyCode === 27) {
                this.exit();
            }
        },
        fixBirthDate: function(birth) {
            const day = birth.slice(0, 2);
            const month = birth.slice(2, 4);
            const year = birth.slice(4);
            return `${day}.${month}.${year}`;
        },
        reloadVoiceChat: function() {
            mp.trigger("cVoiceReload");
        },
        sendMsg: function() {
            if (!this.messageInput) return;
            // создан новый тикет через кнопку создания тикета
            if (this.selectedTicketId === -1) {
                let ticketName = this.messageInput;
                if (ticketName.length >= 47) ticketName = ticketName.slice(0, 47) + "...";
                const reportData = {
                    ticketName: this.messageInput,
                    id: -1,
                    messagesList: [{ from: "player", msg: this.messageInput, date: this.$store.getters.getDate, time: this.$store.getters.getTime }],
                };
                mp.trigger("cMisc-CallServerEvent", "sReportAddReport", JSON.stringify(reportData));
                this.messageInput = "";
                return;
            }
            // создан новый тикет просто введя сообщение в инпут
            if (this.selectedTicketId === false) {
                let ticketName = this.messageInput;
                if (ticketName.length >= 47) ticketName = ticketName.slice(0, 47) + "...";
                const reportData = {
                    ticketName: ticketName,
                    id: 0,
                    messagesList: [{ from: "player", msg: this.messageInput, date: this.$store.getters.getDate, time: this.$store.getters.getTime }],
                };
                mp.trigger("cMisc-CallServerEvent", "sReportAddReport", JSON.stringify(reportData));
                storage.addTicket(reportData);
                this.selectedTicketId = 0;
            } else {
                // отправка сообщения в уже созданный тикет
                if (this.selectedTicketId === 0) return;
                const message = {
                    messageData: { from: "player", msg: this.messageInput, date: this.$store.getters.getDate, time: this.$store.getters.getTime },
                    id: this.selectedTicketId,
                };
                storage.pushMessage(message);
                mp.trigger("cMisc-CallServerEvent", "sReportPushMessage", JSON.stringify(message));
            }
            this.messageInput = "";
            setTimeout(() => {
                this.$refs.chatField.scrollTop = this.$refs.chatField.scrollHeight;
            }, 0);
        },
        selectTicket: function(id) {
            this.selectedTicketId = id;
            setTimeout(() => {
                this.$refs.chatField.scrollTop = this.$refs.chatField.scrollHeight;
            }, 0);
        },
        getMsgClass: function(from) {
            if (from === "admin") {
                return "incoming-msg";
            } else {
                return "self-msg";
            }
        },
        selectedTicketClass: function(id) {
            if (id === this.selectedTicketId) return "ticket-select";
        },
        isTicketOpen: function() {
            const ticket = this.ticketList.find(t => t.id === this.selectedTicketId);
            if (!ticket) return true;
            if (!ticket.isClosed) return true;
        },
        createTicket: function() {
            const newTicket = this.ticketList.find(t => t.id === -1);
            if (newTicket) {
                return storage.addNotification({ text: "Новый тикет уже создан", theme: "error" });
            }
            const reportData = {
                ticketName: "Новый тикет",
                id: -1,
                messagesList: [],
            };
            storage.addTicket(reportData);
            this.selectedTicketId = -1;
        },
        setGpsPoint: function(type, id) {
            mp.trigger("cMisc-CallServerEvent", "sPlayerSetPropertyPoint", JSON.stringify({ type, id }));
        },
        mailChangeSendCode() {
            mp.trigger("cMisc-CallServerEvent", "sRegister-ChangeMailSendCode");
        },
        mailChangeVerifyCode() {
            if (!this.mailChange.code) return storage.addNotification({ text: "Введите код из письма", theme: "error" });
            if (!this.mailChange.newMail) return storage.addNotification({ text: "Введите новую почту", theme: "error" });
            if (this.mailChange.newMail.length > 40) return storage.addNotification({ text: "Email должен быть менее 40 символов", theme: "error" });
            var r = /^[0-9a-z-_\.]+\@[0-9a-z-_]{1,}\.[a-z]{1,}$/i;
            if (!r.test(this.mailChange.newMail)) return storage.addNotification({ text: "Некорректный email", theme: "error" });
            mp.trigger("cMisc-CallServerEvent", "sRegister-ChangeMail", this.mailChange.code, this.mailChange.newMail);
        },
        passChangeSendCode() {
            mp.trigger("cMisc-CallServerEvent", "sRegister-ChangePassSendCode");
        },
        passChangeVerifyCode() {
            if (!this.passChange.code) return storage.addNotification({ text: "Введите код из письма", theme: "error" });
            if (!this.passChange.newPass) return storage.addNotification({ text: "Введите новый пароль", theme: "error" });
            if (this.passChange.newPass.length < 6 || this.passChange.newPass.length > 20)
                return storage.addNotification({ text: "Пароль должен состоять из 6-20 символов.", theme: "error" });
            mp.trigger("cMisc-CallServerEvent", "sRegister-ChangePassMenu", this.passChange.code, this.passChange.newPass);
        },
        reloadDonate() {
            mp.trigger("cMisc-CallServerEvent", "sPlayerGetFortisCoin");
        },
        calcMoney(type, event) {
            let value = parseInt(event.target.value);
            if (!value) value = 0;
            this.calc[type] = value;
            if (type === "coin") {
                this.calc.dollar = this.calc.coin * this.donatePrice.virtMoney;
            } else if (type === "dollar") {
                this.calc.coin = this.calc.dollar / this.donatePrice.virtMoney;
            }
        },
        validateMoney() {
            if (this.calc.coin < 0) this.calc.coin = Math.abs(this.calc.coin);
            if (!Number.isInteger(this.calc.coin)) this.calc.coin = Math.ceil(this.calc.coin);
            this.calc.dollar = this.calc.coin * this.donatePrice.virtMoney;
        },
        convertMoney() {
            if (!this.calc.coin) return storage.addNotification({ text: "Введите сумму", theme: "error" });
            if (this.calc.coin > this.fortisCoin) return storage.addNotification({ text: "Недостаточно FC", theme: "error" });
            mp.trigger("cMisc-CallServerEvent", "sPlayerConvertMoney", this.calc.coin);
        },
        changeName() {
            if (!this.newName.firstName || !this.newName.lastName) {
                return storage.addNotification({ text: "Введите имя и фамилию", theme: "error" });
            }
            if (!/^[A-Za-z]{0,15}$/.test(this.newName.firstName)) {
                return storage.addNotification({ text: "Имя должно содержать только латинские буквы", theme: "error" });
            }
            if (!/^[A-Za-z]{0,15}$/.test(this.newName.lastName)) {
                return storage.addNotification({ text: "Фамилия должна содержать только латинские буквы", theme: "error" });
            }
            if (this.fortisCoin < this.donatePrice.changeName) return storage.addNotification({ text: "Недостаточно FC", theme: "error" });
            mp.trigger("cMisc-CallServerEvent", "sPlayerChangeName", this.newName.firstName, this.newName.lastName);
        },
        changeAppearance() {
            if (this.fortisCoin < this.donatePrice.changeAppearance) return storage.addNotification({ text: "Недостаточно FC", theme: "error" });
            mp.trigger("cMisc-CallServerEvent", "sPlayerChangeAppearance");
        },
        buyVip(type) {
            if (this.fortisCoin < this.donatePrice[type]) return storage.addNotification({ text: "Недостаточно FC", theme: "error" });
            mp.trigger("cMisc-CallServerEvent", "sPlayerBuyVip", type);
        },
        openQuestMenu() {
            storage.setPage('questMenu');
        },
    },
    filters: {
        divideNumber: x => {
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            return parts.join(",");
        },
    },
    created() {
        this.filterFaqs();
        document.addEventListener("keyup", this.onKeyUp);
    },
    beforeDestroy() {
        document.removeEventListener("keyup", this.onKeyUp);
    },
};
</script>
<style scoped lang="scss">
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
.full{
    width: 100%;
    height: 100%;
}
.center{
    display: flex;
    justify-content: center;
    align-items: center;
}
img{
    max-width: 100%
}
.flex{
    display: flex;
}
.w-50{
    width: 50%;
}
.v-center{
    display: flex;
    align-items: center;
}
.align-right{
    justify-content: flex-end;
}
    .text-center{
        text-align: center;
    }
    .main-menu{
        width: 55.26vw;
        height: 34vw;
        box-shadow: 0.52vw -0.16vw 2.08vw rgba(0, 0, 0, 0.38);
        border-radius: 0.52vw;
        background-color: rgba(23, 52, 113, 0.9);
        display: flex;
        position: relative;
    }
    .sidebar{
        width: 26%;
        padding-top: 2.97vw;
    }
    .content{
        width: 74%;
    }
    .sidebar-title{
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 1.72vw;
        font-weight: bold;
        letter-spacing: -0.09vw;
        padding-left: 1.04vw;
    }
    .sidebar-menu{
        margin-top: 1.5vw;
    }
    .sidebar-menu-item{
        width: 100%;
        height: 2.45vw;
        background-color: #182e5b;
        border-top-right-radius: 0.52vw;
        border-bottom-right-radius: 0.52vw;
        margin-bottom: 0.57vw;
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 1.25vw;
        letter-spacing: -0.06vw;
        padding-left: 1.04vw;
        display: flex;
        align-items: center;
        transition: 0.15s;
    }
    .sidebar-menu-item:hover, .sidebar-menu-item.active{
        background-color: #277abf;
    }
    
    .content .header{
        display: flex;
        width: 100%;
        margin-top: 4.17vw;
        padding-right: 2.97vw;
    }
    .content-title{
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 1.56vw;
        font-weight: 700;
        line-height: 1.88vw;
        margin-left: auto;
        text-align: right;
    }
    .player-menu{
        padding-top: 2.21vw;
        display: flex;
        margin-left: 2vw;
    }
    .player-menu-item{
        background-color: #182e5b;
        height: 2.5vw;
        padding: 0 0.78vw;
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.94vw;
        letter-spacing: -0.02vw;
        transition: 0.15s;
    }
    .player-menu-item:hover,.player-menu-item.active{
        background-color: #277abf;
    }
    .player-menu-item.item-1{
        border-bottom-left-radius: 0.52vw;
        border-top-left-radius: 0.52vw;
    }
    .player-menu-item.item-2{
        border-right: 0.05vw solid #182e5b;
        border-left: 0.05vw solid #182e5b;
    }
    .player-menu-item.item-3{
        border-bottom-right-radius: 0.52vw;
        border-top-right-radius: 0.52vw;
    }
    .chel-image{
        width: 11.93vw;
        height: 25.26vw;
        position: absolute;
        bottom: 0;
        left: 15vw
    }
    .player-info{
        margin-left: 11.82vw;
        margin-top: 1.93vw;
        width: 18.33vw;
    }
    .player-info-header{
        width: 100%;
        height: 5.05vw;
        background-color: #182e5b;
        border-top-left-radius: 0.52vw;
        border-top-right-radius: 0.52vw;
        display: flex;
    }
    .player-info-item{
        width: 100%;
        height: 2.5vw;
        background-color: #277abf;
        margin-bottom: 0.52vw;
    }
    .player-info-header .w-50{
        padding-right: 1vw;
    }
    .player-info-header .text{
        text-align: right;
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.89vw;
        font-weight: 400;
        letter-spacing: -0.04vw;
    }
    .player-info-header .text.title{
        font-size: 1.04vw;
        font-weight: bold;
        margin-bottom: 0.5vw;
    }
    .player-info-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1vw;
    }
    .player-info-item .text{
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.83vw;
        font-weight: 300;
        letter-spacing: -0.04vw;
        text-align: right;
    }
    .skill{
        margin-left: 2vw;
        margin-top: 3vw;
        display: flex;
        flex-wrap: wrap;
        max-height: 20vw;
        overflow-y: auto; 
    }
    .skill::-webkit-scrollbar{
        width: 0.52vw;
    }
    .skill::-webkit-scrollbar-track{
        background-color: #182e5b;
        border-radius: 0.52vw
    }
    .skill::-webkit-scrollbar-thumb{
        background-color: #277abf;
        border-radius: 0.52vw
    }
    .skill-item{
        width: 10.05vw;
        height: 5.1vw;
        background-color: #277abf;
        border-radius: 0.52vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 2vw;
        margin-bottom: 2vw;
        padding: 0 1vw;
    }
    .skill-icon{
        width: 3vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .skill-percent{
        color: #ffffff;
        font-family: "NewYorkNineteenSixty";
        font-size: 1.93vw;
        font-weight: bold;
        letter-spacing: 0.04vw;
        text-align: right
    }
    .skill-name{
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.89vw;
        font-weight: 300;
        letter-spacing: -0.09vw;
        text-align: right
    }
    .card{
        width: 14.11vw;
        height: 10.63vw;
        border-radius: 0.52vw;
        background-color: rgba(39, 123, 191, 0.9);
        margin-bottom: 0.5vw;
        position: relative;
    }
    .card-body{
        max-height: 6.8vw;
        overflow-y: auto;
        padding: 0 0.69vw;
    }
    .house .card-body{
        max-height: 17.47vw;
    }
    .card-body.scrollable{
        &::-webkit-scrollbar{
            width: 0.3vw;
        }
        &::-webkit-scrollbar-track{
            width: 0.3vw;
            border-radius: 0.3vw;
            background-color: darken(rgba(39, 123, 191, 0.9),10%);
        }
        &::-webkit-scrollbar-thumb{
            width: 0.3vw;
            border-radius: 0.3vw;
            background-color: rgba(255, 255, 255, 0.986);
        }
    }
    .property{
        margin-left: 2vw;
        margin-top: 1.5vw;
        display: flex;
    }
    .card.house{
        height: 21.67vw;
        margin-right: 1.5vw;
    }
    .card-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 3vw;
        padding: 0 0.69vw;
    }
    .card-icon{
        width: 2.2vw;
        display: flex;
        align-items: center;
    }
    .card-title{
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 1.15vw;
        font-weight: 700;
        letter-spacing: -0.05vw;
    }
    .card-item{
        background: lighten(rgba(39, 123, 191, 0.9),10%);
        padding: 0.52vw 0.52vw;
        border-radius: 0.52vw;
        margin-bottom: 0.52vw;
        &:last-child{
            margin-bottom: 0;
        }
    }
    .card-item-row{
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5vw;
    }
    .card-item-row .text{
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.83vw;
        font-weight: 300;
        letter-spacing: -0.05vw;
    }
    .card-item-footer{
        display: flex;
        justify-content: center;
        width: 100%;
    }
    .gps{
        width: 100%;
        height: 1.2vw;
        border-radius: 1.2vw;
        background-color: #ffffff;
        color: #015394;
        font-family: "Gotham Pro";
        font-size: 0.83vw;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: -0.08vw;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.2s;
        &:hover{
            background:rgba(25, 80, 126, 0.9);
            color: #fff;
        }
    }
    .content-name{
        color: #ffffff;
        font-family: "Myriad Pro";
        font-size: 1.25vw;
        font-weight: 400;
        margin-left: 2vw;
    }
    .accordion{
        margin-bottom: 2vw;
    }
    .help .tabs{
        display: flex;
        margin-left: 2vw;
    }
    .help .btn{
        width: 8.8vw;
        height: 2.29vw;
        border-radius: 0.52vw;
        background-color: #277abf;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.94vw;
        font-weight: 300;
        letter-spacing: -0.05vw;
        transition: 0.2s;
        margin-right: 0.52vw;
    }
    .help .btn.active{
        background-color: #c74f4f;
    }
    .faq{
	    margin-bottom: 1vw;
    }
    .faq .question {
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.83vw;
        font-weight: 300;
        letter-spacing: -0.18px;
        width: 100%;
        height: 2.03vw;
        background-color: #002a50;
        display: flex;
        align-items: center;
        padding: 0 0.63vw;
        border-radius: 0.52vw
    }
    .faq .answer {
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.73vw;
        font-weight: 300;
        letter-spacing: 0.63px;
        width: 100%;
        background-color: #182e5b;
        border-radius: 0.52vw;
        transition: 0.3s;
        opacity: 0;
        padding: 0 1vw;
        transition: 0.2s;
    }
    .faq.open .answer {
        padding: 0 1vw;
        padding-top: 0.52vw;
        opacity: 1;
        height: 5.21vw;
    }
    .accordion{
        margin-top: 2vw;
        margin-left: 2vw;
        margin-right: 1vw;
        height: 16.67vw;
        overflow-y: auto; 
        padding-right: 1vw;
    }
    .accordion::-webkit-scrollbar,.accordion-body::-webkit-scrollbar{
        width: 0.52vw;
    }
    .accordion::-webkit-scrollbar-track,.accordion-body::-webkit-scrollbar-track{
        background-color: rgba(24, 46, 91, 0.6);
        border-radius: 0.52vw
    }
    .accordion::-webkit-scrollbar-thumb,.accordion-body::-webkit-scrollbar-thumb{
        background-color: #277abf;
        border-radius: 0.52vw
    }
    .accordion-item{
        width: 100%;
        border-radius: 0.52vw;
        background-color: #182e5b;
        margin-bottom: 0.55vw;
    }
    .accordion-header{
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.83vw;
        font-weight: 300;
        letter-spacing: -0.18px;
        width: 100%;
        height: 2.03vw;
        background-color: #002a50;
        display: flex;
        align-items: center;
        padding: 0 0.63vw;
        border-radius: 0.52vw
    }
	.accordion-icon img{
		max-width: 100%;
	}
    .accordion-icon{
        width: 0.78vw;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 0.63vw;
    }
    .accordion-body{
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.73vw;
        font-weight: 300;
        letter-spacing: 0.63px;
        width: 100%;
        background-color: #182e5b;
        border-radius: 0.52vw;
        padding: 0 1vw;
        padding-top: 0;
        transition: 0.3s;
		height: 0;
		opacity: 0;
		overflow-y: auto;
    }
	.faq.open .accordion-body {
		opacity: 1;
		height: 8vw;
		padding-top: 0.52vw;
        padding-bottom: 0.52vw;
	}
    .accordion-status{
        margin-left: auto;
        margin-top: 0.42vw;
        border: 0.42vw solid transparent;
        border-top: 0.42vw solid #277abf;
        transform-origin: center 25%;
        transition: 0.2s;
    }
    .accordion-status.active{
        transform: rotate(180deg)
    }
.report{
    .content-name{
        font-size: 0.94vw;
        font-weight: 300;
        font-family: "Gotham Pro";
        letter-spacing: -0.05vw;
    }
    .chat{
        width: 21.51vw;
        height: 18.75vw;
        border-radius: 0.52vw;
        background-color: #182e5b;
        margin-top: 1.3vw;
    }
    &-content{
        margin-left: 2vw;
        display: flex;
        width: 100%;
    }
    .chat-field{
        height: 100%;
        width: 100%;
        padding: 0.5vw;
        overflow-y: auto;
        &-wrapper{
            height: 87%;
            width: 100%;
            padding: 0.4vw 0.2vw
        }
        &::-webkit-scrollbar{
            width: 0.3vw;
        }
        &::-webkit-scrollbar-track{
            background-color: rgba(18, 33, 64, 0.5);
            border-radius: 0.3vw
        }
        &::-webkit-scrollbar-thumb{
            background-color: #044480;
            border-radius: 0.3vw
        }
        .msg-wrapper{
            margin-bottom: 1vw;
            display: flex;
            flex-direction: column;
        }
        .self-msg{
            align-items: flex-end
        }
        .incoming-msg{
            align-items: flex-start
        }
        .msg{
            max-width: 75%;
            padding: 0.5vw 0.83vw;
            border-radius: 0.52vw;
            background-color: #277abf;
            color: #ffffff;
            font-family: "Gotham Pro";
            font-size: 0.83vw;
            font-weight: 300;
            letter-spacing: -0.05vw;
            margin-bottom: 0.2vw;
            word-break: break-all;
        }
        .msg-admin{
            font-size: 0.7vw;   
        }
        .msg-date{
            display: flex;
            justify-content: flex-end;
            color: #ffffff;
            font-family: "Gotham Pro";
            font-size: 0.57vw;
            font-weight: 300;
            letter-spacing: -0.55px;
            .time{
                margin-right: 0.2vw;
            }
        }
    }
    .chat-input{
        height: 13%;
        width: 100%;
        background-color: #122140;
        border-bottom: 0.26vw solid #277abf;
        display: flex;
        input[type="text"]{
            width: 88%;
            height: 100%;
            border: none;
            background: transparent;
            color: #ffffff;
            font-family: "Gotham Pro";
            font-size: 0.89vw;
            font-weight: 300;
            padding: 0 0.8vw;
        }
        .btn{
            width: 12%;
            height: 100%;
            background: url('/img/menu/mail.png') no-repeat;
            background-size: 40%;
            background-position: center;
        }
    }
    .tickets-list{
        overflow-y: auto;
        width: 14.06vw;
        height: 17.75vw;
        padding: 0.5vw 0.83vw;
        &::-webkit-scrollbar{
            width: 0.3vw;
        }
        &::-webkit-scrollbar-track{
            background-color: rgba(18, 33, 64, 0.5);
            border-radius: 0.3vw
        }
        &::-webkit-scrollbar-thumb{
            background-color: #044480;
            border-radius: 0.3vw
        }
    }
    .tickets-list-wrapper{
        padding: 0.5vw 0.2vw; 
    }
    .tickets{
        border-radius: 0.52vw;
        background-color: #182e5b;
        margin-left: 1.61vw;
        margin-top: 1.3vw;
        position: relative;
        .tickets-title{
            color: #ffffff;
            font-family: "Gotham Pro";
            font-size: 0.94vw;
            position: absolute;
            top: -1.56vw;
            left: 0.52vw
        }
        .ticket{
            width: 100%;
            color: #ffffff;
            font-family: "Gotham Pro";
            font-size: 0.83vw;
            font-weight: 300;
            padding: 0.5vw 0.83vw;
            border-radius: 0.52vw;
            background-color: #044480;
            margin-bottom: 0.5vw;
            transition: 0.2s;
            word-break: break-all;
            &:hover{
                background-color: lighten(#044480, 10%);
            }
        }
        .ticket-select {
            background-color: lighten(#044480, 10%);
        }
    } 
}
.donate{
    padding-left: 2vw;
    .header{
        display: flex;
        align-items: center
    }
    .balance{
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.94vw;
        font-weight: bold;
        letter-spacing: -0.05vw;
        display: flex;
        align-items: center;
    }
    .balance-title{
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.94vw;
        font-weight: bold;
        letter-spacing: -0.05vw;
        margin-right: 1.3vw;
    }
    .balance-amount{
        font-size: 1.61vw;
        font-weight: bold;
        color: #ffffff;
        letter-spacing: 0.04vw;
        .num{
            font-family: "NewYorkNineteenSixty";
            letter-spacing: 0.04vw;
            margin-right: 0.52vw;
        }
        .fp{
            font-family: "Myriad Pro";
            text-transform: uppercase;
        }
    }
    .body{
        padding-right: 2.97vw;
        .title{
            color: #ffffff;
            font-family: "Gotham Pro";
            font-size: 1.25vw;
            font-weight: bold;
            letter-spacing: -0.07vw;
            margin: 0.6vw 0;
        }
        .description{
            color: #ffffff;
            font-family: "Gotham Pro";
            font-size: 0.94vw;
            letter-spacing: -0.05vw;
        }
    }
    .control-block{
        margin-top: 1vw;
        display: flex;
    }
    .side{
        width: 13.25vw;
    }
    .list{
        height: 19.5vw;
        overflow-y: auto;
        padding-right: 1vw;
        &::-webkit-scrollbar{
            width: 0.52vw;
        }
        &::-webkit-scrollbar-track{
            background-color: rgba(18, 33, 64, 0.5);
            border-radius: 0.52vw
        }
        &::-webkit-scrollbar-thumb{
            background-color: #277abf;
            border-radius: 0.52vw
        }
    }
    .item{
        width: 100%;
        height: 2.29vw;
        border-radius: 0.52vw;
        background-color: #277abf;
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.94vw;
        font-weight: 300;
        letter-spacing: -0.05vw;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin-bottom: 0.94vw;
        transition: 0.2s;
        &:hover{
            background-color: darken(#277abf, 5%)
        }
        &.active{
            background-color: #c74f4f;
        }
        &:last-child{
            margin-bottom: 0;
        }
    }
    .donate-action{
        width: 16.3vw;
        padding: 1vw 1.5vw;
        background-color: #182e5b;
        margin-left: 5.52vw;
        border-radius: 0.52vw;
        position: relative;
        padding-bottom: 3.34vw;
        .action-body{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            margin-bottom: 0.5vw;
        }
        .action-footer{
            display: flex;
            justify-content: center;
            width: 100%;
            bottom: 1vw;
            left: 0;
            position: absolute;
        }
        .action-btn{
            width: 9.06vw;
            height: 2.34vw;
            background-color: #c74f4f;
            border-radius: 0.52vw;
            color: #ffffff;
            font-family: "Gotham Pro";
            font-size: 1.04vw;
            letter-spacing: -0.07vw;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.2s;
            &:hover{
                background-color: darken(#c74f4f, 10%)
            }
        }
        .action-input{
            position: relative;
        }
        .action-input.big input[type="number"]{
                height: 2.14vw;
            }
        .action-input input[type="number"]{
            width: 11.72vw;
            height: 1.67vw;
            border-radius: 0.52vw;
            background-color: #044480;
            border: none;
            padding: 0 0.5vw;
            color: #ffffff;
            font-family: "Gotham Pro";
            font-size: 0.99vw;
            font-weight: bold;
            letter-spacing: 0.04vw;
            text-align: center;
           
        }
        .equal{
            color: #ffffff;
            font-family: "Myriad Pro";
            font-size: 1.2vw;
            font-weight: 400;
        }
        .dollar::after,.frub::after{
            position: absolute;
        }
        .dollar::after{
            content: '$';
            font-size: 1.5vw;
            font-family: monospace;
            text-transform: uppercase;
            left: 103%;
            line-height: 1.67vw;
            color: #ffffff;
        }
        .frub::after{
            content: 'FC';
            color: #ffffff;
            font-family: "Myriad Pro";
            font-size: 1.2vw;
            font-weight: bold;
            text-transform: uppercase;
            left: 103%;
            line-height: 1.67vw;
        }
        .text{
            color: #ffffff;
            font-family: "Gotham Pro";
            font-size: 0.78vw;
            font-weight: 300;
            width: 100%;
            margin-bottom: 0.5vw;
            .red{
                color: #c74f4f;
            }
        }
        .action-title{
            color: #b9b9b9;
            font-family: "Gotham Pro";
            font-size: 0.73vw;
            font-weight: 300;
            margin-bottom: 0.1vw;
        }
        .action-title.big{
            color: #b9b9b9;
            font-family: "Gotham Pro";
            font-size: 0.93vw;
            font-weight: 300;
            text-align: center;
        }
        .action-item{
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
        .veh-number{
            margin-left: auto;
        }
        .action-list{
            &::-webkit-scrollbar{
            width: 0.3vw;
            }
            &::-webkit-scrollbar-track{
                background-color: rgba(18, 33, 64, 0.5);
                border-radius: 0.3vw
            }
            &::-webkit-scrollbar-thumb{
                background-color: #277abf;
                border-radius: 0.3vw
            }
        }
        .action-item{
            color: #ffffff;
            font-family: "Gotham Pro";
            font-size: 0.73vw;
            font-weight: 300;
            letter-spacing: -0.05vw;
            display: flex;
            align-items: center;
            margin-bottom: 0.5vw;
            position: relative;
            .btn{
                position: absolute;
                width: 1.4vw;
                height: 1.4vw;
                background: url('/img/menu/pencil-create.png') no-repeat;
                background-size: 50%;
                background-position: center;
                margin-left: 0.3vw;
                left: 100%
            }
        }
        .veh-number input[type="text"]{
            background-color: #044480;
            border-radius: 0.52vw;
            padding: 0.2vw 0.3vw;
            border: none;
            color: #ffffff;
            font-family: "Gotham Pro";
            font-size: 0.73vw;
            text-align: center;
            width: 8vw;
            // text-transform: uppercase;
        }
        .veh-number.active input[type="text"]{
            background-color: #277abf;
        }
    }
}
.settings{
    .content-name{
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 1.25vw;
        font-weight: bold;
    }
    .content-info{
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.94vw;
        font-weight: 300;
        margin-left: 2vw;
        margin-top: 0.8vw;
    }
    .body{
        display: flex;
        padding: 1vw 2vw;
        flex-flow: wrap;
        justify-content: space-between;
        align-content: space-between;
        height: 10vw;
    }
    .col{
        height: 100%;
        margin-right: 0.5vw;
    }
    .block{
        height: 2.29vw;
        width: 12vw;
        border-radius: 0.52vw;
        background-color: #277abf;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.8vw;
        transition: 0.2s;
        position: relative;
    }
    .block-1{
        width: 13.49vw;
    }
    .block-2{
        width: 11.09vw;
    }
    .block-2.mailchange{
        width: 13.49vw;
    }
    .block.active{
        background-color: #c74f4f;
    }
    .block-name{
        color: #ffffff;
        font-family: "Gotham Pro";
        font-size: 0.94vw;
        font-weight: 300;
        letter-spacing: -0.05vw;
    }
    .block-check{
        display: flex;
        align-items: center;
    }
    .block-icon{
        width: 1.5vw;
        height: 1.5vw;
        background: url('/img/menu/pencil-create.png') no-repeat;
        background-size: 50%;
        background-position: center;

    }
    .block-margin{
        margin-bottom: 0.5vw;
    }
    .change-password {
        position: absolute;
        right: 1vw;
    }
    .change-mail {
        position: absolute;
        right: 14vw;
    }
    .change-data{
        bottom: 5vw;
        .item{
            margin-bottom: 0.52vw;
        }
        .item-name{
            color: #ffffff;
            font-family: "Gotham Pro";
            font-size: 0.68vw;
            font-weight: 300;
            letter-spacing: -0.05vw;
            margin-bottom: 0.52vw;
        }
        .item-data{
            width: 6.56vw;
            height: 1.3vw;
            border-radius: 10px;
            background-color: #277abf;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-family: "Gotham Pro";
            font-size: 0.73vw;
            font-weight: 300;
        }
        .item-data-icon{
            background: url('/img/menu/mail.png') no-repeat;
            width: 0.94vw;
            height: 0.73vw;
            background-size: contain;
            margin-left: 0.3vw;
        }
        .item-input input[type="text"]{
            width: 6.56vw;
            height: 1.3vw;
            border-radius: 0.52vw;
            border: none;
            background-color: #277abf;
            text-align: center;
            padding: 0 0.4vw;
            color: #ffffff;
            font-family: "Gotham Pro";
            font-size: 0.83vw;
            font-weight: 300;
            letter-spacing: -0.05vw;
        }
        .item-input.big input[type="text"]{
            width: 9.58vw;
        }
        .main-btn{
            width: 6.2vw;
            height: 1.3vw;
            background-color: #c74f4f;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #ffffff;
            font-family: "Gotham Pro";
            font-size: 0.68vw;
            font-weight: 300;
            border-radius: 0.52vw;
            margin-top: 1vw;
        }
    }
}
.layerForClick{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}
.flex-start{
    justify-content: flex-start!important
}
.switch {
    position: relative;
    display: inline-block;
    width: 2.6vw;
    height: 1.04vw;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.switch-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #EBE9F4;
    transition: .4s;
}

.switch-slider:before {
    position: absolute;
    content: "";
    left: 0;
    bottom: 0.1vw;
    margin-left: 0.1vw;
    transition: .4s;
    width: 0.83vw;
    height: 0.83vw;
    box-shadow: 0.05vw 0.05vw 0.16vw rgba(0, 0, 0, 0.69);
    background: #edecee;
    background-image: linear-gradient(to top, rgba(136, 136, 136, 0.25) 0%, rgba(136, 136, 136, 0) 100%);
}

.switch input:checked + .switch-slider {
    background-image: linear-gradient(to top,#6CD148 0%, #7BE057 100%)
}
.switch.purple input:checked + .switch-slider{
    background: linear-gradient(to right,#333981 0%, #434db2 100%)
}

.switch input:focus + .switch-slider {
    box-shadow: inset 0px 0px 0.16vw rgba(0, 0, 0, 0.267);
}

.switch input:checked + .switch-slider:before {
    transform: translateX(1.61vw);
}
.switch-slider.round {
    border-radius: 1.04vw;
}

.switch-slider.round:before {
    border-radius: 50%;
}
.new-ticket {
    width: 70%;
    color: #ffffff;
    font-family: "Gotham Pro";
    font-size: 0.83vw;
    font-weight: 300;
    padding: 0.5vw 0.83vw;
    border-radius: 0.52vw;
    background-color: #044480;
    margin-bottom: 0.5vw;
    -webkit-transition: 0.2s;
    transition: 0.2s;
    text-align: center;
    height: 1.9vw;
    display: grid;
    align-items: center;
    margin: auto;
}
.reload-donate-btn {
    width: 6.06vw;
    height: 1.64vw;
    margin-left: 1vw;
    background-color: #c74f4f;
    border-radius: 0.52vw;
    color: #ffffff;
    font-family: "Gotham Pro";
    font-size: 1vw;
    font-weight: 500;
    letter-spacing: -0.07vw;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
    &:hover{
        background-color: darken(#c74f4f, 10%)
    }
}
.action-input .change-name {
    background-color: #277abf;
    border-radius: 0.52vw;
    padding: 0.2vw 0.3vw;
    border: none;
    color: #ffffff;
    font-family: "Gotham Pro";
    font-size: 0.73vw;
    text-align: center;
    width: 8vw;
}
.vip-status {
    color: #ffffff;
    font-family: "Gotham Pro";
    font-size: 1.25vw;
}
/* /deep/ для использования в v-html по другому не работает */
/deep/ .faq-header {
    margin: 0.3vw 0;
    font-weight: 600;
}
.blackBg{ 
    background-color: #000;
}
</style>