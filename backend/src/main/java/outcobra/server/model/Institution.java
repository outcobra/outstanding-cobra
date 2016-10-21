package outcobra.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Institution {
    @Id
    private Long id;

    @NotNull
    private String name;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "institution")
    private List<SchoolClass> schoolClasses;
}
