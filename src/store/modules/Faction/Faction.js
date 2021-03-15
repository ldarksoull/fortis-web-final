import Vue from "vue";
const factionSettings = {
    state: {
        factionData: {
            guid: 0,
            type: "ems",
            title: "Title faction",
            leader: 0,
            actions: [],
            money: 0,
            materials: 10000,
            materialsMax: 30000,
        },
        actions: [
            {
                key: "act",
                title: "Action",
                description: "Описание",
            },
            {
                key: "act2",
                title: "Action2",
                description: "Описание2",
            },
            {
                key: "act3",
                title: "Action3",
                description: "Описание3",
            },
            {
                key: "act4",
                title: "Action4",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. vel",
            },
        ],
        ranks: [
            {
                rank: 1,
                title: "Кадет",
                actions: [
                    "str_cop_1",
                    "str_cop_2",
                    "str_cop_3",
                    "str_cop_4",
                    "str_cop_5",
                    "str_cop_6",
                    "str_cop_8",
                    "str_cop_pistol",
                    "str_cop_7",
                    "mnp_unbaghead",
                    "mnp_stopLead",
                    "str_cop_9mm",
                    "stn_invite",
                    "mnp_startLead",
                    "mnp_baghead",
                    "mnp_getFromVeh",
                    "mnp_putInVeh",
                    "mnp_untie",
                    "mnp_tie",
                    "mnp_putInTrunk",
                    "mnp_getFromTrunk",
                    "mnp_heal",
                    "mnp_reanimate",
                ],
                items: [],
                vehicles: [1, 2],
            },
            {
                rank: 2,
                title: "Rank 2",
                actions: [
                    "str_cop_9mm",
                    "str_cop_2",
                    "str_cop_pistol",
                    "str_cop_8",
                    "str_cop_7",
                    "str_cop_6",
                    "str_cop_5",
                    "str_cop_4",
                    "str_cop_3",
                    "str_cop_1",
                    "stn_invite",
                    "mnp_startLead",
                    "mnp_baghead",
                    "mnp_stopLead",
                    "mnp_unbaghead",
                    "mnp_getFromVeh",
                    "mnp_putInVeh",
                    "mnp_untie",
                    "mnp_tie",
                    "mnp_putInTrunk",
                    "mnp_getFromTrunk",
                    "mnp_heal",
                    "mnp_reanimate",
                ],
                items: [],
                vehicles: [1, 2],
            },
            {
                rank: 3,
                title: "",
                actions: [
                    "str_cop_9mm",
                    "str_cop_3",
                    "str_cop_pistol",
                    "stn_invite",
                    "str_cop_1",
                    "str_cop_2",
                    "str_cop_4",
                    "str_cop_5",
                    "str_cop_6",
                    "str_cop_7",
                    "str_cop_8",
                    "mnp_stopLead",
                    "mnp_startLead",
                    "mnp_unbaghead",
                    "mnp_baghead",
                    "mnp_getFromVeh",
                    "mnp_putInVeh",
                    "mnp_untie",
                    "mnp_tie",
                    "mnp_putInTrunk",
                    "mnp_getFromTrunk",
                    "mnp_heal",
                    "mnp_reanimate",
                ],
                items: [],
                vehicles: [1, 2],
            },
            {
                rank: 4,
                title: "Rank 4",
                actions: [
                    "str_cop_9mm",
                    "str_cop_4",
                    "str_cop_pistol",
                    "str_cop_7",
                    "str_cop_6",
                    "str_cop_5",
                    "str_cop_8",
                    "str_cop_3",
                    "str_cop_2",
                    "str_cop_1",
                    "stn_invite",
                    "mnp_stopLead",
                    "mnp_startLead",
                    "mnp_unbaghead",
                    "mnp_baghead",
                    "mnp_untie",
                    "mnp_tie",
                    "mnp_getFromVeh",
                    "mnp_putInVeh",
                    "mnp_putInTrunk",
                    "mnp_getFromTrunk",
                    "mnp_heal",
                    "mnp_reanimate",
                ],
                items: [],
                vehicles: [1, 2],
            },
            {
                rank: 5,
                title: "Rank 5",
                actions: [
                    "str_cop_9mm",
                    "str_cop_5",
                    "str_cop_pistol",
                    "stn_invite",
                    "str_cop_1",
                    "str_cop_2",
                    "str_cop_3",
                    "str_cop_4",
                    "str_cop_6",
                    "str_cop_7",
                    "str_cop_8",
                    "mnp_stopLead",
                    "mnp_startLead",
                    "mnp_unbaghead",
                    "mnp_baghead",
                    "mnp_putInVeh",
                    "mnp_untie",
                    "mnp_tie",
                    "mnp_getFromVeh",
                    "mnp_putInTrunk",
                    "mnp_getFromTrunk",
                    "mnp_heal",
                    "mnp_reanimate",
                ],
                items: [],
                vehicles: [1, 2],
            },
            {
                rank: 6,
                title: "Rank 6",
                actions: [
                    "str_cop_9mm",
                    "str_cop_6",
                    "str_cop_pistol",
                    "str_cop_1",
                    "str_cop_2",
                    "str_cop_5",
                    "str_cop_4",
                    "str_cop_3",
                    "mnp_getFromVeh",
                    "str_cop_8",
                    "str_cop_7",
                    "stn_invite",
                    "mnp_putInVeh",
                    "mnp_startLead",
                    "mnp_baghead",
                    "mnp_untie",
                    "mnp_tie",
                    "mnp_stopLead",
                    "mnp_unbaghead",
                    "mnp_putInTrunk",
                    "mnp_getFromTrunk",
                    "mnp_heal",
                    "mnp_reanimate",
                ],
                items: [],
                vehicles: [1, 2],
            },
            {
                rank: 7,
                title: "Rank 7",
                actions: [
                    "stn_invite",
                    "str_cop_9mm",
                    "str_cop_pistol",
                    "str_cop_8",
                    "str_cop_6",
                    "str_cop_3",
                    "str_cop_2",
                    "str_cop_1",
                    "str_cop_4",
                    "str_cop_5",
                    "str_cop_7",
                    "mnp_stopLead",
                    "mnp_startLead",
                    "mnp_unbaghead",
                    "mnp_baghead",
                    "mnp_getFromVeh",
                    "mnp_putInVeh",
                    "mnp_untie",
                    "mnp_tie",
                    "mnp_putInTrunk",
                    "mnp_getFromTrunk",
                    "mnp_heal",
                    "mnp_reanimate",
                ],
                items: [],
                vehicles: [1, 2],
            },
            {
                rank: 8,
                title: "Rank 8",
                actions: [
                    "stn_invite",
                    "str_cop_9mm",
                    "str_cop_8",
                    "str_cop_pistol",
                    "str_cop_6",
                    "str_cop_2",
                    "str_cop_1",
                    "str_cop_7",
                    "str_cop_5",
                    "str_cop_4",
                    "str_cop_3",
                    "mnp_stopLead",
                    "mnp_startLead",
                    "mnp_unbaghead",
                    "mnp_baghead",
                    "mnp_getFromVeh",
                    "mnp_putInVeh",
                    "mnp_untie",
                    "mnp_tie",
                    "mnp_putInTrunk",
                    "mnp_getFromTrunk",
                    "mnp_heal",
                    "mnp_reanimate",
                ],
                items: [],
                vehicles: [1, 2],
            },
            {
                rank: 9,
                title: "Rank 9",
                actions: [
                    "str_cop_pistol",
                    "str_cop_8",
                    "str_cop_7",
                    "str_cop_6",
                    "str_cop_5",
                    "str_cop_4",
                    "str_cop_3",
                    "str_cop_2",
                    "str_cop_1",
                    "str_cop_9mm",
                    "stn_invite",
                    "mnp_stopLead",
                    "mnp_startLead",
                    "mnp_unbaghead",
                    "mnp_baghead",
                    "mnp_getFromVeh",
                    "mnp_putInVeh",
                    "mnp_untie",
                    "mnp_tie",
                    "mnp_putInTrunk",
                    "mnp_getFromTrunk",
                    "mnp_heal",
                    "mnp_reanimate",
                ],
                items: [],
                vehicles: [1, 2],
            },
            {
                rank: 10,
                title: "Rank 10",
                actions: [
                    "str_cop_pistol",
                    "str_cop_8",
                    "str_cop_7",
                    "str_cop_6",
                    "str_cop_5",
                    "str_cop_4",
                    "str_cop_3",
                    "str_cop_2",
                    "str_cop_1",
                    "stn_invite",
                    "str_cop_9mm",
                    "mnp_stopLead",
                    "mnp_startLead",
                    "mnp_unbaghead",
                    "mnp_baghead",
                    "mnp_getFromVeh",
                    "mnp_putInVeh",
                    "mnp_untie",
                    "mnp_tie",
                    "mnp_putInTrunk",
                    "mnp_getFromTrunk",
                    "mnp_heal",
                    "mnp_reanimate",
                ],
                items: [],
                vehicles: [1, 2],
            },
        ],
        players: [
            {
                pid: 1,
                name: "Lex Anyway",
                rank: 1,
                online: true,
                factionHours: 100,
                rankHours: 100,
                todayHoursFaction: 6,
                todayMats: 1200,
                todayMoney: -10200,
            },
        ],
        settings: {
            guid: 11,
            title: "Police DEP",
            ranks: 10,
            blip: 69,
            type: "band",
            resources: 1000,
            resourcesMax: 100000,
            allActions: {
                mnp: [{ key: "stn_invite", title: "title", description: "description" }, { key: "stn_invite2", title: "title2", description: "description2" }],
                int: [{ key: "stn_invite3", title: "title3", description: "description3" }, { key: "stn_invite4", title: "title4", description: "description4" }],
                str_ammo: [{ key: "stn_invite5", title: "title3", description: "description3" }, { key: "stn_invite6", title: "title4", description: "description4" }],
                str_cloth: [{ key: "stn_invite7", title: "title3", description: "description3" }, { key: "stn_invite10", title: "title4", description: "description4" }],
                str_wpn: [{ key: "stn_invite8", title: "title3", description: "description3" }, { key: "stn_invite9", title: "title4", description: "description4" }],
            },
            selectActions: {
                mnp: [{ key: "stn_invite2", title: "title2", description: "description2" }],
            },
            allTypes: {
                band: ["Weapon", "Ammo", "Drug", "Other"],
                mafia: ["Weapon", "Ammo", "Drug", "Other"],
                army: ["Weapon", "Ammo", "Medecine", "Equipment"],
                ems: ["Medecine"],
            },
            allItems: {
                Weapon: [
                    { title: "Пистолет", id: 57, materials: 60 },
                    { title: "Мини СМГ", id: 59, materials: 150 },
                    { title: "Винтажный пистолет", id: 24, materials: 120 },
                    { title: "Штурмовая винтовка", id: 26, materials: 350 },
                    { title: "Пистолет MK II", id: 46, materials: 130 },
                    { title: "Автоматическая винтовка", id: 48, materials: 340 },
                    { title: "Пистолет Tec-9", id: 50, materials: 170 },
                    { title: "Укороченная винтовка", id: 52, materials: 290 },
                    { title: "Тяжелый пистолет", id: 55, materials: 90 },
                    { title: "Двуствольный обрез", id: 28, materials: 120 },
                    { title: "Особый Карабин MK II", id: 63, materials: 420 },
                    { title: "Пулемёт", id: 65, materials: 1000 },
                    { title: "Штурмовой ПП", id: 68, materials: 250 },
                    { title: "Бейсбольная бита", id: 30, materials: 15 },
                ],
                Ammo: [
                    { title: "Патроны для пистолета", id: 58, materials: 1 },
                    { title: "Патроны для мини СМГ", id: 60, materials: 1 },
                    { title: "Патроны для винтажного пистолета", id: 25, materials: 1 },
                    { title: "Патроны для штурмовой винтовки", id: 27, materials: 1 },
                    { title: "Патроны для пистолета MK II", id: 47, materials: 1 },
                    { title: "Патроны для автоматической винтовки", id: 49, materials: 1 },
                    { title: "Патроны для Tec-9", id: 51, materials: 1 },
                    { title: "Патроны для укороченной винтовки", id: 53, materials: 1 },
                    { title: "Патроны для тяжелого пистолета", id: 56, materials: 1 },
                    { title: "Патроны для двуствольного обреза", id: 54, materials: 1 },
                    { title: "Патроны для особого карабина МК II", id: 64, materials: 1 },
                    { title: "Патроны для пулемёта", id: 67, materials: 1 },
                    { title: "Патроны для штурмового ПП", id: 69, materials: 1 },
                ],
                Drug: [{ title: "Марихуана", count: 0, id: 15 }, { title: "Метамфетамин", count: 0, id: 20 }],
                Other: [{ title: "Ножовки", count: 0, id: 23 }, { title: "Отмычки", count: 0, id: 19 }, { title: "Мешки", count: 0, id: 21 }, { title: "Стяжки", count: 0, id: 22 }],
                Medecine: [{ title: "Аптечки", count: 0, id: 61 }],
                Equipment: [{ title: "Бронежелет", id: 8, materials: 200 }],
            },
        },
        storage: {
            Weapon: [{ title: "Пистолет", id: 57, materials: 60 }, { title: "Мини СМГ", id: 59, materials: 150 }, { title: "Бейсбольная бита", id: 30, materials: 15 }],
            Ammo: [{ title: "Патроны для пистолета", id: 58, materials: 1 }, { title: "Патроны для мини СМГ", id: 60, materials: 1 }],
            Drug: [{ title: "Марихуана", count: 0, id: 15 }, { title: "Метамфетамин", count: 0, id: 20 }],
            Other: [{ title: "Ножовки", count: 0, id: 23 }, { title: "Отмычки", count: 0, id: 19 }, { title: "Мешки", count: 0, id: 21 }, { title: "Стяжки", count: 0, id: 22 }],
            Contraband: { time: 0, price: 15000 },
        },
        bizWar: {
            // id:1,
            // owner: "null",
            // moneyTakeTime: 1000000000,
            // type: "mafia",
        },
        onBoardComputer: {},
        storageHistory: [
            /*{ title:"Тайзер", count: 11, date: "14:54:22 16.01.2020", name: "Michael Rutio", type: "взял"},
        { title:"Тайзер", count: 11, date: "14:54:22 16.01.2020", name: "Michael Rutio", type: "взял"},
        { title:"Тайзер", count: 11, date: "2020-01-14 20:52:56", name: "Michael Rutio", type: "взял"},
        { title:"Тайзер", count: 11, date: "2020-01-14 20:52:56", name: "Michael Rutio", type: "взял"},
        { title:"Тайзер", count: 11, date: "2020-01-14 20:52:56", name: "Michael Rutio", type: "взял"},
        { title:"Тайзер", count: 11, date: "2020-01-14 20:52:56", name: "Michael Rutio", type: "положил"},
        { title:"Тайзер", count: 11, date: "2020-01-14 20:52:56", name: "Michael Rutio", type: "положил"},
        { title:"Тайзер", count: 11, date: "2020-01-14 20:52:56", name: "Michael Rutio", type: "положил"},
        { title:"Тайзер", count: 11, date: "2020-01-14 20:52:56", name: "Michael Rutio", type: "положил"},
        { title:"Тайзер", count: 11, date: "2020-01-14 20:52:56", name: "Michael Rutio", type: "положил"},*/
        ],
        moneyHistory: [
            /*{reason:"test reason", value: 11000, date: "14:54:22 16.01.2020", name: "Michael Rutio", type: "take"},
      {reason:"test reason", value: 110000, date: "14:54:22 16.01.2020", name: "Michael Rutio", type: "take"},
      {reason:"test reason", value: 1100000, date: "14:54:22 16.01.2020", name: "Michael Rutio", type: "take"},
      {reason:"test reason", value: 11, date: "14:54:22 16.01.2020", name: "Michael Rutio", type: "take"},
      {reason:"test reason", value: 11, date: "14:54:22 16.01.2020", name: "Michael Rutio", type: "take"},
      {reason:"test reason", value: 11, date: "14:54:22 16.01.2020", name: "Michael Rutio", type: "put"},
      {reason:"test reason", value: 11, date: "14:54:22 16.01.2020", name: "Michael Rutio", type: "put"},
      {reason:"test reason", value: 11, date: "14:54:22 16.01.2020", name: "Michael Rutio", type: "put"},
      {reason:"test reason", value: 11, date: "14:54:22 16.01.2020", name: "Michael Rutio", type: "put"},
      {reason:"test reason", value: 11, date: "14:54:22 16.01.2020", name: "Michael Rutio", type: "put"},*/
        ],
        calls: [
            // { type: "ems", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor i.", time:"22:22:22", name: "Michael Rutio", id: 1, acceptedList: []},
        ],
        finesList: [
            /*      {id: 1, name: "Lex Anyway", reason: "just reason", price: 2000},
      {id: 2, name: "Lex Anyway", reason: "just reason", price: 2000},
      {id: 3, name: "Lex Anyway", reason: "just reason", price: 2000},
      {id: 4, name: "Lex Anyway", reason: "just reason", price: 2000},*/
        ],
        wantedList: [
            // {id: 2, name: "Lex Anyway", reason: "WANTED", time: 5},
        ],
        searchResult: [
            // {id: 1, name: "Lex Anyway", reason: "WANTED", playerGuid: 99, type:"wanted", time:11, price: 0},
            // {id: 2, name: "Lex Anyway", reason: "WANTED", playerGuid: 99, type:"wanted", time:11, price: 0},
            // {id: 3, name: "Lex Anyway", reason: "WANTED", playerGuid: 99, type:"wanted", time:11, price: 0},
            // {id: 4, name: "Lex Anyway", reason: "WANTED", playerGuid: 99, type:"wanted", time:11, price: 0},
            // {id: 5, name: "Lex Anyway", reason: "WANTED", playerGuid: 99, type:"wanted", time:11, price: 0},
            // {id: 6, name: "Lex Anyway", reason: "fine", playerGuid: 99, type:"fine", time:0, price: 500},
            // {id: 7, name: "Lex Anyway", reason: "fine", playerGuid: 99, type:"fine", time:0, price: 500},
            // {id: 8, name: "Lex Anyway", reason: "fine", playerGuid: 99, type:"fine", time:0, price: 500},
            // {id: 9, name: "Lex Anyway", reason: "fine", playerGuid: 99, type:"fine", time:0, price: 100},
            // {id: 10, name: "Lex Anyway", reason: "fine", playerGuid: 99, type:"fine", time:0, price: 100},
        ],
        policeDb: [
            /*     {id: 1, name: "Lex Anyway", reason: "WANTED", playerGuid: 99, time:11, secret:0},
      {id: 2, name: "Lex Anyway", reason: "WANTED", playerGuid: 99, time:11, secret:0},
      {id: 3, name: "Lex Anyway", reason: "WANTED", playerGuid: 99, time:11, secret:0},
      {id: 4, name: "Lex Anyway", reason: "WANTED", playerGuid: 99, time:11, secret:0},
      {id: 5, name: "Lex Anyway", reason: "WANTED", playerGuid: 99, time:11, secret:0},
      {id: 6, name: "Lex Anyway", reason: "WANTED", playerGuid: 99, time:11, secret:0},
      {id: 7, name: "Lex Anyway", reason: "WANTED", playerGuid: 99, time:11, secret:0},
      {id: 8, name: "Lex Anyway", reason: "WANTED", playerGuid: 99, time:11, secret:0},
      {id: 9, name: "Lex Anyway", reason: "WANTED", playerGuid: 99, time:11, secret:0},
      {id: 10, name: "Lex Anyway", reason: "WANTED", playerGuid: 99, time:11, secret:0},
      {id: 11, name: "Lex Anyway", reason: "WANTED", playerGuid: 99, time:11, secret:0},
      {id: 12, name: "Lex Anyway", reason: "WANTED", playerGuid: 99, time:11, secret:0},
      {id: 13, name: "Lex Anyway", reason: "WANTED", playerGuid: 99, time:11, secret:0},
      {id: 14, name: "Lex Anyway", reason: "WANTED SECRET CASE", playerGuid: 99, time:11, secret:1},
      {id: 15, name: "Lex Anyway", reason: "WANTED SECRET CASE", playerGuid: 99, time:11, secret:1},
      {id: 16, name: "Lex Anyway", reason: "WANTED SECRET CASE", playerGuid: 99, time:11, secret:1},*/
        ],
        searchDbResult: [
            // {id: 16, name: "Lex Anyway", reason: "WANTED SECRET CASE", playerGuid: 99, time:11, secret:1},
        ],
        policeCase: {},
        prisonersList: [
            // {name:"Lex Anyway", time:10, id: 99},
        ],
        vehicles: [
            { guid: 1, number: "12345678", title: "car1", price: 10000 },
            { guid: 2, number: "ABCDEFGH", title: "car2", price: 20000 },
            { guid: 3, number: "ABCDEFG1", title: "car3", price: 30000 },
        ],
        announcement: [
            {
                id: 1,
                playerGuid: 1,
                playerName: "Misha Rutio",
                title: "Test Title",
                msg:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.",
                date: { date: "24.09.19", time: "10:30" },
            },
        ],
        weazelNewsAds: [
            /*      {
        playerId: 1,
        id: 1,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Ris",
        phone: 123456,
      },
      {
        playerId: 1,
        id: 1,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Ris",
        phone: 123456,
      },*/
        ],
        declinedCalls: [],
        uniform: [
            /*
  {
    type: "Головной убор",
    clothType: "hats",
    itemsList: [{ id: 1, title: "Шапка 1", isProp: 1, componentNumber: 0, drawable: 2, textureId: 0 }, { id: 2, title: "Кепка 1", isProp: 1, componentNumber: 0, drawable: 4, textureId: 0 }],
  },
  {
    type: "Верхняя одежда",
    clothType: "jacket",
    itemsList: [
      { id: 3, title: "Пиджак", isProp: 0, componentNumber: 11, drawable: 4, textureId: 0, paletteId: 0 },
      { id: 4, title: "Куртка", isProp: 0, componentNumber: 11, drawable: 6, textureId: 0, paletteId: 0 },
    ],
  },
  { type: "Штаны", clothType: "pants", itemsList: [{ id: 5, title: "Штаны", isProp: 0, componentNumber: 4, drawable: 1, textureId: 0, paletteId: 0 }] },
  {
    type: "Бронежелет",
    clothType: "jacket",
    itemsList: [{ id: 6, title: "Броня", isProp: 0, componentNumber: 9, drawable: 1, textureId: 0, paletteId: 0 }],
  },
  { type: "Обувь", clothType: "feet", itemsList: [{ id: 7, title: "Кеды", isProp: 0, componentNumber: 6, drawable: 1, textureId: 0, paletteId: 0 }] },
  { type: "Очки", clothType: "glass", itemsList: [{ id: 8, title: "Очки", isProp: 1, componentNumber: 1, drawable: 2, textureId: 0 }] },
  {
    type: "Аксессуары",
    clothType: "jacket",
    itemsList: [{ id: 9, title: "Галстук", isProp: 1, componentNumber: 7, drawable: 21, textureId: 0 }],
  },
*/
        ],
        uniformKits: [],
        currentUniform: {},
        adminWatchTablet: false,
    },
    mutations: {
        setFactionData(state, data) {
            state.factionData = data;
        },
        setFactionActions(state, data) {
            state.actions = data;
        },
        setFactionRanks(state, data) {
            state.ranks = data;
        },
        setFactionPlayers(state, data) {
            state.players = data;
        },
        setFactionSettAdmin(state, data) {
            state.settings = data;
        },
        setFactionStorage(state, data) {
            state.storage = data;
        },
        setBizWar(state, data) {
            state.bizWar = data;
        },
        setOnBoardComputer(state, data) {
            state.onBoardComputer = data;
        },
        setFactionStorageHistory(state, data) {
            state.storageHistory = data;
        },
        pushFactionStorageHistory(state, data) {
            state.storageHistory.unshift(data);
        },
        setFactionMoneyHistory(state, data) {
            state.moneyHistory = data;
        },
        pushFactionMoneyHistory(state, data) {
            state.moneyHistory.unshift(data);
        },
        setFactionCalls(state, data) {
            state.calls = data;
        },
        addFactionCall(state, data) {
            state.calls.push(data);
        },
        removeFactionCall(state, data) {
            const callIndex = state.calls.findIndex(c => c.id === data);
            if (callIndex !== -1) {
                state.calls.splice(callIndex, 1);
            }
        },
        setFactionSosCallAccepted(state, data) {
            const call = state.calls.find(c => c.id === data.id);
            if (call) {
                call.acceptedList = data.list;
            }
        },
        setFactionDeclinedCalls(state, data) {
            state.declinedCalls.push(data);
        },
        setFactionFinesList(state, data) {
            state.finesList = data;
        },
        setFactionWantedList(state, data) {
            state.wantedList = data;
        },
        setFactionSearchResult(state, data) {
            state.searchResult = data;
        },
        setFactionSearchResultDb(state, data) {
            state.searchDbResult = data;
        },
        setFactionPoliceDb(state, data) {
            state.policeDb = data;
        },
        setFactionPoliceCase(state, data) {
            state.policeCase = data;
        },
        setFactionPrisonersList(state, data) {
            state.prisonersList = data;
        },
        setFactionVehicles(state, data) {
            state.vehicles = data;
        },
        pushFactionVehicles(state, data) {
            state.vehicles.push(data);
        },
        removeFactionVehicles(state, data) {
            state.vehicles = state.vehicles.filter(veh => veh.guid !== data);
        },
        updateFactionVehicleNumber(state, data) {
            const vehicle = state.vehicles.find(veh => veh.guid == data.guid);
            if (vehicle) vehicle.number = data.number;
        },
        setFactionAnnouncement(state, data) {
            state.announcement = data;
        },
        addFactionAnnouncement(state, data) {
            state.announcement.push(data);
        },
        setWeazelAds(state, data) {
            state.weazelNewsAds = data;
        },
        pushWeazelAd(state, data) {
            state.weazelNewsAds.push(data);
        },
        updateWeazelAdState(state, data) {
            const ad = state.weazelNewsAds.find(_ad => _ad.id === data.id);
            if (ad) ad.edit = data.edit;
        },
        removeWeazelAd(state, data) {
            state.weazelNewsAds = state.weazelNewsAds.filter(ad => ad.id !== data);
        },
        setFactionUniform(state, data) {
            state.uniform = data;
        },
        setFactionUniformKits(state, data) {
            state.uniformKits = data;
        },
        setFactionCurrentUniform(state, data) {
            state.currentUniform = data;
        },
        setContrabandTime(state, data) {
            if (state.storage.Contraband) state.storage.Contraband.time = data;
        },
        setFactionResource(state, data) {
            state.factionData.materials = data;
        },
        setFactionMoney(state, data) {
            state.factionData.money = data;
        },
        setStorageCount(state, { type, id, count }) {
            const category = state.storage[type];
            if (category) {
                const itemData = category.find(item => item.id === id);
                if (itemData) itemData.count = count;
            }
        },
        addFactionPlayer(state, data) {
            state.players.push(data);
        },
        removeFactionPlayer(state, data) {
            const index = state.players.findIndex(p => p.pid === data);
            if (index > -1) state.players.splice(index, 1);
        },
        setPlayerOnline(state, data) {
            const playerData = state.players.find(p => p.pid === data);
            if (playerData) playerData.online = true;
        },
        setPlayerOffline(state, data) {
            const playerData = state.players.find(p => p.pid === data);
            if (playerData) playerData.online = false;
        },
        setPlayerOffline(state, data) {
            const playerData = state.players.find(p => p.pid === data);
            if (playerData) playerData.online = false;
        },
        setPlayerRank(state, data) {
            const playerData = state.players.find(p => p.pid === data.pid);
            if (playerData) playerData.rank = data.rank;
        },
        setPlayerFactionData(state, data) {
            const index = state.players.findIndex(p => p.pid === data.pid);
            if (index > -1) Vue.set(state.players, index, data);
        },
        setAdminWatchTablet(state, data) {
            state.adminWatchTablet = data;
        },
    },
    actions: {
        setFactionData({ commit }, data) {
            commit("setFactionData", data);
        },
        setFactionActions({ commit }, data) {
            commit("setFactionActions", data);
        },
        setFactionRanks({ commit }, data) {
            commit("setFactionRanks", data);
        },
        setFactionPlayers({ commit }, data) {
            commit("setFactionPlayers", data);
        },
        setFactionSettAdmin({ commit }, data) {
            commit("setFactionSettAdmin", data);
        },
        setFactionStorage({ commit }, data) {
            commit("setFactionStorage", data);
        },
        setBizWar({ commit }, data) {
            commit("setBizWar", data);
        },
        setOnBoardComputer({ commit }, data) {
            commit("setOnBoardComputer", data);
        },
        setFactionStorageHistory({ commit }, data) {
            commit("setFactionStorageHistory", data);
        },
        pushFactionStorageHistory({ commit }, data) {
            commit("pushFactionStorageHistory", data);
        },
        setFactionMoneyHistory({ commit }, data) {
            commit("setFactionMoneyHistory", data);
        },
        pushFactionMoneyHistory({ commit }, data) {
            commit("pushFactionMoneyHistory", data);
        },
        setFactionCalls({ commit }, data) {
            commit("setFactionCalls", data);
        },
        addFactionCall({ commit }, data) {
            commit("addFactionCall", data);
        },
        removeFactionCall({ commit }, data) {
            commit("removeFactionCall", data);
        },
        setFactionSosCallAccepted({ commit }, data) {
            commit("setFactionSosCallAccepted", data);
        },
        setFactionDeclinedCalls({ commit }, data) {
            commit("setFactionDeclinedCalls", data);
        },
        setFactionFinesList({ commit }, data) {
            commit("setFactionFinesList", data);
        },
        setFactionWantedList({ commit }, data) {
            commit("setFactionWantedList", data);
        },
        setFactionSearchResult({ commit }, data) {
            commit("setFactionSearchResult", data);
        },
        setFactionSearchResultDb({ commit }, data) {
            commit("setFactionSearchResultDb", data);
        },
        setFactionPoliceDb({ commit }, data) {
            commit("setFactionPoliceDb", data);
        },
        setFactionPoliceCase({ commit }, data) {
            commit("setFactionPoliceCase", data);
        },
        setFactionPrisonersList({ commit }, data) {
            commit("setFactionPrisonersList", data);
        },
        setFactionVehicles({ commit }, data) {
            commit("setFactionVehicles", data);
        },
        pushFactionVehicles({ commit }, data) {
            commit("pushFactionVehicles", data);
        },
        removeFactionVehicles({ commit }, data) {
            commit("removeFactionVehicles", data);
        },
        updateFactionVehicleNumber({ commit }, data) {
            commit("updateFactionVehicleNumber", data);
        },
        setFactionAnnouncement({ commit }, data) {
            commit("setFactionAnnouncement", data);
        },
        addFactionAnnouncement({ commit }, data) {
            commit("addFactionAnnouncement", data);
        },
        setWeazelAds({ commit }, data) {
            commit("setWeazelAds", data);
        },
        pushWeazelAd({ commit }, data) {
            commit("pushWeazelAd", data);
        },
        updateWeazelAdState({ commit }, data) {
            commit("updateWeazelAdState", data);
        },
        removeWeazelAd({ commit }, data) {
            commit("removeWeazelAd", data);
        },
        setFactionUniform({ commit }, data) {
            commit("setFactionUniform", data);
        },
        setFactionUniformKits({ commit }, data) {
            commit("setFactionUniformKits", data);
        },
        setFactionCurrentUniform({ commit }, data) {
            commit("setFactionCurrentUniform", data);
        },
        setContrabandTime({ commit }, data) {
            commit("setContrabandTime", data);
        },
        setFactionResource({ commit }, data) {
            commit("setFactionResource", data);
        },
        setFactionMoney({ commit }, data) {
            commit("setFactionMoney", data);
        },
        setStorageCount({ commit }, data) {
            commit("setStorageCount", data);
        },
        addFactionPlayer({ commit }, data) {
            commit("addFactionPlayer", data);
        },
        removeFactionPlayer({ commit }, data) {
            commit("removeFactionPlayer", data);
        },
        setPlayerOnline({ commit }, data) {
            commit("setPlayerOnline", data);
        },
        setPlayerOffline({ commit }, data) {
            commit("setPlayerOffline", data);
        },
        setPlayerRank({ commit }, data) {
            commit("setPlayerRank", data);
        },
        setPlayerFactionData({ commit }, data) {
            commit("setPlayerFactionData", data);
        },
        setAdminWatchTablet({ commit }, data) {
            commit("setAdminWatchTablet", data);
        },
    },
    getters: {
        getFactionData: state => {
            return state.factionData;
        },
        getFactionActions: state => {
            return state.actions;
        },
        getFactionRanks: state => {
            return state.ranks;
        },
        getFactionPlayers: state => {
            return state.players;
        },
        getFactionSettingsAdmin: state => {
            return state.settings;
        },
        getFactionStorage: state => {
            return state.storage;
        },
        getBizWar: state => {
            return state.bizWar;
        },
        getOnBoardComputer: state => {
            return state.onBoardComputer;
        },
        getWeazelNewsAdsUnedited: state => {
            return state.weazelNewsAds.filter(ad => !ad.edit);
        },
        getPrisonersList: state => {
            return state.prisonersList;
        },
        getDeclinedCalls: state => {
            return state.declinedCalls;
        },
        getFactionUniform: state => {
            return state.uniform;
        },
        getFactionUniformKits: state => {
            return state.uniformKits;
        },
        getFactionCurrentUniform: state => {
            return state.currentUniform;
        },
        getAdminWatchTablet: state => {
            return state.adminWatchTablet;
        },
    },
};

export default factionSettings;
