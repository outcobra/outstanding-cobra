package outcobra.server.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class ExamTask {
    @Id
    private Long id;

    @NotNull
    private String task;

    @NotNull
    @ManyToOne
    private Exam exam;

    @NotNull
    private boolean isFinished;
}
