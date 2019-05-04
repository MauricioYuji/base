(function ($) {
    var yStorage = {
        set: function (key, value) {
            window.localStorage.setItem(key, JSON.stringify(value));
        },
        get: function (key) {
            try {
                return JSON.parse(window.localStorage.getItem(key));
            } catch (e) {
                return null;
            }
        }
    };
    function dbModel() {
        this.tables = {};
        this.data = {};
    };
    function tableModel() {
        this.fields = [];
        this.auto_increment = 0;
    };
    var currentDB;
    var dbName;
    $.fn.yStorage = function (options) {
        var settings = $.extend({
            dbName: "dbName",
            tables: {}
        }, options);
        dbName = settings.dbName;
        if ($(document).yStorage.existDB({ dbName: settings.dbName })) {
            currentDB = $(document).yStorage.getDB({
                dbName: settings.dbName
            });
        } else {
            var db = $(document).yStorage.CreateDB({
                dbName: settings.dbName
            });
            if (db.Erro)
                console.log(db.Msg);

            if (currentDB != null) {
                var keys = Object.keys(settings.tables);
                //for (var i = 0; i < Object.keys(settings.tables).length; i++) {
                var retorno = $(document).yStorage.CreateTable({
                    tableName: keys,
                    tableStructure: settings.tables
                });
                //}
            }
        }
        //console.log(currentDB);
    };

    $.fn.yStorage.Commit = function (options) {
        yStorage.set(dbName, currentDB);
    };
    $.fn.yStorage.Rollback = function (options) {
        currentDB = yStorage.get(dbName);
    };
    //CHECK BROWSER SUPPORT
    $.fn.yStorage.StorageSupport = function () {
        if (typeof (Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            alert("Supported!");
        } else {
            alert("Not Supported!");
            // Sorry! No Web Storage support..
        }

    };
    //DB FUNCTIONS
    $.fn.yStorage.CreateDB = function (options) {
        console.log("------CREATE DB-----");
        var settings = $.extend({
            dbName: "dbName"
        }, options);
        if (settings.dbName != "") {
            var getDB = $(document).yStorage.getDB({
                dbName: settings.dbName
            });
            if (getDB == null) {
                currentDB = new dbModel();
                $(document).yStorage.Commit();
                //yStorage.set(settings.dbName, dbModel);
                return { "Erro": false, "Msg": "Database criada com sucesso!" };
            } else {
                if (!getDB.Erro) {
                    return { "Erro": true, "Msg": "Database j� existente!" };
                } else {
                    return getDB.Msg;
                }
            }
        } else {
            return { "Erro": true, "Msg": "Informe a database que voc� procura!" };
        }
    };
    $.fn.yStorage.existDB = function (options) {

        var settings = $.extend({
            dbName: "dbName"
        }, options);

        var getDB = $(document).yStorage.getDB({
            dbName: settings.dbName
        });
        if (getDB != null) {
            return true;
        } else {
            return false;
        }
    };
    $.fn.yStorage.getDB = function (options) {
        console.log("------GET DB-----");
        var settings = $.extend({
            dbName: ""
        }, options);

        if (settings.dbName != "") {
            var retorno = yStorage.get(settings.dbName);
            if (retorno != "") {
                return retorno;
            } else {
                return { "Erro": true, "Msg": "Nenhuma database encontrada!" };
            }
        } else {
            return { "Erro": true, "Msg": "Nenhuma database foi selecionada!" };
        }
    };
    $.fn.yStorage.CreateTable = function (options) {
        console.log("------CREATE TABLE-----");
        var settings = $.extend({
            tableName: [],
            tableStructure: []
        }, options);
        if (!$(document).yStorage.existTable({ tableName: settings.tableName })) {
            var table = new Array(settings.tableName.length);
            for (var i = 0; i < settings.tableName.length; i++) {
                var model = new tableModel();
                model.auto_increment = 1;
                model.fields = Object.keys(settings.tableStructure[settings.tableName[i]]);
                currentDB.tables[settings.tableName[i]] = model;
                currentDB.data[settings.tableName[i]] = {};
            }
            $(document).yStorage.Commit();
        }

        return currentDB;
    };

    $.fn.yStorage.StructureTable = function (options) {
        console.log("------STRUCTURE TABLE-----");
        var settings = $.extend({
            tableName: [],
            tableStructure: []
        }, options);


        var model = new tableModel;
        model.fields = settings.tableStructure;
        model.auto_increment = 1;

        return model;
    };
    $.fn.yStorage.existTable = function (options) {

        var settings = $.extend({
            tableName: "tableName"
        }, options);
        var getTable = $(document).yStorage.getTable({
            tableName: settings.tableName
        });
        if (!getTable.Erro) {
            return true;
        } else {
            return false;
        }
    };
    $.fn.yStorage.getTable = function (options) {
        console.log("------GET TABLE-----");
        var settings = $.extend({
            tableName: ""
        }, options);

        if (settings.tableName != "") {
            var result = currentDB.tables[settings.tableName];
            if (result !== undefined) {
                return result;
            } else {
                return { "Erro": true, "Msg": "Tabela n�o existe" };
            }
        } else {
            return { "Erro": true, "Msg": "Nenhuma tabela foi selecionada!" };
        }
    };
    $.fn.yStorage.InsertData = function (options) {
        console.log("------INSERT INTO TABLE-----");
        var settings = $.extend({
            tableName: "",
            tableStructure: null,
            tableValues: []
        }, options);

        var getTable = $(document).yStorage.getTable({
            tableName: settings.tableName
        });
        if (!getTable.Erro) {

            for (var i = 0; i < settings.tableValues.length; i++) {
                if (settings.tableValues[i].length == Object.keys(settings.tableStructure).length - 1) {
                    var model = new tableModel();
                    model.auto_increment = 1;
                    model.fields = Object.keys(settings.tableStructure);
                    var table = new function () { };
                    for (var j = 0; j < model.fields.length; j++) {
                        table[model.fields[j]] = j == 0 ? currentDB.tables[settings.tableName].auto_increment : settings.tableValues[i][j - 1];
                        //console.log(model.fields[j]);
                        //console.log(keys[j]);
                    }
                    //console.log(table);
                    //console.log("-----------------------------------");
                    currentDB.data[settings.tableName][currentDB.tables[settings.tableName].auto_increment] = table;
                    currentDB.tables[settings.tableName].auto_increment++;
                } else {
                    return { "Erro": true, "Msg": "O n�mero de valores e de colunas n�o s�o iguais!" };
                }
            }
            $(document).yStorage.Commit();
            return getTable;
        } else {
            return getTable.Msg;
        }

    };

    $.fn.yStorage.UpdateData = function (options) {
        console.log("------UPDATE TABLE-----");
        var settings = $.extend({
            tableName: "",
            dataId: [0],
            tableStructure: null,
            tableValues: []
        }, options);

        for (var i = 0; i < settings.dataId.length; i++) {

            var getData = $(document).yStorage.GetData({ tableName: settings.tableName, dataId: settings.dataId });
            if (!getData.Erro) {
                var data = currentDB.data[settings.tableName][settings.dataId[i]];
                var keys = Object.keys(data);
                for (var j = 0; j < Object.keys(data).length - 1; j++) {
                    //console.log(keys[j]);
                    //console.log(data[keys[j]] + " - " + settings.tableValues[i][j + 1]);
                    //if (j != 0) {
                    //console.log(j);
                    //console.log(data);
                    //console.log(keys[j]);
                    data[keys[j + 1]] = settings.tableValues[i][j];
                    //}
                }
            } else {
                return getData.Msg;
            }

        }
        $(document).yStorage.Commit();
    };

    $.fn.yStorage.DeleteData = function (options) {
        console.log("------DELETE FROM TABLE-----");
        var settings = $.extend({
            tableName: "",
            dataId: [0]
        }, options);
        var getData = $(document).yStorage.GetData({ tableName: settings.tableName, dataId: settings.dataId });
        if (!getData.Erro) {
            for (var i = 0; i < settings.dataId.length; i++) {
                //console.log(currentDB.data[settings.tableName][settings.dataId[i]]);
                delete currentDB.data[settings.tableName][settings.dataId[i]];
            }
            //console.log(currentDB);
            $(document).yStorage.Commit();
        } else {
            return getData.Msg;
        }
    };

    $.fn.yStorage.GetData = function (options) {
        console.log("------GET DATA FROM TABLE-----");
        var settings = $.extend({
            tableName: "",
            dataId: []
        }, options);
        if ($(document).yStorage.existTable({ tableName: settings.tableName })) {

            var retorno = [];

            for (var i = 0; i < settings.dataId.length; i++) {
                if (currentDB.data[settings.tableName][settings.dataId[i]] === undefined) {
                    return { "Erro": true, "Msg": "Algum dos ID n�o � valido!" };
                } else {
                    retorno.push(currentDB.data[settings.tableName][settings.dataId[i]]);
                }
            }
            return retorno;
        } else {
            return { "Erro": true, "Msg": "Tabela n�o existe!" };
        }
    };




















    //$.fn.yStorage.CreateTable = function (options) {

    //    console.log("------CREATE TABLE-----");
    //    var settings = $.extend({
    //        tableName: "TableName",
    //        tableStructure: {}
    //    }, options);


    //    if (settings.tableName != "") {
    //        var checktable = $(document).yStorage.GetTable({
    //            tableName: settings.tableName
    //        });
    //        if (checktable == null) {

    //            var table = {
    //                tableStructure: settings.tableStructure,
    //                tableValues: []
    //            }
    //            yStorage.set(settings.tableName, table);
    //            //var jsonstring = JSON.stringify(table);
    //            //window.localStorage.setItem(settings.tableName, jsonstring);

    //            return { "Erro": false, "Msg": "Table criada com sucesso" };
    //        } else {
    //            return { "Erro": true, "Msg": "Table ja existe" };
    //        }
    //    } else {
    //        return { "Erro": true, "Msg": "Nenhum nome para a tabela foi definido" };

    //    }
    //};
    //$.fn.yStorage.ShowTables = function (options) {

    //    console.log("------SHOW ALL-----");
    //    var settings = $.extend({
    //        filter: ""
    //    }, options);

    //    var retorno = {};
    //    for (var i = 0, len = localStorage.length; i < len; ++i) {
    //        var nome = localStorage.key(i);
    //        var value = yStorage.get(localStorage.key(i));
    //        //var value = localStorage.getItem(localStorage.key(i));
    //        retorno[nome] = value;
    //    }
    //    return retorno;

    //};
    //$.fn.yStorage.GetTable = function (options) {

    //    console.log("------GET TABLE-----");
    //    var settings = $.extend({
    //        tableName: ""
    //    }, options);
    //    if (settings.tableName != "") {
    //        var retorno = yStorage.get(settings.tableName);
    //        //var table = window.localStorage.getItem(settings.tableName);
    //        //var retorno = jQuery.parseJSON(table);
    //        return retorno;
    //    } else {
    //        return { "Erro": true, "Msg": "Nenhuma tabela foi selecionada" };
    //    }


    //};
    $.fn.yStorage.DeleteTables = function (options) {

        var settings = $.extend({
            tables: [],
            all: false
        }, options);
        var process = true;

        if (settings.all == true) {
            console.log("------DELETE ALL-----");
            for (var i = localStorage.length, len = 0; i > len; --i) {
                window.localStorage.removeItem(localStorage.key(i - 1));
            }

        } else {
            console.log("------DELETE SELECTED-----");
            if (settings.tables[0] == undefined)
                return { "Erro": true, "Msg": "Nenhuma tabela foi selecionada" };

            for (var i = 0, len = settings.tables.length; i < len; ++i) {
                var table = $(document).yStorage.GetTable({
                    tableName: settings.tables[i]
                });
                if (table == null) {
                    process = false;
                } else {
                    window.localStorage.removeItem(settings.tables[i]);
                }
            }
        }
        if (process) {
            return { "Erro": false, "Msg": "Tabelas deletadas com sucesso" };
        } else {
            return { "Erro": true, "Msg": "Alguma das tabelas n�o existiam e n�o puderam ser deletadas" };
        }
    };

    //$.fn.yStorage.InsertIntoTable = function (options) {

    //    console.log("------INSERT-----");
    //    var settings = $.extend({
    //        tableName: "",
    //        tableValues: {}
    //    }, options);
    //    if (settings.tableName != "") {
    //        var table = $(document).yStorage.GetTable({
    //            tableName: settings.tableName
    //        });
    //        if (table == null) {
    //            return { "Erro": true, "Msg": "A tabela n�o existe" };
    //        } else {
    //            var model = table.tableStructure;

    //            if (Object.keys(table.tableValues).length === 0) {
    //                alert("nulo");
    //                model.id_horas = 1;
    //            } else {
    //                alert("registro");
    //                model.id_horas = table.tableValues[0].id_horas + 1;
    //            }
    //            table.tableValues.push(model);

    //            yStorage.set(settings.tableName, table);
    //            //var jsonstring = JSON.stringify(values);
    //            //window.localStorage.setItem(settings.tableName, jsonstring);

    //            return { "Erro": false, "Msg": "Dados inseridos com sucesso" };
    //        }
    //    } else {
    //        return { "Erro": true, "Msg": "Selecione uma tabela para poder inserir o registro" };
    //    }


    //};
    $.fn.yStorage.toType = function (obj) {
        var settings = $.extend({
            variable: null
        }, obj);
        return ({}).toString.call(settings.variable).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    };
}(jQuery));

