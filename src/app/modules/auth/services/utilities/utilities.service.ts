import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class UtilitiesService{

  generateRowIndexes(count: number): Array<number> {
    let indexes: number[] = [];
    for (let i = 0; i < count; i++) {
      indexes.push(i);
    }
    return indexes;
  }
}
