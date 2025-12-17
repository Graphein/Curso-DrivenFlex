# Clean Code – Análise e Refatoração

Este documento apresenta a análise de problemas de Clean Code encontrados no código legado do projeto **NewsGen**, bem como um resumo das melhorias aplicadas durante o processo de refatoração.

A análise foi realizada com base nos princípios apresentados por Robert C. Martin (Clean Code) e no checklist fornecido no módulo.

---

## 1. Controllers

### Arquivo: `src/controllers/news-controller.ts`

**Problemas encontrados no código legado:**

- Ausência de blocos `try/catch` e falta de delegação adequada de erros para o middleware global de erro.
- Validação de `id` repetida em múltiplas funções, violando o princípio **DRY (Don't Repeat Yourself)**.
- Controller realizando validações de regras de negócio, o que fere o princípio de **Single Responsibility**.
- Nomes de funções pouco semânticos e inconsistentes  
  (ex.: `alterNews` → deveria ser `updateNews`, `getSpecificNews` → `getNewsById`).
- Falta de padronização nas respostas HTTP.
- Ausência de middlewares dedicados para validação de entrada (DTOs / schemas).
- A rota `GET /news` não suportava paginação, ordenação ou filtro por título.
- Falta de tratamento explícito para exceções lançadas pela camada de service.

---

## 2. Repositories

### Arquivo: `src/repositories/news-repository.ts`

**Problemas encontrados no código legado:**

- Funções com nomes inconsistentes e mistura de português e inglês.
- Repository realizando lógica que não lhe compete, como conversão de datas.
- Uso direto de tipos do Prisma (`News`) como DTOs de entrada, gerando alto acoplamento entre camadas.
- Ausência de métodos para paginação, ordenação e filtro por título.
- Falta de padronização nos nomes das funções  
  (ex.: `getNoticias`, `getNoticiaById` em vez de `findMany`, `findById`).
- Repository retornando `null` sem tratamento estruturado de erro.
- Falta de separação clara entre modelos de persistência e objetos de transferência de dados (DTOs).

---

## 3. Services

### Arquivo: `src/services/news-service.ts`

**Problemas encontrados no código legado:**

- Service acoplado diretamente ao Prisma, quebrando a separação de responsabilidades.
- Função de validação concentrando múltiplas regras de negócio e acesso ao banco, tornando-a longa e de difícil manutenção.
- Erros lançados como objetos literais em vez de erros padronizados.
- Uso de variáveis booleanas pouco intuitivas (`isNew`) para controlar regras de negócio.
- Uso de funções do repository com nomes inconsistentes.
- Service acessando diretamente o banco para validação de duplicidade, ignorando o repository.
- Falta de funções de validação pequenas e específicas.
- A função `getNews` não implementava paginação, ordenação ou filtro, descumprindo os requisitos do projeto.

---

## 4. Refatorações e Melhorias Aplicadas

Durante a refatoração, as seguintes melhorias foram implementadas:

- Padronização completa dos nomes de funções e arquivos.
- Separação clara de responsabilidades entre Controller, Service e Repository.
- Introdução de DTOs específicos para entrada e atualização de dados.
- Criação de um middleware global de tratamento de erros (`AppError`).
- Centralização das regras de negócio na camada de Service.
- Implementação de paginação, ordenação e filtro por título na rota `GET /news`.
- Criação de middlewares para validação de entrada utilizando Joi.
- Padronização das respostas HTTP conforme os requisitos do projeto.
- Remoção de acoplamentos diretos entre Service e Prisma.
- Código refatorado para ser mais legível, testável e de fácil manutenção.

---

## 5. Considerações Finais

Após a refatoração, o código atende aos princípios de Clean Code, apresenta melhor organização em camadas, maior legibilidade, menor acoplamento e maior facilidade de manutenção e testes, além de cumprir integralmente os requisitos funcionais propostos.
