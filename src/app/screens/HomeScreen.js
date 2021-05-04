import React, { useEffect, useState } from "react";
import Amplify, { Auth, API } from "aws-amplify";
import {
  CssBaseline,
  Container,
  Typography,
  Button,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { Sync, CloudUpload } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import * as queries from "../../graphql/queries";
import GridFiles from "./components/GridFiles";
import CardItem from "./components/CardItem";
import LoggerService from "../services/logService";
import StorageService from "../services/storageService";
import NotificationService from "../services/notificationService";
import { createLogFile } from "../utils/createLogText";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },

  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const HomeScreen = (props) => {
  const classes = useStyles();

  const [files, setFiles] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [showLoading, setLoading] = useState(false);

  useEffect(() => {
    getS3Files();
    getUserInfo();
  }, []);

  const logService = new LoggerService();
  const storageService = new StorageService();
  const notificationService = new NotificationService();

  console.log(userInfo);

  const getUserInfo = async () => {
    const user = await Auth.currentUserInfo();
    setUserInfo(user);
  };

  const getS3Files = async () => {
    setLoading(true);
    setFiles(await storageService.getS3Files());
    setLoading(false);
  };

  const recoverLogs = async () => {
    setLoading(true);
    try {
      await logService.saveLog(
        userInfo.attributes.email,
        `User has requested interaction history`
      );
      const result = await API.graphql({
        query: queries.listLogs,
      });

      createLogFile(result);
      console.log("logs recovered", result);
    } catch (error) {
      console.log("Error recover logs", error);
    }
    setLoading(false);
  };

  const uploadFile = async (file) => {
    setLoading(true);
    const result = storageService.uploadFileS3(file);
    const message = `New file added - file name: ${file.name}`;
    logService.saveLog(userInfo.attributes.email, message);
    const messageResult = await notificationService.publicMessage(
      message,
      userInfo
    );
    console.log("message result", messageResult);
    getS3Files();
    setLoading(false);
  };

  const handleFileSelected = (e) => {
    console.log("files:", e.target.files);
    const { files } = e.target;
    if (files.length > 0) {
      uploadFile(files[0]);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ flex: 1, width: "100%", backgroundColor: "red" }}>
        <input
          accept="/*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={handleFileSelected}
        />

        <Container
          style={{
            display: "grid",
            height: 300,
            width: "70%",
            minWidth: 300,
            backgroundColor: "#fff",
            flex: 1,
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          {true && (
            <Typography
              style={{
                color: "#000",
                flex: 1,
                alignSelf: "center",
              }}
            >
              No files stored
            </Typography>
          )}
        </Container>

        <Container key={"containerButtons"}>
          <label htmlFor="contained-button-file">
            <Button
              style={{ margin: 10 }}
              variant="contained"
              color="primary"
              component="span"
              startIcon={<CloudUpload />}
            >
              Upload
            </Button>
          </label>
          <Button
            onClick={getS3Files}
            variant="contained"
            color="primary"
            component="span"
            startIcon={<Sync />}
          >
            Reload
          </Button>
        </Container>
      </div>
      <Button
        onClick={recoverLogs}
        style={{ margin: 10, alignSelf: "flex-end" }}
        startIcon
        variant="contained"
        color="primary"
        component="span"
      >
        Recover interactions
      </Button>
      <Backdrop className={classes.backdrop} open={showLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default HomeScreen;
