import Route from "@routers/route";

export default class Router {
  #routes: Route[] = [];

  add(...route: ConstructorParameters<typeof Route>) {
    this.#routes.push(new Route(route[0], route[1]));
  }

  findRoute(url: string | undefined) {
    return this.#routes.find((route) => route.url === url);
  }
}
