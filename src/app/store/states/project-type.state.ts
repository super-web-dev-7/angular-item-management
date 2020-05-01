import * as Immutable from 'immutable';
import { IField } from '@app/models/field.model';

export interface ProjectTypeState {
    projectTypeId: number;
    fields: Immutable.Map<string, IField>;
    selectedField: IField;
};

export const initializeProjectTypeState = (): ProjectTypeState => {
    return {
        projectTypeId: 0,
        fields: Immutable.Map(),
        selectedField: undefined
    }
}