const connection = require('./config/connection');

// select with data
module.exports.dataQuery = (callback, sql, data) => {
    connection.query(sql, data, (error, row) => {
        if(error) console.log('Error: ', error);
        callback(row);
    });
}

// select all
module.exports.rawQuery = (callback, sql) => {
    connection.query(sql, (error, row) => {
        if (error) throw error;
        callback(row);
    });
}

    
    // query.dataQuery( (response) => {
    //     console.log('this is-------', response);
    // }, sql, [data]);