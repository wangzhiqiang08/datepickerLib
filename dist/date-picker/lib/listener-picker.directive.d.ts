import { ElementRef, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ClickOutsideDirective {
    private _elementRef;
    constructor(_elementRef: ElementRef);
    clickOutside: EventEmitter<any>;
    onClick(targetElement: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ClickOutsideDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ClickOutsideDirective, "[clickOutside]", never, {}, { "clickOutside": "clickOutside"; }, never>;
}
