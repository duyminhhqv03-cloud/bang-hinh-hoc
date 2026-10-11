/* Chỉ có trong bản APK (prepare.js chèn vào www/index.html; bản web/PWA không có file này).
   WebView của Android không xử lý được <a download> với blob:, nên "Lưu bài thành file" và "Xuất ảnh"
   sẽ không tạo ra file. Đoạn này bắt các lượt tải đó, ghi file vào bộ nhớ tạm của app rồi mở bảng
   chia sẻ của Android để chọn nơi lưu (Drive, My Files, Quick Share sang máy Mac...). */
(function () {
  var C = window.Capacitor;
  if (!C || !C.isNativePlatform || !C.isNativePlatform()) return;
  var P = C.Plugins || {};
  if (!P.Filesystem || !P.Share) return;

  function toBase64(blob) {
    return new Promise(function (ok, fail) {
      var r = new FileReader();
      r.onload = function () { var s = String(r.result); ok(s.slice(s.indexOf(',') + 1)); };
      r.onerror = fail;
      r.readAsDataURL(blob);
    });
  }

  async function shareDownload(href, filename) {
    try {
      var blob = await (await fetch(href)).blob();
      var data = await toBase64(blob);
      var res = await P.Filesystem.writeFile({ path: filename, data: data, directory: 'CACHE' });
      await P.Share.share({ title: filename, files: [res.uri], dialogTitle: 'Lưu hoặc gửi file' });
    } catch (e) {
      var msg = String((e && e.message) || e || '');
      if (!/cancel|hủy/i.test(msg)) alert('Không lưu được file: ' + msg);
    }
  }

  var origClick = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = function () {
    var href = this.href || '';
    if (this.hasAttribute('download') && (href.indexOf('blob:') === 0 || href.indexOf('data:') === 0)) {
      shareDownload(href, this.getAttribute('download') || 'file');
      return;
    }
    return origClick.apply(this, arguments);
  };
})();
