package outcobra.server.model;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.*;

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
    private SchoolClass schoolClass;

    @OneToMany(mappedBy = "schoolYear")
    private List<Holiday> holidays;

    @OneToMany(mappedBy = "schoolYear")
    private List<Semester> semesters;
}
