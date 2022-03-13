import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, firstValueFrom, Observable } from "rxjs";

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

  constructor(readonly http: HttpClient) {
    super();
    firstValueFrom(
      this.http.get<Task[] | []>("/api/task-list", jsonContentTypeOptions)
    ).then((u) => this._tasksDb.next(u));
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
    } catch (error) {
      throw new Error("Error: Create Task");
    }
  }

  async updateChildren(taskId: string, children: Task): Promise<void> {
    try {
      const task = await firstValueFrom(
        this.http.post<Task>(
          "/api/update-task-children",
          { taskId, children },
          jsonContentTypeOptions
        )
      );
    } catch (error) {
      throw new Error("Error");
    }
  }

  override async updateQuota(taskId: string, quota: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  override async updateQuotaInterval(
    taskId: string,
    quotaInterval: Interval
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
