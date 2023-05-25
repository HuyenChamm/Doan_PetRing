import axios from "axios"

export default async function apiGeneral({url, method = 'GET',params}){
  try {
    const dir = 'http://localhost:4000'
    const res = await axios({
      method,
      url: `${dir}${url}`,
      params
    })
   
    return res.data
    } catch (error) {
      console.log(error);
      return {test: "hello"}
    }
}
