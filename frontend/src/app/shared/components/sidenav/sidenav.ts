import {
    Component, OnInit, Input, ViewEncapsulation, ElementRef, Renderer, trigger, state, style,
    transition, animate
} from '@angular/core';

@Component({
    selector: 'sidenav-layout',
    templateUrl: './sidenav.html',
    styleUrls: ['./sidenav.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SidenavLayout {

}

@Component({
    selector: 'sidenav',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    host: {
        '(document: click)': 'onDocumentClick($event)'
    }
})
export class SidenavComponent implements OnInit {

    private sidenavOpened = false;

    constructor(private elRef: ElementRef, private renderer: Renderer) {
    }

    ngOnInit() {
        this.updateSidenavStyle();
    }

    onDocumentClick(event: Event) {
        if (event.target !== this.elRef.nativeElement && this.sidenavOpened) {
            this.close();
        }
    }

    open() {
        this.toggle(true);
    }

    close() {
        this.toggle(false);
    }

    toggle(isOpen: boolean) {
        this.sidenavOpened = isOpen;
        this.updateSidenavStyle();
    }

    updateSidenavStyle() {
        this.renderer.setElementStyle(this.elRef.nativeElement, 'left', ((this.sidenavOpened) ? '0' : '-' + (this.width - 50)) + 'px');
    }

    get width() {
        if (this.elRef.nativeElement) {
            return this.elRef.nativeElement.offsetWidth;
        }
        return 0;
    }

}
