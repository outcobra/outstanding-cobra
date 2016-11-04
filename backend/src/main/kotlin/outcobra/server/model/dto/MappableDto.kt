package noutcobra.server.model.mapper

import outcobra.server.model.Mappable

interface MappableDto<DtoType, EntityType> : Mappable<DtoType, EntityType> {
    fun toEntity(): EntityType
}