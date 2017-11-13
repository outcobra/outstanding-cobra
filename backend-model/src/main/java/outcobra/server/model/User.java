package outcobra.server.model;

import org.hibernate.validator.constraints.Length;
import outcobra.server.model.interfaces.ParentLinked;

import javax.jdo.annotations.Index;
import javax.jdo.annotations.Unique;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
public class User extends AbstractEntity implements ParentLinked {
    @Index
    @Unique
    @NotNull
    private String auth0Id;

    @Length(max = 50)
    @NotNull
    private String username;

    @Length(max = 100)
    @NotNull
    private String mail;

    @OneToMany(mappedBy = "user")
    private List<Institution> institutions;

    @OneToMany(mappedBy = "user")
    private List<Identity> identities;

    //region Constructors
    public User(Long id, String auth0Id, String username, String mail, List<Institution> institutions) {
        this.id = id;
        this.auth0Id = auth0Id;
        this.username = username;
        this.institutions = institutions;
        this.mail = mail;
    }

    public User(String auth0Id, String username, String mail, List<Institution> institutions) {
        this.auth0Id = auth0Id;
        this.username = username;
        this.institutions = institutions;
        this.mail = mail;
    }

    public User(Long id, String auth0Id, String username, String mail) {
        this();
        this.id = id;
        this.auth0Id = auth0Id;
        this.username = username;
        this.mail = mail;
    }

    public User() {
        this.institutions = new ArrayList<>();
    }
    //endregion

    //region Getters and setters
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

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public List<Institution> getInstitutions() {
        return institutions;
    }

    public void setInstitutions(List<Institution> institutions) {
        this.institutions = institutions;
    }

    public List<Identity> getIdentities() {
        return identities;
    }

    public void setIdentities(List<Identity> identities) {
        this.identities = identities;
    }

    @SuppressWarnings("SimplifiableIfStatement")
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;

        User user = (User) o;

        if (!getId().equals(user.getId())) return false;
        if (!getAuth0Id().equals(user.getAuth0Id())) return false;
        if (!getMail().equals(user.getMail())) return false;
        return getUsername().equals(user.getUsername());

    }

    @Override
    public int hashCode() {
        int result = getId().hashCode();
        result = 31 * result + getAuth0Id().hashCode();
        result = 31 * result + getUsername().hashCode();
        result = 31 * result + getUsername().hashCode();
        return result;
    }


    @Override
    public String toString() {
        return String.format("User{auth0Id='%s', username='%s', mail='%s', institutions=%s}", auth0Id, username, mail, institutions);
    }

    @Override
    public ParentLinked getParent() {
        return this;
    }

    //endregion
}
