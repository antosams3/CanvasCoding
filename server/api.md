# API LIST
## USER
### Post
* **/API/users**
  * Request body: UserDTO 
### Get
* **/API/users/{email}**
  * Request path: email
* **/API/users**
  * Request param: type (String) in STUDENT, TEACHER
### Delete
* **/API/users/{email}**
  * Request path: email
  * Response status: NO_CONTENT
## GAME SESSION
### Post
* **/API/game_session**
  * Request body: GameSessionDTO
  * Response: GameSessionDTO
### Get
* **/API/game_session**