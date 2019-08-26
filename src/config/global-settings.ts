import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalSettings {
    public globalValue$: Observable<string>;
    public showHeader = false;
    public showMenu = true;
    
    private observer: any;

    constructor() {
        this.globalValue$ = new Observable(observer => (this.observer = observer));
    }

    public updateValue(value) {
        if (this.observer) {
            this.observer.next(value);
        }
    }
}

