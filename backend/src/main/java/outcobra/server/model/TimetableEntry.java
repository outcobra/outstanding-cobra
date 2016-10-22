package outcobra.server.model;

import java.time.LocalTime;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class TimetableEntry {
    @Id
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private WeekDay weekDay;

    @NotNull
    private LocalTime time;

    /**
     * value needs to be >=1
     * if a subject takes place more than once a week
     * there are multiples TimeTableEntries
     */
    @Min(1)
    @NotNull
    private int repeatEveryNWeeks;

    private String room;

    @ManyToOne
    private Timetable timetable;

    @ManyToOne
    private Subject subject;
}
