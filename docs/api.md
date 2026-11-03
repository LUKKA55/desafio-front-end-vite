# API

Back-end: projeto `desafio-front-end-express`, porta 5000.

Todas as rotas começam com `/api`.

## Erros

```json
{ "erro": "mensagem" }
```

- 400: dados inválidos
- 404: não encontrado
- 409: regra de negócio

## Tipos

Horário da turma: dia da semana (2 a 7) + turno (1 manhã, 2 tarde, 3 noite). Ex: 21 = segunda de manhã, 33 = terça de noite.

```ts
interface IDisciplina {
  id: string
  codigo: string
  nome: string
  cargaHoraria: number
}

interface IProfessor {
  id: string
  nome: string
  email: string
}

interface ITurma {
  id: string
  disciplinaId: string
  professorId: string
  diaSemana: 2 | 3 | 4 | 5 | 6 | 7
  turno: 1 | 2 | 3
  vagas: number
  semestre: string
}
```

## Rotas

### Disciplinas

```
GET /api/disciplinas
```

### Professores

```
GET /api/professores
```

### Turmas

```
GET    /api/turmas
GET    /api/turmas/:id
POST   /api/turmas
PUT    /api/turmas/:id
DELETE /api/turmas/:id
```

POST e PUT recebem a turma sem o `id`.

## Regras das turmas

- Todos os campos são obrigatórios (400)
- Vagas tem que ser maior que 0 (400)
- Disciplina e professor precisam existir (404)
- Professor não pode ter duas turmas no mesmo horário no mesmo semestre (409)

## Dados iniciais

Disciplinas:

| id | codigo | nome |
|---|---|---|
| d1 | INF101 | Algoritmos e Programação |
| d2 | INF102 | Estruturas de Dados |
| d3 | INF201 | Banco de Dados |
| d4 | INF202 | Desenvolvimento Web Front-end |

Professores:

| id | nome |
|---|---|
| p1 | Ana Souza |
| p2 | Carlos Lima |
| p3 | Fernanda Rocha |

## Ideias para depois

- Matrícula do aluno (vagas, choque de horário)
- Grade de horários do aluno
- Login separando instituição e aluno
- Pré-requisitos das disciplinas
- Limite de turmas por professor
- Cadastro de disciplinas e professores pela tela
