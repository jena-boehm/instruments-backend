import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  let agent; 

  beforeEach(() => {
    agent = request.agent(app);
    return setup(pool);
  });

  const instrument = {
    instrumentName: 'Piano',
    instrumentType: 'String, Percussion', 
    origin: 'Italy', 
    imageUrl: 'https://kawaius.com/wp-content/uploads/2018/06/Kawai-RX-6-Grand-Piano.jpg'
  };

  it('creates a new instrument via POST', async() => {
    const res = await agent
      .post('/api/v1/instruments')
      .send(instrument);
    expect(res.body).toEqual({ ...instrument, id: 1 });
  });
});
