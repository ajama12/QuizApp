DROP TABLE IF EXISTS quiz CASCADE;
CREATE TABLE quiz (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    quiz_name VARCHAR(255) NOT NULL,
    quiz_description TEXT,
    is_private BOOLEAN DEFAULT FALSE
);
