var Q = require('q'),
    Parent = require('heinzelmannchen-generator'),
    mysql2json = require('mysql2json'),
    connection = require('mysql2json/lib/connection'),
    dataTypeProvider = require('heinzelmannchen-datatypes/lib/datatypesProvider'),
    dataTypes = require('heinzelmannchen-datatypes').createMapper(dataTypeProvider.mysql, dataTypeProvider.heinzel),
    Generator = Parent.inherit();

Generator.prototype.createData = function() {
    var me = this;
    return connection.connect(this.config)
        .then(function() {
            var tableNames = null;
            if (me.filters) {
                tableNames = me.filters.tables;
            }
            mysql2json.setDataTypeMapping(dataTypes);
            return mysql2json.get(tableNames);
        })
        .then(function(tables) {
            return tables;
        });
};

Generator.explain = function() {
    var text = ['[{',
        '\ttable_name: "a-table-name",',
        '\ttable_schema: "public",',
        '\tcolumns: [{',
        '\t\tcolumn_name: "column_name",',
        '\t\tdata_type: "int|string|...",',
        '\t\tcolumn_default: "Foo",',
        '\t\tis_nullable: true,',
        '\t\tcharacter_maximum_length: 7,',
        '\t\tnumeric_precision. 3',
        '\t} ...]',
        '} ...]'
    ];
    return text.join('\n');
};

Generator.help = function() {
    return 'Generates data using mysql2json';
};

module.exports = Generator;
