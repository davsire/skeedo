# Endpoints
```
auth:
  POST     /signin - logar {username, password}
  POST     /singup - criar usuario {username, password, displayname}

users:
  GET     /users - listar todos os usuários
  GET     /users/:id - pegar usuário específico
  PATCH   /users/:id - editar o próprio usuário logado
  DELETE  /users/:id - excluir o próprio usuário logado

events:
  POST    /events - criar evento e seus convites
  GET     /events/closed - pegar todos os eventos já marcados que o usuario criou/foi convidado
  GET     /events/waiting-responses - pegar todos os eventos aguardando resposta que o usuario criou
* GET     /events/:id - pegar um evento específico se o usuário criou/foi convidado
  PATCH   /events/:id - troca o nome do evento que o usuário criou {name} 
* DELETE  /events/:id - exclui o evento que o usuário criou e todos os convites associados

invites:
  GET     /invites/pending - pega todos os convites pendentes direcionados ao usuário
  GET     /invites/:id - pega um convite específico do usúario
  PATCH   /invites/:id - responde um convite {availableDays}
  DELETE  /invites/:id - recusa um convite
```