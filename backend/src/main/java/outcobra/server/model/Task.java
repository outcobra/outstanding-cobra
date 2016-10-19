package outcobra.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    @Id
    private Long id;

    @NotNull
    private String name;

    private String description;

    private LocalDate todoDate, dueDate;

    // Effort in minutes
    private Integer effort, progress = 0;

    @ManyToOne
    private Subject subject;
}
