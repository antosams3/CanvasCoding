package com.example.server.authentication.signup.exceptions

import javax.ws.rs.core.Response

class SignupNotAllowedException(val statusInfo: Response.StatusType) : RuntimeException()