import { Component, OnInit } from "@angular/core";
import { map, Observable } from "rxjs";
import { Interval, TasksService } from "../tasks/tasks.service";

@Component({
  selector: "app-task-page",
  templateUrl: "./task-page.component.html",
  styleUrls: ["./task-page.component.sass"],
})
export class TaskPageComponent implements OnInit {
  constructor(readonly tasksService: TasksService) {}

  ngOnInit(): void {}

  onUpdateName(taskId: string, el: any) {
    this.tasksService.updateName(taskId, el.value);
  }

  onAddChild(taskId: string) {
    this.tasksService.createTask("", taskId, 60, "day");
  }

  onRemove(taskId: string) {
    this.tasksService.deleteTask(taskId);
  }

  onUpdateQuotaInterval(taskId: string, el: any) {
    const interval = el.value as Interval;
    this.tasksService.updateQuotaInterval(taskId, interval);
  }

  onUpdateQuota(taskId: string, el: any) {
    const quotaMinutes = parseInt(el.value || "0");
    this.tasksService.updateQuota(taskId, quotaMinutes);
  }

  intervalOptions: {
    value: Interval;
    name: String;
  }[] = [
    { value: "day", name: "day" },
    { value: "week", name: "week" },
    { value: "month", name: "month" },
    { value: "year", name: "year" },
  ];
  getIntervalOptionObject(interval: Interval): {
    value: Interval;
    name: String;
  } {
    console.log(this.intervalOptions.find((x) => x.value === interval)!);

    return this.intervalOptions.find((x) => x.value === interval)!;
  }
}
