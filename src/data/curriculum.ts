import { SubjectMeta } from '../types';

export const SUBJECTS_DATA: SubjectMeta[] = [
  {
    id: 'math',
    name: 'Mathematics',
    uzbekName: 'Matematika',
    icon: '🧮',
    color: 'from-amber-400 to-orange-500',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    borderColor: 'border-amber-300',
    description: 'Sonlar sehri, karra jadvali va chaqqon hisob-kitoblar',
    lessons: [
      {
        level: 'easy',
        lessonNumber: 1,
        isLocked: false, // Bepul dars!
        title: "1-Dars: Sonlar va Timsohcha 'Katta-Kichik'",
        description: "Sonlarni taqqoslash va o’nliklar bilan do’stlashish",
        targetEmoji: '⭐',
        distractors: ['🍎', '🎈', '🚗', '🍄', '⚽'],
        cards: [
          {
            id: 'm1',
            title: "Timsohcha Qoidasi (> va <)",
            concept: "Katta va kichik belgilari",
            mnemonic: "Timsohchaning qorni doim och! U doim kattaroq son tomon og’zini katta ochadi: 8 > 3!",
            funFact: "Agar sonlar teng bo’lsa, timsoh ikkilanib ikkala labini teng ochadi (=)!",
            icon: '🐊',
            badge: 'Taqqos'
          },
          {
            id: 'm2',
            title: "O’nliklar Do’stligi",
            concept: "10 ni hosil qiluvchi juftliklar",
            mnemonic: "1 va 9, 2 va 8, 3 va 7, 4 va 6, 5 va 5 — bular 'O’nlik egizaklari'! Doim bir-birini to’ldiradi.",
            funFact: "Qo’lingdagi 10 ta barmoqni sanab, o’nlik juftligini topish juda oson!",
            icon: '🔟',
            badge: 'Oson hisob'
          },
          {
            id: 'm3',
            title: "Juft va Toq sonlar",
            concept: "Sonlarni ikkiga bo’lish",
            mnemonic: "Juft sonlar doim do’stlari bilan juft yuradi (0, 2, 4, 6, 8). Toq sonlar esa bittasi yolg’iz qoladi (1, 3, 5, 7, 9)!",
            funFact: "Oyoq kiyimlaring doim juft bo’ladi!",
            icon: '👟',
            badge: 'Juftlik'
          },
          {
            id: 'm4',
            title: "Qo’shishda o’rin almashtirish",
            concept: "a + b = b + a",
            mnemonic: "Savatchadagi olmalarning joyini almashtirsang ham, soni o’zgarmaydi: 4 + 5 = 9 va 5 + 4 = 9!",
            funFact: "Buni 'Qo’shishning o’rin almashtirish qonuni' deyiladi.",
            icon: '🔄',
            badge: 'Sehrli qoida'
          },
          {
            id: 'm5',
            title: "5 ga Ko’paytirish Sirlari",
            concept: "Karra jadvalida 5",
            mnemonic: "5 ga ko’paytirsang, javob doim 0 yoki 5 bilan tugaydi: 5, 10, 15, 20, 25... Xuddi soat milidek!",
            funFact: "Soatdagi har bitta katta raqam 5 daqiqaga teng!",
            icon: '⏰',
            badge: 'Karra jadvali'
          },
          {
            id: 'm6',
            title: "9 ga Ko’paytirish Barmoq Sirlari",
            concept: "9 lik karra jadvali",
            mnemonic: "10 ta barmog’ingni yoy. 9 x 3 bo’lsa, 3-barmoqni buk! Chapda 2 ta, o’ngda 7 ta barmoq: 27!",
            funFact: "9 ga ko’paytirilgan sonning raqamlari yig’indisi doim 9 bo’ladi (2+7=9, 3+6=9)!",
            icon: '✋',
            badge: 'Mo’jiza'
          },
          {
            id: 'm7',
            title: "Nolning Qudrati (0)",
            concept: "Nol bilan amallar",
            mnemonic: "Nol — ko’zga ko’rinmas qahramon! Har qanday sonni 0 ga ko’paytirsang, uni ham 0 ga aylantiradi!",
            funFact: "Qadimda noldan oldin sonlar qatorida bo’sh joy qoldirishgan.",
            icon: '🍩',
            badge: '0 siri'
          },
          {
            id: 'm8',
            title: "Perimetr — Hovli To’sig’i",
            concept: "Shakl atrofini o’lchash",
            mnemonic: "Tasavvur qil, kuchukcha hovli devori bo’ylab yugurib chiqdi. Barcha tomonlar uzunligi yig’indisi — Perimetr!",
            funFact: "P = a + b + a + b (to’g'ri to’rtburchak perimetri).",
            icon: '🏡',
            badge: 'Geometriya'
          },
          {
            id: 'm9',
            title: "Bir vaqtda 2 ga Bo’lish",
            concept: "Yarmisini topish",
            mnemonic: "2 ga bo’lish — shirin shokoladni eng yaqin do’sting bilan teng ikkiga bo’lish demakdir!",
            funFact: "Barcha juft sonlar 2 ga qoldiqsiz bo’linadi.",
            icon: '🍫',
            badge: 'Bo’lish'
          },
          {
            id: 'm10',
            title: "Rim Raqamlari (I, V, X)",
            concept: "Qadimgi Rim belgilari",
            mnemonic: "I — bitta barmoq (1), V — ochiq kaft (5), X — kesishgan ikki qo’l (10)!",
            funFact: "Rim raqamlari ko’pincha qadimiy minorali soatlarda ishlatiladi.",
            icon: '🏛️',
            badge: 'Rim raqami'
          }
        ],
        quizzes: [
          {
            id: 'mq1',
            question: "Timsohcha qaysi son tomon og’zini ochadi: 45 ... 28?",
            options: ['45 > 28', '45 < 28', '45 = 28', 'Taqqoslab bo’lmaydi'],
            correctIndex: 0,
            mnemonicTip: "Timsohcha har doim kattaroq sonni yeyishni xohlaydi: 45 kattaroq, demak 45 > 28!",
            mistakeType: 'Taqqoslash qoidasi'
          },
          {
            id: 'mq2',
            question: "Qaysi juftlik 10 ni hosil qiladi?",
            options: ['4 va 5', '3 va 7', '6 va 3', '2 va 9'],
            correctIndex: 1,
            mnemonicTip: "O’nlik egizaklarini esla: 3 va 7 qo’shilsa doim 10 bo’ladi!",
            mistakeType: 'O’nlik juftliklari'
          },
          {
            id: 'mq3',
            question: "Quyidagilardan qaysi biri juft son?",
            options: ['13', '17', '24', '31'],
            correctIndex: 2,
            mnemonicTip: "Oxirgi raqami 0, 2, 4, 6, 8 bo’lgan sonlar juft son hisoblanadi!",
            mistakeType: 'Juft va toq sonlar'
          },
          {
            id: 'mq4',
            question: "5 x 6 ko’paytmaning natijasi qanday son bilan tugaydi?",
            options: ['3 bilan', '0 bilan', '7 bilan', '1 bilan'],
            correctIndex: 1,
            mnemonicTip: "5 ni juft songa ko’paytirsak, natija doim 0 bilan tugaydi: 5 x 6 = 30!",
            mistakeType: 'Karra jadvali'
          },
          {
            id: 'mq5',
            question: "7 x 0 amali nechaga teng bo’ladi?",
            options: ['7', '0', '70', '1'],
            correctIndex: 1,
            mnemonicTip: "Nol har qanday sonni o’ziga o’xshatib nol qilib qo’yadi!",
            mistakeType: 'Nol xususiyati'
          },
          {
            id: 'mq6',
            question: "Tomonlari 3 sm va 5 sm bo’lgan to’g'ri to’rtburchak perimetri qancha?",
            options: ['8 sm', '15 sm', '16 sm', '10 sm'],
            correctIndex: 2,
            mnemonicTip: "Hovli devori bo’ylab yur: 3 + 5 + 3 + 5 = 16 sm!",
            mistakeType: 'Perimetr hisobi'
          },
          {
            id: 'mq7',
            question: "Rim raqamlarida 'X' qaysi sonni bildiradi?",
            options: ['5', '1', '10', '50'],
            correctIndex: 2,
            mnemonicTip: "X — xuddi kesishgan ikki qo’l barmoqlari (10) kabi!",
            mistakeType: 'Rim raqamlari'
          },
          {
            id: 'mq8',
            question: "Agar 8 ta konfetni 2 bolaga teng bo’lsak, har biriga nechtadan tegadi?",
            options: ['2 ta', '4 ta', '6 ta', '8 ta'],
            correctIndex: 1,
            mnemonicTip: "8 ning yarmi — 4 bo’ladi! 8 : 2 = 4.",
            mistakeType: 'Teng bo’lish'
          },
          {
            id: 'mq9',
            question: "9 x 4 amalini barmoqda topishda nechanchi barmoq bukiladi?",
            options: ['9-barmoq', '4-barmoq', '5-barmoq', '1-barmoq'],
            correctIndex: 1,
            mnemonicTip: "4 ga ko’paytirsak, 4-barmoq bukiladi: chapda 3, o’ngda 6 — 36!",
            mistakeType: '9 ga ko’paytirish'
          },
          {
            id: 'mq10',
            question: "Savatchada 12 ta olma bor edi, 5 tasi olindi. Yana 5 tasi qo’shilsa nechtaga aylanadi?",
            options: ['10 ta', '12 ta', '17 ta', '7 ta'],
            correctIndex: 1,
            mnemonicTip: "5 ta olinib, yana 5 ta qo’shilsa, son o’zgarmasdan 12 ta qoladi!",
            mistakeType: 'Mantiqiy hisob'
          }
        ]
      },
      {
        level: 'medium',
        lessonNumber: 2,
        isLocked: true, // Premium dars
        title: "2-Dars: Bo’linish Alomatlari va Ko’p xonali sonlar",
        description: "Yuzliklar, qoldiqli bo’lish va geometrik shakllar sirlari",
        targetEmoji: '🎯',
        distractors: ['🍪', '🛸', '🪁', '🧩'],
        cards: [],
        quizzes: []
      },
      {
        level: 'hard',
        lessonNumber: 3,
        isLocked: true, // Premium dars
        title: "3-Dars: Matnli Masalalar va Mantiqiy jumboqlar",
        description: "Murakkab masalalarni bosqichma-bosqich hal qilish",
        targetEmoji: '👑',
        distractors: ['🎨', '🏓', '🎸', '🎮'],
        cards: [],
        quizzes: []
      }
    ]
  },
  {
    id: 'reading',
    name: 'Reading & Literature',
    uzbekName: "O’qish kitobi",
    icon: '📚',
    color: 'from-blue-500 to-indigo-600',
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
    borderColor: 'border-blue-300',
    description: 'Ertaklar, qiziqarli maqollar va ifodali o\'qish sirlari',
    lessons: [
      {
        level: 'easy',
        lessonNumber: 1,
        isLocked: false,
        title: "1-Dars: Ertaklar va Qahramonlar Dunyosi",
        description: "Matn mazmunini anglash, qahramonlar fe’l-atvori va xulosa chiqarish",
        targetEmoji: '📖',
        distractors: ['🍎', '⚽', '🚗', '🎈', '⭐'],
        cards: [
          {
            id: 'r1',
            title: "Ertakning 3 Asosiy Qismi",
            concept: "Boshlanishi, voqealar rivoji va xotima",
            mnemonic: "Ertak xuddi poezdga o’xshaydi: Lokomotiv (Boshlanish), Vagonlar (Sarguzashtlar) va Bekat (Xotima)!",
            funFact: "Ertaklar ko’pincha 'Bir bor ekan, bir yo’q ekan' deb boshlanadi.",
            icon: '🚂',
            badge: 'Matn tuzilishi'
          },
          {
            id: 'r2',
            title: "Maqol — Aql Qayrog’i",
            concept: "Qisqa va chuqur hikmatli so’zlar",
            mnemonic: "Maqol — qisqa, ammo yong’oq kabi mag’zi to’la so’z! Masalan: 'Mehnat, mehnatning tagi — rohat'!",
            funFact: "Xalq maqollari yuzlab yillar davomida avloddan-avlodga o’tgan.",
            icon: '🥜',
            badge: 'Hikmat'
          },
          {
            id: 'r3',
            title: "Tez aytish Sirlari",
            concept: "Nutqni ravon va chiroyli qilish",
            mnemonic: "Tez aytish — tiling uchun chaqqon gimnastika! 'Oq choynakka oq qopqoq, ko’k choynakka ko’k qopqoq'.",
            funFact: "Tez aytishni har kuni 3 marta aytsang, duduqlanmasdan ifodali gapirasan!",
            icon: '🗣️',
            badge: 'Nutq'
          },
          {
            id: 'r4',
            title: "Qofiya — So’zlarning Ohangdoshligi",
            concept: "She’r oxiridagi ohangdosh so’zlar",
            mnemonic: "Qofiyadosh so’zlar xuddi egizaklar kabi oxiri bir xil yangraydi: Bahor — GulzOR, Bolalar — Lolalar!",
            funFact: "Shoirlar she’r yozganda qofiya orqali musiqiy jarang hosil qilishadi.",
            icon: '🎵',
            badge: 'She’riyat'
          },
          {
            id: 'r5',
            title: "Masal Janri va O’giti",
            concept: "Hayvonlar timsolida insoniy fazilatlar",
            mnemonic: "Masalda tulki ayyorlikni, bo’ri ochko’zlikni, chumoli esa mehnatsevarlikni bildiradi!",
            funFact: "Dunyoga mashhur masalchi Ezop bo’lgan, o’zbeklarda esa Gulxaniy 'Zarbulmasal' yozgan.",
            icon: '🦊',
            badge: 'Masal'
          },
          {
            id: 'r6',
            title: "Matn Qahramoniga Baho Berish",
            concept: "Yaxshi va yomon xatti-harakatlar",
            mnemonic: "Qahramonning so’ziga emas, qilgan ishiga qara! Yordam bergan qahramon — chin do’st!",
            funFact: "Ertaklarda yaxshilik har doim yomonlik ustidan g’alaba qozonadi.",
            icon: '🦸',
            badge: 'Xulosa'
          },
          {
            id: 'r7',
            title: "Topishmoq — Tafakkur Mashqi",
            concept: "Narsaning xususiyatini yashirib aytish",
            mnemonic: "Topishmoq — so’zli jumboq! 'Qishda oppoq, yozda yo’q' (Qor)!",
            funFact: "Topishmoq topish bolalarning tasavvurini juda kuchaytiradi.",
            icon: '❓',
            badge: 'Topishmoq'
          },
          {
            id: 'r8',
            title: "Ifodali O’qish To’xtamlari (Pauza)",
            concept: "Nuqta va vergulda to’xtash",
            mnemonic: "Vergulda — yengil nafas ol (1 soniya), Nuqtada — chuqur nafas olib to’xta (2 soniya)!",
            funFact: "To’g'ri pauza qilsang, tinglovchilar ertakni kinodek tasavvur qilishadi.",
            icon: '🛑',
            badge: 'Ifoda'
          },
          {
            id: 'r9',
            title: "Sarlavha — Matn Ko’zgusi",
            concept: "Sarlavha orqali asosiy fikrni bilish",
            mnemonic: "Sarlavha — do’kon peshtoqidagi yozuvga o’xshaydi, ichida nima borligini darhol aytib turadi!",
            funFact: "Yaxshi sarlavha kitobxonni matnni o’qishga chorlaydi.",
            icon: '🏷️',
            badge: 'Matn'
          },
          {
            id: 'r10',
            title: "Lug’at Boyligi — So’z Qutichasi",
            concept: "Yangi so’zlarning ma’nosini o’rganish",
            mnemonic: "Har kuni bitta yangi so’z o’rganish — xazinangizga yana bir oltin tanga qo’shish demakdir!",
            funFact: "O’zbek tilida 80 000 dan ortiq chiroyli va boy so’zlar bor!",
            icon: '💎',
            badge: 'Lug’at'
          }
        ],
        quizzes: [
          {
            id: 'rq1',
            question: "Ertaklar odatda qanday mashhur ibora bilan boshlanadi?",
            options: ['Bir bor ekan, bir yo\'q ekan', 'Kechagi kunda', 'Ertaga ertalab', 'Maktabga borganimda'],
            correctIndex: 0,
            mnemonicTip: "Ertak lokomotivi doim 'Bir bor ekan, bir yo’q ekan' degan sehrli gap bilan yo’lga chiqadi!",
            mistakeType: 'Ertak boshlanishi'
          },
          {
            id: 'rq2',
            question: "'Mehnat, mehnatning tagi — ...' maqolining davomi qaysi?",
            options: ['uyqu', 'rohat', 'charchoq', 'qiyinchilik'],
            correctIndex: 1,
            mnemonicTip: "Mehnat qilgan odam orom oladi va rohatini ko’radi!",
            mistakeType: 'Maqollar bilimi'
          },
          {
            id: 'rq3',
            question: "Masallarda tulki obrazi odatda qanday xususiyatni bildiradi?",
            options: ['Sadoqat', 'Ayyorlik', 'Uyquchilik', 'Qo\'rqoqlik'],
            correctIndex: 1,
            mnemonicTip: "Ertak va masallarda tulkivoy doim o’zining ayyorligi bilan tanilgan!",
            mistakeType: 'Masal qahramonlari'
          },
          {
            id: 'rq4',
            question: "Qaysi so’zlar o’zaro qofiyadosh bo’la oladi?",
            options: ['Kitob — Qalam', 'Bahor — Gulzor', 'Daftar — Stul', 'Ona — Maktab'],
            correctIndex: 1,
            mnemonicTip: "BahOR va GulzOR so’zlarining oxiri bir xil jaranglaydi!",
            mistakeType: 'Qofiya tushunchasi'
          },
          {
            id: 'rq5',
            question: "Matn o’qiyotganda nuqta (.) belgisiga yetganda nima qilish kerak?",
            options: ['Hech to\'xtamasdan tez o\'qish', 'Biroz chuqur to\'xtam (pauza) qilish', 'Qayta boshidan o\'qish', 'Faqat oxirgi so\'zni aytish'],
            correctIndex: 1,
            mnemonicTip: "Nuqta — qizil chiroq kabi to’xtab, chuqur nafas olishni eslatadi!",
            mistakeType: 'Tinish belgilari va pauza'
          },
          {
            id: 'rq6',
            question: "'Qishda oppoq, yozda yo’q' topishmog’ining javobi nima?",
            options: ['Muzqaymoq', 'Qor', 'Paxta', 'Oq qog\'oz'],
            correctIndex: 1,
            mnemonicTip: "Faqat qishda osmondan oppoq yog’ib, yoz kelganda erib ketadigan bu — Qor!",
            mistakeType: 'Topishmoq yechish'
          },
          {
            id: 'rq7',
            question: "Oq choynakka oq qopqoq, ko’k choynakka ko’k qopqoq — bu nima?",
            options: ['Topishmoq', 'Tez aytish', 'Masal', 'Ertak'],
            correctIndex: 1,
            mnemonicTip: "Tilingni charxlaydigan tez va ravon mashq bu — Tez aytish!",
            mistakeType: 'Janrlar farqi'
          },
          {
            id: 'rq8',
            question: "Ertak oxirida qanday qoida har doim g’alaba qozonadi?",
            options: ['Kuchlilik', 'Yaxshilik yomonlik ustidan', 'Boylik', 'Tezkorlik'],
            correctIndex: 1,
            mnemonicTip: "Ertaklarning eng asosiy xotimasi — ezgulik va yaxshilik g’alabasi!",
            mistakeType: 'Ertak xulosasi'
          },
          {
            id: 'rq9',
            question: "Matn sarlavhasi bizga nimani aytib beradi?",
            options: ['Muallifning yoshini', 'Matn nima haqida ekanligini', 'Kitobning sahifalar sonini', 'Bugungi ob-havoni'],
            correctIndex: 1,
            mnemonicTip: "Sarlavha — do’kon peshtoqidagi yozuv kabi hikoya mazmunini bildiradi!",
            mistakeType: 'Sarlavha tushunchasi'
          },
          {
            id: 'rq10',
            question: "Ifodali o’qish paytida ovoz balandligini qachon o’zgartirish kerak?",
            options: ['Doim baqirib o\'qish kerak', 'Voqea hayajonli yoki xotirjamligiga qarab', 'Faqat pichirlab o\'qish kerak', 'Ovozni aslo o\'zgartirib bo\'lmaydi'],
            correctIndex: 1,
            mnemonicTip: "Aktyorlar kabi voqeaning xarakteriga mos ohangda o’qish eng to’g'ri yo’ldir!",
            mistakeType: 'Ifodali o’qish'
          }
        ]
      },
      {
        level: 'medium',
        lessonNumber: 2,
        isLocked: true,
        title: "2-Dars: Rivoyatlar va Hikmatli Qissalar",
        description: "Tarixiy shaxslar, xalq og’zaki ijodi durdonalari",
        targetEmoji: '✨',
        distractors: ['🧩', '🎨', '🚀'],
        cards: [],
        quizzes: []
      },
      {
        level: 'hard',
        lessonNumber: 3,
        isLocked: true,
        title: "3-Dars: Dostonlar va Ijodiy Fikrlar",
        description: "Mustaqil hikoya to’qish va adabiy tahlil",
        targetEmoji: '👑',
        distractors: ['🚗', '🎈', '⭐'],
        cards: [],
        quizzes: []
      }
    ]
  },
  {
    id: 'native',
    name: 'Native Language',
    uzbekName: 'Ona tili',
    icon: '✍️',
    color: 'from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    borderColor: 'border-emerald-300',
    description: 'Ot, sifat, fe\'l, chiroyli yozuv qoidalari va imlo',
    lessons: [
      {
        level: 'easy',
        lessonNumber: 1,
        isLocked: false,
        title: "1-Dars: So’z Turkumlari va Bosh Harflar",
        description: "Kim? Nima? Qanday? Nima qildi? so’roqlariga javob beruvchi so’zlar",
        targetEmoji: '📝',
        distractors: ['🍎', '⚽', '🚗', '🎈', '⭐'],
        cards: [
          {
            id: 'n1',
            title: "Ot — Narsalarning Nomi (Kim? Nima?)",
            concept: "Shaxs va narsalarni bildiruvchi so’zlar",
            mnemonic: "Atrofdagi barcha ko’rgan narsalaring — Ot! Odam bo’lsa 'Kim?', buyum bo’lsa 'Nima?' deb so’ra!",
            funFact: "Kitob, qalam, o’qituvchi, qushcha — barchasi Ot turkumiga kiradi.",
            icon: '🏷️',
            badge: 'Ot'
          },
          {
            id: 'n2',
            title: "Sifat — Narsaning Belgisi (Qanday? Qanaqa?)",
            concept: "Rang, ta’m, shakl va xususiyat",
            mnemonic: "Sifat narsani chiroyli qiladi! Qizil olma, shirin asal, katta maydon — 'Qanday?' so’rog’i bor!",
            funFact: "Agar sifatlar bo’lmaganda dunyo rangsiz va ta’msiz bo’lib tuyulardi!",
            icon: '🎨',
            badge: 'Sifat'
          },
          {
            id: 'n3',
            title: "Fe’l — Harakat va Ish (Nima qildi?)",
            concept: "Jonli harakatlarni bildiruvchi so’zlar",
            mnemonic: "Fe’l — chaqqon sportchiga o’xshaydi, tinmay harakat qiladi: yugurdi, o’qidi, sakradi, yozdi!",
            funFact: "Gapning asosiy mazmuni fe’l bilan yakunlanadi.",
            icon: '🏃',
            badge: 'Fe’l'
          },
          {
            id: 'n4',
            title: "Son — Miqdor va Tartib (Nechta? Nechanchi?)",
            concept: "Narsalarning sanog’i",
            mnemonic: "Bir, ikki, uch — barchasi son! 'Nechta olma?' — beshta olma!",
            funFact: "Tartib sonlarda doim '-inchi' qo’shimchasi bo’ladi: birinchi, ikkinchi.",
            icon: '🔢',
            badge: 'Son'
          },
          {
            id: 'n5',
            title: "Bosh Harflar Qirolligi",
            concept: "Kishi ismlari, shahar va daryo nomlari",
            mnemonic: "Ismlar va shaharlar maxsus toj kiyadi (Bosh harf bilan boshlanadi): Anvar, Toshkent, Sirdaryo!",
            funFact: "Gapning eng birinchi so’zi ham doim bosh harf bilan boshlanadi.",
            icon: '👑',
            badge: 'Imlo'
          },
          {
            id: 'n6',
            title: "Unli va Undosh Tovushlar",
            concept: "Havo oqimining to’siqqa uchrashi",
            mnemonic: "Unlilar (A, O, I, U, E, O') — qo’shiq aytadi, erkin jaranglaydi! Undoshlar esa lab va tish to’sig’idan o’tadi.",
            funFact: "O’zbek tilida 6 ta unli tovush bor.",
            icon: '🎶',
            badge: 'Tovush'
          },
          {
            id: 'n7',
            title: "Tutuq belgisi (') Mo’jizasi",
            concept: "Tovushni ajratib yoki cho’zib aytish",
            mnemonic: "Tutuq belgisi — kichik ko’prikcha! U so’z ma’nosini butunlay o’zgartiradi: 'sher' (hayvon) va 'she’r' (kuy)!",
            funFact: "A’lo, e’lon, ma’lumot so’zlarida tutuq belgisi bor.",
            icon: '✨',
            badge: 'Tutuq belgisi'
          },
          {
            id: 'n8',
            title: "Bo’g’in Ko’chirish Qoidasi",
            concept: "Satrga sig’magan so’zni ko’chirish",
            mnemonic: "Bir harfni satrda yolg’iz qoldirib bo’lmaydi! 'O-ila' xato, 'Oi-la' deb ko’chiriladi!",
            funFact: "So’zda nechta unli bo’lsa, shuncha bo’g'in bo’ladi.",
            icon: '✂️',
            badge: 'Bo’g’in'
          },
          {
            id: 'n9',
            title: "Ega va Kesim — Gapning Ustunlari",
            concept: "Gapning bosh bo’laklari",
            mnemonic: "Ega — ishni kim qilganini aytadi (Kim?), Kesim — nima bo’lganini aytadi (Nima qildi?)! Masalan: Olli uchdi.",
            funFact: "Ular xuddi uyning ikki poydevori kabi gapni mahkam ushlab turadi.",
            icon: '🏛️',
            badge: 'Sintaksis'
          },
          {
            id: 'n10',
            title: "Antonimlar — Zid Ma’noli Do’stlar",
            concept: "Qarama-qarshi so’zlar",
            mnemonic: "Oq va qora, issiq va sovuq, baland va past — bular bir-birining aksi bo’lgan antonimlar!",
            funFact: "Antonimlar orqali narsalarni taqqoslash juda qulay.",
            icon: '☯️',
            badge: 'Antonim'
          }
        ],
        quizzes: [
          {
            id: 'nq1',
            question: "Quyidagi so’zlardan qaysi biri 'Ot' turkumiga kiradi?",
            options: ['Kitob', 'Chiroyli', 'Yugurdi', 'Besh'],
            correctIndex: 0,
            mnemonicTip: "'Kitob' — buyum nomi bo’lib, 'Nima?' so’rog’iga javob beradi!",
            mistakeType: 'Ot turkumi'
          },
          {
            id: 'nq2',
            question: "'Qanday?' so’rog’iga javob beruvchi so’z qaysi?",
            options: ['O’quvchi', 'Mazali', 'Sakradi', 'O’nta'],
            correctIndex: 1,
            mnemonicTip: "'Mazali' olma — narsaning belgisini (sifatini) bildiradi!",
            mistakeType: 'Sifat turkumi'
          },
          {
            id: 'nq3',
            question: "Harakatni bildiruvchi 'Fe’l' so’zini toping:",
            options: ['Qalam', 'Yashil', 'O’qidi', 'Olti'],
            correctIndex: 2,
            mnemonicTip: "'O’qidi' — 'Nima qildi?' so’rog’iga javob berib, ish-harakatni bildiradi!",
            mistakeType: 'Fe’l turkumi'
          },
          {
            id: 'nq4',
            question: "Qaysi so’z doim bosh harf bilan yozilishi shart?",
            options: ['daraxt', 'samarqand', 'stol', 'daftar'],
            correctIndex: 1,
            mnemonicTip: "Shahar, daryo va inson ismlari (Samarqand) har doim bosh harf bilan boshlanadi!",
            mistakeType: 'Bosh harflar qoidasi'
          },
          {
            id: 'nq5',
            question: "O’zbek tilida nechta unli tovush bor?",
            options: ['4 ta', '6 ta', '10 ta', '24 ta'],
            correctIndex: 1,
            mnemonicTip: "Unlilar 6 ta: A, O, I, U, E, O'! Ular qo’shiq aytgandek jaranglaydi!",
            mistakeType: 'Unli tovushlar'
          },
          {
            id: 'nq6',
            question: "'Sher' (yirtqich hayvon) va 'she’r' (kuy) so’zlarini qaysi belgi ajratib turadi?",
            options: ['Vergul', 'Tutuq belgisi (\')', 'Nuqta', 'Chiziqcha'],
            correctIndex: 1,
            mnemonicTip: "Tutuq belgisi (') kichik ko’prikdek so’z ma’nosini tubdan o’zgartiradi!",
            mistakeType: 'Tutuq belgisi'
          },
          {
            id: 'nq7',
            question: "So’zni satrdan satrga ko’chirishda qaysi biri to’g'ri?",
            options: ['k-itob', 'ki-tob', 'kit-ob', 'kitob-'],
            correctIndex: 1,
            mnemonicTip: "Bo’g’inlab ko’chiramiz: Ki-tob! Bir harfni yolg’iz qoldirmaymiz.",
            mistakeType: 'Bo’g’in ko’chirish'
          },
          {
            id: 'nq8',
            question: "'Katta' so’zining antonimi (teskarisi) nima?",
            options: ['Uzun', 'Kichik', 'Og\'ir', 'Keng'],
            correctIndex: 1,
            mnemonicTip: "Katta fil — kichik chumoli! Zid ma’no — Kichik.",
            mistakeType: 'Antonimlar'
          },
          {
            id: 'nq9',
            question: "'Olli daraxtda quvnoq kuyladi' gapida 'Ega' (kim?) qaysi so’z?",
            options: ['Olli', 'Daraxtda', 'Quvnoq', 'Kuyladi'],
            correctIndex: 0,
            mnemonicTip: "Harakatni kim bajardi? 'Olli' — bu gapning egasi!",
            mistakeType: 'Gap bo’laklari (Ega)'
          },
          {
            id: 'nq10',
            question: "So’zdagi bo’g'inlar soni nimaga qarab aniqlanadi?",
            options: ['Undosh harflar soniga', 'Unli harflar soniga', 'So\'z uzunligiga', 'Nuqtalar soniga'],
            correctIndex: 1,
            mnemonicTip: "So’zda nechta unli (a, o, i, u, e, o') bo’lsa, shuncha bo’g'in bo’ladi!",
            mistakeType: 'Bo’g’in hisobi'
          }
        ]
      },
      {
        level: 'medium',
        lessonNumber: 2,
        isLocked: true,
        title: "2-Dars: So’z Yasovchi Qo’shimchalar va Imlo",
        description: "Asos va qo’shimcha, so’z turkumlarining o’zgarishi",
        targetEmoji: '🛡️',
        distractors: ['🚗', '🎈', '⭐'],
        cards: [],
        quizzes: []
      },
      {
        level: 'hard',
        lessonNumber: 3,
        isLocked: true,
        title: "3-Dars: Murakkab Gaplar va Tinish Belgilari",
        description: "Undalma, kirish so’zlar va qo’shma gaplar",
        targetEmoji: '👑',
        distractors: ['🧩', '🎨', '🚀'],
        cards: [],
        quizzes: []
      }
    ]
  },
  {
    id: 'english',
    name: 'English Language',
    uzbekName: 'Ingliz tili',
    icon: '🇬🇧',
    color: 'from-sky-500 to-blue-600',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
    borderColor: 'border-sky-300',
    description: 'Easy English words, fun pronunciation, daily greetings & animals',
    lessons: [
      {
        level: 'easy',
        lessonNumber: 1,
        isLocked: false,
        title: "Lesson 1: Magic Greetings & Super Colors",
        description: "Salomlashuv, ranglar va oddiy kundalik so’zlar",
        targetEmoji: '🎈',
        distractors: ['🍎', '⚽', '🚗', '⭐', '🍄'],
        cards: [
          {
            id: 'e1',
            title: "Hello & Goodbye",
            concept: "Salom va Xayr",
            mnemonic: "'Hello' — qo’lingni hilpiratib salom ber! 'Goodbye' — xayrlashganda ayiqcha kabi quloch och!",
            funFact: "Do’stlarga qisqacha 'Hi!' va 'Bye!' deyish mumkin.",
            icon: '👋',
            badge: 'Greetings'
          },
          {
            id: 'e2',
            title: "Red, Blue, Yellow",
            concept: "Asosiy ranglar",
            mnemonic: "RED — qizil pomidordek, BLUE — musaffo osmondek, YELLOW — porlagan quyoshdek!",
            funFact: "Sariq (Yellow) va ko’k (Blue) rangni aralashtirsangiz yashil (Green) chiqadi!",
            icon: '🎨',
            badge: 'Colors'
          },
          {
            id: 'e3',
            title: "Numbers 1 to 5 (One, Two, Three...)",
            concept: "Birinchi 5 ta son",
            mnemonic: "One (1) — bitta quyosh, Two (2) — ikkita ko’z, Three (3) — uchburchak, Four (4) — to’rtburchak, Five (5) — besh barmoq!",
            funFact: "Inglizcha 'High five!' — o’zbekcha 'Besh tashla!' degani!",
            icon: '🖐️',
            badge: 'Numbers'
          },
          {
            id: 'e4',
            title: "Cat 🐱 & Dog 🐶",
            concept: "Uy hayvonlari",
            mnemonic: "CAT — keta-ket deb quvlagan mushukcha, DOG — do’stdek sodiq kuchukcha!",
            funFact: "Ingliz tilida mushukcha 'Meow', kuchukcha 'Woof-woof' deb ovoz chiqaradi.",
            icon: '🐾',
            badge: 'Animals'
          },
          {
            id: 'e5',
            title: "Apple 🍎 & Banana 🍌",
            concept: "Shirin mevalar",
            mnemonic: "A is for Apple — qip-qizil olma, B is for Banana — shirin bananni qo’ldan qo’yma!",
            funFact: "Har kuni bitta olma yeyish sog’liq uchun juda foydali!",
            icon: '🍏',
            badge: 'Food'
          },
          {
            id: 'e6',
            title: "Please & Thank You",
            concept: "Sehrli so’zlar",
            mnemonic: "PLEASE — iltimos degani, THANK YOU — rahmat aytish! Bu so’zlar barcha eshiklarni ochadi!",
            funFact: "Buyuk Britaniyada bu so’zlarni kuniga 20 martadan ko’p ishlatishadi.",
            icon: '🙏',
            badge: 'Polite words'
          },
          {
            id: 'e7',
            title: "Sun ☀️ & Moon 🌙",
            concept: "Quyosh va Oy",
            mnemonic: "SUN — kunduzi charaqlaydi (Sunny day!), MOON — tunda nur sochadi!",
            funFact: "Quyosh — eng yaqin yulduzimiz.",
            icon: '✨',
            badge: 'Nature'
          },
          {
            id: 'e8',
            title: "Book 📖 & Pencil ✏️",
            concept: "O’quv qurollari",
            mnemonic: "BOOK — bukiladigan bilimli kitob, PENCIL — qog’ozda iz qoldiradigan qalam!",
            funFact: "Pencil so’zi qadimiy lotincha 'kichik dumcha' degan so’zdan kelib chiqqan.",
            icon: '🎒',
            badge: 'School'
          },
          {
            id: 'e9',
            title: "Happy 😊 & Sad 😢",
            concept: "Tuyg’ular",
            mnemonic: "HAPPY — bayramda xursand bo’lish, SAD — muzqaymoq tushib ketgandagi xafalik!",
            funFact: "Tabassum qilganingda yuzingdagi 17 ta mushak harakatga keladi!",
            icon: '😄',
            badge: 'Feelings'
          },
          {
            id: 'e10',
            title: "Friend 🤝 (Do’st)",
            concept: "Do’stlik",
            mnemonic: "FRIEND — birga o’ynaydigan, o’yinchog’ini bo’lishadigan qadrdon do’st!",
            funFact: "Olli boyo’g'li — barcha FocusKids o’quvchilarining eng yaqin 'Friend’i!",
            icon: '🦉',
            badge: 'Friendship'
          }
        ],
        quizzes: [
          {
            id: 'eq1',
            question: "Ingliz tilida 'Salom' qanday aytiladi?",
            options: ['Goodbye', 'Hello', 'Thank you', 'Please'],
            correctIndex: 1,
            mnemonicTip: "Qo’lingni ko’tarib quvnoq 'Hello!' deb ayt!",
            mistakeType: 'Greetings vocabulary'
          },
          {
            id: 'eq2',
            question: "'Red' qaysi rangni bildiradi?",
            options: ['Ko\'k', 'Yashil', 'Qizil', 'Sariq'],
            correctIndex: 2,
            mnemonicTip: "Red — xuddi qizil qulupnay yoki pomidor kabi!",
            mistakeType: 'Colors'
          },
          {
            id: 'eq3',
            question: "'Kuchukcha' ingliz tilida nima deyiladi?",
            options: ['Cat', 'Dog', 'Bird', 'Fish'],
            correctIndex: 1,
            mnemonicTip: "Do’st kuchukcha inglizchada — Dog!",
            mistakeType: 'Animals'
          },
          {
            id: 'eq4',
            question: "'Thank you' iborasi nimani anglatadi?",
            options: ['Xayr', 'Iltimos', 'Rahmat', 'Kechirasiz'],
            correctIndex: 2,
            mnemonicTip: "Yaxshilik qilganga minnatdorchilik bilan 'Thank you' deyiladi!",
            mistakeType: 'Polite words'
          },
          {
            id: 'eq5',
            question: "Ingliz tilida '3' soni qanday yoziladi?",
            options: ['One', 'Two', 'Three', 'Four'],
            correctIndex: 2,
            mnemonicTip: "One (1), Two (2), Three (3) — uchburchak kabi!",
            mistakeType: 'Numbers'
          },
          {
            id: 'eq6',
            question: "'Kitob' so’zining inglizcha tarjimasi qaysi?",
            options: ['Pen', 'Book', 'Bag', 'Ruler'],
            correctIndex: 1,
            mnemonicTip: "Bukiladigan sahifalari bor bilim xazinasi — Book!",
            mistakeType: 'School items'
          },
          {
            id: 'eq7',
            question: "'Happy' so’zi qanday kayfiyatni bildiradi?",
            options: ['Xafa', 'Qo\'rqqan', 'Xursand / Baxtli', 'Charchagan'],
            correctIndex: 2,
            mnemonicTip: "Happy — quvonchli tabassum!",
            mistakeType: 'Feelings'
          },
          {
            id: 'eq8',
            question: "Quyosh (Sun) qaysi rangda bo’ladi?",
            options: ['Blue', 'Yellow', 'Black', 'Purple'],
            correctIndex: 1,
            mnemonicTip: "Oltinrang iliq quyosh — Yellow (sariq)!",
            mistakeType: 'Colors and nature'
          },
          {
            id: 'eq9',
            question: "'Apple' qanday meva?",
            options: ['Uzum', 'Nok', 'Olma', 'Shaftoli'],
            correctIndex: 2,
            mnemonicTip: "A is for Apple — shirin qizil olma!",
            mistakeType: 'Fruits'
          },
          {
            id: 'eq10',
            question: "'Goodbye' so’zini qachon aytamiz?",
            options: ['Ko\'rishganda', 'Xayrlashganda', 'Ovqatlangan paytda', 'Uxlashdan oldin'],
            correctIndex: 1,
            mnemonicTip: "Xayrlashayotganda do’stlarga 'Goodbye!' deb qo’l silkiymiz!",
            mistakeType: 'Greetings'
          }
        ]
      },
      {
        level: 'medium',
        lessonNumber: 2,
        isLocked: true,
        title: "Lesson 2: My Family & Daily Routine",
        description: "Oila a’zolari va kundalik faoliyat so’zlari",
        targetEmoji: '🏡',
        distractors: ['🚗', '🎈', '⭐'],
        cards: [],
        quizzes: []
      },
      {
        level: 'hard',
        lessonNumber: 3,
        isLocked: true,
        title: "Lesson 3: Simple Sentences & Action Verbs",
        description: "I like, I can, sodda gaplar tuzish",
        targetEmoji: '👑',
        distractors: ['🧩', '🎨', '🚀'],
        cards: [],
        quizzes: []
      }
    ]
  },
  {
    id: 'russian',
    name: 'Russian Language',
    uzbekName: 'Rus tili',
    icon: '🇷🇺',
    color: 'from-rose-500 to-red-600',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
    borderColor: 'border-rose-300',
    description: 'Приветствия, цвета, счёт, семья и волшебные слова',
    lessons: [
      {
        level: 'easy',
        lessonNumber: 1,
        isLocked: false,
        title: "1-Урок: Приветствия и Волшебные слова",
        description: "Salomlashuv, do’stlashish va birinchi chiroyli so’zlar",
        targetEmoji: '⭐',
        distractors: ['🍎', '⚽', '🚗', '🎈', '🍄'],
        cards: [
          {
            id: 'ru1',
            title: "Привет & Здравствуйте",
            concept: "Salomlashuv",
            mnemonic: "Tengdosh do’stlarga 'Привет!' (Privet!), kattalarga esa hurmat bilan 'Здравствуйте!' (Zdravstvuyte!) deyiladi.",
            funFact: "'Здравствуйте' so’zi 'Sog'-salomat bo’ling' degan ma’noni beradi.",
            icon: '🤝',
            badge: 'Приветствие'
          },
          {
            id: 'ru2',
            title: "Спасибо & Пожалуйста",
            concept: "Sehrli xushmuomala so’zlar",
            mnemonic: "'Спасибо' (Spasibo) — rahmat aytish, 'Пожалуйста' (Pojaluysta) — iltimos yoki marhamat degani!",
            funFact: "Bu so’zlarni ishlatgan bolani hamma juda yaxshi ko’radi.",
            icon: '🌸',
            badge: 'Вежливые слова'
          },
          {
            id: 'ru3',
            title: "Красный, Синий, Жёлтый",
            concept: "Ranglar (Цвета)",
            mnemonic: "Красный (Krasniy) — qizil alvon, Синий (Siniy) — moviy dengiz, Жёлтый (Joltiy) — issiq quyosh!",
            funFact: "Qadimda 'Красный' so’zi nafaqat qizil, balki 'go’zal' degan ma’noni ham bildirgan (Krasivaya).",
            icon: '🎨',
            badge: 'Цвета'
          },
          {
            id: 'ru4',
            title: "Счёт от 1 до 5 (Один, Два, Три...)",
            concept: "Sonlarni sanash",
            mnemonic: "Один (1), Два (2), Три (3), Четыре (4), Пять (5) — beshta barmoqni birgalikda sanaymiz!",
            funFact: "Maktabda eng a’lo baho bu — 'Пятёрка' (5 baho)!",
            icon: '🖐️',
            badge: 'Счёт'
          },
          {
            id: 'ru5',
            title: "Семья: Мама & Папа",
            concept: "Oila a’zolari",
            mnemonic: "Мама (Ona) — dunyodagi eng mehribon inson, Папа (Ota) — bizning mustahkam tayanchimiz!",
            funFact: "Dunyodagi deyarli barcha tillarda 'Mama' so’zi bir xil jaranglaydi.",
            icon: '👨‍👩‍👧',
            badge: 'Семья'
          },
          {
            id: 'ru6',
            title: "Кот 🐱 & Собака 🐶",
            concept: "Uy hayvonlari",
            mnemonic: "Кот (Kot) — yumshoq mo’ylovli mushuk, Собака (Sobaka) — vafodor chaqqon kuchuk!",
            funFact: "Kichkina mushukchani 'Котёнок', kuchukchani 'Щенок' deb erkalashadi.",
            icon: '🐾',
            badge: 'Животные'
          },
          {
            id: 'ru7',
            title: "Книга 📖 & Ручка 🖊️",
            concept: "Maktab buyumlari",
            mnemonic: "Книга (Kniga) — bilim manbai bo’lgan kitob, Ручка (Ruchka) — chiroyli yozadigan ruchka!",
            funFact: "'Ручка' so’zi qo’l (рука) so’zidan kelib chiqqan, chunki u qo’lda ushlanadi.",
            icon: '🎒',
            badge: 'Школа'
          },
          {
            id: 'ru8',
            title: "Яблоко 🍎 & Хлеб 🍞",
            concept: "Mazali taomlar",
            mnemonic: "Яблоко (Yabloko) — shirin olma, Хлеб (Xleb) — dasturxon ko’rki bo’lgan non!",
            funFact: "'Хлеб — всему голова' (Non — barchasining boshidir) degan mashhur maqol bor.",
            icon: '🍏',
            badge: 'Еда'
          },
          {
            id: 'ru9',
            title: "До свидания! (Xayr)",
            concept: "Xayrlashuv",
            mnemonic: "'До свидания' (Do svidaniya) — 'Yana ko’rishguncha' degan umid bilan xayrlashish!",
            funFact: "Do’stlarga qisqacha 'Пока!' (Poka!) deb qo’l silkish ham mumkin.",
            icon: '👋',
            badge: 'Прощание'
          },
          {
            id: 'ru10',
            title: "Друг 🤝 (Do’st)",
            concept: "Do’stlik",
            mnemonic: "Друг (Drug) — qiyin damda yordamga keladigan, sirlaringni biladigan vafodor do’st!",
            funFact: "'Старый друг лучше новых двух' — qadrdon do’st ikkita yangi do’stdan afzal!",
            icon: '🌟',
            badge: 'Дружба'
          }
        ],
        quizzes: [
          {
            id: 'ruq1',
            question: "Tengdosh do’stlar bilan rus tilida qanday salomlashiladi?",
            options: ['Пока', 'Привет', 'Спасибо', 'Спокойной ночи'],
            correctIndex: 1,
            mnemonicTip: "Do’stlarga quvnoq ohangda 'Привет!' deb aytiladi!",
            mistakeType: 'Приветствия'
          },
          {
            id: 'ruq2',
            question: "'Спасибо' so’zining o’zbekcha ma’nosi nima?",
            options: ['Iltimos', 'Kechirasiz', 'Rahmat', 'Salom'],
            correctIndex: 2,
            mnemonicTip: "Yordam bergan odamga minnatdorchilik bilan 'Спасибо' deymiz!",
            mistakeType: 'Вежливые слова'
          },
          {
            id: 'ruq3',
            question: "'Красный' so’zi qaysi rangni bildiradi?",
            options: ['Yashil', 'Qizil', 'Sariq', 'Oq'],
            correctIndex: 1,
            mnemonicTip: "Красный — alvon qizil pomidor va olma rangi!",
            mistakeType: 'Цвета'
          },
          {
            id: 'ruq4',
            question: "Rus tilida '3' soni qanday aytiladi?",
            options: ['Один', 'Два', 'Три', 'Пять'],
            correctIndex: 2,
            mnemonicTip: "Один (1), Два (2), Три (3)!",
            mistakeType: 'Счёт'
          },
          {
            id: 'ruq5',
            question: "'Собака' o’zbekchada nima degani?",
            options: ['Mushuk', 'Qush', 'Kuchuk', 'Baliq'],
            correctIndex: 2,
            mnemonicTip: "Do’st vafodor hayvon — Kuchuk (Собака)!",
            mistakeType: 'Животные'
          },
          {
            id: 'ruq6',
            question: "'Книга' so’zi nimani anglatadi?",
            options: ['Daftar', 'Kitob', 'Qalam', 'Parta'],
            correctIndex: 1,
            mnemonicTip: "Sahifalarida bilim yashiringan buyum — Kitob (Книга)!",
            mistakeType: 'Школьные вещи'
          },
          {
            id: 'ruq7',
            question: "'Мама' so’zining tarjimasi qaysi?",
            options: ['Ona', 'Opa', 'Buvijon', 'Xola'],
            correctIndex: 0,
            mnemonicTip: "Eng mehribon insonimiz — Ona (Мама)!",
            mistakeType: 'Семья'
          },
          {
            id: 'ruq8',
            question: "'До свидания' iborasini qachon ishlatamiz?",
            options: ['Uchrashganda', 'Ovqatlangan paytda', 'Xayrlashganda', 'Tongda'],
            correctIndex: 2,
            mnemonicTip: "Ko’rishguncha xayrlashayotganda 'До свидания' deyiladi!",
            mistakeType: 'Прощание'
          },
          {
            id: 'ruq9',
            question: "'Жёлтый' qaysi rang?",
            options: ['Qora', 'Moviy', 'Sariq', 'Yashil'],
            correctIndex: 2,
            mnemonicTip: "Iliq quyosh va shirin limon rangi — Жёлтый (sariq)!",
            mistakeType: 'Цвета'
          },
          {
            id: 'ruq10',
            question: "'Друг' so’zi nimani bildiradi?",
            options: ['Begona', 'Do\'st', 'Qo\'shni', 'Raqib'],
            correctIndex: 1,
            mnemonicTip: "Birga o’ynaydigan, sirdosh inson — Do’st (Друг)!",
            mistakeType: 'Дружба'
          }
        ]
      },
      {
        level: 'medium',
        lessonNumber: 2,
        isLocked: true,
        title: "2-Урок: Времена года и Дни недели",
        description: "Yil fasllari, ob-havo va hafta kunlari",
        targetEmoji: '☀️',
        distractors: ['🚗', '🎈', '⭐'],
        cards: [],
        quizzes: []
      },
      {
        level: 'hard',
        lessonNumber: 3,
        isLocked: true,
        title: "3-Урок: Диалоги и Рассказы",
        description: "Oddiy suhbat qurish va hikoyacha aytish",
        targetEmoji: '👑',
        distractors: ['🧩', '🎨', '🚀'],
        cards: [],
        quizzes: []
      }
    ]
  }
];

export const SHOP_ITEMS: {
  id: string;
  name: string;
  emoji: string;
  type: 'hat' | 'glasses' | 'badge' | 'theme';
  price: number;
  isPremiumOnly: boolean;
  description: string;
}[] = [
  {
    id: 'hat-grad',
    name: 'Olim qalpoqchasi',
    emoji: '🎓',
    type: 'hat',
    price: 30,
    isPremiumOnly: false,
    description: 'Bilimdon boyo\'g\'li Ollining eng sevimli bosh kiyimi.'
  },
  {
    id: 'glasses-smart',
    name: 'Sehrli ko\'zoynak',
    emoji: '👓',
    type: 'glasses',
    price: 50,
    isPremiumOnly: false,
    description: 'Barcha nozik qoidalarni 2 barobar aniq ko\'rsatadi!'
  },
  {
    id: 'hat-crown',
    name: 'Qirollik toji',
    emoji: '👑',
    type: 'hat',
    price: 100,
    isPremiumOnly: true,
    description: 'Faqat FocusKids Premium a\'zolari uchun tillarang toj!'
  },
  {
    id: 'badge-star',
    name: 'Oltin yulduz ordeni',
    emoji: '🌟',
    type: 'badge',
    price: 40,
    isPremiumOnly: false,
    description: 'Diqqat mashqlarining mutlaq g\'oliblari nishoni.'
  },
  {
    id: 'hat-wizard',
    name: 'Sehrgar shlyapasi',
    emoji: '🧙‍♂️',
    type: 'hat',
    price: 80,
    isPremiumOnly: false,
    description: 'Murakkab testlarni oson yechishga ilhom beradi.'
  },
  {
    id: 'glasses-sun',
    name: 'Kulgili quyosh ko\'zoynagi',
    emoji: '🕶️',
    type: 'glasses',
    price: 60,
    isPremiumOnly: true,
    description: 'Olli bilan eng yorqin darslarda kiyish uchun!'
  },
  {
    id: 'badge-diamond',
    name: 'Olmos qalqon',
    emoji: '💎',
    type: 'badge',
    price: 150,
    isPremiumOnly: true,
    description: 'Premium bilimdonlar faxriy nishoni.'
  },
  {
    id: 'theme-rainbow',
    name: 'Kamalak qanotlari',
    emoji: '🪽',
    type: 'theme',
    price: 70,
    isPremiumOnly: false,
    description: 'Ollining qanotlariga kamalak jilosini baxsh etadi.'
  }
];

export const INITIAL_LEADERBOARD = [
  { player_id: 'p1', player_name: 'Jasurbek (4-sinf)', stars: 245, avatar_icon: '🦁', title: 'Ustoz 👑', updated_at: 'Bugun' },
  { player_id: 'p2', player_name: 'Madinabonu (3-sinf)', stars: 198, avatar_icon: '🌸', title: 'Ustoz 👑', updated_at: 'Bugun' },
  { player_id: 'p3', player_name: 'Azizbek (2-sinf)', stars: 165, avatar_icon: '🚀', title: 'Ustoz 👑', updated_at: 'Kecha' },
  { player_id: 'p4', player_name: 'Laylo (3-sinf)', stars: 142, avatar_icon: '🦋', title: 'Bilimdon 🧠', updated_at: 'Bugun' },
  { player_id: 'p5', player_name: 'Shohruh (4-sinf)', stars: 120, avatar_icon: '⚡', title: 'Bilimdon 🧠', updated_at: 'Bugun' },
  { player_id: 'p6', player_name: 'Dilnoza (2-sinf)', stars: 85, avatar_icon: '🌺', title: 'Bilimdon 🧠', updated_at: 'Kecha' },
  { player_id: 'p7', player_name: 'Bekzod (3-sinf)', stars: 62, avatar_icon: '⚽', title: 'Bilimdon 🧠', updated_at: 'Bugun' },
];
