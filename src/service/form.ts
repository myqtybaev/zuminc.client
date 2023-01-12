class FormService {
  constructor() {}
  onFinish(values: object, callback: Function) {
    callback();
  }
}

export const formService = new FormService();
