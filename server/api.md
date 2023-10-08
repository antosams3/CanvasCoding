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
* **/API/game_session/latest**
  * Authenticated: Yes 
  * Response: GameSessionDTO
  * Info: Returns the GameSession having the higher Step_id for the user authenticated
* **/API/game_session/{step_id}**
  * Authenticated: Yes
  * Request param: step_id
  * Response: GameSessionDTO
  * Info: returns the GameSession having the specified step_id for the user authenticated 
### Put
* **/API/game_session**
  * Authenticated: Yes
  * Request: GameSessionDTO (id, code)
  * Response: GameSessionDTO
  * Info: modifies the code of the current gameSession
## STEP
### GET
* **/API/steps/{level_id}**
  * Authenticated: Yes
  * Request param: level_id
  * Response: List<StepDTO>
  * Info: returns the list of steps associated to a given level