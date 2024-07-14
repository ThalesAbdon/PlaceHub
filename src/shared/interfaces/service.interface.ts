export interface IService<I, O> {
  create(...args: I[]): Promise<O>;
  update(id: number, ...args: I[]): Promise<O>;
  get(): Promise<O>;
  getById(id: number): Promise<O>;
  delete(id: number): Promise<O>;
}
