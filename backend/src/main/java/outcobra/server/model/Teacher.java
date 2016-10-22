package outcobra.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
/**
 * Created by Florian on 22.10.2016.
 */

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Teacher {

    @Id
    private long id;

    @NotNull
    private String name;

    private String email;

}
