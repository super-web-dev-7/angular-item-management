import * as Immutable from 'immutable';
import { IProject } from '@app/models/project';

export interface ProjectsState {
    projects: IProject[];
};

export const initializeProjectsState = (): ProjectsState => {
    return {
        projects: []
    }
}