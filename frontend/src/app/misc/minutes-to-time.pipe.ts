import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "minutesToTime",
})
export class MinutesToTimePipe implements PipeTransform {
  transform(value: number): string {
    return (
      `${Math.floor(value / 60)}`.padStart(2, "0") +
      ":" +
      `${value % 60}`.padStart(2, "0")
    );
  }
}
