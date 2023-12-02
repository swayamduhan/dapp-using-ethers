import React from "react"
import { ethers } from "../../ethers-5.2-esm.min"
import { abi, contAddress } from "../../constants"

export default function Send({balance}) {

    async function fund() {
    const sendValue = document.getElementById('value').value
    const provider = await new ethers.providers.Web3Provider(window.ethereum)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(contAddress, abi, signer)
    console.log(`funding with ${sendValue} ETH`)
    const transactionResponse = await contract.fund({value : ethers.utils.parseEther(sendValue)})
    await transactionResponse.wait(1)
    await balance()
    console.log("funded and balance updated!!")
  }
  return (
    <div>
      <button onClick={fund}>FUND</button>
      <input className="txt-area" id="value" name="fund" type="text" placeholder="enter amount in ETH to fund with" />
    </div>
  )
}
