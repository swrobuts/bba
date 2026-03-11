# BBA Companion Site

Interactive companion website for the **Bachelor Business Analytics** program at THWS Business School, Würzburg.

🌐 **Live:** [https://swrobuts.github.io/bba](https://swrobuts.github.io/bba)

## Quick Deploy

```bash
# Clone and push
cd bba-deploy
git remote set-url origin git@github.com:swrobuts/bba.git
git add -A
git commit -m "Deploy BBA companion site"
git push -u origin main
```

Then enable GitHub Pages:
1. Go to **Settings → Pages**
2. Source: **GitHub Actions**

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```
