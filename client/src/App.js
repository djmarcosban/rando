import React, { useEffect } from "react"
import { getEspecificParam } from "./util/getparams"
import GridItem from "./util/griditem"
import "./App.css"
import { maskify } from "./util/maskify"

export default () => {

  const contador = localStorage.getItem('@oculos-mareye/contador');

  if(contador === null){
    localStorage.setItem('@oculos-mareye/contador', 1)
    console.log('Atualizando...')
    window.location.reload()
    return false
  }

  if(contador == 1){
    console.log('Atualizado!')
    localStorage.removeItem('@oculos-mareye/contador')
  }

  useEffect(() => {

    const oculosParam = getEspecificParam('oculos')
    let oculosParamSplited = ''
  
    if(oculosParam !== null){
      oculosParamSplited = oculosParam.split(",")
    }else{
      oculosParamSplited = ['images/overlay-blue-monster.png']
    }

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