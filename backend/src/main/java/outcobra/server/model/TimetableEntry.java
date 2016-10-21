package outcobra.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalTime;

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

    private String room;

    @ManyToOne
    private Timetable timetable;

    @ManyToOne
    private Subject subject;
}
