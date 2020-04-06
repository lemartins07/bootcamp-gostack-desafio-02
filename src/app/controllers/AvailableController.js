import {
  isBefore,
  setHours,
  setMinutes,
  setSeconds,
  isAfter,
  format,
} from 'date-fns';
import * as Yup from 'yup';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class AvailableController {
  // retornar as encomendas atribuidas a ele, que não estejam entregues ou canceladas;
  // status = disponiveis | entregues | canceladas
  async index(req, res) {
    const { id } = req.params;
    const { status } = req.query;

    const where = { deliveryman_id: id };

    switch (status) {
      case 'entregues':
        where.end_date = {
          [Op.lte]: new Date(),
        };
        break;
      case 'canceladas':
        where.canceled_at = {
          [Op.lte]: new Date(),
        };
        break;
      default:
        where.canceled_at = null;
        where.end_date = null;
        break;
    }

    const deliveries = await Delivery.findAll({
      where,
    });

    return res.json(deliveries);
  }

  async store(req, res) {
    const { id } = req.params;
    const { date, delivery_id } = req.body;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    const schedule = ['08:00', '18:00'];

    const searchDate = new Date(Number(date));

    const avaiable = schedule.map((time, i) => {
      const [hour, minute] = time.split(':');
      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );
      schedule[i] = value;
      return schedule[i];
    });

    // verificar se o horário está entre 08 e 18
    if (isBefore(avaiable[0], searchDate) && isAfter(avaiable[1], searchDate)) {
      const delivery = await Delivery.findByPk(delivery_id);
      // verifica se não está cancelado
      if (delivery.canceled_at !== null) {
        return res
          .status(400)
          .json({ error: 'This delivery is not available.' });
      }

      if (delivery.start_date === null) {
        await delivery.update({
          start_date: format(searchDate, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        });

        return res.json(delivery);
      }

      if (delivery.end_date === null) {
        await delivery.update({
          end_date: format(searchDate, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        });

        return res.json(delivery);
      }

      return res.status(400).json({ error: 'This delivery is not available.' });
    }

    return res.json({ error: 'You are out of pickup time.' });
  }
}

export default new AvailableController();
