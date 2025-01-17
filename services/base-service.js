class BaseService {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async findAll(filter = {}) {
    return await this.model.findAll({ where: filter });
  }

  async findById(id) {
    return await this.model.findByPk(id);
  }

  async findByField(field, value) {
    try {
      const record = await this.model.findOne({ where: { [field]: value } });
      return record;
    } catch (error) {
      console.error(`Error finding ${field} with value ${value}:`, error);
      throw new Error(`Failed to find record by ${field}`);
    }
  }

  async update(id, data) {
    const instance = await this.findById(id);
    if (!instance) throw new Error("Record not found");
    return await instance.update(data);
  }

  async delete(id) {
    const instance = await this.findById(id);
    if (!instance) throw new Error("Record not found");
    return await instance.destroy();
  }
}

module.exports = BaseService;
