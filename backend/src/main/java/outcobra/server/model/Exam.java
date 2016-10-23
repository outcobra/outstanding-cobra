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
public class Exam {
    @Id
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private LocalDate date;

    @OneToMany(mappedBy = "exam")
    private List<ExamTask> tasks;

    @NotNull
    @ManyToOne
    private Subject subject;

    @OneToOne
    private Mark mark;
}
