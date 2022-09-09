import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        black: {
            textColor: string;
            bgColor: string;
            mainColor: string;
            boxColor: string;
        }
        white: {
            textColor: string;
            bgColor: string;
            mainColor: string;
            boxColor: string;
        }
        arrowColor: string;
    }
}