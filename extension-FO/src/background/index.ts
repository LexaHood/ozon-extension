import { IProduct } from "../../../interfaces/common";

chrome.runtime.onMessage.addListener(
  (request) => {
    const priceWidget: IProduct = request.priceWidget
    // Этот console.log можно увидеть, если открыть 
    // окно расширений chrome://extensions/ в хроме и на 
    // нашем расширении нажать на "service worker"
    console.log(priceWidget)
    return true;
  }
);

export { }