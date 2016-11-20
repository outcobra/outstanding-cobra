package outcobra.server.model;

import org.hibernate.validator.constraints.Length;

import javax.jdo.annotations.Index;
import javax.jdo.annotations.Unique;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;

    @Index
    @Unique
    @NotNull
    private String auth0Id;

    @Length(max = 50)
    @NotNull
    private String username;

    @OneToMany(mappedBy = "user")
    private List<Institution> institutions;

    //region Constructors
    public User(Long id, String auth0Id, String username, List<Institution> institutions) {
        this.id = id;
        this.auth0Id = auth0Id;
        this.username = username;
        this.institutions = institutions;
    }

    public User(String auth0Id, String username, List<Institution> institutions) {
        this.auth0Id = auth0Id;
        this.username = username;
        this.institutions = institutions;
    }

    public User(Long id, String auth0Id, String username) {
        this();
        this.id = id;
        this.auth0Id = auth0Id;
        this.username = username;
    }

    public User() {
        this.institutions = new ArrayList<>();
    }

    //endregion

    //region Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAuth0Id() {
        return auth0Id;
    }

    public void setAuth0Id(String auth0Id) {
        this.auth0Id = auth0Id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Institution> getInstitutions() {
        return institutions;
    }

    public void setInstitutions(List<Institution> institutions) {
        this.institutions = institutions;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;

        User user = (User) o;

        if (!getAuth0Id().equals(user.getAuth0Id())) return false;
        if (getUsername() != null ? !getUsername().equals(user.getUsername()) : user.getUsername() != null)
            return false;
        return getInstitutions() != null ? getInstitutions().equals(user.getInstitutions()) : user.getInstitutions() == null;

    }

    @Override
    public int hashCode() {
        int result = getAuth0Id().hashCode();
        result = 31 * result + (getUsername() != null ? getUsername().hashCode() : 0);
        result = 31 * result + (getInstitutions() != null ? getInstitutions().hashCode() : 0);
        return result;
    }
    //endregion
}
