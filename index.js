/** 
  My problem here is the output:
    <h1>General settings</h1><!-- {.large-heading} -->
  instead of 
    <h1 class="large-heading">General settings</h1>

  Full output that I receive:

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <h1>General settings</h1><!-- {.large-heading} -->
    <p>The configuration</p>
  </body>
</html>
*/

const { readFileSync } = require('fs');
const assert = require('assert');
const report = require('vfile-reporter');

const unified = require('unified');
const stream = require('unified-stream');
const markdown = require('remark-parse');
const remark2rehype = require('remark-rehype');
const raw = require('rehype-raw');
const doc = require('rehype-document');
const format = require('rehype-format');
const html = require('rehype-stringify');

// none of those plugins work:
// const highlight = require('rehype-highlight');
const decorate = require('rehype-decorate');
const section = require('@agentofuser/rehype-section');

const mdContent = readFileSync('settings.md');
// const mdContent = `# General settings

// <!-- {.large-heading} -->

// ## Another header
// <!-- {.medium-heading} -->

// The configuration
// `;

unified()
  .use(markdown)
  .use(remark2rehype, {allowDangerousHTML: true})
  .use(raw)
  .use(doc)
  .use(decorate)
  // .use(highlight)
  // .use(section)
  .use(format)
  .use(html)
  .process(String(mdContent), function (err, file) {
    if (err) {
      console.error('ERR', report(err || file));
    }
    console.log(String(file))
  });
