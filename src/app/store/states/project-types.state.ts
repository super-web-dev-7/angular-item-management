export interface ProjectTypesState {
    types: [];
};

export const initializeProjectTypesState = (): ProjectTypesState => {
    return {
        types: []
    }
}