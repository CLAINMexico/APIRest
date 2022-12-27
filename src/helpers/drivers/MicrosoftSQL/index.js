// Importación de Librerias Principales
import { StaticsVariables, GlobalVariables, APIRest } from "../../";

// Importación de Librerias Secundarias (Dependencias del Proyecto)
import sql from "mssql";

// Declaración de Clase | Exportación Global | MicrosoftSQL
export class MicrosoftSQL {
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
        const ConnectionServerSelect = new sql.ConnectionPool(GlobalVariables.Services.DataCenter.PoolSettingsConnection);
        ConnectionServerSelect.connect((ErrorConnectionServerSelect) => {
            if (ErrorConnectionServerSelect) {
                ConnectionServerSelect.close();
                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorConnectionServerSelect</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorConnectionServerSelect.name + '</b></code></li><li>Code: <code><b>' + ErrorConnectionServerSelect.code + '</b></code></li><li>Message: <code><b>' + ErrorConnectionServerSelect.message + '</b></code></li><li>Original Error: <code><b>' + ErrorConnectionServerSelect.originalError + '</b></code></li></ul>');
            }
            ConnectionServerSelect.query(__Query__, (ErrorExecuteQuerySelect, ResultsExecuteQuerySelect) => {
                if (ErrorExecuteQuerySelect) {
                    ConnectionServerSelect.close();
                    return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorExecuteQuerySelect</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorExecuteQuerySelect.name + '</b></code></li><li>Code: <code><b>' + ErrorExecuteQuerySelect.code + '</b></code></li><li>Message: <code><b>' + ErrorExecuteQuerySelect.message + '</b></code></li><li>Original Error: <code><b>' + ErrorExecuteQuerySelect.originalError + '</b></code></li></ul>');
                }
                ConnectionServerSelect.close();
                ResultsExecuteQuerySelect.recordset = ResultsExecuteQuerySelect.recordset.length <= 0 ? 'No se encontraron resultados en la base de datos.' : ResultsExecuteQuerySelect.recordset;
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
            __Fields__ += Field + ', ';
        });
        __Fields__ = __Fields__.substring(0, (__Fields__.length - 2));
        QuerySQLInsert.Values.forEach(Value => {
            __Values__ += "'" + Value + "', ";
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
        const ConnectionServerInsert = new sql.ConnectionPool(GlobalVariables.Services.DataCenter.PoolSettingsConnection);
        ConnectionServerInsert.connect((ErrorConnectionServerInsert) => {
            if (ErrorConnectionServerInsert) {
                ConnectionServerInsert.close();
                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorConnectionServerInsert</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorConnectionServerInsert.name + '</b></code></li><li>Code: <code><b>' + ErrorConnectionServerInsert.code + '</b></code></li><li>Message: <code><b>' + ErrorConnectionServerInsert.message + '</b></code></li><li>Original Error: <code><b>' + ErrorConnectionServerInsert.originalError + '</b></code></li></ul>');
            }
            const TransactionSQLInsert = new sql.Transaction(ConnectionServerInsert);
            TransactionSQLInsert.begin((ErrorTransactionBeginInsert) => {
                if (ErrorTransactionBeginInsert) {
                    ConnectionServerInsert.close();
                    return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorTransactionBeginInsert</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorTransactionBeginInsert.name + '</b></code></li><li>Code: <code><b>' + ErrorTransactionBeginInsert.code + '</b></code></li><li>Message: <code><b>' + ErrorTransactionBeginInsert.message + '</b></code></li><li>Original Error: <code><b>' + ErrorTransactionBeginInsert.originalError + '</b></code></li></ul>');
                }
                let ControlErrorRolledBackInsert = false;
                TransactionSQLInsert.on('rollback', (ErrorAbortedTransactionRollBackInsert) => {
                    ControlErrorRolledBackInsert = true;
                });
                new sql.Request(TransactionSQLInsert).query(__Query__, (ErrorExecuteQueryInsert, ResultsExecuteQueryInsert) => {
                    if (ErrorExecuteQueryInsert && !ControlErrorRolledBackInsert) {
                        TransactionSQLInsert.rollback((ErrorRolledBackInsert = ErrorExecuteQueryInsert) => {
                            if (ErrorRolledBackInsert) {
                                ConnectionServerInsert.close();
                                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorRolledBackInsert</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorRolledBackInsert.name + '</b></code></li><li>Code: <code><b>' + ErrorRolledBackInsert.code + '</b></code></li><li>Message: <code><b>' + ErrorRolledBackInsert.message + '</b></code></li><li>Original Error: <code><b>' + ErrorRolledBackInsert.originalError + '</b></code></li></ul>');
                            }
                        });
                    } else {
                        TransactionSQLInsert.commit((ErrorCommitTransactionInsert = ErrorExecuteQueryInsert) => {
                            if (ErrorCommitTransactionInsert) {
                                ConnectionServerInsert.close();
                                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorCommitTransactionInsert</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorCommitTransactionInsert.name + '</b></code></li><li>Code: <code><b>' + ErrorCommitTransactionInsert.code + '</b></code></li><li>Message: <code><b>' + ErrorCommitTransactionInsert.message + '</b></code></li><li>Original Error: <code><b>' + ErrorCommitTransactionInsert.originalError + '</b></code></li></ul>');
                            }
                        });
                        ConnectionServerInsert.close();
                        CallBackSQLInsertResults(ResultsExecuteQueryInsert);
                    }
                });
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
            if (Value.startsWith('::')) {
                __Set__ += Field + ' = ' + Value.replaceAll(/::/gi, '') + ', ';
            } else {
                __Set__ += Field + ' = \'' + Value + '\', ';
            }
        });
        __Set__ = __Set__.substring(0, (__Set__.length - 2));
        QuerySQLUpdate.Where.forEach(Where => {
            __Where__ += ' ' + Where.logicoperator + ' ' + Where.field + ' ' + Where.operator + (typeof Where.value === 'string' ? ' \'' + Where.value + '\'' : ' ' + Where.value);
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
        const ConnectionServerUpdate = new sql.ConnectionPool(GlobalVariables.Services.DataCenter.PoolSettingsConnection);
        ConnectionServerUpdate.connect((ErrorConnectionServerUpdate) => {
            if (ErrorConnectionServerUpdate) {
                ConnectionServerUpdate.close();
                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorConnectionServerUpdate</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorConnectionServerUpdate.name + '</b></code></li><li>Code: <code><b>' + ErrorConnectionServerUpdate.code + '</b></code></li><li>Message: <code><b>' + ErrorConnectionServerUpdate.message + '</b></code></li><li>Original Error: <code><b>' + ErrorConnectionServerUpdate.originalError + '</b></code></li></ul>');
            }
            const TransactionSQLUpdate = new sql.Transaction(ConnectionServerUpdate);
            TransactionSQLUpdate.begin((ErrorTransactionBeginUpdate) => {
                if (ErrorTransactionBeginUpdate) {
                    ConnectionServerUpdate.close();
                    return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorTransactionBeginUpdate</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorTransactionBeginUpdate.name + '</b></code></li><li>Code: <code><b>' + ErrorTransactionBeginUpdate.code + '</b></code></li><li>Message: <code><b>' + ErrorTransactionBeginUpdate.message + '</b></code></li><li>Original Error: <code><b>' + ErrorTransactionBeginUpdate.originalError + '</b></code></li></ul>');
                }
                let ControlErrorRolledBackUpdate = false;
                TransactionSQLUpdate.on('rollback', (ErrorAbortedTransactionRollBackUpdate) => {
                    ControlErrorRolledBackUpdate = true;
                });
                new sql.Request(TransactionSQLUpdate).query(__Query__, (ErrorExecuteQueryUpdate, ResultsExecuteQueryUpdate) => {
                    if (ErrorExecuteQueryUpdate && !ControlErrorRolledBackUpdate) {
                        TransactionSQLUpdate.rollback((ErrorRolledBackUpdate = ErrorExecuteQueryUpdate) => {
                            if (ErrorRolledBackUpdate) {
                                ConnectionServerUpdate.close();
                                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorRolledBackUpdate</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorRolledBackUpdate.name + '</b></code></li><li>Code: <code><b>' + ErrorRolledBackUpdate.code + '</b></code></li><li>Message: <code><b>' + ErrorRolledBackUpdate.message + '</b></code></li><li>Original Error: <code><b>' + ErrorRolledBackUpdate.originalError + '</b></code></li></ul>');
                            }
                        });
                    } else {
                        TransactionSQLUpdate.commit((ErrorCommitTransactionUpdate = ErrorExecuteQueryUpdate) => {
                            if (ErrorCommitTransactionUpdate) {
                                ConnectionServerUpdate.close();
                                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorCommitTransactionUpdate</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorCommitTransactionUpdate.name + '</b></code></li><li>Code: <code><b>' + ErrorCommitTransactionUpdate.code + '</b></code></li><li>Message: <code><b>' + ErrorCommitTransactionUpdate.message + '</b></code></li><li>Original Error: <code><b>' + ErrorCommitTransactionUpdate.originalError + '</b></code></li></ul>');
                            }
                        });
                        ConnectionServerUpdate.close();
                        CallBackSQLUpdateResults(ResultsExecuteQueryUpdate);
                    }
                });
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
            __Where__ += ' ' + Where.logicoperator + ' ' + Where.field + ' ' + Where.operator + (typeof Where.value === 'string' ? ' \'' + Where.value + '\'' : ' ' + Where.value);
        });
        __Query__ = ("DELETE FROM " + __From__ + " WHERE (1 = 1)" + __Where__).trim();
        if (QuerySQLDelete.PrintDebugScript) {
            return Core.Response.Json(200, 'OK', 'AppDebug', '<code>/* Consulta ' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | DELETE | Print Debug Script */<br/>' + __Query__ + '<br/>/* End Script */</code>');
        }
        const ConnectionServerDelete = new sql.ConnectionPool(GlobalVariables.Services.DataCenter.PoolSettingsConnection);
        ConnectionServerDelete.connect((ErrorConnectionServerDelete) => {
            if (ErrorConnectionServerDelete) {
                ConnectionServerDelete.close();
                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorConnectionServerDelete</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorConnectionServerDelete.name + '</b></code></li><li>Code: <code><b>' + ErrorConnectionServerDelete.code + '</b></code></li><li>Message: <code><b>' + ErrorConnectionServerDelete.message + '</b></code></li><li>Original Error: <code><b>' + ErrorConnectionServerDelete.originalError + '</b></code></li></ul>');
            }
            const TransactionSQLDelete = new sql.Transaction(ConnectionServerDelete);
            TransactionSQLDelete.begin((ErrorTransactionBeginDelete) => {
                if (ErrorTransactionBeginDelete) {
                    ConnectionServerDelete.close();
                    return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorTransactionBeginDelete</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorTransactionBeginDelete.name + '</b></code></li><li>Code: <code><b>' + ErrorTransactionBeginDelete.code + '</b></code></li><li>Message: <code><b>' + ErrorTransactionBeginDelete.message + '</b></code></li><li>Original Error: <code><b>' + ErrorTransactionBeginDelete.originalError + '</b></code></li></ul>');
                }
                let ControlErrorRolledBackDelete = false;
                TransactionSQLDelete.on('rollback', (ErrorAbortedTransactionRollBackDelete) => {
                    ControlErrorRolledBackDelete = true;
                });
                new sql.Request(TransactionSQLDelete).query(__Query__, (ErrorExecuteQueryDelete, ResultsExecuteQueryDelete) => {
                    if (ErrorExecuteQueryDelete && !ControlErrorRolledBackDelete) {
                        TransactionSQLDelete.rollback((ErrorRolledBackDelete = ErrorExecuteQueryDelete) => {
                            if (ErrorRolledBackDelete) {
                                ConnectionServerDelete.close();
                                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorRolledBackDelete</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorRolledBackDelete.name + '</b></code></li><li>Code: <code><b>' + ErrorRolledBackDelete.code + '</b></code></li><li>Message: <code><b>' + ErrorRolledBackDelete.message + '</b></code></li><li>Original Error: <code><b>' + ErrorRolledBackDelete.originalError + '</b></code></li></ul>');
                            }
                        });
                    } else {
                        TransactionSQLDelete.commit((ErrorCommitTransactionDelete = ErrorExecuteQueryDelete) => {
                            if (ErrorCommitTransactionDelete) {
                                ConnectionServerDelete.close();
                                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'Se presentó un error perteneciente al driver <code><b><i>' + GlobalVariables.Services.DataCenter.SettingsConnection.Driver + ' | ErrorCommitTransactionDelete</i></b></code>, ponte en contacto con el Administrador para poder continuar.<br/><h5>Catálogo de Errores</h5><ul><li>Name: <code><b>' + ErrorCommitTransactionDelete.name + '</b></code></li><li>Code: <code><b>' + ErrorCommitTransactionDelete.code + '</b></code></li><li>Message: <code><b>' + ErrorCommitTransactionDelete.message + '</b></code></li><li>Original Error: <code><b>' + ErrorCommitTransactionDelete.originalError + '</b></code></li></ul>');
                            }
                        });
                        ConnectionServerDelete.close();
                        CallBackSQLDeleteResults(ResultsExecuteQueryDelete);
                    }
                });
            });
        });
    };
};
