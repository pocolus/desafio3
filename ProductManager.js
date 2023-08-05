const fs = require('fs/promises');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getAllProducts(limit) {
    const products = await this.readProductsFromFile();
    return limit ? products.slice(0, limit) : products;
  }

  async getProductById(productId) {
    const products = await this.readProductsFromFile();
    return products.find((product) => product.id === productId);
  }

  async readProductsFromFile() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
}

module.exports = ProductManager;