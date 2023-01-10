export default class ApiHelpers {
    constructor() {}
  
    handleQueryError(responseJson: any) {  
      if (responseJson.error || responseJson.errors) {
        throw new Error(responseJson.errors[0].message);
      }
    }
  }
  