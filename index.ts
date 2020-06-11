

function oracleObject(result: any, fn?: Function, options?: any): Array<object> {
  const { metaData, rows: rowsData } = result
  const rows: any = []
  rowsData.map((rowData: any) => {
    let row = {}
    rowData.map((item: any, index: number) => {
      const column = metaData[index].name
      if(item || options?.allowNull) Object.assign(row, { [fn ? fn(column) : column]: item })
    });
    rows.push(row)
  })
  return rows
}

export default oracleObject
