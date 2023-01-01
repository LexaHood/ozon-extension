import { IPrice, IProduct } from "../../../interfaces/common";

const product = {} as IProduct;


function parsePrice(priceHtmlElement: Element): IPrice | null {
  const price = {} as IPrice;
  const mainPriceElement: NodeListOf<Element> = priceHtmlElement.querySelectorAll("div>span");
  // const ozonCardPriceElement: Element | null = priceHtmlElement.querySelector("[data-widget='webOzonAccountPrice']")

  if (mainPriceElement.length >= 1 && mainPriceElement[0].textContent !== null) {
    price.actual_price = parseInt(mainPriceElement[0].textContent.replace(/\s+/g, ""));
  } else {
    return null;
  }
  if (mainPriceElement.length >= 2 && mainPriceElement[1].textContent !== null) {
    price.old_price = parseInt(mainPriceElement[1].textContent.replace(/\s+/g, ""));
  }

  // if (ozonCardPriceElement !== null && ozonCardPriceElement.textContent !== null) {
  //   price.ozonCardPrice = parseInt(ozonCardPriceElement.textContent.replace(/\s+/g, ""));
  // }

  return price;
}

function parseUrl(htmlElement: Element): string {
  return htmlElement.baseURI;
}

function parseId(htmlelement: Element): string {
  return htmlelement.baseURI.split('/')[4];
}

(() => {
  const observer: MutationObserver = new MutationObserver(async () => {
    const priceElement: Element | null | undefined = document.querySelector("[data-widget='webPrice']")?.firstElementChild;

    if (priceElement) {
      observer.disconnect();
      const price: IPrice | null = parsePrice(priceElement);

      if (price) {
        product.system_id = parseId(priceElement);
        product.url = parseUrl(priceElement);
        product.price = price;
        product.data_timestamp = Date.now();
      }

      console.log('priceWidget', product);
      await chrome.runtime.sendMessage({ priceWidget: product });
    }
  })
  observer.observe(document.body, { childList: true, subtree: true });
})();

export default product;