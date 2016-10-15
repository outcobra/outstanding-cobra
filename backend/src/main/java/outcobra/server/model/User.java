package outcobra.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private String auth0Id;

    @Length(max = 50)
    @NotNull
    private String username;

    @OneToOne
    private User parent;

    @OneToMany
    private List<Institution> institutions;
}
