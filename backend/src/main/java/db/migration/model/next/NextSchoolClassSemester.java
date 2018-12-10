package db.migration.model.next;

public class NextSchoolClassSemester {
    private Long schoolClassId;
    private Long semesterId;

    public NextSchoolClassSemester(Long schoolClassId, Long semesterId) {
        this.schoolClassId = schoolClassId;
        this.semesterId = semesterId;
    }

    public Long getSchoolClassId() {
        return schoolClassId;
    }

    public void setSchoolClassId(Long schoolClassId) {
        this.schoolClassId = schoolClassId;
    }

    public Long getSemesterId() {
        return semesterId;
    }

    public void setSemesterId(Long semesterId) {
        this.semesterId = semesterId;
    }
}
