import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostRecentFirst'
})
export class MostRecentFirstPipe implements PipeTransform {
  
  private compare(a, b) {
    const createdOnA = a.dateRegistered ? a.dateRegistered : a.dateSubscribed;
    const createdOnB = b.dateRegistered ? b.dateRegistered : b.dateSubscribed;

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
