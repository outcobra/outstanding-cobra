package outcobra.server.model;

import java.time.LocalDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.*;

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
