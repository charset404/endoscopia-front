const emailjs = require("@emailjs/browser");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const formData = req.body;

    try {
      emailjs.init("UDd8kCDYeoyRHPhWs");

      const response = await emailjs.send(
        "service_9itshwl",
        "template_contact",
        formData
      );

      return res.status(200).json({ message: "E-mail enviado com sucesso!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao enviar o e-mail!" });
    }
  } else {
    return res.status(405).json({ message: "Método não permitido" });
  }
}
