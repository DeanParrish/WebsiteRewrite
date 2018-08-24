/* tslint:disable */

declare var Object: any;
export interface CustomerInfoInterface {
  "firstName"?: string;
  "lastName"?: string;
  "phoneNumber1"?: string;
  "phoneNumber2"?: string;
  "phoneNumber3"?: string;
  "address"?: string;
  "city"?: string;
  "state"?: string;
  "zip"?: string;
  "comments"?: string;
  "id"?: any;
}

export class CustomerInfo implements CustomerInfoInterface {
  "firstName": string;
  "lastName": string;
  "phoneNumber1": string;
  "phoneNumber2": string;
  "phoneNumber3": string;
  "address": string;
  "city": string;
  "state": string;
  "zip": string;
  "comments": string;
  "id": any;
  constructor(data?: CustomerInfoInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CustomerInfo`.
   */
  public static getModelName() {
    return "CustomerInfo";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CustomerInfo for dynamic purposes.
  **/
  public static factory(data: CustomerInfoInterface): CustomerInfo{
    return new CustomerInfo(data);
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
      name: 'CustomerInfo',
      plural: 'CustomerInfos',
      path: 'CustomerInfos',
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
        "phoneNumber1": {
          name: 'phoneNumber1',
          type: 'string'
        },
        "phoneNumber2": {
          name: 'phoneNumber2',
          type: 'string'
        },
        "phoneNumber3": {
          name: 'phoneNumber3',
          type: 'string'
        },
        "address": {
          name: 'address',
          type: 'string'
        },
        "city": {
          name: 'city',
          type: 'string'
        },
        "state": {
          name: 'state',
          type: 'string'
        },
        "zip": {
          name: 'zip',
          type: 'string'
        },
        "comments": {
          name: 'comments',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
