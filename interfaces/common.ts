export interface IPrice {
  actual_price: number,
  old_price?: number,
  ozon_card_price?: number,
}

export interface IProduct {
  system_id: string, // smartfon-tecno-camon-19-neo-6-128-gb-chernyy-640971970
  url: string, // https://www.ozon.ru/product/smartfon-tecno-camon-19-neo-6-128-gb-chernyy-640971970/?avtc=1&avte=1&avts=1670959836&oos_search=false&sh=8dMEO1Wxyg'
  price: IPrice,
  data_timestamp: number,
}

export interface IProduct_db {
  id: number,
  system_id: string,
  url: string,
}

export interface IPrice_db {
  product_id: number,
  date: Date,
  price: number,
  price_ozon?: number,
}

export interface IPriceList_db {
  date: Date,
  price: number,
}