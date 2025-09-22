# Loja do Seu Manoel - API de Empacotamento
API RESTful em node.js com NestJS para desafio técnico.
---

## Descrição

Um MicroService que recebe pedidos e calcula a alocação para as caixas.

## Stack Tecnológica

* **Backend:** Node.js, NestJS, TypeScript
* **Banco de Dados:** PostgreSQL
* **Ambiente:** Docker, Docker Compose
* **Documentação:** Swagger (OpenAPI)
* **Segurança:** JWT (JSON Web Tokens)
* **Testes:** Jest

## (Setup e Instalação)

**Pré-requisitos:**
* Docker
* Docker Compose (V2+)

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd seu-repositorio
    ```

2.  **Configure as Variáveis de Ambiente:**
    Crie uma cópia do arquivo de exemplo `.env.example` e renomeie para `.env`.
    ```bash
    cp .env.example .env
    ```
3.  **Construa e Inicie os Contêineres:**
    Use o Docker Compose para construir as imagens e iniciar os serviços em segundo plano.
    ```bash
    docker compose up --build -d
    ```

A aplicação estará disponível em `http://localhost:3000`.

## 📖 Manual de Operações (Uso da API)

A documentação completa e interativa da API está disponível via Swagger.
<img width="1495" height="939" alt="image" src="https://github.com/user-attachments/assets/a3c9c4d7-8464-46f9-9ca2-a8724def7a15" />

* **URL da Documentação:** [http://localhost:3000/api](http://localhost:3000/api)

### Autenticação

Todos os endpoints (exceto `/auth/login`) são protegidos e requerem um Bearer Token JWT.

1.  **Obtenha um Token:** Faça uma requisição `POST` para `/auth/login` com um corpo JSON para obter seu token de acesso.
    ```json
    {
      "username": "seu-manoel",
      "password": "uma_senha_qualquer"
    }
    ```
    <img width="1316" height="197" alt="image" src="https://github.com/user-attachments/assets/8f983f75-8002-46b3-8735-2d8cf6f22cfe" />

2.  **Use o Token:** Em todas as requisições subsequentes, adicione o seguinte cabeçalho:
    `Authorization: Bearer SEU_TOKEN_AQUI`

### Exemplo de Requisição (cURL)
-<img width="1040" height="439" alt="image" src="https://github.com/user-attachments/assets/c1272971-8976-44e1-9be9-9424e7baa980" />

```bash
curl -X POST http://localhost:3000/empacotar \
-H "Content-Type: application/json" \
-H "Authorization: Bearer SEU_TOKEN_AQUI" \
-d '{
  "produtos": [
    {
      "altura": 10,
      "largura": 15,
      "comprimento": 20
    },
    {
      "altura": 50,
      "largura": 50,
      "comprimento": 50
    }
  ]
}'
```
### Teste Unitário com Jest

<img width="559" height="213" alt="image" src="https://github.com/user-attachments/assets/9cab448f-6c35-4670-9048-af7333a41d09" />
