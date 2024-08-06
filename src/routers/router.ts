import Route, { IRoute } from "@routers/route";

export default class Router {
  #routes: Route[] = [];

  get(url: IRoute["url"], cb: IRoute["cb"]) {
    this.#routes.push(new Route(url, "GET", cb));
  }

  post(url: IRoute["url"], cb: IRoute["cb"]) {
    this.#routes.push(new Route(url, "POST", cb));
  }

  findRoute(url?: string, method?: string) {
    return this.#routes.find((route) => route.url === url && route.method === method);
  }
}
