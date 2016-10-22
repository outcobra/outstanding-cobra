package outcobra.server.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class MarkReportEntry {
    @Id
    private Long id;

    @NotNull
    private Double weight;

    @NotNull
    @ManyToOne
    private Subject subject;

    @NotNull
    @ManyToOne
    private MarkReport report;
}
