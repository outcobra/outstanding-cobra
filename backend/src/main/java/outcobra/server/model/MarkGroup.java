package outcobra.server.model;

import java.util.List;

import javax.persistence.*;

import lombok.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class MarkGroup extends Mark {
    @OneToMany(mappedBy = "markGroup")
    private List<Mark> marks;

    @OneToOne(mappedBy = "markGroup")
    private Subject subject;

    // Todo persist
    public void addMark(Mark mark) {
        marks.add(mark);
    }

    // Todo persist
    public void removeMark(Mark mark) {
        marks.remove(mark);
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

    @Override
    public double getWeight() {
        return weight;
    }
}
