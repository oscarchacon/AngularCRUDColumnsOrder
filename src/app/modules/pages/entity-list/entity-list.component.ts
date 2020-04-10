import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityService } from '../../services';
import { ObjectFunctionsService } from 'src/app/shared/functions';
import { Entity } from 'src/app/models';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/app/shared/components/snackbar/services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { QuestionService } from 'src/app/shared/components/question/service/question.service';
import { DialogStateEnum } from 'src/app/shared/enums';
import { EntityModalComponent } from '../../components';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss']
})
export class EntityListComponent implements OnInit, OnDestroy {

  page: number;
  pageSize: number;
  total: number;
  intervals: any[] = [ 1, 3, 5, 10, 25, 50, 100, 200, 2000000 ];

  getEntitiesSubcription: Subscription;
  openDialogSubscription: Subscription;
  deleteEntitySubscription: Subscription;

  entitiesListed: Entity[] = [];
  loadingData: boolean;

  public activeLang = 'es';

  languages = [
    {value: 'es', name: 'Español'},
    {value: 'en', name: 'English'}
  ];

  displayedColumns: string[] = [
    'name',
    'description',
    'registerDate',
    'option'
  ];

  sortDirection: string;
  columnName: string;
  desc: boolean;

  dataSource: MatTableDataSource<Entity>;
  params: string[];

  constructor(private translate: TranslateService,
              private entityService: EntityService,
              private objectFunctionsService: ObjectFunctionsService,
              private snackBarService: SnackbarService,
              public dialog: MatDialog,
              private questionService: QuestionService) {
    this.translate.setDefaultLang(this.activeLang);
    this.page = 1;
    this.pageSize = 5;
    this.total = 0;
    this.loadingData = false;
    this.dataSource = new MatTableDataSource<Entity>();
    this.params = [ 'Entities_Page.Delete_Entity_Title',
                    'Entities_Page.Delete_Entity_Message',
                    'Entities_Page.Delete_Entity_Question',
                    'Entities_Page.Error_Label',
                    'Entities_Page.Error_Load_Entities',
                    'Entities_Page.Delete_Entity_Successfull',
                    'Entities_Page.Delete_Entity_Error'];
  }

  ngOnInit(): void {
    this.getEntitiesPaged(this.page, this.pageSize);
  }

  ngOnDestroy(): void {
    this.objectFunctionsService.unsubscribeSubscription(this.getEntitiesSubcription);
    this.objectFunctionsService.unsubscribeSubscription(this.openDialogSubscription);
    this.objectFunctionsService.unsubscribeSubscription(this.deleteEntitySubscription);
  }

  private getEntitiesPaged(page?: number, pageSize?: number, columnName?: string, desc?: boolean): void {
    this.loadingData = true;
    this.getEntitiesSubcription = this.entityService.getEntitiesPaged(page, pageSize, columnName, desc)
                                                    .subscribe((response: any) => {
                                                      if (response) {
                                                        if (response.results) {
                                                          this.entitiesListed = response.results;
                                                          this.dataSource.data = this.entitiesListed;
                                                          this.total = response.rowCount;
                                                        }
                                                      }
                                                      this.loadingData = false;
                                                    }, error => {
                                                      const labels = this.getTranslations(this.params);
                                                      this.snackBarService.openSnackBar(2000, `${labels['Entities_Page.Error_Load_Entities']}: ${error}`, 'error', `${labels['Entities_Page.Error_Label']}`);
                                                      this.loadingData = false;
                                                    });
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
    });
    return items;
  }

  onPaginateChange(event: any): void {
    this.pageSize = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getEntitiesPaged(this.page, this.pageSize, this.columnName, this.desc);
  }

  sortData(event: any): void {
    this.columnName = event.active;
    this.sortDirection = event.direction;
    if (this.sortDirection.toLowerCase() === 'Desc'.toLowerCase()) {
      this.desc = true;
    } else if (this.sortDirection.toLowerCase() === 'Desc'.toLowerCase()) {
      this.desc = false;
    } else {
      this.desc = null;
    }

    this.getEntitiesPaged(this.page, this.pageSize, this.columnName, this.desc);
  }

  openDialogNewEntity(): void {
    const conf = {
      data : {
        entity: new Entity(),
        dialogState: DialogStateEnum.New
      },
      disableClose: true,
      panelClass: 'dialog-insert'
    };

    const dialogRef = this.dialog.open(EntityModalComponent, conf);
    this.openDialogSubscription = dialogRef.afterClosed()
                                           .subscribe((response: any) => {
                                            if (response) {
                                              if (response.id) {
                                                this.getEntitiesPaged(this.page, this.pageSize, this.columnName, this.desc);
                                              }
                                            }
                                           });
  }

  openDialogEditEntity(entity: Entity): void {
    const entityClone = this.objectFunctionsService.cloneObjectWithoutMethods(entity);
    const conf = {
      data : {
        entity,
        dialogState: DialogStateEnum.Edit
      },
      disableClose: true,
      panelClass: 'dialog-insert'
    };

    const dialogRef = this.dialog.open(EntityModalComponent, conf);
    this.openDialogSubscription = dialogRef.afterClosed()
                                           .subscribe((response: any) => {
                                              if (response) {
                                                this.getEntitiesPaged(this.page, this.pageSize, this.columnName, this.desc);
                                              } else {
                                                // this.refreshDataRowView(companyClone);
                                                // tslint:disable-next-line: max-line-length
                                                this.dataSource.data = this.objectFunctionsService.replaceElementInDataSource(entityClone, this.dataSource.data);
                                              }
                                           });
  }

  openDialogToDelete(entity: Entity): void {
    const labels = this.getTranslations(this.params);
    const questionDialog = this.questionService.openModalQuestion(`${labels['Entities_Page.Delete_Entity_Title']}`, `${labels['Entities_Page.Delete_Entity_Message']}: ${entity.name}`, `${labels['Entities_Page.Delete_Entity_Question']}`);
    this.openDialogSubscription = questionDialog.afterClosed()
                                                .subscribe((response: any) => {
                                                  if (response && response.question) {
                                                    this.deleteEntity(entity);
                                                  }
                                                });
  }

  deleteEntity(entity: Entity): void {
    this.loadingData = true;
    this.deleteEntitySubscription = this.entityService.deleteEntity(entity)
                                                      .subscribe((result: any) => {
                                                        if (!result) {
                                                          const labels = this.getTranslations(this.params);
                                                          // tslint:disable-next-line: max-line-length
                                                          this.snackBarService.openSnackBar(2000, labels['Entities_Page.Delete_Entity_Successfull'], 'success');
                                                          this.getEntitiesPaged(this.page, this.pageSize, this.columnName, this.desc);
                                                        }
                                                        this.loadingData = false;
                                                      }, error => {
                                                        const labels = this.getTranslations(this.params);
                                                        this.snackBarService.openSnackBar(2000, `${labels['Entities_Page.Delete_Entity_Error']} ${error}`, 'error');
                                                        this.loadingData = false;
                                                      });
  }

  changeLanguage(lang: any): void {
    this.activeLang = lang.value;
    this.translate.use(lang.value);
  }
}
