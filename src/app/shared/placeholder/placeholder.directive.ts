import { ViewContainerRef } from '@angular/core';
import {Directive} from '@angular/core';

@Directive({
    selector: '[appPlaceholder]'
})

export class PlaceholderDirective {
    constructor(public viewContainerRef: ViewContainerRef){}
}