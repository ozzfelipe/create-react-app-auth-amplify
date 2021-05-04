import { API } from "aws-amplify";
import * as mutations from "../../graphql/mutations";
import { Log } from "../../models/index";

class LoggerService {
  saveLog = async (email, message) => {
    console.log(email);
    const logToSave = new Log({
      user: email,
      description: message,
    });
    try {
      const result = await API.graphql({
        query: mutations.createLog,
        variables: { input: logToSave },
      });
      console.log("Post saved successfully!", logToSave);
      console.log("Post result", result);
      return "SUCCESS";
    } catch (error) {
      console.log("Error saving post", error);
      return "FAILED";
    }
  };
}

export default LoggerService;
