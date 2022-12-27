// Importación de Librerias Principales
import * as DriverMicrosoftSQL from "./drivers/MicrosoftSQL";
import * as DriverMySQL from "./drivers/MySQL";
import * as DriverPostgreSQL from "./drivers/PostgreSQL";

// Importación de Librerias Secundarias (Dependencias del Proyecto)
import fs from "fs";
import url from "url";
import CryptoJS from "crypto-js";
import NodeMailer from "nodemailer";
import { google } from "googleapis";
import { Buffer } from "node:buffer";

// Instancia de Librerias Secundarias (Dependencias del Proyecto)
const Speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// Declaración de Instancia | Exportación Global | Variables Estaticas
export var StaticsVariables = {
    Application: {
        Debug: {
            Request: false
        }
    }
};

// Declaración de Instancia | Exportación Global | Variables Globales
export var GlobalVariables = {
    Application: {
        Name: 'APIRest',
        Slogan: 'Application Programming Interface REST',
        Version: '1.0.6',
        Environment: 'Development'
    },
    Server: {
        Environment: {
            Development: {
                Port: 8555,
                Hostname: 'https://localhost/'
            },
            Production: {
                Port: 443,
                Hostname: 'https://apirest.clainmexico.com/'
            }
        }
    },
    Dependencies: {
        Cors: {
            origin: "*",
            methods: "GET, POST, PUT, DELETE",
            preflightContinue: false,
            optionsSuccessStatus: 200
        },
        Https: {
            Environment: {
                Development: {
                    cert: "./src/certificates/development/apirest.clainmexico.com.cer",
                    key: "./src/certificates/development/apirest.clainmexico.com.key"
                },
                Production: {
                    cert: "./src/certificates/production/apirest.clainmexico.com.cer",
                    key: "./src/certificates/production/apirest.clainmexico.com.key"
                }
            }
        },
        CryptoJS: {
            key: '4P1R3st$1%CL4IN$2023%CRYT0J5'
        },
        Express: {
        },
        NodeMailer: {
            GMail: {
                Service: 'gmail',
                Auth: {
                    Type: 'OAuth2',
                    User: 'notificaciones.apirest@gmail.com',
                    ClientID: '333770516584-iv22t2cteaoks1u65llsc2mhtpc5jjsl.apps.googleusercontent.com',
                    ClientSecret: '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',
                    RedirectURI: 'https://developers.google.com/oauthplayground',
                    RefreshToken: '1//04bD9c1hm8c4bCgYIARAAGAQSNwF-L9IrrzGAMnK0R_a4qtbb3cdrQZegxtRz76bwKRFhEsdhbuFNf7LNqef9Ax0Bf2HvV333Wnc',
                    AccessToken: ''
                }
            }
        }
    },
    Instances: {
        DataCenter: {
            Business: {
                Route: "./src/configs/DataCenter/Business/",
                Controller: "../configs/DataCenter/Business/",
                Instance: "instance.json",
                Config: null,
                Controllers: {
                    NamespaceApplication: {
                        PathNamespace: null,
                        ObjectNamespace: null
                    }
                },
            },
            Privates: {
                Route: "./src/configs/DataCenter/Privates/",
                Controller: "../configs/DataCenter/Privates/",
                Instance: "instance.json",
                Config: null,
                Controllers: {
                    NamespaceApplication: {
                        PathNamespace: null,
                        ObjectNamespace: null
                    }
                },
            },
            Students: {
                Route: "./src/configs/DataCenter/Students/",
                Controller: "../configs/DataCenter/Students/",
                Instance: "instance.json",
                Config: null,
                Controllers: {
                    NamespaceApplication: {
                        PathNamespace: null,
                        ObjectNamespace: null
                    }
                },
            }
        },
        MailerCenter: {
            Notificaciones: {
                Templates: {
                    Test: {
                        Route: './src/configs/MailerCenter/Notificaciones/templates/',
                        Controller: '../configs/MailerCenter/Notificaciones/templates/',
                        Instance: "Test.js",
                        Html: {
                            Title: 'Test - Email Template',
                            Description: 'Instrucciones o descripción general acerca del contenido del e-mail'
                        }
                    }
                }
            }
        }
    },
    Request: {
        Object: {
            Request: null,
            Response: null
        },
        Headers: null,
        Body: null,
        Parameters: null,
        Properties: null
    },
    Services: {
        DataCenter: {
            MultipleRecordsProcesseds: false,
            LastRegistrationProcess: false,
            ControlMultipleErrors: [],
            ControlMultipleResponses: [],
            ControlMultipleDebugs: [],
            SettingsConnection: null,
            PoolSettingsConnection: null,
            Drivers: [
                "MicrosoftSQL",
                "MySQL",
                "PostgreSQL"
            ]
        },
        MailerCenter: {
            Drivers: [
                "GMail"
            ]
        }
    },
    Utilities: {
        ReplaceValues: {
            Separator: ' ',
            RegularPhrase: /%20/gi
        }
    }
};

// Declaración de Clase | Exportación Global | APIRest
export class APIRest {
    Debug = {
        Console: (Script) => {
            console.log('/* ---------------------------------------------------------------------------------------------- */');
            console.log(Script);
            console.log('/* ---------------------------------------------------------------------------------------------- */');
        }
    };
    DataTreatment = {
        BuilderValues: {
            WorkRoute: () => {
                return GlobalVariables.Request.Headers.Environment === 'development' ? '/test/' : '/apps/';
            }
        },
        ReplaceValues: {
            Nulls: {
                Object: (Data) => {
                    if (typeof Data !== 'object') {
                        return Data;
                    }
                    for (let Item in Data) {
                        if (Data[Item] === null) {
                            Data[Item] = '';
                        }
                    }
                    return Data;
                },
                ArrayObjects: (Data) => {
                    if (typeof Data !== 'object') {
                        return Data;
                    }
                    Data.forEach((ObjectData, IndexArray) => {
                        for (let Item in ObjectData) {
                            if (ObjectData[Item] === null) {
                                ObjectData[Item] = '';
                            }
                        }
                    });
                    return Data;
                }
            }
        }
    };
    Dependencies = {
        Https: {
            GetData: {
                Config: () => {
                    return this.Dependencies.Https.SetData.Config(GlobalVariables.Dependencies.Https.Environment[GlobalVariables.Application.Environment].cert, GlobalVariables.Dependencies.Https.Environment[GlobalVariables.Application.Environment].key);
                }
            },
            SetData: {
                Config: (Certificate, Key) => {
                    return {
                        cert: this.Dependencies.Express.Fs.Read.Files(Certificate),
                        key: this.Dependencies.Express.Fs.Read.Files(Key)
                    };
                }
            }
        },
        CryptoJS: {
            Encrypt: (MessageEncrypt, PrintDebugScript = false) => {
                var ResultMessageEncrypt = CryptoJS.AES.encrypt(MessageEncrypt, GlobalVariables.Dependencies.CryptoJS.key, {
                    mode: CryptoJS.mode.CFB,
                    padding: CryptoJS.pad.AnsiX923
                }).toString();
                if (PrintDebugScript) {
                    this.Debug.Console(ResultMessageEncrypt);
                }
                return ResultMessageEncrypt;
            },
            Decrypt: (MessageDecrypt, PrintDebugScript = false) => {
                var ResultMessageDecrypt = CryptoJS.AES.decrypt(MessageDecrypt, GlobalVariables.Dependencies.CryptoJS.key, {
                    mode: CryptoJS.mode.CFB,
                    padding: CryptoJS.pad.AnsiX923
                }).toString(CryptoJS.enc.Utf8);
                if (PrintDebugScript) {
                    this.Debug.Console(ResultMessageDecrypt);
                }
                return ResultMessageDecrypt;
            }
        },
        Express: {
            Fs: {
                Exists: {
                    Folders: (Folder) => {
                        if (!fs.existsSync(Folder)) {
                            return false;
                        }
                        return true;
                    },
                    Files: (File) => {
                        if (!fs.existsSync(File)) {
                            return false;
                        }
                        return true;
                    }
                },
                Create: {
                    Folders: (Folder) => {
                        if (!this.Dependencies.Express.Fs.Exists.Folders(GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Route + Folder)) {
                            fs.mkdirSync(GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Route + Folder, {
                                recursive: true
                            });
                        }
                    },
                    Files: (Path, File, Content, Encoding = 'utf-8') => {
                        if (!this.Dependencies.Express.Fs.Exists.Files(GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Route + Path + File)) {
                            fs.writeFileSync(GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Route + Path + File, Content, Encoding);
                        }
                    }
                },
                Copy: {
                    Files: (OldFile, NewFile) => {
                        if (this.Dependencies.Express.Fs.Exists.Files(GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Route + OldFile)) {
                            fs.copyFileSync(GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Route + OldFile, GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Route + NewFile);
                        }
                    }
                },
                Rename: {
                    Folders: (OldFolder, NewFolder) => {
                        if (this.Dependencies.Express.Fs.Exists.Folders(GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Route + OldFolder)) {
                            fs.renameSync(GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Route + OldFolder, GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Route + NewFolder);
                        }
                    },
                    Files: (OldFile, NewFile) => {
                        if (this.Dependencies.Express.Fs.Exists.Files(GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Route + OldFile)) {
                            fs.renameSync(GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Route + OldFile, GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Route + NewFile);
                        }
                    }
                },
                Rewrite: {
                    Files: (File, Content) => {
                        if (this.Dependencies.Express.Fs.Exists.Files(GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Route + File)) {
                            fs.writeFileSync(GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Route + File, Content, {
                                encoding: 'utf-8'
                            });
                        }
                    }
                },
                Read: {
                    Files: (File) => {
                        var Extension = File.split('.')[(File.split('.').length - 1)],
                            ContentFile = null;
                        switch (Extension) {
                            case 'json': ContentFile = JSON.parse(fs.readFileSync(File, 'utf-8')); break;
                            case 'cer': ContentFile = fs.readFileSync(File); break;
                            case 'key': ContentFile = fs.readFileSync(File); break;
                            default: ContentFile = fs.readFileSync(File); break;
                        }
                        return ContentFile;
                    }
                },
                Delete: {
                    Folders: (Folder) => {
                        if (this.Dependencies.Express.Fs.Exists.Folders(GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Route + Folder)) {
                            fs.rmSync(GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Route + Folder, {
                                recursive: true
                            });
                        }
                    },
                    Files: (File) => {
                        if (this.Dependencies.Express.Fs.Exists.Files(GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Route + File)) {
                            fs.unlinkSync(GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Route + File);
                        }
                    }
                }
            }
        },
        NodeMailer: {
            SendMail: async (From, To, Cc, Bcc, Subject, Html) => {
                const GoogleApisOAuth2 = new google.auth.OAuth2(GlobalVariables.Dependencies.NodeMailer.GMail.Auth.ClientID, GlobalVariables.Dependencies.NodeMailer.GMail.Auth.ClientSecret, GlobalVariables.Dependencies.NodeMailer.GMail.Auth.RedirectURI);
                GoogleApisOAuth2.setCredentials({ refresh_token: GlobalVariables.Dependencies.NodeMailer.GMail.Auth.RefreshToken });
                try {
                    GlobalVariables.Dependencies.NodeMailer.GMail.Auth.AccessToken = await GoogleApisOAuth2.getAccessToken();
                    const NodeMailerTransport = NodeMailer.createTransport({
                        service: GlobalVariables.Dependencies.NodeMailer.GMail.Service,
                        auth: {
                            type: GlobalVariables.Dependencies.NodeMailer.GMail.Auth.Type,
                            user: GlobalVariables.Dependencies.NodeMailer.GMail.Auth.User,
                            clientId: GlobalVariables.Dependencies.NodeMailer.GMail.Auth.ClientID,
                            clientSecret: GlobalVariables.Dependencies.NodeMailer.GMail.Auth.ClientSecret,
                            refreshToken: GlobalVariables.Dependencies.NodeMailer.GMail.Auth.RefreshToken,
                            accessToken: GlobalVariables.Dependencies.NodeMailer.GMail.Auth.AccessToken
                        }
                    });
                    From += " <" + GlobalVariables.Dependencies.NodeMailer.GMail.Auth.User + ">";
                    return await NodeMailerTransport.sendMail({ from: From, to: To, cc: Cc, bcc: Bcc, subject: Subject, html: Html });
                } catch (ErrorNodeMailerSendMail) {
                    return ErrorNodeMailerSendMail;
                }
            }
        },
        Speakeasy: {
            GenerateSecret: (Application, Distribution, Username, CallBack) => {
                var SpeakeasyNewSecret = Speakeasy.generateSecret({
                    name: Application + ' | ' + Distribution + ' (' + Username + '):'
                });
                SpeakeasyNewSecret.qrcode = '';
                QRCode.toDataURL(SpeakeasyNewSecret.otpauth_url, (QRCodeImageError, QRCodeImageData) => {
                    SpeakeasyNewSecret.qrcode = QRCodeImageData;
                    CallBack(this.Dependencies.CryptoJS.Encrypt(JSON.stringify(SpeakeasyNewSecret)));
                });
            }
        }
    };
    DataBase = {
        Instance: {
            GetData: {
                Schemes: {
                    Tables: (Table, CallBack) => {
                        switch (GlobalVariables.Services.DataCenter.SettingsConnection.Driver) {
                            case 'MicrosoftSQL':
                                const MicrosoftSQL = new DriverMicrosoftSQL.MicrosoftSQL;
                                var QuerySQLSelect = {
                                    Select: [
                                        "DIR_TABLES.name AS [TABLE]"
                                    ],
                                    From: GlobalVariables.Services.DataCenter.SettingsConnection.DataBase + "..sysobjects AS DIR_TABLES",
                                    Joins: null,
                                    Where: [
                                        { logicoperator: 'AND', field: 'DIR_TABLES.type', operator: "=", value: "'U'" }
                                    ],
                                    OrderBy: "DIR_TABLES.name",
                                    GroupBy: "",
                                    Having: "",
                                    PrintDebugScript: false
                                };
                                MicrosoftSQL.Select(QuerySQLSelect, (ResultsExecuteQuerySelect) => {
                                    var ResourcesFromDataBase = [];
                                    if (Array.isArray(ResultsExecuteQuerySelect.recordset)) {
                                        ResultsExecuteQuerySelect.recordset.forEach((Registro) => {
                                            ResourcesFromDataBase.push(Registro.TABLE);
                                        });
                                    }
                                    if (!ResourcesFromDataBase.includes(Table)) {
                                        return this.Response.Json(404, 'Not Found', 'AppError', 'No fue posible determinar la existencia del <code><b><i>Recurso - ' + Table + '</i></b></code> dentro del catálogo, ponte en contacto con un administrador para poder continuar.');
                                    }
                                    CallBack();
                                });
                                break;
                            case 'MySQL':
                                const MySQL = new DriverMySQL.MySQL;
                                var QuerySQLSelect = {
                                    Select: [
                                        "DIR_TABLES.TABLE_NAME AS 'TABLE'"
                                    ],
                                    From: 'INFORMATION_SCHEMA.TABLES AS DIR_TABLES',
                                    Joins: null,
                                    Where: [
                                        { logicoperator: 'AND', field: 'DIR_TABLES.TABLE_SCHEMA', operator: "=", value: "'" + GlobalVariables.Services.DataCenter.SettingsConnection.DataBase + "'" }
                                    ],
                                    OrderBy: "",
                                    GroupBy: "",
                                    Having: "",
                                    PrintDebugScript: false
                                };
                                MySQL.Select(QuerySQLSelect, (ResultsExecuteQuerySelect) => {
                                    var ResourcesFromDataBase = [];
                                    if (Array.isArray(ResultsExecuteQuerySelect)) {
                                        ResultsExecuteQuerySelect.forEach((Registro) => {
                                            ResourcesFromDataBase.push(Registro.TABLE);
                                        });
                                    }
                                    if (!ResourcesFromDataBase.includes(Table.toLowerCase())) {
                                        return this.Response.Json(404, 'Not Found', 'AppError', 'No fue posible determinar la existencia del <code><b><i>Recurso - ' + Table + '</i></b></code> dentro del catálogo, ponte en contacto con un administrador para poder continuar.');
                                    }
                                    CallBack();
                                });
                                break;
                            case 'PostgreSQL':
                                const PostgreSQL = new DriverPostgreSQL.PostgreSQL;
                                var QuerySQLSelect = {
                                    Select: [
                                        'DIR_TABLES.table_name AS TABLE'
                                    ],
                                    From: 'information_schema.tables AS DIR_TABLES',
                                    Joins: null,
                                    Where: [
                                        { logicoperator: 'AND', field: 'DIR_TABLES.table_name', operator: "=", value: "'" + Table + "'" }
                                    ],
                                    OrderBy: "",
                                    GroupBy: "",
                                    Having: "",
                                    PrintDebugScript: false
                                };
                                PostgreSQL.Select(QuerySQLSelect, (ResultsExecuteQuerySelect) => {
                                    var ResourcesFromDataBase = [];
                                    if (Array.isArray(ResultsExecuteQuerySelect)) {
                                        ResultsExecuteQuerySelect.forEach((Registro) => {
                                            ResourcesFromDataBase.push(Registro.table);
                                        });
                                    }
                                    if (!ResourcesFromDataBase.includes(Table)) {
                                        return this.Response.Json(404, 'Not Found', 'AppError', 'No fue posible determinar la existencia del <code><b><i>Recurso - ' + Table + '</i></b></code> dentro del catálogo, ponte en contacto con un administrador para poder continuar.');
                                    }
                                    CallBack();
                                });
                                break;
                        }
                    },
                    Fields: (Table, Fields, CallBack) => {
                        switch (GlobalVariables.Services.DataCenter.SettingsConnection.Driver) {
                            case 'MicrosoftSQL':
                                const MicrosoftSQL = new DriverMicrosoftSQL.MicrosoftSQL;
                                var QuerySQLSelect = {
                                    Select: [
                                        "DIR_COLUMNS.COLUMN_NAME AS [COLUMN]"
                                    ],
                                    From: GlobalVariables.Services.DataCenter.SettingsConnection.DataBase + ".INFORMATION_SCHEMA.COLUMNS AS DIR_COLUMNS",
                                    Joins: null,
                                    Where: [
                                        { logicoperator: 'AND', field: 'DIR_COLUMNS.TABLE_NAME', operator: "=", value: "'" + Table + "'" }
                                    ],
                                    OrderBy: "DIR_COLUMNS.ORDINAL_POSITION",
                                    GroupBy: "",
                                    Having: "",
                                    PrintDebugScript: false
                                };
                                MicrosoftSQL.Select(QuerySQLSelect, (ResultsExecuteQuerySelect) => {
                                    var UseValidResource = true,
                                        FieldsResourceFromDataBase = [];
                                    ResultsExecuteQuerySelect.recordset.forEach((Registro) => {
                                        FieldsResourceFromDataBase.push(Registro.COLUMN);
                                    });
                                    if (Array.isArray(Fields)) {
                                        Fields.forEach(RegisterFields => {
                                            RegisterFields.forEach(Field => {
                                                if (!FieldsResourceFromDataBase.includes(Field)) {
                                                    UseValidResource = false;
                                                    return this.Response.Json(404, 'Not Found', 'AppError', 'No fue posible determinar la existencia del <code><b><i>Campo - ' + Field + '</i></b></code> dentro del esquema de campos pertenecientes al <code><b><i>Recurso - ' + Table + '</i></b></code>, ponte en contacto con un administrador para poder continuar.');
                                                }
                                            });
                                        });
                                    }
                                    if (UseValidResource) {
                                        CallBack(FieldsResourceFromDataBase);
                                    }
                                });
                                break;
                            case 'MySQL':
                                const MySQL = new DriverMySQL.MySQL;
                                var QuerySQLSelect = {
                                    Select: [
                                        "DIR_COLUMNS.COLUMN_NAME AS 'COLUMN'"
                                    ],
                                    From: "INFORMATION_SCHEMA.COLUMNS AS DIR_COLUMNS",
                                    Joins: null,
                                    Where: [
                                        { logicoperator: 'AND', field: 'DIR_COLUMNS.TABLE_NAME', operator: "=", value: "'" + Table + "'" }
                                    ],
                                    OrderBy: "DIR_COLUMNS.ORDINAL_POSITION",
                                    GroupBy: "",
                                    Having: "",
                                    PrintDebugScript: false
                                };
                                MySQL.Select(QuerySQLSelect, (ResultsExecuteQuerySelect) => {
                                    var UseValidResource = true,
                                        FieldsResourceFromDataBase = [];
                                    ResultsExecuteQuerySelect.forEach((Registro) => {
                                        FieldsResourceFromDataBase.push(Registro.COLUMN);
                                    });
                                    if (Array.isArray(Fields)) {
                                        Fields.forEach(RegisterFields => {
                                            RegisterFields.forEach(Field => {
                                                if (!FieldsResourceFromDataBase.includes(Field)) {
                                                    UseValidResource = false;
                                                    return this.Response.Json(404, 'Not Found', 'AppError', 'No fue posible determinar la existencia del <code><b><i>Campo - ' + Field + '</i></b></code> dentro del esquema de campos pertenecientes al <code><b><i>Recurso - ' + Table + '</i></b></code>, ponte en contacto con un administrador para poder continuar.');
                                                }
                                            });
                                        });
                                    }
                                    if (UseValidResource) {
                                        CallBack(FieldsResourceFromDataBase);
                                    }
                                });
                                break;
                            case 'PostgreSQL':
                                const PostgreSQL = new DriverPostgreSQL.PostgreSQL;
                                var QuerySQLSelect = {
                                    Select: [
                                        "DIR_COLUMNS.column_name AS COLUMN"
                                    ],
                                    From: "information_schema.columns AS DIR_COLUMNS",
                                    Joins: null,
                                    Where: [
                                        { logicoperator: 'AND', field: 'DIR_COLUMNS.table_name', operator: "=", value: "'" + Table + "'" }
                                    ],
                                    OrderBy: "DIR_COLUMNS.ordinal_position",
                                    GroupBy: "",
                                    Having: "",
                                    PrintDebugScript: false
                                };
                                PostgreSQL.Select(QuerySQLSelect, (ResultsExecuteQuerySelect) => {
                                    var UseValidResource = true,
                                        FieldsResourceFromDataBase = [];
                                    ResultsExecuteQuerySelect.forEach((Registro) => {
                                        FieldsResourceFromDataBase.push(Registro.column);
                                    });
                                    if (Array.isArray(Fields)) {
                                        Fields.forEach(RegisterFields => {
                                            RegisterFields.forEach(Field => {
                                                if (!FieldsResourceFromDataBase.includes(Field)) {
                                                    UseValidResource = false;
                                                    return this.Response.Json(404, 'Not Found', 'AppError', 'No fue posible determinar la existencia del <code><b><i>Campo - ' + Field + '</i></b></code> dentro del esquema de campos pertenecientes al <code><b><i>Recurso - ' + Table + '</i></b></code>, ponte en contacto con un administrador para poder continuar.');
                                                }
                                            });
                                        });
                                    }
                                    if (UseValidResource) {
                                        CallBack(FieldsResourceFromDataBase);
                                    }
                                });
                                break;
                        }
                    }
                }
            },
            SetData: () => {
                if (!GlobalVariables.Services.DataCenter.Drivers.includes(GlobalVariables.Request.Headers.Driver)) {
                    return false;
                }
                GlobalVariables.Services.DataCenter.SettingsConnection = GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Config.Services.DataCenter[GlobalVariables.Request.Headers.Driver];
                GlobalVariables.Services.DataCenter.SettingsConnection.Driver = GlobalVariables.Request.Headers.Driver;
                GlobalVariables.Services.DataCenter.SettingsConnection.DataBase = GlobalVariables.Request.Headers.Services.DataBase.DataBase;
                GlobalVariables.Services.DataCenter.SettingsConnection.Table = typeof GlobalVariables.Request.Headers.Services.DataBase.Table === 'object' ? GlobalVariables.Request.Headers.Services.DataBase.Table.Prefijo + GlobalVariables.Request.Properties.Resource + GlobalVariables.Request.Headers.Services.DataBase.Table.Sufijo : GlobalVariables.Request.Headers.Services.DataBase.Table;
                if (GlobalVariables.Request.Body !== null) {
                    GlobalVariables.Services.DataCenter.MultipleRecordsProcesseds = true;
                }
                switch (GlobalVariables.Services.DataCenter.SettingsConnection.Driver) {
                    case 'MicrosoftSQL':
                        GlobalVariables.Services.DataCenter.PoolSettingsConnection = {
                            user: GlobalVariables.Services.DataCenter.SettingsConnection.UserName,
                            password: GlobalVariables.Services.DataCenter.SettingsConnection.Password,
                            database: GlobalVariables.Services.DataCenter.SettingsConnection.DataBase,
                            server: GlobalVariables.Services.DataCenter.SettingsConnection.Host,
                            options: {
                                encrypt: true,
                                trustServerCertificate: true
                            }
                        };
                        break;
                    case 'MySQL':
                        GlobalVariables.Services.DataCenter.PoolSettingsConnection = {
                            user: GlobalVariables.Services.DataCenter.SettingsConnection.UserName,
                            password: GlobalVariables.Services.DataCenter.SettingsConnection.Password,
                            database: GlobalVariables.Services.DataCenter.SettingsConnection.DataBase,
                            host: GlobalVariables.Services.DataCenter.SettingsConnection.Host
                        };
                        break;
                    case 'PostgreSQL':
                        GlobalVariables.Services.DataCenter.PoolSettingsConnection = {
                            user: GlobalVariables.Services.DataCenter.SettingsConnection.UserName,
                            password: GlobalVariables.Services.DataCenter.SettingsConnection.Password,
                            database: GlobalVariables.Services.DataCenter.SettingsConnection.DataBase,
                            host: GlobalVariables.Services.DataCenter.SettingsConnection.Host,
                            port: GlobalVariables.Services.DataCenter.SettingsConnection.Port,
                        };
                        break;
                }
                return true;
            }
        }
    };
    Request = {
        SetData: (Request, Response) => {
            GlobalVariables.Request.Object.Request = Request;
            GlobalVariables.Request.Object.Response = Response;
            GlobalVariables.Request.Headers = null;
            if (GlobalVariables.Request.Object.Request.headers.apirest_properties_request !== undefined) {
                if (GlobalVariables.Request.Object.Request.headers.apirest_properties_request !== '') {
                    GlobalVariables.Request.Headers = JSON.parse(GlobalVariables.Request.Object.Request.headers.apirest_properties_request);
                }
            }
            GlobalVariables.Request.Body = null;
            if (Array.isArray(GlobalVariables.Request.Object.Request.body)) {
                GlobalVariables.Request.Body = GlobalVariables.Request.Object.Request.body;
            }
            if (typeof GlobalVariables.Request.Object.Request.body === 'object' && Object.keys(GlobalVariables.Request.Object.Request.body).length > 0) {
                GlobalVariables.Request.Body = GlobalVariables.Request.Object.Request.body;
            }
            GlobalVariables.Request.Parameters = url.parse(GlobalVariables.Request.Object.Request.url).query !== null ? url.parse(GlobalVariables.Request.Object.Request.url).query.replace(GlobalVariables.Utilities.ReplaceValues.RegularPhrase, GlobalVariables.Utilities.ReplaceValues.Separator).trim() : null;
            GlobalVariables.Request.Properties = {
                Hostname: decodeURIComponent(url.parse(GlobalVariables.Request.Object.Request.url).href.substring(1, url.parse(GlobalVariables.Request.Object.Request.url).href.length)).split('/'),
                Method: GlobalVariables.Request.Object.Request.method,
                EndPoint: GlobalVariables.Request.Object.Request.protocol + '://' + GlobalVariables.Request.Object.Request.headers.host + decodeURIComponent(url.parse(GlobalVariables.Request.Object.Request.url).href)
            };
            GlobalVariables.Request.Properties.ProcessingCenter = GlobalVariables.Request.Properties.Hostname[0];
            GlobalVariables.Request.Properties.Instance = GlobalVariables.Request.Properties.Hostname[1];
            switch (GlobalVariables.Request.Properties.ProcessingCenter) {
                case 'DataCenter':
                    switch (GlobalVariables.Request.Properties.Instance) {
                        case 'Business':
                            GlobalVariables.Request.Properties.Business = GlobalVariables.Request.Properties.Hostname[2];
                            GlobalVariables.Request.Properties.Application = GlobalVariables.Request.Properties.Hostname[3];
                            if (GlobalVariables.Request.Headers !== null) {
                                if (GlobalVariables.Request.Headers.UseDelivery) {
                                    GlobalVariables.Request.Properties.Delivery = GlobalVariables.Request.Properties.Hostname[4];
                                    GlobalVariables.Request.Properties.Version = GlobalVariables.Request.Properties.Hostname[5];
                                    GlobalVariables.Request.Properties.Resource = GlobalVariables.Request.Properties.Hostname[6];
                                    GlobalVariables.Request.Properties.Conditional = GlobalVariables.Request.Properties.Hostname[7] !== undefined ? GlobalVariables.Request.Properties.Hostname[7] : '';
                                }
                                if (!GlobalVariables.Request.Headers.UseDelivery) {
                                    GlobalVariables.Request.Properties.Version = GlobalVariables.Request.Properties.Hostname[4];
                                    GlobalVariables.Request.Properties.Resource = GlobalVariables.Request.Properties.Hostname[5];
                                    GlobalVariables.Request.Properties.Conditional = GlobalVariables.Request.Properties.Hostname[6] !== undefined ? GlobalVariables.Request.Properties.Hostname[6] : '';
                                }
                            }
                            break;
                        case 'Privates':
                            GlobalVariables.Request.Properties.User = GlobalVariables.Request.Properties.Hostname[2];
                            GlobalVariables.Request.Properties.Application = GlobalVariables.Request.Properties.Hostname[3];
                            if (GlobalVariables.Request.Headers !== null) {
                                if (GlobalVariables.Request.Headers.UseDelivery) {
                                    GlobalVariables.Request.Properties.Delivery = GlobalVariables.Request.Properties.Hostname[4];
                                    GlobalVariables.Request.Properties.Version = GlobalVariables.Request.Properties.Hostname[5];
                                    GlobalVariables.Request.Properties.Resource = GlobalVariables.Request.Properties.Hostname[6];
                                    GlobalVariables.Request.Properties.Conditional = GlobalVariables.Request.Properties.Hostname[7] !== undefined ? GlobalVariables.Request.Properties.Hostname[7] : '';
                                }
                                if (!GlobalVariables.Request.Headers.UseDelivery) {
                                    GlobalVariables.Request.Properties.Version = GlobalVariables.Request.Properties.Hostname[4];
                                    GlobalVariables.Request.Properties.Resource = GlobalVariables.Request.Properties.Hostname[5];
                                    GlobalVariables.Request.Properties.Conditional = GlobalVariables.Request.Properties.Hostname[6] !== undefined ? GlobalVariables.Request.Properties.Hostname[6] : '';
                                }
                            }
                            break;
                        case 'Students':
                            GlobalVariables.Request.Properties.College = GlobalVariables.Request.Properties.Hostname[2];
                            GlobalVariables.Request.Properties.Roster = GlobalVariables.Request.Properties.Hostname[3];
                            GlobalVariables.Request.Properties.Tuition = GlobalVariables.Request.Properties.Hostname[4];
                            GlobalVariables.Request.Properties.Application = GlobalVariables.Request.Properties.Hostname[5];
                            if (GlobalVariables.Request.Headers !== null) {
                                if (GlobalVariables.Request.Headers.UseDelivery) {
                                    GlobalVariables.Request.Properties.Delivery = GlobalVariables.Request.Properties.Hostname[6];
                                    GlobalVariables.Request.Properties.Version = GlobalVariables.Request.Properties.Hostname[7];
                                    GlobalVariables.Request.Properties.Resource = GlobalVariables.Request.Properties.Hostname[8];
                                    GlobalVariables.Request.Properties.Conditional = GlobalVariables.Request.Properties.Hostname[9] !== undefined ? GlobalVariables.Request.Properties.Hostname[9] : '';
                                }
                                if (!GlobalVariables.Request.Headers.UseDelivery) {
                                    GlobalVariables.Request.Properties.Version = GlobalVariables.Request.Properties.Hostname[6];
                                    GlobalVariables.Request.Properties.Resource = GlobalVariables.Request.Properties.Hostname[7];
                                    GlobalVariables.Request.Properties.Conditional = GlobalVariables.Request.Properties.Hostname[8] !== undefined ? GlobalVariables.Request.Properties.Hostname[8] : '';
                                }
                            }
                            break;
                    }
                    break;
                case 'MailerCenter':
                    switch (GlobalVariables.Request.Properties.Instance) {
                        case 'Notificaciones':
                            GlobalVariables.Request.Properties.Template = GlobalVariables.Request.Properties.Hostname[2];
                            break;
                    }
                    break;
            }
            if (GlobalVariables.Request.Parameters !== null) {
                GlobalVariables.Request.Properties.Resource = GlobalVariables.Request.Properties.Resource.replace('?' + GlobalVariables.Request.Parameters, '');
                if (GlobalVariables.Request.Properties.Conditional !== '') {
                    GlobalVariables.Request.Properties.Conditional = GlobalVariables.Request.Properties.Conditional.replace('?' + GlobalVariables.Request.Parameters, '');
                }
            }
            GlobalVariables.Services.DataCenter.MultipleRecordsProcesseds = false;
            GlobalVariables.Services.DataCenter.LastRegistrationProcess = false;
            GlobalVariables.Services.DataCenter.ControlMultipleErrors = [];
            GlobalVariables.Services.DataCenter.ControlMultipleResponses = [];
            GlobalVariables.Services.DataCenter.ControlMultipleDebugs = [];
            delete GlobalVariables.Request.Properties.Hostname;
        }
    };
    Response = {
        Json: (Code, Status, Type, Results) => {
            var Data = {
                environment: GlobalVariables.Request.Headers !== null ? GlobalVariables.Request.Headers.Environment : 'Not Detected',
                processingCenter: GlobalVariables.Request.Properties.ProcessingCenter,
                instance: GlobalVariables.Request.Properties.Instance,
                endpoint: GlobalVariables.Request.Properties.EndPoint,
                method: GlobalVariables.Request.Properties.Method,
                driver: GlobalVariables.Request.Headers !== null ? GlobalVariables.Request.Headers.Driver : 'Not Detected',
                results: Results
            };
            GlobalVariables.Request.Object.Response.status(Code).jsonp({ code: Code, status: Status, type: Type, data: Data });
        }
    };
    Middleware = () => {
        if (GlobalVariables.Request.Headers === null) {
            return this.Response.Json(431, 'Request Header Fields Too Large', 'AppWarning', 'No es posible continuar con la petición solicitada ya que no se encuentran la estructura valida en los <code><b><i>Headers</i></b></code>, por favor consulta la documentación oficial de <a href="https://github.com/CLAINMexico/APIRest/wiki"><b><i>APIRest - Developer Edition</i></b></a> para poder continuar.');
        }
        if (StaticsVariables.Application.Debug.Request) {
            this.Debug.Console('| Inicializando Petición | Environment: ' + GlobalVariables.Application.Environment + ' | Processing Center: ' + GlobalVariables.Request.Properties.ProcessingCenter + ' | Instance: ' + GlobalVariables.Request.Properties.Instance + ' | Method: ' + GlobalVariables.Request.Properties.Method + ' | Driver: ' + GlobalVariables.Request.Headers.Driver + ' | EndPoint: ' + GlobalVariables.Request.Properties.EndPoint + ' |');
        }
        switch (GlobalVariables.Request.Properties.ProcessingCenter) {
            case 'DataCenter':
                var FolderApplication = '',
                    FolderDelivery = '',
                    FolderVersion = '';
                switch (GlobalVariables.Request.Properties.Instance) {
                    case 'Business':
                        if (!this.Dependencies.Express.Fs.Exists.Folders(GlobalVariables.Instances.DataCenter.Business.Route + GlobalVariables.Request.Properties.Business)) {
                            return this.Response.Json(404, 'Not Found', 'AppError', 'No fue posible determinar la existencia de la <code><b><i>Empresa - ' + GlobalVariables.Request.Properties.Business + '</i></b></code> dentro del catálogo, ponte en contacto con un administrador para poder continuar.');
                        }
                        if (!this.Dependencies.Express.Fs.Exists.Files(GlobalVariables.Instances.DataCenter.Business.Route + GlobalVariables.Request.Properties.Business + '/' + GlobalVariables.Instances.DataCenter.Business.Instance)) {
                            return this.Response.Json(404, 'Not Found', 'AppError', 'No fue posible determinar la existencia del archivo de configuración <code><b><i>' + GlobalVariables.Instances.DataCenter.Business.Instance + '</i></b></code> para la empresa <code><b><i>' + GlobalVariables.Request.Properties.Business + '</i></b></code> dentro del catálogo, ponte en contacto con un administrador para poder continuar.');
                        }
                        GlobalVariables.Instances.DataCenter.Business.Config = this.Dependencies.Express.Fs.Read.Files(GlobalVariables.Instances.DataCenter.Business.Route + GlobalVariables.Request.Properties.Business + '/' + GlobalVariables.Instances.DataCenter.Business.Instance);
                        FolderApplication = GlobalVariables.Instances.DataCenter.Business.Route + GlobalVariables.Request.Properties.Business + this.DataTreatment.BuilderValues.WorkRoute() + GlobalVariables.Request.Properties.Application;
                        if (!GlobalVariables.Request.Headers.UseDelivery) {
                            FolderVersion = GlobalVariables.Instances.DataCenter.Business.Route + GlobalVariables.Request.Properties.Business + this.DataTreatment.BuilderValues.WorkRoute() + GlobalVariables.Request.Properties.Application + '/' + GlobalVariables.Request.Properties.Version;
                            GlobalVariables.Instances.DataCenter.Business.Controllers.NamespaceApplication.PathNamespace = GlobalVariables.Instances.DataCenter.Business.Controller + GlobalVariables.Request.Properties.Business + this.DataTreatment.BuilderValues.WorkRoute() + GlobalVariables.Request.Properties.Application + '/' + GlobalVariables.Request.Properties.Version + '/';
                        } else {
                            FolderDelivery = GlobalVariables.Instances.DataCenter.Business.Route + GlobalVariables.Request.Properties.Business + this.DataTreatment.BuilderValues.WorkRoute() + GlobalVariables.Request.Properties.Application + '/' + GlobalVariables.Request.Properties.Delivery;
                            FolderVersion = GlobalVariables.Instances.DataCenter.Business.Route + GlobalVariables.Request.Properties.Business + this.DataTreatment.BuilderValues.WorkRoute() + GlobalVariables.Request.Properties.Application + '/' + GlobalVariables.Request.Properties.Delivery + '/' + GlobalVariables.Request.Properties.Version;
                            GlobalVariables.Instances.DataCenter.Business.Controllers.NamespaceApplication.PathNamespace = GlobalVariables.Instances.DataCenter.Business.Controller + GlobalVariables.Request.Properties.Business + this.DataTreatment.BuilderValues.WorkRoute() + GlobalVariables.Request.Properties.Application + '/' + GlobalVariables.Request.Properties.Delivery + '/' + GlobalVariables.Request.Properties.Version + '/';
                        }
                        break;
                    case 'Privates':
                        if (!this.Dependencies.Express.Fs.Exists.Folders(GlobalVariables.Instances.DataCenter.Privates.Route + GlobalVariables.Request.Properties.User)) {
                            return this.Response.Json(404, 'Not Found', 'AppError', 'No fue posible determinar la existencia del <code><b><i>Usuario - ' + GlobalVariables.Request.Properties.User + '</i></b></code> dentro del catálogo, ponte en contacto con un administrador para poder continuar.');
                        }
                        if (!this.Dependencies.Express.Fs.Exists.Files(GlobalVariables.Instances.DataCenter.Privates.Route + GlobalVariables.Request.Properties.User + '/' + GlobalVariables.Instances.DataCenter.Privates.Instance)) {
                            return this.Response.Json(404, 'Not Found', 'AppError', 'No fue posible determinar la existencia del archivo de configuración <code><b><i>' + GlobalVariables.Instances.DataCenter.Privates.Instance + '</i></b></code> para el usuario <code><b><i>' + GlobalVariables.Request.Properties.User + '</i></b></code> dentro del catálogo, ponte en contacto con un administrador para poder continuar.');
                        }
                        GlobalVariables.Instances.DataCenter.Privates.Config = this.Dependencies.Express.Fs.Read.Files(GlobalVariables.Instances.DataCenter.Privates.Route + GlobalVariables.Request.Properties.User + '/' + GlobalVariables.Instances.DataCenter.Privates.Instance);
                        FolderApplication = GlobalVariables.Instances.DataCenter.Privates.Route + GlobalVariables.Request.Properties.User + this.DataTreatment.BuilderValues.WorkRoute() + GlobalVariables.Request.Properties.Application;
                        if (!GlobalVariables.Request.Headers.UseDelivery) {
                            FolderVersion = GlobalVariables.Instances.DataCenter.Privates.Route + GlobalVariables.Request.Properties.User + this.DataTreatment.BuilderValues.WorkRoute() + GlobalVariables.Request.Properties.Application + '/' + GlobalVariables.Request.Properties.Version;
                            GlobalVariables.Instances.DataCenter.Privates.Controllers.NamespaceApplication.PathNamespace = GlobalVariables.Instances.DataCenter.Privates.Controller + GlobalVariables.Request.Properties.User + this.DataTreatment.BuilderValues.WorkRoute() + GlobalVariables.Request.Properties.Application + '/' + GlobalVariables.Request.Properties.Version + '/';
                        } else {
                            FolderDelivery = GlobalVariables.Instances.DataCenter.Privates.Route + GlobalVariables.Request.Properties.User + this.DataTreatment.BuilderValues.WorkRoute() + GlobalVariables.Request.Properties.Application + '/' + GlobalVariables.Request.Properties.Delivery;
                            FolderVersion = GlobalVariables.Instances.DataCenter.Privates.Route + GlobalVariables.Request.Properties.User + this.DataTreatment.BuilderValues.WorkRoute() + GlobalVariables.Request.Properties.Application + '/' + GlobalVariables.Request.Properties.Delivery + '/' + GlobalVariables.Request.Properties.Version;
                            GlobalVariables.Instances.DataCenter.Privates.Controllers.NamespaceApplication.PathNamespace = GlobalVariables.Instances.DataCenter.Privates.Controller + GlobalVariables.Request.Properties.User + this.DataTreatment.BuilderValues.WorkRoute() + GlobalVariables.Request.Properties.Application + '/' + GlobalVariables.Request.Properties.Delivery + '/' + GlobalVariables.Request.Properties.Version + '/';
                        }
                        break;
                    case 'Students':
                        if (!this.Dependencies.Express.Fs.Exists.Folders(GlobalVariables.Instances.DataCenter.Students.Route + GlobalVariables.Request.Properties.College)) {
                            return this.Response.Json(404, 'Not Found', 'AppError', 'No fue posible determinar la existencia del <code><b><i>Colegio - ' + GlobalVariables.Request.Properties.College + '</i></b></code> dentro del catálogo, ponte en contacto con un administrador para poder continuar.');
                        }
                        if (!this.Dependencies.Express.Fs.Exists.Folders(GlobalVariables.Instances.DataCenter.Students.Route + GlobalVariables.Request.Properties.College + '/' + GlobalVariables.Request.Properties.Roster)) {
                            return this.Response.Json(404, 'Not Found', 'AppError', 'No fue posible determinar la existencia del <code><b><i>Plantel - ' + GlobalVariables.Request.Properties.Roster + '</i></b></code> dentro del catálogo, ponte en contacto con un administrador para poder continuar.');
                        }
                        if (!this.Dependencies.Express.Fs.Exists.Folders(GlobalVariables.Instances.DataCenter.Students.Route + GlobalVariables.Request.Properties.College + '/' + GlobalVariables.Request.Properties.Roster + '/' + GlobalVariables.Request.Properties.Tuition)) {
                            return this.Response.Json(404, 'Not Found', 'AppError', 'No fue posible determinar la existencia de la <code><b><i>Matrícula - ' + GlobalVariables.Request.Properties.Tuition + '</i></b></code> dentro del catálogo, ponte en contacto con un administrador para poder continuar.');
                        }
                        if (!this.Dependencies.Express.Fs.Exists.Files(GlobalVariables.Instances.DataCenter.Students.Route + GlobalVariables.Request.Properties.College + '/' + GlobalVariables.Request.Properties.Roster + '/' + GlobalVariables.Request.Properties.Tuition + '/' + GlobalVariables.Instances.DataCenter.Students.Instance)) {
                            return this.Response.Json(404, 'Not Found', 'AppError', 'No fue posible determinar la existencia del archivo de configuración <code><b><i>' + GlobalVariables.Instances.DataCenter.Students.Instance + '</i></b></code> para la matrícula <code><b><i>' + GlobalVariables.Request.Properties.Tuition + '</i></b></code> dentro del catálogo, ponte en contacto con un administrador para poder continuar.');
                        }
                        GlobalVariables.Instances.DataCenter.Students.Config = this.Dependencies.Express.Fs.Read.Files(GlobalVariables.Instances.DataCenter.Students.Route + GlobalVariables.Request.Properties.College + '/' + GlobalVariables.Request.Properties.Roster + '/' + GlobalVariables.Request.Properties.Tuition + '/' + GlobalVariables.Instances.DataCenter.Students.Instance);
                        FolderApplication = GlobalVariables.Instances.DataCenter.Students.Route + GlobalVariables.Request.Properties.College + '/' + GlobalVariables.Request.Properties.Roster + '/' + GlobalVariables.Request.Properties.Tuition + this.DataTreatment.BuilderValues.WorkRoute() + GlobalVariables.Request.Properties.Application;
                        if (!GlobalVariables.Request.Headers.UseDelivery) {
                            FolderVersion = GlobalVariables.Instances.DataCenter.Students.Route + GlobalVariables.Request.Properties.College + '/' + GlobalVariables.Request.Properties.Roster + '/' + GlobalVariables.Request.Properties.Tuition + this.DataTreatment.BuilderValues.WorkRoute() + GlobalVariables.Request.Properties.Application + '/' + GlobalVariables.Request.Properties.Version;
                            GlobalVariables.Instances.DataCenter.Students.Controllers.NamespaceApplication.PathNamespace = GlobalVariables.Instances.DataCenter.Students.Controller + GlobalVariables.Request.Properties.College + '/' + GlobalVariables.Request.Properties.Roster + '/' + GlobalVariables.Request.Properties.Tuition + this.DataTreatment.BuilderValues.WorkRoute() + GlobalVariables.Request.Properties.Application + '/' + GlobalVariables.Request.Properties.Version + '/';
                        } else {
                            FolderDelivery = GlobalVariables.Instances.DataCenter.Students.Route + GlobalVariables.Request.Properties.College + '/' + GlobalVariables.Request.Properties.Roster + '/' + GlobalVariables.Request.Properties.Tuition + this.DataTreatment.BuilderValues.WorkRoute() + GlobalVariables.Request.Properties.Application + '/' + GlobalVariables.Request.Properties.Delivery;
                            FolderVersion = GlobalVariables.Instances.DataCenter.Students.Route + GlobalVariables.Request.Properties.College + '/' + GlobalVariables.Request.Properties.Roster + '/' + GlobalVariables.Request.Properties.Tuition + this.DataTreatment.BuilderValues.WorkRoute() + GlobalVariables.Request.Properties.Application + '/' + GlobalVariables.Request.Properties.Delivery + '/' + GlobalVariables.Request.Properties.Version;
                            GlobalVariables.Instances.DataCenter.Students.Controllers.NamespaceApplication.PathNamespace = GlobalVariables.Instances.DataCenter.Students.Controller + GlobalVariables.Request.Properties.College + '/' + GlobalVariables.Request.Properties.Roster + '/' + GlobalVariables.Request.Properties.Tuition + this.DataTreatment.BuilderValues.WorkRoute() + GlobalVariables.Request.Properties.Application + '/' + GlobalVariables.Request.Properties.Delivery + '/' + GlobalVariables.Request.Properties.Version + '/';
                        }
                        break;
                }
                if (GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Config.Services.APIRest.Metodos[GlobalVariables.Request.Properties.Method] === undefined || !GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Config.Services.APIRest.Metodos[GlobalVariables.Request.Properties.Method]) {
                    return this.Response.Json(403, 'Forbidden', 'AppWarning', 'No es posible continuar con la petición solicitada, ya que se encuentra restringido el uso del <code><b><i>Método - ' + GlobalVariables.Request.Properties.Method + '</i></b></code> dentro del catálogo, ponte en contacto con un administrador para poder continuar.');
                }
                if (!this.Dependencies.Express.Fs.Exists.Folders(FolderApplication)) {
                    return this.Response.Json(404, 'Not Found', 'AppError', 'No fue posible determinar la existencia de la <code><b><i>Aplicación - ' + GlobalVariables.Request.Properties.Application + '</i></b></code> dentro del catálogo, ponte en contacto con un administrador para poder continuar.');
                }
                if (!GlobalVariables.Request.Headers.UseDelivery) {
                    if (!this.Dependencies.Express.Fs.Exists.Folders(FolderVersion)) {
                        return this.Response.Json(404, 'Not Found', 'AppError', 'No fue posible determinar la existencia de la <code><b><i>Versión - ' + GlobalVariables.Request.Properties.Version + '</i></b></code> dentro del catálogo, ponte en contacto con un administrador para poder continuar.');
                    }
                } else {
                    if (!this.Dependencies.Express.Fs.Exists.Folders(FolderDelivery)) {
                        return this.Response.Json(404, 'Not Found', 'AppError', 'No fue posible determinar la existencia de la <code><b><i>Distribución - ' + GlobalVariables.Request.Properties.Delivery + '</i></b></code> dentro del catálogo, ponte en contacto con un administrador para poder continuar.');
                    }
                    if (!this.Dependencies.Express.Fs.Exists.Folders(FolderVersion)) {
                        return this.Response.Json(404, 'Not Found', 'AppError', 'No fue posible determinar la existencia de la <code><b><i>Versión - ' + GlobalVariables.Request.Properties.Version + '</i></b></code> dentro del catálogo, ponte en contacto con un administrador para poder continuar.');
                    }
                }
                if (!this.DataBase.Instance.SetData()) {
                    return this.Response.Json(404, 'Not Found', 'AppError', 'No fue posible determinar la existencia del <code><b><i>Driver de Conexión - ' + GlobalVariables.Request.Headers.Driver + '</i></b></code> dentro del catálogo, ponte en contacto con un administrador para poder continuar.');
                }
                this.DataBase.Instance.GetData.Schemes.Tables(GlobalVariables.Services.DataCenter.SettingsConnection.Table, () => {
                    try {
                        GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Controllers.NamespaceApplication.ObjectNamespace = require(GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Controllers.NamespaceApplication.PathNamespace).Controller();
                    } catch (ErrorControllerInstance) {
                        return this.Response.Json(500, 'Internal Server Error', 'AppError', 'No fue posible determinar el uso del controlador <code><b><i>' + GlobalVariables.Instances.DataCenter[GlobalVariables.Request.Properties.Instance].Controllers.NamespaceApplication.PathNamespace + ' | ErrorControllerInstance</i></b></code>, ponte en contacto con un administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Code: <code><b>' + ErrorControllerInstance.code + '</b></code></li><li>Message: <code><b>' + ErrorControllerInstance.message + '</b></code></li><li>Original Error: <code><b>' + ErrorControllerInstance + '</b></code></li></ul>');
                    }
                });
                break;
            case 'MailerCenter':
                if (!GlobalVariables.Services.MailerCenter.Drivers.includes(GlobalVariables.Request.Headers.Driver)) {
                    return this.Response.Json(404, 'Not Found', 'AppError', 'No fue posible determinar la existencia del <code><b><i>Driver de Conexión - ' + GlobalVariables.Request.Headers.Driver + '</i></b></code> dentro del catálogo, ponte en contacto con un administrador para poder continuar.');
                }
                if (!this.Dependencies.Express.Fs.Exists.Files(GlobalVariables.Instances.MailerCenter[GlobalVariables.Request.Properties.Instance].Templates[GlobalVariables.Request.Properties.Template].Route + GlobalVariables.Instances.MailerCenter[GlobalVariables.Request.Properties.Instance].Templates[GlobalVariables.Request.Properties.Template].Instance)) {
                    return this.Response.Json(404, 'Not Found', 'AppError', 'No fue posible determinar la existencia del archivo de configuración <code><b><i>' + GlobalVariables.Instances.MailerCenter[GlobalVariables.Request.Properties.Instance].Templates[GlobalVariables.Request.Properties.Template].Instance + '.js</i></b></code> dentro del catálogo, ponte en contacto con un administrador para poder continuar.');
                }
                try {
                    const Html = require(GlobalVariables.Instances.MailerCenter[GlobalVariables.Request.Properties.Instance].Templates[GlobalVariables.Request.Properties.Template].Controller + GlobalVariables.Instances.MailerCenter[GlobalVariables.Request.Properties.Instance].Templates[GlobalVariables.Request.Properties.Template].Instance).Template(GlobalVariables.Request.Body.Template.Data);
                    this.Dependencies.NodeMailer.SendMail(GlobalVariables.Request.Body.SendMail.From, GlobalVariables.Request.Body.SendMail.To, GlobalVariables.Request.Body.SendMail.Cc, GlobalVariables.Request.Body.SendMail.Bcc, GlobalVariables.Request.Body.SendMail.Subject, Html)
                        .then((ThenNodeMailerSendMail) => {
                            return this.Response.Json(200, 'OK', 'AppSuccess', ThenNodeMailerSendMail);
                        })
                        .catch((CatchNodeMailerSendMail) => {
                            return this.Response.Json(500, 'Internal Server Error', 'AppError', CatchNodeMailerSendMail);
                        });
                } catch (ErrorControllerInstance) {
                    return this.Response.Json(500, 'Internal Server Error', 'AppError', 'No fue posible determinar el uso del controlador <code><b><i>' + GlobalVariables.Instances.MailerCenter[GlobalVariables.Request.Properties.Instance].Templates[GlobalVariables.Request.Properties.Template].Controller + GlobalVariables.Instances.MailerCenter[GlobalVariables.Request.Properties.Instance].Templates[GlobalVariables.Request.Properties.Template].Instance + ' | ErrorControllerInstance</i></b></code>, ponte en contacto con un administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Code: <code><b>' + ErrorControllerInstance.code + '</b></code></li><li>Message: <code><b>' + ErrorControllerInstance.message + '</b></code></li><li>Original Error: <code><b>' + ErrorControllerInstance + '</b></code></li></ul>');
                }
                break;
        }
    };
};
