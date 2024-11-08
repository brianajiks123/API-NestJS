# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

Headers :
- Authorization : token

Request Body : 

```json
{
    "first_name": "Budi",
    "last_name": "Santoso",
    "email": "budi.santoso@example.com",
    "phone": "085547789456"
}
```

Response Body (Success) : 

```json
{
    "data": {
        "id": 1,
        "first_name": "Budi",
        "last_name": "Santoso",
        "email": "budi.santoso@example.com",
        "phone": "085547789456"
    }
}
```

Response Body (Failed) : 

```json
{
    "errors": "Contact already created"
}
```

## Get Contact

Endpoint : GET /api/contacts/:contactId

Headers :
- Authorization : token

Response Body (Success) : 

```json
{
    "data": {
        "id": 1,
        "first_name": "Budi",
        "last_name": "Santoso",
        "email": "budi.santoso@example.com",
        "phone": "085547789456"
    }
}
```

Response Body (Failed) : 

```json
{
    "errors": "Contact not found"
}
```

## Update Contact

Endpoint : PUT /api/contacts/:contactId

Headers :
- Authorization : token

Request Body : 

```json
{
    "first_name": "Budi",
    "last_name": "Santoso",
    "email": "budi.santoso@example.com",
    "phone": "085547789456"
}
```

Response Body (Success) : 

```json
{
    "data": {
        "id": 1,
        "first_name": "Budi",
        "last_name": "Santoso",
        "email": "budi.santoso@example.com",
        "phone": "085547789456"
    }
}
```

Response Body (Failed) : 

```json
{
    "errors": "Failed to updating contact"
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:contactId

Headers :
- Authorization : token

Response Body (Success) : 

```json
{
    "data": true
}
```

Response Body (Failed) : 

```json
{
    "errors": "Failed to removing contact"
}

## Search Contact

Endpoint : GET /api/contacts

Headers :
- Authorization : token

Query Params :
- name : string // search contact first name or last name, optional
- phone : string // search contact phone, optional
- email : string // search contact email, optional
- page : number // pagination, default 1
- size : number // pagination content, default 10

Response Body (Success) : 

```json
{
    "data": [
        {
            "id": 1,
            "first_name": "Budi",
            "last_name": "Santoso",
            "email": "budi.santoso@example.com",
            "phone": "085547789456"
        },
        {
            "id": 2,
            "first_name": "Mohamed",
            "last_name": "Herlando",
            "email": "mohamed.herlando@example.com",
            "phone": "082456123896"
        }
    ],
    "paging": {
        "current_page": 1,
        "total_page": 10,
        "size": 10
    }
}
```

Response Body (Failed) : 

```json
{
    "errors": "Contact already created"
}
```
