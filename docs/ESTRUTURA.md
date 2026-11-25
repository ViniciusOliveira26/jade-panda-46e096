# Native Speakers — Estrutura do projeto (a partir da Etapa 2)

```
index.html                 # casca da página (o Vite injeta o app)
src/
  main.tsx                 # inicialização do React
  App.tsx                  # login × curso, página atual
  content/
    types.ts               # formato do conteúdo de uma unidade
    index.ts               # lista das unidades, em ordem
    levels.ts              # nível de dificuldade de cada unidade
    units/unit-01.ts …     # conteúdo pedagógico de cada unidade
  state/
    progress.ts            # dados do progresso, tarefas e regras (funções puras)
    actions.ts             # respostas, pontos, tarefas, simulado
    store.ts               # estado global do progresso
    nav.tsx                # página e unidade abertas
    toasts.ts              # avisos "Progresso atualizado"
    activity.ts            # dias estudados (sequência), tempo de estudo, histórico
    insights.ts            # painel: situação das unidades, "continue aprendendo",
                           # recomendações e notificações (funções puras)
  services/
    sync.ts                # salvar/carregar o progresso na conta (/api/progress)
    speech.ts              # vozes (texto para fala) e reconhecimento de voz
    studyTimer.ts          # conta o tempo ativo nas telas de estudo
  auth/                    # tela de login, cadastro, recuperação de senha, validação
  landing/                 # página de apresentação (antes do login)
  pages/                   # Início, Minha jornada, Unidades, Exercícios, Listening, Vocabulário,
                           # Leitura, Escrita, Simulado, Meu desempenho, Meu perfil
  components/              # cabeçalho, menu lateral, ícones, logo, ui.tsx (PageHeader,
                           # StatCard, Alert, Field), barra de progresso, etc.
  utils/                   # normalização de texto, embaralhar, montar o simulado
  styles/                  # CSS dividido por assunto
tests/                     # testes automáticos (npm test)
legacy/v1/                 # versão 1 original, só como referência (não publicada)
netlify/functions/         # API /api/progress
netlify/database/          # migrations do banco (nunca editar as aplicadas)
db/                        # esquema do banco (Drizzle)
```

## Comandos

- `npm run dev`: servidor local (ou `netlify dev`, que também roda a API e o banco).
- `npm test`: testes automáticos.
- `npm run typecheck`: verificação de tipos.
- `npm run build`: build de produção. O Netlify roda esse comando a cada deploy.

## Como editar o conteúdo de uma unidade

Edite o arquivo `src/content/units/unit-XX.ts`. **Não mude a ordem nem apague** questões, frases
ou flashcards que já existem: o progresso salvo dos alunos usa a posição de cada item. Para adicionar
itens, coloque-os no fim da lista.

O teste `tests/content.test.ts` confere que o conteúdo é igual ao da versão 1. Depois de uma
mudança proposital no conteúdo, atualize esse teste.
