



# Database schema
## 1. `Users table`
```
    Column     |          Type          | Collation | Nullable |              Default              
---------------+------------------------+-----------+----------+-----------------------------------
 id            | integer                |           | not null | nextval('users_id_seq'::regclass)
 firstname     | character varying(255) |           | not null | 
 lastname      | character varying(255) |           | not null | 
 password_hash | character varying(255) |           | not null | 
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
```

## 2. `Products table`
```
                                     Table "public.products"
  Column  |          Type          | Collation | Nullable |               Default                
----------+------------------------+-----------+----------+--------------------------------------
 id       | integer                |           | not null | nextval('products_id_seq'::regclass)
 name     | character varying(255) |           | not null | 
 price    | double precision       |           | not null | 
 category | character varying(100) |           |          | 
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders_products_join" CONSTRAINT "orders_products_join_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
```

## 3. `Orders table`
```
                                    Table "public.orders"
 Column  |          Type          | Collation | Nullable |              Default               
---------+------------------------+-----------+----------+------------------------------------
 id      | integer                |           | not null | nextval('orders_id_seq'::regclass)
 user_id | integer                |           |          | 
 status  | character varying(100) |           | not null | 
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
Referenced by:
    TABLE "orders_products_join" CONSTRAINT "orders_products_join_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
```

## 4. `orders_products_join table`
```
                              Table "public.orders_products_join"
   Column   |  Type   | Collation | Nullable |                     Default                      
------------+---------+-----------+----------+--------------------------------------------------
 id         | integer |           | not null | nextval('orders_products_join_id_seq'::regclass)
 order_id   | integer |           |          | 
 product_id | integer |           |          | 
 quantity   | integer |           | not null | 
Indexes:
    "orders_products_join_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_products_join_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    "orders_products_join_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
```


# API endpoints
## 1. `POST http://localhost:3000/api/users/`
Creates a new user and returns JWT of the user's credintials 
```
{
    "firstname": "user's firtname",
    "lastname": "user's lastname",
    "password_hash": "48t4u93r8ujfdfuwem9jvw-rwri_f4892@@$32"
}
```

## 2. `GET http://localhost:3000/api/users/`
Returns a list of all users that are in the database
```
[
    {
        "firstname": "test",
        "lastname": "test",
        "password_hash": "    "
    },
    {
        "firstname": "test2",
        "lastname": "test2", 
        "password_hash": "    "
    }
]
```

## 3. `GET http://localhost:3000/api/users/:id`
Retrieve a specific user by his id from the database
```
{
    {
        "id": "id",
        "firtname": "test",
        "lastname": "test",
        "password_hash": "    "
    }
}
```

## 4. `GET http://localhost:3000/api/products/`
Retrieves all the products in the database as a list of products
```
[
    {
        "name": "product name",
        "price": 1234,
        "category": "product category"
    },
    .
    .
    .
]
```

## 5. `GET http://localhost:3000/api/products/:id`
Retrieves a specific product by its `id` from the database
```
{
    "id": id,
    "name": "product name",
    "price": 2323,
    "category": "product category"
}
```

## 6. `POST http://localhost:3000/api/products/`
Creaing a new product to the database
```
{
    "name": "newly create product name",
    "price": 123,
    "category": "product category"
}
```

## 7. `GET http://localhost:3000/api/products/filter/:category`
Filtering the products by specifying a particular category
```
[
    {
        "name": "product name",
        "price": 123, 
        "category": "category"
    },
    .
    .
    .
]
```

## 8. `GET http://localhost:3000/api/products/reports/top-5-products/`
Filtering the database for the most `5` sold products
```
{
    {
        "name": "product name",
        "price": 123,
        "category": "category"
    },
    .
    .
    .
}
```

## 9. `GET http://localhost:3000/api/orders/:user_id`
Retrieving all the products requested by a specific user, (cart)
```
[
    {
        "name": "product name",
        "price": 23,
        "category": "category"
    },
    .
    .
    .
]
