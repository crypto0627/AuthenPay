if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(a[c])return;let r={};const t=e=>s(e,c),d={module:{uri:c},exports:r,require:t};a[c]=Promise.all(i.map((e=>d[e]||t(e)))).then((e=>(n(...e),r)))}}define(["./workbox-e9849328"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"b335ed57891a3789779075c13e19ce17"},{url:"/_next/static/XpEwPxDUkLH7ixvNyLRus/_buildManifest.js",revision:"d867606c10c7a2c63f5e7ee5a76c9615"},{url:"/_next/static/XpEwPxDUkLH7ixvNyLRus/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1118.923c332cce17bbc0.js",revision:"923c332cce17bbc0"},{url:"/_next/static/chunks/1214.f970616de50eed86.js",revision:"f970616de50eed86"},{url:"/_next/static/chunks/1258.c92c3fe5ed9c249d.js",revision:"c92c3fe5ed9c249d"},{url:"/_next/static/chunks/1295.726c7cd2aa4d3038.js",revision:"726c7cd2aa4d3038"},{url:"/_next/static/chunks/139.519a63cb2c0b6974.js",revision:"519a63cb2c0b6974"},{url:"/_next/static/chunks/1593.7abe81de4facebb7.js",revision:"7abe81de4facebb7"},{url:"/_next/static/chunks/1767.f677c8a97a52f14a.js",revision:"f677c8a97a52f14a"},{url:"/_next/static/chunks/2029.d7758c2d1926d466.js",revision:"d7758c2d1926d466"},{url:"/_next/static/chunks/2060.9c6b143e331c6f2b.js",revision:"9c6b143e331c6f2b"},{url:"/_next/static/chunks/2105.03aadb8fc54ba6cb.js",revision:"03aadb8fc54ba6cb"},{url:"/_next/static/chunks/2283.496eb712bf0e9336.js",revision:"496eb712bf0e9336"},{url:"/_next/static/chunks/2300.91c03fd9552e052e.js",revision:"91c03fd9552e052e"},{url:"/_next/static/chunks/2493.6a822d7a67dac249.js",revision:"6a822d7a67dac249"},{url:"/_next/static/chunks/2678.2f1e0f162b3d8096.js",revision:"2f1e0f162b3d8096"},{url:"/_next/static/chunks/2847.1f61ee2669db92bc.js",revision:"1f61ee2669db92bc"},{url:"/_next/static/chunks/3466.959d6ed645bd0d7e.js",revision:"959d6ed645bd0d7e"},{url:"/_next/static/chunks/3624.04f73eb41231e3b9.js",revision:"04f73eb41231e3b9"},{url:"/_next/static/chunks/3737.4b746adcd3be1cfa.js",revision:"4b746adcd3be1cfa"},{url:"/_next/static/chunks/3753.5cc7725a7cafb56e.js",revision:"5cc7725a7cafb56e"},{url:"/_next/static/chunks/3789.d9d54df9e1222ce3.js",revision:"d9d54df9e1222ce3"},{url:"/_next/static/chunks/3887.8da4af322561d55e.js",revision:"8da4af322561d55e"},{url:"/_next/static/chunks/3993.e4065452ed603a49.js",revision:"e4065452ed603a49"},{url:"/_next/static/chunks/4211.93ce69e4c5ab1ed8.js",revision:"93ce69e4c5ab1ed8"},{url:"/_next/static/chunks/4308.ea72baf6ca280bd3.js",revision:"ea72baf6ca280bd3"},{url:"/_next/static/chunks/4327.92b34bc44408a8c2.js",revision:"92b34bc44408a8c2"},{url:"/_next/static/chunks/435.02a3392313a448a6.js",revision:"02a3392313a448a6"},{url:"/_next/static/chunks/4405.ec63170c7fe278d1.js",revision:"ec63170c7fe278d1"},{url:"/_next/static/chunks/4417.868be3d756146e7c.js",revision:"868be3d756146e7c"},{url:"/_next/static/chunks/4487.68e9b28fb9fc09d1.js",revision:"68e9b28fb9fc09d1"},{url:"/_next/static/chunks/456.a434d8433cc1ebeb.js",revision:"a434d8433cc1ebeb"},{url:"/_next/static/chunks/4563-243d8ffcbc1ea5fc.js",revision:"XpEwPxDUkLH7ixvNyLRus"},{url:"/_next/static/chunks/4704.5ba8082131e704bd.js",revision:"5ba8082131e704bd"},{url:"/_next/static/chunks/4736.7336bcc362c71be3.js",revision:"7336bcc362c71be3"},{url:"/_next/static/chunks/47edcb22-50e4bc0d8e8c2093.js",revision:"XpEwPxDUkLH7ixvNyLRus"},{url:"/_next/static/chunks/4852.6bb98e472a217caf.js",revision:"6bb98e472a217caf"},{url:"/_next/static/chunks/4981.a435f77df0a7781e.js",revision:"a435f77df0a7781e"},{url:"/_next/static/chunks/5102.e9d40fe0b3b40fde.js",revision:"e9d40fe0b3b40fde"},{url:"/_next/static/chunks/5168.2dc484a8c5047e7d.js",revision:"2dc484a8c5047e7d"},{url:"/_next/static/chunks/5224.a2920c5f8e00bb38.js",revision:"a2920c5f8e00bb38"},{url:"/_next/static/chunks/529-544d0b40e6c261f2.js",revision:"XpEwPxDUkLH7ixvNyLRus"},{url:"/_next/static/chunks/53114ffa.ab93e05fc0271283.js",revision:"ab93e05fc0271283"},{url:"/_next/static/chunks/5375.c5bde5bedc2b127e.js",revision:"c5bde5bedc2b127e"},{url:"/_next/static/chunks/5393.a1be287dac8f58ed.js",revision:"a1be287dac8f58ed"},{url:"/_next/static/chunks/5663.0490013caafbea02.js",revision:"0490013caafbea02"},{url:"/_next/static/chunks/5664.5f0089ffd71f256c.js",revision:"5f0089ffd71f256c"},{url:"/_next/static/chunks/5683.afb939cff58377fa.js",revision:"afb939cff58377fa"},{url:"/_next/static/chunks/576.69e6004425abf30f.js",revision:"69e6004425abf30f"},{url:"/_next/static/chunks/5903.56e7fb499ac37b93.js",revision:"56e7fb499ac37b93"},{url:"/_next/static/chunks/5963.e74dfe437624e119.js",revision:"e74dfe437624e119"},{url:"/_next/static/chunks/5983dcbf-646c5596e74bb905.js",revision:"XpEwPxDUkLH7ixvNyLRus"},{url:"/_next/static/chunks/6152.4b70475fcc2078f2.js",revision:"4b70475fcc2078f2"},{url:"/_next/static/chunks/6316.63cdecd772db0cf4.js",revision:"63cdecd772db0cf4"},{url:"/_next/static/chunks/6365.e48fef065b8a23b4.js",revision:"e48fef065b8a23b4"},{url:"/_next/static/chunks/6432.05677c85ec83d640.js",revision:"05677c85ec83d640"},{url:"/_next/static/chunks/6595.f7e9f1aefb660b89.js",revision:"f7e9f1aefb660b89"},{url:"/_next/static/chunks/6692.a93f3b4f6eddc2cf.js",revision:"a93f3b4f6eddc2cf"},{url:"/_next/static/chunks/6752.7471c4c33f1699bd.js",revision:"7471c4c33f1699bd"},{url:"/_next/static/chunks/6835.efaec07c11d13a16.js",revision:"efaec07c11d13a16"},{url:"/_next/static/chunks/6971.f79a169ed5365030.js",revision:"f79a169ed5365030"},{url:"/_next/static/chunks/7058.b2dd290faa315fd5.js",revision:"b2dd290faa315fd5"},{url:"/_next/static/chunks/7173.914e453f8385a189.js",revision:"914e453f8385a189"},{url:"/_next/static/chunks/723.5b754c269d9485e3.js",revision:"5b754c269d9485e3"},{url:"/_next/static/chunks/7375.a1041e10f1e98d5a.js",revision:"a1041e10f1e98d5a"},{url:"/_next/static/chunks/7432.e28b9bc4aeb5ac0f.js",revision:"e28b9bc4aeb5ac0f"},{url:"/_next/static/chunks/7451.050e7e10d841e102.js",revision:"050e7e10d841e102"},{url:"/_next/static/chunks/7484.5bfc34148d8cd561.js",revision:"5bfc34148d8cd561"},{url:"/_next/static/chunks/7620.e36ce5fa56e66799.js",revision:"e36ce5fa56e66799"},{url:"/_next/static/chunks/7646.8a943e6d8902b0bb.js",revision:"8a943e6d8902b0bb"},{url:"/_next/static/chunks/7735.740cae958413a3c2.js",revision:"740cae958413a3c2"},{url:"/_next/static/chunks/7799.1a2654f6719ec359.js",revision:"1a2654f6719ec359"},{url:"/_next/static/chunks/7966.adec911c9f1410a0.js",revision:"adec911c9f1410a0"},{url:"/_next/static/chunks/8143.2133d32c0d30c4ac.js",revision:"2133d32c0d30c4ac"},{url:"/_next/static/chunks/8195.8692f22cb066d73e.js",revision:"8692f22cb066d73e"},{url:"/_next/static/chunks/8532.62c0415795777563.js",revision:"62c0415795777563"},{url:"/_next/static/chunks/8599.285e3aea79be1e4e.js",revision:"285e3aea79be1e4e"},{url:"/_next/static/chunks/8635.6c10b4c05dd87e86.js",revision:"6c10b4c05dd87e86"},{url:"/_next/static/chunks/870.2dfad5ba2dd2a2e2.js",revision:"2dfad5ba2dd2a2e2"},{url:"/_next/static/chunks/8854.117c27cad0447a63.js",revision:"117c27cad0447a63"},{url:"/_next/static/chunks/886.153c7110761d87e5.js",revision:"153c7110761d87e5"},{url:"/_next/static/chunks/9037.6d6389080daaec7f.js",revision:"6d6389080daaec7f"},{url:"/_next/static/chunks/9190.b2689155c3aee3d8.js",revision:"b2689155c3aee3d8"},{url:"/_next/static/chunks/9211.bfb8bb5c0fb10194.js",revision:"bfb8bb5c0fb10194"},{url:"/_next/static/chunks/9299.ef62c34304822665.js",revision:"ef62c34304822665"},{url:"/_next/static/chunks/9323-bdde43f0f9ce8c0a.js",revision:"XpEwPxDUkLH7ixvNyLRus"},{url:"/_next/static/chunks/9361.fa4ca1f761b82ffb.js",revision:"fa4ca1f761b82ffb"},{url:"/_next/static/chunks/9707.92811ea5ede09c82.js",revision:"92811ea5ede09c82"},{url:"/_next/static/chunks/9769.02780ce4ab55a464.js",revision:"02780ce4ab55a464"},{url:"/_next/static/chunks/9864.e417ff899aacb594.js",revision:"e417ff899aacb594"},{url:"/_next/static/chunks/9969.2e09e0555e56fd95.js",revision:"2e09e0555e56fd95"},{url:"/_next/static/chunks/9978.77b0e84ec4c4aab3.js",revision:"77b0e84ec4c4aab3"},{url:"/_next/static/chunks/app/_not-found/page-03208e62a13cf308.js",revision:"XpEwPxDUkLH7ixvNyLRus"},{url:"/_next/static/chunks/app/launch/page-02ae80f237b61731.js",revision:"XpEwPxDUkLH7ixvNyLRus"},{url:"/_next/static/chunks/app/layout-8f4e171c1e45d36e.js",revision:"XpEwPxDUkLH7ixvNyLRus"},{url:"/_next/static/chunks/app/page-27ea70762cc6549e.js",revision:"XpEwPxDUkLH7ixvNyLRus"},{url:"/_next/static/chunks/framework-6fef5ed69b61136d.js",revision:"XpEwPxDUkLH7ixvNyLRus"},{url:"/_next/static/chunks/main-app-91fba425dee81eac.js",revision:"XpEwPxDUkLH7ixvNyLRus"},{url:"/_next/static/chunks/main-da692b9bbb556ac2.js",revision:"XpEwPxDUkLH7ixvNyLRus"},{url:"/_next/static/chunks/pages/_app-9dd7db20aaaf49b3.js",revision:"XpEwPxDUkLH7ixvNyLRus"},{url:"/_next/static/chunks/pages/_error-956659f0dadac578.js",revision:"XpEwPxDUkLH7ixvNyLRus"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-d16905828659cd60.js",revision:"XpEwPxDUkLH7ixvNyLRus"},{url:"/_next/static/css/4d66f10d7d657e1d.css",revision:"4d66f10d7d657e1d"},{url:"/_next/static/css/71703c092b5580c6.css",revision:"71703c092b5580c6"},{url:"/_next/static/media/569ce4b8f30dc480-s.p.woff2",revision:"ef6cefb32024deac234e82f932a95cbd"},{url:"/_next/static/media/747892c23ea88013-s.woff2",revision:"a0761690ccf4441ace5cec893b82d4ab"},{url:"/_next/static/media/93f479601ee12b01-s.p.woff2",revision:"da83d5f06d825c5ae65b7cca706cb312"},{url:"/_next/static/media/Send.0f66c8ac.svg",revision:"a7cd64afd01b1533808cade73c1e42f8"},{url:"/_next/static/media/Shield.09c69a90.svg",revision:"854457a93e8319cf89a9204280554987"},{url:"/_next/static/media/Star.02698d4f.svg",revision:"3317eeedb628191e24dd7b4c1b45da99"},{url:"/_next/static/media/arrow-up.0975ed47.svg",revision:"fbd265545310ad30e808a4a6e91ce3cc"},{url:"/_next/static/media/ba015fad6dcf6784-s.woff2",revision:"8ea4f719af3312a055caf09f34c89a77"},{url:"/_next/static/media/close.6508ec3b.svg",revision:"9ec8baf2ccf51e3da034a0f0eb6f18a4"},{url:"/_next/static/media/github.0a5985e5.png",revision:"dd5571e4b77271f5bae12c1d19f8443b"},{url:"/_next/static/media/logo.44d08ae6.svg",revision:"fc1bd775eae15a1b7ca1970c6b4450f2"},{url:"/_next/static/media/menu.54e1e449.svg",revision:"6d85dc971e81ac56856d96c46bd66c59"},{url:"/_next/static/media/people01.4825625c.png",revision:"151000ceb2ea9efb49fc1f3b81845d7c"},{url:"/_next/static/media/people02.b3453658.png",revision:"c6e6f0e6d30c0246a2d2a8f5c0735f24"},{url:"/_next/static/media/streamer.934e49fe.png",revision:"0d06b5b7efe8238037128c2bf2a325ca"},{url:"/_next/static/media/user-friendly.a20e0e51.svg",revision:"8a93a65384deff4a2da8eb3d7ac8a841"},{url:"/android/android-launchericon-144-144.png",revision:"1fc10a2bacb3bf9ee5be7f91d61160aa"},{url:"/android/android-launchericon-192-192.png",revision:"f945c9af24c15adebe5c9ca1ccaac3d9"},{url:"/android/android-launchericon-48-48.png",revision:"d9b96cf0ef99076511bba50ca121f7fd"},{url:"/android/android-launchericon-512-512.png",revision:"8b7d702367e39c4cc80cc263c2164c5e"},{url:"/android/android-launchericon-72-72.png",revision:"a04ad7c774f44f36d5beabcee3198c25"},{url:"/android/android-launchericon-96-96.png",revision:"9d0151d8868d923e84fc301152091c95"},{url:"/hero.png",revision:"bbdbefeb72bf80e795a840bf8ac01afd"},{url:"/ios/100.png",revision:"58f8625fe04a060663ad57376fa39ed3"},{url:"/ios/1024.png",revision:"38eb9d239a1dae8806d7456134af8843"},{url:"/ios/114.png",revision:"dced52e04a59bced80853fb51163b8c1"},{url:"/ios/120.png",revision:"538376886b8a7841383915d60f6a3192"},{url:"/ios/128.png",revision:"6810dca729e03040c4c1561e6ba4c5fe"},{url:"/ios/144.png",revision:"1fc10a2bacb3bf9ee5be7f91d61160aa"},{url:"/ios/152.png",revision:"c48f14c84bb22796307937816a62ad6d"},{url:"/ios/16.png",revision:"9ffafde02cda1dd7d26f59b40dd6726e"},{url:"/ios/167.png",revision:"17d4875ae738296c860dfb0a51b80f90"},{url:"/ios/180.png",revision:"465d72fcdcff082f6016fc6198e02339"},{url:"/ios/192.png",revision:"f945c9af24c15adebe5c9ca1ccaac3d9"},{url:"/ios/20.png",revision:"8d64f2224d4cb5ae9a96274a5f5b73bd"},{url:"/ios/256.png",revision:"b3d16b570d10b0642b86b957284e63c1"},{url:"/ios/29.png",revision:"1eda66a1cbf04ddfa2e6735e831d7181"},{url:"/ios/32.png",revision:"3f4772a7ffe6a05e026cbb51f07de303"},{url:"/ios/40.png",revision:"99faeb6c4fdbe78da6d36ca9331588f0"},{url:"/ios/50.png",revision:"95c9a0709483971374ab4845633f5efa"},{url:"/ios/512.png",revision:"8b7d702367e39c4cc80cc263c2164c5e"},{url:"/ios/57.png",revision:"a5d6adf472e68782a61dc83cb594a0c2"},{url:"/ios/58.png",revision:"b2364644512bcb2796186af53f42765b"},{url:"/ios/60.png",revision:"04fda9d1e00ff8e2baf4021b17c824aa"},{url:"/ios/64.png",revision:"4192180ae2df0b86b1714eb5150aefe5"},{url:"/ios/72.png",revision:"a04ad7c774f44f36d5beabcee3198c25"},{url:"/ios/76.png",revision:"eac0dd96134ee9e555d3aeb3db282f9a"},{url:"/ios/80.png",revision:"6f0d2ce84965dd56608a9f4e6ec227ab"},{url:"/ios/87.png",revision:"7e87c46fe08a71a4a7f1df3a4216d2bb"},{url:"/logo.png",revision:"f97b57d4991c0e03005da7d5e3f0882b"},{url:"/manifest.json",revision:"667d30e9fe86a09c8a098b6158b9c7d7"},{url:"/windows11/LargeTile.scale-100.png",revision:"8e925b4b94f817c2a85916928ee193fa"},{url:"/windows11/LargeTile.scale-125.png",revision:"cf3add156aee8403cc370aedaf86504d"},{url:"/windows11/LargeTile.scale-150.png",revision:"d0e2aa20789cdc9453bab96a6c441f7c"},{url:"/windows11/LargeTile.scale-200.png",revision:"523374f5d4ee29709177858d0e3ec8de"},{url:"/windows11/LargeTile.scale-400.png",revision:"1aa1589b9f94930dce8d05f88c41e0e4"},{url:"/windows11/SmallTile.scale-100.png",revision:"68b06b756938e7978cce5f58286755fa"},{url:"/windows11/SmallTile.scale-125.png",revision:"2e06a44cec717972e436953c6c4dfec4"},{url:"/windows11/SmallTile.scale-150.png",revision:"d8d6432864ec74c8bd2956be0485819f"},{url:"/windows11/SmallTile.scale-200.png",revision:"8cb5e225fdf9035a49a5004e79770abb"},{url:"/windows11/SmallTile.scale-400.png",revision:"0312d24f1f168e5a54b0933ff8fa74a8"},{url:"/windows11/SplashScreen.scale-100.png",revision:"fe3fe1e25465897ed03deefd604ea698"},{url:"/windows11/SplashScreen.scale-125.png",revision:"5166b0d41685bcf5a0589ba349d7fe90"},{url:"/windows11/SplashScreen.scale-150.png",revision:"3b4e75ca6198deff6982910d8336e5d4"},{url:"/windows11/SplashScreen.scale-200.png",revision:"8baec58184fa241957b93d95bbebc1b1"},{url:"/windows11/SplashScreen.scale-400.png",revision:"2b36a872e838b63fe46b9db4b2391a78"},{url:"/windows11/Square150x150Logo.scale-100.png",revision:"e26db6a312bac1b06e3ceb830318f425"},{url:"/windows11/Square150x150Logo.scale-125.png",revision:"2fdb36cfdff4748067c38162b202a7fd"},{url:"/windows11/Square150x150Logo.scale-150.png",revision:"2497756a590fda2928e2af37c40e62a2"},{url:"/windows11/Square150x150Logo.scale-200.png",revision:"609091abad6c716c8517e592b73dd49d"},{url:"/windows11/Square150x150Logo.scale-400.png",revision:"43ba8a10732bf3f6e518b6dcac525749"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",revision:"4431fded01232d0601a5d60049565449"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",revision:"409e025a5b1c347f7ba546ed442bc43b"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",revision:"c71635ced82ed379e9cafc92039b4889"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",revision:"468e4d14b2d3b75cad73db76bda64f49"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",revision:"244115a56980ee4bdb84724cad0f23a0"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",revision:"c670911f70923260bf166627f5fc0fa3"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",revision:"793272a30d9ea4ad64b5d1cbe831625e"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",revision:"13d3655346996d5fa05aef24dda187a7"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",revision:"b3a11e3e9338ea5c442bc036332bf0a0"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",revision:"a2d7beed889fb0a17de4a82587b38380"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",revision:"0b99c6b95e634a6e8439308fa4377b79"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",revision:"a09c7d54f24a551d65ea0cd8f0cdfd49"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",revision:"c6af48474a7a957aa86dc45a4897e2a6"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",revision:"9b8ecc5a5e09de0e3c375a835936fcbb"},{url:"/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",revision:"ab9164ef70d131f5621c616f7173108e"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",revision:"4431fded01232d0601a5d60049565449"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",revision:"409e025a5b1c347f7ba546ed442bc43b"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",revision:"c71635ced82ed379e9cafc92039b4889"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",revision:"468e4d14b2d3b75cad73db76bda64f49"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",revision:"244115a56980ee4bdb84724cad0f23a0"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",revision:"c670911f70923260bf166627f5fc0fa3"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",revision:"793272a30d9ea4ad64b5d1cbe831625e"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",revision:"13d3655346996d5fa05aef24dda187a7"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",revision:"b3a11e3e9338ea5c442bc036332bf0a0"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",revision:"a2d7beed889fb0a17de4a82587b38380"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",revision:"0b99c6b95e634a6e8439308fa4377b79"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",revision:"a09c7d54f24a551d65ea0cd8f0cdfd49"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",revision:"c6af48474a7a957aa86dc45a4897e2a6"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",revision:"9b8ecc5a5e09de0e3c375a835936fcbb"},{url:"/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",revision:"ab9164ef70d131f5621c616f7173108e"},{url:"/windows11/Square44x44Logo.scale-100.png",revision:"b3a11e3e9338ea5c442bc036332bf0a0"},{url:"/windows11/Square44x44Logo.scale-125.png",revision:"6e659da5a6824f73e60f468d115b0755"},{url:"/windows11/Square44x44Logo.scale-150.png",revision:"e960680dba26b19ed652a7d3b3f05312"},{url:"/windows11/Square44x44Logo.scale-200.png",revision:"b04b62cbb0230cbe9bf19d3dbffe7e0c"},{url:"/windows11/Square44x44Logo.scale-400.png",revision:"e09b5b1da613b4bc4752b3aefff2c336"},{url:"/windows11/Square44x44Logo.targetsize-16.png",revision:"4431fded01232d0601a5d60049565449"},{url:"/windows11/Square44x44Logo.targetsize-20.png",revision:"409e025a5b1c347f7ba546ed442bc43b"},{url:"/windows11/Square44x44Logo.targetsize-24.png",revision:"c71635ced82ed379e9cafc92039b4889"},{url:"/windows11/Square44x44Logo.targetsize-256.png",revision:"468e4d14b2d3b75cad73db76bda64f49"},{url:"/windows11/Square44x44Logo.targetsize-30.png",revision:"244115a56980ee4bdb84724cad0f23a0"},{url:"/windows11/Square44x44Logo.targetsize-32.png",revision:"c670911f70923260bf166627f5fc0fa3"},{url:"/windows11/Square44x44Logo.targetsize-36.png",revision:"793272a30d9ea4ad64b5d1cbe831625e"},{url:"/windows11/Square44x44Logo.targetsize-40.png",revision:"13d3655346996d5fa05aef24dda187a7"},{url:"/windows11/Square44x44Logo.targetsize-44.png",revision:"b3a11e3e9338ea5c442bc036332bf0a0"},{url:"/windows11/Square44x44Logo.targetsize-48.png",revision:"a2d7beed889fb0a17de4a82587b38380"},{url:"/windows11/Square44x44Logo.targetsize-60.png",revision:"0b99c6b95e634a6e8439308fa4377b79"},{url:"/windows11/Square44x44Logo.targetsize-64.png",revision:"a09c7d54f24a551d65ea0cd8f0cdfd49"},{url:"/windows11/Square44x44Logo.targetsize-72.png",revision:"c6af48474a7a957aa86dc45a4897e2a6"},{url:"/windows11/Square44x44Logo.targetsize-80.png",revision:"9b8ecc5a5e09de0e3c375a835936fcbb"},{url:"/windows11/Square44x44Logo.targetsize-96.png",revision:"ab9164ef70d131f5621c616f7173108e"},{url:"/windows11/StoreLogo.scale-100.png",revision:"95c9a0709483971374ab4845633f5efa"},{url:"/windows11/StoreLogo.scale-125.png",revision:"5e5402d70ee1d37e16c02bb85bbff545"},{url:"/windows11/StoreLogo.scale-150.png",revision:"a8288d463e726546b12f9109c0694c7a"},{url:"/windows11/StoreLogo.scale-200.png",revision:"58f8625fe04a060663ad57376fa39ed3"},{url:"/windows11/StoreLogo.scale-400.png",revision:"2b43e8df448d68757e139692f4b16ca3"},{url:"/windows11/Wide310x150Logo.scale-100.png",revision:"de4fba61c92b9758898fc47415a0301e"},{url:"/windows11/Wide310x150Logo.scale-125.png",revision:"d50cf3a2f1f48b6898e5788a0769f353"},{url:"/windows11/Wide310x150Logo.scale-150.png",revision:"41bfd75abec287ced582c8701352a8c7"},{url:"/windows11/Wide310x150Logo.scale-200.png",revision:"fe3fe1e25465897ed03deefd604ea698"},{url:"/windows11/Wide310x150Logo.scale-400.png",revision:"8baec58184fa241957b93d95bbebc1b1"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:i})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
