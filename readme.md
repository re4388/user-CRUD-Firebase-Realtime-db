# README



## Why?

I just need a set of CRUD Endpoint to let me to play with  my frontend code.

### Create User

[ POST ] http://localhost:3000/user

body in json

```json
{
  "name": "Spiderman",
  "age": 21,
  "loc": "Taipei"
}
```

Return code

```json
{
  "_id": "f1a25c03-cdf1-43e4-a1ac-cf286995dc76",
  "name": "Spiderman",
  "age": 21,
  "loc": "Taipei"
}
```

### Get All Users

[ GET ] http://localhost:3000/user

Return code

```json
[
  {
    "_id": "f1a25c03-cdf1-43e4-a1ac-cf286995dc76",
    "age": 21,
    "loc": "Taipei",
    "name": "Spiderman"
  }
]
```

### Update User

[ PUT ] http://localhost:3000/user/:_id

body in json

```json
{
  "name": "MAMA",
  "age": 56,
  "loc": "Taichung"
}
```

Return code

```json
{
  "message": "update success"
}
```

### Delete User

[ DEL ] http://localhost:3000/user/:_id

Return code

```json
{
  "message": "delete success"
}
```

### Get User by ID

[ GET ] http://localhost:3000/user/:_id

Note: :_id is 65c86e22-b0a5-4556-83cb-6bda5df847d6 as below

Return code

```json
{
  "_id": "65c86e22-b0a5-4556-83cb-6bda5df847d6",
  "age": 56,
  "loc": "Taichung",
  "name": "MAMA"
}
```

## Reference

- [Node.js ＋ Express — 製作 CRUD 簡易待辦清單(上）](https://medium.com/@seanyeh/node-js-express-%E8%A3%BD%E4%BD%9Ccrud%E7%B0%A1%E6%98%93%E5%BE%85%E8%BE%A6%E6%B8%85%E5%96%AE-%E4%B8%8A-93988ffb21dd)
- How to get form req body in POST => http://expressjs.com/en/api.html#req
- [Node.js ＋ Express — 製作 CRUD 簡易待辦清單(下）](https://medium.com/@seanyeh/node-js-express-%E8%A3%BD%E4%BD%9Ccrud%E7%B0%A1%E6%98%93%E5%BE%85%E8%BE%A6%E6%B8%85%E5%96%AE-%E4%B8%8B-db2e5ea364cf)
