import { BehaviorSubject, map, Observable } from "rxjs";
import { Activity, ActivityService } from "./activity.service";

export class HttpActivityService extends ActivityService {
  getActivities(taskId: string): Observable<Activity[]> {
    throw new Error("Method not implemented.");
  }
  create(taskId: string, duration: number, created: Date): Promise<Activity> {
    throw new Error("Method not implemented.");
  }
  delete(activityId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateDuration(activityId: string, duration: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  updateCreated(activityId: string, created: Date): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
