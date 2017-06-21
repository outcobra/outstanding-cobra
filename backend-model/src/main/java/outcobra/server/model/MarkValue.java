package outcobra.server.model;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import outcobra.server.model.interfaces.ParentLinked;

@Entity
public class MarkValue extends Mark {
    @NotNull
    private Double value;

    @OneToOne(mappedBy = "mark")
    private Exam exam;
    //region constructors

    public MarkValue(Double value, Double weight, MarkGroup markGroup, String description, Exam exam) {
        super(weight, markGroup, description);
        this.value = value;
        this.exam = exam;
    }

    public MarkValue(Double value, Double weight) {
        super();
        this.value = value;
        this.weight = weight;
        this.description = "";
    }

    public MarkValue(Double value, Double weight, Exam exam) {
        super();
        this.value = value;
        this.weight = weight;
        this.exam = exam;
        this.description = exam.getName();
    }

    public MarkValue(Double value, Double weight, String description) {
        super();
        this.value = value;
        this.weight = weight;
        this.description = description;
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

    public Exam getExam() {
        return exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MarkValue)) return false;
        if (!super.equals(o)) return false;

        MarkValue markValue = (MarkValue) o;
        if (!(getExam().equals(markValue.exam))) return false;
        return getValue() == markValue.getValue();
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = (int) (31 * result + getValue());
        result = 31 * (result + (exam != null ? exam.hashCode() : 0));
        return result;
    }

    @Override
    public ParentLinked getParent() {
        return getMarkGroup();
    }
    //endregion
}
