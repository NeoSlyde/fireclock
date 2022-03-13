import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface Activity {
  id: string;
  taskId: string;
  duration: number; // In Minutes
  created: Date;
}

@Injectable({
  providedIn: "root",
})
export abstract class ActivityService {
  // Returns all the activities of the specified task
  abstract getActivities(taskId: string): Observable<Activity[]>;
  abstract create(
    taskId: string,
    duration: number,
    created: Date
  ): Promise<Activity>;
  abstract delete(activityId: string): Promise<void>;
  abstract updateDuration(activityId: string, duration: number): Promise<void>;
  abstract updateCreated(activityId: string, created: Date): Promise<void>;
}
