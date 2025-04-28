const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <div style="text-align:center;margin-top:20%;">
      <h1 style="color:#0f0;">GREENHACKER V8 BOT</h1>
      <p style="color:#fff;">Bot is running successfully on Render!</p>
      <p>Owner: <b>+255619429851</b></p>
    </div>
  `);
});

app.listen(port, () => {
  console.log(`Bot running on http://localhost:${port}`);
});
