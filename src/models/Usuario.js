class Usuario {
    constructor({ id, nombre, edad, tipo }) {
        this.id = id ?? null;
        this.nombre = nombre;
        this.edad = edad;
        this.tipo = tipo;
    }
  //Valida las reglas mínimas de negocio de un Usuario 
    validar() {
        const errores = [];
        if (!this.nombre || this.nombre.trim().length < 2) {
            errores.push('El nombre debe tener al menos 2 caracteres.');
        }
    const edadNumerica = Number(this.edad);
    if (Number.isNaN(edadNumerica) || !Number.isInteger(edadNumerica) || edadNumerica <= 0 || edadNumerica > 120) {
        errores.push('La edad debe ser un número entero entre 1 y 120.');
    }

    if (!this.tipo || this.tipo.trim().length === 0) {
        errores.push('El tipo es obligatorio.');
    }

    return {
        esValido: errores.length === 0,
        errores,
    };
}
  //Representación plana del usuario, lista para enviar como JSON
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            edad: Number(this.edad),
            tipo: this.tipo,
        };
    }
}
module.exports = Usuario;