# 🔒 CSSGuard

A powerful, **semi-open source** JavaScript library that **protects** and **obfuscates** your CSS from theft and inspection.

---

## ✨ Features

- 🔐 **Advanced CSS Encryption** - Multi-layer encryption & encoding
- 🌐 **Domain Lock** - Restrict CSS to specific domains only
- 🛡️ **DevTools Protection** - Blocks F12, Inspect Element, and right-click
- 🚫 **Debugger Detection** - Detects and prevents debugging attempts
- ⚡ **Auto Minification** - Automatically minifies CSS before encryption
- 🎯 **Easy Integration** - Simple API, just one function call
- 📦 **No Dependencies** - Works standalone (dynamically loads obfuscator)

---

## 📦 Installation

Add the library to your HTML file:

```html
<script src="https://cdn.jsdelivr.net/gh/worm0x1/CSSGuard/CSSGuard.js"></script>
```

That's it! The library will automatically load all required dependencies.

---

## 🎮 Live Demo

### Demo 1: No Domain Lock

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Protector - No Domain Lock</title>
    <script src="https://cdn.jsdelivr.net/gh/worm0x1/css-obfuscation/css-protector7.js"></script>
    <style>
        body { font-family: Arial; padding: 20px; background: #f5f5f5; }
        textarea { width: 100%; height: 150px; padding: 10px; margin: 10px 0; font-family: monospace; }
        button { padding: 10px 20px; background: #4CAF50; color: white; border: none; cursor: pointer; }
        button:hover { background: #45a049; }
    </style>
</head>
<body>
    <textarea id="input" placeholder="Enter CSS code...">body { background: #333; color: white; }
.container { max-width: 1200px; margin: 0 auto; }</textarea>
    <button onclick="protect()">Protect CSS</button>
    <textarea id="output" placeholder="Protected code will appear here..." readonly></textarea>

    <script>
        function protect() {
            const css = document.getElementById('input').value;
            CSSProtector.protect(css)
                .then(code => document.getElementById('output').value = code)
                .catch(err => alert('Error: ' + err.message));
        }
    </script>
</body>
</html>
```

### Demo 2: With Domain Lock

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Protector - Domain Lock</title>
    <script src="https://cdn.jsdelivr.net/gh/worm0x1/css-obfuscation/css-protector7.js"></script>
    <style>
        body { font-family: Arial; padding: 20px; background: #f5f5f5; }
        input, textarea { width: 100%; padding: 10px; margin: 10px 0; font-family: monospace; }
        textarea { height: 150px; }
        button { padding: 10px 20px; background: #2196F3; color: white; border: none; cursor: pointer; }
        button:hover { background: #0b7dda; }
    </style>
</head>
<body>
    <textarea id="input" placeholder="Enter CSS code...">body { background: #333; color: white; }
.container { max-width: 1200px; margin: 0 auto; }</textarea>
    <input type="text" id="domain" placeholder="Enter domain (e.g., example.com)">
    <button onclick="protect()">Protect CSS (Domain Lock)</button>
    <textarea id="output" placeholder="Protected code will appear here..." readonly></textarea>

    <script>
        function protect() {
            const css = document.getElementById('input').value;
            const domain = document.getElementById('domain').value;
            if (!domain) return alert('Please enter a domain!');
            
            CSSProtector.protect(css, { lockToDomain: domain })
                .then(code => document.getElementById('output').value = code)
                .catch(err => alert('Error: ' + err.message));
        }
    </script>
</body>
</html>
```
---

## 📚 API Reference

### `CSSProtector.protect(cssCode, options)`

Protects and obfuscates CSS code.

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `cssCode` | String | ✅ Yes | Your CSS code to protect |
| `options` | Object | ❌ No | Configuration options |

#### Options Object

```javascript
{
    lockToDomain: String | Array  // Domain(s) to lock the CSS to
}
```

#### Supported Domain Formats

All formats are automatically normalized:

```javascript
'example.com'                    // ✅ Clean domain
'www.example.com'                // ✅ With www
'https://example.com'            // ✅ With protocol
'http://example.com'             // ✅ HTTP protocol
'example.com/'                   // ✅ With trailing slash
'https://www.example.com/path'   // ✅ With path
```

#### Return Value

Returns a `Promise` that resolves with the protected JavaScript code (string).

#### Usage Examples

```javascript
// Single domain
CSSProtector.protect(css, { 
    lockToDomain: 'example.com' 
});

// Multiple domains
CSSProtector.protect(css, { 
    lockToDomain: ['example.com', 'subdomain.example.com', 'another.com'] 
});

// No domain lock
CSSProtector.protect(css);
```

---

## 🌐 Domain Lock Feature

### How It Works

When domain lock is enabled:
1. The protected CSS checks the current domain
2. Compares against allowed domain(s)
3. Only executes if domain matches
4. Shows error message if domain doesn't match

### Domain Matching Rules

- **www handling**: Both `example.com` and `www.example.com` are treated as the same
- **Subdomain support**: `blog.example.com` is different from `example.com`
- **Protocol agnostic**: Works with both HTTP and HTTPS
- **Path independent**: Works on any page of the domain

### Examples

```javascript
// Single domain
lockToDomain: 'mywebsite.com'
// ✅ Works on: mywebsite.com, www.mywebsite.com
// ❌ Blocked on: blog.mywebsite.com, other.com

// Multiple domains
lockToDomain: ['site1.com', 'site2.com', 'blog.site1.com']
// ✅ Works on all three domains
// ❌ Blocked on any other domain

// Subdomain specific
lockToDomain: 'blog.example.com'
// ✅ Works on: blog.example.com
// ❌ Blocked on: example.com, shop.example.com
```

---

## 💡 Best Practices

### 1. Development vs Production

```javascript
const isDev = window.location.hostname === 'localhost' || 
              window.location.hostname === '127.0.0.1';

const options = isDev ? {} : { 
    lockToDomain: 'production-domain.com' 
};

CSSProtector.protect(css, options)
    .then(code => eval(code));
```

### 2. Error Handling

```javascript
CSSProtector.protect(css, options)
    .then(protectedCode => {
        eval(protectedCode);
        console.log('✅ CSS protection successful');
    })
    .catch(error => {
        console.error('❌ Protection failed:', error);
        // Fallback: inject CSS normally
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    });
```

### 3. Large CSS Files

For very large CSS files, consider:
- Splitting into multiple smaller chunks
- Loading critical CSS first
- Using async/defer for non-critical CSS

```javascript
// Critical CSS (protect and load immediately)
CSSProtector.protect(criticalCSS)
    .then(code => eval(code));

// Non-critical CSS (protect and load after page load)
window.addEventListener('load', () => {
    CSSProtector.protect(nonCriticalCSS)
        .then(code => eval(code));
});
```

### 4. Multiple CSS Files

```javascript
const cssFiles = {
    layout: `/* layout CSS */`,
    components: `/* components CSS */`,
    utilities: `/* utilities CSS */`
};

Promise.all([
    CSSProtector.protect(cssFiles.layout, options),
    CSSProtector.protect(cssFiles.components, options),
    CSSProtector.protect(cssFiles.utilities, options)
])
    .then(protectedCodes => {
        protectedCodes.forEach(code => eval(code));
    });
```

---

## 🔧 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| CSS not loading | Check browser console for errors |
| Domain lock not working | Verify domain format is correct |
| Works on localhost but not production | Remove domain lock for localhost testing |
| Library not loading | Check CDN URL and internet connection |
| Protected code too large | Consider splitting CSS into smaller chunks |

### Debug Mode

```javascript
CSSProtector.protect(css, options)
    .then(code => {
        console.log('Protected code length:', code.length);
        console.log('Original CSS length:', css.length);
        eval(code);
    })
    .catch(error => {
        console.error('Error details:', error);
        console.error('CSS input:', css);
        console.error('Options:', options);
    });
```

### Checking If Protection Is Active

```javascript
// The protected code will block these actions:
// - F12 (blocked)
// - Ctrl+Shift+I (blocked)
// - Right-click (blocked)
// - Ctrl+U (blocked)

// Check in console:
console.log('CSSProtector loaded:', typeof CSSProtector !== 'undefined');
```

---

## ⚙️ static web protection

This project is also built with the same CSS obfuscation library

> [▶️ Test Site](https://web0x1.vercel.app/)

---

## 📄 License

License - Free to use in personal and commercial projects

---
