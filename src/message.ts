export class Message {
  public status: string;
  public message: any;
  constructor() {}

  public success() {
    this.status = "ok";
  }

  public error() {
    this.status = "error";
  }
}
