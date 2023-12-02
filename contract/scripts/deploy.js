const { ethers } = require('hardhat')

async function main(){
  const contract = await ethers.getContractFactory('Metacrafters')
  console.log('Deploying, please wait...')
  const deployedContract = await contract.deploy()
  await deployedContract.waitForDeployment()
  const contractAddress = await deployedContract.getAddress()
  console.log(`Deployed to : ${contractAddress}`)
}

main()
.then(()=>process.exit(0))
.catch((err)=>{
  console.log(err)
  process.exit(1)
})