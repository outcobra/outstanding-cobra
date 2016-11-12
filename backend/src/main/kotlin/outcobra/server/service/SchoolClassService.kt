package outcobra.server.service

import outcobra.server.model.dto.SchoolClassDto

/**
 * This interface defines all functions for a SchoolClass service
 * @author Florian Buergi
 */
 interface SchoolClassService {
   /**
    * This function creates a new SchoolClass and saves it
    * @param schoolClassDto the [SchoolClassDto] you want to save
    * @return the [SchoolClassDto] that has been stored
    */
    fun createSchoolClass(schoolClassDto: SchoolClassDto) : SchoolClassDto

   /**
    * This function reads a [SchoolClassDto] out of the database
    * @param id the id of the object you want to read
    * @return the [SchoolClassDto]
    */
    fun readSchoolClassById(id :Long) : SchoolClassDto

   /**
    * This function reads all schoolClasses out of the database
    * that belong to the current user
    * @return a list of [SchoolClassDto]s
    */
    fun readAllSchoolClasses() : List<SchoolClassDto>

   /**
    * This function updates an existing SchoolClass
    * @param schoolClassDto the changed [SchoolClassDto] you want to save
    * @return the [SchoolClassDto] that has been saved
    */
    fun updateSchoolClass(schoolClassDto: SchoolClassDto): SchoolClassDto

   /**
    * This function deletes a SchoolClass
    * @param id the id of the SchoolClass you want to delete
    */
   fun deleteSchoolClass(id: Long)
}