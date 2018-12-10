package db.migration.model.legacy;

public class LegacySchoolYear {
    private Long id;
    private String name;
    private String validFrom;
    private String validTo;
    private Long schoolClassId;

    public LegacySchoolYear(Long id, String name, String validFrom, String validTo, Long schoolClassId) {
        this.id = id;
        this.name = name;
        this.validFrom = validFrom;
        this.validTo = validTo;
        this.schoolClassId = schoolClassId;
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

    public Long getSchoolClassId() {
        return schoolClassId;
    }

    public void setSchoolClassId(Long schoolClassId) {
        this.schoolClassId = schoolClassId;
    }
}
