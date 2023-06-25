function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function sleep() {
  return await timeout(10000);
}

function get(chainId) {
  const fs = require("fs");

  const filename = './zola-addresses/' + chainId + '.json'

  const data = fs.existsSync(filename) ? JSON.parse(fs.readFileSync(filename, "utf8")) : {}

  return data;
}

function save(chainId, name, value) {

  const fs = require("fs");

  const filename = './zola-addresses/' + chainId + '.json'

  const data = get(chainId)

  data[name] = value;

  fs.writeFileSync(filename, JSON.stringify(data, null, 4))

}

async function deploy(name, args=[]) {
  console.log("deploy " + name, args)
  const signers = await ethers.getSigners();
  console.log("deploying ", name, "from", signers[0].address);
  const nonce = await ethers.provider.getTransactionCount(signers[0].address);
  console.log("nonce", nonce)
  const { chainId } = await ethers.provider.getNetwork();
  console.log("chainId", chainId)
  const Token = await ethers.getContractFactory(name);
  console.log("Token", Token)
  const finalArgs = [...args, { nonce }]
  console.log("finalArgs", finalArgs) 
  const token = await Token.deploy.apply(Token, finalArgs);
  console.log("token", token.getAddress())
  
  save(chainId, name, token.getAddress()); 
  await sleep()
  console.log("deployed ", name, token.getAddress(), "from", signers[0].address);
  return token.getAddress();

}

async function main() {
  // We get the contract to deploy

  const signers = await ethers.getSigners();
  const { chainId } = await ethers.provider.getNetwork();  
  const data = get(chainId)

  if (data.ZolaFactory && data.WMATIC) {
    await deploy("ZolaRouter", [data.ZolaFactory, data.WMATIC])
  }
  else {
    throw "data.ZolaFactory and data.WMATIC are expected to be available"
  }

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
