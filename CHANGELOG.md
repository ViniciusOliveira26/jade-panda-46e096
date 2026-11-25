# Changelog — Native Speakers

## 1.4.0 — Painel do aluno

- "Início" virou um painel do aluno: saudação com o nome, mensagem de boas-vindas e os últimos 7 dias estudados.
- Seis indicadores com os dados reais do aluno: progresso do curso, unidades concluídas, pontuação, média de acertos, tempo de estudo e sequência de dias. Quando ainda não há dados, o painel diz isso em vez de mostrar números inventados.
- "Continue aprendendo" mostra a última atividade e abre a questão, frase, flashcard ou frase do diálogo onde o aluno parou.
- Recomendações a partir dos erros e pendências do aluno (reforçar gramática, revisar vocabulário, praticar listening, reler o texto, novo simulado).
- Histórico das atividades recentes, salvo na conta.
- Trilha das unidades com descrição, nível de dificuldade, situação (bloqueada, disponível ou concluída) e percentual. Cada unidade é liberada quando a anterior é concluída. "Minha jornada" mostra as mesmas informações.
- Notificações no cabeçalho (unidade concluída, resultado do simulado, lembrete da sequência) e foto da conta, quando existir.
- Celular: barra de navegação inferior (Início, Jornada, Exercícios, Desempenho e Mais).
- Indicador de carregamento no formato do painel enquanto o progresso é carregado.
- Contas antigas começam com sequência, tempo de estudo e histórico vazios: esses dados passam a ser registrados a partir desta versão.

## 1.3.0 — Redesign visual (Native Speakers 2.0)

- Nova identidade visual: azul-marinho (marca), azul vibrante (ações), branco e cinza-claro (base), verde (concluído) e laranja (desafios e avisos). Logotipo novo em SVG.
- Página de apresentação pública antes do login: menu, apresentação, benefícios, recursos com flashcard de demonstração, "como funciona", perguntas frequentes e rodapé institucional.
- Login e cadastro em novo layout, com validação por campo, mensagens de erro e sucesso, mostrar/ocultar senha e recuperação de senha.
- Navegação: Início, Minha jornada, Unidades, Listening, Vocabulário, Exercícios (prática, leitura, escrita e simulado), Meu desempenho e Meu perfil. Barra lateral no computador e menu deslizante no tablet/celular.
- Novas telas "Minha jornada" (caminho das unidades e tarefas) e "Meu perfil" (nome, senha, voz das aulas, ajuda e sair).
- Nenhum conteúdo, exercício ou regra de progresso foi alterado.

## 1.2.0 — Etapa 2 do plano 2.0: reorganização com React + TypeScript

O visual, os textos e o comportamento continuam os mesmos para o aluno. Mudou a organização do código.

### Estrutura
- O site passou a ser um app **React + TypeScript** com build do **Vite** (`npm run build` → pasta `dist`).
- O conteúdo pedagógico saiu do `index.html` e do `lessons.js` e foi para **um arquivo por unidade** (`src/content/units/unit-01.ts` … `unit-10.ts`), sem mudar nenhum texto, resposta ou ordem.
- O CSS foi dividido em `src/styles/` (tokens, base, layout, componentes, login, responsivo).
- A lógica ficou em módulos: `state/` (progresso e pontuação), `services/` (sincronização e voz), `auth/` (login), `pages/` e `components/`.
- Os arquivos da versão 1 ficaram guardados em `legacy/v1/` (não são publicados).

### Qualidade e segurança
- Testes automáticos (`npm test`): um compara o conteúdo das 10 unidades com o original da versão 1, e outros conferem as regras de pontuação, flashcards, tarefas e simulado.
- Verificação de tipos do TypeScript antes de cada build.
- Todo o texto vai para a tela pelo React, que escapa o conteúdo automaticamente.
- A política de segurança (CSP) não permite mais scripts embutidos na página. Os cabeçalhos de segurança agora ficam em `public/_headers`.
- Os arquivos do build têm um hash no nome e ficam em cache por um ano. Depois de cada deploy, o aluno recebe a versão nova sem arquivos antigos no cache.

### Correções
- Cadastro: quando a conta já vem confirmada, o aluno entra direto (antes, a verificação usava um campo que não existe).
- Gravação de voz: ao parar a gravação, não aparece mais a mensagem de erro "aborted".

## 1.1.0 — Etapas 0 e 1 do plano 2.0

### Segurança e privacidade
- Ao sair da conta, os dados do aluno são apagados do aparelho, a menos que ainda não tenham sido enviados ao servidor (nesse caso, o aluno é avisado).
- O progresso salvo antes da criação das contas só é transferido para uma conta depois que o aluno confirma que ele é dele.
- Senha mínima de 8 caracteres no cadastro e na troca de senha.
- Textos vindos do aluno ou do aparelho (fala reconhecida, textos escritos, nomes de vozes, histórico) são escapados antes de aparecer na tela.
- O servidor guarda só os campos de progresso conhecidos.
- Cabeçalhos de segurança: Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy e Permissions-Policy.

### Melhorias
- A revisão dos erros do simulado fica salva e pode ser aberta em "Meu progresso" → "Ver revisão".
- Acessibilidade: leitores de tela anunciam só o nome da página, em vez de ler a página inteira a cada troca de tela.

### Documentação
- `leia-me.txt` atualizado (publicação via Git; o Netlify Drop não funciona mais).
- Novo guia `docs/BACKUP-E-VERSIONAMENTO.md` (tag da v1, backup do banco, rollback, teste de fumaça).

## 1.0.0
- Versão original: 10 unidades, exercícios, listening, vocabulário, leitura, escrita, simulado, contas de aluno e progresso na nuvem.
