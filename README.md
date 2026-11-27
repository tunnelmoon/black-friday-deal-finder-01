[![Black Friday deal finder](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01)
[![Rank](https://make.fun/badge/black-friday-deal-finder-01/tunnelmoon/black-friday-deal-finder-01/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01)
[![Reward](https://make.fun/badge/black-friday-deal-finder-01/tunnelmoon/black-friday-deal-finder-01/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01)

# Deal Scout: Black Friday 2026 deal finder

A working Black Friday and Cyber Monday deal finder for the make.fun bounty [black-friday-deal-finder-01](https://make.fun/bounty/black-friday-deal-finder-01).

40 real deals across 13 categories and 4 stores (Amazon, Best Buy, Walmart, Kate Spade Outlet). Every deal was read from a named deals source in this session on 27 Nov 2026 and carries its store, sale price, usual price, discount, store link, check time and source, plus an honest verdict: new low, strong price, decent cut or modest cut, with the evidence for it. The same product is compared across stores where both list it (MacBook Air 13-inch M5: $989 at Amazon vs $1,049 at Best Buy).

The site is plain static files under `app/` with no build step and no network request: search, category, store and minimum-discount filters plus four sort orders all run in the browser, and a deal page shows the full evidence and any same-product listing elsewhere. Run it locally with `node serve.ts`, then open http://localhost:8080.
