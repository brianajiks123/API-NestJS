# Address API Spec

## Create Address

Endpoint : POST /api/contacts/:contactId/addresses

Headers :
- Authorization : token

Request Body : 

```json
{
    "street": "Jl. Example",
    "city": "Example",
    "province": "Central Example",
    "country": "Example A",
    "postal_code": "12345"
}
```

Response Body (Success) : 

```json
{
    "data": {
        "id": 1,
        "street": "Jl. Example",
        "city": "Example",
        "province": "Central Example",
        "country": "Example A",
        "postal_code": "12345"
    }
}
```

Response Body (Failed) : 

```json
{
    "errors": "Address already created"
}
```

## GET Address

Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization : token

Response Body (Success) : 

```json
{
    "data": {
        "id": 1,
        "street": "Jl. Example",
        "city": "Example",
        "province": "Central Example",
        "country": "Example A",
        "postal_code": "12345"
    }
}
```

Response Body (Failed) : 

```json
{
    "errors": "Address not found"
}
```

## Update 

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization : token

Request Body : 

```json
{
    "street": "Jl. Example",
    "city": "Example",
    "province": "Central Example",
    "country": "Example A",
    "postal_code": "12345"
}
```

Response Body (Success) : 

```json
{
    "data": {
        "id": 1,
        "street": "Jl. Example",
        "city": "Example",
        "province": "Central Example",
        "country": "Example A",
        "postal_code": "12345"
    }
}
```

Response Body (Failed) : 

```json
{
    "errors": "Failed to updating address"
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

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
    "errors": "Failed to removing address"
}
```

## List Addresses

Endpoint : GET /api/contacts/:contactId/addresses

Headers :
- Authorization : token

Response Body (Success) : 

```json
{
    "data": [
        {
            "id": 1,
            "street": "Jl. Example",
            "city": "Example",
            "province": "Central Example",
            "country": "Example A",
            "postal_code": "12345"
        },
        {
            "id": 2,
            "street": "Jl. Example 2",
            "city": "Example 2",
            "province": "Central Example 2",
            "country": "Example B",
            "postal_code": "123456"
        }
    ]
}
```

Response Body (Failed) : 

```json
{
    "errors": "Address is empty"
}
```
