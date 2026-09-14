class UsuarioController {
    constructor(usuarioService) {
        this.servicio = usuarioService;
        // Se enlaza "this" para poder pasar estos métodos directo a las rutas de Express
        this.getUsuarios = this.getUsuarios.bind(this);
        this.getUsuario = this.getUsuario.bind(this);
        this.postUsuario = this.postUsuario.bind(this);
        this.putUsuario = this.putUsuario.bind(this);
        this.deleteUsuario = this.deleteUsuario.bind(this);
    }
    async getUsuarios(req, res, next) {
        try {
            const usuarios = await this.servicio.listarUsuarios();
            res.status(200).json(usuarios);
        } catch (error) {
            next(error);
        }
    }
    async getUsuario(req, res, next) {
        try {
            const usuario = await this.servicio.obtenerUsuario(req.params.id);
            res.status(200).json(usuario);
        } catch (error) {
            next(error);
        }
    }
    async postUsuario(req, res, next) {
        try {
            const nuevoUsuario = await this.servicio.crearUsuario(req.body);
            res.status(201).json({ mensaje: 'Usuario creado correctamente.', usuario: nuevoUsuario });
        } catch (error) {
            next(error);
        }
    }
    async putUsuario(req, res, next) {
        try {
            const usuarioActualizado = await this.servicio.actualizarUsuario(req.params.id, req.body);
            res.status(200).json({ mensaje: 'Usuario actualizado correctamente.', usuario: usuarioActualizado });
        } catch (error) {
            next(error);
        }
    }
    async deleteUsuario(req, res, next) {
        try {
            await this.servicio.eliminarUsuario(req.params.id);
            res.status(200).json({ mensaje: 'Usuario eliminado correctamente.' });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = UsuarioController;