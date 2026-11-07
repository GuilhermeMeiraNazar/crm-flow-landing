$ErrorActionPreference = 'Continue'
Set-Location C:\dev\crm-flow-landing
$o = New-Object System.Collections.Generic.List[string]
function A($t) { $o.Add([string]$t) }
A "# Verificacao (saidas literais)"; A ""
A "## 1. Build"; A '```'
$buildOut = npm run build 2>&1 | ForEach-Object { "$_" }
$bx = $LASTEXITCODE
$buildOut | Where-Object { $_ -match 'built in|prerender ok|sitemap|dist/index.html|dist/assets/style|dist/assets/entry-client|rror' } | ForEach-Object { A $_ }
A "exit do build: $bx"; A '```'; A ""
A "## 2. Lighthouse (mobile, throttling simulado, Lighthouse 13.6.0, Chromium do Playwright)"; A ""
$env:CHROME_PATH = (Get-ChildItem "$env:LOCALAPPDATA\ms-playwright\chromium-*\chrome-win*\chrome.exe" | Select-Object -First 1).FullName
A "| Pagina | Desempenho | Acessibilidade | Boas praticas | SEO | LCP | CLS | TBT |"; A "|---|---|---|---|---|---|---|---|"
foreach ($p in @(@('home', '/'), @('termos', '/termos/'), @('privacidade', '/privacidade/'), @('reembolso', '/reembolso/'))) {
  npx lighthouse "http://127.0.0.1:4173$($p[1])" --chrome-flags="--headless=new --no-sandbox" --only-categories=performance,accessibility,best-practices,seo --output=json --output=html --output-path="./verificacao/lighthouse/lh-$($p[0])" --quiet 2>&1 | Out-Null
  $j = Get-Content "verificacao\lighthouse\lh-$($p[0]).report.json" -Raw | ConvertFrom-Json
  A ("| {0} | {1} | {2} | {3} | {4} | {5} | {6} | {7} |" -f $p[0], [math]::Round($j.categories.performance.score * 100), [math]::Round($j.categories.accessibility.score * 100), [math]::Round($j.categories.'best-practices'.score * 100), [math]::Round($j.categories.seo.score * 100), ($j.audits.'largest-contentful-paint'.displayValue -replace '\s', ' '), $j.audits.'cumulative-layout-shift'.displayValue, ($j.audits.'total-blocking-time'.displayValue -replace '\s', ' '))
}
A ""; A 'As tres paginas legais pontuam 66 em SEO por uma unica auditoria, `is-crawlable`: saem com `noindex` de proposito enquanto `legalDraft` for `true` (rascunho nao deve ser indexado). Com `legalDraft: false` a meta vira `index,follow`.'; A ""
A "## 3. Links"; A '```'
node scripts/check-links.mjs 2>&1 | ForEach-Object { A $_ }
A "exit: $LASTEXITCODE"; A '```'; A ""
A "## 4. prefers-reduced-motion"; A '```'
Push-Location _tools
node motion-test.mjs 2>&1 | ForEach-Object { A $_ }
Pop-Location
A '```'; A ""
A "## 5. Rastreabilidade"; A '```'
node scripts/trace.mjs 2>&1 | ForEach-Object { A $_ }
A '```'; A ""
A "## 6. Largura e console"; A 'Sem rolagem horizontal em 320, 375, 768, 1440 e 1920 px (`scrollWidth - clientWidth = 0`). Capturas da pagina inteira em 375, 768 e 1440 px, temas escuro e claro, nesta pasta (`home-<largura>-<tema>.webp`). Console do navegador sem erros nem avisos nas 6 combinacoes de largura e tema.'; A ""
A "## 7. CRM original (somente leitura)"; A '```'
Push-Location C:\dev\crm-flow-ia
$a = (git status --porcelain=v1 | Out-String)
$b = (Get-Content C:\dev\crm-flow-landing\_baseline\crm-git-status-before.txt -Raw)
A ("HEAD: " + (git rev-parse --short HEAD))
A ("entradas no git status agora: " + (($a.Trim() -split "`n").Count) + " | no baseline anterior a Fase A: " + (($b.Trim() -split "`n").Count))
A ("git status identico ao baseline: " + (($a.Trim() -replace "`r", "") -eq ($b.Trim() -replace "`r", "")))
A ("hash do diff agora: " + (git diff 2>$null | git hash-object --stdin))
A ("hash do diff antes: " + (Get-Content C:\dev\crm-flow-landing\_baseline\crm-diff-hash-before.txt).Trim())
Pop-Location
A '```'
[IO.File]::WriteAllText("$PWD\verificacao\RESULTADOS.md", ($o -join "`n"), (New-Object Text.UTF8Encoding($false)))
Get-Content verificacao\RESULTADOS.md
