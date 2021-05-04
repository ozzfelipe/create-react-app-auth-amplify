import { API } from "aws-amplify";
import * as mutations from "../../graphql/mutations";

class NotificationService {
  publicMessage = async (message, userInfo) => {
    const result = await API.graphql({
      query: mutations.publishMessage,
      variables: {
        userEmail: userInfo.attributes.email,
        message,
      },
    });
    return result;
  };
}

export default NotificationService;
