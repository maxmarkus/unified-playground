/*
My problem here is the output, assertion is failing.
Full output:
  <h1>hello world</h1>
instead of 
  <h1 class="heading">hello world</h1>
*/

const assert = require('assert');
const report = require('vfile-reporter');

const unified = require('unified');
const stream = require('unified-stream');
const markdown = require('remark-parse');
const remark2rehype = require('remark-rehype');
const html = require('rehype-stringify');

// none of those plugins work:
const decorate = require('rehype-decorate');

// Hello world example
let processor = unified()
  .use(markdown)
  .use(remark2rehype)
  .use(decorate)
  .use(html);

processor.process('# hello world\n\n<!-- {.heading} -->', function (err, file) {
    if (err) {
      console.error('ERR', report(err || file));
    }
    console.log('Hello world example:', '\n');
    console.log(String(file), '\n')

    assert.equal(String(file), '<h1 class="heading">hello world</h1>');
  });