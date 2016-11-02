package outcobra.server.model;

import org.hibernate.validator.constraints.Length;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class User {
    @Id
    private String auth0Id;

    @Length(max = 50)
    @NotNull
    private String username;

    @OneToMany(mappedBy = "user")
    private List<Institution> institutions;

    //region constructors

    public User(String auth0Id, String username, List<Institution> institutions) {
        this.auth0Id = auth0Id;
        this.username = username;
        this.institutions = institutions;
    }

    public User() {
        this.institutions = new ArrayList<>();
    }

    //endregion

    //region default functions

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

    @Override
    public String toString() {
        return "User{" +
                "auth0Id='" + auth0Id + '\'' +
                ", username='" + username + '\'' +
                ", institutions=" + institutions +
                '}';
    }

    //endregion
}
