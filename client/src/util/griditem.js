import React, { Component }  from 'react';
import { getEspecificParam } from "./getparams";

class GridItem extends Component {

  renderRow(row) {

    const modeloParam = getEspecificParam('modelo')

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
    const oculosParamSplited = oculosParam.split(",")

    for (let i = 0; i < oculosParamSplited.length; i++) {
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