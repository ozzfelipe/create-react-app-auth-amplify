const mountLogListHandler = (logs) => {
  const sortedLogs = logs.data.listLogs.items.sort((a) => a.createdAt);
  return sortedLogs.map(
    (log) => `${log.createdAt} - user: ${log.user} - ${log.description}\n`
  );
};

export const createLogFile = (logs) => {
  const logList = mountLogListHandler(logs);
  const element = document.createElement("a");
  const file = new Blob(logList, {
    type: "text/plain",
  });
  element.href = URL.createObjectURL(file);
  element.download = "myFile.txt";
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
};
