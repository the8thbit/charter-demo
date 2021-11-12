import { createTheme } from '@material-ui/core/styles';

const getTheme = () => createTheme({
  overrides: {
    MUIDataTable: {
      paper: {
        backgroundColor: "rgba(255, 255, 255, 0.8)"
      },
      tableRoot: {
        backgroundColor: "rgba(255, 255, 255, 0.5)"
      },
    },
    MuiTableCell: {
      head: {
        background: "rgba(255, 255, 255, 0.3) !important",
      }
    }
  }
});

export default getTheme;
