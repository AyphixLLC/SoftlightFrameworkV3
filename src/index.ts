import { AccessTokens } from "./entity/AccessTokens";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { InitRegistry } from "./registry";

var Koa = require("koa");
var app = new Koa();
var Router = require("koa-router");
var router = new Router();
const cors = require("@koa/cors");
var bodyParser = require("koa-parser");

app.use(bodyParser());
app.use(cors());

app.use(async (ctx, next) => {
  if (ctx.header.authorization) {
    var token = await AccessTokens.findOne({
      authcode: ctx.header.authorization.split(" ")[1] as string
    });

    if (token && token.authcode == ctx.header.authorization.split(" ")[1]) {
      await next();
    } else {
      ctx.throw(401);
    }
  } else {
    ctx.throw(401);
  }
});

InitRegistry(router);

import "./router";

(async () => {
  await createConnection();
  var port = process.env.PORT || 5409;

  app.use(router.routes());

  app.listen(port);
})();
