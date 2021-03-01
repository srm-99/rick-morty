const path   = require('path');
const sqlite = require('sqlite3');
const {open} = require('sqlite');

const fetch  = require('node-fetch');

require('dotenv').config();

const apiBaseURL = process.env.API_BASE_URL || 'http://localhost' 

module.exports = {
    migrateEntity,
    getEntitiesAll,
    getEntityById,
    //insertEntity,
    //updateEntity,
    //deleteEntity
}

async function migrateEntity(entity){
    let dbname = process.env.CRUD_DBNAME || 'data';
    let db_entity = entity;
    if(entity.slice(-1) == 's'){
        entity = entity.slice(0, -1);
    }

    // abrir / crear la BD
    let db = await open({
        filename: path.resolve(`./data/${dbname}.db`),
        driver  : sqlite.Database
    })
    .catch(err => {
        console.log({err});
        res
            .status(500)
            .json({
                error: true,
                ...err
            });
    });

    // consulta para obtener el modelo
    let jsonRsp = await getEntityById(entity, 1);
    let keys = Object.keys(jsonRsp);

    // crear la entidad
    let entityCols = keys.map(key => {
        let type = key === 'id' ? 'INTEGER PRIMARY KEY AUTOINCREMENT' : 'TEXT';
        return `${key} ${type}`
    })
    .join(',');

    let sql = `
        CREATE TABLE IF NOT EXISTS ${db_entity} (${entityCols});
    `;
    let table = await db.exec(sql)
    .catch(err => {
        console.log({err});
    });

    // poblar la entidad
    let optionsRS = {entity};
    let jsonRS = await getEntitiesAll(optionsRS);
    let cols = keys.join(',');
    
    jsonRS.results.map(async reg => {
        let vals = "'" + Object.keys(reg)
            .map(col => {
                let value = (typeof reg[col] === 'object')
                    ? JSON.stringify(reg[col])
                    : reg[col]
                ;
                value = String(value).replace(/'/g,'');
                return value;
            }).join("','") + "'"
        ;
        let sql = `
            INSERT INTO
                ${db_entity}
                (${cols})
            VALUES
                (${vals})
        ;`;
        const result = await db.run(sql);
    });

    db.close();
}

async function getEntitiesAll(options){
    const {
        entity = '',
        page = 1
    } = options;

    let url = `${apiBaseURL}/${entity}/?page=${page}`;
    
    let rspJson = await fetch(url)
        .then(rslt => rslt.json())
        .catch(err => {
            console.log({err});
        })
    ;
    return rspJson;
}

async function getEntityById(entity, id){
    let url = `${apiBaseURL}/${entity}/${id}`;
    let rspJson = await fetch(url)
    .then(rslt => rslt.json())
    .catch(err => {
        console.log({err});
    });
    return rspJson;
}