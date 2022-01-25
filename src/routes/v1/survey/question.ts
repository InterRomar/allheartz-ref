import { Router } from 'express';

import controllers from 'controllers/survey/question';
import createValidationMiddleware from 'middlewares/createValidationMiddleware';
// import isAuth from 'middlewares/isAuth';
import validation from 'validation/controllers/survey/question';

export default (router: Router): void => {
  // router.use(isAuth);

  router.get('/', createValidationMiddleware(validation.getList), controllers.getList);
  router.get('/:id', createValidationMiddleware(validation.getOne), controllers.getOne);
  router.post('/', createValidationMiddleware(validation.createOne), controllers.createOne);
  router.patch('/:id', createValidationMiddleware(validation.updateOne), controllers.updateOne);
  router.delete('/:id', createValidationMiddleware(validation.deleteOne), controllers.deleteOne);
};
