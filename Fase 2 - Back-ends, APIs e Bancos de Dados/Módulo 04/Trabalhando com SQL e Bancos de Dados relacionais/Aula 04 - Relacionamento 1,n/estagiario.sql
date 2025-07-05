SELECT products.id, products.name, products.price, categories.name AS category
    FROM products 
    JOIN categories ON products."categoryId" = categories.id;