import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import DeliveryMail from '../jobs/DeliveryMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const deliveries = await Delivery.findAll({
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(deliveries);
  }

  async store(req, res) {
    // validar dados de entrada
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = await Delivery.create(req.body);

    const delivery = await Delivery.findByPk(id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name'],
        },
      ],
    });

    // enviar email para o entregador
    await Queue.add(DeliveryMail.key, delivery);

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const delivery = await Delivery.findOne({ where: { id: req.params.id } });

    await delivery.update(req.body);

    return res.json(delivery);
  }

  async delete(req, res) {
    const deletedRows = await Delivery.destroy({
      where: { id: req.params.id },
    });
    return res.json(deletedRows);
  }
}

export default new DeliveryController();
