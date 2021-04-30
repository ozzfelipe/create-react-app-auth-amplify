import React, { Component, useEffect, useState } from "react";
import Amplify, { Storage, Auth, DataStore } from "aws-amplify";
import { CssBaseline, Container, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Log } from "../../models/index";
const moment = require("moment");

const HomeScreen = (props) => {
  const classes = useStyles();

  const [files, setFiles] = useState([]);
  const [userInfo, setUserInfo] = useState();
  useEffect(() => {
    getS3Files();
    getUserInfo();
  }, []);

  console.log(userInfo);

  const getUserInfo = async () => {
    const user = await Auth.currentUserInfo();
    setUserInfo(user);
  };

  const getS3Files = async () => {
    const result = await Storage.list("", { level: "private" });
    setFiles(result);
    console.log("files:", result);
  };

  const saveLog = async () => {
    console.log(userInfo.attributes.email);
    const logToSave = new Log({
      user: userInfo.attributes.email,
      description: "novo arquivo adicionado",
      dateTime: Date.now().toLocaleString("pt-BR"),
    });
    try {
      const start = await DataStore.start();
      console.log("start", start);
      const result = await DataStore.save(logToSave);
      console.log("Post saved successfully!", logToSave);
      console.log("Post result", result);
    } catch (error) {
      console.log("Error saving post", error);
    }
  };

  const uploadFileS3 = async (file) => {
    const result = await Storage.put(file.name, file, { level: "private" });
    getS3Files();
    saveLog();
    console.log("file uploaded", result);
  };

  const deleteFileS3 = async (file) => {
    let result = [];
    files.forEach(async (value, index, list) => {
      result.push(await Storage.remove(list[index].key, { level: "private" }));
    });
    Promise.all(result).then((result) => {
      console.log("file deleted", result);
    });
  };

  const handleFileSelected = (e) => {
    console.log("files:", e.target.files);
    const { files } = e.target;
    if (files.length > 0) {
      uploadFileS3(files[0]);
    }
  };

  return (
    <div>
      <input
        accept="/*"
        className={classes.input}
        id="contained-button-file"
        type="file"
        onChange={handleFileSelected}
      />

      <CssBaseline />
      <Container>
        <label htmlFor="contained-button-file">
          <Button
            style={{ margin: 10 }}
            variant="contained"
            color="primary"
            component="span"
          >
            Upload
          </Button>
        </label>
        <Button
          onClick={getS3Files}
          startIcon
          variant="contained"
          color="primary"
          component="span"
        >
          Reload
        </Button>
        <Button
          onClick={() => deleteFileS3()}
          style={{ margin: 10 }}
          startIcon
          variant="contained"
          color="primary"
          component="span"
        >
          Delete all files
        </Button>
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export default HomeScreen;
