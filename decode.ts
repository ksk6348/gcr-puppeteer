const { promisify } = require('util');

const request = require('request');
const fs = require('fs');

const REQUEST_URL = 'https://sample-o6hgrpv7fq-uc.a.run.app';

const testReqest = async (url: string, filename: string) => {
  console.log('send request')
  console.time(filename)

  // const res = await promisify(request.post)({
  //   url: REQUEST_URL,
  //   headers: {
  //     "content-type": "application/json",
  //     "Authorization": `Bearer ${token}`,
  //   },
  //   body: JSON.stringify({ url })
  // })
  const metadataServerTokenURL = 'http://metadata/computeMetadata/v1/instance/service-accounts/default/identity?audience='
  const res = await promisify(request.post)({
    uri: metadataServerTokenURL + REQUEST_URL,
    headers: {
      'Metadata-Flavor': 'Google'
    }
  })

  console.log(res.body)
  const decode = Buffer.from(JSON.parse(res.body).img, 'base64');
  console.log('receive response')
  console.timeEnd(filename)
  await promisify(fs.writeFile)('.images/' + filename, decode)
}

testReqest('https://qiita.com/toshihirock/items/b79b058937b873ec1925', `sample.png`)
