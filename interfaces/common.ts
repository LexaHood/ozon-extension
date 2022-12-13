export interface IPrice {
  actualPrice: number,
  oldPrice?: number,
  ozonCardPrice?: number,
}

export interface IProduct {
  id: string, // smartfon-tecno-camon-19-neo-6-128-gb-chernyy-640971970
  url: string, // https://www.ozon.ru/product/smartfon-tecno-camon-19-neo-6-128-gb-chernyy-640971970/?avtc=1&avte=1&avts=1670959836&oos_search=false&sh=8dMEO1Wxyg'
  price: IPrice,
}
