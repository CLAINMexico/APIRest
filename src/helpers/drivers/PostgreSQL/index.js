// Importación de Librerias Principales
import { StaticsVariables, GlobalVariables, APIRest } from "../../";

// Importación de Librerias Secundarias (Dependencias del Proyecto)
import postgresql from "pg";

// Declaración de Clase | Exportación Global | PostgreSQL
export class PostgreSQL {
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
        const ConnectionServerSelect = new postgresql.Pool(GlobalVariables.Services.DataCenter.PoolSettingsConnection)
        ConnectionServerSelect.connect((ErrorConnectionServerSelect) => {
            if (ErrorConnectionServerSelect) {
                ConnectionServerSelect.end();
                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorConnectionServerSelect</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorConnectionServerSelect.name + '</b></code></li><li>Code: <code><b>' + ErrorConnectionServerSelect.code + '</b></code></li><li>Message: <code><b>' + ErrorConnectionServerSelect.message + '</b></code></li><li>Original Error: <code><b>' + ErrorConnectionServerSelect.stack + '</b></code></li></ul>');
            }
            ConnectionServerSelect.query(__Query__, (ErrorExecuteQuerySelect, ResultsExecuteQuerySelect) => {
                if (ErrorExecuteQuerySelect) {
                    ConnectionServerSelect.end();
                    return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorExecuteQuerySelect</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorExecuteQuerySelect.name + '</b></code></li><li>Code: <code><b>' + ErrorExecuteQuerySelect.code + '</b></code></li><li>Message: <code><b>' + ErrorExecuteQuerySelect.message + '</b></code></li><li>Original Error: <code><b>' + ErrorExecuteQuerySelect.stack + '</b></code></li></ul>');
                }
                ConnectionServerSelect.end();
                ResultsExecuteQuerySelect.rows = ResultsExecuteQuerySelect.rowCount <= 0 ? 'No se encontraron resultados en la base de datos.' : ResultsExecuteQuerySelect.rows;
                CallBackSQLSelectResults(ResultsExecuteQuerySelect.rows);
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
            __Fields__ += '"' + Field + '", ';
        });
        __Fields__ = __Fields__.substring(0, (__Fields__.length - 2));
        QuerySQLInsert.Values.forEach((Value, Count) => {
            __Values__ += !QuerySQLInsert.PrintDebugScript ? '$' + (Count + 1) + ', ' : "'" + Value + "', ";
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
        const ConnectionServerInsert = new postgresql.Pool(GlobalVariables.Services.DataCenter.PoolSettingsConnection);
        ConnectionServerInsert.connect((ErrorConnectionServerInsert) => {
            if (ErrorConnectionServerInsert) {
                ConnectionServerInsert.end();
                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorConnectionServerInsert</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorConnectionServerInsert.name + '</b></code></li><li>Code: <code><b>' + ErrorConnectionServerInsert.code + '</b></code></li><li>Message: <code><b>' + ErrorConnectionServerInsert.message + '</b></code></li><li>Original Error: <code><b>' + ErrorConnectionServerInsert.stack + '</b></code></li></ul>');
            }
            ConnectionServerInsert.query('BEGIN', (ErrorTransactionBeginInsert) => {
                if (ErrorTransactionBeginInsert) {
                    ConnectionServerInsert.query('ROLLBACK', (ErrorRollBackInsert) => {
                        if (ErrorRollBackInsert) {
                            ConnectionServerInsert.end();
                            return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorRollBackInsert</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorRollBackInsert.name + '</b></code></li><li>Code: <code><b>' + ErrorRollBackInsert.code + '</b></code></li><li>Message: <code><b>' + ErrorRollBackInsert.message + '</b></code></li><li>Original Error: <code><b>' + ErrorRollBackInsert.stack + '</b></code></li></ul>');
                        }
                    });
                    ConnectionServerInsert.end();
                    return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorTransactionBeginInsert</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorTransactionBeginInsert.name + '</b></code></li><li>Code: <code><b>' + ErrorTransactionBeginInsert.code + '</b></code></li><li>Message: <code><b>' + ErrorTransactionBeginInsert.message + '</b></code></li><li>Original Error: <code><b>' + ErrorTransactionBeginInsert.stack + '</b></code></li></ul>');
                }
                ConnectionServerInsert.query(__Query__, __Parameters__, (ErrorExecuteQueryInsert, ResultsExecuteQueryInsert) => {
                    if (ErrorExecuteQueryInsert) {
                        ConnectionServerInsert.query('ROLLBACK', (ErrorRollBackInsert) => {
                            if (ErrorRollBackInsert) {
                                ConnectionServerInsert.end();
                                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorRollBackInsert</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorRollBackInsert.name + '</b></code></li><li>Code: <code><b>' + ErrorRollBackInsert.code + '</b></code></li><li>Message: <code><b>' + ErrorRollBackInsert.message + '</b></code></li><li>Original Error: <code><b>' + ErrorRollBackInsert.stack + '</b></code></li></ul>');
                            }
                        });
                        ConnectionServerInsert.end();
                        return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorExecuteQueryInsert</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorExecuteQueryInsert.name + '</b></code></li><li>Code: <code><b>' + ErrorExecuteQueryInsert.code + '</b></code></li><li>Message: <code><b>' + ErrorExecuteQueryInsert.message + '</b></code></li><li>Original Error: <code><b>' + ErrorExecuteQueryInsert.stack + '</b></code></li></ul>');
                    }
                    ConnectionServerInsert.query('COMMIT', (ErrorCommitTransactionInsert) => {
                        if (ErrorCommitTransactionInsert) {
                            ConnectionServerInsert.end();
                            return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorCommitTransactionInsert</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorCommitTransactionInsert.name + '</b></code></li><li>Code: <code><b>' + ErrorCommitTransactionInsert.code + '</b></code></li><li>Message: <code><b>' + ErrorCommitTransactionInsert.message + '</b></code></li><li>Original Error: <code><b>' + ErrorCommitTransactionInsert.stack + '</b></code></li></ul>');
                        }
                        ConnectionServerInsert.end();
                        CallBackSQLInsertResults(ResultsExecuteQueryInsert);
                    });
                });
            });
        });
    };
    Update = (QuerySQLUpdate, CallBackSQLUpdateResults) => {
        const Core = new APIRest;
        var __From__ = "",
            __Set__ = "",
            __Count__ = 1,
            __Where__ = [],
            __Parameters__ = [],
            __Query__ = "";
        __From__ = QuerySQLUpdate.From.trim();
        Object.entries(QuerySQLUpdate.Set).forEach(([Field, Value]) => {
            if (Value.startsWith('::')) {
                __Set__ += '"' + Field + '" = ' + (!QuerySQLUpdate.PrintDebugScript ? '$' + __Count__ : "'" + Value.replaceAll(/::/gi, '') + "'") + ', ';
                __Parameters__.push(Value.replaceAll(/::/gi, ''));
            } else {
                __Set__ += '"' + Field + '" = ' + (!QuerySQLUpdate.PrintDebugScript ? '$' + __Count__ : "'" + Value + "'") + ', ';
                __Parameters__.push(Value);
            }
            __Count__++;
        });
        __Set__ = __Set__.substring(0, (__Set__.length - 2));
        QuerySQLUpdate.Where.forEach(Where => {
            __Where__ += ' ' + Where.logicoperator + ' "' + Where.field + '" ' + Where.operator + ' ' + "'" + Where.value + "'";
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
        const ConnectionServerUpdate = new postgresql.Pool(GlobalVariables.Services.DataCenter.PoolSettingsConnection);
        ConnectionServerUpdate.connect((ErrorConnectionServerUpdate) => {
            if (ErrorConnectionServerUpdate) {
                ConnectionServerUpdate.end();
                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorConnectionServerUpdate</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorConnectionServerUpdate.name + '</b></code></li><li>Code: <code><b>' + ErrorConnectionServerUpdate.code + '</b></code></li><li>Message: <code><b>' + ErrorConnectionServerUpdate.message + '</b></code></li><li>Original Error: <code><b>' + ErrorConnectionServerUpdate.stack + '</b></code></li></ul>');
            }
            ConnectionServerUpdate.query('BEGIN', (ErrorTransactionBeginUpdate) => {
                if (ErrorTransactionBeginUpdate) {
                    ConnectionServerUpdate.query('ROLLBACK', (ErrorRollBackUpdate) => {
                        if (ErrorRollBackUpdate) {
                            ConnectionServerUpdate.end();
                            return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorRollBackUpdate</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorRollBackUpdate.name + '</b></code></li><li>Code: <code><b>' + ErrorRollBackUpdate.code + '</b></code></li><li>Message: <code><b>' + ErrorRollBackUpdate.message + '</b></code></li><li>Original Error: <code><b>' + ErrorRollBackUpdate.stack + '</b></code></li></ul>');
                        }
                    });
                    ConnectionServerUpdate.end();
                    return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorTransactionBeginUpdate</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorTransactionBeginUpdate.name + '</b></code></li><li>Code: <code><b>' + ErrorTransactionBeginUpdate.code + '</b></code></li><li>Message: <code><b>' + ErrorTransactionBeginUpdate.message + '</b></code></li><li>Original Error: <code><b>' + ErrorTransactionBeginUpdate.stack + '</b></code></li></ul>');
                }
                ConnectionServerUpdate.query(__Query__, __Parameters__, (ErrorExecuteQueryUpdate, ResultsExecuteQueryUpdate) => {
                    if (ErrorExecuteQueryUpdate) {
                        ConnectionServerUpdate.query('ROLLBACK', (ErrorRollBackUpdate) => {
                            if (ErrorRollBackUpdate) {
                                ConnectionServerUpdate.end();
                                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorRollBackUpdate</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorRollBackUpdate.name + '</b></code></li><li>Code: <code><b>' + ErrorRollBackUpdate.code + '</b></code></li><li>Message: <code><b>' + ErrorRollBackUpdate.message + '</b></code></li><li>Original Error: <code><b>' + ErrorRollBackUpdate.stack + '</b></code></li></ul>');
                            }
                        });
                        ConnectionServerUpdate.end();
                        return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorExecuteQueryUpdate</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorExecuteQueryUpdate.name + '</b></code></li><li>Code: <code><b>' + ErrorExecuteQueryUpdate.code + '</b></code></li><li>Message: <code><b>' + ErrorExecuteQueryUpdate.message + '</b></code></li><li>Original Error: <code><b>' + ErrorExecuteQueryUpdate.stack + '</b></code></li></ul>');
                    }
                    ConnectionServerUpdate.query('COMMIT', (ErrorCommitTransactionUpdate) => {
                        if (ErrorCommitTransactionUpdate) {
                            ConnectionServerUpdate.end();
                            return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorCommitTransactionUpdate</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorCommitTransactionUpdate.name + '</b></code></li><li>Code: <code><b>' + ErrorCommitTransactionUpdate.code + '</b></code></li><li>Message: <code><b>' + ErrorCommitTransactionUpdate.message + '</b></code></li><li>Original Error: <code><b>' + ErrorCommitTransactionUpdate.stack + '</b></code></li></ul>');
                        }
                        ConnectionServerUpdate.end();
                        CallBackSQLUpdateResults(ResultsExecuteQueryUpdate);
                    });
                });
            });
        });
    };
    Delete = (QuerySQLDelete, CallBackSQLDeleteResults) => {
        const Core = new APIRest;
        var __From__ = "",
            __Count__ = 1,
            __Where__ = [],
            __Parameters__ = [],
            __Query__ = "";
        __From__ = QuerySQLDelete.From.trim();
        QuerySQLDelete.Where.forEach(Where => {
            __Where__ += ' ' + Where.logicoperator + ' "' + Where.field + '" ' + Where.operator + ' ' + (!QuerySQLDelete.PrintDebugScript ? ('$' + __Count__) : ("'" + Where.value + "'"));
            __Parameters__.push(Where.value);
        });
        __Query__ = ("DELETE FROM " + __From__ + " WHERE (1 = 1)" + __Where__).trim();
        if (QuerySQLDelete.PrintDebugScript) {
            return Core.Response.Json(200, 'OK', 'AppDebug', '<code>/* Consulta ' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | DELETE | Print Debug Script */<br/>' + __Query__ + '<br/>/* End Script */</code>');
        }
        const ConnectionServerDelete = new postgresql.Pool(GlobalVariables.Services.DataCenter.PoolSettingsConnection);
        ConnectionServerDelete.connect((ErrorConnectionServerDelete) => {
            if (ErrorConnectionServerDelete) {
                ConnectionServerDelete.end();
                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorConnectionServerDelete</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorConnectionServerDelete.name + '</b></code></li><li>Code: <code><b>' + ErrorConnectionServerDelete.code + '</b></code></li><li>Message: <code><b>' + ErrorConnectionServerDelete.message + '</b></code></li><li>Original Error: <code><b>' + ErrorConnectionServerDelete.stack + '</b></code></li></ul>');
            }
            ConnectionServerDelete.query('BEGIN', (ErrorTransactionBeginDelete) => {
                if (ErrorTransactionBeginDelete) {
                    ConnectionServerDelete.query('ROLLBACK', (ErrorRollBackDelete) => {
                        if (ErrorRollBackDelete) {
                            ConnectionServerDelete.end();
                            return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorRollBackDelete</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorRollBackDelete.name + '</b></code></li><li>Code: <code><b>' + ErrorRollBackDelete.code + '</b></code></li><li>Message: <code><b>' + ErrorRollBackDelete.message + '</b></code></li><li>Original Error: <code><b>' + ErrorRollBackDelete.stack + '</b></code></li></ul>');
                        }
                    });
                    ConnectionServerDelete.end();
                    return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorTransactionBeginDelete</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorTransactionBeginDelete.name + '</b></code></li><li>Code: <code><b>' + ErrorTransactionBeginDelete.code + '</b></code></li><li>Message: <code><b>' + ErrorTransactionBeginDelete.message + '</b></code></li><li>Original Error: <code><b>' + ErrorTransactionBeginDelete.stack + '</b></code></li></ul>');
                }
                ConnectionServerDelete.query(__Query__, __Parameters__, (ErrorExecuteQueryDelete, ResultsExecuteQueryDelete) => {
                    if (ErrorExecuteQueryDelete) {
                        ConnectionServerDelete.query('ROLLBACK', (ErrorRollBackDelete) => {
                            if (ErrorRollBackDelete) {
                                ConnectionServerDelete.end();
                                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorRollBackDelete</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorRollBackDelete.name + '</b></code></li><li>Code: <code><b>' + ErrorRollBackDelete.code + '</b></code></li><li>Message: <code><b>' + ErrorRollBackDelete.message + '</b></code></li><li>Original Error: <code><b>' + ErrorRollBackDelete.stack + '</b></code></li></ul>');
                            }
                        });
                        ConnectionServerDelete.end();
                        return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorExecuteQueryDelete</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorExecuteQueryDelete.name + '</b></code></li><li>Code: <code><b>' + ErrorExecuteQueryDelete.code + '</b></code></li><li>Message: <code><b>' + ErrorExecuteQueryDelete.message + '</b></code></li><li>Original Error: <code><b>' + ErrorExecuteQueryDelete.stack + '</b></code></li></ul>');
                    }
                    ConnectionServerDelete.query('COMMIT', (ErrorCommitTransactionDelete) => {
                        if (ErrorCommitTransactionDelete) {
                            ConnectionServerDelete.end();
                            return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorCommitTransactionDelete</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorCommitTransactionDelete.name + '</b></code></li><li>Code: <code><b>' + ErrorCommitTransactionDelete.code + '</b></code></li><li>Message: <code><b>' + ErrorCommitTransactionDelete.message + '</b></code></li><li>Original Error: <code><b>' + ErrorCommitTransactionDelete.stack + '</b></code></li></ul>');
                        }
                        ConnectionServerDelete.end();
                        CallBackSQLDeleteResults(ResultsExecuteQueryDelete);
                    });
                });
            });
        });
    };
};
