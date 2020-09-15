import React, { useEffect } from "react"
import { getEspecificParam } from "./util/getparams"
import GridItem from "./util/griditem"
import "./App.css"
import { maskify } from "./util/maskify"

export default () => {
  useEffect(() => {
    const oculosParam = getEspecificParam('oculos')
    const oculosParamSplited = oculosParam.split(",")
    maskify(oculosParamSplited)
  }, [])

  return (
    
    <div>
      <main className="content">
        <div className="grid">
          <GridItem />
        </div>
      </main>
    </div>

  );
}

