import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  combineLatest,
  firstValueFrom,
  map,
  mergeMap,
  Observable,
  of,
  tap,
} from "rxjs";
import { Activity, ActivityService } from "src/app/activities/activity.service";
import { Interval, Task, TasksService } from "src/app/tasks/tasks.service";

type EnhancedTask = Omit<Task, "children"> & {
  activities: Activity[];
  children: Task[];
};

@Component({
  selector: "app-single-task-page",
  templateUrl: "./single-task-page.component.html",
  styleUrls: ["./single-task-page.component.sass"],
})
export class SingleTaskPageComponent implements OnInit {
  constructor(
    readonly router: ActivatedRoute,
    readonly tasksService: TasksService,
    readonly activityService: ActivityService
  ) {}

  task$: Observable<EnhancedTask | null> = this.router.params.pipe(
    mergeMap((params) => this.tasksService.getTaskById(params["id"] as string)),
    mergeMap((t) =>
      t === null
        ? of(null)
        : this.activityService
            .getActivities(t.id)
            .pipe(map((a) => ({ ...t, activities: a })))
    )
  );

  ngOnInit(): void {
    this.router.params;
  }

  addActivity(taskId: string): void {
    this.activityService.create(taskId, 0, new Date());
  }

  onUpdateCreated(activityId: string, el: any) {
    const newDate: string = el.value;
    this.activityService.updateCreated(activityId, new Date(newDate));
  }

  onUpdateDuration(activityId: string, el: any) {
    const newDuration: string = el.value;
    const hours = parseInt(newDuration.substring(0, 2));
    const minutes = parseInt(newDuration.substring(3, 5));

    this.activityService.updateDuration(activityId, 60 * hours + minutes);
  }

  onDelete(activityId: string) {
    this.activityService.delete(activityId);
  }

  dateRoundedInterval(date: Date, interval: Interval): Date {
    let newDate = new Date(date);
    if (interval === "year") newDate.setMonth(0), newDate.setDate(1);
    if (interval === "month") newDate.setDate(1);
    if (interval === "week")
      newDate.setDate(
        date.getDate() - (date.getDay() === 0 ? 6 : date.getDay() - 1)
      );
    newDate.setHours(0);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    return newDate;
  }

  addDateInterval(date: Date, interval: Interval, multiplier: number): Date {
    let newDate = new Date(date);
    if (interval === "day") newDate.setDate(date.getDate() + multiplier);
    if (interval === "week") newDate.setDate(date.getDate() + 7 * multiplier);
    if (interval === "month") newDate.setMonth(date.getMonth() + multiplier);
    if (interval === "year")
      newDate.setFullYear(date.getFullYear() + multiplier);
    return newDate;
  }

  getNDates(interval: Interval, n: number): [Date, Date][] {
    const date = this.dateRoundedInterval(new Date(), interval);
    const dates: [Date, Date][] = [];
    for (let i = 0; i < n; ++i) {
      const j = -n + i + 1;
      dates.push([
        this.addDateInterval(date, interval, j),
        this.addDateInterval(date, interval, j + 1),
      ]);
    }
    return dates;
  }

  doneMinutes(dateBegin: Date, dateEnd: Date, task: EnhancedTask): number {
    return task.activities
      .filter(
        (a) =>
          new Date(a.created).getTime() >= dateBegin.getTime() &&
          new Date(a.created).getTime() < dateEnd.getTime()
      )
      .reduce((acc, activity) => acc + activity.duration, 0);
  }
}
