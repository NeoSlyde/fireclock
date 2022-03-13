import { Injectable } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { map, Observable } from "rxjs";

export type Interval = "day" | "week" | "month" | "year";

export interface Task {
  id: string;
  name: string;
  children: Task[];
  quota: number;
  quotaInterval: Interval;
}

@Injectable({
  providedIn: "root",
})
export abstract class TasksService {
  constructor() {}

  // Returns the tasks of the current user
  abstract getTasks(): Observable<Task[]>;

  // Creates a task for the current user
  abstract createTask(
    name: string,
    parentId: string | null,
    quota: number,
    quotaInterval: Interval
  ): Promise<Task>;

  abstract deleteTask(taskId: string): Promise<void>;

  abstract updateName(taskId: string, name: string): Promise<void>;
  abstract updateQuota(taskId: string, quota: number): Promise<void>;
  abstract updateQuotaInterval(
    taskId: string,
    quotaInterval: Interval
  ): Promise<void>;

  getFlattenedIndentedTasks(): Observable<{ indent: number; task: Task }[]> {
    return this.getTasks().pipe(
      map((tasks) => {
        function recursive(
          indent: number,
          task: Task
        ): { indent: number; task: Task }[] {
          return [
            { indent, task },
            ...task.children.flatMap((c) => recursive(indent + 1, c)),
          ];
        }
        return tasks.flatMap((t) => recursive(0, t));
      })
    );
  }
}
