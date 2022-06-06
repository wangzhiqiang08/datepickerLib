export declare class initDateType {
    en_US: init;
    zh_CN: init;
    RUS: init;
    fr: init;
    SP: init;
    Ger: init;
    JPN: init;
    KO: init;
}
export declare class init {
    weekDayFormat: string[];
    monthStrList: week[];
    selectedFormat: string;
}
export declare class week {
    short: string;
    long: string;
}
export declare const initDate: initDateType;
