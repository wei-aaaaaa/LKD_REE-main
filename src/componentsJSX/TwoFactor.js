import speakeasy from "speakeasy";
import QRCode from "qrcode";
// Generate a secret key
const secret = speakeasy.generateSecret({ length: 20 });

// Function to generate a QR code URL for Google Authenticator
function generateQRCodeURL() {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(secret.otpauth_url, (err, dataURL) => {
      if (err) {
        reject(err);
      } else {
        resolve(dataURL);
      }
    });
  });
}

// Generate and display the QR code URL
export const TwoFactor = () =>
  generateQRCodeURL()
    .then((dataURL) => {
      console.log("Scan the QR code with the Google Authenticator app:");
      // console.log(dataURL);
      return { dataURL, secret };
    })
    .catch((err) => {
      console.error("Error generating QR code:", err);
    });

export const VerifyOTP = (otp, secret) => {
  const secretAscii = base32ToAscii(secret.base32);
  const secretHex = asciiToHex(secretAscii);
  console.log(
    "secret?.base32",
    secret?.base32,
    "otp",
    otp,
    "secretHex",
    secretHex
  );

  const verified = speakeasy.totp.verify({
    secret: secretHex,
    encoding: "hex",
    token: otp,
  });
  console.log({ secret, otp });
  return verified;
};

function base32ToAscii(base32) {
  // 將 base32 編碼轉換為字串
  var base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  var bits = "";
  var result = "";

  for (var i = 0; i < base32.length; i++) {
    var val = base32chars.indexOf(base32.charAt(i).toUpperCase());
    bits += ("00000" + val.toString(2)).slice(-5);
  }

  for (var i = 0; i + 8 <= bits.length; i += 8) {
    var chunk = bits.substr(i, 8);
    result += String.fromCharCode(parseInt(chunk, 2));
  }

  return result;
}
function asciiToHex(str) {
  var hex = "";
  for (var i = 0; i < str.length; i++) {
    hex += "" + str.charCodeAt(i).toString(16);
  }
  return hex;
}
