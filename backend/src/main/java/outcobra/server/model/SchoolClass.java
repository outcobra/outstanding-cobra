package outcobra.server.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import outcobra.server.model.dto.emptyDto.SchoolClassDto;
import outcobra.server.model.mapper.Mapper;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "class")
public class SchoolClass implements OutcobraEntity<SchoolClass, SchoolClassDto> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String normalizedName;

    @ManyToOne
    private Institution institution;

    @OneToMany(mappedBy = "schoolClass")
    private List<SchoolYear> schoolYears;

    //region constructors

    public SchoolClass(String normalizedName, Institution institution, List<SchoolYear> schoolYears) {
        this.normalizedName = normalizedName;
        this.institution = institution;
        this.schoolYears = schoolYears;
    }

    public SchoolClass() {
        this.schoolYears = new ArrayList<>();
    }

    //endregion

    //region default functions

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNormalizedName() {
        return normalizedName;
    }

    public void setNormalizedName(String normalizedName) {
        this.normalizedName = normalizedName;
    }

    public Institution getInstitution() {
        return institution;
    }

    public void setInstitution(Institution institution) {
        this.institution = institution;
    }

    public List<SchoolYear> getSchoolYears() {
        return schoolYears;
    }

    public void setSchoolYears(List<SchoolYear> schoolYears) {
        this.schoolYears = schoolYears;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SchoolClass)) return false;

        SchoolClass that = (SchoolClass) o;

        if (!id.equals(that.id)) return false;
        if (normalizedName != null ? !normalizedName.equals(that.normalizedName) : that.normalizedName != null)
            return false;
        if (institution != null ? !institution.equals(that.institution) : that.institution != null)
            return false;
        return schoolYears != null ? schoolYears.equals(that.schoolYears) : that.schoolYears == null;

    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + (normalizedName != null ? normalizedName.hashCode() : 0);
        result = 31 * result + (institution != null ? institution.hashCode() : 0);
        result = 31 * result + (schoolYears != null ? schoolYears.hashCode() : 0);
        return result;
    }

    @Override
    public boolean verifyOwner(@org.jetbrains.annotations.NotNull String owner) {
        return false;
    }

    @Override
    public SchoolClassDto toDto() {
        return null;
    }

    @org.jetbrains.annotations.NotNull
    @Override
    public Mapper<SchoolClassDto, SchoolClass> getMapper() {
        return null;
    }

    //endregion
}

