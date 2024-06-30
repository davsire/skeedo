# Endpoints
```
auth:
  POST     /signin - logar {username, password}
  POST     /singup - criar usuario {username, password, displayname}

users:
  GET     /users - listar todos os usuários
  GET     /users/:id - pegar usuário específico
  PATCH   /users/:id - alterar o próprio de exibição {displayName}
  DELETE  /users/:id - excluir o próprio usuário

events:
  POST    /events - criar evento {name, beginDate, endDate}
  GET     /events - pegar todos os eventos que o usuario criou/foi convidado
* GET     /events/:id - pegar um evento específico se o usuário criou/foi convidado
  PATCH   /events/:id - troca o nome do evento que o usuário criou {name} 
* DELETE  /events/:id - exclui o evento que o usuário criou e todos os convites associados

invites:
  POST    /invites - criar um convite para um evento criado pelo usuário {event, user}
  GET     /invites - pega todos os convites direcionados ao usuário
  GET     /invites/:id - pega um convite específico do usúario
  PATCH   /invites/:id - responde um convite {availableDays}
  DELETE  /invites/:id - recusa um convite
```