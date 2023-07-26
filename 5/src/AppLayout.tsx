import CssBaseline from "@mui/material/CssBaseline";
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AdbIcon from "@mui/icons-material/Adb";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import "./AppLayout.scss";

type Page = {
  readonly label: string;
  readonly path: string;
};

const pages: Page[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Contact us",
    path: "/contact-us",
  },
];

export default function AppLayout(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();

  return (
    <>
      <CssBaseline />

      <Grid container direction="column">
        <Grid item>
          <AppBar position="static">
            <Toolbar>
              <div className="app-bar">
                <AdbIcon />
                <Typography variant="h6" noWrap>
                  MUI — the best!
                </Typography>
                <div className="app-bar__menu">
                  {pages.map((page: Page) => (
                    <Button key={page.path} onClick={() => navigate(page.path)} sx={{ color: "white" }}>
                      {page.label}
                    </Button>
                  ))}
                </div>
              </div>
            </Toolbar>
          </AppBar>
        </Grid>

        <Grid item>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}
