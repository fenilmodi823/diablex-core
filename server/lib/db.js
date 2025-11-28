const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/db.json');

// Initialize DB if not exists
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify({ patients: [], readings: [], reports: [] }, null, 2));
}

class JsonDB {
  constructor(collection) {
    this.collection = collection;
  }

  _read() {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  }

  _write(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  }

  async find(query = {}) {
    const data = this._read();
    const items = data[this.collection] || [];
    
    // Simple filtering
    return items.filter(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
  }

  async findById(id) {
    const data = this._read();
    const items = data[this.collection] || [];
    return items.find(item => item._id === id);
  }

  async save(item) {
    const data = this._read();
    if (!data[this.collection]) data[this.collection] = [];
    
    const newItem = { ...item, _id: Date.now().toString(), createdAt: new Date() };
    data[this.collection].push(newItem);
    this._write(data);
    return newItem;
  }
  
  // Helper to mimic Mongoose model instance save
  static createModel(collection) {
    const db = new JsonDB(collection);
    
    // Return a class that mimics Mongoose Model
    return class Model {
      constructor(data) {
        Object.assign(this, data);
      }

      async save() {
        const data = db._read();
        if (!data[collection]) data[collection] = [];

        // Update if exists, else create
        if (this._id) {
          const idx = data[collection].findIndex(x => x._id === this._id);
          if (idx !== -1) {
            data[collection][idx] = { ...this }; // Update
            db._write(data);
            return this;
          }
        }

        // Create new
        this._id = Date.now().toString();
        this.createdAt = new Date();
        data[collection].push(this);
        db._write(data);
        return this;
      }

      static async find(query = {}) {
        const data = db._read();
        let items = data[collection] || [];
        
        // Handle sort/limit via chaining mock (simplified)
        const result = items.filter(item => {
           return Object.keys(query).every(key => item[key] === query[key]);
        });
        
        // Mock sort/limit methods
        result.sort = (fnOrObj) => {
             if (typeof fnOrObj === 'object') {
                 // Simple sort support for { ts: -1 } or { date: -1 }
                 const key = Object.keys(fnOrObj)[0];
                 const dir = fnOrObj[key];
                 result.sort((a, b) => (a[key] > b[key] ? dir : -dir));
             }
             return result;
        };
        result.limit = (n) => result.slice(0, n);
        
        return result;
      }

      static async findById(id) {
        return db.findById(id).then(data => data ? new Model(data) : null);
      }
    };
  }
}

module.exports = JsonDB;
