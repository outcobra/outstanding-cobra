package outcobra.server.model;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import outcobra.server.model.interfaces.ParentLinked;

/**
 * This class represents an Institution.
 * It is used by hibernate to store the information to the database
 * A documentation of the instance fields does not make sense because it is self-explanatory.
 *
 * @author Joel Messerli
 * @since 1.0.0
 */

@Entity
public class Institution implements ParentLinked {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String name;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "institution", cascade = CascadeType.REMOVE)
    private List<SchoolClass> schoolClasses;

    @OneToMany(mappedBy = "institution")
    private List<Teacher> teachers;

    //region constructors
    public Institution() {
        this.teachers = new ArrayList<>();
        this.schoolClasses = new ArrayList<>();
    }

    public Institution(String name, User user) {
        this();
        this.name = name;
        this.user = user;
    }

    public Institution(String name, User user, List<SchoolClass> schoolClasses, List<Teacher> teachers) {
        this.name = name;
        this.user = user;
        this.schoolClasses = schoolClasses;
        this.teachers = teachers;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<SchoolClass> getSchoolClasses() {
        return schoolClasses;
    }

    public void setSchoolClasses(List<SchoolClass> schoolClasses) {
        this.schoolClasses = schoolClasses;
    }

    public List<Teacher> getTeachers() {
        return teachers;
    }

    public void setTeachers(List<Teacher> teachers) {
        this.teachers = teachers;
    }

    @SuppressWarnings("SimplifiableIfStatement")
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Institution)) return false;

        Institution that = (Institution) o;

        if (!id.equals(that.id)) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (user != null ? !user.equals(that.user) : that.user != null) return false;
        if (schoolClasses != null ? !schoolClasses.equals(that.schoolClasses) : that.schoolClasses != null) {
            return false;
        }
        return teachers != null ? teachers.equals(that.teachers) : that.teachers == null;

    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (user != null ? user.hashCode() : 0);
        result = 31 * result + (schoolClasses != null ? schoolClasses.hashCode() : 0);
        result = 31 * result + (teachers != null ? teachers.hashCode() : 0);
        return result;
    }

    @Override
    public ParentLinked getParent() {
        return user;
    }
    //endregion
}
