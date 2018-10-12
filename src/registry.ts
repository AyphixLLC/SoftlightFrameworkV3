import { Route } from "./route";

const instances: Route = [];

let Router = null;

export function InitRegistry(router) {
  Router = router;
}

export function RegisterRoute(method: string) {
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    var route_name =
      descriptor.value.functionName.toLowerCase() != "index"
        ? descriptor.value.functionName.toLowerCase()
        : "";
    const route =
      "/api/" +
      target.constructor.name.replace(/Controller/, "").toLowerCase() +
      "/" +
      route_name;

    console.log("Registering route: " + route + " (" + method + ")");

    if (method == "post") {
      Router["get"](route, async ctx => {
        ctx.throw(400);
      });

      Router["post"](route, async ctx => {
        var cinstance = new target.constructor();

        var controller = cinstance;
        await controller[descriptor.value.functionName](ctx);
      });
    } else if (method == "get") {
      Router["post"](route, async ctx => {
        ctx.throw(400);
      });

      Router["get"](route, async ctx => {
        var cinstance = new target.constructor();

        var controller = cinstance;
        await controller[descriptor.value.functionName](ctx);
      });
    } else {
      Router["post"](route, async ctx => {
        var cinstance = new target.constructor();

        var controller = cinstance;
        await controller[descriptor.value.functionName](ctx);
      });

      Router["get"](route, async ctx => {
        var cinstance = new target.constructor();

        var controller = cinstance;
        await controller[descriptor.value.functionName](ctx);
      });
    }
  };
}

export function Named(target: any, key: string) {
  target[key].functionName = key;
}
