import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostRecentFirst'
})
export class MostRecentFirstPipe implements PipeTransform {

  private compare(a, b): number {

    let createdOnA, createdOnB;

    if (a.dateRegistered && b.dateRegistered) {
      createdOnA = a.dateRegistered;
      createdOnB = b.dateRegistered;
    }
    if (a.dateSubscribed && b.dateSubscribed) {
      createdOnA = a.dateSubscribed;
      createdOnB = b.dateSubscribed;
    }
    if (a.activityDate && a.activityDate) {
      createdOnA = a.activityDate;
      createdOnB = b.activityDate;
    }

    let comparison = 1;
    if (createdOnA > createdOnB) {
      comparison = -1;
    }
    return comparison;
  }

  transform(users: any[]): any[] {
    if (users && users.length > 0) {
      return users.sort(this.compare);
    }
    return null;
  }

}
