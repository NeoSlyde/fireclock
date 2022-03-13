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
      return activity;
    } catch (error) {
      throw new Error("Error: Create Activity");
    }
  }
  override async delete(activityId: string): Promise<void> {
    try {
      const activity = await firstValueFrom(
        this.http.post<Task>(
          "/api/delete-activity",
          { activityId },
          jsonContentTypeOptions
        )
      );
    } catch (error) {
      throw new Error("Error: Delete Task");
    }
  }
  override async updateDuration(
    activityId: string,
    duration: number
  ): Promise<void> {
    try {
      const task = await firstValueFrom(
        this.http.post<Task>(
          "/api/update-duration-activity",
          { activityId, duration },
          jsonContentTypeOptions
        )
      );
    } catch (error) {
      throw new Error("Error: Create Task");
    }
  }
  override async updateCreated(
    activityId: string,
    created: Date
  ): Promise<void> {
    try {
      const task = await firstValueFrom(
        this.http.post<Task>(
          "/api/update-created-activity",
          { activityId, created },
          jsonContentTypeOptions
        )
      );
    } catch (error) {
      throw new Error("Error: Create Task");
    }
  }
}
