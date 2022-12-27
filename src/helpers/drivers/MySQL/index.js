// Importación de Librerias Principales
import { StaticsVariables, GlobalVariables, APIRest } from "../../";

// Importación de Librerias Secundarias (Dependencias del Proyecto)
import mysql from "mysql";

// Declaración de Clase | Exportación Global | MySQL
export class MySQL {
    Select = (QuerySQLSelect, CallBackSQLSelectResults) => {
        const Core = new APIRest;
        var __Select__ = "",
            __From__ = "",
            __Joins__ = "",
            __Where__ = "",
            __Parameters__ = [],
            __OrderBy__ = "",
            __GroupBy__ = "",
            __Having__ = "";
        var __Query__ = "";
        QuerySQLSelect.Select.forEach(Field => {
            __Select__ += Field + ', ';
        });
        __Select__ = __Select__.substring(0, (__Select__.length - 2));
        __From__ = QuerySQLSelect.From.trim();
        if (QuerySQLSelect.Joins !== null) {
            QuerySQLSelect.Joins.forEach(Join => {
                __Joins__ += ' ' + Join.instruction + ' ' + Join.table + ' ON ' + Join.on;
            });
        }
        if (QuerySQLSelect.Where !== null) {
            QuerySQLSelect.Where.forEach(Where => {
                __Where__ += ' ' + Where.logicoperator + ' ' + Where.field + ' ' + Where.operator + ' ' + Where.value;
            });
        }
        if (QuerySQLSelect.OrderBy !== '') {
            __OrderBy__ = QuerySQLSelect.OrderBy.trim();
        }
        if (QuerySQLSelect.GroupBy !== '') {
            __GroupBy__ = QuerySQLSelect.GroupBy.trim();
        }
        if (QuerySQLSelect.Having !== '') {
            __Having__ = QuerySQLSelect.Having.trim();
        }
        var __ParameterQuerySelect__ = "SELECT " + __Select__,
            __ParameterQueryFrom__ = "FROM " + __From__,
            __ParameterQueryJoins__ = ((__Joins__ !== '') ? (__Joins__.trim()) : ('')),
            __ParameterQueryWhere__ = ((__Where__ !== '') ? ("WHERE (1 = 1) " + __Where__.trim()) : ('')),
            __ParameterQueryOrderBy__ = ((__OrderBy__ !== '') ? ("ORDER BY " + __OrderBy__) : ('')),
            __ParameterQueryGroupBy__ = ((__GroupBy__ !== '') ? ("GROUP BY " + __GroupBy__) : ('')),
            __ParameterQueryHaving__ = ((__Having__ !== '') ? ("HAVING " + __Having__) : (''));
        __Query__ = (__ParameterQuerySelect__ + ' ' + __ParameterQueryFrom__ + ' ' + __ParameterQueryJoins__ + ' ' + __ParameterQueryWhere__ + ' ' + __ParameterQueryOrderBy__ + ' ' + __ParameterQueryGroupBy__ + ' ' + __ParameterQueryHaving__).trim();
        if (QuerySQLSelect.PrintDebugScript) {
            return Core.Response.Json(200, 'OK', 'AppDebug', '<code>/* Consulta ' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | SELECT | Print Debug Script */<br/>' + __Query__ + '<br/>/* End Script */</code>');
        }
        const ConnectionServerSelect = new mysql.createConnection(GlobalVariables.Services.DataCenter.PoolSettingsConnection);
        ConnectionServerSelect.connect((ErrorConnectionServerSelect) => {
            if (ErrorConnectionServerSelect) {
                ConnectionServerSelect.end();
                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorConnectionServerSelect</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorConnectionServerSelect.name + '</b></code></li><li>Code: <code><b>' + ErrorConnectionServerSelect.code + '</b></code></li><li>Message: <code><b>' + ErrorConnectionServerSelect.message + '</b></code></li><li>Original Error: <code><b>' + ErrorConnectionServerSelect.originalError + '</b></code></li></ul>');
            }
            ConnectionServerSelect.query(__Query__, (ErrorExecuteQuerySelect, ResultsExecuteQuerySelect) => {
                if (ErrorExecuteQuerySelect) {
                    ConnectionServerSelect.end();
                    return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorExecuteQuerySelect</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorExecuteQuerySelect.name + '</b></code></li><li>Code: <code><b>' + ErrorExecuteQuerySelect.code + '</b></code></li><li>Message: <code><b>' + ErrorExecuteQuerySelect.message + '</b></code></li><li>Original Error: <code><b>' + ErrorExecuteQuerySelect.originalError + '</b></code></li></ul>');
                }
                ConnectionServerSelect.end();
                ResultsExecuteQuerySelect = ResultsExecuteQuerySelect.length <= 0 ? 'No se encontraron resultados en la base de datos.' : ResultsExecuteQuerySelect;
                CallBackSQLSelectResults(ResultsExecuteQuerySelect);
            });
        });
    };
    Insert = (QuerySQLInsert, CallBackSQLInsertResults) => {
        const Core = new APIRest;
        var __From__ = "",
            __Fields__ = "",
            __Values__ = "",
            __Parameters__ = [],
            __Query__ = "";
        __From__ = QuerySQLInsert.From.trim();
        QuerySQLInsert.Fields.forEach(Field => {
            __Fields__ += "`" + Field + "`, ";
        });
        __Fields__ = __Fields__.substring(0, (__Fields__.length - 2));
        QuerySQLInsert.Values.forEach(Value => {
            __Values__ += !QuerySQLInsert.PrintDebugScript ? "?, " : "'" + Value + "', ";
            __Parameters__.push(Value);
        });
        __Values__ = __Values__.substring(0, (__Values__.length - 2));
        __Query__ = ("INSERT INTO " + __From__ + " (" + __Fields__ + ") VALUES (" + __Values__ + ")").trim();
        if (QuerySQLInsert.PrintDebugScript) {
            if (!GlobalVariables.Services.DataCenter.MultipleRecordsProcesseds) {
                return Core.Response.Json(200, 'OK', 'AppDebug', '<code>/* Consulta ' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | INSERT | Print Debug Script */<br/>' + __Query__ + '<br/>/* End Script */</code>');
            } else {
                GlobalVariables.Services.DataCenter.ControlMultipleDebugs.push('<code>/* Consulta ' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | INSERT | Print Debug Script */<br/>' + __Query__ + '<br/>/* End Script */</code>');
                if (GlobalVariables.Services.DataCenter.LastRegistrationProcess) {
                    return Core.Response.Json(200, 'OK', 'AppDebug', GlobalVariables.Services.DataCenter.ControlMultipleDebugs);
                }
            }
        }
        const ConnectionServerInsert = new mysql.createConnection(GlobalVariables.Services.DataCenter.PoolSettingsConnection);
        ConnectionServerInsert.beginTransaction((ErrorTransactionBeginInsert) => {
            if (ErrorTransactionBeginInsert) {
                ConnectionServerInsert.end();
                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorTransactionBeginInsert</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>SQL State: <code><b>' + ErrorTransactionBeginInsert.sqlState + ' | ' + ErrorTransactionBeginInsert.errno + '</b></code></li><li>Code: <code><b>' + ErrorTransactionBeginInsert.code + '</b></code></li><li>Message: <code><b>' + ErrorTransactionBeginInsert.message + '</b></code></li></ul>');
            }
            ConnectionServerInsert.query(__Query__, __Parameters__, (ErrorExecuteQueryInsert, ResultsExecuteQueryInsert) => {
                if (ErrorExecuteQueryInsert) {
                    ConnectionServerInsert.rollback(() => {
                        ConnectionServerInsert.end();
                        var ErrorRolledBackInsert = ErrorExecuteQueryInsert;
                        return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorRolledBackInsert</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>SQL State: <code><b>' + ErrorRolledBackInsert.sqlState + ' | ' + ErrorRolledBackInsert.errno + '</b></code></li><li>Code: <code><b>' + ErrorRolledBackInsert.code + '</b></code></li><li>Message: <code><b>' + ErrorRolledBackInsert.message + '</b></code></li></ul>');
                    });
                } else {
                    ConnectionServerInsert.commit((ErrorCommitTransactionInsert) => {
                        if (ErrorCommitTransactionInsert) {
                            ConnectionServerInsert.end();
                            return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorCommitTransactionInsert</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>SQL State: <code><b>' + ErrorCommitTransactionInsert.sqlState + ' | ' + ErrorCommitTransactionInsert.errno + '</b></code></li><li>Code: <code><b>' + ErrorCommitTransactionInsert.code + '</b></code></li><li>Message: <code><b>' + ErrorCommitTransactionInsert.message + '</b></code></li></ul>');
                        }
                        ConnectionServerInsert.end();
                        CallBackSQLInsertResults(ResultsExecuteQueryInsert);
                    });
                }
            });
        });
    };
    Update = (QuerySQLUpdate, CallBackSQLUpdateResults) => {
        const Core = new APIRest;
        var __From__ = "",
            __Set__ = "",
            __Where__ = [],
            __Parameters__ = [],
            __Query__ = "";
        __From__ = QuerySQLUpdate.From.trim();
        Object.entries(QuerySQLUpdate.Set).forEach(([Field, Value]) => {
            !QuerySQLUpdate.PrintDebugScript ? "?, " : "'" + Value + "', "
            if (Value.startsWith('::')) {
                __Set__ += "`" + Field + "`" + ' = ' + (!QuerySQLUpdate.PrintDebugScript ? "?" : "'" + Value.replaceAll(/::/gi, '') + "'") + ', ';
            } else {
                __Set__ += "`" + Field + "`" + ' = ' + (!QuerySQLUpdate.PrintDebugScript ? "?" : "'" + Value + "'") + ', ';
            }
            __Parameters__.push(Value);
        });
        __Set__ = __Set__.substring(0, (__Set__.length - 2));
        QuerySQLUpdate.Where.forEach(Where => {
            __Where__ += ' ' + Where.logicoperator + ' `' + Where.field + '` ' + Where.operator + ' ' + "'" + Where.value + "'";
        });
        __Query__ = ("UPDATE " + __From__ + " SET " + __Set__ + " WHERE (1 = 1)" + __Where__).trim();
        if (QuerySQLUpdate.PrintDebugScript) {
            if (!GlobalVariables.Services.DataCenter.MultipleRecordsProcesseds) {
                return Core.Response.Json(200, 'OK', 'AppDebug', '<code>/* Consulta ' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | UPDATE | Print Debug Script */<br/>' + __Query__ + '<br/>/* End Script */</code>');
            } else {
                GlobalVariables.Services.DataCenter.ControlMultipleDebugs.push('<code>/* Consulta ' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | UPDATE | Print Debug Script */<br/>' + __Query__ + '<br/>/* End Script */</code>');
                if (GlobalVariables.Services.DataCenter.LastRegistrationProcess) {
                    return Core.Response.Json(200, 'OK', 'AppDebug', GlobalVariables.Services.DataCenter.ControlMultipleDebugs);
                }
            }
        }
        const ConnectionServerUpdate = new mysql.createConnection(GlobalVariables.Services.DataCenter.PoolSettingsConnection);
        ConnectionServerUpdate.beginTransaction((ErrorTransactionBeginUpdate) => {
            if (ErrorTransactionBeginUpdate) {
                ConnectionServerUpdate.end();
                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorTransactionBeginUpdate</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>SQL State: <code><b>' + ErrorTransactionBeginUpdate.sqlState + ' | ' + ErrorTransactionBeginUpdate.errno + '</b></code></li><li>Code: <code><b>' + ErrorTransactionBeginUpdate.code + '</b></code></li><li>Message: <code><b>' + ErrorTransactionBeginUpdate.message + '</b></code></li></ul>');
            }
            ConnectionServerUpdate.query(__Query__, __Parameters__, (ErrorExecuteQueryUpdate, ResultsExecuteQueryUpdate) => {
                if (ErrorExecuteQueryUpdate) {
                    ConnectionServerUpdate.rollback(() => {
                        ConnectionServerUpdate.end();
                        var ErrorRolledBackUpdate = ErrorExecuteQueryUpdate;
                        return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorRolledBackUpdate</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>SQL State: <code><b>' + ErrorRolledBackUpdate.sqlState + ' | ' + ErrorRolledBackUpdate.errno + '</b></code></li><li>Code: <code><b>' + ErrorRolledBackUpdate.code + '</b></code></li><li>Message: <code><b>' + ErrorRolledBackUpdate.message + '</b></code></li></ul>');
                    });
                } else {
                    ConnectionServerUpdate.commit((ErrorCommitTransactionUpdate) => {
                        if (ErrorCommitTransactionUpdate) {
                            ConnectionServerUpdate.end();
                            return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorCommitTransactionUpdate</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>SQL State: <code><b>' + ErrorCommitTransactionUpdate.sqlState + ' | ' + ErrorCommitTransactionUpdate.errno + '</b></code></li><li>Code: <code><b>' + ErrorCommitTransactionUpdate.code + '</b></code></li><li>Message: <code><b>' + ErrorCommitTransactionUpdate.message + '</b></code></li></ul>');
                        }
                        ConnectionServerUpdate.end();
                        CallBackSQLUpdateResults(ResultsExecuteQueryUpdate);
                    });
                }
            });
        });
    };
    Delete = (QuerySQLDelete, CallBackSQLDeleteResults) => {
        const Core = new APIRest;
        var __From__ = "",
            __Where__ = [],
            __Parameters__ = [],
            __Query__ = "";
        __From__ = QuerySQLDelete.From.trim();
        QuerySQLDelete.Where.forEach(Where => {
            __Where__ += ' ' + Where.logicoperator + ' `' + Where.field + '` ' + Where.operator + ' ' + (!QuerySQLDelete.PrintDebugScript ? "?" : "'" + Where.value + "'");
            __Parameters__.push(Where.value);
        });
        __Query__ = ("DELETE FROM " + __From__ + " WHERE (1 = 1)" + __Where__).trim();
        if (QuerySQLDelete.PrintDebugScript) {
            return Core.Response.Json(200, 'OK', 'AppDebug', '<code>/* Consulta ' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | DELETE | Print Debug Script */<br/>' + __Query__ + '<br/>/* End Script */</code>');
        }
        const ConnectionServerDelete = new mysql.createConnection(GlobalVariables.Services.DataCenter.PoolSettingsConnection);
        ConnectionServerDelete.beginTransaction((ErrorTransactionBeginDelete) => {
            if (ErrorTransactionBeginDelete) {
                ConnectionServerDelete.end();
                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorTransactionBeginDelete</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>SQL State: <code><b>' + ErrorTransactionBeginDelete.sqlState + ' | ' + ErrorTransactionBeginDelete.errno + '</b></code></li><li>Code: <code><b>' + ErrorTransactionBeginDelete.code + '</b></code></li><li>Message: <code><b>' + ErrorTransactionBeginDelete.message + '</b></code></li></ul>');
            }
            ConnectionServerDelete.query(__Query__, __Parameters__, (ErrorExecuteQueryDelete, ResultsExecuteQueryDelete) => {
                if (ErrorExecuteQueryDelete) {
                    ConnectionServerDelete.rollback(() => {
                        ConnectionServerDelete.end();
                        var ErrorRolledBackDelete = ErrorExecuteQueryDelete;
                        return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorRolledBackDelete</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>SQL State: <code><b>' + ErrorRolledBackDelete.sqlState + ' | ' + ErrorRolledBackDelete.errno + '</b></code></li><li>Code: <code><b>' + ErrorRolledBackDelete.code + '</b></code></li><li>Message: <code><b>' + ErrorRolledBackDelete.message + '</b></code></li></ul>');
                    });
                } else {
                    ConnectionServerDelete.commit((ErrorCommitTransactionDelete) => {
                        if (ErrorCommitTransactionDelete) {
                            ConnectionServerDelete.end();
                            return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorCommitTransactionDelete</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>SQL State: <code><b>' + ErrorCommitTransactionDelete.sqlState + ' | ' + ErrorCommitTransactionDelete.errno + '</b></code></li><li>Code: <code><b>' + ErrorCommitTransactionDelete.code + '</b></code></li><li>Message: <code><b>' + ErrorCommitTransactionDelete.message + '</b></code></li></ul>');
                        }
                        ConnectionServerDelete.end();
                        CallBackSQLDeleteResults(ResultsExecuteQueryDelete);
                    });
                }
            });
        });
    };
};
