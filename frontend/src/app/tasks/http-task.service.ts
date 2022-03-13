import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, firstValueFrom, Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Interval, Task, TasksService } from "./tasks.service";

const jsonContentTypeOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class HttpTaskService extends TasksService {
  _tasksDb = new BehaviorSubject<Task[]>([]);

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

  constructor(readonly http: HttpClient, readonly authService: AuthService) {
    super();
    authService.currentUser().subscribe((user) => {
      if (user === null) {
        this._tasksDb.next([]);
      } else {
        firstValueFrom(
          this.http.get<(Task & { parent_id: string | null })[]>(
            "/api/task-list",
            jsonContentTypeOptions
          )
        ).then((u) => {
          console.log("ORIGINAL");
          console.log("ORIGINAL");
          console.log("ORIGINAL");
          console.log(u);
          const transformed = transformParentIdToChildren(u);
          console.log("TRANSFORMED");
          console.log("TRANSFORMED");
          console.log("TRANSFORMED");
          console.log(transformed);
          this._tasksDb.next(transformed);
        });
      }
    });
  }

  override async createTask(
    name: string,
    parentId: string | null,
    quota: number,
    quotaInterval: Interval
  ): Promise<Task> {
    try {
      const task = await firstValueFrom(
        this.http.post<Task>(
          "/api/new-task",
          { name, parentId, quota, quotaInterval },
          jsonContentTypeOptions
        )
      );
      if (parentId === null) {
        this._tasksDb.next([...this._tasksDb.value, task]);
      } else {
        this._updateById(parentId, (t) => ({
          ...t,
          children: [...t.children, task],
        }));
      }
      return task;
    } catch (error) {
      throw new Error("Error: Create Task");
    }
  }

  override getTasks(): Observable<Task[]> {
    return this._tasksDb;
  }
  override async deleteTask(taskId: string): Promise<void> {
    try {
      const task = await firstValueFrom(
        this.http.post<Task>(
          "/api/delete-task",
          { taskId },
          jsonContentTypeOptions
        )
      );
      this._updateById(taskId, (_) => null);
    } catch (error) {
      throw new Error("Error: Delete Task");
    }
  }
  override async updateName(taskId: string, name: string): Promise<void> {
    try {
      const task = await firstValueFrom(
        this.http.post<Task>(
          "/api/update-task",
          { taskId, name },
          jsonContentTypeOptions
        )
      );
      this._updateById(taskId, (t) => ({ ...t, name }));
    } catch (error) {
      throw new Error("Error: Create Task");
    }
  }

  override async updateQuota(taskId: string, quota: number): Promise<void> {
    try {
      const task = await firstValueFrom(
        this.http.post<Task>(
          "/api//update-task-quota",
          { taskId, quota },
          jsonContentTypeOptions
        )
      );
      this._updateById(taskId, (t) => ({ ...t, quota }));
    } catch (error) {
      throw new Error("Error: Create Task");
    }
  }
  override async updateQuotaInterval(
    taskId: string,
    quotaInterval: Interval
  ): Promise<void> {
    try {
      const task = await firstValueFrom(
        this.http.post<Task>(
          "/api//update-task-quotaInterval",
          { taskId, quotaInterval },
          jsonContentTypeOptions
        )
      );
      this._updateById(taskId, (t) => ({ ...t, quotaInterval }));
    } catch (error) {
      throw new Error("Error: Create Task");
    }
  }
}

function transformParentIdToChildren(
  ts: (Task & { parent_id: string | null })[]
): Task[] {
  function childrenOf(t: Task & { parent_id: string | null }): Task[] {
    return ts
      .filter((t2) => t2.parent_id === t.id)
      .map((t2) => ({ ...t2, children: childrenOf(t2) }));
  }
  const topLevel: Task[] = [...ts]
    .map((t) => ({
      ...t,
      children: childrenOf(t),
    }))
    .filter((t) => t.parent_id === null);
  return topLevel;
}
