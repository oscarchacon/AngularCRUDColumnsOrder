import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityService } from '../../services';
import { ObjectFunctionsService } from 'src/app/shared/functions';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss']
})
export class EntityListComponent implements OnInit {

  public activeLang = 'es';

  constructor(private translate: TranslateService,
              private entityService: EntityService,
              private objectFunctionsService: ObjectFunctionsService) {
    this.translate.setDefaultLang(this.activeLang);
  }

  ngOnInit(): void {
  }

}
