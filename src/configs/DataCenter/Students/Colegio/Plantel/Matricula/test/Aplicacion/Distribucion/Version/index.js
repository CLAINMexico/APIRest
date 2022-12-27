// Importación de Librerias Principales
import { StaticsVariables, GlobalVariables, APIRest } from "../../../../../../../../../../helpers";
import * as DriverMicrosoftSQL from "../../../../../../../../../../helpers/drivers/MicrosoftSQL";
import * as DriverMySQL from "../../../../../../../../../../helpers/drivers/MySQL";
import * as DriverPostgreSQL from "../../../../../../../../../../helpers/drivers/PostgreSQL";

// Declaración de Instancia | Exportación Global | Controlador de Módulo
export const Controller = () => {
    const Core = new APIRest;
    switch (GlobalVariables.Request.Properties.Method) {
        case 'GET':
            var Select, From, Alias, Joins, Where, OrderBy, GroupBy, Having, PrintDebugScript, QuerySQLSelect;
            Select = ["*"];
            Alias = '';
            if (GlobalVariables.Request.Headers.Services.DataBase.Complements.From !== null) {
                Alias = GlobalVariables.Request.Headers.Services.DataBase.Complements.From;
            }
            if (Array.isArray(GlobalVariables.Request.Headers.Services.DataBase.Complements.Select)) {
                Select = [];
                GlobalVariables.Request.Headers.Services.DataBase.Complements.Select.forEach(Field => {
                    if (Field !== '') {
                        switch (GlobalVariables.Services.DataCenter.SettingsConnection.Driver) {
                            case 'MicrosoftSQL':
                                Select.push((Alias !== '' ? (Alias + '.') : '') + Field);
                                break;
                            case 'MySQL':
                                Select.push((Alias !== '' ? (Alias + '.') : '') + Field);
                                break;
                            case 'PostgreSQL':
                                Select.push((Alias !== '' ? (Alias + '."' + Field + '"') : '"' + Field + '"'));
                                break;
                        }
                    }
                });
            }
            Joins = null;
            if (Array.isArray(GlobalVariables.Request.Headers.Services.DataBase.Complements.Joins)) {
                Joins = [];
                GlobalVariables.Request.Headers.Services.DataBase.Complements.Joins.forEach(Join => {
                    Joins.push(Join);
                });
            }
            Where = null;
            OrderBy = GlobalVariables.Request.Headers.Services.DataBase.Complements.OrderBy !== null ? GlobalVariables.Request.Headers.Services.DataBase.Complements.OrderBy : '';
            GroupBy = GlobalVariables.Request.Headers.Services.DataBase.Complements.GroupBy !== null ? GlobalVariables.Request.Headers.Services.DataBase.Complements.GroupBy : '';
            Having = GlobalVariables.Request.Headers.Services.DataBase.Complements.Having !== null ? GlobalVariables.Request.Headers.Services.DataBase.Complements.Having : '';
            PrintDebugScript = GlobalVariables.Request.Headers.Services.DataBase.Complements.PrintDebugScript;
            switch (GlobalVariables.Services.DataCenter.SettingsConnection.Driver) {
                case 'MicrosoftSQL':
                    const MicrosoftSQL = new DriverMicrosoftSQL.MicrosoftSQL;
                    From = GlobalVariables.Services.DataCenter.SettingsConnection.DataBase + '..' + GlobalVariables.Services.DataCenter.SettingsConnection.Table + (Alias !== '' ? (' AS ' + Alias) : '');
                    if (GlobalVariables.Request.Parameters !== null) {
                        Where = [];
                        var ParametersURL = GlobalVariables.Request.Parameters.replace('?', '').split('&');
                        ParametersURL.forEach(ParameterURL => {
                            var PropertiesParameterURL = ParameterURL.split('=');
                            var field = (Alias !== '' ? (Alias + '.') : '') + PropertiesParameterURL[0],
                                value = PropertiesParameterURL[1];
                            Where.push({ logicoperator: 'AND', field: field, operator: "=", value: "'" + value + "'" });
                        });
                    }
                    if (GlobalVariables.Request.Properties.Conditional === '') {
                        QuerySQLSelect = { Select: Select, From: From, Joins: Joins, Where: Where, OrderBy: OrderBy, GroupBy: GroupBy, Having: Having, PrintDebugScript: PrintDebugScript };
                        MicrosoftSQL.Select(QuerySQLSelect, (ResultsExecuteQuerySelect) => {
                            return Core.Response.Json(200, 'OK', 'AppSuccess', ResultsExecuteQuerySelect.recordset);
                        });
                    } else {
                        Core.DataBase.Instance.GetData.Schemes.Fields(GlobalVariables.Services.DataCenter.SettingsConnection.Table, null, (ResultsExecuteQuerySelect) => {
                            if (!ResultsExecuteQuerySelect.includes(GlobalVariables.Request.Headers.Services.DataBase.Complements.Where[0].field)) {
                                return Core.Response.Json(404, 'Not Found', 'AppError', 'No es posible utilizar la propiedad <code><b><i>Conditional - \'' + GlobalVariables.Request.Properties.Conditional + '\'</i></b></code> dentro de la petición, ya que no se encuentra el <code><b><i>Campo - ' + (Alias !== '' ? (Alias + '.') : '') + GlobalVariables.Request.Headers.Services.DataBase.Complements.Where[0].field + '</i></b></code> dentro del esquema de campos pertenecientes al <code><b><i>Recurso - ' + GlobalVariables.Services.DataCenter.SettingsConnection.Table + '</i></b></code>, ponte en contacto con un administrador para poder continuar.');
                            }
                            if (!Array.isArray(Where)) {
                                Where = [];
                            }
                            Where.push({ logicoperator: GlobalVariables.Request.Headers.Services.DataBase.Complements.Where[0].logicoperator, field: (Alias !== '' ? (Alias + '.') : '') + GlobalVariables.Request.Headers.Services.DataBase.Complements.Where[0].field, operator: GlobalVariables.Request.Headers.Services.DataBase.Complements.Where[0].operator, value: "'" + GlobalVariables.Request.Properties.Conditional + "'" });
                            QuerySQLSelect = { Select: Select, From: From, Joins: Joins, Where: Where, OrderBy: OrderBy, GroupBy: GroupBy, Having: Having, PrintDebugScript: PrintDebugScript };
                            MicrosoftSQL.Select(QuerySQLSelect, (ResultsExecuteQuerySelect) => {
                                return Core.Response.Json(200, 'OK', 'AppSuccess', ResultsExecuteQuerySelect.recordset);
                            });
                        });
                    }
                    break;
                case 'MySQL':
                    const MySQL = new DriverMySQL.MySQL;
                    From = GlobalVariables.Services.DataCenter.SettingsConnection.DataBase + '.' + GlobalVariables.Services.DataCenter.SettingsConnection.Table + (Alias !== '' ? (' AS ' + Alias) : '');
                    if (GlobalVariables.Request.Parameters !== null) {
                        Where = [];
                        var ParametersURL = GlobalVariables.Request.Parameters.replace('?', '').split('&');
                        ParametersURL.forEach(ParameterURL => {
                            var PropertiesParameterURL = ParameterURL.split('=');
                            var field = (Alias !== '' ? (Alias + '.') : '') + PropertiesParameterURL[0],
                                value = PropertiesParameterURL[1];
                            Where.push({ logicoperator: 'AND', field: field, operator: "=", value: "'" + value + "'" });
                        });
                    }
                    if (GlobalVariables.Request.Properties.Conditional === '') {
                        QuerySQLSelect = { Select: Select, From: From, Joins: Joins, Where: Where, OrderBy: OrderBy, GroupBy: GroupBy, Having: Having, PrintDebugScript: PrintDebugScript };
                        MySQL.Select(QuerySQLSelect, (ResultsExecuteQuerySelect) => {
                            return Core.Response.Json(200, 'OK', 'AppSuccess', ResultsExecuteQuerySelect);
                        });
                    } else {
                        Core.DataBase.Instance.GetData.Schemes.Fields(GlobalVariables.Services.DataCenter.SettingsConnection.Table, null, (ResultsExecuteQuerySelect) => {
                            if (!ResultsExecuteQuerySelect.includes(GlobalVariables.Request.Headers.Services.DataBase.Complements.Where[0].field)) {
                                return Core.Response.Json(404, 'Not Found', 'AppError', 'No es posible utilizar la propiedad <code><b><i>Conditional - \'' + GlobalVariables.Request.Properties.Conditional + '\'</i></b></code> dentro de la petición, ya que no se encuentra el <code><b><i>Campo - ' + (Alias !== '' ? (Alias + '.') : '') + GlobalVariables.Request.Headers.Services.DataBase.Complements.Where[0].field + '</i></b></code> dentro del esquema de campos pertenecientes al <code><b><i>Recurso - ' + GlobalVariables.Services.DataCenter.SettingsConnection.Table + '</i></b></code>, ponte en contacto con un administrador para poder continuar.');
                            }
                            if (!Array.isArray(Where)) {
                                Where = [];
                            }
                            Where.push({ logicoperator: GlobalVariables.Request.Headers.Services.DataBase.Complements.Where[0].logicoperator, field: (Alias !== '' ? (Alias + '.') : '') + GlobalVariables.Request.Headers.Services.DataBase.Complements.Where[0].field, operator: GlobalVariables.Request.Headers.Services.DataBase.Complements.Where[0].operator, value: "'" + GlobalVariables.Request.Properties.Conditional + "'" });
                            QuerySQLSelect = { Select: Select, From: From, Joins: Joins, Where: Where, OrderBy: OrderBy, GroupBy: GroupBy, Having: Having, PrintDebugScript: PrintDebugScript };
                            MySQL.Select(QuerySQLSelect, (ResultsExecuteQuerySelect) => {
                                return Core.Response.Json(200, 'OK', 'AppSuccess', ResultsExecuteQuerySelect);
                            });
                        });
                    }
                    break;
                case 'PostgreSQL':
                    const PostgreSQL = new DriverPostgreSQL.PostgreSQL;
                    From = '"' + GlobalVariables.Services.DataCenter.SettingsConnection.Table + '"' + (Alias !== '' ? (' AS ' + Alias) : '');
                    if (GlobalVariables.Request.Parameters !== null) {
                        Where = [];
                        var ParametersURL = GlobalVariables.Request.Parameters.replace('?', '').split('&');
                        ParametersURL.forEach(ParameterURL => {
                            var PropertiesParameterURL = ParameterURL.split('=');
                            var field = (Alias !== '' ? (Alias + '.') : '') + '"' + PropertiesParameterURL[0] + '"',
                                value = PropertiesParameterURL[1];
                            Where.push({ logicoperator: 'AND', field: field, operator: "=", value: "'" + value + "'" });
                        });
                    }
                    if (GlobalVariables.Request.Properties.Conditional === '') {
                        QuerySQLSelect = { Select: Select, From: From, Joins: Joins, Where: Where, OrderBy: OrderBy, GroupBy: GroupBy, Having: Having, PrintDebugScript: PrintDebugScript };
                        PostgreSQL.Select(QuerySQLSelect, (ResultsExecuteQuerySelect) => {
                            return Core.Response.Json(200, 'OK', 'AppSuccess', ResultsExecuteQuerySelect);
                        });
                    } else {
                        Core.DataBase.Instance.GetData.Schemes.Fields(GlobalVariables.Services.DataCenter.SettingsConnection.Table, null, (ResultsExecuteQuerySelect) => {
                            if (!ResultsExecuteQuerySelect.includes(GlobalVariables.Request.Headers.Services.DataBase.Complements.Where[0].field)) {
                                return Core.Response.Json(404, 'Not Found', 'AppError', 'No es posible utilizar la propiedad <code><b><i>Conditional - \'' + GlobalVariables.Request.Properties.Conditional + '\'</i></b></code> dentro de la petición, ya que no se encuentra el <code><b><i>Campo - ' + (Alias !== '' ? (Alias + '.') : '') + GlobalVariables.Request.Headers.Services.DataBase.Complements.Where[0].field + '</i></b></code> dentro del esquema de campos pertenecientes al <code><b><i>Recurso - ' + GlobalVariables.Services.DataCenter.SettingsConnection.Table + '</i></b></code>, ponte en contacto con un administrador para poder continuar.');
                            }
                            if (!Array.isArray(Where)) {
                                Where = [];
                            }
                            Where.push({ logicoperator: GlobalVariables.Request.Headers.Services.DataBase.Complements.Where[0].logicoperator, field: (Alias !== '' ? (Alias + '."' + GlobalVariables.Request.Headers.Services.DataBase.Complements.Where[0].field + '"') : ('"' + GlobalVariables.Request.Headers.Services.DataBase.Complements.Where[0].field + '"')), operator: GlobalVariables.Request.Headers.Services.DataBase.Complements.Where[0].operator, value: "'" + GlobalVariables.Request.Properties.Conditional + "'" });
                            OrderBy = ((OrderBy !== '') ? (((Alias !== '') ? (OrderBy.replaceAll(/{{ALIAS.}}/gi, Alias + '.')) : ('"' + OrderBy + '"'))) : (''));
                            GroupBy = ((GroupBy !== '') ? (((Alias !== '') ? (GroupBy.replaceAll(/{{ALIAS.}}/gi, Alias + '.')) : ('"' + GroupBy + '"'))) : (''));
                            Having = ((Having !== '') ? (((Alias !== '') ? (Having.replaceAll(/{{ALIAS.}}/gi, Alias + '.')) : ('"' + Having + '"'))) : (''));
                            QuerySQLSelect = { Select: Select, From: From, Joins: Joins, Where: Where, OrderBy: OrderBy, GroupBy: GroupBy, Having: Having, PrintDebugScript: PrintDebugScript };
                            PostgreSQL.Select(QuerySQLSelect, (ResultsExecuteQuerySelect) => {
                                return Core.Response.Json(200, 'OK', 'AppSuccess', ResultsExecuteQuerySelect);
                            });
                        });
                    }
                    break;
            }
            break;
        case 'POST':
            var From, Fields, Values, PrintDebugScript, QuerySQLInsert;
            if (!Array.isArray(GlobalVariables.Request.Body)) {
                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'No es posible continuar con la petición solicitada ya que no se encuentra la estructura valida en el <code><b><i>Body</i></b></code>, por favor consulta la documentación oficial de <a href="https://github.com/CLAINMexico/APIRest/wiki"><b><i>APIRest - Developer Edition</i></b></a> para poder continuar.');
            }
            Fields = [];
            GlobalVariables.Request.Body.forEach(Registro => {
                Fields.push(Object.keys(Registro));
            });
            PrintDebugScript = GlobalVariables.Request.Headers.Services.DataBase.Complements.PrintDebugScript;
            Core.DataBase.Instance.GetData.Schemes.Fields(GlobalVariables.Services.DataCenter.SettingsConnection.Table, Fields, () => {
                GlobalVariables.Request.Body.forEach((Registro, Index) => {
                    Fields = Object.keys(Registro);
                    Values = Object.values(Registro);
                    if ((Index + 1) === GlobalVariables.Request.Body.length) {
                        GlobalVariables.Services.DataCenter.LastRegistrationProcess = true;
                    }
                    switch (GlobalVariables.Services.DataCenter.SettingsConnection.Driver) {
                        case 'MicrosoftSQL': From = GlobalVariables.Services.DataCenter.SettingsConnection.DataBase + '..' + GlobalVariables.Services.DataCenter.SettingsConnection.Table; break;
                        case 'MySQL': From = GlobalVariables.Services.DataCenter.SettingsConnection.DataBase + '.' + GlobalVariables.Services.DataCenter.SettingsConnection.Table; break;
                        case 'PostgreSQL': From = '"' + GlobalVariables.Services.DataCenter.SettingsConnection.Table + '"'; break;
                    }
                    switch (GlobalVariables.Services.DataCenter.SettingsConnection.Driver) {
                        case 'MicrosoftSQL':
                            const MicrosoftSQL = new DriverMicrosoftSQL.MicrosoftSQL;
                            QuerySQLInsert = { From: From, Fields: Fields, Values: Values, PrintDebugScript: PrintDebugScript };
                            MicrosoftSQL.Insert(QuerySQLInsert, (ResultsExecuteQueryInsert) => {
                                if ((Index + 1) === GlobalVariables.Request.Body.length) {
                                    return Core.Response.Json(200, 'OK', 'AppSuccess', 'Registro(s) creado(s) exitosamente dentro del <code><b>Recurso - ' + GlobalVariables.Request.Properties.Resource + '</b></code>.');
                                }
                            });
                            break;
                        case 'MySQL':
                            const MySQL = new DriverMySQL.MySQL;
                            QuerySQLInsert = { From: From, Fields: Fields, Values: Values, PrintDebugScript: PrintDebugScript };
                            MySQL.Insert(QuerySQLInsert, (ResultsExecuteQueryInsert) => {
                                if ((Index + 1) === GlobalVariables.Request.Body.length) {
                                    return Core.Response.Json(200, 'OK', 'AppSuccess', 'Registro(s) creado(s) exitosamente dentro del <code><b>Recurso - ' + GlobalVariables.Request.Properties.Resource + '</b></code>.');
                                }
                            });
                            break;
                        case 'PostgreSQL':
                            const PostgreSQL = new DriverPostgreSQL.PostgreSQL;
                            QuerySQLInsert = { From: From, Fields: Fields, Values: Values, PrintDebugScript: PrintDebugScript };
                            PostgreSQL.Insert(QuerySQLInsert, (ResultsExecuteQueryInsert) => {
                                if ((Index + 1) === GlobalVariables.Request.Body.length) {
                                    return Core.Response.Json(200, 'OK', 'AppSuccess', 'Registro(s) creado(s) exitosamente dentro del <code><b>Recurso - ' + GlobalVariables.Request.Properties.Resource + '</b></code>.');
                                }
                            });
                            break;
                    }
                });
            });
            break;
        case 'PUT':
            var From, Fields, Set, Where, PrintDebugScript, QuerySQLUpdate;
            if (!Array.isArray(GlobalVariables.Request.Body)) {
                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'No es posible continuar con la petición solicitada ya que no se encuentra la estructura valida en el <code><b><i>Body</i></b></code>, por favor consulta la documentación oficial de <a href="https://github.com/CLAINMexico/APIRest/wiki"><b><i>APIRest - Developer Edition</i></b></a> para poder continuar.');
            }
            Fields = [];
            GlobalVariables.Request.Body.forEach(Registro => {
                Fields.push(Object.keys(Registro));
            });
            GlobalVariables.Request.Headers.Services.DataBase.Complements.Where[0].value = GlobalVariables.Request.Properties.Conditional;
            Where = GlobalVariables.Request.Headers.Services.DataBase.Complements.Where;
            PrintDebugScript = GlobalVariables.Request.Headers.Services.DataBase.Complements.PrintDebugScript;
            Core.DataBase.Instance.GetData.Schemes.Fields(GlobalVariables.Services.DataCenter.SettingsConnection.Table, Fields, () => {
                GlobalVariables.Request.Body.forEach((Registro, Index) => {
                    Set = Registro;
                    if ((Index + 1) === GlobalVariables.Request.Body.length) {
                        GlobalVariables.Services.DataCenter.LastRegistrationProcess = true;
                    }
                    switch (GlobalVariables.Services.DataCenter.SettingsConnection.Driver) {
                        case 'MicrosoftSQL': From = GlobalVariables.Services.DataCenter.SettingsConnection.DataBase + '..' + GlobalVariables.Services.DataCenter.SettingsConnection.Table; break;
                        case 'MySQL': From = GlobalVariables.Services.DataCenter.SettingsConnection.DataBase + '.' + GlobalVariables.Services.DataCenter.SettingsConnection.Table; break;
                        case 'PostgreSQL': From = '"' + GlobalVariables.Services.DataCenter.SettingsConnection.Table + '"'; break;
                    }
                    switch (GlobalVariables.Services.DataCenter.SettingsConnection.Driver) {
                        case 'MicrosoftSQL':
                            const MicrosoftSQL = new DriverMicrosoftSQL.MicrosoftSQL;
                            QuerySQLUpdate = { From: From, Set: Set, Where: Where, PrintDebugScript: PrintDebugScript };
                            MicrosoftSQL.Update(QuerySQLUpdate, (ResultsExecuteQueryUpdate) => {
                                if ((Index + 1) === GlobalVariables.Request.Body.length) {
                                    return Core.Response.Json(200, 'OK', 'AppSuccess', 'Registro(s) actualizado(s) exitosamente dentro del <code><b>Recurso - ' + GlobalVariables.Request.Properties.Resource + '</b></code>.');
                                }
                            });
                            break;
                        case 'MySQL':
                            const MySQL = new DriverMySQL.MySQL;
                            QuerySQLUpdate = { From: From, Set: Set, Where: Where, PrintDebugScript: PrintDebugScript };
                            MySQL.Update(QuerySQLUpdate, (ResultsExecuteQueryUpdate) => {
                                if ((Index + 1) === GlobalVariables.Request.Body.length) {
                                    return Core.Response.Json(200, 'OK', 'AppSuccess', 'Registro(s) actualizado(s) exitosamente dentro del <code><b>Recurso - ' + GlobalVariables.Request.Properties.Resource + '</b></code>.');
                                }
                            });
                            break;
                        case 'PostgreSQL':
                            const PostgreSQL = new DriverPostgreSQL.PostgreSQL;
                            QuerySQLUpdate = { From: From, Set: Set, Where: Where, PrintDebugScript: PrintDebugScript };
                            PostgreSQL.Update(QuerySQLUpdate, (ResultsExecuteQueryUpdate) => {
                                if ((Index + 1) === GlobalVariables.Request.Body.length) {
                                    return Core.Response.Json(200, 'OK', 'AppSuccess', 'Registro(s) actualizado(s) exitosamente dentro del <code><b>Recurso - ' + GlobalVariables.Request.Properties.Resource + '</b></code>.');
                                }
                            });
                            break;
                    }
                });
            });
            break;
        case 'DELETE':
            var From, Where, PrintDebugScript, QuerySQLDelete;
            if (GlobalVariables.Request.Properties.Conditional === '') {
                return Core.Response.Json(500, 'Internal Server Error', 'AppError', 'No es posible continuar con la petición solicitada ya que no se encuentra la estructura valida en el <code><b><i>Condicional</i></b></code>, por favor consulta la documentación oficial de <a href="https://github.com/CLAINMexico/APIRest/wiki"><b><i>APIRest - Developer Edition</i></b></a> para poder continuar.');
            }
            GlobalVariables.Request.Headers.Services.DataBase.Complements.Where[0].value = GlobalVariables.Request.Properties.Conditional;
            Where = GlobalVariables.Request.Headers.Services.DataBase.Complements.Where;
            PrintDebugScript = GlobalVariables.Request.Headers.Services.DataBase.Complements.PrintDebugScript;
            switch (GlobalVariables.Services.DataCenter.SettingsConnection.Driver) {
                case 'MicrosoftSQL': From = GlobalVariables.Services.DataCenter.SettingsConnection.DataBase + '..' + GlobalVariables.Services.DataCenter.SettingsConnection.Table; break;
                case 'MySQL': From = GlobalVariables.Services.DataCenter.SettingsConnection.DataBase + '.' + GlobalVariables.Services.DataCenter.SettingsConnection.Table; break;
                case 'PostgreSQL': From = '"' + GlobalVariables.Services.DataCenter.SettingsConnection.Table + '"'; break;
            }
            switch (GlobalVariables.Services.DataCenter.SettingsConnection.Driver) {
                case 'MicrosoftSQL':
                    const MicrosoftSQL = new DriverMicrosoftSQL.MicrosoftSQL;
                    QuerySQLDelete = { From: From, Where: Where, PrintDebugScript: PrintDebugScript };
                    MicrosoftSQL.Delete(QuerySQLDelete, (ResultsExecuteQueryDelete) => {
                        return Core.Response.Json(200, 'OK', 'AppSuccess', 'Registro(s) eliminado(s) exitosamente dentro del <code><b>Recurso - ' + GlobalVariables.Request.Properties.Resource + '</b></code>.');
                    });
                    break;
                case 'MySQL':
                    const MySQL = new DriverMySQL.MySQL;
                    QuerySQLDelete = { From: From, Where: Where, PrintDebugScript: PrintDebugScript };
                    MySQL.Delete(QuerySQLDelete, (ResultsExecuteQueryDelete) => {
                        return Core.Response.Json(200, 'OK', 'AppSuccess', 'Registro(s) eliminado(s) exitosamente dentro del <code><b>Recurso - ' + GlobalVariables.Request.Properties.Resource + '</b></code>.');
                    });
                    break;
                case 'PostgreSQL':
                    const PostgreSQL = new DriverPostgreSQL.PostgreSQL;
                    QuerySQLDelete = { From: From, Where: Where, PrintDebugScript: PrintDebugScript };
                    PostgreSQL.Delete(QuerySQLDelete, (ResultsExecuteQueryDelete) => {
                        return Core.Response.Json(200, 'OK', 'AppSuccess', 'Registro(s) eliminado(s) exitosamente dentro del <code><b>Recurso - ' + GlobalVariables.Request.Properties.Resource + '</b></code>.');
                    });
                    break;
            }
            break;
    }
};
