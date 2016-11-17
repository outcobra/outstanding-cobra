package outcobra.server.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import outcobra.server.model.interfaces.ParentLinked;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class Mark implements ParentLinked {
    @NotNull
    protected Double weight;
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    @OneToOne(mappedBy = "mark")
    private Exam exam;

    @ManyToOne
    private MarkGroup markGroup;

    //region constructors
    public Mark(Double weight, Exam exam, MarkGroup markGroup) {
        this.weight = weight;
        this.exam = exam;
        this.markGroup = markGroup;
    }

    public Mark() {
    }
    //endregion

    //region default functions
    public abstract double getValue();

    public abstract double getWeight();

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Exam getExam() {
        return exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }

    public MarkGroup getMarkGroup() {
        return markGroup;
    }

    public void setMarkGroup(MarkGroup markGroup) {
        this.markGroup = markGroup;
    }

    @SuppressWarnings("SimplifiableIfStatement")
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Mark)) return false;

        Mark mark = (Mark) o;

        if (!id.equals(mark.id)) return false;
        if (getWeight() != mark.getWeight())
            return false;
        if (getValue() != mark.getValue())
            return false;
        if (exam != null ? !exam.equals(mark.exam) : mark.exam != null) return false;
        return markGroup != null ? markGroup.equals(mark.markGroup) : mark.markGroup == null;
    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + (int) getWeight();
        result = 31 * result + (exam != null ? exam.hashCode() : 0);
        result = 31 * result + (markGroup != null ? markGroup.hashCode() : 0);
        return result;
    }
    //endregion
}
