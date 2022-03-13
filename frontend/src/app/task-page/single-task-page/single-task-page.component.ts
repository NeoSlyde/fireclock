import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, mergeMap, Observable, of } from "rxjs";
import { Activity, ActivityService } from "src/app/activities/activity.service";
import { Task, TasksService } from "src/app/tasks/tasks.service";

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

  task$: Observable<(Task & { activities: Activity[] }) | null> =
    this.router.params.pipe(
      mergeMap((params) =>
        this.tasksService.getTaskById(params["id"] as string)
      ),
      mergeMap((task) =>
        task == null
          ? of(null)
          : this.activityService
              .getActivities(task.id)
              .pipe(map((activities) => ({ ...task, activities })))
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
}
