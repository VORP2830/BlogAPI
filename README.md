# Desafio Back-End

# O Desafio

Precisamos de uma API que sirva o Back-end de um blog. Essa API precisa ser capaz de:

- Criar um Post
- Editar um Post
- Deletar um Post
- Listar os Posts de maneira paginada, permitindo filtro por data.
- Obter informações de um Post por ID.

A entidade `Post`, deve ter os seguintes campos:

- id -> Identificador do Post.
- title -> Título do Post.
- description -> Descrição do Post.
- body -> Corpo do Post.
- created_at -> Data de criação do Post.
- updated_at -> Data de atualização do Post.

## Requisitos

- Todas as respostas precisam ser retornadas no formato JSON
- Crie um `README.md` com as informações de como usar sua aplicação. (como executar, quais são as rotas, etc)
- Publique sua aplicação em algum servidor. (Heroku, AWS, Azure, Digital Ocean)

## Diferenciais

- Dockerize sua aplicação.
- Crie testes unitários para a sua aplicação.
- Utilize os princípios SOLID em sua aplicação.