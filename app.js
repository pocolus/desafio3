
const express = require('express');
const ProductManager = require('./ProductManager'); 

const app = express();
const port = 8080;

app.use(express.json());


app.get('/products', async (req, res) => {
  try {
    const productManager = new ProductManager('products.json'); 
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const products = await productManager.getAllProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos.' });
  }
});


app.get('/products/:pid', async (req, res) => {
  try {
    const productManager = new ProductManager('products.json'); 
    const productId = req.params.pid;
    const product = await productManager.getProductById(productId);
    if (!product) {
      res.status(404).json({ message: 'Producto no encontrado.' });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto.' });
  }
});


app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});



