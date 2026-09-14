class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl.replace(/\/+$/, '');
    }
    async #manejarRespuesta(respuesta) {
        const cuerpo = await respuesta.json().catch(() => ({}));
        if (!respuesta.ok) {
            const error = new Error(cuerpo.mensaje || `Error HTTP ${respuesta.status}`);
            error.status = respuesta.status;
            error.detalles = cuerpo.detalles;
            throw error;
        }
        return cuerpo;
    }
    async getUsuarios() {
        const respuesta = await fetch(`${this.baseUrl}/usuarios`, { method: 'GET' });
        return this.#manejarRespuesta(respuesta);
    }
    async getUsuario(id) {
        const respuesta = await fetch(`${this.baseUrl}/usuarios/${id}`, { method: 'GET' });
        return this.#manejarRespuesta(respuesta);
    }
    async crearUsuario(datos) {
        const respuesta = await fetch(`${this.baseUrl}/usuarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos),
        });
        return this.#manejarRespuesta(respuesta);
    }
    async actualizarUsuario(id, datos) {
        const respuesta = await fetch(`${this.baseUrl}/usuarios/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos),
        });
        return this.#manejarRespuesta(respuesta);
    }
    async eliminarUsuario(id) {
        const respuesta = await fetch(`${this.baseUrl}/usuarios/${id}`, { method: 'DELETE' });
        return this.#manejarRespuesta(respuesta);
    }
}
module.exports = ApiClient;