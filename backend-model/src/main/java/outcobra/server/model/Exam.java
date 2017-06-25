package outcobra.server.model;

import com.querydsl.core.annotations.QueryInit;
import outcobra.server.model.interfaces.ParentLinked;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Exam implements ParentLinked {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private LocalDate date;

    @OneToMany(mappedBy = "exam")
    private List<ExamTask> tasks;

    @NotNull
    @ManyToOne
    @QueryInit("semester.schoolYear.schoolClass.institution.user")
    private Subject subject;

    @OneToOne
    private MarkValue mark;

    //region constructors

    /**
     *
     * @param id
     * @param name
     * @param date
     * @param tasks
     * @param subject
     * @param mark
     */
    public Exam(Long id, String name, LocalDate date, List<ExamTask> tasks, Subject subject, MarkValue mark) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.tasks = tasks;
        this.subject = subject;
        this.mark = mark;
    }

    /**
     *
     * @param name
     * @param date
     * @param tasks
     * @param subject
     * @param mark
     */
    public Exam(String name, LocalDate date, List<ExamTask> tasks, Subject subject, MarkValue mark) {
        this.name = name;
        this.date = date;
        this.tasks = tasks;
        this.subject = subject;
        this.mark = mark;
    }

    public Exam() {
        this.tasks = new ArrayList<>();
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<ExamTask> getTasks() {
        return tasks;
    }

    public void setTasks(List<ExamTask> tasks) {
        this.tasks = tasks;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public MarkValue getMark() {
        return mark;
    }

    public void setMark(MarkValue mark) {
        this.mark = mark;
    }

    @SuppressWarnings("SimplifiableIfStatement")
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Exam)) return false;

        Exam exam = (Exam) o;

        if (!id.equals(exam.id)) return false;
        if (name != null ? !name.equals(exam.name) : exam.name != null) return false;
        if (date != null ? !date.equals(exam.date) : exam.date != null) return false;
        if (tasks != null ? !tasks.equals(exam.tasks) : exam.tasks != null) return false;
        if (subject != null ? !subject.equals(exam.subject) : exam.subject != null) return false;
        return mark != null ? mark.equals(exam.mark) : exam.mark == null;

    }

    @Override
    public int hashCode() {
        int result = id.hashCode();
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + (tasks != null ? tasks.hashCode() : 0);
        result = 31 * result + (subject != null ? subject.hashCode() : 0);
        result = 31 * result + (mark != null ? mark.hashCode() : 0);
        return result;
    }

    @Override
    public ParentLinked getParent() {
        return subject;
    }
    //endregion
}
