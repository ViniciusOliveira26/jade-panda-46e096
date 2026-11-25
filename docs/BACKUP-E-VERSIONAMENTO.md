# Native Speakers — Backup, versionamento e testes de fumaça

Guia da Etapa 0 do plano Native Speakers 2.0. Siga estes passos antes de cada etapa de mudança.

## 1. Marco da versão 1 (antes da 2.0)

A última versão publicada antes da 2.0 é o commit `7e42730`
("Improve audio playback with human voice…"). Crie uma tag e uma branch de manutenção:

```bash
git tag -a v1.0-native-speakers 7e42730 -m "Native Speakers 1.0 — antes da 2.0"
git branch release/1.x 7e42730
git push origin v1.0-native-speakers release/1.x
```

- Correções urgentes da versão 1 entram em `release/1.x`.
- O desenvolvimento da 2.0 acontece em branches `feature/...`, cada etapa num Pull Request próprio.

## 2. Versionamento

- Versionamento semântico: `1.1.0` (Etapa 1), `2.0.0` (reorganização + novo visual), `2.x.y` depois.
- Todas as mudanças são registradas no `CHANGELOG.md`.
- Cada Pull Request gera uma **Deploy Preview** no Netlify com uma **branch de banco de dados
  separada**: os testes não tocam nos dados dos alunos em produção.

## 3. Backup do banco de dados

Os dados dos alunos ficam na tabela `student_progress` (Netlify Database / Postgres).

Antes de qualquer etapa que crie migrations novas:

1. No painel do Netlify, abra o projeto e vá em **Database**. Copie a connection string da
   branch `production` (é um segredo: não cole em arquivos do repositório nem em mensagens).
2. Exporte a tabela com uma ferramenta Postgres, por exemplo:
   ```bash
   pg_dump "$DATABASE_URL" --table=student_progress --data-only --format=custom \
     --file="backup-student_progress-$(date +%Y-%m-%d).dump"
   ```
3. Guarde o arquivo **fora do repositório Git**, num local privado: ele contém nomes, e-mails e
   textos dos alunos.

Regras para o banco:
- **Nunca** edite, renomeie ou apague uma migration que já foi aplicada
  (`netlify/database/migrations/20261104193745_create_student_progress`).
- Mudanças no banco são feitas só com **migrations novas e aditivas** (novas tabelas ou colunas).

## 4. Rollback do site

O Netlify guarda os deploys anteriores por 90 dias. Para voltar atrás:
painel do Netlify → **Deploys** → escolha o deploy → **Publish deploy**.

## 5. Teste de fumaça (antes e depois de cada publicação)

Faça na Deploy Preview, de preferência no computador e no celular:

- [ ] Criar conta (senha com 8 caracteres ou mais) → receber o e-mail de confirmação → entrar
- [ ] Entrar com uma conta existente
- [ ] "Esqueci minha senha" → receber o link → criar uma nova senha
- [ ] Abrir uma unidade e estudar o conteúdo (gramática, objetivos)
- [ ] Exercícios: responder a uma múltipla escolha e a uma lacuna (os pontos aumentam)
- [ ] Listening: reproduzir o diálogo (normal e lento) e gravar a voz em "Repita a frase"
- [ ] Vocabulário: virar 6 flashcards (a tarefa fica concluída)
- [ ] Leitura: responder a uma pergunta. Escrita: salvar um texto
- [ ] Simulado: concluir e conferir a nota → em "Meu progresso", abrir **Ver revisão**
- [ ] Recarregar a página: o progresso continua igual
- [ ] Entrar em outro aparelho: o mesmo progresso aparece
- [ ] Sair da conta: volta para a tela de login
