import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, firstValueFrom, Observable } from "rxjs";
import { Activity, ActivityService } from "./activity.service";

const jsonContentTypeOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class HttpActivityService extends ActivityService {
  _activitiesDb = new BehaviorSubject<Activity[]>([]);

  _updateById(id: string, update: (t: Activity) => Activity | null) {
    this._activitiesDb.next(
      this._activitiesDb.value.flatMap((a) => {
        if (a.id !== id) return [a];
        const x = update(a);
        return x !== null ? [x] : [];
      })
    );
  }

  constructor(readonly http: HttpClient) {
    super();
    firstValueFrom(
      this.http.get<Activity[] | []>(
        "/api/list-activities",
        jsonContentTypeOptions
      )
    ).then((u) => this._activitiesDb.next(u));
  }

  override getActivities(taskId: string): Observable<Activity[]> {
    return this._activitiesDb;
  }

  override async create(
    taskId: string,
    duration: number,
    created: Date
  ): Promise<Activity> {
    try {
      const activity = await firstValueFrom(
        this.http.post<Activity>(
          "/api/new-activity",
          { taskId, duration, created },
          jsonContentTypeOptions
        )
      );
      this._activitiesDb.next([...this._activitiesDb.value, activity]);
      return activity;
    } catch (error) {
      throw new Error("Error: Create Activity");
    }
  }
  override async delete(activityId: string): Promise<void> {
    try {
      const activity = await firstValueFrom(
        this.http.post(
          "/api/delete-activity",
          { activityId },
          jsonContentTypeOptions
        )
      );
      this._updateById(activityId, (_) => null);
    } catch (error) {
      throw new Error("Error: Delete Activity");
    }
  }
  override async updateDuration(
    activityId: string,
    duration: number
  ): Promise<void> {
    try {
      const Activity = await firstValueFrom(
        this.http.post(
          "/api/update-duration-activity",
          { activityId, duration },
          jsonContentTypeOptions
        )
      );
      this._updateById(activityId, (a) => ({ ...a, duration }));
    } catch (error) {
      throw new Error("Error: Create Activity");
    }
  }
  override async updateCreated(
    activityId: string,
    created: Date
  ): Promise<void> {
    try {
      const activity = await firstValueFrom(
        this.http.post<Activity>(
          "/api/update-created-activity",
          { activityId, created },
          jsonContentTypeOptions
        )
      );
      this._updateById(activityId, (a) => ({ ...a, created }));
    } catch (error) {
      throw new Error("Error: Create Activity");
    }
  }
}
