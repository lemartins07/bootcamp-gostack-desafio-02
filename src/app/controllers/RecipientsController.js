import Recipient from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
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
}

export default new RecipientsController();
