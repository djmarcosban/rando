import React, { Component }  from 'react';
import { getEspecificParam } from "./getparams";

class GridItem extends Component {
  renderRow(row) {

    let modeloParam = 'images/maria.jpg'

    if(getEspecificParam('modelo') !== null){
      modeloParam = getEspecificParam('modelo')
    }

    return (
      <div key={row} className="grid-item">
        <img
          src={modeloParam}
          alt=""
          style={{maxWidth:100+'%', width:380+'px'}}
        />
      </div>
    )
  }

  render() {
    let rows = []

    const oculosParam = getEspecificParam('oculos')
    let oculosParamSplited = ''
    let oculosParamLength = '1'

    if(oculosParam !== null){
      oculosParamSplited = oculosParam.split(",")
      oculosParamLength = oculosParamSplited.length
    }

    for (let i = 0; i < oculosParamLength; i++) {
    //for (let i = 0; i < 3; i++) {
      rows.push(i)
    }

    return (
      <div>
        {rows.map(this.renderRow)}
      </div>
    )
  }
}

export default GridItem;