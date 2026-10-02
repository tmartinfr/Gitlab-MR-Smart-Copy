# GitLab MR Smart Copy

This browser extension adds a convenient "copy" button to GitLab merge request pages and lists. This allows you to easily copy the merge request (MR) title and URL to your clipboard.

- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/gitlab-mr-smart-copy/)
- [Chrome](https://chromewebstore.google.com/detail/pmhbnppopdmmpnapjkmonbkkhpjmoddn?utm_source=item-share-cb)

## Features

- **Adds a copy button:** A copy button is added next to the title on a merge request's main page, and next to each MR in the merge request list.
- **Smart copy:** Copies the MR details in two formats:
    - **Rich Text (HTML):** A hyperlink with the merge request's title.
    - **Plain Text:** The direct URL of the merge request.
- **Keyboard Shortcut:** On a merge request's main page, you can press the `c` key to copy the MR details. The key can be changed in the extension options.
- **Toast Notification:** A confirmation message "Copied MR to clipboard." appears when you use the keyboard shortcut.
- **Dynamic Page Support:** The copy buttons are correctly added even when navigating through GitLab dynamically without full page reloads.

## Development

1.  Clone this repository.
2.  Open your browser's extension management page.
3.  Enable "Developer mode".
4.  Click on "Load unpacked" and select the cloned repository's directory.

## Usage

Once installed, the extension works automatically on GitLab pages.

- **On a Merge Request Page:** Click the copy icon next to the MR title, or simply press the `c` key.
- **In a Merge Request List:** Click the copy icon next to the MR you want to copy.

The MR title and URL will be in your clipboard, ready to be pasted.

## Settings

Open the extension options (Chrome: right-click the extension icon > Options, Firefox: Add-ons Manager > GitLab MR Smart Copy > Preferences) to change the keyboard shortcut. Any single letter or digit is accepted; use an uppercase letter for Shift+letter (e.g. `C` for Shift+C). Reload your GitLab tabs after saving.
