package outcobra.server.model;

import outcobra.server.model.interfaces.ParentLinked;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
public class MarkValue extends Mark {
    @NotNull
    private Double value;

    //region constructors

    public MarkValue(Double value, Double weight, MarkGroup markGroup, String description, Exam exam) {
        super(weight, exam, markGroup, description);
        this.value = value;
    }

    public MarkValue(Double value, Double weight) {
        super();
        this.value = value;
        this.weight = weight;
    }

    public MarkValue(Double value, Double weight, String description) {
        super();
        this.value = value;
        this.weight = weight;
        this.setDescription(description);
    }

    public MarkValue() {
        super();
    }

    //endregion

    //region default functions
    @Override
    public double getWeight() {
        return weight;
    }

    @Override
    public double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MarkValue)) return false;
        if (!super.equals(o)) return false;

        MarkValue markValue = (MarkValue) o;

        return getValue() == markValue.getValue();
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = (int) (31 * result + getValue());
        return result;
    }

    @Override
    public ParentLinked getParent() {
        return getMarkGroup();
    }
    //endregion
}
