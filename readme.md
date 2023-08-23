## Commands to create security keys
### create private keys for access token
```
openssl genrsa -out backend/certs/private_key.pem 2048
openssl rsa -pubout -in backend/certs/private_key.pem -out backend/certs/public_key.pem
```

### create private keys for refresh token
```
openssl genrsa -out backend/certs/refresh_private_key.pem 2048
openssl rsa -pubout -in backend/certs/refresh_private_key.pem -out backend/certs/refresh_public_key.pem
```

### create private key, cert and dhparam for https server
```
openssl dhparam -out backend/certs/dhparam.pem 2048
openssl genpkey -algorithm RSA -out backend/certs/https_private_key.pem
openssl req -new -key backend/certs/https_private_key.pem -x509 -days 365 -out backend/certs/https_certificate.pem
```