import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectFunctionsService {

  constructor() { }

  cloneObjectWithoutMethods(objectIn: any): any {
    const objectOut = Object.assign({}, objectIn);
    return objectOut;
  }

  cloneObjectWithMethods(objectIn: any): any {
    const objectOut = Object.create(objectIn);
    return objectOut;
  }

  compareObjects(objectFirst: any, objectSecond: any): boolean {
    if (objectFirst === objectSecond) {
      return true;
    }
    // tslint:disable-next-line: prefer-const
    for (let propertie in objectFirst) {
      if (objectSecond.hasOwnProperty(propertie)) {
        if (objectFirst[propertie] !== objectSecond[propertie]) {
          return false;
        }
      }
    }
    // tslint:disable-next-line: prefer-const
    for (let propertie in objectSecond) {
      if (objectFirst.hasOwnProperty(propertie)) {
        if (objectFirst[propertie] !== objectSecond[propertie]) {
          return false;
        }
      }
    }
    if (typeof(objectFirst) !== typeof(objectSecond)) {
      return false;
    }

    if (JSON.stringify(objectFirst) !== JSON.stringify(objectSecond)) {
      return false;
    }

    if (Object.entries(objectFirst).toString() !== Object.entries(objectSecond).toString()) {
      return false;
    }

    return true;
  }

  validateEmail(email: string): boolean {
    // tslint:disable-next-line: max-line-length
    const regex = /(?:[a-zñA-ZÑ0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zñA-ZÑ0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zñA-ZÑ0-9](?:[a-zñA-ZÑ0-9-]*[a-zñA-ZÑ0-9])?\.)+[a-z0-9](?:[a-zñA-ZÑ0-9-]*[a-zñA-ZÑ0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zñA-ZÑ0-9-]*[a-zñA-ZÑ0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return regex.test(email);
  }

  toggleClass(domElement: Element, className: string): void {
    if (domElement.classList.contains(className)) {
      domElement.classList.remove(className);
    } else {
      domElement.classList.add(className);
    }
  }

  replaceElementInDataSource(objectReplace: any, dataSource: any[], keyCompare?: string): any[] {
    let defaultKey = 'id';

    if (!objectReplace.hasOwnProperty(defaultKey)) {
      // tslint:disable-next-line: forin
      for (const key in objectReplace) {
        defaultKey = key;
        break;
      }
    }
    if (keyCompare && keyCompare !== '' && keyCompare != null) {
      if (keyCompare !== defaultKey) {
        // tslint:disable-next-line: forin
        for (const key in objectReplace) {
          const findKey: string = key.toLowerCase();
          if (findKey.includes(keyCompare.toLowerCase())) {
            if (objectReplace.hasOwnProperty(key)) {
              defaultKey = keyCompare;
            }
          }
        }
      }
    }

    dataSource = dataSource.filter((value) => {
      if (value[defaultKey] === objectReplace[defaultKey]) {
        for (const key in value) {
          if (key !== defaultKey) {
            value[key] = objectReplace[key];
          }
        }
      }
      return true;
    });

    return dataSource;
  }

  unsubscribeSubscription(subscription: Subscription): void {
    if (subscription && !subscription.closed) {
      subscription.unsubscribe();
    }
  }
}
