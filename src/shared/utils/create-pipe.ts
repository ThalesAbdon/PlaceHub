import { AbstractValidationPipe } from '../validators/validator-pipe';

export function createPipe(dto) {
  return new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { body: dto },
  );
}

export function createPipeParam(dto) {
  return new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { param: dto },
  );
}
