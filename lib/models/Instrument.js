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

    static async find() {
        const { rows } = await pool.query(
            'SELECT * FROM instruments'
        );
        return rows.map(row => new Instrument(row))
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM instruments WHERE id = $1', 
            [id]
        );
        if(!rows[0]) throw new Error(`No instrument with id ${id}`)
        return new Instrument(rows[0])
    }

    static async update(id, { photoUrl }) {
        const { rows } = await pool.query(
            `UPDATE instruments 
            SET photo_url = $1
            WHERE id = $2
            RETURNING *`, 
            [photoUrl, id]
        );
        return new Instrument(rows[0])
    }
}
