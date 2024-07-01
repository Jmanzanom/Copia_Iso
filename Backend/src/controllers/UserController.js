import Sequelize from 'sequelize';
import User from '../models/User.js';

export default class UserController {
  async getAll(req, res) {
    const users = await User.findAll();
    res.send(users);
  }

  async getBynombre(req, res) {
    const users = await User.findAll({
      where: {
        nombre: req.params.nombre
      }
    });
    res.send(users);
  }

  async get(req, res) {
    const user = await User.findByPk(req.params.userId);
    res.send(user);
  }

  async create(req, res) {
    const user = await User.create({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      rut: req.body.rut,
      email: req.body.email,
      monto: req.body.montoPrestamo,
      tasa: req.body.tasa,
      plazo: req.body.plazo,
      estado: 'pendiente'
    });
    res.send(user);
  }

  async update(req, res) {
    const user = await User.findByPk(req.params.userId);
    user.update({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      rut: req.body.rut,
      email: req.body.email,
      monto: req.body.monto,
      tasa: req.body.tasa,
      plazo: req.body.plazo,
      estado: req.body.estado // Incluye el estado en la actualización general
    });
    res.send(user);
  }

  async updateStatus(req, res) {
    const user = await User.findByPk(req.params.userId);
    user.update({
      estado: req.body.estado
    });
    res.send(user);
  }

  async delete(req, res) {
    await User.destroy({ where: { id: req.params.userId } });
    res.send({ status: "ok" });
  }

  async DeudaTotal(req, res) {
    const rut = req.params.rut;
  
    try {
      console.log("Antes de la consulta"); // Agregar este console.log
      const result = await User.findAll({
        attributes: [
          [Sequelize.fn('SUM', Sequelize.cast(Sequelize.col('monto'), 'bigint')), 'totalAmount']
        ],
        where: {
          rut: rut,
          estado: 'aprobado'
        }
      });
      console.log("Después de la consulta"); // Agregar este console.log
  
      console.log("Resultado de la consulta:", result); // Agregar este console.log
  
      const totalAmount = result.length > 0 ? result[0].dataValues.totalAmount : 0;
  
      res.send({ totalAmount });
    } catch (error) {
      console.error('Error al obtener la deuda total por rut:', error);
      res.status(500).send({ error: 'Error interno del servidor' });
    }
  }
  
  
  
  
}






