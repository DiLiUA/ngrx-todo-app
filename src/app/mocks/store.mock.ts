import { Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operator/map';


export class MockStore<T> extends BehaviorSubject<T> {

  constructor(private _initialState: T) {
    super(_initialState);
  }

  dispatch(action: Action): void {}

  select(pathOrMapFn: any): Observable<any> {
    const project = typeof pathOrMapFn === 'string' ? state => state[pathOrMapFn] : pathOrMapFn;
    return map.call(this, project);
  }
}
