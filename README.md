# API de Encriptação e Decriptação

API para encriptar e decriptar dados usando Node.js e Express, deployada na Vercel.

## Instalação

```bash
npm install
```

## Execução Local

```bash
npm start
```

A API estará rodando em `http://localhost:2611`

## Endpoints

### POST /encriptar
Encripta um texto.

**Request:**
```json
{
  "texto": "Seu texto aqui"
}
```

**Response:**
```json
{
  "texto_encriptado": "gAAAAABl...",
  "status": "sucesso"
}
```

### POST /decriptar
Decripta um texto encriptado.

**Request:**
```json
{
  "texto_encriptado": "gAAAAABl..."
}
```

**Response:**
```json
{
  "texto_decriptado": "Seu texto aqui",
  "status": "sucesso"
}
```

### GET /health
Verifica se a API está funcionando.

**Response:**
```json
{
  "status": "ok"
}
```

## Exemplo de Uso

### Localmente

```bash
# Encriptar
curl -X POST http://localhost:2611/encriptar \
  -H "Content-Type: application/json" \
  -d "{\"texto\": \"Olá mundo!\"}"

# Decriptar
curl -X POST http://localhost:2611/decriptar \
  -H "Content-Type: application/json" \
  -d "{\"texto_encriptado\": \"abc123...\"}"
```

### Na Vercel

```bash
# Encriptar
curl -X POST https://ms-encripta-dados.vercel.app/api/encriptar \
  -H "Content-Type: application/json" \
  -d "{\"texto\": \"Olá mundo!\"}"

# Health Check
curl https://ms-encripta-dados.vercel.app/api/health
```
