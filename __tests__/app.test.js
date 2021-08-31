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

    it('updates an instrument imageUrl via PATCH', async() => {
      instrument = await agent
        .patch(`/api/v1/instruments/${instrument.body.id}`)
        .send({ 
          imageUrl: 'https://imgs.classicfm.com/images/218395?crop=16_9&width=660&relax=1&signature=q7SbbezAL_Tgo3vNAh8Ef7mm1oU='
        });

      const res = await agent 
        .get(`/api/v1/instruments/${instrument.body.id}`);
 
      expect(res.body).toEqual({ ...instrument.body, id: instrument.body.id });
    });

    it('updates an entire instrument via PUT', async() => {
      instrument = await agent
        .put(`/api/v1/instruments/${instrument.body.id}`)
        .send({
          instrumentName: 'Kanjira',
          instrumentType: 'Percussion', 
          origin: 'India', 
          imageUrl: 'https://www.gandharvaloka.ca/wp-content/uploads/d-kanjira-lrg.jpg'
        });
        
      const res = await agent
        .get(`/api/v1/instruments/${instrument.body.id}`);

      expect(res.body).toEqual({ ...instrument.body, id: instrument.body.id });
    });

    it('deletes an instrument via DELETE', async() => {
      const res = await agent
        .delete(`/api/v1/instruments/${instrument.body.id}`);

      expect(res.body).toEqual({ ...instrument.body, id: instrument.body.id });
    });
  });
});
