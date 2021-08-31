import Router from 'express';
import Instrument from '../models/Instrument.js';

export default Router()
  .post('/api/v1/instruments', (req, res, next) => {
    Instrument
      .insert({ ...req.body })
      .then(instrument => res.send(instrument))
      .catch(next);
  });
