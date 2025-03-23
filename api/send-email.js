import emailjs from "@emailjs/browser";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const formData = req.body; // Dados do formulário recebidos do Front-End

    try {
      emailjs.init("UDd8kCDYeoyRHPhWs"); // Inicia com a chave pública do EmailJS

      // Envia o e-mail com os dados do formulário usando emailjs.send()
      const response = await emailjs.send(
        "service_9itshwl", // Seu ID do serviço
        "template_contact", // Seu ID do template
        formData // Os dados do formulário
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
