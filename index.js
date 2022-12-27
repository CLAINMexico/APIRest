// Importación de Librerias Principales
import { StaticsVariables, GlobalVariables, APIRest } from "./src/helpers";

// Importación de Librerias Secundarias (Dependencias del Proyecto)
import express from "express";
import https from "https";
import cors from "cors";

// Instancia de Librerias Principales
const Core = new APIRest;

// Definición de Instancia para uso de la Aplicación por EXPRESS
const app = express();

// Definición de Configuraciones para la Instancia de la Aplicación por EXPRESS
app.set('port', GlobalVariables.Server.Environment[GlobalVariables.Application.Environment].Port)
    .set('hostname', GlobalVariables.Server.Environment[GlobalVariables.Application.Environment].Hostname);

// Uso de Configuraciones para la Instancia de la Aplicación por EXPRESS
app.use(express.urlencoded({ extended: false }))
    .use(express.json())
    .use(cors(GlobalVariables.Dependencies.Cors))
    .use(require('./src/routes/'));

// Definición y Configuración de un nuevo servidor con protocolo HTTPs
https.createServer(Core.Dependencies.Https.GetData.Config(), app).listen(GlobalVariables.Server.Environment[GlobalVariables.Application.Environment].Port, () => {
    // Impresión en consola del servidor | Inicialización del Proyecto
    Core.Debug.Console('| Inicializando Servidor | Environment: ' + GlobalVariables.Application.Environment + ' | Application: ' + GlobalVariables.Application.Name + ' | Version: ' + GlobalVariables.Application.Version + ' | Port: ' + GlobalVariables.Server.Environment[GlobalVariables.Application.Environment].Port + ' | Host: ' + GlobalVariables.Server.Environment[GlobalVariables.Application.Environment].Hostname + ' |');
});
