# Storefornt REST API
A well tested, designed RESTful API that is implemented to empower an ecommerce front-end application that allows a user to show, create, and order products and place them in his cart.

## Used techonogies
- Nodejs and typescript
- PostgreSQL
- Jasmine
- Express

## Setup and configuration

The server is configured run on port `3000`, you can change it via altering the `PORT` variable in the `.env` file
### 1. Installing required packages
```
npm run install
```

### 2. Database
create a test and production databases via the following commands in you terminal that runs a postgres database engine instance

```
CREATE DATABASE storefront;
```

```
CREATE DATABASE storefront_test;
```

Create the a user and grant him the privileges on these databases
```
CREATE USER full_stack_user WITH PASSWORD 'password123';
```
```
GRANT ALL PRIVILEGES ON DATABASE storefront TO full_stack_user;
```
```
GRANT ALL PRIVILEGES ON DATABASE storefront_test TO full_stack_user;
```

### 3. Run database migrations
Database migrations simply a way to track the database schema, and a mechanism of rolling back any changes to the schema
```
npm run migrate:up:prod
```

### 4. Run test suits
```
npm run test
```

### 5. Get the API up and running
```
npm run build
```
```
node ./build/server.js
```

## API endpoints
#### 1. `POST http://localhost:3000/api/users/`
Creates a new user and returns JWT of the user's credintials 
```
{
    "firstname": "user's firtname",
    "lastname": "user's lastname",
    "password_hash": "48t4u93r8ujfdfuwem9jvw-rwri_f4892@@$32"
}
```

### 2. `GET http://localhost:3000/api/users/`
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

### 3. `GET http://localhost:3000/api/users/:id`
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

### 4. `GET http://localhost:3000/api/products/`
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

### 5. `GET http://localhost:3000/api/products/:id`
Retrieves a specific product by its `id` from the database
```
{
    "id": id,
    "name": "product name",
    "price": 2323,
    "category": "product category"
}
```

### 6. `POST http://localhost:3000/api/products/`
Creaing a new product to the database
```
{
    "name": "newly create product name",
    "price": 123,
    "category": "product category"
}
```

### 7. `GET http://localhost:3000/api/products/filter/:category`
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

### 8. `GET http://localhost:3000/api/products/reports/top-5-products/`
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

### 9. `GET http://localhost:3000/api/orders/:user_id`
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
```
