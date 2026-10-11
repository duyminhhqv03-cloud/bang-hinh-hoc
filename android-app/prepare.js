// Chuẩn bị mã cho bản APK. GitHub Actions gọi tự động, không cần chạy tay.
//   node prepare.js www      -> chép ../bang-hinh-hoc.html vào www/index.html, chèn apk-bridge.js
//   node prepare.js android  -> thay biểu tượng app, đặt số phiên bản (biến BUILD_NUMBER)
const fs = require('fs'), path = require('path');
const here = __dirname, root = path.join(here, '..');
const mode = process.argv[2];

if (mode === 'www') {
  const www = path.join(here, 'www');
  fs.rmSync(www, {recursive: true, force: true});
  fs.mkdirSync(www, {recursive: true});
  let html = fs.readFileSync(path.join(root, 'bang-hinh-hoc.html'), 'utf8');
  const tag = '<script src="apk-bridge.js"></script>\n';
  if (!html.includes('</head>')) throw new Error('Không thấy </head> trong bang-hinh-hoc.html');
  html = html.replace('</head>', tag + '</head>');
  fs.writeFileSync(path.join(www, 'index.html'), html);
  fs.copyFileSync(path.join(here, 'apk-bridge.js'), path.join(www, 'apk-bridge.js'));
  for (const f of ['manifest.webmanifest', 'icon-192.png', 'icon-512.png'])
    if (fs.existsSync(path.join(root, f))) fs.copyFileSync(path.join(root, f), path.join(www, f));
  console.log('Đã chuẩn bị www/index.html');
} else if (mode === 'android') {
  const res = path.join(here, 'android', 'app', 'src', 'main', 'res');
  fs.cpSync(path.join(here, 'res-icon'), res, {recursive: true});
  const gradle = path.join(here, 'android', 'app', 'build.gradle');
  const n = parseInt(process.env.BUILD_NUMBER || '1', 10);
  let g = fs.readFileSync(gradle, 'utf8');
  if (!/versionCode \d+/.test(g)) throw new Error('Không thấy versionCode trong build.gradle');
  g = g.replace(/versionCode \d+/, 'versionCode ' + n).replace(/versionName "[^"]*"/, 'versionName "1.' + n + '"');
  fs.writeFileSync(gradle, g);
  console.log('Đã đặt biểu tượng và phiên bản 1.' + n);
} else {
  console.error('Dùng: node prepare.js www | android');
  process.exit(1);
}
