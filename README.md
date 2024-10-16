# MoneyFans
This is a simple calculator to determine how much you've spent on OF.  
The search will return partial results if any match (ie. search for "ang" will match "Angela", "angelo", "Angelina", and so on)  

*You can open dev tools console before running for verbose output*

## Installation
**Currently only supporting [Firefox Developer](https://www.mozilla.org/en-US/firefox/developer/)
==You must allow unsigned extensions==:
1. In Firefox, enter `about:config`
2. Set `xpinstall.signatures.required` to `false`

1. Download `.xpi` file from releases page
2. In Firefox, enter `about:addons` in address bar
3. Click on the Settings icon (top right)
4. Click `Install Add-on From File...`, then select the `.xpi` file you downloaded

## Usage
1. Head to billing page (optional: use button in extension)
2. Scroll to bottom of page (optional: use button in extension)
3. Optional: Enter model name
4. Click Run Search


## Details
This is something I made for myself just messing around, but I figured it would be useful to share. 
It **will** break if there are changes to the billing page. It should be updated, but it's possible I won't know of the changes.

### Scraping
This does not support funds added or removed from wallet. It will support subscriptions and messages from a card, and will not count any declined entries towards totals.