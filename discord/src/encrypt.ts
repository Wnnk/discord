import { JSEncrypt } from 'jsencrypt'
const encrypt = new JSEncrypt()
encrypt.setPublicKey(`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqkuLqIWASBRzudGvc2RE
dAHBLAivtnoPI3NZY/rexxKGZv3NbWU9bxhpsMutVTo9wDgdpK6UlO3Hq88z9bmp
XlckQq9AwCmTPzZXZz3l4b84yVe5vLcCXmPwZd0fcshLeRv0+nW0WpAoY2V7C7zZ
ns2VIlxPkTISp+oKQKbgh3bBFWOdcBHTbR54azzHtO71IzG4Ca+7AhNfLvLomCHp
/jhwhpY5Vxa8WGhgEGxD7cJTCjY9w6a1+L8cP59hGKQfAFEBjcQRwguzBGYCxm4I
wo3liySq3jmfRihOTxyG8Ng9m05WgAOny0BiZTWPQB0xOqOJSiIviuwFQXk6+5HK
2QIDAQAB
-----END PUBLIC KEY-----`)

export { encrypt }
