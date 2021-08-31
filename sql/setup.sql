DROP TABLE IF EXISTS instruments CASCADE;
DROP TABLE IF EXISTS musicians;

CREATE TABLE instruments(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    instrument_name TEXT NOT NULL,
    instrument_type TEXT NOT NULL,
    origin TEXT NOT NULL,
    image_url TEXT NOT NULL
);

-- CREATE TABLE musicians(
--     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     instrument_id BIGINT REFERENCES instruments(id),
--     musician_name TEXT NOT NULL,
--     image_url TEXT NOT NULL
-- );