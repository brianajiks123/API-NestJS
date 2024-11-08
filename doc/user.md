# User API Spec

## Register User

Endpoint : POST /api/users

Request Body : 

```json
{
    "username": "budi",
    "password": "budi123",
    "name": "Budi Santoso"
}
```

Response Body (Success) : 

```json
{
    "data": {
        "username": "budi",
        "name": "Budi Santoso"
    }
}
```

Response Body (Failed) : 

```json
{
    "errors": "Username already registered"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body : 

```json
{
    "username": "budi",
    "password": "budi123"
}
```

Response Body (Success) : 

```json
{
    "data": {
        "username": "budi",
        "name": "Budi Santoso",
        "token": "session_id_generated"
    }
}
```

Response Body (Failed) : 

```json
{
    "errors": "Username or password is wrong"
}
```

## Get User

Endpoint : GET /api/users/current

Headers :
- Authorization : token

Response Body (Success) : 

```json
{
    "data": {
        "username": "budi",
        "name": "Budi Santoso"
    }
}
```

Response Body (Failed) : 

```json
{
    "errors": "Unauthorized"
}
```

## Update User

### Update Partial
Endpoint : PATCH /api/users/current

Headers :
- Authorization : token

Request Body : 

```json
{
    "password": "budi123", // optional, if want to change password
    "name": "Budi Santoso" // optional, if want to change name
}
```

Response Body (Success) : 

```json
{
    "data": {
        "username": "budi",
        "name": "Budi Santoso"
    }
}
```

Response Body (Failed) : 

```json
{
    "errors": "Failed to updating user's password"
}
```

### Update All
Endpoint : PUT /api/users/current

Headers :
- Authorization : token

Request Body : 

```json
{
    "username": "budi.santoso",
    "password": "budi12345",
    "name": "Budi Santoso"
}
```

Response Body (Success) : 

```json
{
    "data": {
        "username": "budi.santoso",
        "name": "Budi Santoso"
    }
}
```

Response Body (Failed) : 

```json
{
    "errors": "Failed to updating user"
}
```

## Logout User

Endpoint : DELETE /api/users/current

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
    "errors": "Failed to logout"
}
```