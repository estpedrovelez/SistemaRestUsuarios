const Usuario = require('../models/Usuario');

class UsuarioService {
    constructor(usuarioRepository) {
        this.repositorio = usuarioRepository;
    }
    async listarUsuarios() {
        return this.repositorio.obtenerTodos();
    }
    async obtenerUsuario(id) {
        this.#validarId(id);
        const usuario = await this.repositorio.obtenerPorId(id);
        if (!usuario) {
            const error = new Error(`No existe un usuario con id ${id}.`);
            error.status = 404;
            throw error;
        }
        return usuario;
    }
    async crearUsuario(datos) {
        const usuario = new Usuario(datos);
        const { esValido, errores } = usuario.validar();
        if (!esValido) {
            const error = new Error('Datos de usuario inválidos.');
            error.status = 400;
            error.detalles = errores;
            throw error;
        }
        return this.repositorio.crear(usuario.toJSON());
    }
    async actualizarUsuario(id, datos) {
        this.#validarId(id);
        const existente = await this.repositorio.obtenerPorId(id);
        if (!existente) {
            const error = new Error(`No existe un usuario con id ${id}.`);
            error.status = 404;
            throw error;
        }
        const usuarioFusionado = new Usuario({ ...existente, ...datos, id });
        const { esValido, errores } = usuarioFusionado.validar();
        if (!esValido) {
            const error = new Error('Datos de actualización inválidos.');
            error.status = 400;
            error.detalles = errores;
            throw error;
        }
        return this.repositorio.actualizar(id, usuarioFusionado.toJSON());
    }
    async eliminarUsuario(id) {
        this.#validarId(id);
        const existente = await this.repositorio.obtenerPorId(id);
        if (!existente) {
            const error = new Error(`No existe un usuario con id ${id}.`);
            error.status = 404;
            throw error;
        }
        return this.repositorio.eliminar(id);
    }
    //Valida que el id recibido por la ruta sea un número entero positivo
    #validarId(id) {
        if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
            const error = new Error(`El id "${id}" no es válido.`);
            error.status = 400;
            throw error;
        }
    }
}
module.exports = UsuarioService;