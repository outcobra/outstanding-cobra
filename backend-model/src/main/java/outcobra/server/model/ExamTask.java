package outcobra.server.model;

import outcobra.server.model.interfaces.ParentLinked;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@Entity
public class ExamTask extends AbstractEntity implements ParentLinked {
    @NotNull
    private String task;

    @NotNull
    @ManyToOne
    private Exam exam;

    @NotNull
    private boolean finished;

    //region constructors
    public ExamTask(Long id, String task, Exam exam, boolean finished) {
        this.id = id;
        this.task = task;
        this.exam = exam;
        this.finished = finished;
    }

    /**
     * @param task
     * @param exam
     * @param finished
     */
    public ExamTask(String task, Exam exam, boolean finished) {
        this.task = task;
        this.exam = exam;
        this.finished = finished;
    }

    public ExamTask() {
    }
    //endregion

    //region default functions
    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public Exam getExam() {
        return exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }

    public boolean isFinished() {
        return finished;
    }

    public void setFinished(boolean finished) {
        this.finished = finished;
    }

    @SuppressWarnings("SimplifiableIfStatement")
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ExamTask)) return false;

        ExamTask examTask = (ExamTask) o;

        if (isFinished() != examTask.isFinished()) return false;
        if (!getId().equals(examTask.getId())) return false;
        if (getTask() != null ? !getTask().equals(examTask.getTask()) : examTask.getTask() != null)
            return false;
        return getExam().equals(examTask.getExam());

    }

    @Override
    public int hashCode() {
        int result = getId().hashCode();
        result = 31 * result + (getTask() != null ? getTask().hashCode() : 0);
        result = 31 * result + getExam().hashCode();
        result = 31 * result + (isFinished() ? 1 : 0);
        return result;
    }

    @Override
    public ParentLinked getParent() {
        return exam;
    }
    //endregion
}

