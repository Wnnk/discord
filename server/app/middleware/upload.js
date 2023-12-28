const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');


module.exports = () => {
  return async function upLoad(ctx, next) {
    const stream = await ctx.getFileStream();
    const filename = new Date().getTime() + path.extname(stream.filename).toLowerCase();
    const target = path.join('app/public/guildChat', filename);
    // 写入文件
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);
    stream.fields.filename = filename;
    ctx.GuildUpload = stream.fields;
    await next();
  };
};
