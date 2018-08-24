/* tslint:disable */

declare var Object: any;
export interface TestNameModelInterface {
  "firstName": string;
  "lastName": string;
  "comment"?: string;
  "id"?: number;
}

export class TestNameModel implements TestNameModelInterface {
  "firstName": string;
  "lastName": string;
  "comment": string;
  "id": number;
  constructor(data?: TestNameModelInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `TestNameModel`.
   */
  public static getModelName() {
    return "TestNameModel";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of TestNameModel for dynamic purposes.
  **/
  public static factory(data: TestNameModelInterface): TestNameModel{
    return new TestNameModel(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'TestNameModel',
      plural: 'testModel',
      path: 'testModel',
      idName: 'id',
      properties: {
        "firstName": {
          name: 'firstName',
          type: 'string'
        },
        "lastName": {
          name: 'lastName',
          type: 'string'
        },
        "comment": {
          name: 'comment',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
