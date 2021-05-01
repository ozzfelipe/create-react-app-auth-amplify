const { sendEmail } = require("../util/EmailSender");

class NotificationService {
  async push(userEmail = "felipe.santos@amcom.com.br", fileKey, others = "") {
    try {
      console.info("E-mail enviando para " + userEmail);
      const to = userEmail,
        subject = "AmplifyApp: Novo arquivo adicionado",
        body = `Seu novo arquivo foi adicionado com sucesso!
    Chave do arquivo: ${fileKey}\nLogs: ${others}`;

      await sendEmail(to, subject, body);
      console.info("E-mail enviado para " + userEmail);
    } catch (error) {
      console.error(error, error.stack);
    }
  }
}

module.exports = { NotificationService };
