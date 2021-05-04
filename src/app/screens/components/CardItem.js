import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import { Title } from "./styles";
import { Delete, CloudDownload, Folder } from "@material-ui/icons";
import StorageService from "../../services/storageService";
import LogService from "../../services/logService";
import NotificationService from "../../services/notificationService";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  container: {
    alignItems: "center",
    margin: 12,
    padding: 12,
  },
  title: {
    fontSize: 12,
    color: "primary",
  },
  pos: {
    marginBottom: 12,
  },
  demo: {
    backgroundColor: "#fff",
    borderRadius: 20,
    flexGrow: 1,
  },
});

export default function CardItem({ item, userInfo, refreashList, setLoading }) {
  const classes = useStyles();

  const storageService = new StorageService();
  const logService = new LogService();
  const notificationService = new NotificationService();

  const deleteFile = async (file) => {
    setLoading(true);

    const result = await storageService.deleteFileS3(file);

    console.log("file deleted", result);
    const message = `File deleted by user - file name: ${file.key}`;
    logService.saveLog(userInfo.attributes.email, message);
    const messageResult = await notificationService.publicMessage(
      message,
      userInfo
    );
    refreashList();
  };

  return (
    <Grid item xs={12} md={4} className={classes.container}>
      <div className={classes.demo}>
        <List>
          <ListItem>
            <ListItemAvatar
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: -25,
              }}
            >
              <Folder style={{ fontSize: 20, marginTop: 6 }} color="primary" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={classes.title}
              primary={item.key}
              style={{
                maxLines: 1,
                marginRight: 40,
                color: "#3f51b5",
                fontSize: 20,
              }}
            />
            <ListItemSecondaryAction>
              <IconButton
                onClick={async () => {
                  setLoading(true);
                  await storageService.downloadFile(item);
                  setLoading(false);
                }}
                color="primary"
              >
                <CloudDownload style={{ fontSize: 20 }} />
              </IconButton>
              <IconButton onClick={() => deleteFile(item)} color="primary">
                <Delete style={{ fontSize: 20 }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListItemAvatar
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: -25,
              }}
            >
              <Folder style={{ fontSize: 20, marginTop: 6 }} color="primary" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={classes.title}
              primary={item.key}
              style={{
                maxLines: 1,
                marginRight: 40,
                color: "#3f51b5",
                fontSize: 20,
              }}
            />
            <ListItemSecondaryAction>
              <IconButton
                onClick={async () => {
                  setLoading(true);
                  await storageService.downloadFile(item);
                  setLoading(false);
                }}
                color="primary"
              >
                <CloudDownload style={{ fontSize: 20 }} />
              </IconButton>
              <IconButton onClick={() => deleteFile(item)} color="primary">
                <Delete style={{ fontSize: 20 }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListItemAvatar
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: -25,
              }}
            >
              <Folder style={{ fontSize: 20, marginTop: 6 }} color="primary" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={classes.title}
              primary={item.key}
              style={{
                maxLines: 1,
                marginRight: 40,
                color: "#3f51b5",
                fontSize: 20,
              }}
            />
            <ListItemSecondaryAction>
              <IconButton
                onClick={async () => {
                  setLoading(true);
                  await storageService.downloadFile(item);
                  setLoading(false);
                }}
                color="primary"
              >
                <CloudDownload style={{ fontSize: 20 }} />
              </IconButton>
              <IconButton onClick={() => deleteFile(item)} color="primary">
                <Delete style={{ fontSize: 20 }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListItemAvatar
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: -25,
              }}
            >
              <Folder style={{ fontSize: 20, marginTop: 6 }} color="primary" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={classes.title}
              primary={item.key}
              style={{
                maxLines: 1,
                marginRight: 40,
                color: "#3f51b5",
                fontSize: 20,
              }}
            />
            <ListItemSecondaryAction>
              <IconButton
                onClick={async () => {
                  setLoading(true);
                  await storageService.downloadFile(item);
                  setLoading(false);
                }}
                color="primary"
              >
                <CloudDownload style={{ fontSize: 20 }} />
              </IconButton>
              <IconButton onClick={() => deleteFile(item)} color="primary">
                <Delete style={{ fontSize: 20 }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListItemAvatar
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: -25,
              }}
            >
              <Folder style={{ fontSize: 20, marginTop: 6 }} color="primary" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={classes.title}
              primary={item.key}
              style={{
                maxLines: 1,
                marginRight: 40,
                color: "#3f51b5",
                fontSize: 20,
              }}
            />
            <ListItemSecondaryAction>
              <IconButton
                onClick={async () => {
                  setLoading(true);
                  await storageService.downloadFile(item);
                  setLoading(false);
                }}
                color="primary"
              >
                <CloudDownload style={{ fontSize: 20 }} />
              </IconButton>
              <IconButton onClick={() => deleteFile(item)} color="primary">
                <Delete style={{ fontSize: 20 }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListItemAvatar
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: -25,
              }}
            >
              <Folder style={{ fontSize: 20, marginTop: 6 }} color="primary" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={classes.title}
              primary={item.key}
              style={{
                maxLines: 1,
                marginRight: 40,
                color: "#3f51b5",
                fontSize: 20,
              }}
            />
            <ListItemSecondaryAction>
              <IconButton
                onClick={async () => {
                  setLoading(true);
                  await storageService.downloadFile(item);
                  setLoading(false);
                }}
                color="primary"
              >
                <CloudDownload style={{ fontSize: 20 }} />
              </IconButton>
              <IconButton onClick={() => deleteFile(item)} color="primary">
                <Delete style={{ fontSize: 20 }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListItemAvatar
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: -25,
              }}
            >
              <Folder style={{ fontSize: 20, marginTop: 6 }} color="primary" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={classes.title}
              primary={item.key}
              style={{
                maxLines: 1,
                marginRight: 40,
                color: "#3f51b5",
                fontSize: 20,
              }}
            />
            <ListItemSecondaryAction>
              <IconButton
                onClick={async () => {
                  setLoading(true);
                  await storageService.downloadFile(item);
                  setLoading(false);
                }}
                color="primary"
              >
                <CloudDownload style={{ fontSize: 20 }} />
              </IconButton>
              <IconButton onClick={() => deleteFile(item)} color="primary">
                <Delete style={{ fontSize: 20 }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListItemAvatar
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: -25,
              }}
            >
              <Folder style={{ fontSize: 20, marginTop: 6 }} color="primary" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={classes.title}
              primary={item.key}
              style={{
                maxLines: 1,
                marginRight: 40,
                color: "#3f51b5",
                fontSize: 20,
              }}
            />
            <ListItemSecondaryAction>
              <IconButton
                onClick={async () => {
                  setLoading(true);
                  await storageService.downloadFile(item);
                  setLoading(false);
                }}
                color="primary"
              >
                <CloudDownload style={{ fontSize: 20 }} />
              </IconButton>
              <IconButton onClick={() => deleteFile(item)} color="primary">
                <Delete style={{ fontSize: 20 }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListItemAvatar
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: -25,
              }}
            >
              <Folder style={{ fontSize: 20, marginTop: 6 }} color="primary" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={classes.title}
              primary={item.key}
              style={{
                maxLines: 1,
                marginRight: 40,
                color: "#3f51b5",
                fontSize: 20,
              }}
            />
            <ListItemSecondaryAction>
              <IconButton
                onClick={async () => {
                  setLoading(true);
                  await storageService.downloadFile(item);
                  setLoading(false);
                }}
                color="primary"
              >
                <CloudDownload style={{ fontSize: 20 }} />
              </IconButton>
              <IconButton onClick={() => deleteFile(item)} color="primary">
                <Delete style={{ fontSize: 20 }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListItemAvatar
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: -25,
              }}
            >
              <Folder style={{ fontSize: 20, marginTop: 6 }} color="primary" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={classes.title}
              primary={item.key}
              style={{
                maxLines: 1,
                marginRight: 40,
                color: "#3f51b5",
                fontSize: 20,
              }}
            />
            <ListItemSecondaryAction>
              <IconButton
                onClick={async () => {
                  setLoading(true);
                  await storageService.downloadFile(item);
                  setLoading(false);
                }}
                color="primary"
              >
                <CloudDownload style={{ fontSize: 20 }} />
              </IconButton>
              <IconButton onClick={() => deleteFile(item)} color="primary">
                <Delete style={{ fontSize: 20 }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListItemAvatar
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: -25,
              }}
            >
              <Folder style={{ fontSize: 20, marginTop: 6 }} color="primary" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={classes.title}
              primary={item.key}
              style={{
                maxLines: 1,
                marginRight: 40,
                color: "#3f51b5",
                fontSize: 20,
              }}
            />
            <ListItemSecondaryAction>
              <IconButton
                onClick={async () => {
                  setLoading(true);
                  await storageService.downloadFile(item);
                  setLoading(false);
                }}
                color="primary"
              >
                <CloudDownload style={{ fontSize: 20 }} />
              </IconButton>
              <IconButton onClick={() => deleteFile(item)} color="primary">
                <Delete style={{ fontSize: 20 }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListItemAvatar
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginRight: -25,
              }}
            >
              <Folder style={{ fontSize: 20, marginTop: 6 }} color="primary" />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={classes.title}
              primary={item.key}
              style={{
                maxLines: 1,
                marginRight: 40,
                color: "#3f51b5",
                fontSize: 20,
              }}
            />
            <ListItemSecondaryAction>
              <IconButton
                onClick={async () => {
                  setLoading(true);
                  await storageService.downloadFile(item);
                  setLoading(false);
                }}
                color="primary"
              >
                <CloudDownload style={{ fontSize: 20 }} />
              </IconButton>
              <IconButton onClick={() => deleteFile(item)} color="primary">
                <Delete style={{ fontSize: 20 }} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    </Grid>
  );
}
