import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Task, TasksService } from "./tasks.service";

@Injectable({
  providedIn: "root",
})
export class DummyTasksService extends TasksService {
  _tasksDb = new BehaviorSubject<Task[]>([]);
  getTasks(): Observable<Task[]> {
    return this._tasksDb;
  }
  async createTask(
    name: string,
    parentId: string | null,
    quota: number,
    quotaInterval: "day" | "week" | "month" | "year"
  ): Promise<Task> {
    const id = "task-" + Math.random();
    const task: Task = {
      id,
      name,
      children: [],
      quota,
      quotaInterval,
    };
    if (parentId === null) {
      this._tasksDb.next(this._tasksDb.value.concat([task]));
    } else {
      this._tasksDb.next(
        this._tasksDb.value.map((t) => {
          if (t.id === parentId)
            return { ...t, children: t.children.concat([task]) };
          else return t;
        })
      );
    }
    return task;
  }
}
