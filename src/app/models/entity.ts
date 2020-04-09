import { EntityRegisterModel } from './entity-register-model';

export class Entity implements EntityRegisterModel{
  id: string;
  name: string;
  description?: string;
  registerDate?: Date;
}
