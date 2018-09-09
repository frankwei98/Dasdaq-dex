// Mainly do something without Scatter and Eosjs
// Suitable for User who can't use Eosjs for various reason
import axios from "axios";
// Thank god there is something like SSoT
import { network } from "./index";
const { protocol, host, port } = network
const rpcApi = `${protocol}://${host}:${port}/v1`
// Mainly used Nodeos RPC API
// Doc Reference: https://developers.eos.io/eosio-nodeos/reference

export async function getBalance({ code = "eosio.token", account, symbol = 'EOS' }) {
    // Doc: https://developers.eos.io/eosio-nodeos/reference#get_currency_balance
    const getCurrencyBalanceApi = `${rpcApi}/chain/get_currency_balance`
    const { data } = await axios({
        method: 'POST',
        data: {
            code,
            account,
            symbol
        },
        url: getCurrencyBalanceApi,
        withCredentials: false
    })
    return data[0] // EOS Asset `amount symbol`
}