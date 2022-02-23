import fs from 'fs';
import { parse } from 'csv-parse';

const fileName = 'kepler_data.csv';
const keysToIndex = {};
let idx = 0;

const parser = parse();

parser.on('data', (data) => {
    if (!data[0].match('[0-9]+')) {

        // To get index of columns
        if (data[0].match('# COLUMN')) {
            let columnName = data[0].split(' ')[2];
            columnName = columnName.substring(0, columnName.length - 1);
            keysToIndex[columnName] = idx++;
        }
        return;
    }

    // Get the required values
    const koi_disposition = data[keysToIndex['koi_disposition']];
    const koi_insol = data[keysToIndex['koi_insol']];
    const koi_prad = data[keysToIndex['koi_prad']];

    if (koi_disposition === 'CONFIRMED' && koi_insol >= 0.36 && koi_insol <= 1.11 && koi_prad < 1.6)
        console.log(data);
});

parser.on('end', () => console.log('Finished'));

fs.createReadStream(fileName)
    .pipe(parser);