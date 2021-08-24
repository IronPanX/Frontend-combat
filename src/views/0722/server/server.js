const Koa = require('koa');
const app = new Koa();
const bodyparser = require('koa-bodyparser');
const serve = require('koa-static');


let fs = require('fs');
let process = require('child_process');


app.use(serve(__dirname + "/dist", {extensions: ["html"]}))
app.use(bodyparser());
app.use(async (ctx, next) => {
    let data = ctx.request.body
    if (ctx.path == '/upload') {
        await fs.writeFile('./src/index.js', data.data, (err) => {
            if (err) {
                throw err
            }
        })

        await new Promise((resolve,reject) => {
            process.exec('webpack', (error, stdout, stderr) => {
                if(error) {
                    reject(error)
                } else {
                    resolve(stdout)
                }
            })
        }).then(_ => {
            ctx.body = {
                url: 'http://localhost/node/index'
            }
        }).catch (err => console.log(err))
    }
});
app.listen(8082);
console.log('Server running at http://127.0.0.1:8082/');
