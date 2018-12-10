package db.migration.model.legacy;

public class LegacySemester {
    private Long id;
    private String name;
    private String validFrom;
    private String validTo;
    private Long schoolYearId;

    public LegacySemester(Long id, String name, String validFrom, String validTo, Long schoolYearId) {
        this.id = id;
        this.name = name;
        this.validFrom = validFrom;
        this.validTo = validTo;
        this.schoolYearId = schoolYearId;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getValidFrom() {
        return validFrom;
    }

    public String getValidTo() {
        return validTo;
    }

    public Long getSchoolYearId() {
        return schoolYearId;
    }

    public void setSchoolYearId(Long schoolYearId) {
        this.schoolYearId = schoolYearId;
    }
}
