const { Router } = require('express');

function crearUsuarioRoutes(usuarioController) {
    const router = Router();
    
    router.get('/usuarios', usuarioController.getUsuarios);       // GET   lista de todos
    router.get('/usuarios/:id', usuarioController.getUsuario);    // GET   obtener uno
    router.post('/usuarios', usuarioController.postUsuario);      // POST  crear
    router.put('/usuarios/:id', usuarioController.putUsuario);    // PUT   actualizar
    router.delete('/usuarios/:id', usuarioController.deleteUsuario); // DELETE eliminar
    
    return router;
}

module.exports = crearUsuarioRoutes;