
import UserController from './UserController.js';

export default (app) => {
  const userController = new UserController();

  // Rutas de usuario
  app.get('/users', userController.getAll);
  app.post('/users', userController.create);
  app.get('/users/:userId', userController.get);
  app.put('/users/:userId', userController.update);
  app.delete('/users/:userId', userController.delete);
  app.get('/users/deudaTotal/:rut', userController.DeudaTotal);
};
