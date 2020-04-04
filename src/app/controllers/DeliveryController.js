import * as Yup from 'yup';
import Delivery from '../models/Delivery';

class DeliveryController {
  async index(req, res) {
    return res.json();
  }

  // "recipient_id": 1,
  // "deliveryman_id": 1,
  // "product": "Tenis"

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

    const delivery = await Delivery.create(req.body);

    // enviar email para o entregador

    return res.json(delivery);
  }

  async update(req, res) {
    return res.json();
  }

  async delete(req, res) {
    return res.json();
  }
}

export default new DeliveryController();
