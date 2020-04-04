import * as Yup from 'yup';

import Recipient from '../models/Recipients';

class RecipientsController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const recipients = await Recipient.findAll({
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(recipients);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number()
        .required()
        .positive()
        .integer(),
      zip_code: Yup.number()
        .integer()
        .positive()
        .required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (userExists) {
      return res.status(400).json({ error: 'Recipient already exists.' });
    }

    const {
      id,
      name,
      street,
      number,
      zip_code,
      city,
      state,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      zip_code,
      city,
      state,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number()
        .required()
        .positive()
        .integer(),
      zip_code: Yup.number()
        .required()
        .positive()
        .integer(),
      city: Yup.string().required(),
      state: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name } = req.body;
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (name !== recipient.name) {
      const recipientExists = Recipient.findOne({
        where: { name },
      });

      if (recipientExists) {
        return res.status(400).json({ error: 'Recipient already exists.' });
      }
    }

    const {
      street,
      number,
      complement,
      zip_code,
      city,
      state,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      zip_code,
      city,
      state,
    });
  }
}

export default new RecipientsController();
