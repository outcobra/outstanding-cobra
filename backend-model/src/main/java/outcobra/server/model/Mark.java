package outcobra.server.model;

import outcobra.server.model.interfaces.ParentLinked;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class Mark extends AbstractEntity implements ParentLinked {
    @NotNull
    protected Double weight;

    @NotNull
    protected String description;

    @ManyToOne
    protected MarkGroup markGroup;

    //region constructors
    public Mark(Double weight, MarkGroup markGroup, String description) {
        this.weight = weight;
        this.markGroup = markGroup;
        this.description = description;
    }

    public Mark() {
        this.weight = 1.0;
    }
    //endregion

    //region default functions
    public abstract double getValue();

    public abstract double getWeight();

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public MarkGroup getMarkGroup() {
        return markGroup;
    }

    public void setMarkGroup(MarkGroup markGroup) {
        this.markGroup = markGroup;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @SuppressWarnings("SimplifiableIfStatement")
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Mark)) return false;

        Mark mark = (Mark) o;

        if (getWeight() != mark.getWeight()) return false;
        if (!getId().equals(mark.getId())) return false;
        if (!getDescription().equals(mark.getDescription())) return false;
        return getMarkGroup() != null ? getMarkGroup().equals(mark.getMarkGroup()) : mark.getMarkGroup() == null;
    }

    @Override
    public int hashCode() {
        int result = Double.valueOf(getWeight()).hashCode();
        result = 31 * result + getId().hashCode();
        result = 31 * result + getDescription().hashCode();
        result = 31 * result + (getMarkGroup() != null ? getMarkGroup().hashCode() : 0);
        return result;
    }

    //endregion
}
