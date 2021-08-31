import Router from 'express';
import Instrument from '../models/Instrument.js';

export default Router()
  .post('/api/v1/instruments', (req, res, next) => {
    Instrument
      .insert({ ...req.body })
      .then(instrument => res.send(instrument))
      .catch(next);
  })

  .get('/api/v1/instruments', (req, res, next) => {
    Instrument
      .find()
      .then(instrument => res.send(instrument))
      .catch(next);
  })

  .get('/api/v1/instruments/:id', (req, res, next) => {
    Instrument
      .findById(req.params.id)
      .then(instrument => res.send(instrument))
      .catch(next);
  })

  .patch('/api/v1/instruments/:id', (req, res, next) => {
    Instrument
      .update(req.params.id, { ...req.body })
      .then(instrument => res.send(instrument))
      .catch(next);
  })

  .put('/api/v1/instruments/:id', (req, res, next) => {
    Instrument
      .updateRow(req.params.id, { ...req.body })
      .then(instrument => res.send(instrument))
      .catch(next);
  });
