package outcobra.server.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class Mark {

    @Id
    private Long id;

    @NotNull
    protected Double weight;

    @OneToOne(mappedBy = "mark")
    private Exam exam;

    @ManyToOne
    private MarkGroup markGroup;

    public abstract double getValue();

    public abstract double getWeight();
}
