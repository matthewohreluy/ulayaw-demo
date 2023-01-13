import { Observable } from 'rxjs';
import { UrlTree } from '@angular/router';

export type ReturnGuardType = boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | UrlTree;
