import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customdate'
})
export class CustomDate implements PipeTransform {
  transform(value: string): string {
    let res: string;
    let month: string;
    let elems: string[] = value.split("-");
    let numElem: number = 0;

    let allMonths = [ ['Jan', 'January'], ['Feb', 'February'],
                      ['Mar', 'March'], ['Apr', 'April'], ['May', 'May'],
                      ['Jun', 'June'], ['Jul', 'July'], ['Aug', 'August'],
                      ['Sep', 'September'], ['Oct', 'October'],
                      ['Nov', 'November'], ['Dec', 'December'] ];

    if (elems.length == 2) {
      for (let i=0;  i<allMonths.length; i++){
        if (elems[0]===allMonths[i][0]) {
          month = allMonths[i][1];
        }
      }

      numElem = 1;
    }

    if (elems[numElem].length == 3) {
      if (elems.length == 2) {
        res = `${month} 2${elems[numElem]}`;
      }
      else {
        res = `2${elems[numElem]}`;
      }
    }

    else if (elems[numElem].length == 2) {
      if (elems.length == 2) {
        console.log("dos elementos if");
        res = `${month} 20${elems[numElem]}`;
      }
      else {
        res = `20${elems[numElem]}`;
      }
    }

    else if (elems[numElem].length == 1) {
      if (elems.length == 2) {
        res = `${month} 200${elems[numElem]}`;
      }
      else{
        res = `200${elems[numElem]}`;
      }
    }

    return res;
  }
}
