# gizemkeskin.com

Tek dosyalık statik site. Build adımı yok; `index.html` ve `assets/` klasörünü olduğu gibi yayınlaman yeterli.

## Yerelde bakmak

```powershell
cd site
python -m http.server 8080
```

Sonra tarayıcıda `http://localhost:8080`.

## Yayınlamak (Cloudflare Pages, ücretsiz)

1. https://dash.cloudflare.com → hesap aç, alan adını (`gizemkeskin.com`) "Add a domain" ile ekle.
2. Cloudflare'in verdiği iki nameserver'ı Natro panelinde (Nics Telekomünikasyon) alan adının NS kayıtlarına yaz.
3. Workers & Pages → Create → Pages → "Upload assets" → `site` klasörünü sürükle-bırak. Proje adı: `gizemkeskin`.
4. Pages projesinde Custom domains → `gizemkeskin.com` ve `www.gizemkeskin.com` ekle.

Alternatif, komut satırından:

```powershell
npx wrangler login
npx wrangler pages deploy site --project-name gizemkeskin
```

## Alternatif: GitHub Pages

`site/` içeriğini `GizemKskn/gizemkskn.github.io` adlı bir repoya push et, Settings → Pages → Custom domain: `gizemkeskin.com`, Natro'da `A` kayıtlarını GitHub'ın IP'lerine yönlendir.

## Düzenlemek

- Her metin Türkçe ve İngilizce olarak yan yana durur: `<p lang="tr">…</p><p lang="en">…</p>`. Birini değiştirdiğinde diğerini de değiştir.
- Yeni proje eklemek için `#work` bölümündeki bir `<li>` bloğunu kopyala.
- Fotoğraf: `assets/photo.jpg` (kare, en az 320×320).
- Renkler ve yazı tipleri `<style>` başındaki `:root` değişkenlerinde.
