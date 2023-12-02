import { useState, useEffect } from "react"
import "./App.css"
import { ethers } from "../ethers-5.2-esm.min.js"
import PersonData from "./components/personData.jsx"
import Send from "./components/send.jsx"
import Withdraw from "./components/withdraw.jsx"

export default function App() {
  // connect dabane pe metamask kholke connect, jab mm connect hojaye tab disconnect ka button dikhao
  // agar na hoye to error log karo aur connect ka btn hi rehne do
  const [connected, setConnected] = useState(false)
  const [accounts, setAccounts] = useState(null)
  const [ethBalance, setEthBalance] = useState(null)
  const [currentAccount, setCurrentAccount] = useState(null)

  // CONNECT BUTTON
  async function handleConnect() {
    if (window.ethereum !== undefined) {
      console.log("Metamask Detected.")
      try {
        const _accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        })
        setConnected(true)
        accountHandler(_accounts)
        await getBalance(_accounts[0])
      } catch (error) {
        console.log(error)
        setConnected(false)
      }
    } else {
      console.log("Metamask not detected. Please install")
    }
  }

  // DISCONNECT BUTTON
  async function disconnectMetamask() {
    setConnected(false)
    setAccounts(null)
    setEthBalance(null)
  }

  // GET BALANCE OF CURRENT ADDRESS
  async function getBalance(acc) {
    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [acc, "latest"],
    })
    const balanceInEth = ethers.utils.formatEther(balance)
    setEthBalance(balanceInEth)
  }

  // LISTEN FOR EVENTS
  window.ethereum.on("chainChanged", chainHandler)
  window.ethereum.on("accountsChanged", accountHandler)

  // CHAIN HANDLING
  function chainHandler() {
    window.location.reload()
  }

  // ACCOUNT HANDLING
  function accountHandler(acc) {
    setAccounts(acc)
    setCurrentAccount(acc[0])
    getBalance(acc[0])
  }

  return (
    <main>
      {connected && (
        <div>
          <button className="logout-btn" onClick={disconnectMetamask}>
            Disconnect
          </button>
          <p className="para">The balance is : {ethBalance} ETH</p>
          <p className="para">Connected to account : {currentAccount}</p>
          <PersonData />
          <fieldset className="form-data">
            <legend>FUND THE CONTRACT</legend>
            <Send balance={()=>getBalance(currentAccount)}/>
            <Withdraw balance={()=>getBalance(currentAccount)}/>
          </fieldset>
        </div>
      )}
      {!connected && (
        <button className="login-btn" onClick={handleConnect}>
          Conn
        </button>
      )}
    </main>
  )
}
