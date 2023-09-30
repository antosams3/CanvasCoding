package com.example.server.archive

interface ArchiveService {
    fun postArchive(email: String): ArchiveDTO?
    fun putArchive(email: String, archiveDTO: ArchiveDTO): ArchiveDTO?
    fun getArchive(email: String): ArchiveDTO?
}