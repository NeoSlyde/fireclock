import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Interval, Task, TasksService } from "./tasks.service";

const _initialTasks: Task[] = [
  {
    id: "561513",
    name: "Education",
    quota: 3200,
    quotaInterval: "month",
    children: [
      {
        id: "42895234",
        name: "Music",
        quota: 600,
        quotaInterval: "week",
        children: [],
      },
      {
        id: "4652551",
        name: "Comp Sci",
        quota: 240,
        quotaInterval: "day",
        children: [
          {
            id: "2423523",
            name: "Angular",
            quota: 60,
            quotaInterval: "day",
            children: [],
          },
          {
            id: "7435435",
            name: "Rust",
            quota: 90,
            quotaInterval: "day",
            children: [],
          },
          {
            id: "6234245",
            name: "Backend dev",
            quota: 45,
            quotaInterval: "day",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "543235",
    name: "Sport",
    quota: 180,
    quotaInterval: "day",
    children: [],
  },
];

@Injectable({
  providedIn: "root",
})
export class DummyTasksService extends TasksService {
  _tasksDb = new BehaviorSubject<Task[]>(_initialTasks);

  _getById(id: string): Task | null {
    return this._tasksDb.value.find((t) => t.id === id) ?? null;
  }

  _updateByIdPure(
    id: string,
    tasks: Task[],
    update: (t: Task) => Task | null
  ): Task[] {
    return tasks
      .map((t) =>
        t.id === id
          ? update(t)
          : { ...t, children: this._updateByIdPure(id, t.children, update) }
      )
      .filter((t) => !!t)
      .map((t) => t as Task);
  }

  _updateById(id: string, update: (t: Task) => Task | null) {
    this._tasksDb.next(this._updateByIdPure(id, this._tasksDb.value, update));
  }

  override getTasks(): Observable<Task[]> {
    return this._tasksDb;
  }

  override async createTask(
    name: string,
    parentId: string | null,
    quota: number,
    quotaInterval: Interval
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
      this._updateById(parentId, (t) => ({
        ...t,
        children: [task, ...t.children],
      }));
    }
    return task;
  }

  override async deleteTask(taskId: string): Promise<void> {
    this._updateById(taskId, (t) => null);
  }

  override async updateName(taskId: string, name: string): Promise<void> {
    this._updateById(taskId, (t) => ({ ...t, name }));
  }

  override async updateQuota(taskId: string, quota: number): Promise<void> {
    this._updateById(taskId, (t) => ({ ...t, quota }));
  }

  override async updateQuotaInterval(
    taskId: string,
    quotaInterval: Interval
  ): Promise<void> {
    this._updateById(taskId, (t) => ({ ...t, quotaInterval }));
  }
}
