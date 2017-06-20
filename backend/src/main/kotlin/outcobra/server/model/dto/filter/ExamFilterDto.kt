package outcobra.server.model.dto.filter


/**
 * @author Florian Bürgi
 * @since <since>
 */
data class ExamFilterDto(val upcoming: Boolean? = null,
                         val hasMark: Boolean? = null,
                         val semesterId: Long? = null,
                         val subjectId: Long? = null,
                         val fullTextSearch: String? = null) {


    fun getFilter(authId: String) {

    }

}