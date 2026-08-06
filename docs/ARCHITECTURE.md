# Arquitetura

## Objetivo

Manter a agenda simples de executar, mas fácil de evoluir. O projeto usa Vite + TypeScript sem framework de interface, reduzindo dependências e mantendo controle total do HTML gerado.

## Camadas

### `app`

Inicializa a aplicação, decide entre login e agenda e carrega os estilos.

### `entities/agenda`

Contém o modelo do domínio e a fonte única de dados. Mudanças de conteúdo devem começar em `agenda.data.ts`.

### `features/auth`

Controla login, logout e persistência da sessão no `localStorage`.

### `features/agenda-dashboard`

Transforma dados brutos em blocos do dia, calcula totais, salva preferências e renderiza a interface.

### `shared`

Funções sem dependência do domínio: DOM, escape de HTML e horários.

## Decisões

- **TypeScript estrito:** reduz erros ao alterar dias, categorias e fases.
- **Dados separados da UI:** permite editar horários sem mexer no código visual.
- **Event delegation:** evita dezenas de listeners permanentes após cada renderização.
- **Preferências persistidas:** demanda, fase, densidade, detalhes e totais permanecem após recarregar.
- **Login local:** adequado somente para privacidade casual em um projeto estático.

## Evoluções futuras possíveis

- Editor visual de blocos com armazenamento local.
- Exportação/importação JSON.
- Sincronização com backend próprio.
- PWA para instalação no celular.
- Testes automatizados de domínio e interface.
