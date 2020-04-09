import { TranslateService } from '@ngx-translate/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  constructor(private translate: TranslateService) {
    super();

    this.translate.onLangChange.subscribe((e: Event) => {
      this.getAndInitTranslations();
    });

    this.getAndInitTranslations();
  }

  getAndInitTranslations() {

    // tslint:disable-next-line: max-line-length
    /*this.translate.get(['ITEMS_PER_PAGE', 'NEXT_PAGE', 'PREVIOUS_PAGE', 'LAST_PAGE', 'FIRST_PAGE',  'OF_LABEL']).subscribe(translation => {
      this.itemsPerPageLabel = translation.ITEMS_PER_PAGE;
      this.nextPageLabel = translation.NEXT_PAGE;
      this.firstPageLabel = translation.FIRST_PAGE;
      this.lastPageLabel = translation.LAST_PAGE;
      this.previousPageLabel = translation.PREVIOUS_PAGE;
      this.changes.next();
    });*/

    const params: string[] = ['ITEMS_PER_PAGE', 'NEXT_PAGE', 'PREVIOUS_PAGE', 'LAST_PAGE', 'FIRST_PAGE'];
    const labels = this.getTranslations(params);
    this.itemsPerPageLabel = labels.ITEMS_PER_PAGE;
    this.nextPageLabel = labels.NEXT_PAGE;
    this.firstPageLabel = labels.FIRST_PAGE;
    this.lastPageLabel = labels.LAST_PAGE;
    this.previousPageLabel = labels.PREVIOUS_PAGE;
    this.changes.next();
  }

  getRangeLabel = (page: number, pageSize: number, length: number) =>  {
    const params: string[] = ['OF_LABEL'];
    const labels = this.getTranslations(params)
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} ${labels.OF_LABEL} ${length}`;
  }

  private getTranslations(params: string[]): any {
    let items: any;
    const prom = new Promise(resolve => {
      this.translate.get(params).subscribe(translation => {
        if (translation) {
          items = translation;
          resolve(items);
        }
      });
    })
    return items;
  }
}
