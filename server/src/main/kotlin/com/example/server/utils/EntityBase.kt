package com.example.server.utils

import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.MappedSuperclass
import org.springframework.data.util.ProxyUtils

@MappedSuperclass
abstract class EntityBase<T: java.io.Serializable> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private var id : T? = null

    fun getId() : T? = id

    override fun toString(): String {
        return "@Entity ${this.javaClass.name}(id=$id)"
    }

    override fun equals(other: Any?): Boolean {
        if (other == null) return false
        if (other === this) return true
        if (javaClass != ProxyUtils.getUserClass(other)) return false

        other as EntityBase<*>
        return if (null == id) false else this.id == other.id
    }

    override fun hashCode(): Int {
        return 55
    }
}