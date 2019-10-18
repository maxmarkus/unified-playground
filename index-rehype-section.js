/*
Output is wrong here, I receive no sectioned html, but the input:
<h1>h1</h1>
  <h2>h2a</h2>
    <h3>h3ai</h3>
      <p>text3ai</p>
    <h3>h3aj</h3>
      <p>text3aj</p>
  <h2>h2b</h2>
    <h3>h3bi</h3>
      <h4>h4bix</h4>
        <p>text4bix</p>
  <h2>h2c</h2>
    <h3>h3ci</h3>
      <p>text3ci</p>
*/

var rehype = require('rehype')
var section = require('@agentofuser/rehype-section')

const content = `<h1>h1</h1>
  <h2>h2a</h2>
    <h3>h3ai</h3>
      <p>text3ai</p>
    <h3>h3aj</h3>
      <p>text3aj</p>
  <h2>h2b</h2>
    <h3>h3bi</h3>
      <h4>h4bix</h4>
        <p>text4bix</p>
  <h2>h2c</h2>
    <h3>h3ci</h3>
      <p>text3ci</p>
`;

rehype()
  .data('settings', { fragment: true })
  .use(section)
  .process(content, function(err, file) {
    if (err) throw err
    console.log(String(file))
  })