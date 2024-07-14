export interface IController<O> {
  create(req, res): Promise<O>;
  update(req, res): Promise<O>;
  get(req, res): Promise<O>;
  getById(id: { id: number }, req, res): Promise<O>;
  delete(id: number, req, res): Promise<O>;
}
