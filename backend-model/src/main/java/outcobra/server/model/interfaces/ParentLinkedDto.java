package outcobra.server.model.interfaces;

import com.fasterxml.jackson.annotation.JsonIgnore;

public interface ParentLinkedDto {
    @JsonIgnore
    ParentLink getParentLink();
}
