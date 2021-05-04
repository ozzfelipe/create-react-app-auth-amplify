import Amplify, { Storage, Auth, API } from "aws-amplify";

Storage.configure({ level: "private" });

class StorageService {
  getS3Files = async () => {
    const result = await Storage.list("");
    console.log("getS3Files files:", result);
    return result;
  };

  uploadFileS3 = async (file) => {
    return await Storage.put(file.name, file);
  };

  deleteFileS3 = async (file) => {
    return await Storage.remove(file.key);
  };

  downloadFile = async (file) => {
    const res = await Storage.get(file.key, {
      download: true,
    });
    downloadBlob(res.Body, file.key);
  };
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || "download";
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.removeEventListener("click", clickHandler);
    }, 150);
  };
  a.addEventListener("click", clickHandler, false);
  a.click();
  return a;
}

export default StorageService;
