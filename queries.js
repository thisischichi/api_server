const Pool = require('pg').Pool
const pool = new Pool({
  user: 'kata',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})

const getProducts = (request, response) => {
  console.log(request)
  pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json({data: results.rows})
  })
}

const getProductById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM products WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createProduct = (request, response) => {
  const { name, current_count, manual_count } = request.body

  pool.query('INSERT INTO products (name, current_count, manual_count) VALUES ($1, $2, $3)', [name, current_count, manual_count], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Product added successfully!`)
  })
}

/*
const addStock = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, current_count, manual_count } = request.body

  pool.query(
    'UPDATE products SET name = $1, current_count = $2 + 5, manual_count = $3 WHERE id = $4', [name, current_count, manual_count, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Stock added to Product with ID: ${id}`)
    }
  )
}
*/

const removeStock = (request, response) => {
  const id = parseInt(request.params.id)
  const { name } = request.body

  pool.query(
    'UPDATE products SET name = $1, current_count = current_count - 1 WHERE id = $2', [name, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Stock removed from Product with ID: ${id}.`)
    }
  )
}

/* No need for this as this is a purely front end requirement  */
const checkStock = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, manual_count } = request.body

  pool.query(
    'UPDATE products SET name = $1, manual_count = $2 WHERE id = $3', [name, manual_count, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Manual count updated for Product with ID: ${id}`)
    }
  )
}

const deleteProduct = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM products WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Product deleted with ID: ${id}`)
  })
}


module.exports = {
  getProducts,
  getProductById,
  createProduct,
  removeStock,
  checkStock,
  deleteProduct
}
