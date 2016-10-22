package outcobra.server.model;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.*;

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
