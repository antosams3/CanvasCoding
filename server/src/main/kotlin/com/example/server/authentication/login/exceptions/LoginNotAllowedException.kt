package com.example.server.authentication.login.exceptions

import org.springframework.web.client.HttpClientErrorException

class LoginNotAllowedException(val errorDetails: HttpClientErrorException) :  RuntimeException()