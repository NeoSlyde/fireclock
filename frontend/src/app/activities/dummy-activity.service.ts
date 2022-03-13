import { BehaviorSubject, map, Observable } from "rxjs";
import { Activity, ActivityService } from "./activity.service";

export class DummyActivityService extends ActivityService {
  // Maps task ID to
  _activityDb = new BehaviorSubject<Activity[]>([]);

  _update(activityId: string, update: (a: Activity) => Activity | null) {
    this._activityDb.next(
      this._activityDb.value.flatMap((a) => {
        if (a.id !== activityId) return [a];
        const newActivity = update(a);
        if (newActivity == null) return [];
        return [newActivity];
      })
    );
  }

  override getActivities(taskId: string): Observable<Activity[]> {
    return this._activityDb.pipe(
      map((db) => db.filter((a) => a.taskId === taskId) ?? [])
    );
  }

  override async create(
    taskId: string,
    duration: number,
    created: Date
  ): Promise<Activity> {
    const id = Math.random().toString();
    const activity: Activity = {
      id,
      duration,
      created,
      taskId,
    };
    this._activityDb.next([...this._activityDb.value, activity]);
    return activity;
  }

  override async delete(activityId: string): Promise<void> {
    this._update(activityId, (a) => null);
  }

  override async updateDuration(
    activityId: string,
    duration: number
  ): Promise<void> {
    this._update(activityId, (a) => ({ ...a, duration }));
  }

  override async updateCreated(
    activityId: string,
    created: Date
  ): Promise<void> {
    this._update(activityId, (a) => ({ ...a, created }));
  }
}
