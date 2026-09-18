# gizemkeskin.com

Statik site, build adımı yok. Klasörü olduğu gibi yayınlaman yeterli.

```
index.html                 ana sayfa (hizmetler, işler, süreç, özgeçmiş, hakkımda, iletişim)
blog/index.html            yazı listesi
blog/<slug>.html           yazılar (TR + EN aynı dosyada)
playground/index.html      playground girişi
playground/bench.html      görüntü işleme tezgâhı (6 adımlı hat)
playground/optics.html     kamera ve lens hesaplayıcı
playground/lighting.html   ışık açısı simülasyonu
playground/tradeoff.html   eşik, yanlış red ve maliyet
playground/conv.html       evrişim çekirdeği
playground/nn.html         sinir ağı oyun alanı
playground/digits.html     rakam tanıma (ağırlıklar sayfaya gömülü, scikit-learn ile eğitildi)
playground/tracking.html   nesne takibi simülasyonu
playground/anomaly.html    sensör verisinde anomali
(hepsi saf JavaScript; kütüphane, sunucu ve kamera yok)
assets/site.css, site.js   ortak stil ve davranış (dil değiştirme, tespit kutusu)
assets/work/*.jpg          proje görselleri (Elanus portfolyosundan)
assets/photo.jpg           AgentCon sahne fotoğrafı
assets/og.png              LinkedIn / WhatsApp paylaşım kartı (1200×630)
```

## Yerelde bakmak

```powershell
cd site
python -m http.server 8080
```

Tarayıcıda `http://localhost:8080`.

## Yayın

Şu an GitHub Pages'te: repo `GizemKskn/gizemkskn.github.io`, canlı adres https://gizemkskn.github.io.
Her `git push` bir dakika içinde canlıya geçer.

```powershell
cd site
git add -A
git commit -m "..."
git push
```

## Alan adını bağlamak (gizemkeskin.com, Natro)

Natro DNS yönetiminde şu kayıtları ekle:

| Tür   | Ad  | Değer               |
|-------|-----|---------------------|
| A     | @   | 185.199.108.153     |
| A     | @   | 185.199.109.153     |
| A     | @   | 185.199.110.153     |
| A     | @   | 185.199.111.153     |
| CNAME | www | gizemkskn.github.io |

Sonra repoya `CNAME` dosyası (içeriği `www.gizemkeskin.com`) eklenir ve GitHub ayarlarında HTTPS zorlanır.
DNS yayılmadan CNAME dosyasını ekleme; github.io adresi bozulur.

## Düzenleme notları

- Her metin iki dilde yan yana durur: `<p lang="tr">…</p><p lang="en">…</p>`. Birini değiştirince diğerini de değiştir.
- Yeni proje: `index.html` içindeki `#work` listesinden bir `<li>` kopyala. Görsel için `assets/work/` klasörüne 1200 px genişlikte JPEG koy.
- Yeni yazı: `blog/` içindeki bir yazıyı kopyala, `blog/index.html` listesine ekle.
- Renkler ve yazı tipleri `assets/site.css` başındaki `:root` değişkenlerinde.
- Fare bir bölümün üstüne gelince çıkan tespit kutusu, `data-det="isim"` ve `data-conf="0.97"` özniteliklerinden okur.
