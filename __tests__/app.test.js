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

  beforeEach(async() => {
    agent = request.agent(app);

    instrument = await agent
      .post('/api/v1/instruments')
      .send(instrumentObject);

    return setup(pool);
  });

  it('creates a new instrument via POST', async() => {
    const res = await agent
      .post('/api/v1/instruments')
      .send(instrumentObject);
    expect(res.body).toEqual({ ...instrumentObject, id: '1' });
  });

  it('gets all instruments via GET', async() => {
    const res = await agent
      .get('/api/v1/instruments');

    expect(res.body).toEqual({ ...instrumentObject, id: '1' });
  });
});
