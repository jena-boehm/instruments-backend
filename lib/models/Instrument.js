import pool from'../utils/pool.js';

export default class Instrument {
    id;
    instrumentName;
    instrumentType;
    origin; 
    imageUrl; 

    constructor(row) {
        this.id = row.id;
        this.instrumentName = row.instrument_name;
        this.instrumentType = row.instrument_type;
        this.origin = row.origin;
        this.imageUrl = row.image_url
    }

    static async insert({ instrumentName, instrumentType, origin, imageUrl}) {
        const { rows } = await pool.query(
            `INSERT INTO instruments (instrument_name, instrument_type, origin, image_url) 
            VALUES($1, $2, $3, $4)
            RETURNING *`,
            [instrumentName, instrumentType, origin, imageUrl]
        );
        return new Instrument(rows[0])
    }
}
