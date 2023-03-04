// import * as _kim from './ic-bilesenler/kim.js';
// import * as _denetci from './ic-bilesenler/denetci.js';

//
//
// hata firlatir, akisi keser
//
//
function hataFirlatici(hata = 'Ben aslında yoğum!') {
    //
    throw new Error(`${hata}`);
}
export { hataFirlatici };



//
//
// son durum bulunuyor (durum yoneticisi yardimcisi)
//
//
async function sonDurum(url) {
    // degisen yol bulunuyor, alanadi.com/degisenYol
    const temelYol = document.querySelector('base').getAttribute('href');
    let degisenYol = url.replace(temelYol, '');

    // @YAPILABILIR (daha iyi bir yol bulunabilir)
    // ana sayfa
    if (degisenYol === '') {
        let cikti = {
            sayfa: 'anasayfa',
            url: './',
            yol: './',
            duzenleyiciTuru: 'diger',
        };
        return cikti;
    }
    // hakkinda
    else if (degisenYol === 'hakkinda') {
        let cikti = {
            sayfa: 'hakkinda',
            url: degisenYol,
            yol: degisenYol,
            duzenleyiciTuru: 'diger',
        };
        return cikti;
    }
    // ogrenim gunlugu
    else if (degisenYol === 'ogrenim-gunlugu') {
        let cikti = {
            sayfa: 'ogrenimGunlugu',
            url: degisenYol,
            yol: degisenYol,
            duzenleyiciTuru: 'diger',
        };
        return cikti;
    }
    // beni oku
    else if (degisenYol === 'beni-oku') {
        let cikti = {
            sayfa: 'beniOku',
            url: degisenYol,
            yol: degisenYol,
            duzenleyiciTuru: 'diger',
        };
        return cikti;
    }
    // istatistik
    else if (degisenYol === 'istatistik') {
        let cikti = {
            sayfa: 'istatistik',
            url: degisenYol,
            yol: degisenYol,
            duzenleyiciTuru: 'diger',
        };
        return cikti;
    }
    // yazi
    else if (degisenYol.includes('beni-oku/')) {
        let yol = degisenYol.replace('beni-oku/', '');
        let cikti;

        // yazi var mi?
        let yazi = await fetch(`source/yaba/_yazi?yol=${yol}`);
        yazi = await yazi.json();
        if (yazi.basari === 0) {
            cikti = {
                sayfa: '404',
            };
        } else {
            cikti = {
                sayfa: 'yazi',
                url: degisenYol,
                yol: yol,
                duzenleyiciTuru: 'diger',
                yazi: yazi,
            };
        }

        return cikti;
    }
    // sorular
    else if (degisenYol.includes('sorular') && !degisenYol.includes('/')) {
        // arama degiskenleri
        let yol = new URLSearchParams(window.location.search);
        let aranan = yol.get('aranan');
        let durum = yol.get('durum');
        let koz = yol.get('koz');
        let siralama = yol.get('siralama');
        let yon = yol.get('yon');

        let cikti = {
            sayfa: 'sorular',
            url: degisenYol,
            yol: degisenYol,
            duzenleyiciTuru: 'diger',
            aranan: aranan,
            durum: durum,
            koz: koz,
            siralama: siralama,
            yon: yon,
        };
        return cikti;
    }
    // soru
    else if (degisenYol.includes('sorular/') && !degisenYol.includes('/durum')) {
        let yol = degisenYol.replace('sorular/', '');
        let cikti;
        // soru var mi?
        let soru = await fetch(`source/yaba/_soru?yol=${yol}`);
        soru = await soru.json();
        if (soru.basari === 0) {
            cikti = {
                sayfa: '404',
            };
        } else {
            cikti = {
                sayfa: 'soru',
                url: degisenYol,
                yol: yol,
                duzenleyiciTuru: 'soru',
                soru: soru,
            };
        }
        return cikti;
    }
    // durum
    else if (degisenYol.includes('/durum')) {
        let yol = degisenYol.replace('sorular/', '').replace('/durum', '');
        yol = yol.replace(/\?.*/, '');
        let cikti;
        // soru var mi?
        let soru = await fetch(`source/yaba/_soru?yol=${yol}`);
        soru = await soru.json();
        if (soru.basari === 0) {
            cikti = {
                sayfa: '404',
            };
        } else {
            cikti = {
                sayfa: 'durum',
                url: degisenYol,
                yol: soru.soru[0].baslik_yol,
                duzenleyiciTuru: 'soru',
                soru: soru,
            };
        }
        return cikti;
    }
    // kayit
    else if (degisenYol === 'kayit') {
        let cikti = {
            sayfa: 'kayit',
            url: degisenYol,
            yol: degisenYol,
            duzenleyiciTuru: 'diger',
        };
        return cikti;
    }
    // giris
    else if (degisenYol === 'giris' || degisenYol.includes('giris?')) {
        let cikti = {
            sayfa: 'giris',
            url: degisenYol,
            yol: degisenYol,
            duzenleyiciTuru: 'diger',
        };
        return cikti;
    }
    // cikis
    else if (degisenYol === 'cikis') {
        let cikti = {
            sayfa: 'cikis',
            url: degisenYol,
            yol: degisenYol,
            duzenleyiciTuru: 'diger',
        };
        return cikti;
    }
    // ayarlar
    else if (degisenYol === 'ayarlar') {
        let cikti = {
            sayfa: 'ayarlar',
            url: degisenYol,
            yol: degisenYol,
            duzenleyiciTuru: 'diger',
        };
        return cikti;
    }
    // source kullanimi
    else if (degisenYol.includes('source-kullanimi')) {
        // arama degiskenleri
        let yol = new URLSearchParams(window.location.search);
        let kullanici = yol.get('kullanici');
        let zaman = yol.get('zaman');
        let islem = yol.get('islem');

        let cikti = {
            sayfa: 'source-kullanimi',
            url: degisenYol,
            yol: degisenYol,
            duzenleyiciTuru: 'diger',
            kullanici: kullanici,
            zaman: zaman,
            islem: islem,
        };
        return cikti;
    }
    // kullanici
    else if (degisenYol.includes('k/')) {
        let ozgunYol = degisenYol.split('?');
        ozgunYol = ozgunYol[0];

        // kullanici var mi?
        let parcala = ozgunYol.split('/');
        let ad = parcala[1];
        let adki = parcala[2];
        let cikti;

        // arama degiskenleri
        let yol = new URLSearchParams(window.location.search);
        let dil = yol.get('dil');
        let aranan = yol.get('aranan');
        let siralama = yol.get('siralama');
        let yon = yol.get('yon');

        let kullanici = await fetch(`source/yaba/_kullanici?is=bilgi&ad=${ad}&ad-ki=${adki}&dil=${dil ? dil : ''}&aranan=${aranan ? aranan : ''}&siralama=${siralama ? siralama : ''}&yon=${yon ? yon : ''}`);
        kullanici = await kullanici.json();
        if (kullanici.basari === 0) {
            cikti = {
                sayfa: '404',
            };
        } else {
            cikti = {
                sayfa: 'kullanici',
                url: degisenYol,
                yol: ozgunYol,
                duzenleyiciTuru: 'kullanici',
                ad: ad,
                adki: adki,
                dil: dil,
                aranan: aranan,
                siralama: siralama,
                yon: yon,
                kullanici: kullanici,
            };
        }
        return cikti;
    }
    // iletisim
    else if (degisenYol === 'iletisim') {
        let cikti = {
            sayfa: 'iletisim',
            url: degisenYol,
            yol: degisenYol,
            duzenleyiciTuru: 'diger',
        };
        return cikti;
    }
    // 404
    else {
        let cikti = {
            sayfa: '404',
            url: degisenYol,
            yol: degisenYol,
            duzenleyiciTuru: 'diger',
        };
        return cikti;
    }
}
export { sonDurum };