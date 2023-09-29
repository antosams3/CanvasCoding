package com.example.server.authentication.login

import com.example.server.authentication.login.exceptions.InvalidLoginRequestDTOException
import com.example.server.authentication.login.exceptions.LoginNotAllowedException
import com.example.server.profile.Profile
import com.example.server.profile.ProfileRepository
import com.example.server.utils.toProfileType
import jakarta.validation.Valid
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpMethod
import org.springframework.http.MediaType
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.client.HttpClientErrorException
import org.springframework.web.client.RestTemplate
import java.util.*
import kotlin.collections.ArrayList
import org.keycloak.util.JsonSerialization


@RestController
@CrossOrigin
class LoginController(private val profileRepository: ProfileRepository) {
    @Value("\${jwt.auth.converter.resource-id}")
    private var clientId: String? = null

    @Value("\${spring.security.oauth2.resourceserver.jwt.login-url}")
    private var loginUrl: String? = null

    @Value("\${keycloak.client-secret}")
    private var clientSecret: String? = null

    @PostMapping("/API/login")
    fun postProfile(@Valid @RequestBody loginRequestDTO: LoginRequestDTO, br: BindingResult): LoginResponseDTO? {
        if (br.hasErrors()) {
            val errors = br.allErrors
            val errMessages = errors.map { it.defaultMessage }
            throw InvalidLoginRequestDTOException(errMessages)
        }

        // Prendo le informazioni sull'utente dal body
        val email = loginRequestDTO.email
        val password = loginRequestDTO.password

        // Creo il restTemplate che mi fa comportare da webClient che inoltra una richiesta al server esterno
        val restTemplate = RestTemplate()

        // Costruisco la richiesta (header e body)
        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_FORM_URLENCODED
        val request = HttpEntity<String>(getRequestBody(email, password), headers)

        // Invio la richiesta e valuto la risposta
        try {
            val response = restTemplate.exchange(loginUrl!!, HttpMethod.POST, request, LoginResponseDTO::class.java)
            val access_token = response.body!!.access_token
            // Verifico se l'utente è registrato localmente
            if (profileRepository.findByEmail(email) == null) {
                // In caso non sia registrato localmente, deserializzo il token e lo registro
                val postProfile = deserializeToken(access_token)
                profileRepository.save(postProfile)
            }
            return response.body
        }

        // In caso di errore restituito da Keycloak, restituisco l'errore
        catch (e: HttpClientErrorException) {
            throw LoginNotAllowedException(e)
        }

    }

    private fun getRequestBody(username: String, password: String): String {
        return "grant_type=password&client_id=$clientId&client_secret=$clientSecret&username=$username&password=$password"
    }

    private fun deserializeToken(access_token: String) : Profile {
        val decoder: Base64.Decoder = Base64.getUrlDecoder()
        val chunks = access_token.split(".")
        val payload = String(decoder.decode(chunks[1]))
        val map = JsonSerialization.mapper.readValue(payload, MutableMap::class.java)
        val resource_access = map["resource_access"] as MutableMap<*, *>
        val ticketing_client = resource_access["ticketing-client"] as MutableMap<*, *>
        val role = ticketing_client["roles"] as ArrayList<*>

        return Profile(
            map["email"] as String,
            map["given_name"] as String,
            map["family_name"] as String,
            toProfileType(role[0].toString())
        )
    }


}