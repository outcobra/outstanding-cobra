package outcobra.server.model;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.*;

@Data
@Entity(name = "class")
@AllArgsConstructor
@NoArgsConstructor
public class SchoolClass {
    @Id
    private Long id;

    @NotNull
    private String normalizedName;

    @ManyToOne
    private Institution institution;

    @OneToMany(mappedBy = "schoolClass")
    private List<SchoolYear> schoolYears;
}
