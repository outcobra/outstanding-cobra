package outcobra.server.model;

import org.hibernate.validator.constraints.Length;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.*;

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

    @OneToMany(mappedBy = "user")
    private List<Institution> institutions;
}
