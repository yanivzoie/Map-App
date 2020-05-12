const fs = require('fs').promises;
const path = require('path');
const filename = 'locations.json';
const initialLocations = [];
var file = path.resolve(filename);

const store = {
  async read() {
    try {
      await fs.access(file);
      const f = await fs.readFile(file);
      const f2 = JSON.parse(f);
      this.locations = f2;
    } catch (error) {
      this.locations = initialLocations;
      console.log('error on read..');
    }
    return this.locations;
  },
  async save() {
    try {
      await fs.writeFile(filename, JSON.stringify(this.locations));
    } catch (error) {
      console.log('error on save..');
    }
  },
  async getIndexById(id) {
    try {
      const locations = await this.read();
      return locations.findIndex((location) => location.id === +id);
    } catch (error) {
      console.log('error on getIndexById');
    }
  },
  async getNextLocationId() {
    let maxId = 0;
    const locations = await this.read();
    locations.map((location) => {
      if (location.id > maxId) maxId = location.id;
    });
    return maxId + 1;
  },
  locations: [],
};

module.exports = store;
