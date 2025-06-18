import { v4 as uuidv4 } from 'uuid';

class InMemoryStorage {
    constructor() {
        this.data = {};
    }

    create(collectionName, item) {
        if (!this.data[collectionName]) {
            this.data[collectionName] = [];
        }
        const obj = Object.assign({}, item);
        obj['_id'] = uuidv4();
        this.data[collectionName].push(obj);
        return obj;
    }

    find(collectionName, findFunc) {
        if (this.data[collectionName]) 
        {
            return this.data[collectionName].filter(obj => findFunc(obj));
        }
        return [];
    }

    where(collectionName, where) {
        let result = [];
        if(this.data[collectionName])
        {
            result = this.data[collectionName].filter(obj => JSON.stringify(obj) === JSON.stringify(where));
        }
        return result;
    }

    remove(collectionName, findFunc)
    {
        let result = [];
        if (this.data[collectionName]) 
        {
            result = this.data[collectionName].filter(obj => findFunc(obj));
            this.data[collectionName] = this.data[collectionName].filter(element => !result.includes(element));
        }
        return result;
    }

}

export { InMemoryStorage };



