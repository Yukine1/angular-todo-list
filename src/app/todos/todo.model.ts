export class Todo {
  public id: number;
  public text: string | undefined | null;
  public done: boolean;
  public description?: string;

  constructor(id: number, text: string, done: boolean, description: string) {
    this.id = id;
    this.text = text;
    this.done = done;
    this.description = description;
  }
}
