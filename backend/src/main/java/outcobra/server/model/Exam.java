package outcobra.server.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import outcobra.server.model.dto.EamDto;
import outcobra.server.model.mapper.Mapper;
import outcobra.server.model.marker.OwnerVerifiable;

@Entity
public class Exam implements OwnerVerifiable, MappableEntity<EamDto,Exam> {
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
    private Subject subject;

    @OneToOne
    private Mark mark;

    //region constructors

    public Exam(Long id, String name, LocalDate date, List<ExamTask> tasks, Subject subject, Mark mark) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.tasks = tasks;
        this.subject = subject;
        this.mark = mark;
    }

    public Exam() {
        this.tasks = new ArrayList<ExamTask>();
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

    public Mark getMark() {
        return mark;
    }

    public void setMark(Mark mark) {
        this.mark = mark;
    }

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
    public boolean verifyOwner(@org.jetbrains.annotations.NotNull String owner) {
        return false;
    }

    @Override
    public EamDto toDto() {
        return null;
    }

    @org.jetbrains.annotations.NotNull
    @Override
    public Mapper<EamDto, Exam> getMapper() {
        return null;
    }

    //endregion
}
