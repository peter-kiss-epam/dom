import * as i0 from '@angular/core';
import { ElementRef, Injector, Injectable, NgModule } from '@angular/core';
import { first, timer } from 'rxjs';

class SmpDomService {
    constructor(_componentFactoryResolver, _appRef, _injector) {
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
        this._injector = _injector;
        this._refs = {};
    }
    appendComp(component, key, target = "body", injector = this._injector, hook = timer(0)) {
        const componentRef = this._componentFactoryResolver
            .resolveComponentFactory(component)
            .create(injector);
        this._appRef.attachView(componentRef.hostView);
        const domElem = componentRef.hostView
            .rootNodes[0];
        if (!!key) {
            !!this._refs[key] && console.warn("A ref with this key already exists and will be overwritten");
            this._refs[key] = componentRef;
        }
        else {
            console.warn("Component appended, but key wasn't provided. It won't be possible to remove it from the DOM automagically");
        }
        hook
            .pipe(first())
            .subscribe(() => {
            const targetEl = (typeof target === typeof ""
                ? document.querySelector(target)
                : target instanceof ElementRef ? target.nativeElement : target) || document.body;
            targetEl.appendChild(domElem);
        });
        return componentRef;
    }
    appendComps(compsData, injector, hook) {
        compsData.forEach((compData) => this.appendComp(compData.comp, compData.key, compData.target, injector, hook));
    }
    createInjector(token, value, viewContainerRef) {
        const providers = [
            { provide: token, useValue: value }
        ];
        return Injector.create({
            parent: viewContainerRef ? viewContainerRef.injector : this._injector,
            providers
        });
    }
    removeComp(key) {
        if (!!this._refs[key]) {
            const componentRef = this._refs[key];
            this._appRef.detachView(componentRef.hostView);
            componentRef.destroy();
            return !0;
        }
        else {
            console.warn(`No ref found with key ${key}`);
            return !1;
        }
    }
}
SmpDomService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: SmpDomService, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.ApplicationRef }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
SmpDomService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: SmpDomService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: SmpDomService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }, { type: i0.Injector }]; } });

class SmpDomModule {
    static forRoot() {
        return {
            ngModule: SmpDomModule,
            providers: [
                SmpDomService
            ]
        };
    }
}
SmpDomModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: SmpDomModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SmpDomModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: SmpDomModule });
SmpDomModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: SmpDomModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: SmpDomModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });

export { SmpDomModule, SmpDomService };
//# sourceMappingURL=ngx-tonysamperi-dom.mjs.map
