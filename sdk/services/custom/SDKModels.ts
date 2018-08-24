/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { TestNameModel } from '../../models/TestNameModel';
import { TestModel } from '../../models/TestModel';
import { CustomerInfo } from '../../models/CustomerInfo';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    TestNameModel: TestNameModel,
    TestModel: TestModel,
    CustomerInfo: CustomerInfo,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
