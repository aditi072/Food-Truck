import { ViewContainerRef } from '@angular/core';
import {Directive} from '@angular/core';

@Directive({
    selector: '[appPlaceholder]'
})
//gives access to place where this directive added to
export class PlaceholderDirective {
    constructor(public viewContainerRef: ViewContainerRef){}
}