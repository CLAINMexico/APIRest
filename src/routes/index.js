// Importación de Librerias Principales
import { StaticsVariables, GlobalVariables, APIRest } from "../helpers";

// Importación de Librerias Secundarias (Dependencias del Proyecto)
import express from "express";

// Instancia de Librerias Secundarias (Dependencias del Proyecto)
const router = express.Router();

// Instancia de Librerias Principales
const Core = new APIRest;

// Inicialización de la Instancia del Proyecto por EXPRESS para peticiones de tipo GET
router.get('*', (request, response) => {
    // Tratamiento de Datos | Asignación de Valores | Petición en Proceso
    Core.Request.SetData(request, response);
    // Uso del Middleware | Para el tratamiento de la petición recibida
    Core.Middleware();
});

// Inicialización de la Instancia del Proyecto por EXPRESS para peticiones de tipo POST
router.post('*', (request, response) => {
    // Tratamiento de Datos | Asignación de Valores | Petición en Proceso
    Core.Request.SetData(request, response);
    // Uso del Middleware | Para el tratamiento de la petición recibida
    Core.Middleware();
});

// Inicialización de la Instancia del Proyecto por EXPRESS para peticiones de tipo PUT
router.put('*', (request, response) => {
    // Tratamiento de Datos | Asignación de Valores | Petición en Proceso
    Core.Request.SetData(request, response);
    // Uso del Middleware | Para el tratamiento de la petición recibida
    Core.Middleware();
});

// Inicialización de la Instancia del Proyecto por EXPRESS para peticiones de tipo DELETE
router.delete('*', (request, response) => {
    // Tratamiento de Datos | Asignación de Valores | Petición en Proceso
    Core.Request.SetData(request, response);
    // Uso del Middleware | Para el tratamiento de la petición recibida
    Core.Middleware();
});

// Exportación Global | Uso de la Instancia de la Aplicación por ROUTER de EXPRESS
module.exports = router;
