package outcobra.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

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

    @OneToMany
    private List<ExamTask> tasks;

    @OneToOne
    private Mark mark;
}
