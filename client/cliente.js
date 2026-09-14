const readline = require('node:readline');
const ApiClient = require('./ApiClient');

const API_URL = process.env.API_URL || 'http://localhost:3000';
const api = new ApiClient(API_URL);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
let cerrado = false;
rl.on('close', () => { cerrado = true; });

const preguntar = (texto) => new Promise((resolve) => {
    if (cerrado) return resolve(null);
    rl.question(texto, resolve);
});

const MENU = `
==================================================
    CLIENTE - Sistema REST de Gestión de Usuarios
    Servidor: ${API_URL}
==================================================
1. Listar usuarios
2. Buscar usuario
3. Crear usuario
4. Actualizar usuario
5. Eliminar usuario
6. Salir
==================================================
`;

function imprimirUsuario(u) {
    console.log(`  id: ${u.id} | nombre: ${u.nombre} | edad: ${u.edad} | tipo: ${u.tipo}`);
}

async function listarUsuarios() {
    const usuarios = await api.getUsuarios();
    console.log(`\nTotal: ${usuarios.length}`);
    usuarios.forEach(imprimirUsuario);
}

async function buscarUsuario() {
    const id = await preguntar('ID a buscar: ');
    const usuario = await api.getUsuario(id);
    imprimirUsuario(usuario);
}

async function crearUsuario() {
    const nombre = await preguntar('Nombre: ');
    const edad = await preguntar('Edad: ');
    const tipo = await preguntar('Tipo: ');
    const { mensaje, usuario } = await api.crearUsuario({ nombre, edad: Number(edad), tipo });
    console.log(mensaje);
    imprimirUsuario(usuario);
}

async function actualizarUsuario() {
    const id = await preguntar('ID a actualizar: ');
    console.log('Deja vacío el campo que no quieras cambiar.');
    const nombre = await preguntar('Nuevo nombre: ');
    const edad = await preguntar('Nueva edad: ');
    const tipo = await preguntar('Nuevo tipo: ');

    const cambios = {};
    if (nombre) cambios.nombre = nombre;
    if (edad) cambios.edad = Number(edad);
    if (tipo) cambios.tipo = tipo;

    const { mensaje, usuario } = await api.actualizarUsuario(id, cambios);
    console.log(mensaje);
    imprimirUsuario(usuario);
}

async function eliminarUsuario() {
    const id = await preguntar('ID a eliminar: ');
    const { mensaje } = await api.eliminarUsuario(id);
    console.log(mensaje);
}   

async function ciclo() {
    if (cerrado) return;
    console.log(MENU);
    const respuesta = await preguntar('Selecciona una opción: ');
    if (respuesta === null) return;
    const opcion = respuesta.trim();
    
    try {
        switch (opcion) {
            case '1': await listarUsuarios(); break;
            case '2': await buscarUsuario(); break;
            case '3': await crearUsuario(); break;
            case '4': await actualizarUsuario(); break;
            case '5': await eliminarUsuario(); break;
            case '6':
                console.log('¡Hasta luego!');
                rl.close();
                return;
            default:
                console.log('Opción no válida.');
            }
        } catch (error) {
            console.error('\n⚠ Error:', error.message);
            if (error.detalles) console.error('  Detalles:', error.detalles);
        }
        
        await ciclo();
}

console.log('Conectando con el servicio REST...');
ciclo();