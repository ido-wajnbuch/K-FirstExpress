import { v4 as uuidv4 } from 'uuid';

let data = {};

class InMemorySharedStorage {

    create(collectionName, item) {
        if (!data[collectionName]) {
            data[collectionName] = [];
        }
        const obj = Object.assign({}, item);
        obj['_id'] = uuidv4();
        data[collectionName].push(obj);
        return obj;
    }

    find(collectionName, findFunc) {
        if (data[collectionName]) 
        {
            return data[collectionName].filter(obj => findFunc(obj));
        }
        return [];
    }

    where(collectionName, where) {
        let result = [];
        if(data[collectionName])
        {
            result = data[collectionName].filter(obj => JSON.stringify(obj) === JSON.stringify(where));
        }
        return result;
    }

    remove(collectionName, findFunc)
    {
        let result = [];
        if (data[collectionName]) 
        {
            result = data[collectionName].filter(obj => findFunc(obj));
            data[collectionName] = data[collectionName].filter(element => !result.includes(element));
        }
        return result;
    }

}

export { InMemorySharedStorage };



