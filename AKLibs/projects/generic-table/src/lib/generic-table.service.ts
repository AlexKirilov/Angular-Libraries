import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GTableService {

    checkArrayOfArrays(a: any) {
        return a.every( (x: any) => Array.isArray(x));
    }

    chunkArray(arr: any, n: number) {
        if (this.checkArrayOfArrays(arr)) { arr = arr[0]; }
        const chunkLength = Math.max(arr.length / n, 1);
        const chunks = [];
        for (let i = 0; i < n; i++) {
            if (chunkLength * (i + 1) <= arr.length) {
                chunks.push(arr.slice(chunkLength * i, chunkLength * (i + 1)));
            }
        }
        return chunks;
    }
}
