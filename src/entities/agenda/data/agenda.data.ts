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
} from '../model/types';

/**
 * Arquivo central de conteúdo da agenda.
 * Para alterar horários, títulos ou descrições, edite somente este módulo.
 */
export const CATEGORY_DEFINITIONS: Record<CategoryId, CategoryDefinition> = {
  saas:     {color:'var(--color-accent)',      name:'SaaS'},
  estudo:   {color:'var(--color-accent-2)',    name:'Estudo'},
  trabalho: {color:'#6a7a8c',                  name:'Trabalho'},
  treino:   {color:'#b06a52',                  name:'Treino'},
  pessoal:  {color:'#97627e',                  name:'Pessoal'},
  descanso: {color:'var(--color-neutral-400)', name:'Descanso'},
  sono:     {color:'var(--color-neutral-700)', name:'Sono'},
  rotina:   {color:'var(--color-neutral-500)', name:'Rotina'}
};


const block = (start: string, end: string, title: string, detail: string, category: CategoryId, tag: ScheduleTag = null, slot: ScheduleSlot = null): ScheduleBlock => ({ start, end, title, detail, category, tag, slot });

export const THEME_BY_DAY: Partial<Record<DayId, StudyTheme>> = { seg:'sd', ter:'backA', qua:'backB', sex:'ia' };


export const STUDY_TRACK: Record<StudyPhase, StudyPhaseDefinition> = {
  f1:{
    note:'Fundamentos. Nada aqui é avançado, e é exatamente por isso que funciona: system design sem entender event loop e índice é decoreba de diagrama. Oito semanas. Ao final, você deve conseguir explicar o que acontece entre o clique e a resposta no ResuMax, camada por camada.',
    sd:{t:'System design — o caminho da requisição',
        d:'Vocabulário base: latência contra throughput, DNS, load balancer, camada de aplicação, cache, banco. Desenhe no papel a arquitetura do ResuMax como ela é hoje e marque com X onde ela quebra com dez mil usuários.'},
    backA:{t:'Backend — Node por dentro',
        d:'Event loop, microtask contra macrotask, streams, backpressure, worker threads. Meça em vez de ler: escreva um script que trava o event loop e prove com clinic.js ou node --prof. Sem isso, "Node é assíncrono" continua sendo uma frase decorada.'},
    backB:{t:'Backend — MongoDB de verdade',
        d:'Modelagem pelo padrão de acesso, não por entidade. Embedding contra referência, índices compostos e a regra ESR, explain() em cada query que você já escreveu no ResuMax. Anote quantas fazem varredura de coleção inteira.'},
    ia:{t:'IA aplicada — a API na mão, sem framework',
        d:'Chamada direta à API de um modelo, streaming da resposta, saída estruturada em JSON, contagem de token e custo por requisição. Entenda o HTTP antes de tocar em LangChain — quase todo problema de IA em produção é problema de engenharia comum.'}
  },
  f2:{
    note:'Escala e confiabilidade. Aqui system design e backend viram a mesma coisa: cada conceito de arquitetura você implementa no ResuMax na mesma semana em que estuda. Se não deu pra implementar, você não entendeu.',
    sd:{t:'System design — escala e falha',
        d:'Replicação, sharding, consistência eventual, CAP na prática. Idempotência, rate limiting, retry com backoff exponencial, circuit breaker. Para cada item, responda por escrito: onde isso está faltando no ResuMax hoje e o que acontece quando faltar.'},
    backA:{t:'Backend — cache e filas',
        d:'Redis como cache e como lock distribuído, estratégias de invalidação, filas de job com BullMQ pra tirar trabalho lento de dentro do request. Meta mensurável: nenhuma rota da sua API acima de 300ms no p95.'},
    backB:{t:'Backend — observabilidade e resiliência',
        d:'Log estruturado, tracing distribuído, métricas p50/p95/p99, health check, graceful shutdown. Teste de integração com container de banco de verdade, não com mock do Mongo — mock esconde justamente os bugs que derrubam produção.'},
    ia:{t:'IA aplicada — busca semântica no seu próprio stack',
        d:'Embeddings e Atlas Vector Search, que é exatamente onde JavaScript, MongoDB e IA se encontram sem você trocar de linguagem. Chunking, estratégia de recuperação, e por que um RAG mal feito é pior que nenhum RAG.'}
  },
  f3:{
    note:'Profundidade. É a fase que vira diferencial em entrevista e em salário, e a que mais gente abandona porque não tem resultado visível rápido. Oito semanas.',
    sd:{t:'System design — desenhar do zero, em voz alta',
        d:'Um sistema por semana em 45 minutos, falando: encurtador de URL, feed, upload de arquivo grande, sistema de fila, chat. Comece pelos requisitos e pelo cálculo de escala, termine pelos trade-offs. Grave o áudio e ouça depois — é aí que você descobre onde travou.'},
    backA:{t:'Backend — o que separa CRUD de produto',
        d:'Multi-tenancy, autorização granular, migração sem downtime, versionamento de API, transações e garantias ACID no Mongo. São os assuntos que aparecem quando o entrevistador quer saber se você já manteve algo em produção.'},
    backB:{t:'Backend — performance sob carga',
        d:'Teste de carga com k6, profiling de memória, connection pooling, N+1 no Mongo, paginação por cursor em vez de skip. Ache o gargalo real do ResuMax, derrube-o e escreva o antes e depois com números.'},
    ia:{t:'IA aplicada — avaliação e custo',
        d:'Como saber se sua feature de IA piorou depois de uma mudança: conjunto de teste próprio, avaliação automática, cache de resposta, fallback de modelo e teto de gasto por usuário. É o que quase ninguém faz e o que todo produto com IA precisa.'}
  }
};


const manhaSemana: ScheduleBlock[] = [
  block('07:00','07:15','Acordar, água, luz da janela','Abra a cortina antes de olhar o celular. Mobilidade leve de ombro e quadril, 5 minutos.','rotina'),
  block('07:15','07:45','Café da manhã','Refeição de verdade, sentado. Proteína + carboidrato.','rotina'),
  block('07:45','08:15','Banho e se arrumar','Deixe a mochila da academia pronta agora, não à noite.','rotina'),
  block('08:15','08:50','Revisão espaçada','Cartões do Anki do que a trilha cobriu nos últimos dias, depois explique um conceito em voz alta sem consultar nada. É revisão, não conteúdo novo — todo card sai do bloco da trilha da tarde.','estudo'),
  block('08:50','09:00','Trabalho','Cinco minutos de trajeto, dez de folga.','rotina')
];

const noiteAcademia = (extraTitle: string, extraDetail: string): ScheduleBlock[] => ([
  block('18:00','18:05','Saída do trabalho','Cinco minutos até em casa.','rotina'),
  block('18:05','18:20','Lanche pré-treino e trocar de roupa','Alto em carboidrato, proteína moderada, quase sem gordura e fibra. Banana com whey, ou pão com geleia e iogurte grego.','rotina'),
  block('18:20','18:40','Trajeto até a academia','Vinte minutos. Se atrasar no trabalho, vá direto de lá com o lanche na mochila.','rotina'),
  block('18:40','19:50','Academia','Setenta minutos. Anote carga e repetições dos quatro principais na hora, não depois.','treino'),
  block('19:50','20:10','Volta pra casa','','rotina'),
  block('20:10','20:45','Jantar e descanso passivo','Não encaixe nada aqui de propósito. Comer e não fazer nada é parte do plano.','descanso'),
  block('20:45','21:20',extraTitle,extraDetail,'saas','opcional'),
  block('21:20','22:00','Videogame','Quarenta minutos. Se pulou o bloco anterior, você tem uma hora e quinze.','pessoal'),
  block('22:00','23:00','Sem tela','Celular longe da cama. Luz baixa. Alongar ou ler no papel.','descanso'),
  block('23:00','07:00','Dormir','Oito horas. É a variável que mais afeta tudo o que está acima.','sono')
]);

const weekdayWorkBlocks: Record<DemandLevel, ScheduleBlock[]> = {
  livre: [
    block('09:00','09:10','Triagem do dia','Confirme que não há nada pendente e avise quem precisa saber. Dez minutos, sem abrir código.','trabalho'),
    block('09:10','10:40','SaaS — bloco profundo','Uma feature, não cinco. Celular no modo foco, notificação fechada.','saas'),
    block('10:40','10:50','Micro-descanso','Levantar, andar, água, olhar pra longe. Sem celular — rolar feed não recupera atenção.','descanso'),
    block('10:50','12:00','SaaS — segundo bloco','Continue a mesma feature. Trocar de contexto aqui joga fora o aquecimento das duas horas anteriores.','saas'),
    block('12:00','12:40','Almoço','','rotina'),
    block('12:40','13:10','Faculdade EAD','Aula gravada ou leitura. Exigência cognitiva baixa combina com o horário.','estudo'),
    block('13:10','13:30','Descanso sem tela','Caminhada curta. Depois do almoço é a pior janela do dia, não force código aqui.','descanso'),
    block('13:30','15:00','SaaS — terceiro bloco','Dia livre é quando você paga dívida técnica: teste, deploy, aquele refactor que você vem adiando.','saas'),
    block('15:00','15:10','Micro-descanso','','descanso'),
    block('15:10','16:10','Estudo do nicho','','estudo',null,'trilha'),
    block('16:10','16:20','Micro-descanso','','descanso'),
    block('16:20','17:20','Trilha — segundo bloco','','estudo',null,'trilha2'),
    block('17:20','18:00','SaaS — fechamento','Commit, atualizar o README e escrever em três linhas o que fazer amanhã. Mata o custo de lembrar onde parou.','saas')
  ],
  medio: [
    block('09:00','09:15','Triagem do dia','Liste as demandas reais, responda só o urgente. Não abra código ainda.','trabalho'),
    block('09:15','10:45','SaaS — bloco profundo','Melhor janela cognitiva do dia. Noventa minutos, uma feature só.','saas'),
    block('10:45','10:55','Micro-descanso','Levantar, andar, água, olhar pra longe. Sem celular.','descanso'),
    block('10:55','12:00','Demandas do trabalho','','trabalho'),
    block('12:00','12:40','Almoço','','rotina'),
    block('12:40','13:10','Faculdade EAD','Aula gravada ou leitura.','estudo'),
    block('13:10','13:30','Descanso sem tela','Caminhada curta. Pior janela cognitiva do dia.','descanso'),
    block('13:30','15:00','Demandas do trabalho','','trabalho'),
    block('15:00','15:10','Micro-descanso','','descanso'),
    block('15:10','16:10','Estudo do nicho','','estudo',null,'trilha'),
    block('16:10','16:20','Micro-descanso','','descanso'),
    block('16:20','17:20','Buffer do trabalho','Sobra do dia e imprevistos. Se não sobrou nada, vira SaaS.','trabalho'),
    block('17:20','18:00','SaaS — fechamento','Commit, README e três linhas do que fazer amanhã.','saas')
  ],
  continuo: [
    block('09:00','09:15','Triagem do dia','Dia pesado: defina agora o que realmente precisa sair hoje e o que pode esperar.','trabalho'),
    block('09:15','10:15','SaaS — bloco profundo reduzido','Uma hora, protegida. Escopo pequeno: um bug, uma melhoria, um teste. Não comece feature nova.','saas'),
    block('10:15','12:00','Demandas do trabalho','','trabalho'),
    block('12:00','12:40','Almoço','Coma longe da mesa. Em dia contínuo isso vale mais que meia hora de estudo.','rotina'),
    block('12:40','13:10','Faculdade EAD','Só assistir, sem anotar. O objetivo hoje é não acumular atraso.','estudo'),
    block('13:10','13:25','Descanso sem tela','Quinze minutos. Curto, mas não pule.','descanso'),
    block('13:25','15:20','Demandas do trabalho','','trabalho'),
    block('15:20','15:30','Micro-descanso','Obrigatório em dia pesado, não opcional.','descanso'),
    block('15:30','17:30','Demandas do trabalho','','trabalho'),
    block('17:30','18:00','SaaS — fechamento mínimo','Um commit pequeno e a nota do que fazer amanhã. Trinta minutos preserva o hábito e o contexto.','saas')
  ]
};

const getThursdayWorkBlocks = (level: DemandLevel): ScheduleBlock[] => {
  const base = weekdayWorkBlocks[level].map((item) => ({ ...item }));
  if(level === 'continuo'){
    const index = base.findIndex((item) => item.title === 'Faculdade EAD');
    base[index] = block('12:40','13:10','Carreira — versão curta','Mande uma mensagem pra alguém da área e salve duas vagas. Cinco minutos de esforço, e o hábito semanal não morre no dia cheio.','estudo');
  } else {
    const index = base.findIndex((item) => item.title === 'Estudo do nicho');
    base[index] = block('15:10','16:10','Carreira','Aplicar em vagas, mandar mensagem pra uma pessoa da área e atualizar uma seção do LinkedIn. Cobre o hábito semanal inteiro num bloco só.','estudo');
  }
  return base;
};

const saturdayWorkBlocks: Record<DemandLevel, ScheduleBlock[]> = {
  livre: [
    block('08:30','08:40','Triagem do dia','','trabalho'),
    block('08:40','10:10','SaaS — bloco profundo','Sábado livre é o melhor bloco da semana depois de segunda. Use pra feature grande.','saas'),
    block('10:10','10:20','Micro-descanso','','descanso'),
    block('10:20','11:50','SaaS — segundo bloco','','saas'),
    block('11:50','12:00','Anotar onde parou','Dez minutos escrevendo o estado atual. Volta muito mais barata depois do almoço.','saas'),
    block('12:00','13:00','Almoço','','rotina'),
    block('13:00','13:50','Faculdade EAD','','estudo'),
    block('13:50','14:00','Micro-descanso','','descanso'),
    block('14:00','15:30','SaaS — terceiro bloco','','saas'),
    block('15:30','15:40','Micro-descanso','','descanso'),
    block('15:40','16:30','Fechamento da semana do projeto','Commit, README atualizado e o roadmap dos próximos sete dias escrito. Uma vez por mês, use esse bloco pra auditar os repositórios e arquivar o que está velho.','saas')
  ],
  medio: [
    block('08:30','08:45','Triagem do dia','','trabalho'),
    block('08:45','10:15','SaaS — bloco profundo','','saas'),
    block('10:15','10:25','Micro-descanso','','descanso'),
    block('10:25','12:00','Demandas do trabalho','','trabalho'),
    block('12:00','13:00','Almoço','','rotina'),
    block('13:00','13:50','Faculdade EAD','','estudo'),
    block('13:50','14:00','Micro-descanso','','descanso'),
    block('14:00','15:30','Demandas do trabalho','','trabalho'),
    block('15:30','15:40','Micro-descanso','','descanso'),
    block('15:40','16:30','Fechamento da semana do projeto','Commit, README e roadmap dos próximos sete dias. Uma vez por mês, auditoria dos repositórios aqui.','saas')
  ],
  continuo: [
    block('08:30','08:45','Triagem do dia','','trabalho'),
    block('08:45','09:45','SaaS — bloco profundo reduzido','Uma hora protegida, escopo pequeno.','saas'),
    block('09:45','12:00','Demandas do trabalho','','trabalho'),
    block('12:00','13:00','Almoço','','rotina'),
    block('13:00','13:20','Faculdade EAD','Só assistir.','estudo'),
    block('13:20','15:50','Demandas do trabalho','','trabalho'),
    block('15:50','16:00','Micro-descanso','','descanso'),
    block('16:00','16:30','Fechamento mínimo','Um commit e a nota da semana. Trinta minutos.','saas')
  ]
};

export const DAYS: Record<DayId, AgendaDay> = {
  seg: {
    name:'Segunda-feira', shortName:'Seg', meta:'Folga do trabalho · Academia de manhã · Vôlei 20:50',
    hasDemand:false,
    note:'Segunda não tem expediente. O dia inteiro é seu — é o único dia da semana em que você consegue duas horas seguidas de projeto com a cabeça totalmente livre.',
    blocks:[
      block('07:00','07:15','Acordar, água, luz da janela','Mobilidade leve. Você treina em quarenta minutos.','rotina'),
      block('07:15','07:40','Café da manhã','Refeição de verdade — você vai treinar pesado às oito.','rotina'),
      block('07:40','08:00','Trajeto até a academia','','rotina'),
      block('08:00','09:15','Academia','Setenta e cinco minutos. Treino mais longo da semana, aproveite o dia sem pressa.','treino'),
      block('09:15','09:35','Volta pra casa','','rotina'),
      block('09:35','10:10','Banho e refeição pós-treino','','rotina'),
      block('10:10','11:40','SaaS — bloco profundo','O maior bloco da semana. Reserve pra feature grande, não pra ajuste pequeno.','saas'),
      block('11:40','11:55','Micro-descanso','','descanso'),
      block('11:55','12:40','SaaS — continuação','Mesma feature. Termine deixando algo funcionando, nem que seja pequeno.','saas'),
      block('12:40','13:40','Almoço e descanso sem tela','','descanso'),
      block('13:40','14:40','Faculdade EAD','','estudo'),
      block('14:40','14:50','Micro-descanso','','descanso'),
      block('14:50','15:35','Lógica','Um problema em JavaScript e, mais importante, cinco linhas escritas sobre onde você errou. Duas vezes por semana: segunda e quinta.','estudo'),
      block('15:35','16:35','Estudo do nicho','','estudo',null,'trilha'),
      block('16:35','18:00','Livre','Descanso de verdade. Não encaixe nada aqui — você joga vôlei em quatro horas.','descanso'),
      block('18:00','19:00','Jantar','','rotina'),
      block('19:00','20:00','Videogame','Uma hora cheia.','pessoal'),
      block('20:00','20:40','Livre e preparo do vôlei','','descanso'),
      block('20:40','20:50','Trajeto até o vôlei','','rotina'),
      block('20:50','22:00','Vôlei','','treino'),
      block('22:00','22:40','Banho morno, alongamento, ceia leve','Carboidrato com proteína. Banho morno ajuda a baixar a frequência cardíaca.','rotina'),
      block('22:40','23:15','Sem tela, luz baixa','','descanso'),
      block('23:15','07:00','Dormir','Quinze minutos mais tarde que nos outros dias, de propósito: exercício vigoroso terminando menos de uma hora antes de deitar é o único cenário em que treino noturno atrapalha o sono.','sono')
    ]
  },
  ter: {
    name:'Terça-feira', shortName:'Ter', meta:'Trabalho 09:00–18:00 · Academia à noite',
    hasDemand:true, morning:manhaSemana, getWorkBlocks:(level: DemandLevel) => weekdayWorkBlocks[level],
    evening:noiteAcademia('SaaS em modo baixa energia','Bug pequeno, refatorar, escrever documentação. Você já fez o bloco profundo de manhã — se a energia não estiver aí, pule e jogue. Insistir aqui é como o plano inteiro quebra em três semanas.')
  },
  qua: {
    name:'Quarta-feira', shortName:'Qua', meta:'Trabalho 09:00–18:00 · Academia à noite',
    hasDemand:true, morning:manhaSemana, getWorkBlocks:(level: DemandLevel) => weekdayWorkBlocks[level],
    evening:noiteAcademia('Escrever o resumo de um bug que você resolveu','Meia página: qual era o sintoma, qual era a causa real, como você achou. Vira post, vira resposta de entrevista, vira documentação. Opcional se estiver acabado.')
  },
  qui: {
    name:'Quinta-feira', shortName:'Qui', meta:'Trabalho 09:00–18:00 · Noite com a namorada',
    hasDemand:true, morning:manhaSemana, getWorkBlocks:getThursdayWorkBlocks,
    evening:[
      block('18:00','18:05','Saída do trabalho','','rotina'),
      block('18:05','23:00','Livre — tempo com a namorada','Nada de estudo, nada de projeto, nada de commit. Meia hora apressada antes de um compromisso importante não rende nada e cria atrito. O bloco profundo da manhã já cobriu o dia.','pessoal','inegociável'),
      block('23:00','07:00','Dormir','Se passar um pouco hoje, tudo bem. Não é todo dia.','sono')
    ]
  },
  sex: {
    name:'Sexta-feira', shortName:'Sex', meta:'Trabalho 09:00–18:00 · Academia à noite',
    hasDemand:true, morning:manhaSemana, getWorkBlocks:(level: DemandLevel) => weekdayWorkBlocks[level],
    evening:noiteAcademia('Postar o progresso da semana','Push do que avançou, README atualizado e um parágrafo curto no LinkedIn ou no GitHub sobre o que mudou no projeto essa semana. Fecha a semana do SaaS.')
  },
  sab: {
    name:'Sábado', shortName:'Sáb', meta:'Trabalho 08:30–16:30 · A partir das 18:00 com a namorada',
    hasDemand:true,
    morning:[
      block('07:00','07:10','Acordar, água, luz da janela','','rotina'),
      block('07:10','07:40','Café da manhã','','rotina'),
      block('07:40','08:00','Revisão espaçada','Vinte minutos de cartões. Versão curta, porque hoje você entra mais cedo.','estudo'),
      block('08:00','08:20','Banho e se arrumar','','rotina'),
      block('08:20','08:30','Trajeto até o trabalho','','rotina')
    ],
    getWorkBlocks:(level: DemandLevel) => saturdayWorkBlocks[level],
    evening:[
      block('16:30','16:35','Saída do trabalho','','rotina'),
      block('16:35','17:00','Descanso','Deitar, sem tela. Você trabalhou oito horas e ainda tem a noite inteira pela frente.','descanso'),
      block('17:00','17:45','Banho, lanche e se arrumar','','rotina'),
      block('17:45','18:00','Ajustes finais','','rotina'),
      block('18:00','23:30','Livre — tempo com a namorada','Bloco fechado. Sem tarefa, sem exceção.','pessoal','inegociável'),
      block('23:30','07:30','Dormir','Horário solto hoje. Domingo você acorda sem alarme.','sono')
    ]
  },
  dom: {
    name:'Domingo', shortName:'Dom', meta:'Folga do projeto · Preparação da semana',
    hasDemand:false,
    note:'Domingo é o dia em que você não toca no SaaS. Sim, quebra a sequência. Seis dias por semana com uma folga real sustenta por meses; sete dias não sustenta.',
    blocks:[
      block('08:00','08:30','Acordar sem alarme, água, café','','rotina'),
      block('08:30','09:30','Caminhada e alongamento','Descanso ativo. Fora de casa, de preferência.','treino'),
      block('09:30','10:30','Café da manhã com calma','','rotina'),
      block('10:30','12:00','Meal prep da semana','Inclua os lanches pré-treino de terça, quarta e sexta já porcionados. É o que faz o bloco das 18:05 caber em quinze minutos.','rotina'),
      block('12:00','13:00','Almoço','','rotina'),
      block('13:00','13:30','Revisão da semana','Olhe a planilha de adesão: quantos dias o bloco profundo aconteceu, quantas features saíram, como estava a energia às quinze horas. Uma vez por mês, estenda pra uma hora e meia e faça também o roadmap do mês e a limpeza dos repositórios.','estudo'),
      block('13:30','18:00','Livre','Videogame, sair, não fazer nada. Sem código.','pessoal'),
      block('18:00','19:00','Jantar','','rotina'),
      block('19:00','21:30','Livre','','pessoal'),
      block('21:30','22:30','Preparar a semana','Roupa de academia separada, mochila pronta e a primeira tarefa de segunda escrita num papel. Segunda de manhã você executa, não decide.','rotina'),
      block('22:30','23:00','Sem tela','','descanso'),
      block('23:00','07:00','Dormir','','sono')
    ]
  }
};


export const DAY_ORDER: DayId[] = ['seg','ter','qua','qui','sex','sab','dom'];

export const DEMAND_NOTES: Record<DemandLevel, string> = {
  livre:'Sem demanda hoje: o expediente inteiro é seu. Quase cinco horas de projeto e duas de estudo. É o dia de atacar feature grande, pagar dívida técnica e adiantar faculdade — não de responder e-mail devagar.',
  medio:'Cenário padrão. O trabalho ocupa cerca de três horas e meia e você ainda protege duas horas e dez de projeto, uma hora de estudo e meia hora de faculdade. Se o dia virar, o que encolhe primeiro é o estudo — nunca o bloco profundo da manhã.',
  continuo:'Dia pesado. O trabalho leva quase seis horas e você abre mão do estudo do nicho. Mantenha só duas coisas: a hora protegida de manhã e os trinta minutos de fechamento. Perder o dia inteiro é aceitável; perder o contexto do projeto custa dois dias pra recuperar.'
};
