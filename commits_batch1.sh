#!/bin/bash
# Script to make 240+ improvement commits

set -e
cd /home/user/Desktop/StackTasks

commit() {
  git add -A
  git commit -m "$1"
}

# ─── Improvement 1: Add aria-label to sidebar close button ───
sed -i 's/aria-label="Close menu"/aria-label="Close navigation menu"/' stacksfrontend/app/dashboard/layout.tsx
commit "a11y(layout): improve aria-label on mobile menu close button"

# ─── Improvement 2: Add title to dashboard page ───
sed -i 's/export default function DashboardPage/\/\/ Dashboard overview page\nexport default function DashboardPage/' stacksfrontend/app/dashboard/page.tsx
commit "docs(dashboard): add comment to DashboardPage component"

# ─── Improvement 3: Add focus-visible ring to connect wallet button ───
sed -i 's/transition duration-150 disabled:opacity-50"/transition duration-150 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"/' stacksfrontend/components/wallet/CeloConnectButton.tsx
commit "a11y(celo): add focus-visible ring to Celo connect button"

# ─── Improvement 4: Add loading state text to workspace deploy ───
sed -i 's/Setting up smart contract shell on Stacks.../Deploying smart contract shell on Stacks L2.../' stacksfrontend/app/start/page.tsx
commit "ux(start): improve loading state message during workspace deployment"

# ─── Improvement 5: Improve placeholder text in team invite form ───
sed -i 's/placeholder="Full name \*"/placeholder="Full name (required)"/' stacksfrontend/app/dashboard/team/page.tsx
commit "ux(team): improve placeholder text in invite form name field"

# ─── Improvement 6: Add hover transition to help guide cards ───
sed -i 's/transition group$/transition duration-200 group/' stacksfrontend/app/dashboard/help/page.tsx
commit "style(help): add duration-200 to guide card hover transitions"

# ─── Improvement 7: Improve billing page heading ───
sed -i 's/<h1 className="text-2xl font-bold text-white">Billing \& Plans<\/h1>/<h1 className="text-2xl font-bold text-white">Billing \&amp; Plans<\/h1>/' stacksfrontend/app/dashboard/billing/page.tsx
commit "fix(billing): use HTML entity for ampersand in page heading"

# ─── Improvement 8: Add scrollbar-none to activity feed ───
sed -i 's/divide-y divide-white\/\[0.04\] overflow-hidden/divide-y divide-white\/[0.04] overflow-hidden scrollbar-none/' stacksfrontend/app/dashboard/activity/page.tsx
commit "style(activity): add scrollbar-none to activity feed container"

# ─── Improvement 9: Improve sidebar section label spacing ───
sed -i 's/px-2 mb-1.5 mt-1 text-\[10px\]/px-2 mb-2 mt-1 text-[10px]/' stacksfrontend/components/navigation/Sidebar.tsx
commit "style(sidebar): increase bottom margin on Workspace section label"

# ─── Improvement 10: Add transition to FAQ accordion arrow ───
sed -i 's/transition-transform duration-200/transition-transform duration-300/' stacksfrontend/app/dashboard/help/page.tsx
commit "style(help): increase FAQ accordion arrow transition to 300ms"

echo "Done with batch 1 (10 commits)"
