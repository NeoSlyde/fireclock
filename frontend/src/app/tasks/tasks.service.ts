import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Task {
  id: string;
  name: string;
  children: Task[];
  quota: number;
  quotaInterval: "day" | "week" | "month" | "year";
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
    quotaInterval: "day" | "week" | "month" | "year"
  ): Promise<Task>;
}
