![Logo](/public/fintrack-logo.svg)

# FinTrack (Fetch API)

Bem-vindo ao Fintrack! Simplifique sua gestão financeira e tome decisões inteligentes. Adicione suas transações e visualize sua situação financeira com gráficos intuitivos.

## Stack utilizada

![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Instalação

**1. Pré requisitos**

- [NodeJS](https://nodejs.org/en/download/package-manager)
- [pnpm](https://pnpm.io/pt/installation)

**2. Clone o projeto**

```bash
  git clone https://github.com/KaianDev/fintrack-challenger.git
```

**3. Entre no diretório do projeto**

```bash
  cd fintrack-challenger
```

**4. Renomeie o arquivo .env.example para .env**

**5. Definir a Variável AUTH_SECRET**

Execute o comando abaixo para gerar um secret:

```bash
  npx auth secret
```

**6. Definir as Variáveis de Ambiente no Arquivo .env**

- AUTH_SECRET="secret de autenticação"
- AUTH_TRUST_HOST=true
- BASE_API="http://minhaapi.com/api"

Copie o resultado gerado e no arquivo .env defina o valor para a variável de ambiente AUTH_SECRET

**7. Instale as dependências**

```bash
  pnpm i
```

**8. Iniciar a Aplicação em Ambiente de Desenvolvimento**

```bash
  pnpm dev
```

## Deploy

Para fazer o deploy desse projeto, execute:

```bash
  pnpm build
  pnpm start
```

## Funcionalidades

- Cadastro e edição de transações
- Gerência financeira
- Análise de gráficos

## Contribuidor

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/kaiandev">
        <img src="https://avatars.githubusercontent.com/u/123319433?v=4" width="100px;" alt="Kaian Vasconcelos"/><br>
        <sub>
          <b>Kaian Vasconcelos</b>
        </sub>
      </a>
    </td>
  </tr>
</table>
