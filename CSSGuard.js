(function(window) {
    'use strict';

    //  DYNAMIC OBFUSCATION SETTINGS BASED ON FILE SIZE
    function getDynamicObfuscationSettings(codeLength) {
        const randomSeed = Math.floor(Math.random() * 999999);
        const sizeInKB = codeLength / 1024;
        
        // 0-100 KB: MAXIMUM security
        if (sizeInKB <= 100) {
            return {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 1.0,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 0.4,
                debugProtection: true,
                debugProtectionInterval: 4000,
                disableConsoleOutput: true,
                identifierNamesGenerator: 'hexadecimal',
                identifiersPrefix: '',
                ignoreRequireImports: false,
                log: false,
                numbersToExpressions: true,
                renameGlobals: false,
                rotateStringArray: true,
                seed: randomSeed,
                selfDefending: true,
                simplify: true,
                splitStrings: true,
                splitStringsChunkLength: 5,
                stringArray: true,
                stringArrayCallsTransform: true,
                stringArrayCallsTransformThreshold: 0.9,
                stringArrayEncoding: ['base64', 'rc4'],
                stringArrayIndexShift: true,
                stringArrayRotate: true,
                stringArrayShuffle: true,
                stringArrayWrappersCount: 1,
                stringArrayWrappersChainedCalls: true,
                stringArrayWrappersParametersMaxCount: 2,
                stringArrayWrappersType: 'variable',
                stringArrayThreshold: 1.0,
                target: 'browser',
                transformObjectKeys: true,
                unicodeEscapeSequence: true
            };
        }

        // 100-400 KB: HIGH security
        if (sizeInKB > 100 && sizeInKB <= 400) {
            return {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 0.85,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 0.3,
                debugProtection: true,
                debugProtectionInterval: false,
                disableConsoleOutput: true,
                identifierNamesGenerator: 'hexadecimal',
                identifiersPrefix: '',
                ignoreRequireImports: false,
                log: false,
                numbersToExpressions: false,
                renameGlobals: false,
                rotateStringArray: true,
                seed: randomSeed,
                selfDefending: true,
                simplify: true,
                splitStrings: true,
                splitStringsChunkLength: 7,
                stringArray: true,
                stringArrayCallsTransform: true,
                stringArrayCallsTransformThreshold: 0.8,
                stringArrayEncoding: ['base64', 'rc4'],
                stringArrayIndexShift: true,
                stringArrayRotate: true,
                stringArrayShuffle: true,
                stringArrayWrappersCount: 1,
                stringArrayWrappersChainedCalls: true,
                stringArrayWrappersParametersMaxCount: 2,
                stringArrayWrappersType: 'variable',
                stringArrayThreshold: 0.9,
                target: 'browser',
                transformObjectKeys: true,
                unicodeEscapeSequence: true
            };
        }

        // 400-800 KB: STRONG security
        if (sizeInKB > 400 && sizeInKB <= 800) {
            return {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 0.7,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 0.25,
                debugProtection: true,
                debugProtectionInterval: false,
                disableConsoleOutput: true,
                identifierNamesGenerator: 'hexadecimal',
                identifiersPrefix: '',
                ignoreRequireImports: false,
                log: false,
                numbersToExpressions: false,
                renameGlobals: false,
                rotateStringArray: true,
                seed: randomSeed,
                selfDefending: true,
                simplify: true,
                splitStrings: true,
                splitStringsChunkLength: 10,
                stringArray: true,
                stringArrayCallsTransform: true,
                stringArrayCallsTransformThreshold: 0.7,
                stringArrayEncoding: ['base64', 'rc4'],
                stringArrayIndexShift: true,
                stringArrayRotate: true,
                stringArrayShuffle: true,
                stringArrayWrappersCount: 1,
                stringArrayWrappersChainedCalls: false,
                stringArrayWrappersParametersMaxCount: 2,
                stringArrayWrappersType: 'variable',
                stringArrayThreshold: 0.8,
                target: 'browser',
                transformObjectKeys: true,
                unicodeEscapeSequence: false
            };
        }

        // 800KB-1.1MB: MODERATE security (optimized for large files)
        if (sizeInKB > 800 && sizeInKB <= 1126) {
            return {
                compact: true,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 0.5,
                deadCodeInjection: true,
                deadCodeInjectionThreshold: 0.15,
                debugProtection: false,
                debugProtectionInterval: false,
                disableConsoleOutput: true,
                identifierNamesGenerator: 'hexadecimal',
                identifiersPrefix: '',
                ignoreRequireImports: false,
                log: false,
                numbersToExpressions: false,
                renameGlobals: false,
                rotateStringArray: true,
                seed: randomSeed,
                selfDefending: false,
                simplify: true,
                splitStrings: true,
                splitStringsChunkLength: 12,
                stringArray: true,
                stringArrayCallsTransform: false,
                stringArrayCallsTransformThreshold: 0.6,
                stringArrayEncoding: ['base64', 'rc4'],
                stringArrayIndexShift: true,
                stringArrayRotate: true,
                stringArrayShuffle: true,
                stringArrayWrappersCount: 1,
                stringArrayWrappersChainedCalls: false,
                stringArrayWrappersParametersMaxCount: 2,
                stringArrayWrappersType: 'variable',
                stringArrayThreshold: 0.7,
                target: 'browser',
                transformObjectKeys: false,
                unicodeEscapeSequence: false
            };
        }

        // > 1.1MB: LIGHTWEIGHT security (minimal obfuscation)
        return {
            compact: true,
            controlFlowFlattening: false,
            deadCodeInjection: false,
            debugProtection: false,
            debugProtectionInterval: false,
            disableConsoleOutput: true,
            identifierNamesGenerator: 'hexadecimal',
            identifiersPrefix: '',
            ignoreRequireImports: false,
            log: false,
            numbersToExpressions: false,
            renameGlobals: false,
            rotateStringArray: true,
            seed: randomSeed,
            selfDefending: false,
            simplify: true,
            splitStrings: false,
            stringArray: true,
            stringArrayCallsTransform: false,
            stringArrayEncoding: ['base64'],
            stringArrayThreshold: 0.5,
            target: 'browser',
            transformObjectKeys: false,
            unicodeEscapeSequence: false
        };
    }

    // Track if obfuscator is loaded
    let obfuscatorLoaded = false;
    let obfuscatorLoading = false;
    const loadQueue = [];

    // Extract clean domain from any URL format
    function extractDomain(input) {
        if (!input || typeof input !== 'string') return '';
        
        let domain = input.trim().toLowerCase();
        domain = domain.replace(/^https?:\/\//, '');
        domain = domain.replace(/^www\./, '');
        domain = domain.split('/')[0];
        domain = domain.split(':')[0];
        domain = domain.split('?')[0];
        domain = domain.split('#')[0];
        
        return domain;
    }

    // Load JavaScriptObfuscator dynamically
    function loadObfuscator() {
        return new Promise(function(resolve, reject) {
            if (typeof window.JavaScriptObfuscator !== 'undefined') {
                obfuscatorLoaded = true;
                return resolve();
            }

            if (obfuscatorLoading) {
                loadQueue.push({ resolve: resolve, reject: reject });
                return;
            }

            obfuscatorLoading = true;

            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/javascript-obfuscator@4.1.0/dist/index.browser.js';
            script.async = true;

            script.onload = function() {
                obfuscatorLoaded = true;
                obfuscatorLoading = false;
                
                setTimeout(function() {
                    if (typeof window.JavaScriptObfuscator !== 'undefined') {
                        console.log('✔ JavaScriptObfuscator loaded and ready');
                        resolve();
                        
                        loadQueue.forEach(function(item) {
                            item.resolve();
                        });
                        loadQueue.length = 0;
                    } else {
                        console.error('✗ JavaScriptObfuscator script loaded but not available in window');
                        const error = new Error('JavaScriptObfuscator loaded but not available');
                        reject(error);
                        loadQueue.forEach(function(item) {
                            item.reject(error);
                        });
                        loadQueue.length = 0;
                    }
                }, 200);
            };

            script.onerror = function() {
                obfuscatorLoading = false;
                const error = new Error('Failed to load JavaScriptObfuscator library from CDN');
                reject(error);
                
                loadQueue.forEach(function(item) {
                    item.reject(error);
                });
                loadQueue.length = 0;
            };

            (document.head || document.documentElement).appendChild(script);
        });
    }

    //  random string generation with crypto API
    function randomStr(len) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const arr = new Uint8Array(len);
        crypto.getRandomValues(arr);
        let result = '';
        for (let i = 0; i < len; i++) {
            result += chars[arr[i] % chars.length];
        }
        return result + Date.now().toString(36).slice(-6);
    }

    // ZERO-MODIFICATION CSS PARSER
    function zeroModificationParser(css) {
        const preserved = {
            charset: [],
            imports: []
        };

        // Extract @charset (must be first line in CSS)
        css = css.replace(/(@charset\s+[^;]+;)/gi, (match) => {
            preserved.charset.push(match.trim());
            return '';
        });

        // Extract @import (must be near top, before other rules)
        css = css.replace(/(@import\s+(?:url\([^)]+\)|["'][^"']+["'])[^;]*;)/gi, (match) => {
            preserved.imports.push(match.trim());
            return '';
        });

        return {
            css: css.trim(),
            charset: preserved.charset,
            imports: preserved.imports
        };
    }

    // 2-layer XOR encryption
    function fastEncrypt(text) {
        const k1 = randomStr(24);
        const k2 = randomStr(20);
        
        const tLen = text.length;
        const k1Len = k1.length;
        const k2Len = k2.length;
        const result = new Array(tLen);
        
        for (let i = 0; i < tLen; i++) {
            result[i] = String.fromCharCode(text.charCodeAt(i) ^ k1.charCodeAt(i % k1Len) ^ k2.charCodeAt(i % k2Len));
        }
        
        let enc = btoa(unescape(encodeURIComponent(result.join('')))).split('').reverse().join('');
        enc = btoa(enc);
        
        return enc + '§§' + btoa(k1) + '§' + btoa(k2);
    }

    // MAIN PROTECTION SCRIPT GENERATOR
    function createProtectionScript(cssText, options) {
        const parsed = zeroModificationParser(cssText);
        const encrypted = fastEncrypt(parsed.css);
        
        // Generate unique variable names
        const v = {
            d: '_' + randomStr(8),
            f: '_' + randomStr(7),
            x: '_' + randomStr(6),
            i: '_' + randomStr(7),
            n: '_' + randomStr(6),
            l: '_' + randomStr(5),
            ext: '_e' + randomStr(6),
            dmc: '_c' + randomStr(6),
            dml: '_l' + randomStr(6)
        };
        
        const code = [];
        
        code.push('!function(){');
        code.push('"use strict";');
        
        // Charset handling
        if (parsed.charset.length > 0) {
            code.push(`const ${v.l}=${JSON.stringify(parsed.charset)};`);
            code.push(`${v.l}.forEach(c=>{const s=document.createElement('style');s.textContent=c;document.head.insertBefore(s,document.head.firstChild)});`);
        }
        
        // Imports handling
        if (parsed.imports.length > 0) {
            const impVar = '_' + randomStr(5);
            code.push(`const ${impVar}=${JSON.stringify(parsed.imports)};`);
            code.push(`${impVar}.forEach(imp=>{const s=document.createElement('style');s.textContent=imp;document.head.insertBefore(s,document.head.firstChild)});`);
        }
        
        // Domain lock check
        if (options && options.lockToDomain) {
            const allowedDomains = Array.isArray(options.lockToDomain) ? options.lockToDomain : [options.lockToDomain];
            const encodedDomains = allowedDomains.map(function(d) {
                return btoa(extractDomain(d));
            });
            
            code.push(`function ${v.ext}(d){if(!d)return "";d=d.trim().toLowerCase();d=d.replace(/^https?:\\/\\//,"");d=d.replace(/^www\\./,"");d=d.split("/")[0];d=d.split(":")[0];d=d.split("?")[0];d=d.split("#")[0];return d;}`);
            code.push(`const ${v.dml}=${JSON.stringify(encodedDomains)};`);
            code.push(`function ${v.dmc}(){try{const c=${v.ext}(window.location.hostname);let m=false;for(let i=0;i<${v.dml}.length;i++){try{const a=atob(${v.dml}[i]);if(c===a||c.endsWith("."+a)){m=true;break;}}catch(e){}}if(!m){document.body.innerHTML="<div style=\\"display:flex;align-items:center;justify-content:center;height:100vh;background:#1a1a1a;color:#ff4444;font-family:Arial,sans-serif;font-size:24px;font-weight:bold;text-align:center;padding:20px;\\">⚠️ Domain Lock Active - Unauthorized Domain</div>";throw new Error("Domain verification failed");}}catch(e){document.body.innerHTML="<div style=\\"display:flex;align-items:center;justify-content:center;height:100vh;background:#1a1a1a;color:#ff4444;font-family:Arial,sans-serif;font-size:24px;font-weight:bold;text-align:center;padding:20px;\\">⚠️ Security Check Failed</div>";throw e;}}`);
        }
        
        code.push(`const ${v.d}="${encrypted}";`);
        code.push(`let _=${false};`);
        
        // XOR decrypt
        code.push(`const ${v.x}=(t,k1,k2)=>{const l=t.length,l1=k1.length,l2=k2.length;let r='';for(let i=0;i<l;i++)r+=String.fromCharCode(t.charCodeAt(i)^k1.charCodeAt(i%l1)^k2.charCodeAt(i%l2));return r};`);
        
        // 2-layer decrypt
        code.push(`const ${v.f}=e=>{try{const p=e.split('§§'),k=p[1].split('§'),s=atob(p[0]);return ${v.x}(decodeURIComponent(escape(atob(s.split('').reverse().join('')))),atob(k[0]),atob(k[1]))}catch{return''}};`);
        
        // CSS injection
        code.push(`const ${v.i}=c=>{try{if(typeof CSSStyleSheet!=='undefined'&&document.adoptedStyleSheets){const s=new CSSStyleSheet();s.replaceSync(c);document.adoptedStyleSheets=[...document.adoptedStyleSheets,s];return}else{const s=document.createElement('style');s.appendChild(document.createTextNode(c));document.head.appendChild(s)}}catch{const s=document.createElement('style');s.textContent=c;(document.head||document.documentElement).appendChild(s)}};`);
        
        // Init function
        code.push(`const ${v.n}=()=>{if(_)return;_=1;`);
        
        if (options && options.lockToDomain) {
            code.push(`${v.dmc}();`);
        }
        
        code.push(`const c=${v.f}(${v.d});c&&${v.i}(c)};`);
        code.push(`'loading'===document.readyState?document.addEventListener('DOMContentLoaded',${v.n},!1):${v.n}();`);
        
        // Anti-inspection
        code.push(`try{const d=Object.getOwnPropertyDescriptor(Document.prototype,'styleSheets');Object.defineProperty(document,'styleSheets',{get:()=>Array.from(d.get.call(document)).filter(s=>!document.adoptedStyleSheets.includes(s))})}catch{}`);
        
        // Anti-debug
        code.push(`setInterval(()=>{const t=Date.now();debugger;Date.now()-t>100&&location.reload()},5e3);`);
        
        // DevTools detection
        code.push(`setInterval(()=>{const w=outerWidth-innerWidth>160||outerHeight-innerHeight>160;w?document.body.style.display='none':document.body.style.display==='none'&&(document.body.style.display='')},2e3);`);
        
        // Disable shortcuts
        code.push(`document.addEventListener('contextmenu',e=>e.preventDefault(),!1);`);
        code.push(`document.addEventListener('keydown',e=>{const k=e.keyCode;(123===k||e.ctrlKey&&(e.shiftKey&&[67,73,74].includes(k)||[85,83].includes(k)))&&e.preventDefault()},!1);`);
        
        // Console disable
        code.push(`try{Object.keys(console).forEach(k=>console[k]=()=>{})}catch{}`);
        
        // Anti-copy
        code.push(`['copy','cut'].forEach(t=>document.addEventListener(t,e=>e.preventDefault(),!1));`);
        
        code.push('}();');

        return code.join('');
    }

    // PUBLIC API
    const CSSProtector = {};

    CSSProtector.protect = function(cssCode, options) {
        return new Promise(function(resolve, reject) {
            if (!cssCode || typeof cssCode !== 'string') {
                return reject(new Error('Invalid input: CSS code must be a non-empty string'));
            }

            // Check file size limit
            const sizeInKB = cssCode.length / 1024;
            if (sizeInKB > 1126) {
                console.warn(`⚠️ Warning: CSS file is ${sizeInKB.toFixed(2)} KB (>${1.1} MB). Using lightweight obfuscation.`);
            }

            // Validate domains
            if (options && options.lockToDomain) {
                var domains = Array.isArray(options.lockToDomain) ? options.lockToDomain : [options.lockToDomain];
                for (var i = 0; i < domains.length; i++) {
                    if (typeof domains[i] !== 'string' || domains[i].trim() === '') {
                        return reject(new Error('Invalid domain: All domains must be non-empty strings'));
                    }
                    var cleanDomain = extractDomain(domains[i]);
                    if (!cleanDomain) {
                        return reject(new Error('Invalid domain format: ' + domains[i]));
                    }
                }
            }

            if (typeof JavaScriptObfuscator !== 'undefined') {
                console.log('ℹ️ Using already loaded JavaScriptObfuscator');
                console.log(`📊 CSS Size: ${sizeInKB.toFixed(2)} KB - Applying optimized obfuscation settings`);
                try {
                    var initialProtectedScript = createProtectionScript(cssCode, options);
                    var dynamicSettings = getDynamicObfuscationSettings(initialProtectedScript.length);
                    var finalObfuscationResult = JavaScriptObfuscator.obfuscate(initialProtectedScript, dynamicSettings);
                    resolve(finalObfuscationResult.getObfuscatedCode());
                } catch (error) {
                    reject(error);
                }
                return;
            }

            console.log('ℹ️ Loading JavaScriptObfuscator dynamically...');
            loadObfuscator()
                .then(function() {
                    try {
                        console.log(`📊 CSS Size: ${sizeInKB.toFixed(2)} KB - Applying optimized obfuscation settings`);
                        var initialProtectedScript = createProtectionScript(cssCode, options);
                        var dynamicSettings = getDynamicObfuscationSettings(initialProtectedScript.length);
                        var finalObfuscationResult = JavaScriptObfuscator.obfuscate(initialProtectedScript, dynamicSettings);
                        resolve(finalObfuscationResult.getObfuscatedCode());
                    } catch (error) {
                        reject(error);
                    }
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    };

    // Auto-load obfuscator
    if (typeof window.JavaScriptObfuscator === 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                loadObfuscator().catch(function(err) {
                    console.warn('Failed to preload JavaScriptObfuscator:', err.message);
                });
            });
        } else {
            setTimeout(function() {
                loadObfuscator().catch(function(err) {
                    console.warn('Failed to preload JavaScriptObfuscator:', err.message);
                });
            }, 0);
        }
    }

    // Expose to window
    window.CSSProtector = CSSProtector;

    
    console.log('loaded successfully');
    

})(window);