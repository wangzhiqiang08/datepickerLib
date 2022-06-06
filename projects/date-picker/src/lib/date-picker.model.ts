export class initDateType {
  en_US!: init;
  zh_CN!: init;
  RUS!: init;
  fr!: init;
  SP!: init;
  Ger!: init;
  JPN!: init;
  KO!: init;
}

export class init {
  weekDayFormat!: string[];
  monthStrList!: week[];
  selectedFormat!: string;
}

export class week {
  short!: string;
  long!: string;
}

export const initDate: initDateType = {
  en_US: {
    weekDayFormat:['S','M','T','W','T','F','S'],
    monthStrList:[
      {short: 'Jan', long: 'January'},
      {short: 'Feb', long: 'February'},
      {short: 'Mar', long: 'March'},
      {short: 'Apr', long: 'April'},
      {short: 'May', long: 'May'},
      {short: 'Jun', long: 'June'},
      {short: 'Jul', long: 'July'},
      {short: 'Aug', long: 'August'},
      {short: 'Sep', long: 'September'},
      {short: 'Oct', long: 'October'},
      {short: 'Nov', long: 'November'},
      {short: 'Dec', long: 'December'}
    ],
    selectedFormat: "mm/dd/yyyy"
  },
  zh_CN: {
    weekDayFormat:['日','一','二','三','四','五','六'],
    monthStrList:[
      {short: '一月', long: '一月'},
      {short: '二月', long: '二月'},
      {short: '三月', long: '三月'},
      {short: '四月', long: '四月'},
      {short: '五月', long: '五月'},
      {short: '六月', long: '六月'},
      {short: '七月', long: '七月'},
      {short: '八月', long: '八月'},
      {short: '九月', long: '九月'},
      {short: '十月', long: '十月'},
      {short: '十一月', long: '十一月'},
      {short: '十二月', long: '十二月'}
    ],
    selectedFormat: "yyyy/mm/dd"
  },
  RUS: {
    weekDayFormat:['BC','ПН','BT','CP','ЧТ','ПТ','СБ'],
    monthStrList:[
      {short:'январь',long: 'январь'},
      {short:'февраль',long: 'февраль'},
      {short:'март',long: 'март'},
      {short:'апрель',long: 'апрель'},
      {short:'май',long: 'май'},
      {short:'июнь',long: 'июнь'},
      {short:'июль',long: 'июль'},
      {short:'август',long: 'август'},
      {short:'сентябрь',long: 'сентябрь'},
      {short:'октябрь',long: 'октябрь'},
      {short:'ноябрь',long: 'ноябрь'},
      {short:'декабрь',long: 'декабрь'}
    ],
    selectedFormat: "dd/mm/yyyy"
  },
  fr: {
    weekDayFormat:['D','L','M','M','J','V','S'],
    monthStrList:[
      {short:'jan.',long: 'janvier'},
      {short:'fev.',long: 'février'},
      {short:'mars.',long: 'mars'},
      {short:'avr.',long: 'avril'},
      {short:'mai.',long: 'mai'},
      {short:'juin.',long: 'juin'},
      {short:'juillet.',long: 'juillet'},
      {short:'aout.',long: 'août'},
      {short:'sept.',long: 'septembre'},
      {short:'oct.',long: 'octobre'},
      {short:'nov.',long: 'novembre'},
      {short:'dec.',long: 'décembre'}
    ],
    selectedFormat: "dd/mm/yyyy"
  },
  SP: {
    weekDayFormat:['D','L','M','M','J','V','S'],
    monthStrList:[
      {short:'en.',long: 'enero'},
      {short:'febr.',long: 'febrero'},
      {short:'mzo.',long: 'marzo'},
      {short:'abr.',long: 'abril'},
      {short:'my.',long: 'mayo'},
      {short:'jun.',long: 'junio'},
      {short:'jul.',long: 'julio'},
      {short:'agto.',long: 'agosto'},
      {short:'sept.',long: 'septiembre'},
      {short:'oct.',long: 'octubre'},
      {short:'nov.',long: 'noviembre'},
      {short:'dic.',long: 'diciembre'}
    ],
    selectedFormat: "dd/mm/yyyy"
  },
  Ger: {
    weekDayFormat:['S','M','D','M','D','F','S'],
    monthStrList:[
      {short:'Jan',long: 'Januar'},
      {short:'Feb',long: 'Februar'},
      {short:'Mär',long: 'Marz'},
      {short:'Apr',long: 'April'},
      {short:'Mai',long: 'Mai'},
      {short:'Jun',long: 'Juni'},
      {short:'Jnl',long: 'Juli'},
      {short:'Aug',long: 'August'},
      {short:'Sep',long: 'September'},
      {short:'Okt',long: 'Oktober'},
      {short:'Nov',long: 'November'},
      {short:'Dez',long: 'Dezember'}
    ],
    selectedFormat: "dd/mm/yyyy"
  },
  JPN: {
    weekDayFormat:['日','月','火','水','木','金','土'],
    monthStrList:[
      {short:'いちがつ',long: 'いちがつ'},
      {short:'にがつ',long: 'にがつ'},
      {short:'さんがつ',long: 'さんがつ'},
      {short:'しがつ',long: 'しがつ'},
      {short:'ごがつ',long: 'ごがつ'},
      {short:'ろくがつ',long: 'ろくがつ'},
      {short:'しちがつ',long: 'しちがつ'},
      {short:'はちがつ',long: 'はちがつ'},
      {short:'くがつ',long: 'くがつ'},
      {short:'じゅうがつ',long: 'じゅうがつ'},
      {short:'じゅういちがつ',long: 'じゅういちがつ'},
      {short:'じゅうにがつ',long: 'じゅうにがつ'}
    ],
    selectedFormat: "yyyy/mm/dd"
  },
  KO: {
    weekDayFormat:['일','월','화','수','목','금','토'],
    monthStrList:[
      {short:'일월',long: '일월'},
      {short:'이월',long: '이월'},
      {short:'삼월',long: '삼월'},
      {short:'사월',long: '사월'},
      {short:'오월',long: '오월'},
      {short:'육월',long: '육월'},
      {short:'칠월',long: '칠월'},
      {short:'팔월',long: '팔월'},
      {short:'구월',long: '구월'},
      {short:'십월',long: '십월'},
      {short:'십일월',long: '십일월'},
      {short:'십이월',long: '십이월'}
    ],
    selectedFormat: "yyyy/mm/dd"
  }
    
}