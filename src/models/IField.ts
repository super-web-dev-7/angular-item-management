import { FieldType } from './FieldType';

export interface IField {
    _id: string;
    label: string;
    type: FieldType;
    minLength: number;
    maxLength: number;
}