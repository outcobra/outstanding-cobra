package outcobra.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class SchoolYear {
    @Id
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private LocalDate validFrom, validTo;

    @ManyToOne
    private Institution institution;

    @OneToMany
    private List<Semester> semesters;
}
