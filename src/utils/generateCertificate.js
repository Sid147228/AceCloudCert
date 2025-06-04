import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export const generateCertificatePDF = async ({ name, score, examName }) => {
  const today = new Date().toLocaleDateString();
  const html = `
    <html>
      <body style="text-align: center; font-family: sans-serif; padding: 40px;">
        <h1 style="color: #0f62fe;">AceCloudCert Certificate</h1>
        <p style="font-size: 18px;">This certifies that</p>
        <h2 style="margin: 0; font-size: 28px;">${name}</h2>
        <p style="font-size: 18px;">has successfully completed the</p>
        <h3 style="margin: 0;">${examName} Mock Exam</h3>
        <p style="font-size: 18px;">with a score of <strong>${score}%</strong></p>
        <p><strong>Date:</strong> ${today}</p>
        <img src="https://your-cdn.com/logo.png" width="100" style="margin-top: 20px;" />
        <p style="margin-top: 20px; color: gray;">Powered by AceCloudCert</p>
      </body>
    </html>
  `;

  try {
    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri, {
      UTI: '.pdf',
      mimeType: 'application/pdf'
    });
  } catch (err) {
    throw new Error('Failed to generate certificate: ' + err.message);
  }
};
