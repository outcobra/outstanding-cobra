package outcobra.server.model.interfaces

import com.fasterxml.jackson.annotation.JsonIgnore

interface Identifiable {

    val identifier: Long
        @JsonIgnore
        get

}
