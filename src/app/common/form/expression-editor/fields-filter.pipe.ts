import { Pipe, PipeTransform } from '@angular/core';
import { IField } from '@app/models/field.model';

@Pipe({
  name: 'fieldsFilter'
})
export class FieldsFilterPipe implements PipeTransform {

  transform(fields: IField[], filter: { type, label }): any {
    if (!fields || !filter) {
      return fields;
    }
    return fields.filter(field => field.label.indexOf(filter.label) !== -1 && field.type === filter.type);
  }

}
