# AI Support Engine

Base funcional del reto: un endpoint común para analizar solicitudes mediante un motor tradicional por reglas o un motor generativo conectado a un proveedor real.

## Estructura

```text
src/
  domain/                 Contrato y valores permitidos
  application/            Validación y caso de uso
  engines/                Motor traditional y motor generative
  http/                   Servidor HTTP y endpoint
test/                     Pruebas unitarias mínimas
```

## Ejecución

Requiere Node.js 20 o superior.

```bash
npm install
Copy-Item .env.example .env
npm test
npm start
```

El modo `traditional` funciona sin credenciales. Para `generative`, configura `OPENAI_API_KEY` en `.env`; no se simulan respuestas generativas.

## Endpoint

`POST /api/analyze`

```json
{
  "message": "No puedo iniciar sesión",
  "mode": "traditional"
}
```

La respuesta mantiene siempre este contrato: `category`, `priority`, `response`, `requiresHumanReview` y `mode`. Las categorías válidas son `ACCESS`, `BUG`, `FEATURE` y `SECURITY`; las prioridades son `LOW`, `MEDIUM`, `HIGH` y `CRITICAL`.

Ejemplo con PowerShell:

```powershell
Invoke-RestMethod -Method Post http://localhost:3000/api/analyze `
  -ContentType 'application/json' `
  -Body '{"message":"Detecté una vulnerabilidad","mode":"traditional"}'
```

Las solicitudes de seguridad siempre se devuelven con `requiresHumanReview: true`. El motor generativo usa salida JSON, valida el contrato y convierte errores del proveedor en respuestas HTTP controladas.
