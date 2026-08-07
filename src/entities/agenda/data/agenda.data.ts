import type {
  AgendaDay,
  CategoryDefinition,
  CategoryId,
  DayId,
  DemandLevel,
  ScheduleBlock,
  ScheduleSlot,
  ScheduleTag,
  StudyPhase,
  StudyPhaseDefinition,
  StudyTheme,
  StudyTopic,
} from '../model/types';

export const CATEGORY_DEFINITIONS: Record<CategoryId, CategoryDefinition> = {
  projeto: { color: 'var(--color-accent)', name: 'Projeto' },
  estudo: { color: 'var(--color-accent-2)', name: 'Estudo' },
  trabalho: { color: '#6a7a8c', name: 'Trabalho' },
  treino: { color: '#b06a52', name: 'Treino' },
  pessoal: { color: '#97627e', name: 'Pessoal' },
  descanso: { color: 'var(--color-neutral-400)', name: 'Descanso' },
  sono: { color: 'var(--color-neutral-700)', name: 'Sono' },
  rotina: { color: 'var(--color-neutral-500)', name: 'Rotina' },
};

const block = (
  start: string,
  end: string,
  title: string,
  detail: string,
  category: CategoryId,
  tag: ScheduleTag = null,
  slot: ScheduleSlot = null,
): ScheduleBlock => ({ start, end, title, detail, category, tag, slot });

export const THEME_BY_DAY: Partial<Record<DayId, StudyTheme>> = {
  seg: 'seg', ter: 'ter', qua: 'qua', qui: 'qui', sex: 'sex',
};

export const STUDY_TRACK: Record<StudyPhase, StudyPhaseDefinition> = {
  f1: {
    note: 'Fase 1 — Fundação. Redes entra agora porque cloud e DevOps são construídos em cima dela: quem estuda nuvem sem saber o que é sub-rede acaba decorando nome de serviço. Ao fim das oito semanas você explica o que acontece entre o clique e a resposta, camada por camada, do pacote ao índice do banco.',
    seg: { t: 'System design — o caminho da requisição', d: 'DNS, balanceador, aplicação, cache, banco. Latência contra throughput e cálculo grosseiro de escala. Desenhe no papel o sistema que você mexe no trabalho e marque com X onde ele quebraria com dez vezes o tráfego.' },
    ter: { t: 'Backend — Node por dentro', d: 'Event loop, microtask contra macrotask, streams, backpressure, worker threads. Meça em vez de ler: trave o event loop de propósito e prove com clinic.js ou node --prof. Sem isso, "Node é assíncrono" continua sendo frase decorada.' },
    qua: { t: 'Dados — modelagem que aguenta', d: 'No Mongo, modele pelo padrão de acesso e não por entidade. Embedding contra referência, índices compostos, regra ESR, explain() em toda query que você já escreveu. Conte quantas fazem varredura de coleção inteira.' },
    qui: { t: 'Redes — o que acontece de verdade', d: 'DNS, handshake TCP, TLS, HTTP/1.1 contra HTTP/2 contra HTTP/3, keep-alive, o custo real de um round-trip. Redes é o único tema dessa lista que você consegue observar diretamente: abra a aba de rede do navegador ou o Wireshark e olhe os pacotes. Quase ninguém olha, e é o que torna o resto concreto.' },
    sex: { t: 'IA — a API na mão, sem framework', d: 'Chamada direta ao modelo, streaming da resposta, saída estruturada em JSON, contagem de token e custo por requisição. Entenda o HTTP antes de tocar em LangChain: quase todo problema de IA em produção é problema de engenharia comum.' },
  },
  f2: {
    note: 'Fase 2 — Operação. Aqui você deixa de só escrever código e passa a colocá-lo no ar com segurança e a enxergar o que ele faz depois do deploy. É a fase que mais muda como o mercado te enxerga, porque a maioria dos fullstack para no merge.',
    seg: { t: 'System design — falha e escala', d: 'Idempotência, rate limiting, retry com backoff, circuit breaker, fila como amortecedor. Replicação, consistência eventual, CAP. Para cada um, escreva uma frase: que problema real resolve e o que custa em troca.' },
    ter: { t: 'Backend — cache e assincronia', d: 'Redis como cache e como lock distribuído, estratégias de invalidação, filas de job com BullMQ pra tirar trabalho lento de dentro do request. Meta medida, não sentida: nenhuma rota acima de 300ms no p95.' },
    qua: { t: 'DevOps — do commit até produção', d: 'Dockerfile multi-stage escrito do zero, pipeline de CI que roda teste e bloqueia merge quebrado, e observabilidade: log estruturado, métricas p50/p95/p99, tracing, health check. DevOps não é uma pilha de ferramentas, é encurtar a distância entre commit e produção sem aumentar o risco.' },
    qui: { t: 'Cloud — infraestrutura de verdade', d: 'Modelos de serviço, e principalmente rede na nuvem: VPC, sub-rede, grupo de segurança, balanceador — é aqui que a fase 1 volta e faz sentido. Infraestrutura como código com Terraform. E leia a fatura: entender custo de nuvem é uma habilidade rara, e cara pra empresa que não tem.' },
    sex: { t: 'IA — busca semântica no seu stack', d: 'Embeddings, chunking, estratégia de recuperação e busca vetorial no Atlas, que é onde o Mongo que você já usa encontra o assunto sem trocar de linguagem. Entenda por que um RAG mal feito é pior que nenhum RAG.' },
  },
  f3: {
    note: 'Fase 3 — Rigor. Segurança só entra agora porque ela precisa de backend, redes e cloud pra não virar decoreba da lista da OWASP. E o exercício de quinta — desenhar em voz alta e se gravar — é o de maior retorno da trilha inteira: entrevista de arquitetura é falar sob perguntas, não escrever.',
    seg: { t: 'System design — decidir e registrar', d: 'O trabalho de arquiteto é escolher e justificar, não desenhar bonito. Um ADR por semana sobre uma decisão real do projeto: contexto, opções consideradas, escolha, consequência aceita. Estude também os padrões que você ainda evita — event sourcing, CQRS, saga — pra conhecer o custo de cada um e não só a propaganda.' },
    ter: { t: 'Backend — o que separa CRUD de produto', d: 'Multi-tenancy, autorização granular, migração sem downtime, versionamento de API, transações e garantias ACID. É o repertório de quem já manteve algo vivo em produção, e é exatamente o que se pergunta de pleno pra sênior.' },
    qua: { t: 'Segurança — ataque o seu próprio código', d: 'OWASP Top 10 aplicado ao que você escreveu, não em teoria: injeção, autenticação quebrada, controle de acesso falho. Gestão e rotação de segredo, e cadeia de dependência — npm audit é o começo da conversa, não o fim. Tente invadir o seu projeto antes que alguém faça isso por você.' },
    qui: { t: 'System design aplicado — desenhar em voz alta', d: 'Um sistema por semana em 45 minutos, falando: encurtador de URL, feed, upload de arquivo grande, sistema de fila, chat, notificação em massa. Comece por requisitos e cálculo de escala, termine por trade-offs. Grave o áudio e ouça — é ouvindo que você descobre onde travou e o que decorou sem entender.' },
    sex: { t: 'IA — fine-tuning e avaliação', d: 'Fine-tuning resolve formato e estilo consistentes; conhecimento novo é RAG, não ajuste fino — confundir os dois é a forma mais cara de errar nessa área. Monte um dataset pequeno, rode um ajuste num modelo aberto e, principalmente, avalie: sem conjunto de avaliação, fine-tuning é fé.' },
  },
};

export const WEEKLY_HABITS: Partial<Record<DayId, StudyTopic>> = {
  seg: { t: 'Hábito — ler código de gente melhor', d: 'Vinte minutos lendo um trecho de projeto aberto no seu stack. Não pra contribuir: pra ver como alguém experiente organiza pasta, nomeia função e trata erro. Ler código ensina mais por hora do que escrever.' },
  ter: { t: 'Hábito — simplificar o próprio código', d: 'Abra o que você escreveu ontem e deixe mais curto e mais claro. Deletar linha é progresso. Se você não consegue explicar uma função em uma frase, ela faz coisa demais.' },
  qua: { t: 'Hábito — relato de um erro', d: 'Meia página sobre um bug da semana: sintoma, causa real, como você achou. Vira post, vira resposta de entrevista, vira documentação. É o hábito de maior retorno da lista inteira.' },
  qui: { t: 'Hábito — rede e carreira', d: 'Uma mensagem pra alguém da área ou pro seu mentor, duas vagas salvas e analisadas, uma seção do LinkedIn reescrita.' },
  sex: { t: 'Hábito — publicar a semana', d: 'Push, README atualizado e um parágrafo curto no GitHub ou LinkedIn sobre o que você entendeu essa semana. Aprendizado que ninguém vê não conta como portfólio.' },
};

export const LEETCODE: StudyTopic = {
  t: 'LeetCode — um problema por dia',
  d: 'Trinta minutos: vinte resolvendo, dez escrevendo onde você travou e qual padrão resolveria. O registro do erro vale mais que a solução. Se resolveu de primeira e sem esforço, suba o nível amanhã.',
};

const weekdayMorning: ScheduleBlock[] = [
  block('07:00', '07:15', 'Acordar, água, luz da janela', 'Abra a cortina antes de olhar o celular. Mobilidade de ombro e quadril, cinco minutos.', 'rotina'),
  block('07:15', '07:45', 'Café da manhã', 'Refeição de verdade, sentado.', 'rotina'),
  block('07:45', '08:10', 'Banho e se arrumar', 'Deixe a mochila da academia pronta agora, não à noite.', 'rotina'),
  block('08:10', '08:40', 'Revisão espaçada', 'Cartões do que a trilha cobriu nos últimos dias e um conceito explicado em voz alta, sem consultar. Todo card sai de um bloco da trilha ou da leitura — você não cria card de coisa que passou os olhos.', 'estudo'),
  block('08:40', '08:50', 'Leitura curta', 'Dez minutos numa fonte só sobre novidade de IA ou dev, com timer. Sem timer isso vira quarenta minutos de rolagem e come o bloco de projeto.', 'estudo'),
  block('08:50', '09:00', 'Trajeto até o trabalho', '', 'rotina'),
];

const gymEvening: ScheduleBlock[] = [
  block('18:00', '18:05', 'Saída do trabalho', 'Cinco minutos até em casa.', 'rotina'),
  block('18:05', '18:20', 'Lanche pré-treino e trocar de roupa', 'Muito carboidrato, proteína moderada, quase nada de gordura e fibra. Banana com whey, ou pão com geleia e iogurte grego.', 'rotina'),
  block('18:20', '18:40', 'Trajeto até a academia', 'Se atrasar no trabalho, vá direto de lá com o lanche na mochila.', 'rotina'),
  block('18:40', '19:50', 'Academia', 'Anote carga e repetições dos quatro principais na hora, não depois.', 'treino'),
  block('19:50', '20:10', 'Volta pra casa', '', 'rotina'),
  block('20:10', '20:45', 'Jantar e descanso passivo', 'Não encaixe nada aqui, de propósito.', 'descanso'),
  block('20:45', '21:20', 'Leitura do livro em modo leve', 'Trinta e cinco minutos de livro no papel, sem cobrança de anotação. Ler é a única coisa da trilha que funciona bem com o corpo cansado — codar às 20:45 depois de treinar não funciona.', 'estudo', 'opcional'),
  block('21:20', '22:00', 'Videogame', 'Se pulou o bloco anterior, você tem uma hora e quinze.', 'pessoal'),
  block('22:00', '23:00', 'Sem tela', 'Celular longe da cama, luz baixa, alongar ou ler no papel.', 'descanso'),
  block('23:00', '07:00', 'Dormir', 'Oito horas. É a variável que mais afeta tudo o que está acima.', 'sono'),
];

const weekdayWorkBlocks: Record<DemandLevel, ScheduleBlock[]> = {
  livre: [
    block('09:00', '09:10', 'Triagem do dia', 'Confirme que não há pendência e avise quem precisa saber. Dez minutos, sem abrir código.', 'trabalho'),
    block('09:10', '10:40', 'Projeto de aprendizado', 'Implemente o que a trilha da semana explicou. O projeto existe pra provar o conceito, não pra virar produto.', 'projeto'),
    block('10:40', '10:50', 'Micro-descanso', 'Levantar, andar, água, olhar pra longe. Sem celular — rolar feed não recupera atenção.', 'descanso'),
    block('10:50', '12:00', 'Trilha — primeira parte', '', 'estudo', null, 'trilha'),
    block('12:00', '12:40', 'Almoço', '', 'rotina'),
    block('12:40', '13:10', 'Faculdade EAD', 'Aula gravada ou leitura. Exigência baixa combina com o horário.', 'estudo'),
    block('13:10', '13:30', 'Descanso sem tela', 'Caminhada curta. Depois do almoço é a pior janela do dia.', 'descanso'),
    block('13:30', '14:40', 'Trilha — segunda parte', '', 'estudo', null, 'trilha2'),
    block('14:40', '14:50', 'Micro-descanso', '', 'descanso'),
    block('14:50', '15:20', 'LeetCode', '', 'estudo', null, 'leet'),
    block('15:20', '16:20', 'Leitura do livro', 'Uma hora no livro da fase, com caneta. Dia livre é quando a leitura longa cabe sem culpa.', 'estudo'),
    block('16:20', '16:40', 'Hábito da semana', '', 'estudo', null, 'habito'),
    block('16:40', '17:30', 'Projeto de aprendizado — parte 2', 'Termine deixando algo funcionando, nem que seja pequeno.', 'projeto'),
    block('17:30', '18:00', 'Fechamento do dia', 'Commit, três linhas do que fazer amanhã e cinco cartões do que estudou hoje.', 'projeto'),
  ],
  medio: [
    block('09:00', '09:15', 'Triagem do dia', 'Liste as demandas reais, responda só o urgente. Não abra código ainda.', 'trabalho'),
    block('09:15', '10:15', 'Projeto de aprendizado', 'Uma hora na melhor janela do dia implementando o tema da trilha da semana. Notificação fechada.', 'projeto'),
    block('10:15', '10:25', 'Micro-descanso', 'Levantar, andar, água, olhar pra longe. Sem celular.', 'descanso'),
    block('10:25', '12:00', 'Demandas do trabalho', '', 'trabalho'),
    block('12:00', '12:40', 'Almoço', '', 'rotina'),
    block('12:40', '13:10', 'Faculdade EAD', '', 'estudo'),
    block('13:10', '13:30', 'Descanso sem tela', 'Caminhada curta. Pior janela cognitiva do dia.', 'descanso'),
    block('13:30', '15:00', 'Demandas do trabalho', '', 'trabalho'),
    block('15:00', '15:10', 'Micro-descanso', '', 'descanso'),
    block('15:10', '16:20', 'Trilha', '', 'estudo', null, 'trilha'),
    block('16:20', '16:50', 'LeetCode', '', 'estudo', null, 'leet'),
    block('16:50', '17:10', 'Hábito da semana', '', 'estudo', null, 'habito'),
    block('17:10', '17:30', 'Buffer do trabalho', 'Sobra do dia e imprevistos. Se não sobrou nada, vira projeto.', 'trabalho'),
    block('17:30', '18:00', 'Fechamento do dia', 'Commit, três linhas do que fazer amanhã e cinco cartões do que estudou hoje.', 'projeto'),
  ],
  continuo: [
    block('09:00', '09:15', 'Triagem do dia', 'Dia pesado: defina agora o que precisa sair hoje e o que pode esperar. Avisar antes vale mais que entregar tarde.', 'trabalho'),
    block('09:15', '10:00', 'Projeto de aprendizado — reduzido', 'Quarenta e cinco minutos, escopo pequeno. Não comece coisa nova.', 'projeto'),
    block('10:00', '12:00', 'Demandas do trabalho', '', 'trabalho'),
    block('12:00', '12:40', 'Almoço', 'Coma longe da mesa. Em dia contínuo isso vale mais que meia hora de estudo.', 'rotina'),
    block('12:40', '13:10', 'LeetCode', '', 'estudo', null, 'leet'),
    block('13:10', '13:25', 'Descanso sem tela', 'Quinze minutos. Curto, mas não pule.', 'descanso'),
    block('13:25', '15:30', 'Demandas do trabalho', '', 'trabalho'),
    block('15:30', '15:40', 'Micro-descanso', 'Obrigatório em dia pesado, não opcional.', 'descanso'),
    block('15:40', '17:40', 'Demandas do trabalho', '', 'trabalho'),
    block('17:40', '18:00', 'Fechamento do dia', 'Um commit e a nota do que fazer amanhã. Em dia contínuo sobrevivem duas coisas: o LeetCode e isso aqui. A trilha cai hoje e volta amanhã — tudo bem.', 'projeto'),
  ],
};

const saturdayWorkBlocks: Record<DemandLevel, ScheduleBlock[]> = {
  livre: [
    block('08:30', '08:40', 'Triagem do dia', '', 'trabalho'),
    block('08:40', '10:10', 'Projeto de aprendizado', '', 'projeto'),
    block('10:10', '10:20', 'Micro-descanso', '', 'descanso'),
    block('10:20', '12:00', 'Leitura longa', 'Cem minutos no livro da fase, com caneta e marcação. É o bloco que sustenta a trilha da semana seguinte.', 'estudo'),
    block('12:00', '13:00', 'Almoço', '', 'rotina'),
    block('13:00', '14:30', 'Projeto de aprendizado — parte 2', '', 'projeto'),
    block('14:30', '14:40', 'Micro-descanso', '', 'descanso'),
    block('14:40', '15:10', 'LeetCode', '', 'estudo', null, 'leet'),
    block('15:10', '15:20', 'Micro-descanso', '', 'descanso'),
    block('15:20', '16:30', 'Fechar a semana e publicar', 'Termine o projeto da semana num estado apresentável, escreva o README explicando o que ele prova e publique. Aprendizado que ninguém vê não conta como portfólio.', 'projeto'),
  ],
  medio: [
    block('08:30', '08:45', 'Triagem do dia', '', 'trabalho'),
    block('08:45', '09:45', 'Projeto de aprendizado', '', 'projeto'),
    block('09:45', '10:00', 'Micro-descanso', '', 'descanso'),
    block('10:00', '12:00', 'Demandas do trabalho', '', 'trabalho'),
    block('12:00', '13:00', 'Almoço', '', 'rotina'),
    block('13:00', '14:15', 'Leitura longa', 'Setenta e cinco minutos no livro da fase, com caneta. Sustenta a trilha da semana seguinte.', 'estudo'),
    block('14:15', '14:30', 'Micro-descanso', '', 'descanso'),
    block('14:30', '15:30', 'Demandas do trabalho', '', 'trabalho'),
    block('15:30', '16:00', 'LeetCode', '', 'estudo', null, 'leet'),
    block('16:00', '16:30', 'Fechar a semana e publicar', 'README atualizado e um parágrafo publicado sobre o que você entendeu essa semana.', 'projeto'),
  ],
  continuo: [
    block('08:30', '08:45', 'Triagem do dia', '', 'trabalho'),
    block('08:45', '09:30', 'Projeto de aprendizado — reduzido', '', 'projeto'),
    block('09:30', '12:00', 'Demandas do trabalho', '', 'trabalho'),
    block('12:00', '13:00', 'Almoço', '', 'rotina'),
    block('13:00', '13:30', 'LeetCode', '', 'estudo', null, 'leet'),
    block('13:30', '15:50', 'Demandas do trabalho', '', 'trabalho'),
    block('15:50', '16:00', 'Micro-descanso', '', 'descanso'),
    block('16:00', '16:30', 'Leitura e fechar a semana', 'Meia hora de livro e um push. Mesmo em semana ruim, alguma coisa vai pro ar.', 'estudo'),
  ],
};

export const DAYS: Record<DayId, AgendaDay> = {
  seg: {
    name: 'Segunda-feira', shortName: 'Seg', meta: 'Folga do trabalho · Academia de manhã · Vôlei 20:50', hasDemand: false,
    note: 'Segunda não tem expediente. Na primeira segunda de cada mês, o bloco das 10:10 vira manutenção: auditoria dos repositórios, arquivar o velho, contribuir com um repositório aberto e limpar um código antigo seu.',
    blocks: [
      block('07:00', '07:15', 'Acordar, água, luz da janela', 'Mobilidade leve. Você treina em quarenta minutos.', 'rotina'),
      block('07:15', '07:40', 'Café da manhã', 'Refeição de verdade — o treino de hoje é o mais longo da semana.', 'rotina'),
      block('07:40', '08:00', 'Trajeto até a academia', '', 'rotina'),
      block('08:00', '09:15', 'Academia', 'Setenta e cinco minutos, sem pressa de horário.', 'treino'),
      block('09:15', '09:35', 'Volta pra casa', '', 'rotina'),
      block('09:35', '10:10', 'Banho e refeição pós-treino', '', 'rotina'),
      block('10:10', '11:10', 'Projeto de aprendizado', 'Uma hora implementando o tema da trilha. Segunda é o dia mais tranquilo pra mexer em coisa nova.', 'projeto', '1ª do mês: manutenção'),
      block('11:10', '11:20', 'Micro-descanso', '', 'descanso'),
      block('11:20', '12:30', 'Trilha', '', 'estudo', null, 'trilha'),
      block('12:30', '13:30', 'Almoço e descanso sem tela', '', 'descanso'),
      block('13:30', '14:30', 'Faculdade EAD', '', 'estudo'),
      block('14:30', '14:40', 'Micro-descanso', '', 'descanso'),
      block('14:40', '15:10', 'LeetCode', '', 'estudo', null, 'leet'),
      block('15:10', '15:50', 'Leitura do livro', 'Quarenta minutos no livro da fase.', 'estudo'),
      block('15:50', '16:10', 'Hábito da semana', '', 'estudo', null, 'habito'),
      block('16:10', '18:00', 'Livre', 'Descanso de verdade. Não encaixe nada — você joga vôlei em quatro horas.', 'descanso'),
      block('18:00', '19:00', 'Jantar', '', 'rotina'),
      block('19:00', '20:00', 'Videogame', 'Uma hora cheia.', 'pessoal'),
      block('20:00', '20:40', 'Livre e preparo do vôlei', '', 'descanso'),
      block('20:40', '20:50', 'Trajeto até o vôlei', '', 'rotina'),
      block('20:50', '22:00', 'Vôlei', '', 'treino'),
      block('22:00', '22:40', 'Banho morno, alongamento, ceia leve', 'Carboidrato com proteína. Banho morno ajuda a baixar a frequência cardíaca.', 'rotina'),
      block('22:40', '23:15', 'Sem tela, luz baixa', '', 'descanso'),
      block('23:15', '07:00', 'Dormir', 'Quinze minutos mais tarde de propósito: exercício vigoroso terminando menos de uma hora antes de deitar é o único cenário em que treino noturno atrapalha o sono.', 'sono'),
    ],
  },
  ter: { name: 'Terça-feira', shortName: 'Ter', meta: 'Trabalho 09:00–18:00 · Academia à noite', hasDemand: true, morning: weekdayMorning, getWorkBlocks: (level) => weekdayWorkBlocks[level], evening: gymEvening },
  qua: { name: 'Quarta-feira', shortName: 'Qua', meta: 'Trabalho 09:00–18:00 · Academia à noite', hasDemand: true, morning: weekdayMorning, getWorkBlocks: (level) => weekdayWorkBlocks[level], evening: gymEvening },
  qui: {
    name: 'Quinta-feira', shortName: 'Qui', meta: 'Trabalho 09:00–18:00 · Noite com a namorada', hasDemand: true, morning: weekdayMorning, getWorkBlocks: (level) => weekdayWorkBlocks[level],
    evening: [
      block('18:00', '18:05', 'Saída do trabalho', '', 'rotina'),
      block('18:05', '23:00', 'Livre — tempo com a namorada', 'Nada de estudo, nada de projeto, nada de commit. Meia hora apressada antes de um compromisso importante não rende e cria atrito.', 'pessoal', 'inegociável'),
      block('23:00', '07:00', 'Dormir', 'Se passar um pouco hoje, tudo bem. Não é todo dia.', 'sono'),
    ],
  },
  sex: { name: 'Sexta-feira', shortName: 'Sex', meta: 'Trabalho 09:00–18:00 · Academia à noite', hasDemand: true, morning: weekdayMorning, getWorkBlocks: (level) => weekdayWorkBlocks[level], evening: gymEvening },
  sab: {
    name: 'Sábado', shortName: 'Sáb', meta: 'Trabalho 08:30–16:30 · A partir das 18:00 com a namorada', hasDemand: true,
    morning: [
      block('07:00', '07:10', 'Acordar, água, luz da janela', '', 'rotina'),
      block('07:10', '07:40', 'Café da manhã', '', 'rotina'),
      block('07:40', '08:00', 'Revisão espaçada', 'Versão curta de vinte minutos, porque hoje você entra mais cedo.', 'estudo'),
      block('08:00', '08:20', 'Banho e se arrumar', '', 'rotina'),
      block('08:20', '08:30', 'Trajeto até o trabalho', '', 'rotina'),
    ],
    getWorkBlocks: (level) => saturdayWorkBlocks[level],
    evening: [
      block('16:30', '16:35', 'Saída do trabalho', '', 'rotina'),
      block('16:35', '17:00', 'Descanso', 'Deitar, sem tela. Você trabalhou oito horas e ainda tem a noite pela frente.', 'descanso'),
      block('17:00', '17:45', 'Banho, lanche e se arrumar', '', 'rotina'),
      block('17:45', '18:00', 'Ajustes finais', '', 'rotina'),
      block('18:00', '23:30', 'Livre — tempo com a namorada', 'Bloco fechado, sem exceção.', 'pessoal', 'inegociável'),
      block('23:30', '07:30', 'Dormir', 'Horário solto hoje. Domingo você acorda sem alarme.', 'sono'),
    ],
  },
  dom: {
    name: 'Domingo', shortName: 'Dom', meta: 'Folga do projeto · Consolidação e preparação', hasDemand: false,
    note: 'Domingo não tem projeto e não tem trilha. Sim, quebra a sequência. Seis dias por semana com uma folga real sustenta por meses; sete dias não sustenta, e o custo de recomeçar depois do abandono é maior que o de um domingo parado.',
    blocks: [
      block('08:00', '08:30', 'Acordar sem alarme, água, café', '', 'rotina'),
      block('08:30', '09:30', 'Caminhada e alongamento', 'Descanso ativo, fora de casa de preferência.', 'treino'),
      block('09:30', '10:30', 'Café da manhã com calma', '', 'rotina'),
      block('10:30', '12:00', 'Meal prep da semana', 'Inclua os lanches pré-treino de terça, quarta e sexta já porcionados. É o que faz o bloco das 18:05 caber em quinze minutos.', 'rotina'),
      block('12:00', '13:00', 'Almoço', '', 'rotina'),
      block('13:00', '13:45', 'Notas da semana viram página pesquisável', 'Junte as anotações soltas dos cinco blocos de trilha e da leitura num lugar só, organizado e buscável. Anotação que você não acha de novo é anotação que não existe.', 'estudo'),
      block('13:45', '14:05', 'LeetCode leve', 'Um problema fácil, sem cronômetro, só pra não quebrar a corrente. Opcional de verdade: se a semana foi puxada, pule sem culpa.', 'estudo', 'opcional'),
      block('14:05', '14:35', 'Revisão da semana', 'Quantos blocos profundos aconteceram, quantos problemas você resolveu, como estava a energia às quinze horas. Uma vez por mês, estenda pra uma hora e meia e escreva o roadmap do mês seguinte.', 'estudo'),
      block('14:35', '18:00', 'Livre', 'Videogame, sair, não fazer nada. Sem código.', 'pessoal'),
      block('18:00', '19:00', 'Jantar', '', 'rotina'),
      block('19:00', '21:30', 'Livre', '', 'pessoal'),
      block('21:30', '22:30', 'Preparar a semana', 'Roupa de academia separada, mochila pronta e a primeira tarefa de segunda escrita num papel. Segunda de manhã você executa, não decide.', 'rotina'),
      block('22:30', '23:00', 'Sem tela', '', 'descanso'),
      block('23:00', '07:00', 'Dormir', '', 'sono'),
    ],
  },
};

export const DAY_ORDER: DayId[] = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'];

