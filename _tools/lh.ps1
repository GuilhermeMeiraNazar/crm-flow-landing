Set-Location C:\dev\crm-flow-landing
$env:CHROME_PATH = (Get-ChildItem "$env:LOCALAPPDATA\ms-playwright\chromium-*\chrome-win*\chrome.exe" | Select-Object -First 1).FullName
New-Item -ItemType Directory -Force verificacao\lighthouse | Out-Null
foreach ($run in @(@('dist (rascunho, robots Disallow)', 4173, 'draft'), @('dist-lh (copia com robots liberado, so para medir)', 4174, 'open'))) {
  "== $($run[0])"
  foreach ($p in @(@('home', '/'), @('termos', '/termos/'), @('privacidade', '/privacidade/'), @('reembolso', '/reembolso/'))) {
    npx lighthouse "http://127.0.0.1:$($run[1])$($p[1])" --chrome-flags="--headless=new --no-sandbox" --only-categories=performance,accessibility,best-practices,seo --output=json --output=html --output-path="./verificacao/lighthouse/lh-$($run[2])-$($p[0])" --quiet 2>&1 | Out-Null
    $j = Get-Content "verificacao\lighthouse\lh-$($run[2])-$($p[0]).report.json" -Raw | ConvertFrom-Json
    $fail = $j.categories.seo.auditRefs | ForEach-Object { $a = $j.audits.($_.id); if ($a.score -ne $null -and $a.score -lt 1) { $_.id } }
    "{0,-12} desempenho={1} acessibilidade={2} boas-praticas={3} seo={4} | LCP={5} CLS={6} TBT={7} | falhas SEO: {8}" -f $p[0], [math]::Round($j.categories.performance.score * 100), [math]::Round($j.categories.accessibility.score * 100), [math]::Round($j.categories.'best-practices'.score * 100), [math]::Round($j.categories.seo.score * 100), ($j.audits.'largest-contentful-paint'.displayValue -replace '[^\x20-\x7E]', ' '), $j.audits.'cumulative-layout-shift'.displayValue, ($j.audits.'total-blocking-time'.displayValue -replace '[^\x20-\x7E]', ' '), ($fail -join ',')
  }
}
"Lighthouse " + $j.lighthouseVersion + " | formFactor=" + $j.configSettings.formFactor + " | throttling=" + $j.configSettings.throttlingMethod
