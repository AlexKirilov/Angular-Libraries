export interface openDialog {
    title?: string;
    message: string;
    type: 'error' | 'warning' | 'info' | 'status' | 'debug' | string;
    ErrorSource?: string;
    ErrorDateTime?: Date;
}

export interface openDialogPrompt {
    Title: string;
    Type?: string;
    ErrorMessage: string;
    ErrorSource?: string;
    ErrorDateTime?: Date;
    Elements?: any | null;
}

export interface inputListI {
    field: string;
    type: 'text' | 'number' | 'email' | 'password' | 'tel' | 'date' | 'datetime-local' | 'month' | 'week' | 'time' | 'color' | 'search' | 'url';
    value: string | number;
    placeholder?: string;
}

export interface openDialogInputs {
    msg: string;
    data: Array<inputListI>;
}