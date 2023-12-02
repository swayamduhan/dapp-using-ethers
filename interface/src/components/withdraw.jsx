import React from "react"
import { ethers } from "../../ethers-5.2-esm.min"
import { abi, contAddress } from "../../constants"

export default function Withdraw({balance}) {
  async function withd() {
    const provider = await new ethers.providers.Web3Provider(window.ethereum)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(contAddress, abi, signer)
    console.log("withdrawing...")
    const transactionResponse = await contract.withdraw()
    await transactionResponse.wait(1)
    await balance()
    console.log("withdrawn and balance updated!!")
  }
  return (
    <div>
      <button onClick={withd}>WITHDRAW</button>
    </div>
  )
}
