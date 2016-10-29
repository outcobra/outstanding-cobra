package outcobra.server.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
public class MarkGroup extends Mark {

    @OneToMany(mappedBy = "markGroup")
    private List<Mark> marks;

    @OneToOne(mappedBy = "markGroup")
    private Subject subject;

    //region constructors

    public MarkGroup(Double weight, Exam exam, MarkGroup markGroup, List<Mark> marks, Subject subject) {
        super(weight, exam, markGroup);
        this.marks = marks;
        this.subject = subject;
    }

    public MarkGroup(List<Mark> marks, Subject subject) {
        this.marks = marks;
        this.subject = subject;
    }

    public MarkGroup() {
        super();
        this.marks = new ArrayList<>();
    }

    //endregion

    // Todo persist
    public void addMark(Mark mark) {
        marks.add(mark);
    }

    // Todo persist
    public void removeMark(Mark mark) {
        marks.remove(mark);
    }

    @Override
    public double getWeight() {
        return weight;
    }

    @Override
    public double getValue() {
        double valueSum = 0, weightSum = 0;

        for (Mark mark : getMarks()) {
            valueSum += mark.getWeight() * mark.getValue();
            weightSum += mark.getWeight();
        }

        return valueSum / weightSum;
    }



    //region default functions

    public List<Mark> getMarks() {
        return marks;
    }

    public void setMarks(List<Mark> marks) {
        this.marks = marks;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MarkGroup)) return false;
        if (!super.equals(o)) return false;

        MarkGroup markGroup = (MarkGroup) o;

        if (getMarks() != null ? !getMarks().equals(markGroup.getMarks()) : markGroup.getMarks() != null)
            return false;
        return getSubject() != null ? getSubject().equals(markGroup.getSubject()) : markGroup.getSubject() == null;

    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (getMarks() != null ? getMarks().hashCode() : 0);
        result = 31 * result + (getSubject() != null ? getSubject().hashCode() : 0);
        return result;
    }

    //endregion
}
