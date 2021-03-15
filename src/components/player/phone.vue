<template>
    <div class="wrapper">
        <div class="phone-wrapper" @click="closeMsgMenu($event)">
            <div class="phone-img"></div>
            <div class="light"></div>
            <div class="phone-inner">
                <div class="background" :style="{ backgroundImage: `url(${bgList[bgIndex]})` }">
                    <transition name="fade">
                        <div class="home-screen" v-if="page === 'home'">
                            <div class="time-wrapper">
                                <div class="time">
                                    <span class="hour">{{ timeData.time.hour }}</span> <span class="dots">:</span> <span class="min">{{ timeData.time.mins }}</span>
                                </div>
                                <div class="line"></div>
                                <div class="date">
                                    <div class="this-date">{{ timeData.date.day }}/{{ timeData.date.month }}/{{ timeData.date.year }}</div>
                                    <div class="v-line">|</div>
                                    <div class="day">{{ getWeekDay(timeData.weekday) }}</div>
                                </div>
                            </div>
                            <div class="icons">
                                <div class="icons-row">
                                    <div class="icons-item"><img @click="setPage('forent')" src="/img/phone/forent-icon.png" alt="" /></div>
                                    
                                </div>
                                <div class="icons-row">
                                    <div class="icons-item"><img @click="setPage('settings')" src="/img/phone/settings.png" alt="" /></div>
                                    <div class="icons-item"><img @click="setPage('weazel')" src="/img/phone/weazel-news.png" alt="" /></div>
                                    <div class="icons-item"><img @click="setPage('weazelRadio')" src="/img/phone/radio.png" alt=""></div>
                                </div>
                                <div class="icons-row">
                                    <div class="icons-item"><img @click="page = 'contacts'" src="/img/phone/contact.png" alt="" /></div>
                                    <div class="icons-item"><img @click="(page = 'gps'), (gpsTab = 1)" src="/img/phone/gps.png" alt="" /></div>
                                    <div class="icons-item"><img @click="setPage('taxi')" src="/img/phone/taxi.png" alt="" /></div>
                                </div>
                                <div class="icons-row">
                                    <div class="icons-item"><img @click="setPage('messages')" src="/img/phone/message.png" alt="" /></div>
                                    <div class="icons-item"><img @click="setPage('enterNumber')" src="/img/phone/phone-i.png" alt="" /></div>
                                    <div class="icons-item"><img src="/img/phone/internet.png" alt="" /></div>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <transition name="fade">
                        <div class="messages-item" v-if="page === 'messagesItem'">
                            <div class="header">
                                <div class="back"><img @click="setPage('messages')" src="/img/phone/back.png" alt="" /></div>
                                <div class="title">{{ chekNumberInBook(msgListSelect.number) }}</div>
                                <div class="menu dont-close" @click="msgMenu = true">
                                    <img class="dont-close" src="/img/phone/menu.png" alt="" />
                                    <ul class="context-menu dont-close" v-if="msgMenu === true">
                                        <li class="dont-close" @click="deleteMsg(msgListSelect.number)">Удалить переписку</li>
                                        <li class="dont-close" @click="addContactPage(msgListSelect.number)">Добавить контакт</li>
                                        <li class="dont-close" @click="callContactBook()">Позвонить</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="body" ref="smsList">
                                <div v-for="(i, index) in msgListSelect.data">
                                    <div class="companion-msg-item mb" v-if="i.type === 'from'">
                                        <div class="user-icon"><img src="/img/phone/user-icon.png" alt="" /></div>
                                        <div class="companion-msg-item-text">
                                            <div class="companion-msg-item-text2">{{ i.msg }}</div>
                                            <div class="companion-msg-item-date">{{ formatDate(i.time) }}</div>
                                        </div>
                                    </div>
                                    <div class="my-msg-item mb" v-if="i.type === 'to'">
                                        <div class="my-msg-item-text">
                                            <div class="my-msg-item-text2">{{ i.msg }}</div>
                                            <div class="my-msg-item-date">{{ formatDate(i.time) }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="footer">
                                <input class="input" type="text" maxlength="1000" placeholder="Новое сообщение" v-model.trim="sendMsgText" v-on:keydown.enter="pushSMS()" />
                                <div class="btn blue-item" @click="pushSMS()"><img src="/img/phone/send.png" alt="" /></div>
                            </div>
                        </div>
                    </transition>
                    <transition name="fade">
                        <div class="messages" v-if="page === 'messages'">
                            <div class="header">
                                <div class="title">Сообщения</div>
                            </div>
                            <div class="body">
                                <div class="messages-content">
                                    <div v-for="(i, index) in phoneSMS">
                                        <div class="message blue-item" @click="readSMS(index)">
                                            <div class="message-icon"><img src="/img/phone/user-icon.png" alt="" /></div>
                                            <div class="message-wrap">
                                                <div class="message-num">
                                                    <div class="num">{{ chekNumberInBook(i.number) }}</div>
                                                    <div class="num2" v-if="i.unread">{{ i.unread }}</div>
                                                </div>
                                                <div class="message-preview">{{ lastMsg(i) }}</div>
                                            </div>
                                            <div class="message-time">{{ lastMsgTime(i) }}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="messages-action">
                                    <div class="action-text" @click="setPage('messageCreate')">Написать новое сообщение</div>
                                    <div class="action-btn"><img src="/img/phone/sendmsg.png" alt="" @click="setPage('messageCreate')" /></div>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <transition name="fade">
                        <div class="enter-number" v-if="page === 'enterNumber'">
                            <div class="header">
                                <div class="enter-nmber-icon" @click="page = 'journal'"><img src="/img/phone/journal.png" alt="" /></div>
                            </div>
                            <div class="window">
                                <div class="num">{{ totalNumber | phoneNumberFilter }}</div>
                                <div class="add" @mouseenter="tooltip = true" @mouseleave="tooltip = false">
                                    <img src="/img/phone/add.png" alt="" @click="addContactPage(totalNumber)" />
                                    <div class="tooltip" :class="{ active: tooltip === true }">Добавить контакт</div>
                                </div>
                            </div>
                            <div class="body">
                                <div class="keyboard">
                                    <div class="row">
                                        <div class="row-item blue-item" v-on:click.self="setNumber(1)">
                                            <div class="num" v-on:click.self="setNumber(1)">1</div>
                                            <div class="words" v-on:click.self="setNumber(1)"></div>
                                        </div>
                                        <div class="row-item blue-item" v-on:click.self="setNumber(2)">
                                            <div class="num" v-on:click.self="setNumber(2)">2</div>
                                            <div class="words" v-on:click.self="setNumber(2)">abc</div>
                                        </div>
                                        <div class="row-item blue-item" v-on:click.self="setNumber(3)">
                                            <div class="num" v-on:click.self="setNumber(3)">3</div>
                                            <div class="words" v-on:click.self="setNumber(3)">def</div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="row-item blue-item" v-on:click.self="setNumber(4)">
                                            <div class="num" v-on:click.self="setNumber(4)">4</div>
                                            <div class="words" v-on:click.self="setNumber(4)">ghi</div>
                                        </div>
                                        <div class="row-item blue-item" v-on:click.self="setNumber(5)">
                                            <div class="num" v-on:click.self="setNumber(5)">5</div>
                                            <div class="words" v-on:click.self="setNumber(5)">jkl</div>
                                        </div>
                                        <div class="row-item blue-item" v-on:click.self="setNumber(6)">
                                            <div class="num" v-on:click.self="setNumber(6)">6</div>
                                            <div class="words" v-on:click.self="setNumber(6)">mno</div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="row-item blue-item" v-on:click.self="setNumber(7)">
                                            <div class="num" v-on:click.self="setNumber(7)">7</div>
                                            <div class="words" v-on:click.self="setNumber(7)">pqrs</div>
                                        </div>
                                        <div class="row-item blue-item" v-on:click.self="setNumber(8)">
                                            <div class="num" v-on:click.self="setNumber(8)">8</div>
                                            <div class="words" v-on:click.self="setNumber(8)">tuv</div>
                                        </div>
                                        <div class="row-item blue-item" v-on:click.self="setNumber(9)">
                                            <div class="num" v-on:click.self="setNumber(9)">9</div>
                                            <div class="words" v-on:click.self="setNumber(9)">wxyz</div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="row-item blue-item">
                                            <div class="num">*</div>
                                            <div class="words"></div>
                                        </div>
                                        <div class="row-item blue-item" v-on:click.self="setNumber(0)">
                                            <div class="num" v-on:click.self="setNumber(0)">0</div>
                                            <div class="words" v-on:click.self="setNumber(0)">+</div>
                                        </div>
                                        <div class="row-item blue-item">
                                            <div class="num">#</div>
                                            <div class="words"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="actions">
                                    <div class="call" @click="callNumber">
                                        <img src="/img/phone/call.png" alt=""/>
                                    </div>
                                    <div class="delete"><img src="/img/phone/delete.png" alt="" @click="totalNumber = ''" /></div>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <div v-if="page === 'outgoingCall'" class="call outgoing-call page-body-bg">
                        <div class="call-icon">
                            <img src="/img/phone/wave-icon.png" alt="" />
                        </div>
                        <div class="number">{{ chekNumberInBook(calling) }}</div>
                        <div class="call-type">
                            <div>Исходящий звонок</div>
                        </div>
                        <div class="btns">
                            <div class="btn">
                                <img src="/img/phone/ignore-call.png" alt="" @click="endCall(1)" />
                            </div>
                        </div>
                    </div>
                    <div v-if="page === 'callNow'" class="call outgoing-call">
                        <div class="call-icon">
                            <img src="/img/phone/wave-icon.png" alt="" />
                        </div>
                        <div class="number">{{ chekNumberInBook(phoneCall) }}</div>
                        <div class="call-type">
                            <div>Время разговора: {{ timerCallData }}</div>
                        </div>
                        <div class="btns">
                            <div class="btn">
                                <img src="/img/phone/ignore-call.png" alt="" @click="endCall" />
                            </div>
                        </div>
                    </div>
                    <div v-if="page === 'incomingCall'" class="call page-body-bg">
                        <div class="call-icon">
                            <img src="/img/phone/wave-icon.png" alt="" />
                        </div>
                        <div class="number">{{ chekNumberInBook(phoneCall) }}</div>
                        <div class="call-type">
                            <div>Входящий звонок</div>
                        </div>
                        <div class="btns">
                            <div class="btn">
                                <img src="/img/phone/get-call.png" alt="" @click="confirmCall" />
                            </div>
                            <div class="btn">
                                <img src="/img/phone/ignore-call.png" alt="" @click="endCall" />
                            </div>
                        </div>
                    </div>
                    <transition name="fade">
                        <div class="journal" v-if="page === 'journal'">
                            <div class="header">
                                <div class="title">Журнал звонков</div>
                                <div class="header-icon"><img src="/img/phone/to-call.png" alt="" @click="page = 'enterNumber'" /></div>
                            </div>
                            <div class="body page-body-bg">
                                <div class="journal-content">
                                    <div class="item-wrapper">
                                        <div class="journal-item blue-item" v-for="call in callLog" @click="showCall(call)">
                                            <div class="icon"><img src="/img/phone/user-icon.png" alt="" /></div>
                                            <div class="inner-wrapper">
                                                <div class="item-info">
                                                    <div class="number">{{ chekNumberInBook(call.number) }}</div>
                                                    <div class="type-icon"><img :src="'/img/phone/' + call.type + '-call.png'" alt="" /></div>
                                                </div>
                                                <div class="type-text">{{ getCallType(call.type) }}</div>
                                            </div>
                                            <div class="item-time">{{ call.time }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <transition name="fade">
                        <div class="contacts" v-if="page === 'contacts'">
                            <div class="header">
                                <div class="title">Контакты</div>
                                <div class="header-icon"><img @click="addContactPage('')" src="/img/phone/create-contact.png" alt="" /></div>
                            </div>
                            <div class="body page-body-bg">
                                <div class="search">
                                    <div class="search-wrapper">
                                        <input class="search-input" placeholder="Поиск по имени" type="text" />
                                        <div class="search-icon"><img src="/img/phone/search-icon.png" alt="" /></div>
                                    </div>
                                </div>
                                <div class="items">
                                    <div class="item blue-item" @click="page = 'contactsItemSos'">
                                        <div class="item-icon"><img src="/img/phone/icon-sos.png" alt="" /></div>
                                        <div class="item-name">Служба спасения</div>
                                    </div>
                                    <div v-for="(i, index) in phoneBook">
                                        <div class="item blue-item" @click="showContact(index)">
                                            <div class="item-icon"><img src="/img/phone/contact-icon.png" alt="" @click="showContact(index)" /></div>
                                            <div class="item-name" @click="showContact(index)">{{ i.name }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <transition name="fade">
                        <div class="contacts-item" v-if="page === 'contactsItem'">
                            <div class="header">
                                <div class="back"><img @click="setPage('contacts')" src="/img/phone/back.png" alt="" /></div>
                            </div>
                            <div class="body page-body-bg">
                                <div class="info">
                                    <div class="avatar"><img src="/img/phone/avatar-big.png" alt="" /></div>
                                    <div class="name">{{ contactSelect.name }}</div>
                                    <div class="number">{{ contactSelect.number }}</div>
                                    <div class="alert" v-if="contactAction === 'delete'">
                                        <div class="text">
                                            Вы уверены, что хотите удалить контакт?
                                        </div>
                                        <div class="btns">
                                            <div class="button blue-item2" @click="removeContact">Да</div>
                                            <div class="button blue-item2" @click="contactAction = ''">Нет</div>
                                        </div>
                                    </div>
                                    <div class="alert" v-if="contactAction === 'block'">
                                        <div class="text">
                                            Вы уверены, что хотите заблокировать контакт?
                                        </div>
                                        <div class="btns">
                                            <div class="button blue-item2" @click="blockNumber()">Да</div>
                                            <div class="button blue-item2" @click="contactAction = ''">Нет</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="actions">
                                    <div class="row">
                                        <div class="item">
                                            <div class="btn">
                                                <img src="/img/phone/call-big.png" alt="" @click="callContactBook()" />
                                            </div>
                                            <div class="text" @click="callContactBook()">Позвонить</div>
                                        </div>
                                        <div class="item">
                                            <div class="btn">
                                                <img src="/img/phone/messages.png" alt="" @click="chekHistorySMS(contactSelect.number)" />
                                            </div>
                                            <div class="text" @click="chekHistorySMS(contactSelect.number)">Написать</div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="item">
                                            <div class="btn">
                                                <img src="/img/phone/delete-big.png" alt="" @click="contactAction = 'delete'" />
                                            </div>
                                            <div class="text" @click="contactAction = 'delete'">
                                                Удалить
                                            </div>
                                        </div>
                                        <div class="item">
                                            <div class="btn">
                                                <img src="/img/phone/block.png" alt="" @click="contactAction = 'block'" />
                                            </div>
                                            <div class="text" @click="contactAction = 'block'">
                                                Заблокировать
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <transition name="fade">
                        <div class="contacts-create page-body-bg" v-if="page === 'contactsCreate'">
                            <div class="header">
                                <div class="back"><img @click="setPage('contacts')" src="/img/phone/back.png" alt="" /></div>
                            </div>
                            <div class="avatar-wrapper">
                                <div class="avatar">
                                    <img src="/img/phone/avatar-big.png" alt="" />
                                </div>
                            </div>
                            <div class="main">
                                <div class="inputs">
                                    <div class="input-wrapper">
                                        <div class="input-name">Имя</div>
                                        <input class="input" type="text" maxlength="50" v-model.trim="addName" />
                                    </div>
                                    <div class="input-wrapper">
                                        <div class="input-name">Номер телефона</div>
                                        <input class="input" type="text" maxlength="6" v-model.trim="addNumber" />
                                    </div>
                                </div>
                                <div class="footer">
                                    <div class="btn" @click="addContact()">Создать</div>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <transition name="fade">
                        <div class="contacts-sos page-body-bg" v-if="page === 'contactsItemSos'">
                            <div class="header">
                                <div class="back"><img @click="setPage('contacts')" src="/img/phone/back.png" alt="" /></div>
                            </div>
                            <div class="main">
                                <div class="avatar-sos">
                                    <img src="/img/phone/icon-sos.png" alt="" />
                                </div>
                                <div class="sos-title">Служба спасения</div>
                                <div class="sos-subtitle">911</div>
                            </div>
                            <div class="sos-list-title">Какую службу Вы хотите вызвать?</div>
                            <div class="sos-list">
                                <div class="sos-list-item blue-item">
                                    <div class="sos-item-icon">
                                        <img src="/img/phone/icon-police.png" alt="" />
                                    </div>
                                    <div class="sos-item-text">
                                        Правоохранительные структуры
                                    </div>
                                    <div class="clickLayer" @click="page = 'sosPolice'"></div>
                                </div>
                                <div class="sos-list-item blue-item">
                                    <div class="sos-item-icon">
                                        <img src="/img/phone/icon-emc.png" alt="" />
                                    </div>
                                    <div class="sos-item-text">
                                        Cкорая помощь
                                    </div>
                                    <div class="clickLayer" @click="page = 'sosEmc'"></div>
                                </div>
                            </div>
                            <div class="home" @click="setPage('home')">
                                <div class="square"></div>
                            </div>
                        </div>
                    </transition>
                    <transition name="fade">
                        <div class="contacts-create sos page-body-bg" v-if="page === 'sosPolice'">
                            <div class="header">
                                <div class="back"><img @click="page = 'contactsItemSos'" src="/img/phone/back.png" alt="" /></div>
                            </div>
                            <div class="avatar-wrapper">
                                <div class="avatar">
                                    <img src="/img/phone/icon-sos.png" alt="" />
                                </div>
                            </div>
                            <div class="main">
                                <div class="inputs">
                                    <div class="input-wrapper">
                                        <div class="input-name">Кратко опишите причину вызова</div>
                                        <textarea class="input" v-model.trim="sosReasonCall"></textarea>
                                    </div>
                                </div>
                                <div class="footer">
                                    <div class="btn" @click="sendSos('cop')">Отправить</div>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <transition name="fade">
                        <div class="contacts-create sos page-body-bg" v-if="page === 'sosEmc'">
                            <div class="header">
                                <div class="back"><img @click="page = 'contactsItemSos'" src="/img/phone/back.png" alt="" /></div>
                            </div>
                            <div class="avatar-wrapper">
                                <div class="avatar">
                                    <img src="/img/phone/icon-sos.png" alt="" />
                                </div>
                            </div>
                            <div class="main">
                                <div class="inputs">
                                    <div class="input-wrapper">
                                        <div class="input-name">Кратко опишите причину вызова</div>
                                        <textarea class="input" v-model.trim="sosReasonCall"></textarea>
                                    </div>
                                </div>
                                <div class="footer">
                                    <div class="btn" @click="sendSos('ems')">Отправить</div>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <transition name="fade">
                        <div class="taxi" v-if="page === 'taxi'">
                            <div class="enter" @click="setPage('taxiCall')">Войти</div>
                        </div>
                    </transition>
                    <transition name="fade">
                        <div class="taxi-call" v-if="page === 'taxiCall'">
                            <div class="header"><img src="/img/phone/taxi-header.png" alt="" /></div>
                            <div class="main">
                                <div class="text-info">
                                    Перед вызовом такси поставьте метку на Вашем GPS для того, чтобы мы могли подтвердить поездку
                                </div>

                                <div class="alert" v-if="taxiCalled === true">
                                    <div class="alert-text">Вы уверены, что хотите вызвать такси?</div>
                                    <div class="alert-btns">
                                        <div class="alert-btn" @click="setPage('taxiCallConfirmed')">Да</div>
                                        <div class="alert-btn" @click="taxiCalled = false">Нет</div>
                                    </div>
                                </div>
                                <div class="icon"><img src="/img/phone/gps_icon.png" alt="" /></div>
                                <div class="btn" @click="callTaxi">Вызвать такси</div>
                            </div>
                        </div>
                    </transition>
                    <transition name="fade">
                        <div class="taxi-call-confirmed" v-if="page === 'taxiCallConfirmed'">
                            <div class="header"><img src="/img/phone/taxi-header.png" alt="" /></div>
                            <div class="main">
                                <div class="text-info">
                                    Ваш заказ успешно подтверждён, когда его возьмёт ближайший таксист мы Вам сообщим
                                </div>
                                <div class="icon"><img src="/img/phone/car_icon.png" alt="" /></div>
                                <div class="btn" @click="setPage('taxiStatus')">Посмотреть статус заказа</div>
                            </div>
                        </div>
                    </transition>
                    <transition name="fade">
                        <div class="taxi-status" v-if="page === 'taxiStatus'">
                            <div class="header"><img src="/img/phone/taxi-header.png" alt="" /></div>
                            <div class="main">
                                <div class="info">
                                    <div class="text-info-title">Статус заказа:</div>
                                    <div class="text-info green" v-if="condition">
                                        Заказ принят! <br />
                                        Водитель уже в пути
                                    </div>
                                    <div class="text-info red">Заказ был отменен</div>
                                </div>
                                <div class="icon"><img src="/img/phone/cab_hat_icon.png" alt="" /></div>
                                <div class="btn" @click="setPage('taxiCallConfirmed')">Вернуться в меню</div>
                            </div>
                        </div>
                    </transition>
                    <transition name="fade">
                        <div class="settings" v-if="page === 'settings'">
                            <div class="header">
                                <div class="title">Настройки</div>
                            </div>
                            <div class="body">
                                <div class="items">
                                    <div class="item">
                                        <div class="text">Режим Не беспокоить</div>
                                        <div class="chkbox-wrapper">
                                            <label class="switch purple">
                                                <input type="checkbox" checked="" />
                                                <span class="switch-slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="text">Мелодия звонка</div>
                                        <div class="action">
                                            <div class="arrow" @click="changeRingMelody(0)"><img src="/img/phone/arrow-left.png" alt="" /></div>
                                            <div class="action-text">
                                                {{ melodyIndex }}
                                                <div class="action-btns">
                                                    <div class="player-btn btn-play" @click="aPlay()"></div>
                                                    <div class="player-btn btn-pause" @click="aStop()"></div>
                                                </div>
                                            </div>
                                            <div class="arrow" @click="changeRingMelody(1)"><img src="/img/phone/arrow-right.png" alt="" /></div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="text">Громкость звонка</div>
                                        <div class="action">
                                            <div class="arrow" @click="ringVolumeDown"><img src="/img/phone/arrow-left.png" alt="" /></div>
                                            <div class="action-text">{{ ringVolume }}</div>
                                            <div class="arrow" @click="ringVolumeUp"><img src="/img/phone/arrow-right.png" alt="" /></div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="text">Фон</div>
                                        <div class="action">
                                            <div class="arrow" @click="changeBg(0)"><img src="/img/phone/arrow-left.png" alt="" /></div>
                                            <div class="action-text">{{ bgIndex + 1 }}</div>
                                            <div class="arrow" @click="changeBg(1)"><img src="/img/phone/arrow-right.png" alt="" /></div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="text">Уведомления от объявлений</div>
                                        <div class="chkbox-wrapper">
                                            <label class="switch">
                                                <input type="checkbox" v-model="adNotif" />
                                                <span class="switch-slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="item" @click="page = 'blackList'">
                                        <div class="text">Черный список</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <transition name="fade">
                        <div class="settings black-list-body" v-if="page === 'blackList'">
                            <div class="header">
                                <div class="back"><img @click="setPage('settings')" src="/img/phone/back.png" alt="" /></div>
                                <div class="title">Черный список</div>
                            </div>
                            <div class="body">
                                <div class="items">
                                    <div class="item" v-for="number in blackList">
                                        <div class="text">{{ chekNumberInBook(number) }}</div>
                                        <div class="chkbox-wrapper" @click="unblockNumber(number)">
                                            Разблокировать
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <transition name="fade">
                        <div class="message-create page-body-bg" v-if="page === 'messageCreate'">
                            <div class="header">
                                <div class="back"><img @click="setPage('contacts')" src="/img/phone/back.png" alt="" /></div>
                            </div>
                            <div class="avatar-wrapper">
                                <div class="avatar">
                                    <img src="/img/phone/avatar-big.png" alt="" />
                                </div>
                            </div>
                            <div class="main">
                                <div class="inputs">
                                    <div class="input-wrapper mb">
                                        <div class="input-name">Номер телефона</div>
                                        <input class="input" type="text" maxlength="6" v-model="contactSelect.number" />
                                    </div>
                                    <div class="input-wrapper">
                                        <div class="input-name">Сообщение</div>
                                        <textarea class="input msg-input" type="text" maxlength="1000" v-model.trim="sendMsgText"></textarea>
                                    </div>
                                </div>
                                <div class="footer">
                                    <div class="btn" @click="pushSMS(1)">Отправить</div>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <transition name="fade2">
                        <div class="gps" v-if="page === 'gps'">
                            <transition name="fade2">
                                <div class="gps-screen" v-if="gpsTab === 1">
                                    <div class="gps-header">
                                        <div class="gps-logo"></div>
                                    </div>
                                    <div class="gps-title">
                                        Выберите нужный <br />
                                        пункт назначения
                                    </div>
                                    <div class="gps-list">
                                        <div class="gps-btn" @click="setPage('home')">Назад</div>
                                        <div class="gps-btn" @click="setGpsRoute('atm')">Ближайший банкомат</div>
                                        <div class="gps-btn" @click="setGpsRoute('shop')">Ближайший 24/7</div>
                                        <div class="gps-btn" @click="setGpsRoute('fuel')">Ближайшая заправка</div>
                                        <div class="gps-btn" @click="gpsTab = 2">Гос. учреждения</div>
                                        <div class="gps-btn" @click="gpsTab = 3">Автобусные маршруты</div>
                                    </div>
                                </div>
                            </transition>
                            <transition name="fade2">
                                <div class="gps-screen" v-if="gpsTab === 2">
                                    <div class="gps-header">
                                        <div class="gps-logo"></div>
                                    </div>
                                    <div class="gps-list">
                                        <div class="gps-btn" @click="gpsTab = 1">Назад</div>
                                        <div class="gps-btn" @click="setGpsRoute('faction', 28)">Правительство</div>
                                        <div class="gps-btn" @click="setGpsRoute('faction', 24)">Больница</div>
                                        <div class="gps-btn" @click="setGpsRoute('faction', 11)">Департамент полиции</div>
                                        <div class="gps-btn" @click="setGpsRoute('faction', 26)">Департамент шерифа</div>
                                        <div class="gps-btn" @click="setGpsRoute('faction', 23)">Форт-Занкудо</div>
                                        <div class="gps-btn" @click="setGpsRoute('faction', 29)">Новостное агенство</div>
                                    </div>
                                </div>
                            </transition>
                            <transition name="fade2">
                                <div class="gps-screen" v-if="gpsTab === 3">
                                    <div class="gps-header">
                                        <div class="gps-logo"></div>
                                    </div>
                                    <div class="gps-list">
                                        <div class="gps-btn" @click="gpsTab = 1">Назад</div>
                                    </div>
                                    <div class="busroutes-list">
                                        <div class="busroutes-item black" @click="setGpsRoute('busRoute', 'black')">
                                            <div class="busroutes-title">Маршрут “Черный”</div>
                                            <div class="busroutes-text">
                                                Лаго-Занкудо / Чумаши / <br />
                                                Рокфорд-драйв / Миррор-парк / <br />
                                                Лаго-Занкудо / Чумаши / <br />
                                                Рокфорд-драйв /
                                            </div>
                                        </div>
                                        <div class="busroutes-item red" @click="setGpsRoute('busRoute', 'red')">
                                            <div class="busroutes-title">Маршрут “Красный”</div>
                                            <div class="busroutes-text">
                                                Лаго-Занкудо / Чумаши / <br />
                                                Рокфорд-драйв / Миррор-парк / <br />
                                                Лаго-Занкудо / Чумаши / <br />
                                                Рокфорд-драйв /
                                            </div>
                                        </div>
                                        <div class="busroutes-item blue" @click="setGpsRoute('busRoute', 'blue')">
                                            <div class="busroutes-title">Маршрут “Синий”</div>
                                            <div class="busroutes-text">
                                                Лаго-Занкудо / Чумаши / <br />
                                                Рокфорд-драйв / Миррор-парк / <br />
                                                Лаго-Занкудо / Чумаши / <br />
                                                Рокфорд-драйв /
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </transition>
                    <transition name="fade2">
                        <div class="weazel" v-if="page === 'weazel'">
                            <div class="header">
                                <div class="weazel-icon"><img src="/img/lspd-tablet/weazel.png" alt="" /></div>
                            </div>
                            <div class="body-wrap">
                                <div class="post-wrap page-body-bg">
                                    <div class="post-btn" @click="weazelModal = 1" :class="{ active: weazelModal === 1 }">Подать объявление</div>
                                </div>
                                <div class="body page-body-bg">
                                    <div class="post-list">
                                        <div class="post-item" v-for="ad in ads">
                                            <div class="post-item-body">{{ ad.text }}</div>
                                            <div class="post-item-footer">
                                                <div>Номер телефона:</div>
                                                <div class="post-num">{{ ad.phone }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <transition name="fade2">
                                    <div class="overlay" v-if="weazelModal === 1">
                                        <transition name="scale">
                                            <div class="w-modal" v-if="weazelModal === 1">
                                                <div class="w-modal-body">
                                                    <textarea class="textarea" v-model.trim="weazelAd" maxlength="60"></textarea>
                                                </div>
                                                <div class="w-modal-footer">
                                                    <div class="modal-btn modal-btn-1" @click="sendAd()">Подать</div>
                                                    <div class="modal-btn modal-btn-2" @click="weazelModal = 0">Отмена</div>
                                                </div>
                                            </div>
                                        </transition>
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </transition>
                    <transition name="fade2">
                    <div class="weazel" v-if="page === 'weazelRadio'">
                        <div class="header">
                            <div class="weazel-icon w-icon__radio"><img src="/img/phone/weazel-radio-logo.png" alt=""></div>
                        </div>
                        <div class="body-wrap w-radio__bg">
                            <div class="track-wrapper">
                            <div class="track-icon"><img src="/img/phone/track-icon.png" alt=""></div>
                                <div class="track-name">
                                <span
                                    :class="{isScrolling: isScrolling}" 
                                    ref="marq"
                                >{{ trackName }} 
                                </span>
                                </div>
                            </div>
                            <div class="animated-icon-wrapper">
                                <div class="outer-circle" :class="{ animated: connected === true }">
                                    <div class="mid-circle" :class="{ animated: connected === true }">
                                        <div class="main-icon"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-radio__buttons">
                                <div class="btn" 
                                @click="connected = !connected"
                                :class="{ btnRed: connected === true, btnGreen: connected === false }">{{ connected ? 'Отключиться' : 'Подключиться' }}</div>
                            </div>
                        </div>
                    </div>
                    </transition>
                    <transition name="fade2">
                        <div class="forent" v-if="page === 'forent'">
                            <div class="header">
                                <img src="/img/phone/forent-logo.png" alt="" />
                                <div class="forent-title">Аренда транспортных средств</div>
                            </div>
                            <div class="body">
                                <div class="forent-block">
                                    <div class="forent-title forent-block-title">Аренда мопеда Faggio</div>
                                    <div class="forent-btn">Отметить на GPS</div>
                                    <div class="forent-text forent-info-for-btn">ближайшую точку аренды</div> 
                                    <!-- forent-active блок показывается когда есть активная аренда -->
                                    <div class="forent-active forent-text" style="margin-top: 10px">
                                        <div class="forent-active__row" style="margin-bottom: 12px">Осталось времени аренды : <span class="forent-text--orange forent-text--bold">01:34</span></div>
                                        <div class="forent-active__row forent-title">Продление аренды</div>
                                        <div class="forent-active__row" style="margin-bottom: 20px">
                                            <span class="forent-input-wrapper forent-text--bold">
                                                <input class="forent-text forent-text--bold forent-input" type="number"> ч.
                                            </span>
                                            <span class="forent-text--orange forent-text--bold">1 ч. = 300$</span>
                                        </div>
                                        <div class="forent-active__row">Сумма: <span class="forent-text forent-text--orange forent-text--bold">300$</span></div>
                                        <div class="forent-btn">Оплатить картой</div>
                                    </div>
                                </div>
                                <div class="forent-block">
                                    <div class="forent-title forent-block-title">Аренда лодок</div>
                                    <div class="forent-btn">Отметить на GPS</div>
                                    <div class="forent-text forent-info-for-btn">ближайшую точку аренды</div> 
                                    <!-- forent-active блок показывается когда есть активная аренда -->
                                </div>
                                <div class="forent-block">
                                    <div class="forent-title forent-block-title">Аренда автомобилей на острове</div>
                                    <div class="forent-btn">Отметить на GPS</div>
                                    <div class="forent-text forent-info-for-btn">ближайшую точку аренды</div> 
                                    <!-- forent-active блок показывается когда есть активная аренда -->
                                </div>
                                <!-- этот блок показывается когда есть рабочий транспорт? -->
                                <div class="forent-block">
                                    <div class="forent-title forent-block-title">Рабочий автомобиль</div>
                                    <div style="margin-bottom: 10px">
                                        <div class="forent-text">Название автомобиля</div>
                                        <div class="forent-text forent-text--orange forent-text--bold">Lampadati Felon</div>
                                    </div>
                                    <div>
                                        <div class="forent-text">Ваше место работы</div>
                                        <div class="forent-text forent-text--orange forent-text--bold">Lampadati Felon</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <div class="home" @click="setPage('home')">
                        <div class="square"></div>
                    </div>
                    <audio loop="innerLoop" ref="audiofile" :src="audioList[melodyIndex]" preload="auto" style="display: none;"></audio>
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
            page: "home",
            msgMenu: false,
            totalNumber: "",
            tooltip: false,
            contactAction: "",
            taxiCalled: false,
            gpsTab: 1,
            prePage: "home",
            clock: {
                time: {
                    hour: 15,
                    mins: 45,
                },
                weekday: 0,
                date: "28/08/2019",
            },
            calling: "",
            addNumber: "",
            addName: "",
            contactSelect: {},
            msgListSelect: [],
            sendMsgText: "",
            sosReasonCall: "",
            weazelModal: 0,
            weazelAd: "",
            bgList: [
                "/img/phone/wallpaper/1.jpg",
                "/img/phone/wallpaper/2.jpg",
                "/img/phone/wallpaper/3.jpg",
                "/img/phone/wallpaper/4.jpg",
                "/img/phone/wallpaper/5.jpg",
                "/img/phone/wallpaper/6.jpg",
                "/img/phone/wallpaper/7.jpg",
                "/img/phone/wallpaper/8.jpg",
                "/img/phone/wallpaper/9.jpg",
                "/img/phone/wallpaper/10.jpg",
            ],
            i: 0,
            custombg: "",
            isScrolling: false,
            trackName: 'Twenty One Pilots - Stressed Out',
            connected: false,
            ringVolume: '100%',
            audioList: [
                '/audio/space_secret.mp3',
                '/audio/nokia.mp3',
                '/audio/worakls.mp3',
                '/audio/astronomia_2020.mp3',
                '/audio/BMW_X2.mp3',
                '/audio/really_slow_motion.mp3',
                '/audio/phonk.mp3',
                '/audio/magnus.mp3',
                '/audio/tez.mp3',
                '/audio/i_tried_so_hard.mp3',
                '/audio/jvla.mp3',
            ],
            melodyIndex: 0
        };
    },
    computed: {
        ...mapGetters({
            timeData: "getDataTime",
            getPhoneNumber: "getPhoneNumber",
            phoneBook: "getPhoneBook",
            phoneSMS: "getPhoneSMS",
            phoneCall: "getPhoneCall",
            phoneCallConfirm: "getPhoneCallConfirm",
            phoneCallReject: "getPhoneCallReject",
            timerCallData: "getPhoneCallTimer",
            ads: "getAdsList",
            callLog: "getCallLog",
            blackList: "getPhoneBlackList",
        }),
        adNotif: {
            get: function() {
                return this.$store.getters.getAdNotif;
            },
            set: function(value) {
                mp.trigger("cPlayerChangeAdNotifState", value);
                storage.setAdNotif(value);
            },
        },
        bgIndex: {
            get: function() {
                return this.$store.getters.getBgIndex;
            },
            set: function(value) {
                storage.setBgIndex(value);
                mp.trigger("cPlayerSavePhoneImg", value);
            },
        },
    },
    watch: {
        phoneSMS: {
            handler() {
                if (this.page === "messagesItem") {
                    for (var key in this.phoneSMS) {
                        if (this.phoneSMS[key].number === this.msgListSelect.number && this.msgListSelect.unread) storage.setReadNewSMS(key);
                    }
                    this.$nextTick(() => {
                        const body = this.$refs.smsList;
                        body.scrollTop = body.scrollHeight;
                    });
                }
            },
            deep: true, //если нужно отслеживать изменение свойств
        },
        phoneCall: {
            handler() {
                if (this.phoneCall != "0" && !this.phoneCallConfirm) {
                    this.page = "incomingCall";
                }

                if (this.phoneCall === "0") {
                    this.page = "home";
                }
            },
        },
        phoneCallConfirm: {
            handler() {
                if (this.phoneCall != "0" && this.phoneCallConfirm) {
                    this.page = "callNow";
                    callSound.pause();
                    callSound.currentTime = 0;
                }
            },
        },
        phoneCallReject: {
            handler() {
                if (this.phoneCallReject) {
                    this.page = "home";
                    this.totalNumber = "";
                    callSound.pause();
                    storage.setPhoneCallReject(false);
                }
            }
        },
        trackName(){
            this.startScrolling()
        }
    },
    methods: {
        setPage(p) {
            this.prePage = this.page;
            switch (p) {
                case "messages":
                    this.page = "messages";
                    break;
                case "messagesItem":
                    this.page = "messagesItem";
                    break;
                case "internet":
                    this.page = "internet";
                    break;
                case "taxi":
                    this.page = "taxi";
                    break;
                case "bus":
                    this.page = "bus";
                    break;
                case "contacts":
                    this.page = "contacts";
                    this.contactSelect.sendMsgText = "";
                    this.sendMsgText = "";
                    break;
                case "settings":
                    this.page = "settings";
                    break;
                case "home":
                    this.contactSelect.number = "";
                    this.contactSelect.sendMsgText = "";
                    this.sendMsgText = "";
                    this.page = "home";
                    if (this.prePage === "outgoingCall" || this.prePage === "callNow" || this.prePage === "incomingCall") {
                        callSound.pause();
                        callSound.currentTime = 0;
                        const endByCaller = this.prePage === "outgoingCall" ? 1 : 0;
                        mp.trigger("cMisc-CallServerEvent", "phoneRejectCall", endByCaller);
                        mp.trigger("cMisc-CallServerEvent", "sPlayer-setAnimation", "callPhone", true);
                    }
                    break;
                case "enterNumber":
                    this.page = "enterNumber";
                    break;
                case "outgoingCall":
                    this.page = "outgoingCall";
                    break;
                case "incomingCall":
                    this.page = "incomingCall";
                    break;
                case "contactsItem":
                    this.page = "contactsItem";
                    break;
                case "contactsCreate":
                    this.page = "contactsCreate";
                    break;
                case "taxiCall":
                    this.page = "taxiCall";
                    break;
                case "taxiCallConfirmed":
                    this.page = "taxiCallConfirmed";
                    break;
                case "taxiStatus":
                    this.page = "taxiStatus";
                    break;
                case "messageCreate":
                    this.page = "messageCreate";
                    break;
                case "gps":
                    this.page = "gps";
                    break;
                case "weazel":
                    this.page = "weazel";
                    break;
                case 'weazelRadio' : 
                    this.page = 'weazelRadio'
                    break;
                case 'forent' : 
                    this.page = 'forent'
                    break;
            }
        },
        chekNumberInBook(n) {
            var numb = n.replace(/\s+/g, "");
            for (var key in this.phoneBook) {
                if (numb.toString() === this.phoneBook[key].number.toString()) return this.phoneBook[key].name;
            }
            return n;
        },
        lastMsg(m) {
            return m.data[m.data.length - 1].msg;
        },
        lastMsgTime(m) {
            return this.formatDate(m.data[m.data.length - 1].time);
        },
        readSMS(key) {
            mp.trigger("cMisc-CallServerEvent", "phoneLoadSMS", this.phoneSMS[key].number, this.phoneSMS[key].data.length);
            this.msgListSelect = [];

            if (this.phoneSMS[key].unread) {
                storage.setReadNewSMS(key);
                mp.trigger("cMisc-CallServerEvent", "phoneReadMsg", this.phoneSMS[key].number);
            }
            this.contactSelect.number = this.phoneSMS[key].number;
            this.contactSelect.name = this.chekNumberInBook(this.phoneSMS[key].number);
            this.msgListSelect = this.phoneSMS[key];
            this.setPage("messagesItem");
            this.$nextTick(() => {
                const body = this.$refs.smsList;
                body.scrollTop = body.scrollHeight;
            });
        },
        showContact(i) {
            this.contactSelect.number = this.phoneBook[i].number;
            this.contactSelect.name = this.phoneBook[i].name;
            this.contactSelect.key = i;
            this.setPage("contactsItem");
        },
        addContactPage(number) {
            this.addNumber = number;
            this.setPage("contactsCreate");
        },
        chekHistorySMS(number) {
            for (var key in this.phoneSMS) {
                if (number === this.phoneSMS[key].number) {
                    this.msgListSelect = this.phoneSMS[key];
                    return this.setPage("messagesItem");
                }
            }
            this.setPage("messageCreate");
        },
        pushSMS(isNew) {
            const number = this.contactSelect.number;
            if (!this.sendMsgText) return storage.addNotification({ text: "Введите сообщение", theme: "error" });
            if (number.length !== 6 || !this.isNumeric(number)) return storage.addNotification({ text: "Номер телефона должен содержать 6 цифр", theme: "error" });
            var sendData = {
                number: number,
                msg: this.sendMsgText,
            };
            mp.trigger("cMisc-CallServerEvent", "phoneSendMsg", JSON.stringify(sendData));
            this.sendMsgText = "";
            if (isNew) {
                this.setPage("messages");
            }
        },
        isNumeric(str) {
            if (typeof str != "string") return false;
            return !isNaN(str) && !isNaN(parseFloat(str));
        },
        addContact() {
            if (!this.addNumber) return;
            var sendData = {
                name: this.addName,
                number: this.addNumber.replace(/\s+/g, ""),
            };
            mp.trigger("cMisc-CallServerEvent", "phoneContactAdd", JSON.stringify(sendData));
            this.setPage("home");
            this.addName = "";
            this.addNumber = "";
        },
        removeContact() {
            this.contactAction = "";
            var sendData = {
                name: this.contactSelect.name,
                number: this.contactSelect.number.replace(/\s+/g, ""),
            };
            mp.trigger("cMisc-CallServerEvent", "phoneContactRemove", JSON.stringify(sendData));
            this.setPage("home");
        },
        callNumber() {
            if (this.totalNumber.length < 6) return storage.addNotification({ text: "Неправильный номер", theme: "error" });
            this.calling = this.totalNumber;
            this.setPage("outgoingCall");
            callSound.play();
            mp.trigger("cMisc-CallServerEvent", "sPlayer-setAnimation", "callPhone", true);
            mp.trigger("cMisc-CallServerEvent", "phoneStartCall", this.totalNumber);
            /* отправка данных на сервер о исходящем вызове по номеру */
        },
        callContactBook(name) {
            this.calling = this.contactSelect.name;
            this.setPage("outgoingCall");
            callSound.play();
            mp.trigger("cMisc-CallServerEvent", "sPlayer-setAnimation", "callPhone", true);
            mp.trigger("cMisc-CallServerEvent", "phoneStartCall", this.contactSelect.number);
        },
        confirmCall() {
            mp.trigger("cMisc-CallServerEvent", "sPlayer-setAnimation", "callPhone", true);
            mp.trigger("cMisc-CallServerEvent", "phoneConfirmCall");
            storage.setAlertCall(false);
        },
        endCall(endByCaller = 0) {
            this.setPage(this.prePage);
            callSound.pause();
            callSound.currentTime = 0;
            mp.trigger("cMisc-CallServerEvent", "sPlayer-setAnimation", "openPhone", true);
            mp.trigger("cMisc-CallServerEvent", "phoneRejectCall", endByCaller);
        },
        setNumber(num) {
            if (this.totalNumber.length >= 6) return false;
            numberSound.play();
            return (this.totalNumber = this.totalNumber + num);
        },
        getWeekDay(date) {
            let days = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];

            return days[date];
        },
        callTaxi() {
            mp.trigger("cMisc-CallServerEvent", "sTaxi-NewOrder");
            this.exit();
        },
        exit() {
            mp.trigger("cSetPage", "none");
        },
        onKeyDown(e) {
            /*Backspace*/
            if (e.keyCode === 8) {
            }

            if (e.keyCode === 27) {
                this.exit();
            }
        },
        sendSos(type) {
            if (!this.sosReasonCall) return;
            const data = {
                description: this.sosReasonCall,
                type: type,
            };
            mp.trigger("cMisc-CallServerEvent", "phoneSosMsg", JSON.stringify(data));
            this.exit();
        },
        sendAd() {
            if (!this.weazelAd) return storage.addNotification({ text: "Введите текст объявления", theme: "error" });
            mp.trigger("cMisc-CallServerEvent", "sAdsSendAdToCheck", this.weazelAd);
            this.weazelAd = "";
            this.weazelModal = 0;
        },
        changeBg(next) {
            if (next) {
                if (this.bgIndex === this.bgList.length - 1) this.bgIndex = 0;
                else this.bgIndex++;
            } else {
                if (this.bgIndex === 0) this.bgIndex = this.bgList.length - 1;
                else this.bgIndex--;
            }
        },
        formatDate(dateStr) {
            if (dateStr.length === 8) return dateStr;
            let date = new Date(Date.parse(dateStr));
            let day = date.getDate();
            let month = date.getMonth() + 1;
            const year = date.getFullYear();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            if (day < 10) day = "0" + day;
            if (month < 10) month = "0" + month;
            if (hours < 10) hours = "0" + hours;
            if (minutes < 10) minutes = "0" + minutes;
            return `${hours}:${minutes} ${day}.${month}`;
        },
        setGpsRoute(type, id = null) {
            mp.trigger("cMisc-CallServerEvent", "sPlayerSetPropertyPoint", JSON.stringify({ type, id }));
            this.exit();
        },
        getCallType(type) {
            switch (type) {
                case "missed":
                    return "Пропущенный звонок";
                    break;
                case "incoming":
                    return "Входящий звонок";
                    break;
                case "outgoing":
                    return "Исходящий звонок";
                    break;
                default:
                    break;
            }
        },
        showCall(call) {
            let found = false;
            for (var key in this.phoneBook) {
                if (call.number.toString() === this.phoneBook[key].number.toString()) found = true;
            }
            this.contactSelect.name = this.chekNumberInBook(call.number);
            this.contactSelect.number = call.number;
            this.setPage("contactsItem");
        },
        deleteMsg(number) {
            storage.delSms(number);
            this.setPage("messages");
            mp.trigger("cMisc-CallServerEvent", "phoneDelMsg", number);
        },
        blockNumber() {
            this.contactAction = "";
            mp.trigger("cMisc-CallServerEvent", "phoneBlockNumber", this.contactSelect.number);
        },
        unblockNumber(number) {
            mp.trigger("cMisc-CallServerEvent", "phoneUnBlockNumber", number);
        },
        closeMsgMenu({ target }) {
            if (target.classList.contains("dont-close")) return;
            this.msgMenu = false;
        },
        startScrolling(){
            if(this.$refs.marq.offsetWidth > 250){
                return this.isScrolling = true
            }
            else{
                return this.isScrolling = false
            }
        },
        ringVolumeDown(){
            if(this.$refs.audiofile.volume <= 0.1){
                return false
            }
            this.$refs.audiofile.volume-= 0.1
            this.showRingVolume()
        },
        ringVolumeUp(){
            if(this.$refs.audiofile.volume >= 1){
                return false
            }
            this.$refs.audiofile.volume = this.$refs.audiofile.volume + 0.1
            this.showRingVolume()
        },
        showRingVolume: function(){
            return this.ringVolume = (Math.round(this.$refs.audiofile.volume * 100) + '%')
        },
        startCallRing(){
			this.$refs.audiofile.play();
        },
        stopCallRing(){
			this.$refs.audiofile.pause();
        },
        changeRingMelody(next) {
            this.aPlay()
            if (next) {
                if(this.melodyIndex >= this.audioList.length - 1) return false
                this.melodyIndex++
                
            } else {
                if(this.melodyIndex <= 0) return false
                this.melodyIndex--
            }
        },
        aPlay: function() {
            this.$refs.audiofile.play()
                // .then((resolve) =>{
                //    this.aStop()
                // });
        },
        aStop(){
            this.$refs.audiofile.load()
        }
    },
    filters: {
        phoneNumberFilter: n => n.slice(0, 3) + " " + n.slice(3),
    },
    mounted() {
        // this.startScrolling();
        if (this.phoneCall != "0" && !this.phoneCallConfirm) {
            this.page = "incomingCall";
        }
        if (this.phoneCall != "0" && this.phoneCallConfirm) {
            this.page = "callNow";
        }
        
    },
    created() {
        document.addEventListener("keyup", this.onKeyDown);
    },
    beforeDestroy() {
        mp.trigger("cPlayerClosePhone");
        document.removeEventListener("keyup", this.onKeyDown);
        callSound.pause();
        callSound.currentTime = 0;
        mp.trigger("cMisc-CallServerEvent", "phoneRejectCall");
    },
};
const numberSound = new Audio("/audio/phoneNumber.mp3");
const callSound = new Audio("/audio/phoneCall.mp3");
callSound.loop = true;
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
    .wrapper{
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
    }
$ITEM_BG_LIGHT: linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.473) 30%,rgba(109, 109, 109, 0.521) 70%, rgba(0, 0, 0, 0.5) 100%);
$ITEM_BG_DARK: linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.9) 100%);
$ITEM_BG_BLUE: linear-gradient(180deg, rgba(13, 98, 255, 0.89), rgba(1, 65, 161, 0.9));
$ITEM_BG_BLUE2: linear-gradient(341deg, rgba(28, 122, 230, 0.96), rgba(11, 65, 226, 0.96));

    .phone-wrapper{
        position: absolute;
        bottom: 5vw;
        right: 5vw;
        width: 348px;
        height: 757px;
        overflow: hidden;
        transform-origin: right bottom;
    }
    .phone-img{
        position: absolute;
        width: 100%;
        height: 100%;
        background: url('/img/phone/phone.png');
        background-repeat: no-repeat;
        background-position: 100% 100%;
        background-size: cover;
        pointer-events: none;
        z-index: 5;
    }
    .phone-inner{
        position: relative;
        width: 100%;
        height: 100%;
        padding: 24px 0px;
        padding-left: 1px;
        padding-right: 2px;
        padding-top: 28px;
        overflow: hidden;
        border-radius: 60px
    }
    .background{
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        overflow: hidden;
    }
    .home-screen{
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        position: relative;
        z-index: 2;
        background-size: cover;
        background-position: 0px 0px;
        padding: 0 20px;
        overflow: hidden
    }
    .time-wrapper{
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        width: 250px;
        height: 140px;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
        border-radius: 15px;
    }
    .hour{
        position: relative;
        z-index: 1;
        color: #f2f2f2;
        font-family: "Century Gothic";
        font-size: 72px;
        font-weight: 400;
        letter-spacing: 3px;
    }
    .min{
        position: relative;
        z-index: 1;
        color: #f2f2f2;
        font-family: "Century Gothic";
        font-size: 48px;
        letter-spacing: 2px;
    }
    .dots{
        position: relative;
        z-index: 1;
        color: #f2f2f2;
        font-family: "Century Gothic";
        font-size: 72px;
        letter-spacing: 4px;
        padding: 0px 5px;
    }
    .line{
        width: 209px;
        height: 4px;
        background-color: rgba(255, 255, 255, 0.63);
        display: flex;
        align-items: center;
    }
    .date{
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .this-date, .day, .v-line{
        color: #f2f2f2;
        font-family: "Century Gothic";
        font-size: 17px;
        font-weight: 400;
        letter-spacing: 0.7px;
        display: flex;
        align-items: center;
    }
    .v-line{
        padding: 0 10px;
    }
    .icons{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        padding: 0 20px;
        padding-bottom: 20px;
        background: linear-gradient(to bottom, rgba(0,0,0,0.0) 0%,rgba(0,0,0,0.4) 25%,rgba(0,0,0,0.5) 100% );
    }
    .icons-row{
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin: 15px 0;
    }
    .icons-item{
        width: 33%;
        display: flex;
        justify-content: center;
    }
    .icons-item img{
        transition: 0.2s;
    }
    .icons-item img:hover{
        transform: scale(1.1)
    }
    .light{
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 5;
        pointer-events: none;
        width: 378px;
        height: 740px;
        background: url('/img/phone/light.png') no-repeat;
        background-size: 100% 100%;
        background-position: 0px 32px;
    }
    .messages-item{
        width: 100%;
        height: 100%;
    }
    .messages-item .header{
        width: 100%;
        height: 76px;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        display: flex;
        align-items: center;
        padding-top: 4px;
    }
    .messages-item .header .back{
        width: 25%;
        display: flex;
        justify-content: center;
    }
    .black-list-body .header .back{
        position: relative;
        right: 3vw;
    }
    .messages-item .header .title{
        width: 50%;
        color: #fafbff;
        font-family: "Century Gothic";
        font-size: 23px;
        font-weight: 700;
        letter-spacing: 0.23px;
        text-align: center;
    }
    .messages-item .header .menu{
        width: 30%;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .messages-item .menu .context-menu{
        position: absolute;
        top: 5px;
        right: 10px
    }
    .messages-item .menu .context-menu li{
        color: #fafbff;
        font-family: "Century Gothic";
        font-size: 10px;
        font-weight: 400;
        line-height: 9px;
        letter-spacing: 0.5px;
        width: 107px;
        height: 31px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        z-index: 11;
        background: $ITEM_BG_BLUE2;
        border: 1px solid $ITEM_BG_BLUE;
    }
    .messages-item .menu .context-menu li:first-child{
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
    }
    .messages-item .menu .context-menu li:last-child{
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
    }
    .messages-item .menu .context-menu li:hover{
        background: $ITEM_BG_BLUE;
    }
    .messages-item .body{
        padding: 30px 20px;
        width: 100%;
        height: 570px;
        overflow: auto;
        background: $ITEM_BG_DARK;
    }
    .messages-item .body::-webkit-scrollbar{
        width: 0
    }
    /* .messages-item .body::-webkit-scrollbar-track{
        background: rgb(134, 134, 134);
    }
    .messages-item .body::-webkit-scrollbar-thumb{
        background: #4C2F81;
        border-radius: 5px
    } */
    .messages-item .footer{
        height: 59px;
        background-color: #fafbff;
        border-bottom-right-radius: 30px;
        border-bottom-left-radius: 20px;
        display: flex;
    }
    .messages-item .footer .input{
        height: 100%;
        border-bottom-left-radius: 40px;
        border-top: 1px solid #9c9c9c;
        padding-left: 30px;
        padding-bottom: 5px;
        width: 80%;
        color: #636363;
        font-family: "Century Gothic";
        font-size: 15px;
        font-weight: 400;
        letter-spacing: 0.75px;
    }
    .messages-item .footer .input::placeholder{
        color: #636363;
        font-family: "Century Gothic";
        font-size: 15px;
        font-weight: 400;
        letter-spacing: 0.75px;
    }
    .messages-item .footer .btn{
        background: $ITEM_BG_BLUE;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20%;
        border-bottom-right-radius: 30px;
        height: 100%;
    }
    .companion-msg-item img{
        margin-right: 15px;
    }
    .companion-msg-item{
        display: flex;
        width: 80%;
    }
    .companion-msg-item-text{
        margin-top: 10px;
        background: #fff;
        border: 1px solid rgb(221, 221, 221);
        padding: 15px;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        border-bottom-left-radius: 15px;
        font-family: "Century Gothic";
        font-size: 14px;
        font-weight: bold;
        color: #646464;
        letter-spacing: 0.14px;
        padding-bottom: 5px;
    }
    .companion-msg-item-text2{
        margin-bottom: 10px;
    }
    .companion-msg-item-date{
        font-family: "Century Gothic";
        font-size: 12px;
        text-align: left;
    }
    .my-msg-item{
        display: flex;
        width: 75%;
        margin-right: 10px;
        float: right;
        justify-content: flex-end;
    }
    .my-msg-item-text{
        background: $ITEM_BG_BLUE;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 0.14px;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        padding: 15px;
        padding-bottom: 5px;
    }
    .my-msg-item-text2{
        margin-bottom: 10px;
    }
    .my-msg-item-date{
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 12px;
        text-align: right;
    }
    .mb{
        margin-bottom: 10px;
    }

    .messages .header{
        width: 100%;
        height: 76px;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 4px;
    }
    .messages .header .title{
        text-align: center;
        color: #fafbff;
        font-family: "Century Gothic";
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0.24px;
    }
    .messages .body{
        background: rgba(0, 0, 0, 0.5);
        height: 638px;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
    }
    .messages-content{
        height: 520px;
        overflow-x: auto;
        box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.06);
        padding: 12px 0;
    }
    .messages-content::-webkit-scrollbar{
        width: 0;
    }
    /* .messages-content::-webkit-scrollbar-track{
        background: rgb(201, 201, 201);
        border-radius: 10px
    }
    .messages-content::-webkit-scrollbar-thumb{
        background: #4C2F81;
        border-radius: 5px
    } */
    .messages .message{
        display: flex;
        padding: 25px 8px;
        margin-bottom: 10px;
        color: #ffffff;
        box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.3);
        background-image: $ITEM_BG_BLUE;
    }
    .messages .message-icon{
        margin-right: 10px;
        border-radius: 50%;
    }
    .messages .message-icon img{
        display: block;
    }
    .messages .message-num{
        display: flex;
        align-items: center
    }
    .messages .message .num{
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 15px;
        font-weight: 700;
        letter-spacing: 0.15px;
    }
    .messages .message .num2{
        background: $ITEM_BG_BLUE2;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        font-family: "Arial";
        color: #fff;
        box-shadow: 0 0 3px 1px rgb(210, 212, 218);
        font-size: 10px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 5px;
    }
    .messages .message-preview{
        font-size: 14px;
        font-weight: 700;
        color: #ffffff;
        font-family: "Century Gothic";
        font-weight: 700;
        letter-spacing: 0.14px;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 210px;
        overflow: hidden;
    }
    .messages .message-time{
        color: #fff;
        font-family: "Century Gothic";
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0.12px;
        margin: auto;
    }
    .messages-action{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 110px;
        padding: 0 20px;
        background: $ITEM_BG_BLUE2;
    }
    .messages-action .action-text{
        width: 140px;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 15px;
        font-weight: 400;
        letter-spacing: 0.15px;
    }
    .enter-number{
        position: relative;
    }
    .enter-number .header{
        display: flex;
        align-items: center;
        width: 100%;
        height: 76px;
        background: $ITEM_BG_BLUE;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        padding: 0 30px;
        padding-top: 4px;
    }
    .enter-number .header div{
        margin-left: auto;
    }
    .enter-number .body{
        background: $ITEM_BG_BLUE;
        border-bottom-right-radius: 20px;
        border-bottom-left-radius: 20px;
    }
    .enter-number .window{
        background: rgba(0, 0, 0, 0.6);
        height: 295px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .enter-number .window .add{
        position: absolute;
        top: 45%;
        right: 40px
    }
    .enter-number .window .add .tooltip{
        position: absolute;
        display: none;
        top: 30px;
        left: -10px;
        font-size: 12px;
        font-family: "Myriad Pro";
        color: #ffffff;
    }
    .enter-number .window .add .tooltip.active{
        display: block;
    }
    .enter-number .window .num{
        color: #ffffff;
        font-family: "Myriad Pro";
        font-size: 48px;
        font-weight: 400;
        letter-spacing: 0.48px;
    }
    .enter-number .keyboard .row{
        display: flex;
        justify-content: space-between;
        margin-bottom: 1px;
    }
    .enter-number .keyboard .row-item{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 33%;
        box-shadow:inset 0 -1px 2px 0px rgba(0, 0, 0, 0.6);
        height: 60px;
        background: $ITEM_BG_BLUE;
        color: #e7e6ed;
        &:active{
           background: $ITEM_BG_BLUE2!important;
        }
    }
    .enter-number .keyboard .num{
        font-size: 32px;
        font-weight: 400;
        letter-spacing: 0.32px;
        font-family: "Arial";
    }
    .enter-number .keyboard .words{
        color: #a1a1a1;
        font-family: "Arial";
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0.12px;
        text-transform: uppercase;
        height: 10px;
    }
    .enter-number .actions{
        height: 88px;
        border-bottom-right-radius: 20px;
        border-bottom-left-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .enter-number .actions .call{
        width: 108px;
        height: 43px;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 1px 0px rgb(64, 94, 184);
        background: $ITEM_BG_BLUE;
        transition: 0.2s;
        &:hover{
            box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.356)
        }
    }
    .enter-number .actions .delete{
        position: absolute;
        right: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .call{
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 2;
        background-size: cover;
        background-position: 0px 0px;
        padding: 0 20px;
    }
    .call .call-icon{
        padding-top: 80px;
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .call .number{
        color: #ffffff;
        font-family: "Myriad Pro";
        font-size: 48px;
        font-weight: 400;
        letter-spacing: 0.48px;
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }
    .call .call-type{
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    .call .call-type div{
        width: 150px;
        color: #fafafa;
        font-family: "Myriad Pro";
        font-size: 20px;
        font-weight: 400;
        letter-spacing: 0.2px;
        text-align: center;
    }
    .call .btns{
        margin-top: 40px;
        display: flex;
        justify-content: center;
    }
    .call .btn{
        width: 63px;
        height: 63px;
        margin: 0 30px;
    }
    .call .btn img{
        max-width: 100%;
        max-height: 100%;
    }
    .journal .header{
        width: 100%;
        height: 76px;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding-top: 4px;
    }
    .journal .header .title{
        text-align: center;
        color: #fafbff;
        font-family: "Century Gothic";
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0.24px;
    }
    .journal .header-icon{
        position: absolute;
        right: 20px;
        top: 22px;
    }
    .journal .body{
        background-color: #fafbff;
        height: 628px;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        padding-top: 22px;
    }
    .journal .journal-item{
        display: flex;
        padding: 25px 20px;
        background: #fff;
        margin-bottom: 10px;
        box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.06);
    }
    .journal .item-info{
        display: flex;
        align-items: center
    }
    .journal .number{
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 15px;
        font-weight: 700;
        letter-spacing: 0.15px;
    }
    .journal .total{
        background: $ITEM_BG_BLUE2;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        font-family: "Arial";
        color: #fff;
        font-size: 10px;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 8px;
    }
    .journal .icon{
        margin-right: 15px;
    }
    .journal .item-time{
        margin-left: auto;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0.12px;
    }
    .journal .type-text{
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        letter-spacing: 0.14px;
    }
    .journal .type-icon{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 0.4vw
    }
    .journal-content{
        height: 100%;
        overflow-y: auto;
        &::-webkit-scrollbar{
            width: 0;
        }
    }
    .contacts .header{
        width: 100%;
        height: 76px;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding-top: 4px;
    }
    .contacts .header .title{
        text-align: center;
        color: #fafbff;
        font-family: "Century Gothic";
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0.24px;
    }
    .contacts .header-icon{
        position: absolute;
        right: 30px;
        top: 22px;
    }
    .contacts .body{
        background-color: rgba(0, 41, 85, 0.5);
        filter: blur(1);
        height: 628px;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        padding-top: 22px;
    }

    .contacts .search{
        width: 100%;
        padding: 0 30px;
    }
    .contacts .search-input{
        width: 100%;
        height: 25px;
        border-radius: 5px;
        border: none;
        background: #fff;
        color: #636363;
        font-family: "Century Gothic";
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0.14px;
        padding: 0 10px;
    }
    .contacts .search-input::placeholder{
        color: #636363;
        font-family: "Century Gothic";
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0.14px;
    }
    .contacts .search-wrapper{
        position: relative;
    }
    .contacts .search-icon{
        position: absolute;
        right: 5px;
        top: 5px;
    }
    .contacts .items{
        height: 560px;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        padding-top: 22px;
        overflow-y: auto; 
    }
    .contacts .item{
        padding: 10px 20px;
        display: flex;
        align-items: center;
        background: #fff;
        margin-bottom: 5px;
        box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.06);
    }
    .contacts .item-icon{
        margin-right: 13px;
        width: 1.88vw;
    }
    img{
        max-width: 100%;
        display: block;
    }
    .contacts .item-name{
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0.18px;
    }
    .contacts .items::-webkit-scrollbar{
        width: 7px;
    }
    .contacts .items::-webkit-scrollbar-track{
        background-color: #170e28;
        border-radius: 10px
    }
    .contacts .items::-webkit-scrollbar-thumb{
        background-color: #4c2f81;
        border-radius: 5px
    }

    .contacts-item .header{
        width: 100%;
        height: 76px;
        background: $ITEM_BG_BLUE;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        padding: 0 40px;
        padding-top: 4px;
    }
    .contacts-item .back{
        display: flex;
        justify-content: center;
        align-items: center
    }
    .contacts-item .body{
        height: 628px;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
    }
    .contacts-item .info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 320px;
        padding-top: 30px;
        position: relative;
    }
    .contacts-item .avatar{
        margin-bottom: 10px;
    }
    .contacts-item .name{
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 30px;
        font-weight: 700;
        letter-spacing: 0.3px;
    }
    .contacts-item .number{
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0.18px;
    }
    .contacts-item .actions{
        background-color: #FAFBFF;
        height: 310px;
        width: 100%;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        overflow: hidden;
    }
    .contacts-item .row{
        display: flex;
        height: 50%;
    }
    .contacts-item .row:first-child{
        box-shadow: 0 1px 3px rgb(228, 228, 228), inset 0 1px 3px rgb(228, 228, 228);
    }
    .contacts-item .row .item{
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .contacts-item .btn{
        margin-bottom: 5px;
    }
    .contacts-item .text{
        color: #636363;
        font-family: "Century Gothic";
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0.14px;
    }
    .contacts-item .alert{
        position: absolute;
        bottom: 10px;
        width: 100%;
        z-index: 2;
    }
    .contacts-item .alert .text{
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0.27px;
        background: $ITEM_BG_BLUE2;
        text-align: center;
        height: 66px;
        display: flex;
        align-items: center;
        padding: 0 30px;
    }
    .contacts-item .alert .btns{
        display: flex;
        height: 37px;
        background: $ITEM_BG_BLUE;
    }
    .contacts-item .alert .button{
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0.59px;
        background: $ITEM_BG_BLUE;
        transition: 0.2s;
    }


    .contacts-create, .message-create{
        overflow: hidden;
        border-radius: 20px
    }
    .contacts-create .header, .message-create .header{
        width: 100%;
        height: 76px;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        padding: 0 40px;
        padding-top: 4px;
    }
    .contacts-create .avatar-wrapper, .message-create .avatar-wrapper{
        height: 220px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .contacts-create .main, .message-create .main{
        height: 407px;
        box-shadow:inset 0 1px 1px rgb(228, 228, 228);
        padding: 0 25px;
    }
    .contacts-create .main .inputs, .message-create .inputs{
        padding: 30px 0;
        padding-bottom: 15px;
    }
    .contacts-create .input-wrapper, .message-create .input-wrapper{
        width: 100%;
        margin-bottom: 20px;
    }
    .contacts-create .input, .message-create .input{
        width: 100%;
        height: 48px;
        box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.11);
        border-radius: 10px;
        background-color: #ffffff;
        border: none;
        padding: 0 15px;
        color: #393939;
        font-family: "Century Gothic";
        font-size: 24px;
        font-weight: 400;
        letter-spacing: 0.24px;
    }
    .contacts-create .input-name, .message-create .input-name{
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 18px;
        font-weight: 400;
        line-height: 30px;
        letter-spacing: 0.18px;
    }
    .contacts-create .footer{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 185px;
    }
    .contacts-create .footer .btn, .message-create .footer .btn{
        width: 157px;
        height: 44px;
        border-radius: 20px;
        background: $ITEM_BG_BLUE;
        transition: 0.2s;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0.16px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        &:hover{
            box-shadow: 0 0 5px 1px rgba(210, 212, 218, 0.459);
        }
    }
    .message-create .footer{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .message-create .mb{
        margin-bottom: 10px;
    }
    .message-create .msg-input{
        height: 150px;
        resize: none;
        padding: 10px 15px;
    }
    .message-create .msg-input::-webkit-scrollbar{
        width: 7px;
    }
    .message-create .msg-input::-webkit-scrollbar-track{
        background-color: rgba(23, 14, 40, 0.247);
        border-radius: 10px
    }
    .message-create .msg-input::-webkit-scrollbar-thumb{
        background-color: #4c2f81;
        border-radius: 5px
    }
    .home{
        z-index: 111;
        width: 100px;
        height: 25px;
        background: transparent;
        position: absolute;
        bottom: 2px;
        left: 50%;
        transform: translateX(-50%);
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
        transition: 0.2s;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .square{
        width: 15px;
        height: 15px;
        border: 2px solid #fff;
        border-radius: 4px;
    }
    .taxi{
        height: 100%;
        background: url('/img/phone/taxi-bg.png');
        background-size: cover;
        display: flex;
        align-items: flex-end;
        justify-content: center;
    }
    .taxi .enter{
        width: 162px;
        height: 34px;
        border-radius: 5px;
        background-color: #f7ba24;
        color: #353634;
        font-family: "Century Gothic";
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 0.2px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin-bottom: 110px;
    }
    .taxi-call, .taxi-call-confirmed, .taxi-status{
        background: #FAFBFF;
        overflow: hidden;
        border-radius: 15px;
        
    }
    .taxi-call .main, .taxi-call-confirmed .main, .taxi-status .main{
        height: 378px; 
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }
    .taxi-call .icon{
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .taxi-call .btn{
        width: 181px;
        height: 37px;
        border-radius: 5px;
        background-color: #f7ba23;
        color: #353634;
        font-family: "Century Gothic";
        font-size: 19px;
        font-weight: 700;
        letter-spacing: 0.19px;
        display: flex;
        justify-content: center;
        align-items: center
    }
    .taxi-call .alert{
        width: 270px;
        border-radius: 10px;
        background-color: #626262;
        overflow: hidden;
        position: absolute;
        top: 10px;
    }
    .taxi-call .alert-text{
        height: 65px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0.27px;
    }
    .taxi-call .alert-btns{
        display: flex;
        height: 37px;
    }
    .taxi-call .alert-btn{
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 12px;
        font-weight: 400;
        letter-spacing: 0.59px;
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.2s;
        background: #747475;;
    }
    .taxi-call .alert-btn:hover{
        background: #EEB524;
    }
    .taxi-call .error{
        width: 160px;
        height: 46px;
        border-radius: 5px;
        background-color: #f24942;
        position: absolute;
        bottom: 25px;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: 0.14px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .taxi-call .text-info{
        margin-top: 10px;
        width: 270px;
        border-radius: 10px;
        background-color: #747475;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #fafbff;
        font-family: "Century Gothic";
        font-size: 15px;
        font-weight: 400;
        letter-spacing: 0.07px;
        padding: 12px;
        position: relative;
    }
    .taxi-call .text-info::after{
        position: absolute;
        bottom: -33px;
        right: 20px;
        content: '';
        display: block;
        height: 33px;
        width: 30px;
        background: url('/img/phone/shtuka.png');
    }
    .taxi-call-confirmed .text-info{
        margin-top: 10px;
        width: 270px;
        border-radius: 10px;
        background: #69AC4B;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #fafbff;
        font-family: "Century Gothic";
        font-size: 15px;
        font-weight: 400;
        letter-spacing: 0.07px;
        padding: 12px;
        position: relative;
    }
    .taxi-call-confirmed .text-info::after{
        position: absolute;
        bottom: -33px;
        right: 20px;
        content: '';
        display: block;
        height: 33px;
        width: 30px;
        background: url('/img/phone/shtuka-green.png');
    }
    .taxi-call-confirmed .icon{
        margin-top: 50px;
        margin-bottom: 30px;
    }
    .taxi-call-confirmed .btn{
        color: #353634;
        font-family: "Century Gothic";
        font-size: 19px;
        font-weight: 700;
        line-height: 18px;
        letter-spacing: 0.19px;
        width: 181px;
        height: 55px;
        border-radius: 5px;
        background-color: #f7ba23;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .taxi-status .text-info-title{
        color: #404040;
        font-family: "Century Gothic";
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 0.1px;
        margin-bottom: 30px;
    }
    .taxi-status .text-info{
        color: #fafbff;
        font-family: "Century Gothic";
        font-size: 15px;
        font-weight: 400;
        letter-spacing: 0.07px;
        width: 246px;
        height: 48px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .taxi-status .text-info.green{
        background: #69AC4B;
    }
    .taxi-status .text-info.red{
        background: #f24942;
    }
    .taxi-status .info{
        margin-top: 20px;
        height: 105px;
        width: 246px;
        margin-bottom: 30px;
    }
    .taxi-status .btn{
        color: #353634;
        font-family: "Century Gothic";
        font-size: 19px;
        font-weight: 700;
        line-height: 18px;
        letter-spacing: 0.19px;
        width: 181px;
        height: 55px;
        border-radius: 5px;
        background-color: #f7ba23;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 0 40px;
    }
    .taxi-status .icon{
        margin-bottom: 17px;
    }

    .settings .header{
        width: 100%;
        height: 76px;
        background-image: $ITEM_BG_BLUE;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding-top: 4px;
    }
    .settings{
        border-radius: 15px;
        overflow: hidden;
    }
    .settings .header .title{
        text-align: center;
        color: #fafbff;
        font-family: "Century Gothic";
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0.24px;
    }
    .settings .body{
        height: 628px;
        padding-top: 50px;
        overflow-y: auto;
        &::-webkit-scrollbar{
            width: 7px;
        }
        &::-webkit-scrollbar-track{
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 10px
        }
        &::-webkit-scrollbar-thumb{
            background-color: rgba(19, 90, 172, 0.96);
            border-radius: 5px
        }
    }
    .settings .item{
        width: 100%;
        height: 88px;
        box-shadow: 0px 1px 7px rgba(0, 0, 0, 0.5);
        background: $ITEM_BG_BLUE;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0.16px;
        transition: 0.2s;
        background-size: 200% 200%;
    }
    .settings .item:hover{
        background-size: 100% 400%;
        background-position:80% 0%
    }
    .settings .text{
        padding-right: 10px;
    }
    .settings .chkbox-wrapper, .settings .action{
        margin-left: auto;
    }
    .settings .action{
        display: flex;
        align-items: center;
    }
    .settings .action-text{
        min-width: 90px;
        text-align: center;
        margin: 0 5px;
        position: relative;
    }
    .settings .action .arrow{
        display: flex;
        justify-content: center;
        align-items: center
    }
    .settings .action .arrow:active{
        transform: scale(0.9);
    }
    .item-wrapper{
        width: 100%;
        height: 100%;
    }
    .contacts-sos{
        height: 100%;

    }
    .contacts-sos .header{
        width: 100%;
        height: 76px;
        background: $ITEM_BG_BLUE;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        padding: 0 40px;
        padding-top: 4px;
    }
    .contacts-sos .main{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 100px;
        margin-bottom: 30px;
    }
    .sos-title{
        color: #fff;
        font-family: "Century Gothic";
        font-size: 30px;
        font-weight: 700;
        letter-spacing: 0.3px;
        margin: 25px 0;
    }
    .sos-subtitle{
        color: #ffffff;
        font-family: "Century Gothic";
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0.18px;
    }
    .avatar-sos{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .sos-list{
        margin-top: 25px;
    }
    .sos-list-title{
        color: #fcfcfc;
        font-family: "Gotham Pro";
        font-size: 18px;
        font-weight: 700;
        letter-spacing: -0.45px;
        text-align: center;
        background: rgba(0,0,0,0.5);
        padding: 10px 0;
    }
    .sos-list-item{
        width: 100%;
        height: 92px;
        box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.06);
        background-color: #fafbff;
        display: flex;
        font-family: "Gotham Pro";
        font-size: 16px;
        font-weight: 500;
        letter-spacing: -0.8px;
        display: flex;
        align-items: center;
        padding-left: 30px;
        transition: 0.2s;
        margin-bottom: 10px;
        position: relative;
        color: rgb(212, 212, 212);
    }
    .sos-list-item:hover{
        color: #fff;
        
    }
    .sos-item-icon{
        width: 60px;
        margin-right: 20px;
    }
    .sos .input-name{
        color: #f5f5f5;
        font-family: "Gotham Pro";
        font-size: 18px;
        font-weight: 300;
        letter-spacing: -0.45px;
    }
    .sos .input{
        height: 213px;
        resize: none;
        padding: 20px;
        color: #393939;
        font-family: "Gotham Pro";
        font-size: 18px;
        font-weight: 400;
        letter-spacing: -0.42px;
    }
    .sos .footer{
        height: 100px;
        padding: 0;
    }
    .gps{
        background: url('/img/phone/gps-bg.png') no-repeat;
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 2;
        background-size: cover;
        background-position: 0px 0px;
        padding: 0 20px;
        overflow: hidden
    }
    .gps-screen{
        width: 100%;
        height: 100%;
    }
    .gps-header{
        height: 25%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center
    }
    .gps-logo{
        background: url('/img/phone/gps-logo.png') no-repeat;
        background-size: contain;
        width: 204px;
        height: 73px;
    }
    .gps-title{
        color: #fafbff;
        font-family: "Century Gothic";
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0.18px;
        text-align: center;
        margin-top: -35px;
        margin-bottom: 40px;
    }
    .gps-list{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .gps-btn{
        width: 281px;
        height: 50px;
        border-radius: 10px;
        background-color: #617d4f;
        margin-bottom: 7px;
        color: #fafbff;
        font-family: "Century Gothic";
        font-size: 18px;
        font-weight: 700;
        letter-spacing: 0.18px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        transition: 0.15s;
    }
    .gps-btn.active, .gps-btn:hover{
        background-color: #3f941a;
    }
    .busroutes-list{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 12px;
        margin-top: 24px;
        overflow-y: auto;
        max-height: 420px;
        width: 100%;
    }
    .busroutes-list::-webkit-scrollbar{
        width: 8px;
    }
    .busroutes-list::-webkit-scrollbar-track{
        background: #778f69;
        border-radius: 8px
    }
    .busroutes-list::-webkit-scrollbar-thumb{
        background: #556744;
        border-radius: 8px;
    }
    .busroutes-item{
        position: relative;
        width: 281px;
        min-height: 128px;
        border-radius: 10px;
        background-color: #ffffff;
        padding-left: 24px;
        padding-top: 8px;
        padding-right: 12px;
        padding-bottom: 8px;
        margin-bottom: 12px;
    }
    .busroutes-item::before{
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 12px;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
    }
    .busroutes-item.black::before{
        background: #000;
    }
    .busroutes-item.red::before{
        background: #6c1500;
    }
    .busroutes-item.blue::before{
        background: #1d2f58;
    }
    .busroutes-title{
        color: #5a5a5a;
        font-family: "Century Gothic";
        font-size: 18px;
        font-style: italic;
        font-weight: bold;
        letter-spacing: 0.18px;
        margin-bottom: 8px;
    }
    .busroutes-text{
        color: #5a5a5a;
        font-family: "Century Gothic";
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.13px;
    }

.weazel{

}
.weazel .header{
    width: 100%;
    height: 76px;
    background: linear-gradient(180deg, rgba(205, 76, 76, 0.6) 0%, rgba(254, 195, 195, 0) 97.13%), #EA133A;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 40px;
    padding-top: 4px;
}
.weazel-icon{
    width: 100px;
}
.weazel-icon img{
    display: block;
}
.weazel .post-wrap{
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.45);
}
.weazel .post-btn{
    background: linear-gradient(180deg, rgba(241, 131, 131, 0.6) 0%, rgba(226, 50, 50, 0) 100%), #E31313;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    font-family: "Century Gothic";
    font-size: 24px;
    color: #FFF8F8;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 290px;
    padding: 6px 0;
}
.weazel .post-btn:hover{
    animation: hoverGradient;
    animation-duration: 0.2s;
    animation-fill-mode: both;
    animation-timing-function: linear;
}
    @keyframes hoverGradient{
    0%{
        color: #FFF8F8;
        background: linear-gradient(180deg,rgba(241, 131, 131, 0.6) 0%, rgba(226, 50, 50, 0) 100%), #E31313;
    }
    100%{
        color: #EA0202;
        background: #fff;
    }
}
.weazel .post-btn.active{
    color: #EA0202;
    background: #fff;
}
.weazel .body{
    background: #CDCDCD;
    width: 100%;
    height: 555px;
    padding: 10px 15px;
}
.weazel .post-list{
    width: 100%;
    height: 100%;
    padding: 0 10px;
    overflow-y: auto;
}
.weazel .post-list::-webkit-scrollbar{
    width: 10px;
}
.weazel .post-list::-webkit-scrollbar-thumb{
    background: #F54A4A;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
}
.weazel .post-list::-webkit-scrollbar-track{
    background: #FFF4F4;
    border-radius: 10px;
}
.weazel .post-item{
    width: 100%;
    background: rgba(0, 0, 0, 0.397);
    border-radius: 6px;
    margin-bottom: 10px;
    position: relative;
    overflow: hidden;
    padding: 10px;
    padding-bottom: 35px;
    font-family: "Gotham pro";
    font-size: 16px;
    color: rgb(255, 255, 255);
    text-shadow: 1px 1px 2px rgb(0, 0, 0);
}
.weazel .post-item-footer{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 25px;
    background: linear-gradient(180deg, rgba(106, 206, 98, 0.6) 0%, rgba(46, 136, 39, 0) 100%), rgba(20, 141, 9, 0.753);
    padding: 0 10px;
    color: #FFFAFA;
    display: flex;
    align-items: center;
}
.weazel .post-num{
    font-weight: bold;
    margin-left: 5px;
}
.body-wrap{
    position: relative;
}
.weazel .overlay{
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
    z-index: 2;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.weazel .w-modal{
    width: 85%;
    height: 250px;
    background: rgb(202, 202, 202);
    border-radius: 10px;
}
.weazel .w-modal-body{
    width: 100%;
    height: 85%;
    padding: 10px;
    border-radius: 10px;
}
.weazel .w-modal-footer{
    width: 100%;
    height: 15%;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
}
.weazel .modal-btn{
    width: 120px;
    height: 30px;
    border-radius: 5px;
    color: #FFFAFA;
    font-family: "Century Gothic";
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 18px;
    transition: 0.2s;
}
.weazel .modal-btn-1{
    background: linear-gradient(180deg, rgba(145, 237, 122, 0.85) 0%, rgba(205, 104, 104, 0) 100%), #20991E;
}
.weazel .modal-btn-2{
    background: linear-gradient(180deg, rgba(226, 154, 154, 0.85) 0%, rgba(205, 104, 104, 0) 100%), #C8261B;
}
.weazel .modal-btn:hover{
    box-shadow: inset 0 0 4px 40px rgba(0, 0, 0, 0.3);
}
.weazel .textarea{
    width: 100%;
    height: 100%;
    resize: none;
    border-radius: 10px;
    padding: 15px;
    font-size: 16px;
    font-family: "Gotham Pro";
}

.forent{
    height: 100%;
    width: 100%;
    background: radial-gradient(51.88% 51.88% at 50% 56.13%, rgba(126, 124, 124, 0.15) 0%, rgba(255, 255, 255, 0) 100%), #161616;
}
.forent .header{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100px;
    background-color: #FFAA47;
    background-image: url('/img/phone/forent-tires-path-l.png'), url('/img/phone/forent-tires-path-r.png'), linear-gradient(180deg, rgba(255, 15, 15, 0.2) 0%, rgba(255, 242, 242, 0) 100%);
    background-repeat: no-repeat;
    background-position: left bottom, right bottom;
}
.forent-title{
    position: relative;
    text-align: center;
    top: -5px;
    font-family: "Century Gothic Bold";
    font-size: 14px;
    letter-spacing: -0.375px;
    color: #FFFFFF;
    text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}
.forent .body{
    max-height: calc(100% - 120px);
    margin: 5px 0;
    padding: 0 5px;
    box-sizing: border-box;
    overflow-y: auto;
    &::-webkit-scrollbar{
        width: 6px;
    }
    &::-webkit-scrollbar-thumb{
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%), #FFAA47;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track{
        background: #3E3E3E;
        border-radius: 10px;
    }
}
.forent-block{
    width: 100%;
    background: rgba(196, 196, 196, 0.3);
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.forent-block-title{
    top: 0;
    margin-bottom: 10px;
}
.forent-btn{
    width: 177px;
    height: 30px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%), #FFAA47;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Century Gothic Bold";
    font-size: 12px;
    letter-spacing: -0.375px;
    color: #3D3D3D;
    text-align: center;
    transition: 0.2s;
    &:hover{
        box-shadow: inset 0 0 100px #ffffff;
    }
}
.forent-text{
    font-family: "Century Gothic";
    font-size: 14px;
    letter-spacing: -0.375px;
    color: #FFFFFF;
    text-align: center;
    &--bold{
        font-family: "Century Gothic Bold";
    }
    &--orange{
        color: rgba(255,170,71,1)
    }
}
.forent-info-for-btn{
    margin-top: 5px;
}
.forent-active{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.forent-input-wrapper{
    margin-right: 20px;
}
.forent-input{
    width: 58px;
    height: 22px;
    background: rgba(196, 196, 196, 0.5);
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
    text-align: center;
    border-radius: 20px;
    padding: 0 10%;
    font-size: 13px;
}
.forent-active__row{
    margin-bottom: 5px;
}

    .scale-enter-active, .scale-leave-active {
        transition: .2s;
        transform: scale(1)
    }
    .scale-enter, .scale-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
        transform: scale(0.6)
    }
    .fade-enter-active {
    animation: bounce-in .2s;
    }
    .fade-leave-active {

    }
    .fade2-enter-active, .fade2-leave-active {
        transition: opacity .2s;
    }
    .fade2-enter, .fade2-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
    }
    @keyframes bounce-in {
    0% {
        perspective: 200px;
        transform: scale(1.05) rotateX(14deg) ;
        opacity: 0.8;
    }
    100% {
        transform: scale(1) rotateX(0);
        opacity: 1;
    }
    }
    .switch {
        position: relative;
        display: inline-block;
        width: 71px;
        height: 28px;
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
        background-color: rgba(255, 255, 255, 0.7);
        transition: .4s;
    }

    .switch-slider:before {
        position: absolute;
        content: "";
        left: 0px;
        bottom: 2px;
        margin-left: 2px;
        transition: .4s;
        width: 24px;
        height: 24px;
        box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.69);
        background: rgba(236, 236, 236, 0.678);
        background-image: linear-gradient(to top, rgba(0, 41, 136, 0.25) 0%, rgba(136, 136, 136, 0) 100%);
    }

    .switch input:checked + .switch-slider {
        background-image: linear-gradient(to top,#6CD148 0%, #7BE057 100%)
    }
    .switch.purple input:checked + .switch-slider{
        background-image: linear-gradient(to top,#6CD148 0%, #7BE057 100%)
    }

    .switch input:focus + .switch-slider {
        box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.267);
    }

    .switch input:checked + .switch-slider:before {
        transform: translateX(43px);
    }
    .switch-slider.round {
        border-radius: 34px;
    }

    .switch-slider.round:before {
        border-radius: 50%;
    }
    .clickLayer{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 10;
    }
    .header{
        background: $ITEM_BG_BLUE;
    }
    .blue-item{
        background-image: $ITEM_BG_BLUE!important;
        background-size: 200% 200%!important;
        transition: 0.2s!important;
        &:hover{
            background-size: 100% 400%!important;
            background-position:80% 0%!important
        }
    }
    .blue-item2{
        background-image: $ITEM_BG_BLUE2!important;
        background-size: 200% 200%!important;
        transition: 0.2s!important;
        &:hover{
            background-image: $ITEM_BG_BLUE2!important;
            background-size: 100% 400%!important;
            background-position:80% 90%!important
        }
    }
    .page-body-bg{
        background-color: rgba(0, 41, 85, 0.5)!important;
    }
    .page-body-bg2{
        background-color: rgba(0, 0, 0, 0.6)!important;
    }

@media(max-width: 1600px){
    .phone-wrapper{
        transform: scale(0.8)
    }
}
@media(max-width: 1370px){
    .phone-wrapper{
        transform: scale(0.6)
    }
}
.w-radio__bg{
    background: #CDCDCD;
    height: 628px;
}
.track-wrapper{
    display: flex;
    align-items: flex-end;
    padding: 23px 15px;
}
.track-icon{
    width: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    padding-bottom: 1px;
}
.track-name{
    font-family: "Century Gothic";
    font-weight: bold;
    font-size: 19px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    color: #BD1231;
    position: relative;
    width: 260px;
    height: 23px;
}
.track-name span{
    left: 0;
    position: absolute;
    top: 0;
}
.track-name span.isScrolling{
    display: inline-block;
    animation: 6s scroll infinite linear;
}
.w-icon__radio{
    width: 120px;
    margin-top: 6px;
}
@keyframes scroll{
    0% {
        transform: translateX(0%);
        left: 260px;
    }
    100% {
        transform: translateX(-100%);
        left: 0;
    }
}
.animated-icon-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 30px 0;
}
.main-icon{
    background-image: url('/img/phone/micro-icon.png');
    background-repeat: no-repeat;
    background-color: rgb(227, 64, 94);
    background-size: contain;
    background-position: center;
    width: 180px;
    height: 180px;
    position: relative;
    z-index: 3;
    border-radius: 50%;

}
.outer-circle,.mid-circle{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
}
.outer-circle{
    width: 230px;
    height: 230px;
    background: rgba(227, 147, 160, 0);
    &.animated{
        animation-name: outer;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-delay: 0.3s;
        animation-fill-mode: backwards;
        animation-timing-function: ease;
        }
}
.mid-circle{
    width: 205px;
    height: 205px;
    background: rgba(231, 114, 136, 0);
    &.animated{
        animation-name: mid;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-fill-mode: backwards;
        animation-timing-function: ease;
    }
}
.w-radio__buttons{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 100px;
    .btn{
        width: 220px;
        height: 47px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        font-family: "Century Gothic";
        font-size: 28px;
        color: #FFFCFC;
        transition: 0.75s;
        &.btnGreen{
            background: linear-gradient(180deg, #179E35 0%, rgba(255, 255, 255, 0) 100%, rgba(24, 145, 51, 0) 100%), #179533;
        }
        &.btnRed{
            background: linear-gradient(180deg, #CB5D5D 0%, rgba(207, 79, 79, 0) 100%), #D02443;
        }
        
        &:hover{
            box-shadow: inset 0px 4px 40px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.25);
        }
        &:active{
            box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 2px 2px rgba(0, 0, 0, 0.25);
        }
    }
}
@keyframes outer {
    0%{
        background: rgba(227, 147, 160, 0);
    }
    30%{
        background: rgba(227, 147, 160, 0.705);
    }
    70%{
        background: rgba(227, 147, 160, 0);
    }
    100%{
        background: rgba(227, 147, 160, 0);
    }
}
@keyframes mid {
    0%{
        background: rgba(231, 114, 136, 0);
    }
    30%{
        background: rgba(231, 114, 136, 0.712);
    }
    70%{
        background: rgba(231, 114, 136, 0);
    }
    100%{
        background: rgba(231, 114, 136, 0);
    }
}
.action-btns{
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 50px;
    bottom: -25px;
    left: calc(50% - 50px / 2);
}
.player-btn{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    &:active{
        box-shadow: inset 0 0 3px 3px rgba(13, 60, 78, 0.301)
    }
}
.btn-play{
    background: url('/img/phone/play.png');
}
.btn-pause{
    background: url('/img/phone/pause.png');
}
</style>
