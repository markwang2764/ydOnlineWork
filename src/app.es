import koa from 'koa'
import router from 'koa-simple-router'
import render from 'koa-swig'
import convert from 'koa-convert'//koa1 转换器
import path from 'path'
import serve from 'koa-static'
import co from 'co'
import initController from './controller/initController.js'
import CONFIG from './config/config.js'
import babel_co from 'babel-core/register'
import babel_po from 'babel-polyfill'
const app = new koa()

initController.init(app,router);
app.context.render = co.wrap(render({
  root: CONFIG.get("viewDir"),
  autoescape: true,
  cache: 'memory',
  ext: 'html',
  writeBody: false
}))
app.use(serve(CONFIG.get('staticDir')))
app.listen(CONFIG.get('port'))
export default app
