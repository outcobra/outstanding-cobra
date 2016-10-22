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
public class Semester {
    @Id
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private LocalDate validFrom, validTo;

    @ManyToOne
    @NotNull
    private SchoolYear schoolYear;

    @OneToMany(mappedBy = "semester")
    private List<Subject> subjects;

    @OneToMany(mappedBy = "semester")
    private List<MarkReport> markReports;

    @OneToOne
    private Timetable timetable;
}
