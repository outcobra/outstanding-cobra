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
public class Subject {
    @Id
    private Long id;

    @NotNull
    private String name;

    @ManyToOne
    private Semester semester;

    @OneToMany
    private List<TimetableEntry> timetableEntries;

    @OneToMany
    private List<Task> tasks;

    @OneToMany
    private List<MarkReportEntry> markReportEntries;

    @OneToMany
    private List<Exam> exams;

    @OneToOne
    private MarkGroup markGroup;
}
