import React, { useState } from "react"
import { Signer, ethers } from "../../ethers-5.2-esm.min"
import { abi, contAddress } from "../../constants"

export default function PersonData() {
  const [functionCalled, setFunctionCalled] = useState(false)
  const [inputName, setInputName] = useState("")
  const [outputData, setOutputData] = useState("")

  async function personData() {
    const name = document.getElementById("input-name").value
    const number = document.getElementById("input-num").value
    const provider = await new ethers.providers.Web3Provider(window.ethereum)
    const signer = await provider.getSigner()
    const contract = await new ethers.Contract(contAddress, abi, signer)
    const giveData = await contract.newPerson(name, number)
    await giveData.wait(1)
    console.log("New person successfully added!")
  }

  async function getPersonData() {
    const getData = document.getElementById("get-data").value
    setInputName(getData)
    try {
      const provider = await new ethers.providers.Web3Provider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = await new ethers.Contract(contAddress, abi, signer)
      const response = await contract.nameToFavoriteNumber(getData)
      setOutputData(response.toString())
      setFunctionCalled(true)
    } catch (err) {
      console.log(err)
      setFunctionCalled(false)
    }
  }
  return (
    <div>
      <fieldset className="form-data">
        <legend>STORE DATA FOR A PERSON</legend>
        <input
          className="txt-area"
          id="input-num"
          type="text"
          placeholder="enter favorite number"
        />
        <input
          className="txt-area"
          id="input-name"
          type="text"
          placeholder="enter person's name"
        />
        <input
          className="txt-area"
          id="get-data"
          type="text"
          placeholder="enter name to get favorite number"
        />
        <button className="person" onClick={personData}>
          ADD DATA
        </button>
        <button className="person" onClick={getPersonData}>
          GET NUMBER
        </button>
        {functionCalled && (
          <p>
            The favorite number of {inputName} is {outputData}
          </p>
        )}
      </fieldset>
    </div>
  )
}
