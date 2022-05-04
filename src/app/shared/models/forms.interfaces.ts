interface IObjectKeys {
    [key: string]: {
      [key: string]: string;
    };
  }
  
  interface IObjectKey {
    [key: string]: string;
  }
  
  export interface ValidationMessage extends IObjectKeys {
    name: {
      required: string;
      minlength: string;
    }
    login: {
      required: string;
      email: string;
    };
    password: {
      required: string;
      minlength: string;
      hasNumber: string;
      hasCapitalCase: string;
      hasSmallCase: string;
      hasSpecialCharacters: string;
    };
    title: {
      required: string;
      minlength: string;
      maxlength: string;
    };
    description: {
      maxlength: string;
    };
    img: {
      required: string;
      checkUrl: string;
    };
  }
  
  export interface FormError extends IObjectKey {
    name: string
    login: string;
    password: string;
    title: string;
    description: string;
    img: string;
  }