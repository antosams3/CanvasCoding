package com.example.server.authentication.signup

import com.example.server.archive.ArchiveService
import com.example.server.authentication.signup.exceptions.SignupNotAllowedException
import com.example.server.gamesession.GameSessionDTO
import com.example.server.gamesession.GameSessionService
import com.example.server.profile.ProfileDTO
import com.example.server.profile.ProfileService
import com.example.server.profile.exceptions.ProfileAlreadyExistingException
import com.example.server.utils.ProfileType
import jakarta.transaction.Transactional
import org.keycloak.OAuth2Constants
import org.keycloak.admin.client.CreatedResponseUtil
import org.keycloak.admin.client.Keycloak
import org.keycloak.admin.client.KeycloakBuilder
import org.keycloak.representations.idm.CredentialRepresentation
import org.keycloak.representations.idm.UserRepresentation
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service

@Service
@Transactional
class SignupServiceImpl(
    private val profileService: ProfileService,
    private val archiveService: ArchiveService,
    private val gameSessionService: GameSessionService
): SignupService {
    @Value("\${jwt.auth.converter.resource-id}")
    private var clientId: String? = null

    @Value("\${keycloak.server-url}")
    private var serverUrl: String? = null

    @Value("\${keycloak.realm}")
    private var realm: String? = null

    @Value("\${keycloak.client-secret}")
    private var clientSecret: String? = null


    override fun register(signupRequestDTO: SignupRequestDTO, profileType: ProfileType): SignupResponseDTO? {

        val credentialRepresentation = CredentialRepresentation().apply {
            type = CredentialRepresentation.PASSWORD
            value = signupRequestDTO.password
            isTemporary = false
        }

        val userRepresentation = UserRepresentation().apply {
            username = signupRequestDTO.email
            email = signupRequestDTO.email
            firstName = signupRequestDTO.name
            lastName = signupRequestDTO.surname
            isEnabled = true
            isEmailVerified = true
            credentials = listOf(credentialRepresentation)
        }

        val keycloak: Keycloak = KeycloakBuilder.builder()
            .serverUrl(serverUrl)
            .realm(realm)
            .grantType(OAuth2Constants.CLIENT_CREDENTIALS)
            .clientId(clientId)
            .clientSecret(clientSecret)
            .build()

        // get response
        val response = keycloak.realm(realm).users().create(userRepresentation)

        // check if profile already exists
        when (response.status) {

            201 -> {
                // extract newly created userId from response
                val userId = CreatedResponseUtil.getCreatedId(response)

                // get role
                val customerRole = keycloak.realm(realm).roles().get(profileType.toString()).toRepresentation()

                // add role to newly created user
                keycloak.realm(realm).users().get(userId).roles().realmLevel().add(listOf(customerRole))

                val profile = ProfileDTO(signupRequestDTO.email, signupRequestDTO.name, signupRequestDTO.surname, profileType,signupRequestDTO.course_id)

                if(profileType === ProfileType.STUDENT){
                val session = GameSessionDTO(null,null,"public class Main{\n" +
                        "    public static void main (String[] args) {\n" +
                        "    \n" +
                        "    \n" +
                        "    \n" +
                        "    }\n" +
                        "}",1,null)
                    profileService.postStudent(profile)
                    archiveService.postArchive(profile.email)
                    gameSessionService.postGameSession(signupRequestDTO.email,session)
                }else{
                    profileService.postTeacher(profile)
                }

                // build response body
                return SignupResponseDTO(
                    signupRequestDTO.email,
                    signupRequestDTO.name,
                    signupRequestDTO.surname,
                    profileType
                )
            }

            409 -> {
                throw ProfileAlreadyExistingException(response.statusInfo.reasonPhrase)
            }

            else -> {
                throw SignupNotAllowedException(response.statusInfo)
            }
        }
    }

}