import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ObjectFunctionsService } from 'src/app/shared/functions';
import { Subscription, Subject } from 'rxjs';
import { QuestionService } from 'src/app/shared/components/question/service/question.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogStateEnum } from 'src/app/shared/enums';
import { Entity } from 'src/app/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { EntityService } from '../../services';
import { SnackbarService } from 'src/app/shared/components/snackbar/services/snackbar.service';

@Component({
  selector: 'app-entity-modal',
  templateUrl: './entity-modal.component.html',
  styleUrls: ['./entity-modal.component.scss']
})
export class EntityModalComponent implements OnInit, OnDestroy {

  entitiesSaveSubscription: Subscription;
  questionOpenSubscription: Subscription;

  dialogState = DialogStateEnum;

  entityObj: Entity;
  entityCloneObj: Entity;

  public entityGet: Subject<Entity>;
  entityForm: FormGroup;

  loadingSave: boolean;

  validationMessages: any = {};
  params: string[] = [];
  title: string;

  constructor(private entityService: EntityService,
              private objectFunctions: ObjectFunctionsService,
              private questionService: QuestionService,
              private snackBarService: SnackbarService,
              public dialogRef: MatDialogRef<EntityModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private translate: TranslateService) {
    this.loadingSave = false;
    this.params = ['Entitiy_Modal'];
  }

  ngOnInit(): void {
    this.entityGet = new Subject();
    if (this.data.entity) {
      const labels = this.getTranslations(this.params);
      this.entityObj = this.data.entity;
      this.entityCloneObj = this.objectFunctions.cloneObjectWithoutMethods(this.entityObj);
      if (this.data.dialogState === DialogStateEnum.New) {
        this.entityForm = new FormGroup({
          name: new FormControl('', Validators.required),
          description: new FormControl('')
        });
        this.title = labels.Entitiy_Modal.New_Entity_Title;
      } else {
        this.entityForm = new FormGroup({
          id: new FormControl(this.entityObj.id, Validators.required),
          name: new FormControl(this.entityObj.name, [Validators.required, Validators.maxLength(20)]),
          description: new FormControl(this.entityObj.description),
          registerDate: new FormControl(this.entityObj.registerDate),
        });
        this.title = labels.Entitiy_Modal.Edit_Entity_Title;
      }
    }
    this.setListener();
    this.setValidationMessages();
  }

  ngOnDestroy(): void {
    this.dialogRef = null;
    this.objectFunctions.unsubscribeSubscription(this.entitiesSaveSubscription);
    this.objectFunctions.unsubscribeSubscription(this.questionOpenSubscription);
  }

  setListener(): void {
    this.entityForm.get('name').valueChanges.subscribe(value => {
      this.entityObj.name = value;
    });
    this.entityForm.get('description').valueChanges.subscribe(value => {
      this.entityObj.description = value;
    });
  }

  setValidationMessages(): void {
    const labels = this.getTranslations(this.params);
    this.validationMessages = {
      name: [
        { type: 'required', message: labels.Entitiy_Modal.Name_Required_Message }
      ]
    };
  }

  close(data?: any): void {
    this.dialogRef.close(data);
  }

  checkClose(): void {
    if (!this.objectFunctions.compareObjects(this.entityObj, this.entityCloneObj)) {
      const labels = this.getTranslations(this.params);
      // tslint:disable-next-line: max-line-length
      const questionDialog = this.questionService.openModalQuestion(labels.Entitiy_Modal.Close_Window_Title, labels.Entitiy_Modal.Not_Changes_Saved, labels.Entitiy_Modal.Cancel_Changes_Question);
      this.questionOpenSubscription = questionDialog.afterClosed()
                                                    .subscribe((response: any) => {
                                                      if (response && response.question) {
                                                        if (this.data.dialogState === DialogStateEnum.Edit) {
                                                          this.entityObj = this.entityCloneObj;
                                                          this.data.entity = this.entityCloneObj;
                                                          this.entityForm.setValue({
                                                            id: this.entityCloneObj.id,
                                                            name: this.entityCloneObj.name,
                                                            description: this.entityCloneObj.description,
                                                            registerDate: this.entityCloneObj.registerDate
                                                          });
                                                        }
                                                        this.close();
                                                      }
                                                    });
    } else {
      this.close();
    }
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

  checkDataBeforeSave(entity: Entity): boolean {
    const labels = this.getTranslations(this.params);
    if (this.data.dialogState === DialogStateEnum.Edit) {
      if (!entity.id || entity.id == null || entity.id === '') {
        this.snackBarService.openSnackBar(2000, labels.Entitiy_Modal.Entity_Id_Missing, 'error');
        return false;
      }
    }
    if (!entity.name || entity.name == null || entity.name === '') {
      this.snackBarService.openSnackBar(2000, labels.Entitiy_Modal.Entity_Name_Missing, 'error');
      return false;
    }
    return true;
  }

  onSubmitSave(formEntity: FormGroup): void {
    if (formEntity.valid) {
      const form = formEntity.value as Entity;
      // tslint:disable-next-line: prefer-const
      let entity: Entity = new Entity();
      entity.name = form.name;
      entity.description = form.description;

      if (this.data.dialogState === DialogStateEnum.Edit) {
        entity.id = this.entityObj.id;
        entity.registerDate = this.entityObj.registerDate;
      }
      this.saveEntity(entity);
    }
  }

  saveEntity(entity: Entity): void {
    if (this.checkDataBeforeSave(entity)) {
      const labels = this.getTranslations(this.params);
      this.loadingSave = true;
      if (this.data.dialogState === DialogStateEnum.Edit) {
        this.entitiesSaveSubscription = this.entityService.saveEditEntity(entity)
                                                          .subscribe((response: any) => {
                                                            if (response) {
                                                              this.entityObj = response;
                                                              this.entityGet.next(this.entityObj);
                                                              this.close(this.entityObj);
                                                              // tslint:disable-next-line: max-line-length
                                                              this.snackBarService.openSnackBar(2000, labels.Entitiy_Modal.Entity_Changes_Saved, 'success');
                                                            }
                                                            this.loadingSave = false;
                                                          }, error => {
                                                            this.snackBarService.openSnackBar(2000, `${labels.Entitiy_Modal.Entity_Error_Changes_Saved}, error: ${error}`, 'error');
                                                            this.loadingSave = false;
                                                          });
      } else {
        this.entitiesSaveSubscription = this.entityService.saveNewEntity(entity)
                                                          .subscribe((response: any) => {
                                                            if (response) {
                                                              this.entityObj = response;
                                                              this.entityGet.next(this.entityObj);
                                                              this.close(this.entityObj);
                                                              // tslint:disable-next-line: max-line-length
                                                              this.snackBarService.openSnackBar(2000, labels.Entitiy_Modal.Entity_Register_Successfully, 'success');
                                                            }
                                                            this.loadingSave = false;
                                                          }, error => {
                                                            this.snackBarService.openSnackBar(2000, `${labels.Entitiy_Modal.Entity_Register_Successfully}, error: ${error}`, 'error');
                                                            this.loadingSave = false;
                                                          });
      }
    }
  }
}
