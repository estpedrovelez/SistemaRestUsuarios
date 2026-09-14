const pool = require('../config/database');

class UsuarioRepository {
    async obtenerTodos() {
        const resultado = await pool.query('SELECT * FROM usuarios ORDER BY id ASC');
        return resultado.rows;
    }
    async obtenerPorId(id) {
        const resultado = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        return resultado.rows[0] || null;
    }
    async crear(usuario) {
        const resultado = await pool.query('INSERT INTO usuarios (nombre, edad, tipo) VALUES ($1, $2, $3) RETURNING *',
            [usuario.nombre, usuario.edad, usuario.tipo]
        );
        return resultado.rows[0];
    }
    async actualizar(id, usuario) {
        const resultado = await pool.query(
            'UPDATE usuarios SET nombre = $1, edad = $2, tipo = $3 WHERE id = $4 RETURNING *',
            [usuario.nombre, usuario.edad, usuario.tipo, id]
        );
        return resultado.rows[0] || null;
    }
    async eliminar(id) {
        const resultado = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
        return resultado.rowCount > 0;
    }
}
module.exports = UsuarioRepository;