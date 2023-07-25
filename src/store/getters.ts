
import { RootState } from "./index";
const getters = {
  userInfo:(state:RootState)=>state.user.userInfo
}
export default getters