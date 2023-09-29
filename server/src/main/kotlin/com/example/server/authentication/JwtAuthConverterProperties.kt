package com.example.server.authentication

import lombok.Data
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration
import org.springframework.validation.annotation.Validated

@Data
@Validated
@Configuration
@ConfigurationProperties(prefix = "jwt.auth.converter")
class JwtAuthConverterProperties {
    private var resourceId: String? = null
    private var principalAttribute: String? = null

    fun getPrincipalAttribute() : String?{
        return principalAttribute
    }

    fun getResourceId() : String?{
        return resourceId
    }

    fun setPrincipalAttribute(principalAttribute: String){
        this.principalAttribute = principalAttribute
    }

    fun setResourceId(resourceId: String){
        this.resourceId = resourceId
    }
}