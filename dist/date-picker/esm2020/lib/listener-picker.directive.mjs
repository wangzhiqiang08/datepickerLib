import { Directive, Output, EventEmitter, HostListener } from '@angular/core';
import * as i0 from "@angular/core";
export class ClickOutsideDirective {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.clickOutside = new EventEmitter();
    }
    onClick(targetElement) {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(null);
        }
    }
}
ClickOutsideDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.9", ngImport: i0, type: ClickOutsideDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
ClickOutsideDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.9", type: ClickOutsideDirective, selector: "[clickOutside]", outputs: { clickOutside: "clickOutside" }, host: { listeners: { "document:click": "onClick($event.target)" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.9", ngImport: i0, type: ClickOutsideDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[clickOutside]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { clickOutside: [{
                type: Output
            }], onClick: [{
                type: HostListener,
                args: ['document:click', ['$event.target']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdGVuZXItcGlja2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2RhdGUtcGlja2VyL3NyYy9saWIvbGlzdGVuZXItcGlja2VyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFjLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUt4RixNQUFNLE9BQU8scUJBQXFCO0lBQy9CLFlBQW9CLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBSXJDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUh6QyxDQUFDO0lBTU0sT0FBTyxDQUFDLGFBQWtCO1FBQzdCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQzs7a0hBYlMscUJBQXFCO3NHQUFyQixxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFIakMsU0FBUzttQkFBQztvQkFDUixRQUFRLEVBQUUsZ0JBQWdCO2lCQUM1QjtpR0FNUyxZQUFZO3NCQURsQixNQUFNO2dCQUlBLE9BQU87c0JBRGIsWUFBWTt1QkFBQyxnQkFBZ0IsRUFBRSxDQUFDLGVBQWUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICBzZWxlY3RvcjogJ1tjbGlja091dHNpZGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBDbGlja091dHNpZGVEaXJlY3RpdmUge1xuICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZiA6IEVsZW1lbnRSZWYpIHtcbiAgIH1cblxuICAgQE91dHB1dCgpXG4gICBwdWJsaWMgY2xpY2tPdXRzaWRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50LnRhcmdldCddKVxuICAgcHVibGljIG9uQ2xpY2sodGFyZ2V0RWxlbWVudDogYW55KSB7XG4gICAgICAgY29uc3QgY2xpY2tlZEluc2lkZSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyh0YXJnZXRFbGVtZW50KTtcbiAgICAgICBpZiAoIWNsaWNrZWRJbnNpZGUpIHtcbiAgICAgICAgICAgdGhpcy5jbGlja091dHNpZGUuZW1pdChudWxsKTtcbiAgICAgICB9XG4gICB9XG59Il19