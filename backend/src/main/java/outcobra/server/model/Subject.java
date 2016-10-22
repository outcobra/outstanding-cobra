package outcobra.server.model;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.*;

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

    @OneToMany(mappedBy = "subject")
    private List<TimetableEntry> timetableEntries;

    @OneToMany(mappedBy = "subject")
    private List<Task> tasks;

    @OneToMany(mappedBy = "subject")
    private List<MarkReportEntry> markReportEntries;

    @OneToMany(mappedBy = "subject")
    private List<Exam> exams;

    @OneToOne
    private MarkGroup markGroup;

    @ManyToOne
    private Teacher teacher;
}
