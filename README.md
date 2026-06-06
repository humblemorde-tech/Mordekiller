
```md
# 🔥 Morde Killer Bot v3.0 🔥

<p align="center">
  <img src="https://img.shields.io/badge/YOU_MUST_FORK-FF0000?style=for-the-badge&logo=github&logoColor=white" alt="Fork First"/>
</p>

> ### ⚠️ READ BEFORE USE
> **You MUST fork this repo first.**  
> 1. Click **Fork** button top-right  
> 2. Then use **PAIR ON SITE** from YOUR fork  
> 3. Using this repo directly = won't work for you
> 
> **Why?** SESSION_ID is tied to your GitHub account. No fork = no pair.
```

Then change all your button links to use `{{github.repository}}` so they auto-point to user's fork:

```md
<p align="center">
  <a href="../../actions/workflows/pair.yml">
    <img src="https://img.shields.io/badge/PAIR_ON_SITE-FF0000?style=for-the-badge&logo=whatsapp&logoColor=white" alt="Pair On Site"/>
  </a>
</p>
```
Using `../../actions/workflows/pair.yml` makes it relative. Only works after they fork.

### **2. `.github/workflows/pair.yml` - Add Fork Check**

Add this at the top of `jobs` to block users who didn't fork:

```yaml
name: Pair WhatsApp
on:
  workflow_dispatch:
    inputs:
      phone_number:
        description: 'Your WhatsApp number with country code'
        required: true
        default: '254'

jobs:
  check-fork:
    runs-on: ubuntu-latest
    steps:
      - name: Check if repo is forked
        run: |
          if [ "${{ github.repository_owner }}" == "humblemorde-tech" ]; then
            echo "❌ ERROR: You must fork this repo first!"
            echo "Click 'Fork' button top-right, then run this from YOUR fork."
            exit 1
          fi
          echo "✅ Running from fork: ${{ github.repository }}"
  
  pair:
    needs: check-fork
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: node pair.js
        env:
          PHONE_NUMBER: ${{ github.event.inputs.phone_number }}
```
