import QuiscoContext from "/context/QuiscoProvider";

import { useContext } from "react";

const useQuisco=()=>{
    return useContext(QuiscoContext);
}
export default useQuisco;