import { FieldType } from './FieldType';

export interface IField {
    _id?: string;
    label?: string;
    type?: FieldType;
    options?: IFieldOptions;
    affectedFields?: any[];
}

export interface IAffectedField {
    fieldId: string;
    triggers: {triggerFieldText: string, actionFieldText:string}[];
}

export interface IFieldOptions {
    optionsForSelect?: {value:string}[];
    isMultiSelect?: boolean;
    minLength?: number;
    maxLength?: number;
    dateFormat?: string;
    minValue?: number;
    maxValue?: number;
}