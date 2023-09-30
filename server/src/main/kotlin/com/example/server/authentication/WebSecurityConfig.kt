package com.example.server.authentication

import com.example.server.utils.ProfileType
import lombok.RequiredArgsConstructor
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain

@RequiredArgsConstructor
@Configuration
@EnableMethodSecurity(
    prePostEnabled = true,
    securedEnabled = true
)
@EnableWebSecurity
class WebSecurityConfig(private val jwtAuthConverter: JwtAuthConverter) {

    @Bean
    @Throws(Exception::class)
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http.csrf().disable().authorizeHttpRequests().requestMatchers(HttpMethod.POST, "/API/login").permitAll()
        http.authorizeHttpRequests()
            // Profile endpoints
            .requestMatchers(HttpMethod.GET, "/API/profiles").hasRole(TEACHER)
            .requestMatchers(HttpMethod.GET, "/API/profiles/{email}").authenticated()
            .requestMatchers(HttpMethod.DELETE, "/API/profiles/{email}").hasRole(TEACHER)

            // Course
            .requestMatchers(HttpMethod.POST, "/API/courses").hasRole(TEACHER)
            .requestMatchers(HttpMethod.PUT, "/API/courses").hasRole(TEACHER)
            .requestMatchers(HttpMethod.GET, "/API/courses/{id}").authenticated()
            .requestMatchers(HttpMethod.DELETE, "/API/courses/{id}").hasRole(TEACHER)

            // Archive
            .requestMatchers(HttpMethod.GET, "/API/archive").authenticated()
            .requestMatchers(HttpMethod.PUT, "/API/archive").hasRole(STUDENT)

            // Else
            .anyRequest().permitAll()

            .and()
            .oauth2ResourceServer()
            .jwt()
            .jwtAuthenticationConverter(jwtAuthConverter)

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)


        return http.build()
    }

    companion object {
        val TEACHER: String = ProfileType.TEACHER.toString()
        val STUDENT: String = ProfileType.STUDENT.toString()
    }
}