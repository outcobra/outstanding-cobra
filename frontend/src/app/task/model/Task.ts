import {SubjectDto} from "../../manage/model/ManageDto";

export interface Task {
    id: number,
    description: string,
    name: string,
    dueDate: Date,
    todoDate: Date,
    effort: number,
    progress: number,
    subject: SubjectDto
}
