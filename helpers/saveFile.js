import { existsSync, readFileSync, writeFileSync } from 'node:fs';

//Path where the file will be created
const file = './db/data.json';

//Creating a file and saving the data passed as a prop
export const saveToDB = (data) => {
    writeFileSync( file, JSON.stringify(data) );
}

//Reading the data from the file and return it
export const readFromDB = () => {

    if( !existsSync(file) ){
        return null;
    }

    const info = readFileSync(file, { encoding: 'utf-8' } );
    const data = JSON.parse( info );

    return data;
}