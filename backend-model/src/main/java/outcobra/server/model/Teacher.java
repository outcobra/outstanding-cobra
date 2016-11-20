package outcobra.server.model;

import outcobra.server.model.interfaces.ParentLinked;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Teacher implements ParentLinked {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String name;

    private String email;

    @ManyToOne
    private Institution institution;

    @OneToMany(mappedBy = "teacher")
    private List<Subject> subjects;

    //region constructors

    public Teacher(String name, String email, Institution institution, List<Subject> subjects) {
        this.name = name;
        this.email = email;
        this.institution = institution;
        this.subjects = subjects;
    }

    public Teacher() {
        this.subjects = new ArrayList<>();
    }

    //endregion

    //region default functions

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Institution getInstitution() {
        return institution;
    }

    public void setInstitution(Institution institution) {
        this.institution = institution;
    }

    public List<Subject> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<Subject> subjects) {
        this.subjects = subjects;
    }

    @SuppressWarnings("SimplifiableIfStatement")
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Teacher)) return false;

        Teacher teacher = (Teacher) o;

        if (!getId().equals(teacher.getId())) return false;
        if (getName() != null ? !getName().equals(teacher.getName()) : teacher.getName() != null)
            return false;
        if (getEmail() != null ? !getEmail().equals(teacher.getEmail()) : teacher.getEmail() != null)
            return false;
        if (getInstitution() != null ? !getInstitution().equals(teacher.getInstitution()) : teacher.getInstitution() != null)
            return false;
        return getSubjects() != null ? getSubjects().equals(teacher.getSubjects()) : teacher.getSubjects() == null;

    }

    @Override
    public int hashCode() {
        int result = getId().hashCode();
        result = 31 * result + (getName() != null ? getName().hashCode() : 0);
        result = 31 * result + (getEmail() != null ? getEmail().hashCode() : 0);
        result = 31 * result + (getInstitution() != null ? getInstitution().hashCode() : 0);
        result = 31 * result + (getSubjects() != null ? getSubjects().hashCode() : 0);
        return result;
    }

    @Override
    public ParentLinked getParent() {
        return institution;
    }
    //endregion
}
