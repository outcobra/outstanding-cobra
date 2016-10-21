package outcobra.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.util.List;

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
