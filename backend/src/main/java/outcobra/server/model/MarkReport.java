package outcobra.server.model;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class MarkReport {
    @Id
    private Long id;

    @NotNull
    private String name;

    @NotNull
    @ManyToOne
    private Semester semester;

    @OneToMany(mappedBy = "report")
    private List<MarkReportEntry> entries;
}
