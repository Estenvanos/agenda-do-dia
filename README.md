# Minha Agenda — Vite + TypeScript

Agenda pessoal responsiva construída com Vite e TypeScript puro. O projeto não depende de backend nem de APIs externas.

## Acesso

As credenciais são lidas de um arquivo local de ambiente. Copie o exemplo e preencha os valores:

```bash
cp .env.example .env.local
```

```dotenv
VITE_AUTH_USERNAME=seu_usuario
VITE_AUTH_PASSWORD=sua_senha
```

O arquivo `.env.local` não deve ser versionado.

> Importante: como o projeto é totalmente estático, variáveis `VITE_*` são incluídas no JavaScript compilado e podem ser vistas no navegador. Isso evita publicar as credenciais no repositório, mas este login continua sendo apenas um bloqueio de interface. Segurança real exige autenticação em um backend.

## Como executar

### Opção rápida no Windows

Clique duas vezes em `start.bat`.

### Terminal

```bash
npm install
npm run dev
```

Abra o endereço exibido pelo Vite, normalmente `http://localhost:5173`.

## Comandos

```bash
npm run dev       # desenvolvimento
npm run typecheck # validação do TypeScript
npm run build     # gera a pasta dist
npm run preview   # visualiza o build final
```

## Onde alterar a agenda

Todo o conteúdo de dias, horários, atividades e trilha de estudo está centralizado em:

```text
src/entities/agenda/data/agenda.data.ts
```

Para alterar as credenciais, edite:

```text
.env.local
```

## Estrutura

```text
src/
├── app/                       # bootstrap, configuração e estilos globais
├── entities/agenda/           # tipos e dados centrais da agenda
├── features/auth/             # autenticação local e tela de login
├── features/agenda-dashboard/ # regras, preferências e interface da agenda
├── shared/lib/                # funções reutilizáveis
└── main.ts                    # ponto de entrada
```

Mais detalhes em `docs/ARCHITECTURE.md`.

## Responsividade

A interface foi preparada para telas estreitas a partir de aproximadamente 280 px, celulares, tablets, notebooks e monitores. A navegação de dias usa rolagem horizontal quando necessário, e a tabela da agenda reduz suas colunas e espaçamentos em telas menores.
