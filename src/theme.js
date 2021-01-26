import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#6eec20"
        },
        secondary: {
            main: "rgba(0, 0, 0, 0.5)"
        }
    },
    typography: {
        fontFamily: "Space Mono"
    },
    label: {
        color: "secondary"
    }
})

export default theme;