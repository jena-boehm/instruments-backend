import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  let agent;
  let instrument; 

  const instrumentObject = {
    instrumentName: 'Piano',
    instrumentType: 'String, Percussion', 
    origin: 'Italy', 
    imageUrl: 'https://kawaius.com/wp-content/uploads/2018/06/Kawai-RX-6-Grand-Piano.jpg'
  };

  describe('instrument routes', () => {

    beforeEach(async() => {
      await setup(pool);

      agent = request.agent(app);

      instrument = await agent
        .post('/api/v1/instruments')
        .send(instrumentObject);
    });

    it('creates a new instrument via POST', async() => {
      const res = await agent
        .post('/api/v1/instruments')
        .send(instrumentObject);
      expect(res.body).toEqual({ ...instrumentObject, id: expect.any(String) });
    });

    it('gets all instruments via GET', async() => {
      const res = await agent
        .get('/api/v1/instruments');

      expect(res.body).toEqual([{ ...instrumentObject, id: instrument.body.id }]);
    });

    it('gets an instrument by id via GET', async() => {
      const res = await agent
        .get(`/api/v1/instruments/${instrument.body.id}`);

      expect(res.body).toEqual({ ...instrumentObject, id: instrument.body.id });
    });
  });
});
