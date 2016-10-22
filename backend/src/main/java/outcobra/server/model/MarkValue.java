package outcobra.server.model;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

import lombok.*;

@Data
@Entity
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class MarkValue extends Mark {
    @NotNull
    private Double value;

    public MarkValue(Double value, Double weight) {
        this.value = value;
        this.weight = weight;
    }

    @Override
    public double getValue() {
        return value;
    }

    @Override
    public double getWeight() {
        return weight;
    }
}
