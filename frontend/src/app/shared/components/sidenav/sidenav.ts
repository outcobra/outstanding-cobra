import {
    Component, OnInit, ViewEncapsulation, ElementRef, Renderer, HostBinding, AfterContentInit,
    EventEmitter, Output, ViewChild, ContentChild
} from '@angular/core';

@Component({
    selector: 'sidenav',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    host: {
        '(transitionend)': 'onTransitionEnd($event)',
        '(document: click)': 'onDocumentClick($event)'
    }
})
export class SidenavComponent implements OnInit {

    public opened = false;
    private transition: boolean;

    @Output('open') public onOpen = new EventEmitter<void>();
    @Output('close') public onClose = new EventEmitter<void>();
    @Output('openStart') public onOpenStart = new EventEmitter<void>();
    @Output('closeStart') public onCloseStart = new EventEmitter<void>();

    private openPromise: Promise<any>;
    private openPromiseResolve: () => void;
    private openPromiseReject: () => void;
    private closePromise: Promise<any>;
    private closePromiseResolve: () => void;
    private closePromiseReject: () => void;

    constructor(private elRef: ElementRef, private renderer: Renderer) {
    }

    ngOnInit() {
        this.updateSidenavStyle();
    }

    open(): Promise<void> {
        return this.toggle(true);
    }

    close(): Promise<void> {
        return this.toggle(false);
    }

    toggle(isOpen: boolean): Promise<void> {
        this.opened = isOpen;
        this.transition = true;
        this.updateSidenavStyle();

        if (isOpen) {
            if (this.openPromise === null) {
                this.openPromise = new Promise<void>((resolve, reject) => {
                    this.openPromiseResolve = resolve;
                    this.openPromiseReject = reject;
                });
            }
            this.onOpenStart.emit();
            return this.openPromise;
        }
        else {
            if (this.closePromise === null) {
                this.closePromise = new Promise<void>((resolve, reject) => {
                    this.closePromiseResolve = resolve;
                    this.closePromiseReject = reject;
                });
            }
            this.onCloseStart.emit();
            return this.closePromise;
        }
    }

    updateSidenavStyle() {
        this.renderer.setElementStyle(this.elRef.nativeElement, 'left', ((this.opened) ? '0' : '-' + (this.width - 50)) + 'px');
    }

    onTransitionEnd(transitionEvent: TransitionEvent) {
        if (transitionEvent.target === this.elRef.nativeElement
            && transitionEvent.propertyName === 'left') {
            this.transition = false;
            if (this.opened) {
                if (this.openPromise != null) {
                    this.openPromiseResolve();
                }
                if (this.closePromise != null) {
                    this.closePromiseReject();
                }
                this.onOpen.emit();
            } else {
                if (this.closePromise != null) {
                    this.closePromiseResolve();
                }
                if (this.openPromise != null) {
                    this.openPromiseReject();
                }
                this.onClose.emit();
            }
            this.openPromise = null;
            this.closePromise = null;
        }
    }

    onDocumentClick(event: Event) {
        if (event.target !== this.elRef.nativeElement && !this.transition) {
            this.close();
        }
    }

    @HostBinding('class.sidenav-closing') get isClosing() {
        return !this.opened && this.transition;
    }
    @HostBinding('class.sidenav-opening') get isOpening() {
        return this.opened && this.transition;
    }
    @HostBinding('class.sidenav-closed') get isClosed() {
        return !this.opened && !this.transition;
    }
    @HostBinding('class.sidenav-opened') get isOpened() {
        return this.opened && !this.transition;
    }

    get width() {
        if (this.elRef.nativeElement) {
            return this.elRef.nativeElement.offsetWidth;
        }
        return 0;
    }

}

@Component({
    selector: 'sidenav-layout',
    templateUrl: './sidenav.html',
    styleUrls: ['./sidenav.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SidenavLayout implements AfterContentInit {
    @ContentChild(SidenavComponent) sidenav: SidenavComponent;

    constructor(private renderer: Renderer, private elRef: ElementRef){}

    ngAfterContentInit(): void {
        this.sidenav.onOpenStart.subscribe(() => this.setLayoutClass(true));
        this.sidenav.onCloseStart.subscribe(() => this.setLayoutClass(false));
    }

    closeSidenav(): Promise<void> {
        return this.sidenav.close();
    }

    private setLayoutClass(isAdd: boolean) {
        this.renderer.setElementClass(this.elRef.nativeElement, 'sidenav-shown', isAdd);
    }
}
