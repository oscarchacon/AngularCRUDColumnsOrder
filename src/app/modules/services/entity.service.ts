import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entity } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class EntityService extends BaseService{

  relativeUrl: string;

  constructor(protected http: HttpClient) {
    super(http);
    this.relativeUrl = 'Entity';
  }

  getEntitiesPaged(page?: number, pageSize?: number, columnName?: string, desc: boolean = null): Observable<any> {
    let params = null;
    if (page && pageSize) {
      params = {
        page,
        pageSize
      };
    }
    if (columnName) {
      params.columnName = columnName;
    }
    if (desc != null) {
      params.orderDesc = desc;
    }

    return this.get(`${this.relativeUrl}/paged`, params);
  }

  saveNewEntity(entity: Entity): Observable<any> {
    return this.post(`${this.relativeUrl}/Create`, entity);
  }

  saveEditEntity(entity: Entity): Observable<any> {
    return this.put(`${this.relativeUrl}/${entity.id}/Edit`, entity);
  }

  deleteEntity(entity: Entity | string): Observable<any> {
    if (typeof(entity) === 'string') {
      return this.delete(`${this.relativeUrl}/${entity}/Delete`);
    }
    return this.delete(`${this.relativeUrl}/${entity.id}/Delete`);
  }
}
