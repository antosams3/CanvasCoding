package com.example.server.level

interface LevelService {
    fun postLevel(levelDTO: LevelDTO): LevelDTO?
    fun getLevel(id: Int): LevelDTO?
    fun deleteLevel(id: Int)
}